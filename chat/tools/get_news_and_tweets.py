from datetime import datetime, timedelta, date, time
import time as t
import asyncio
import pandas as pd
import traceback
import numpy as np
from asgiref.sync import sync_to_async
from .helpers import get_table, get_embeddings, calculate_similarities, get_open_ai_query, load_json, get_sports_news_table, get_sports_tweet_table

from data.models import SportsNews

import logging
log = logging.getLogger('json')

#TODO- could just do a from helpers import * to get the dependencies in here as well, but maybe overkill
#TODO- Combining these two tools into one file because they're 95% the exact same thing

async def get_league_teams_players(question, log_extras):
    prompt = f"""START QUESTION\n\n{question}\n\nEND QUESTION\n\nYou received the above question about sports. 
    We need to find news articles that are relevant to the question. 
    In a perfectly formatted json, please send the sports league needed, any teams referenced, and any players referenced. 
    If teams and/or players are referenced, you can infer the league from this information.
    For leagues, you must select from the following list: Boxing, Car Racing, Cricket, Formula 1, Golf, Horse Racing, MLB, MMA, NASCAR, NBA, NCAAB, NCAAB Women, NCAAF, NFL, NHL, Other, Soccer, Summer Olympics, Tennis, Unknown, WNBA, WWE, Winter Olympics.
    The json should be formatted as follows:
    'league': choose a single league that is the focus of the request (if there is one, else write 'None')
    'teams': list all of the teams (full team name, city plus name, e.g., Los Angeles Lakers, New York Yankees) in the request separated by commas (if there are teams requested, else write 'None').
    'players': list all of the players (full player name, e.g., LeBron James, Shohei Ohtani, etc.) in the request separated by commas (if there are players requested, else write 'None').

    Remember just send the perfectly formatted json."""

    model = "claude-3-haiku-20240307"

    try:
        response_json = await get_open_ai_query(model, prompt, log_extras=log_extras)
        response = response_json['text']

        model_used_json = {
            "model": response_json['model'],
            "input_tokens": response_json['input_tokens'],
            "output_tokens": response_json['output_tokens'],
            "cached_tokens": response_json['cached_tokens'],
        }

        league_teams_players_json = await load_json(response)

        league = league_teams_players_json.get('league', 'None')
        teams = league_teams_players_json.get('teams', 'None')
        players = league_teams_players_json.get('players', 'None')

        if league == "None": league = None
        if teams == "None": teams = None
        else: teams = [team.strip() for team in teams.split(",")]

        if players == "None": players = None
        else: players = [player.strip() for player in players.split(",")]

        return league, teams, players, model_used_json

    except Exception as e:
        log.error('Error Getting Leagues/Teams/Players', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            **log_extras,
        })
        return None, None, None, None

#Get news from the API
async def get_news_and_tweets(question, date_range="day", max_word_count=5000, news_or_twitter="news", log_extras={}):

    t0 = t.time()
    league_time, table_time, embed_time, similarity_time, finish = 0, 0, 0, 0, 0
    t1, t2, t3, t4 = None, None, None, None
    try:
        date_ranges = {
            "week": timedelta(days=7),
            "month": timedelta(days=30),
            "year": timedelta(days=365),
            "day": timedelta(days=1)
        }

        midnight = datetime.combine(date.today(), time())
        if date_range in date_ranges: midnight -= date_ranges[date_range]

        timestamp_ms = int(midnight.timestamp() * 1000)
        if news_or_twitter == "news":

            league, teams, players, models_used = await get_league_teams_players(question, log_extras)

            log.info('Get News Parameters', extra={
                **log_extras,
                'league': league,
                'teams': teams,
                'players': players
            })

            t1 = t.time()
            league_time = t1 - t0

            done = False
            counter = 1
            while not done:
                final_news_table = await sync_to_async(get_sports_news_table)(timestamp_ms,league,players, teams, log_extras)
                if len(final_news_table) < 2 and counter < 3 and date_range == "day":
                    counter += 1
                    timestamp_ms -= int(timedelta(days=counter).total_seconds() * 1000)
                else:
                    done = True

            t2 = t.time()
            table_time = t2 - t1

        else:
            models_used = None
            done = False
            counter = 1
            while not done:
                final_news_table = await sync_to_async(get_sports_tweet_table)(timestamp_ms)
                if len(final_news_table) < 10 and counter < 5 and date_range == "day":
                    counter += 1
                    timestamp_ms -= int(timedelta(days=counter).total_seconds() * 1000)
                else:
                    done = True

            t2 = t.time()
            table_time = t2 - t0

        question_embedding = await get_embeddings(question)

        t3 = t.time()
        embed_time = t3 - t2

        final_news_table = await calculate_similarities(final_news_table, question_embedding)
        t4 = t.time()
        similarity_time = t4 - t3
        
        if len(final_news_table) == 0:
            final_news_table['date'] = []
            final_news_table['date_diff'] = []
            final_news_table['cosine_similarity'] = []
            log.warning('Empty News Dataframe', extra={
                **log_extras,
                'league': league,
                'teams': teams,
                'players': players
            })
        else:
            date_column = 'published' if news_or_twitter == "news" else 'created_at'
            final_news_table = await asyncio.to_thread(final_news_table.rename, columns={date_column: 'date', 'embeddings_string': 'string'})
            final_news_table['date'] = pd.to_datetime(final_news_table['date'], unit='ms', errors='coerce', utc=True)
            final_news_table['date'] = final_news_table['date'].dt.tz_convert('US/Eastern')
            final_news_table['date'] = final_news_table['date'].dt.strftime('%Y-%m-%d')
            final_news_table['date'] = pd.to_datetime(final_news_table['date'], errors='coerce')

            final_news_table['date_diff'] = (datetime.now() - final_news_table['date']).dt.days
            final_news_table['cosine_similarity'] += ((1 / final_news_table['date_diff']) * 0.1)
            final_news_table = await asyncio.to_thread(final_news_table.drop, columns=['date_diff'])
            final_news_table = final_news_table[final_news_table['cosine_similarity'] > 0.333]
            final_news_table = final_news_table.sort_values(by='cosine_similarity', ascending=False).head(10)

            word_count = 0
            for i, row in final_news_table.iterrows():
                string = row['string']
                word_count += len(string.split())
                if word_count > max_word_count:
                    final_news_table = final_news_table.iloc[:i-1]
                    break

            final_news_table = final_news_table[['date', 'string']].sort_values(by='date', ascending=True)

    except Exception as e:
        #print("TOOL ERROR: ", repr(e))
        #print("TRACE: ", traceback.format_exc())
        log.error('ToolError', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'question': question,
            **log_extras,
        })
        final_news_table = pd.DataFrame(columns=['date', 'string'])
        models_used = None

    end_time = t.time()
    if t4: finish = end_time - t4
    elif t3: finish = end_time - t3
    elif t2: finish = end_time - t2
    elif t1: finish = end_time - t1
    else: finish = end_time - t0
    full_runtime = {
        'getLeagueTeamsPlayers': league_time,
        'getTable': table_time,
        'getEmbeddings': embed_time,
        'calculateSimilarity': similarity_time,
        'finish': finish
    }

    #print("FULL RUNTIME: ", full_runtime)

    return final_news_table, models_used, full_runtime

async def get_news(question, date_range="last_day", max_word_count=5000, log_extras={}, **kwargs):
    start_time = t.time()
    models_used_array = []
    final_news_table, models_used, full_runtime = await get_news_and_tweets(question, date_range, max_word_count, "news", log_extras)
    models_used_array.append(models_used)

    if len(final_news_table) > 0: final_news_table['tool_used'] = "get_news"
    else: final_news_table = pd.DataFrame(columns=['date', 'string', 'tool_used'])

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': models_used_array,
        'question': question,
        'date_range': date_range,
        'max_word_count': max_word_count,
        'runtime': t.time() - start_time,
        'full_runtime': full_runtime
    })
    return final_news_table, models_used_array

async def get_tweets(question, date_range="last_day", max_word_count=5000, log_extras={}, **kwargs):
    start_time = t.time()
    models_used_array = []
    final_news_table, models_used, full_runtime = await get_news_and_tweets(question, date_range, max_word_count, "twitter", log_extras)
    models_used_array.append(models_used)

    if len(final_news_table) > 0: final_news_table['tool_used'] = "get_tweets"
    else: final_news_table = pd.DataFrame(columns=['date', 'string', 'tool_used'])

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': models_used_array,
        'question': question,
        'date_range': date_range,
        'max_word_count': max_word_count,
        'runtime': t.time() - start_time,
        'full_runtime': full_runtime
    })
    return final_news_table, models_used_array

# print(f"Start time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
# #news_df, models_used = asyncio.run(get_news(question="Best MLB hitting props for today", date_range="day"))
# #news_df, models_used = asyncio.run(get_news(question="Trae Young assists prop bet", date_range="day"))
# #news_df, models_used = asyncio.run(get_news(question="RB Leipzig vs Liverpool UCL match analysis", date_range="day"))
# news_df, models_used = asyncio.run(get_news(question="Pascal Siakam rebounds and assists prop for tonight's game against the Pistons", date_range="day"))
# print(f"End time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
# print(news_df)
# print(models_used)