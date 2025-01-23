import pandas as pd
import os
from datetime import datetime, timedelta
import time
import traceback
import json
import re
from serpapi import GoogleSearch
from django.conf import settings
import pytz
import asyncio
import aiohttp
import aioboto3
import ast
import boto3
import random
import requests
import concurrent.futures

#Import all tools
from .tools import search_statmuse, get_tweets, get_news, get_all_game_lines, get_all_player_prop_lines, \
    get_all_other_prop_lines, get_all_futures_lines, get_best_game_lines, get_best_player_prop_lines, \
    get_best_other_prop_lines, get_game_log, get_game_sharp_picks_table, get_google_results, get_list_of_games, \
    get_nfl_fantasy_football_projections, get_nfl_player_season_stat_projections, \
    get_nfl_team_defense_season_stat_projections, get_optimal_picks_for_nfl_survivor_pool, \
    get_pitcher_vs_batter_and_park_factors_data, get_player_prop_information, get_plus_ev_fantasy_lines, \
    get_plus_ev_game_lines, get_plus_ev_player_prop_lines, get_website_text, get_wikipedia_results, \
    respond_to_question_about_players_and_positions, respond_to_question_about_teams, get_full_chat_history_summary, \
    load_json, calculate_similarities, get_embeddings, get_tokens_from_string, get_open_ai_query, get_first_basket_info

from chat.consumer_helpers import clean_history


import logging
log = logging.getLogger('json')

MAX_WORD_COUNT = 20000
MAX_RESULTS = 25

#TODO- pull to TF
GROQ_API_KEY = "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"
OPENAI_API_KEY = os.environ['OPENAI_API_KEY']
SERP_API_KEY = os.environ['SERP_API_KEY']
AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
SUPABASE_API_KEY = os.environ['SUPABASE_API_KEY']
SUPABASE_URL = os.environ['SUPABASE_URL']
AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']

async def get_unique_player_prop_names():
    async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
        # Fetch team names CSV file
        s3_team_name_file_path = f'momentum_sheets/unique_player_prop_names.txt'
        team_names_obj = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_team_name_file_path)
        team_names_body = await team_names_obj['Body'].read()
        unique_player_prop_names = team_names_body.decode('utf-8')

        #convert into an array (names are separated by commas)
        unique_player_prop_names_array = unique_player_prop_names.split(',')

        #remove names that don't have "Player - " in it
        unique_player_prop_names_array = [name for name in unique_player_prop_names_array if "Player - " in name]
        pine_player_prop_names = ", ".join(unique_player_prop_names_array)
        pine_player_prop_names = pine_player_prop_names[:-1]

    return unique_player_prop_names, pine_player_prop_names

# unique_player_prop_names, pine_player_prop_names = asyncio.run(get_unique_player_prop_names())
# print(unique_player_prop_names)
# print()
# print()
# print(pine_player_prop_names)

async def get_unique_other_prop_names():
    async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
        # Fetch team names CSV file
        s3_team_name_file_path = f'momentum_sheets/unique_other_prop_names.txt'
        team_names_obj = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_team_name_file_path)
        team_names_body = await team_names_obj['Body'].read()
        unique_other_prop_names = team_names_body.decode('utf-8')

    return unique_other_prop_names

async def get_unique_futures_names():

    async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
        # Fetch team names CSV file
        s3_team_name_file_path = f'momentum_sheets/unique_futures_one_sided_names.txt'
        team_names_obj = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_team_name_file_path)
        team_names_body = await team_names_obj['Body'].read()
        unique_futures_one_sided_names = team_names_body.decode('utf-8')

        s3_team_name_file_path = f'momentum_sheets/unique_futures_two_sided_names.txt'
        team_names_obj = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_team_name_file_path)
        team_names_body = await team_names_obj['Body'].read()
        unique_futures_two_sided_names = team_names_body.decode('utf-8')

        return unique_futures_one_sided_names, unique_futures_two_sided_names

#Finds common elements in two lists
async def find_common_elements(arr1, arr2):
    set1 = set(item.lower() for item in arr1)
    set2 = set(item.lower() for item in arr2)
    return len(set1 & set2) > 0

#This gets the front page of google from SerpAPI which grounds the model before it determines what tools to use.
async def get_google_front_page(search, date_range, log_extras={}):
    num = 10
    start = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    try:
        async def fetch_results(params):
            search = GoogleSearch(params)
            results = search.get_dict()

            if results['search_metadata']['status'] != "Success":
                async with aiohttp.ClientSession() as session:
                    while results['search_metadata']['status'] != "Success":
                        async with session.get(results['search_metadata']['json_endpoint']) as response:
                            results = await response.json()
            return results

        def process_results(results, header):
            final_string = f"{header}\n\n"

            if 'sports_results' in results:
                try:
                    final_string += "START GOOGLE SPORTS RESULTS (THIS WILL HAVE THE MOST UP-TO-THE MINUTE INFORMATION ON A GAME. YOU MUST REVIEW THIS INFORMATION CAREFULLY. IF YOU ARE WRITING ABOUT THE SCORE OF THIS GAME, YOU MUST USE INFORMATION HERE.)\n\n"
                    sports_results = json.dumps(results["sports_results"], indent = 4)
                    final_string += str(sports_results) + "\n\n"
                    final_string += "END GOOGLE SPORTS RESULTS (THIS WILL HAVE THE MOST UP-TO-THE MINUTE INFORMATION ON A GAME. YOU MUST REVIEW THIS INFORMATION CAREFULLY. IF YOU ARE WRITING ABOUT THE SCORE OF THIS GAME, YOU MUST USE INFORMATION HERE.)\n\n"
                except:
                    pass

            if 'answer_box' in results:
                answer_box = results['answer_box']
                answer_box_string = ""
                try: answer_box_string += f"{answer_box['title']}\n\n"
                except: pass
                try: answer_box_string += f"{answer_box.get('date', '')}\n\n"
                except: pass
                try: answer_box_string += f"{answer_box['snippet']}\n\n"
                except: pass
                try: answer_box_string += f"{answer_box['answer']}\n\n"
                except: pass
                try: answer_box_string += f"{json.dumps(answer_box['contents'], indent=4)}\n\n"
                except: pass
                if answer_box_string != "":
                    final_string += f"START GOOGLE ANSWER BOX\n\n{answer_box_string}\n\nEND GOOGLE ANSWER BOX\n\n"
            if "related_questions" in results:
                try:
                    related_questions = results['related_questions']
                    final_string += "START GOOGLE RELATED QUESTIONS\n\n"

                    for question in related_questions:
                        for column_name, column_data in question.items():
                            if not ("link" in column_name or "logo" in column_name or "token" in column_name):
                                final_string += f"{column_name}: {column_data}\n"
                        final_string += "\n"

                    final_string += "END GOOGLE RELATED QUESTIONS\n\n"
                except:
                    related_questions = results['related_questions']
                    final_string += f"START GOOGLE RELATED QUESTIONS\n\n{related_questions}\n\nEND GOOGLE RELATED QUESTIONS\n\n"

            final_string += "GOOGLE SEARCH RESULTS\n\n"
            for result in results.get('organic_results', []):
                try: final_string += f"Title:{result['title']}\n\n"
                except: pass
                try: final_string += f"Date:{result.get('date', '')}\n\n"
                except: pass
                try: final_string += f"Snippet:{result['snippet']}\n\n"
                except: pass
                try: final_string += f"Link: {result['link']}\n\n"
                except: pass

            return final_string

        base_params = {
            "q": search,
            "location": "New York, United States",
            "hl": "en",
            "gl": "us",
            "num": num,
            "google_domain": "google.com",
            "api_key": SERP_API_KEY,
            #"async": True,
        }

        past_day_params = {**base_params, "tbs": "qdr:d"}
        past_hour_params = {**base_params, "tbs": "qdr:h"}
        past_week_params = {**base_params, "tbs": "qdr:w"}
        past_month_params = {**base_params, "tbs": "qdr:m"}
        past_year_params = {**base_params, "tbs": "qdr:y"}
        all_time_params = base_params.copy()

        if date_range == "day":
            final_params = past_day_params
            header = "GOOGLE SEARCH RESULTS PAST DAY"
        elif date_range == "hour":
            final_params = past_hour_params
            header = "GOOGLE SEARCH RESULTS PAST HOUR"
        elif date_range == "week":
            final_params = past_week_params
            header = "GOOGLE SEARCH RESULTS PAST WEEK"
        elif date_range == "month":
            final_params = past_month_params
            header = "GOOGLE SEARCH RESULTS PAST MONTH"
        elif date_range == "year":
            final_params = past_year_params
            header = "GOOGLE SEARCH RESULTS PAST YEAR"
        else:
            final_params = all_time_params

        google_results_string = await asyncio.to_thread(process_results, await fetch_results(final_params), header)

    except:
        google_results_string = ""

    log.info('Google Results', extra={ 
        'startTime': start,
        'endTime': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'result_string': google_results_string,
        **log_extras,
    })

    return google_results_string

# snippets = asyncio.run(get_google_front_page("Top NFL Player Props", date_range="day"))

def get_urls(snippets):
    url_pattern = r'https?://[^\s]+'
    return re.findall(url_pattern, snippets) #return all urls in string

#Takes a list of tools to run as input, and handles calling each tool and returning the combined output
async def process_tools(tools, log_extras={}):

    try:
        # Dictionary mapping tool names to their corresponding functions
        tool_functions = {
            "get_list_of_games": get_list_of_games,
            "get_news": get_news,
            "get_tweets": get_tweets,
            "get_game_log": get_game_log,
            "get_player_prop_information": get_player_prop_information,
            "get_game_sharp_picks_table": get_game_sharp_picks_table,
            "get_all_game_lines": get_all_game_lines,
            "get_best_game_lines": get_best_game_lines,
            "get_plus_ev_game_lines": get_plus_ev_game_lines,
            "get_all_player_prop_lines": get_all_player_prop_lines,
            "get_all_other_prop_lines": get_all_other_prop_lines,
            "get_all_futures_lines": get_all_futures_lines,
            "get_best_player_prop_lines": get_best_player_prop_lines,
            "get_best_other_prop_lines": get_best_other_prop_lines,
            "get_plus_ev_player_prop_lines": get_plus_ev_player_prop_lines,
            "get_plus_ev_fantasy_lines": get_plus_ev_fantasy_lines,
            "respond_to_question_about_players_and_positions": respond_to_question_about_players_and_positions,
            "respond_to_question_about_teams": respond_to_question_about_teams,
            "get_website_text": get_website_text,
            "get_google_results": get_google_results,
            "get_wikipedia_results": get_wikipedia_results,
            "get_pitcher_vs_batter_and_park_factors_data": get_pitcher_vs_batter_and_park_factors_data,
            "get_first_basket_info": get_first_basket_info,
            "search_statmuse": search_statmuse,
            "get_optimal_picks_for_nfl_survivor_pool": get_optimal_picks_for_nfl_survivor_pool,
            "get_nfl_fantasy_football_projections": get_nfl_fantasy_football_projections,
            "get_nfl_player_season_stat_projections": get_nfl_player_season_stat_projections,
            "get_nfl_team_defense_season_stat_projections": get_nfl_team_defense_season_stat_projections,
        }

        tasks = []
        for tool in tools:
            tool_name = tool['name']
            params = tool['params']
            for key in tool_functions:

                if key in tool_name.lower():
                    #adds log_extras to params - includes tool name, chat.id, chat.sessionId (currently)
                    params['log_extras'] = {
                        'tool': key,
                        **log_extras,
                    }
                    try:
                        task = asyncio.create_task(tool_functions[key](**params))
                        tasks.append((tool_name, task))
                    except Exception as e:
                        print(traceback.format_exc())
                        log.error('Error creating task for tool', extra={
                            'error': repr(e),
                            'traceback': traceback.format_exc(),
                            'tool': tool_name,
                            **log_extras
                        })
                    break

        dataframes = []
        models_used_array = []
        # Wait for all tasks to complete and collect results
        for tool_name, task in tasks:
            try:
                result, models_used = await task
                if isinstance(result, pd.DataFrame):
                    dataframes.append(result)
                else:
                    log.error('Result is not a dataframe', extra={
                        'tool': tool_name,
                        'result_type': type(result),
                        **log_extras
                    })

                models_used_array.extend(models_used)

            except Exception as e:
                log.error('ProcessToolError', extra={
                    'error': repr(e),
                    'traceback': traceback.format_exc(),
                    'tool': tool_name,
                    **log_extras
                })

        # Combine all resulting DataFrames, or return an empty one if none created
        if dataframes: research = pd.concat(dataframes, ignore_index=True)
        else: research = pd.DataFrame(columns=["date", "string", "tool_used"])

    except Exception as e:
        # If any unexpected error occurs, print the traceback and return an empty DataFrame
        # This is basically our lambda error
        log.error('Error Processing Tools', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            **log_extras
        })
        research = pd.DataFrame(columns=["date", "string", "tool_used"])
        models_used_array = []

    return research, models_used_array

# tools_string = """[{"name": "get_news", "params": {"question": "Notre Dame vs Purdue NCAAF matchup analysis and betting recommendations", "date_range": "day"}}, {"name": "get_website_text", "params": {"url": "https://www.actionnetwork.com/ncaaf/notre-dame-fighting-irish-vs-purdue-boilermakers-prediction-pick-odds-college-football-saturday-september-14"}}, {"name": "get_website_text", "params": {"url": "https://sportsbookwire.usatoday.com/2024/09/13/notre-dame-at-purdue-odds-picks-and-predictions/"}}, {"name": "get_website_text", "params": {"url": "https://www.si.com/college/notredame/football/notre-dame-vs-purdue-betting-odds-updated-college-football-gambling"}}, {"name": "get_website_text", "params": {"url": "https://www.syracuse.com/betting/2024/09/notre-dame-vs-purdue-prediction-college-football-picks-odds-for-ncaaf-week-3-on-91424.html"}}, {"name": "get_website_text", "params": {"url": "https://www.bettingnews.com/articles/ncaaf/notre-dame-vs-purdue-prediction-expert-picks-2024-09-14/"}}, {"name": "get_website_text", "params": {"url": "https://www.yardbarker.com/college_football/articles/notre_dame_vs_purdue_prediction_pick_odds_for_saturday_sept_14/s1_17354_40891012"}}, {"name": "get_website_text", "params": {"url": "https://www.pickswise.com/college-football/predictions/notre-dame-fighting-irish-vs-purdue-boilermakers-predictions-429211/"}}, {"name": "get_website_text", "params": {"url": "https://www.sportsbookreview.com/picks/college-football/notre-dame-vs-purdue-prediction-picks-odds-week-3-sept-14-2024/"}}]"""
# tools_string = """[{"name": "get_website_text", "params": {"url": "https://www.actionnetwork.com/ncaaf/notre-dame-fighting-irish-vs-purdue-boilermakers-prediction-pick-odds-college-football-saturday-september-14"}}]"""
# tools_string = """[{"name": "get_all_player_prop_lines", "params": {"league": "mlb", "bet_type": "Batting - Hits", "player_name": "Jose Ramirez"}}, {"name": "get_website_text", "params": {"url": "https://www.bettingpros.com/mlb/props/jose-ramirez/"}}, {"name": "get_website_text", "params": {"url": "https://www.bettingpros.com/mlb/props/jose-ramirez/total-bases/"}}, {"name": "get_website_text", "params": {"url": "https://ftw.usatoday.com/article/guardians-vs-twins-mlb-player-props-and-odds-wednesday-september-18"}}, {"name": "get_website_text", "params": {"url": "https://ftw.usatoday.com/article/jose-ramirez-player-props-september-18-guardians-vs-twins"}}, {"name": "get_website_text", "params": {"url": "https://www.foxsports.com/articles/mlb/guardians-vs-twins-prediction-odds-picks-september-18"}}, {"name": "get_website_text", "params": {"url": "https://baseball.realgm.com/mlb/odds/67232/guardians-twins-mlb-prediction-odds-line-9-18-2024"}}, {"name": "get_website_text", "params": {"url": "https://baseball.realgm.com/mlb/odds/67243/guardians-vs-twins-mlb-player-prop-bets-9-18-2024"}}, {"name": "get_website_text", "params": {"url": "https://sports.betmgm.com/en/blog/mlb/twins-guardians-prediction-odds-player-prop-bets-picks-sep-18-2024-jaa-mlb/"}}, {"name": "get_website_text", "params": {"url": "https://sportsbook.fanduel.com/teams/mlb/cleveland-guardians/odds?ampSessionId=1726632000107&ampDeviceId=652e369d-c731-4a44-ad8e-1bd05fab386a"}}, {"name": "get_website_text", "params": {"url": "https://www.foxsports.com/mlb/cleveland-guardians-team-odds"}}]"""
# tools_string = """[{"name": "get_pitcher_vs_batter_and_park_factors_data", "params": {"query": "Reviewing pitcher vs. batter and park factor data, which batters are most likely to perform well in hitting props today?"}}, {"name": "get_player_prop_information", "params": {"league": "mlb", "prop": "Player - Batting - Hits"}}, {"name": "get_news", "params": {"question": "Best MLB hitting props for today", "date_range": "day"}}, {"name": "get_website_text", "params": {"url": "https://www.covers.com/sport/baseball/mlb/player-props"}}, {"name": "get_website_text", "params": {"url": "https://www.dimers.com/news/mlb-player-props-ac-today-friday-20-september-2024"}}, {"name": "get_website_text", "params": {"url": "https://www.fantasyalarm.com/articles/mlb/best-bets-and-props/mlb-best-bets-today-9-20-picks-predictions-player-props-friday/163916"}}, {"name": "get_website_text", "params": {"url": "https://www.fanduel.com/research/3-home-run-prop-best-bets-for-friday-9-20-24"}}, {"name": "get_website_text", "params": {"url": "https://www.bettingpros.com/articles/mlb-player-prop-bet-plus-money-odds-picks-friday-9-20/"}}, {"name": "get_website_text", "params": {"url": "https://thegameday.com/mlb/props/"}}]"""
# tools_string = """[{"name": "get_first_basket_info", "params": {}}]"""
# tools_json = json.loads(tools_string)
# research_df, models_used_array = asyncio.run(process_tools(tools_json))
# print(research_df)
# research_df.to_json('research_df.json', orient='records')

async def get_tool_used_string(research_df, log_extras={}):
    try:
        tool_used_string = "Your research assistant had access to a variety of tools when providing the research. You will see 'tool_used' in the research which identifies what tool was used to get research. Here's an explanation of the tools used."
        tools_used = research_df['tool_used'].unique()

        # Create tasks for fetching descriptions
        tasks = []
        for tool in tools_used: tasks.append((tool, get_single_function_description(tool)))

        # Gather results concurrently
        results = await asyncio.gather(*[task[1] for task in tasks])

        # Combine tool names with their descriptions
        for i, (tool, description) in enumerate(tasks):
            tool_used_string += f"\n\n{tool}:\n{results[i]}\n\n"
    except Exception as e:
        log.error('Error Getting Tool Used String', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras})
        tool_used_string = ""

    return tool_used_string

#This function reduces the research length if there is too much research.
async def get_optimized_research_df(research_df, message, max_word_count, log_extras):
    print("IN GET OPTIMIZED RESEARCH")
    try:
        async def process_row(row):
            string = row["string"]
            embedding = await get_embeddings(string)
            return embedding

        async def add_embeddings_column(df):
            tasks = [process_row(row) for _, row in df.iterrows()]
            embeddings = await asyncio.gather(*tasks)
            df["embeddings"] = embeddings
            return df

        # Add embeddings to the research DataFrame
        research_df = await add_embeddings_column(research_df)

        # Get embeddings for the question message
        question_embedding = await get_embeddings(message)

        # Split the research DataFrame into primary and secondary sources
        primary_source_research = research_df[research_df['tool_used'].str.contains("get_player_prop_information|plus_ev|respond_to_question|wikipedia|statmuse|pitcher|get_all|get_best|first_basket", na=False)]
        secondary_source_research = research_df[~research_df['tool_used'].str.contains("get_player_prop_information|plus_ev|respond_to_question|wikipedia|statmuse|pitcher|get_all|get_best|first_basket", na=False)]

        primary_source_research['cosine_similarity'] = 1

        # Calculate similarities for secondary sources
        secondary_source_research = await calculate_similarities(secondary_source_research, question_embedding)

        # Combine primary and secondary sources
        research_df = pd.concat([primary_source_research, secondary_source_research], ignore_index=True)

        # Sort by cosine similarity
        research_df = research_df.sort_values(by='cosine_similarity', ascending=False)

        # Calculate cumulative word count
        #research_df['word_count'] = research_df['string'].apply(lambda x: len(x.split()))
        #use get_tokens_from_string to get word count
        def get_word_count(research_df):
            research_df['word_count'] = research_df['string'].apply(lambda x: get_tokens_from_string(x))
            return research_df

        research_df = await asyncio.to_thread(get_word_count, research_df)
        research_df['cumulative_word_count'] = research_df['word_count'].cumsum()

        print(f"CUTTING OFF AT MAX WORD COUNT: {max_word_count}")

        research_df.to_csv("research_df.csv", index=False)

        # Truncate the DataFrame based on max_word_count
        truncated_research_df = research_df[research_df['cumulative_word_count'] <= max_word_count]

        print("TRUNCATED RESEARCH DF")
        print(f"LENGTH: {len(truncated_research_df)}")
        for i, row in truncated_research_df.iterrows():
            for column in truncated_research_df.columns:
                print(f"{column}: {row[column]}")

            print()
            print()

        #Get the rows that are not in the final_research_df
        removed_research_df = research_df[~research_df.index.isin(truncated_research_df.index)]

        research_df = truncated_research_df

        #get tools removed
        tools_removed = removed_research_df['tool_used'].unique()

        print(f"TOOLS REMOVED: {tools_removed}")

        #log the tools removed
        log.info('Tools Removed When Optimizing Research', extra={
            'tools_removed': tools_removed,
            **log_extras,
        })

        # Convert date to datetime and remove timezone
        research_df['date'] = pd.to_datetime(research_df['date'], errors='coerce', utc=True).dt.tz_localize(None)

        # Resort by date
        research_df = research_df.sort_values(by='date', ascending=False)

        # Drop unnecessary columns
        research_df = research_df.drop(
            columns=['embeddings', 'cosine_similarity', 'cumulative_word_count', 'word_count'])

    except Exception as e:
        log.error('Error Getting Optimized Research', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'researchMessage': message,
            **log_extras
        })
        research_df = pd.DataFrame(columns=["date", "string", "tool_used"])  # Return an empty DataFrame in case of an error

    return research_df

# research_df = pd.read_json('research_df.json', orient='records')
# message = "What is the best bet for the Notre Dame vs Purdue NCAAF matchup?"
# optimized_research_df = asyncio.run(get_optimized_research_df(research_df, message))
# print(optimized_research_df)
# optimized_research_df.to_json('optimized_research_df.json', orient='records')

#This provides a short description for each tool so the llm knows what each tool does. This description is added to the research prompt, not the tool calling prompt.
async def get_single_function_description(tool_name):

    if tool_name == "get_list_of_games":
        tool_description = "This function gets a list of all games for all leagues over the past 7 days and upcoming 7 days. This could help to get the exact time and date of an upcoming game. This will NOT HELP IN GETTING STANDINGS, OR OVERALL RECORDS/RESULTS."
    elif tool_name == "get_news":
        tool_description = "This function gets the most relevant SPORTS news articles based on search terms and date ranges. You should use information from this tool to get context around games and players.  You should syntehtize the information from this tool with any statstical information you have access to in order to provide the user with qualitative analysis along with the quantitative statistical analysis.  You must make sure you qualitative analysis confirms to what the quantitative analysis is showing."
    elif tool_name == "get_tweets":
        tool_description = "This function gets the most relevant SPORTS tweets based on search terms and date ranges. You should use information from this tool to get context around games and players.  You should syntehtize the information from this tool with any statstical information you have access to in order to provide the user with qualitative analysis along with the quantitative statistical analysis.  You must make sure you qualitative analysis confirms to what the quantitative analysis is showing."
    elif tool_name == "get_game_log":
        tool_description = "This function gets answers to your question using the full the game log for a single recent game. We provided the full game log as well as the user's question to a colleague who summarized the log for you in order for you to properly respond to the question."
    elif tool_name == "get_player_prop_information":
        tool_description = "This function gets historic performance and projections to assist with assessing player prop bets. You will see Hit %. This is how much the player has hit the OVER in the last X games (e.g., L10 Hit % is % the Over hit in the last 10 games). If you are making a recommendation, make sure your recommendation confirms with hit % trends.  Users do not like when you recommend an over when that player has only hit the over in, e.g., 2 of the last 10 games.  On the flip side, when you are recommending unders, you want to make sure the hit count is low.  So if you are recommending an under and the last 10 hit count is 20% that is good, that means the under hit 80% of the time.  You will also see VS Opponent which is how the player has done vs. the current opponent in past games; this is very important when present and you should take note of it. You will get a count of the past games vs that opponent (VS Opponent Count). This tool will also include 'Pine URL' links.  If you are making a recommendation, you must also include the Pine URL in your response in order to allow the users to review the statistics themselves. You will also see Opponent DVP.  This is how the current opponent's defense does vs. that position.  This is a percentage.  For example if you see the DVP as 4, that means that the player is expected to do 4% better than average given the opponent (the opponent's defense is slightly worse than average).  If you see -4 that means the player is expected to do 4% better than average vs that opponent (the opponent's defense is slightly better than average). IF YOU ARE MAKING RECOMMENDATIONS, YOUR RECOMMENDATIONS MUST NEVER CONTRADICT THE PINE AI-POWERED PROJECTION. YOU HAVE A LOT OF OPTIONS TO CHOSE FROM, ONLY MAKE RECOMMENDATIONS WHERE THE REST OF THE CONTEXT IN THE RESEARCH SUPPORTS THE PINE AI-POWERED PROJECTION. THIS ONLY WORKS FOR NFL, NBA, MLB, NHL."
    elif tool_name == "get_game_sharp_picks_table":
        tool_description = "This function gets the sharp picks table for a specified league. This tool uses the sharp books, to find where the sharp lines and totals are, as well as where the smart money is on each side of the line.  YOU MUST USE THIS IF ASKED TO MAKE A GAME PICK RECOMMENDATION."
    elif tool_name == "get_all_game_lines":
        tool_description = "This function gets all game lines for a specified league."
    elif tool_name == "get_best_game_lines":
        tool_description = "This function gets the best game lines for a specified league."
    elif tool_name == "get_plus_ev_game_lines":
        tool_description = "This function gets the Plus EV game lines for a specified league."
    elif tool_name == "get_all_player_prop_lines":
        tool_description = "This function gets all player prop lines for a specified league."
    elif tool_name == "get_all_other_prop_lines":
        tool_description = "This function gets all other prop lines for a specified league, like quarter, half, and team total scores."
    elif tool_name == "get_all_futures_lines":
        tool_description = "This function gets all futures lines for a specified league, like regular season total wins, Super Bowl Champion, or NBA MVP."
    elif tool_name == "get_best_player_prop_lines":
        tool_description = "This function gets the best player prop lines for a specified league."
    elif tool_name == "get_best_other_prop_lines":
        tool_description = "This function gets the best other prop lines for a specified league, like quarter, half and team total scores. Note that if someone is asking for the best line and doesn't specify a line, look for main=True. That means that this is the main line for the prop."
    elif tool_name == "get_plus_ev_player_prop_lines":
        tool_description = "This function gets the Plus EV player prop lines for a specified league."
    elif tool_name == "get_plus_ev_fantasy_lines":
        tool_description = "This function gets the Plus EV fantasy prop lines for a specified league."
    elif tool_name == "respond_to_question_about_players_and_positions":
        tool_description = "This function responds to questions about players & positions.  We provided a colleague access to a large historic dataset and allowed your colleage to analyze the data to answer questions.  This information is what your colleague sent back to you.  It is high quality statstical information so you must use it when you see this function."
    elif tool_name == "respond_to_question_about_teams":
        tool_description = "This function responds to questions about teams. e provided a colleague access to a large historic dataset and allowed your colleage to analyze the data to answer questions.  This information is what your colleague sent back to you.  It is high quality statstical information so you must use it when you see this function."
    elif tool_name == "get_google_results":
        tool_description = "This function gets the most relevant SPORTS news articles based on search terms and date ranges."
    elif tool_name == "get_wikipedia_results":
        tool_description = "This function gets the most relevant Wikipedia page based on search terms."
    elif tool_name == "get_pitcher_vs_batter_and_park_factors_data":
        tool_description = "This function gets the most relevant pitcher vs. batter data and park factors for today's games. Note that there are a number of park factor variables. Different factors may be important for different questions. E.g., you may want to look at the overall park factor number and HR number if people are asking about home runs. Remember, the higher the park factor the more batter-friendy, the lower, the more pitcher friendly. 100 is the average, 135 means 35% more batter-friendly than normal, 75 means 25% more pitcher friendly (less batter friendly)."
    elif tool_name == "get_first_basket_info":
        tool_description = "This function gets the most relevant first basket information for NBA games."
    elif tool_name == "search_statmuse":
        tool_description = "This function searches StatMuse for the most relevant sports data based on search terms."
    elif tool_name == "get_optimal_picks_for_nfl_survivor_pool":
        tool_description = "This function gets the optimal picks for an NFL survivor pool based on the current betting odds."
    elif tool_name == "get_nfl_fantasy_football_projections":
        tool_description = "This function gets the most recent NFL fantasy football projections."
    elif tool_name == "get_nfl_player_season_stat_projections":
        tool_description = "This function gets the most recent NFL player season stat projections."
    elif tool_name == "get_nfl_team_defense_season_stat_projections":
        tool_description = "This function gets the most recent NFL team defense season stat projections."
    elif tool_name == 'get_website_text':
        tool_description = 'This gets the text from a website url.'
    else:
        print("Tool name not found.", tool_name) #this print probably fine as this error shouldn't occur in production
        tool_description = ""

    return tool_description

#This is contains the function descriptions for the tool-call llm prompt. These are very detailed.
async def get_function_descriptions(leagues):

    # Run all functions in parallel
    results = await asyncio.gather(
        get_unique_player_prop_names(),
        get_unique_other_prop_names(),
        get_unique_futures_names()
    )

    # Unpack results
    (unique_player_prop_names, pine_player_prop_names), unique_other_prop_names, (unique_futures_one_sided_names, unique_futures_two_sided_names) = results

    survivor_pool_example = """{7: "Miami Dolphins", 10: "New York Giants"}"""

    function_descriptions = f"""START DESCRIPTION OF FUNCTIONS
        
    You have access to numerous tools to answer users' questions. Here is a list of the tools you have access to:

    """
    function_leagues = ["nba", "mlb", "nfl", "nhl", "wnba", "ncaam", "ncaaf", "mls", "epl", "laliga", "ufc", "pga"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += f"""Function Name: get_list_of_games
        Function Description: This function will get you a list of all games for all leagues over the past 7 days and upcoming 7 days. This could help to get the exact time and date of an upcoming game. This function is good when used in conjunction with get_news.
        Variables: league (optional) (string that specifies the league of the game, options are "nba", "mlb", "nfl", "nhl", "wnba", "ncaam", "ncaaf", "mls", "epl", "laliga", "ufc", "pga") if you do not include a league, you will get all leagues,
        
        """

    function_descriptions += f"""Function Name: get_news
    Function Description: This function will get you the most relevant SPORTS news articles based on a search term. We have scraped the top sports publications to get high quality up-to-the-minute sports news. This will have game summaries, upcoming game analysis, analysis of particular players and teams, injury news, and even articles with bet recommendations. You can specify the date range for the news articles.
    Variables:
        question (string that includes a dense question that we can use to get the relevant news you need),
        date_range (string that specifies the date range for the news articles, options are "day", "week", "month", "year", note that for betting on upcoming MLB, NBA, WNBA and NHL games, "day" is usually the best option, you may want to go back a week for PGA, NFL, UFC and other sports that are not daily),
    
    """

    function_descriptions += f"""Function Name: get_tweets
    Function Description: This function will get you the most relevant SPORTS tweets based on a search term. We have scraped tweets from reports that often times break news about injuries, trades, etc. You can specify the date range for the tweets.
    Variables:
        question (string that includes a dense question that we can use to get the relevant tweets you need),
        date_range (string that specifies the date range for the tweets, options are "day", "week", "month", "year", note that for betting on upcoming games, "day" is usually the best option),
    
    """

    function_leagues = ["nba", "mlb", "nfl", "nhl", "wnba", "ncaam", "ncaaf", "mls", "epl", "laliga", "ufc", "pga"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += f"""Function Name: get_game_log
        Function Description: This function will get you answers to your question from the full the game log for a single recent game or whether a bet hit (both player prop bets and game bets). You must specify a date, league, and team to get the game logs for that game. YOU MUST USE THIS FUNCTION TO answer questions about (1) the outcome of recent bets; (2) live results or (3) to get game information for a game that that completed within the last two days. If you are asked about games that completed more than two days ago, you should use get_news, as there will be much more robust information in the news than in the game log. Additionally, if you are asked more general questions about teams or games, you should also use get_news to get additional context.
        Variables:
            league (string that specifies the league of the game, options are "nba", "mlb", "nfl", "nhl", "wnba", "ncaam", "ncaaf", "mls", "epl", "laliga", "ufc", "pga"),
            question (string that includes a dense question, including the full team names, and date (if you have it) that we can use to get the relevant game log you need),
        
        """
    function_leagues = ["nba", "mlb", "nfl", "nhl"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += f"""Function Name: get_player_prop_information
        Function Description: This function IS FANTASTIC when you need to make recommendations about INDIVIDUAL FULL GAME PLAYER PROPS OR PLAYER PERFORMANCE. It will get you historic performance, injury information, projections, and information on sportsbooks that have the best lines to assist with assessing player prop bets (like LeBron James' points, Joe Burrow's passing yards, etc.). THIS ONLY WORKS for the following leagues: "nba", "mlb", "nfl", "nhl". AND THIS ONLY HAS SINGLE GAME PROPS. This is great for assessing and predicting player performance for an upcoming game. This is great when someone is asking for prop recommendations. YOU MUST USE THIS WHEN ASKED ABOUT SINGLE GAME FULL GAME PROP RECOMMENDATIONS FOR THE NBA, MLB, NFL or NHL. YOU MUST NOT USE THIS FOR OTHER LEAGUES. OR FOR PARTIAL GAME PROPS (LIKE FIRST QUARTER OR FIRST HALF PROPS), SEASON PROPS AND FUTURES. YOU MUST USE GET_NEWS FOR ANY OTHER LEAGUES AS WELL AS SEASON LONG PROPS AND FUTURES. YOU SHOULD ALSO USE GET_NEWS IN CONJUNCTION WITH THIS. There is a wealth of information here.
        Variables:
            league (string that specifies the league of the player, THE ONLY OPTIONS are "nba", "mlb", "nfl", "nhl"),
            team_one (optional) (string that specifies the team for which you would like to get player prop information. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information),
            team_two (optional) (string that specifies the team for which you would like to get player prop information. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information),
            player_name (optional) (string that specifies the player for which you would like to get player prop information. You must write the FULL PLAYER NAME, e.g., "LeBron James", "Joe Burrow", "Aaron Judge"),
            prop (optional) (string that specifies the type of player prop bet you would like to get information for, options are: {pine_player_prop_names}; IMPORTANT NOTE: IF SOMEONE IS ASKING ABOUT TOUCHDOWNS FOR A PLAYER WHO IS NOT A QB OR ANYTIME TOUCHDOWNS, THEY ARE LIKELY LOOKING FOR Player - Offense - Rushing and Receiving Touchdowns),
            hit_type (optional) (string that specifies the type of hit you would like to sort by, options are: "over" and "under"; this is helpful if someone asks for a list of player props that have, e.g., hit the over in at least 7 of the last 10 game; in this case you would select "over" for the hit_type and 10 for the hit_count); this could also be helpful if someone is only asking for bets that are over recommendations (hit_type: over) or under recommendations (hit_type: under),
            hit_count (optional) (int that specifies the number of games back you want to sort by, options are 5, 10, 15 or 20. This will sort by the hit_type and the number of games back. This is helpful if someone asks for a list of player props that have, e.g., hit the under in at least 4 of the last 5 games; in this case you would select 5 for the hit_count and "under" for the hit_type),
            is_general (optional) (boolean that tells the function whether this is a general request for player prop information, or whether the request includes specific props - even if you are not requesting it in the prop variable. This will remove some high variance props that the Pine Model does not recommend if it is a general request)
            book_name (optional) (string that specifies the sportsbook for which you would like to get player prop information (WE ONLY HAVE ODDS FOR THE FOLLOWING SPORTSBOOKS: FanDuel, DraftKings, BetMGM, Caesars, BetRivers, ESPNBet, PrizePicks, and Underdog). If you do not specific a sportsbook, you will get the best odds. ONLY SPECIFIY A SPORTSBOOK IF THE USER REQUESTS ONE; IF SOMEONE ASKS FOR GOOD PRIZEPICKS OR UNDERDOG BETS, YOU MUST USE THIS FUNCTION AND THIS VARIABLE),
            min_odds (optional) (int of the lowest odds that you would like to see. ONLY USE THIS IF THE USER REQUESTS IT, e.g., "I don't want to see anything below -200"  This will remove anything less than -200 - like -300),
            max_odds (optional) (int of the highest odds that you would like to see. ONLY USE THIS IF THE USER REQUESTS IT, e.g. "Get me the best props that are between -200 and +200"  You would put 200 here. This will remove anything greater than +200 - like +300),
        
        """

    function_leagues = ["nba", "mlb", "nfl", "nhl"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += f"""Function Name: get_game_sharp_picks_table (NOTE THIS CURRENTLY ONLY WORKS FOR "nba", "mlb", "nfl", "nhl" FOR OTHER SPORTS USE get_news OR get_google_results)
        Function Description: This function will get you the sharp game picks table for a specified league. This works for getting game picks for moneyline, spread and game totals. THIS DOES NOT WORK FOR PLAYER PROPS. FOR PLAYER PROPS YOU MUST USE YOU MUST USE get_player_prop_information. THIS IF ASKED TO MAKE A GAME PICK RECOMMENDATION FOR THE ABOVE REFERENCED LEAGUES. This is GREAT when someone asks you to make picks for an entire day (or week for NFL). If you select moneyline, it will provide you a table with percentage chances of winning.
        Variables:
            league (string that specifies the league of the game, options are "nba", "mlb", "nfl", "nhl"),
            bet_type (string that specifies the type of bet you would like to get game lines for, YOU MUST SELECT ONE OF THE FOLLOWING: "moneyline", "spread", "total". IF YOU WANT ALL LINES, YOU HAVE TO CALL THIS FUNCTION THREE TIMES),
            team_one (optional) (string that specifies the team for which you would like to get game lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees"),
            team_two (optional) (string that specifies the team for which you would like to get game lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees"),
            line (optional) (float that specifies the line that you would like the sharp pick for. ONLY USE THIS IF THE USER SPECIFIES A LINE, like, Should I pick the Giants against the spread at -2.5?)
        
        """

    function_leagues = ["nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += """Function Name: get_all_game_lines (NOTE THIS CURRENTLY ONLY WORKS FOR "nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf" FOR OTHER SPORTS USE get_news OR get_google_results)
        Function Description: This function will get you all game lines (as well as direct url to place a bet on a sportsbook) for a specific league, book, team and bet type. This is great for getting all the game lines for a specific sportsbook or game. DO NOT USE THIS TO GET LINES FOR ALL GAMES IN A LEAGUE. IT WILL PRODUCE TOO MUCH INFORMATION!  You should really only use this if someone asks for lines across books for a particular game, or lines from a particular book, or links to place a bet on a particular book.
        Variables:
            league (string that specifies the league of the game, options are "nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"),
            bet_type (string that specifies the type of bet you would like to get game lines for, YOU MUST SELECT ONE OF THE FOLLOWING: "moneyline", "spread", "total". IF YOU WANT ALL LINES, YOU HAVE TO CALL THIS FUNCTION THREE TIMES),
            book_name (optional) (string that specifies the sportsbook for which you would like to get game lines (e.g., FanDuel, DraftKings, ESPNBet, BetMGM). If you want all sportsbooks, write "all"),
            team_one (optional) (string that specifies the team for which you would like to get game lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees"),
            team_two (optional) (string that specifies the team for which you would like to get game lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees"),
        
        """

    function_leagues = ["nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += """Function Name: get_best_game_lines (NOTE THIS CURRENTLY ONLY WORKS FOR "nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf" FOR OTHER SPORTS USE get_news OR get_google_results)
        Function Description: This function will get you the best game lines (as well as direct url to place a bet on a sportsbook) for a specific league, bet type, and/or team. This is great for getting the best game lines for a specific game.
        Variables:
            league (string that specifies the league of the game, options are "nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"),
            bet_type (string that specifies the type of bet you would like to get game lines for, YOU MUST SELECT ONE OF THE FOLLOWING: "moneyline", "spread", "total". IF YOU WANT ALL LINES, YOU HAVE TO CALL THIS FUNCTION THREE TIMES),
            team_one (optional) (string that specifies the team for which you would like to get game lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees"),
            team_two (optional) (string that specifies the team for which you would like to get game lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees"),
            type (optional) (string that specifies the type of game line you would like to get, options are "High Fee", "Low Fee", "Arbitrage", "Middle"),
        
        """

    function_leagues = ["nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += """Function Name: get_plus_ev_game_lines (NOTE THIS CURRENTLY ONLY WORKS FOR "nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf" FOR OTHER SPORTS USE get_news OR get_google_results)
        Function Description: This function will get you the plus EV (positive expected value) game lines (as well as direct url to place a bet on a sportsbook) for a specific league, book, bet type, and/or team. This is great for identifying mispriced bets on particular books. REQUIRED: If A LEAGUE IS NOT SPECIFIED IN THE QUESTION DO NOT PUT A LEAGUE IN. THERE ARE NOT VERY MANY PLUS EV PICKS SO YOU MUST GO AS BROAD AS POSSIBLE HERE. IF PEOPLE ASK ABOUT GENERAL BETTING ADVISE YOU MAY CONSIDER USING THIS BUT YOU MUST ALSO USE ANOTHER TOOL. THERE ARE SOMETIMES JUST NO PLUS EV BETS.
        Variables:
            bet_type (string that specifies the type of bet you would like to get game lines for, YOU MUST SELECT ONE OF THE FOLLOWING: "moneyline", "spread", "total". IF YOU WANT ALL LINES, YOU HAVE TO CALL THIS FUNCTION THREE TIMES),
            league (optional) (string that specifies the league of the player, options are "nba", "mlb", "nfl", "nhl"),
            book_name (optional) (string that specifies the sportsbook for which you would like to get game lines (e.g., FanDuel, DraftKings, ESPNBet, BetMGM). If you want all sportsbooks, write "all"),
            team_one (optional) (string that specifies the team for which you would like to get game lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees"),
            team_two (optional) (string that specifies the team for which you would like to get game lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees"),
        
        """

    function_leagues = ["nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += f"""Function Name: get_all_player_prop_lines (NOTE THIS CURRENTLY ONLY WORKS FOR "nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf". FOR OTHER SPORTS USE get_news OR get_google_results)
        Function Description: This function will get you PLAYER PROP LINES (PROPS FOR GAMES, NOT FUTURES OR SEASON PROPS) (as well as direct url to place a bet on a sportsbook) for a specific league, book, bet type, team, and/or player. This is great for getting all the player prop lines for a specific player, team, game, etc. DO NOT USE THIS TO GET LINES FOR ALL PROPS IN A LEAGUE. IT WILL PRODUCE TOO MUCH INFORMATION!  YOU SHOULD ONLY USE THIS if someone asks for lines across books for a particular player, or lines from a particular book, or a link to place a bet on a particular book. When using this tool, be as specific as you can be. There are often times 50,000+ props available across all books and all sports. We can't give you them all so we will limit to the first {MAX_RESULTS}. If a player is mentioned, add that. If a book is mentioned, add that. If a prop is mentioned and it is in the below list, add that. You can call this many times so if someone asks for five lines, run this function five times.
        Variables:
            league (string that specifies the league of the player, options are "nba", "mlb", "nfl", "nhl"),
            book_name (optional) (string that specifies the sportsbook for which you would like to get player prop lines (e.g., FanDuel, DraftKings, ESPNBet, BetMGM). If you want all sportsbooks, write "all"),
            bet_type (optional) (string that specifies the type of player prop bet you would like to get lines, if you use this you must specify a prop, if you want all props, just do not use this. Options are: {unique_player_prop_names}; IMPORTANT NOTE: IF SOMEONE IS ASKING ABOUT TOUCHDOWNS FOR A PLAYER WHO IS NOT A QB OR ANYTIME TOUCHDOWNS, THEY ARE LIKELY LOOKING FOR Player - Offense - Rushing and Receiving Touchdowns),
            team_one (optional) (string that specifies the team for which you would like to get player prop lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information),
            team_two (optional) (string that specifies the team for which you would like to get player prop lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information),
            player_name (optional) (string that specifies the player for which you would like to get player prop lines. You must write the FULL PLAYER NAME, e.g., "LeBron James", "Joe Burrow", "Aaron Judge"),
        
        """

    function_leagues = ["nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += f"""Function Name: get_all_other_prop_lines (NOTE THIS CURRENTLY ONLY WORKS FOR "nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf". FOR OTHER SPORTS USE get_news OR get_google_results)
        Function Description: This function will get you PROP LINES FOR GAME AND TEAM PROPS like team totals, quarter & half totals, quarter & half spreads, etc. (see below for all bet types) (as well as direct url to place a bet on a sportsbook) for a specific league, book, bet type, and/or team. This is great for getting all the game prop lines for a specific team, game, etc. DO NOT USE THIS TO GET LINES FOR ALL PROPS IN A LEAGUE. IT WILL PRODUCE TOO MUCH INFORMATION!  YOU SHOULD ONLY USE THIS if someone asks for lines from a particular book, or a link to place a bet on a particular book. When using this tool, be as specific as you can be. There are often times 50,000+ props available across all books and all sports. We can't give you them all so we will limit to the first {MAX_RESULTS}. If a book is mentioned, add that. If a prop is mentioned and it is in the below list, add that. You can call this many times so if someone asks for five lines, run this function five times.
        Variables:
            league (string that specifies the league of the player, options are "nba", "mlb", "nfl", "nhl"),
            book_name (optional) (string that specifies the sportsbook for which you would like to get player prop lines (e.g., FanDuel, DraftKings, ESPNBet, BetMGM). If you want all sportsbooks, write "all"),
            bet_type (optional) (string that specifies the type of player prop bet you would like to get lines, if you use this you must specify a prop, if you want all props, just do not use this. Options are: {unique_other_prop_names};
            team_one (optional) (string that specifies the team for which you would like to get player prop lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information),
            team_two (optional) (string that specifies the team for which you would like to get player prop lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information),

        """
    function_leagues = ["nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"]

    if await find_common_elements(leagues, function_leagues):
        function_descriptions += f"""Function Name: get_all_futures_lines (NOTE THIS CURRENTLY ONLY WORKS FOR "nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf". FOR OTHER SPORTS USE get_news OR get_google_results)
        Function Description: This function will get you FUTURES FOR BOTH PLAYERS AND TEAM s like team total season wins, Super Bowl Champion, NBA MVP, etc. (see below for all bet types) (as well as direct url to place a bet on a sportsbook) for a specific league, book, bet type, and/or team. This is great for getting all the lines for a specific future, etc. Note: YOU MUST INCLUDE A bet_type FOR THIS FUNCTION.  THIS IS NOT OPTIONAL.
        Variables:
            league (string that specifies the league of the player, options are "nba", "mlb", "nfl", "nhl"),
            bet_type (string that specifies the type of player prop bet you would like to get lines, if you use this you must specify a prop, if you want all props, just do not use this. Options are: {unique_futures_one_sided_names}, {unique_futures_two_sided_names};
            book_name (optional) (string that specifies the sportsbook for which you would like to get player prop lines (e.g., FanDuel, DraftKings, ESPNBet, BetMGM). If you want all sportsbooks, write "all"),
            team (optional) (string that specifies the team for which you would like to get futures lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees"),
            player (optional) (string that specifies the player for which you would like to get player prop lines. You must write the FULL PLAYER NAME, e.g., "LeBron James", "Joe Burrow", "Aaron Judge"),

        """

    function_leagues = ["nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += f"""Function Name: get_best_player_prop_lines (NOTE THIS CURRENTLY ONLY WORKS FOR "nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf". FOR OTHER SPORTS USE get_news OR get_google_results)
        Function Description: This function will get you the BEST SINGLE GAME PLAYER PROP LINES (as well as direct url to place a bet on a sportsbook) for a specific league, bet type, and/or team. This is great for getting the best player prop lines for a specific player, team, game, etc. YOU SHOULD ONLY USED THIS WHEN ASKED ABOUT WHERE TO FIND THE BEST LINES. IF SOMEONE IS ASKING FOR PLAYER PROP RECOMMENDATIONS FOR THE NBA, NHL, NFL & MLB (e.g., "What are some good props for tonight?"), DO NOT USE THIS FUNCTION. INSTEAD USE: get_player_prop_information (again, only works for NFL, NBA, MLB, and NHL) which does include best lines along with historic information and projections. When using this tool, be as specific as you can be. There are often times 50,000+ props available across all books and all sports. We can't give you them all so we will limit to the first {MAX_RESULTS}. If a player is mentioned, add that. If a book is mentioned, add that. If a prop is mentioned and it is in the below list, add that. You can call this many times so if someone asks for five lines, run this function five times.
        Variables:
            league (string that specifies the league of the player, options are "nba", "mlb", "nfl", "nhl"),
            bet_type (optional) (string that specifies the type of player prop bet you would like to get lines. YOUR ONLY OPTIONS ARE (CAREFULLY REVIEW THIS LIST) are: {unique_player_prop_names}; IMPORTANT NOTE: IF SOMEONE IS ASKING ABOUT TOUCHDOWNS FOR A PLAYER WHO IS NOT A QB OR ANYTIME TOUCHDOWNS, THEY ARE LIKELY LOOKING FOR Player - Offense - Rushing and Receiving Touchdowns),
            team_one (optional) (string that specifies the team for which you would like to get player prop lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information),
            team_two (optional) (string that specifies the team for which you would like to get player prop lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information),
            player_name (optional) (string that specifies the player for which you would like to get player prop lines. You must write the FULL PLAYER NAME, e.g., "LeBron James", "Joe Burrow", "Aaron Judge"),
            type (optional) (string that specifies the type of player prop line you would like to get, options are "High Fee", "Low Fee", "Arbitrage", "Middle"),
           
        """

    function_leagues = ["nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += f"""Function Name: get_best_other_prop_lines (NOTE THIS CURRENTLY ONLY WORKS FOR "nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf". FOR OTHER SPORTS USE get_news OR get_google_results)
        Function Description: This function will get you the BEST GAME AND TEAM PROP LINES like team totals, quarter & half totals, quarter & half spreads, etc. (as well as direct url to place a bet on a sportsbook) for a specific league, bet type, and/or team. This is great for getting the best game prop lines for a specific team, game, etc. YOU SHOULD ONLY USED THIS WHEN ASKED ABOUT WHERE TO FIND THE BEST LINES. IF SOMEONE IS ASKING FOR GAME PROP RECOMMENDATIONS FOR THE NBA, NHL, NFL & MLB (e.g., "What are some good props for tonight?"), DO NOT USE THIS FUNCTION. INSTEAD USE: get_player_prop_information (again, only works for NFL, NBA, MLB, and NHL) which does include best lines along with historic information and projections. When using this tool, be as specific as you can be. There are often times 50,000+ props available across all books and all sports. We can't give you them all so we will limit to the first {MAX_RESULTS}. If a player is mentioned, add that. If a book is mentioned, add that. If a prop is mentioned and it is in the below list, add that. You can call this many times so if someone asks for five lines, run this function five times. 
        Variables:
            league (string that specifies the league of the player, options are "nba", "mlb", "nfl", "nhl"),
            bet_type (optional) (string that specifies the type of player prop bet you would like to get lines, if you use this you must specify a prop, if you want all props, just do not use this. Options are: {unique_other_prop_names};
            team_one (optional) (string that specifies the team for which you would like to get player prop lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information),
            team_two (optional) (string that specifies the team for which you would like to get player prop lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information),
            type (optional) (string that specifies the type of player prop line you would like to get, options are "High Fee", "Low Fee", "Arbitrage", "Middle"),

        """

    function_leagues = ["nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += """Function Name: get_plus_ev_player_prop_lines (NOTE THIS CURRENTLY ONLY WORKS FOR "nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf" FOR OTHER SPORTS USE get_news OR get_google_results)
        Function Description: This function will get you the plus EV (positive expected value) SINGLE GAME PLAYER PROP LINES (as well as direct url to place a bet on a sportsbook) for a specific league, book, bet type, team, and/or player. This is great for identifying mispriced player prop bets on particular books. REQUIRED: If A LEAGUE IS NOT SPECIFIED IN THE QUESTION DO NOT PUT A LEAGUE IN. THERE ARE NOT VERY MANY PLUS EV PICKS SO YOU MUST GO AS BROAD AS POSSIBLE HERE. IF PEOPLE ASK ABOUT GENERAL BETTING ADVISE YOU MAY CONSIDER USING THIS BUT YOU MUST ALSO USE ANOTHER TOOL. THERE ARE SOMETIMES JUST NO PLUS EV BETS.
        Variables:
            league (optional) (string that specifies the league of the player, options are "nba", "mlb", "nfl", "nhl"),
            book_name (optional) (string that specifies the sportsbook for which you would like to get player prop lines (e.g., FanDuel, DraftKings, ESPNBet, BetMGM). If you want all sportsbooks, write "all"),
            team_one (optional) (string that specifies the team for which you would like to get player prop lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information),
            team_two (optional) (string that specifies the team for which you would like to get player prop lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information),
            player_name (optional) (string that specifies the player for which you would like to get player prop lines. You must write the FULL PLAYER NAME, e.g., "LeBron James", "Joe Burrow", "Aaron Judge"),
           
        """

    function_leagues = ["nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += """Function Name: get_plus_ev_fantasy_lines (NOTE THIS CURRENTLY ONLY WORKS FOR "nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf" FOR OTHER SPORTS USE get_news OR get_google_results)
        Function Description: This function will get you the plus EV (positive expected value) fantasy lines for a specific league, book, bet type, team, and/or player. This is great for identifying mispriced fantasy bets on particular fantasy books (PrizePicks & Underdog). REQUIRED: If A LEAGUE IS NOT SPECIFIED IN THE QUESTION DO NOT PUT A LEAGUE IN. THERE ARE NOT VERY MANY PLUS EV PICKS SO YOU MUST GO AS BROAD AS POSSIBLE HERE.
        Variables:
            league (optional) (string that specifies the league of the player, options are "nba", "mlb", "nfl", "nhl"),
            book_name (optional) (string that specifies the sportsbook for which you would like to get fantasy lines (e.g., PrizePicks, Underdog). If you want all sportsbooks, write "all"),
            team_one (optional) (string that specifies the team for which you would like to get fantasy lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information),
            team_two (optional) (string that specifies the team for which you would like to get fantasy lines. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "San Francisco 49ers", "New York Yankees") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information),
            player_name (optional) (string that specifies the player for which you would like to get fantasy lines. You must write the FULL PLAYER NAME, e.g., "LeBron James", "Joe Burrow", "Aaron Judge"),
        
        """

    function_leagues = ["nba", "mlb", "nfl", "nhl"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += """Function Name: respond_to_question_about_players_and_positions
        Function Description: This function will allows you to ask a dense question about players & positions generally. This function has access to a significant amount of player stats but not historic player prop lines. The function will access a dataframe of the players, create code to manipulate the dataframe, and return the relevant results. This function is good if you are asked a difficult question about player stats or position stats that the other tools can't answer, for example "How does LeBron James do on the road against east coast teams this season", or "How many rushing yards on average do the 49ers give up to quarterbacks over the last 2 years." It would be helpful to provide as much detail in order for the code to be generated to be correct. For example, If a user asks "How does LeBron James do on the road against east coast teams this season", you may want to rephrase that to "Please send the average points, rebounds and assists per game for LeBron James in away games against east coast teams this season. Also compare this against his overall season averages and tell me whether he does better or worse than average". If you use this function,YOU MUST LET THE USER KNOW THAT IT MAY TAKE A LITTLE LONGER THAN USER TO GET THE ANSWER (up to a minute) because you will be crunching the numbers.
        Variables:
            league (string that specifies the league of the player, options are "nba", "mlb", "nfl", "nhl"),
            question (string that includes a dense question that we can use to get the relevant player information you need),
            last_season (optional) (boolean that is True if you just need the last season or False if you need all seasons)
        
        """

    function_leagues = ["nba", "mlb", "nfl", "nhl"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += """Function Name: respond_to_question_about_teams
        Function Description: This function will allows you to ask a dense question about teams. This function has access to a significant amount of team stats including historic lines and game totals. The function will access a dataframe of the teams, create code to manipulate the dataframe, and return the relevant results. This function is good if you are asked a difficult question about team stats that the other tools can't answer, for example "What team allows the most home runs per game" or "What team has the best defense in the league". It would be helpful to provide as much detail in order for the code to be generated to be correct. For example, If a user asks "What team allows the most home runs per game", you may want to rephrase that to "Please send the average home runs allowed per game for each team in the league and tell me which team allows the most home runs per game". This dataframe has a single row per game so it is often best to split the question into home games and visitor games. Then combine the numbers. This leaves less room for error. If you use this function, YOU MUST LET THE USER KNOW THAT IT MAY TAKE A LITTLE LONGER THAN USER TO GET THE ANSWER (up to a minute) because you will be crunching the numbers.
        Variables:
            league (string that specifies the league of the team, options are "nba", "mlb", "nfl", "nhl"),
            question (string that includes a dense question that we can use to get the relevant team information you need),
            last_season (optional) (boolean that is True if you just need the last season or False if you need all seasons)
           
        """

    function_descriptions += """Function Name: get_google_results
    Function Description: This function will get you the most relevant articles from the web based on search terms you provide. This is great for getting the most up-to-date information on a topic that is not covered by the other tools, or for questions about obscure sports that might not be covered by major sports news sources, like "How many goals are expected in the soccer match Brescia U19 VS Crotone U19?".
    Variables:
        question (string that includes a dense question that we can use to rank the relevant articles you need),
        search_term (string that specifies the search term to run on Google),
        date_limitation_for_google_search (optional) (string that specifies the date range for the articles, options are "day", "week", "month", "year", note that for betting on upcoming games, "day" is usually the best option),
        is_sports (optional) (boolean that specifies whether the search term is sports related),
    
    """

    function_descriptions += """Function Name: get_wikipedia_results
    Function Description: This function will get you the most relevant Wikipedia page based on search terms you provide. This is great for getting comprehensive overviews of players, teams, seasons, tournaments, etc. This is a great tool to provide you with broad context to answer questions and when a user is asking general questions about a season, game, race, tournament, team, player, etc. This can give you a great deal of context. You should use this tool liberally.
    Variables:
        search_term (string that specifies the search term to run on Wikipedia),
    
    """
    function_leagues = ["mlb"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += """Function Name: get_pitcher_vs_batter_and_park_factors_data
        Function Description: This function will provide you with the (1) the start pitchers for each MLB game that is being played today: (2) splits vs right-handed batters and left-handed batters; (3) career stats of opponent batters against starting pitchers; and (4) park factors for todays games. THIS FUNCTION MUST BE USED WHEN ASSESSING ANY MLB BASEBALL BET. YOU MUST CALL THIS FUNCTION IF THE REQUESTS RELATES TO MLB BASEBALL BETS.
        Variables:
            query: (string that includes a robust query that can be used to get the information required)
        
        """
    function_leagues = ["nba"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += """Function Name: get_first_basket_info
        Function Description: This function will provide you with the first basket information for a specific NBA game. This is great for getting the first basket information for a specific game. THIS FUNCTION MUST BE USED WHEN ASSESSING ANY NBA FIRST BASKET BET. YOU MUST CALL THIS FUNCTION IF THE REQUESTS RELATES TO NBA FIRST BASKET BETS.
        Variables:
            team_one (optional) (string that specifies the team for which you would like to get first basket information. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "New York Knicks") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information),
            team_two (optional) (string that specifies the team for which you would like to get first basket information. You must write the FULL TEAM NAME, e.g., "Los Angeles Lakers", "New York Knicks") (Do not assume a team name based on a referenced player because, remember, players can be traded and you might not have the most up-to-date-information)

        """
    function_leagues = ["mls", "epl", "laliga", "nba", "nfl", "nhl", "mlb", "pga"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += """Function Name: search_statmuse
        Function Description: This function will get you the most relevant sports statistics based on search terms. This is great for getting the most up-to-date stats. THIS IS GOOD TO GET BASIC STATS LIKE A PLAYERS RUSHING YARDS PER GAME OR RUSHING YARDS PER SEASON. YOU MUST USE THIS FUNCTION WHEN A QUESTION INVOLVES STATS FOR THE FOLLOWING LEAGUES: "fc", "nba", "nfl", "nhl", "mlb", "pga". FOR DETAILED AND COMPLICATED STATISTICAL QUESIONS, YOU MUST USE respond_to_question_about_players_and_positions and/or respond_to_question_about_teams. DO NOT USE THIS TOOL ALONE. IT IS SOMETIMES GOOD BUT SOMETIMES UNRELIABLE, PAIR THIS WITH ANOTHER TOOL LIKE: get_news, respond_to_question_about_teams, respond_to_question_about_players_and_positions, get_google_results.
        Variables:
            league (string and must be one of the following: "fc", "nba", "nfl", "nhl", "mlb", "pga")
            query (string containing search terms related to the stats you are looking for)
        
        """

    function_leagues = ["nfl"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += f"""Function Name: get_optimal_picks_for_nfl_survivor_pool
        Function Description: This function will get you the optimal picks for an NFL survivor pool using the current betting odds. This is great for getting the best picks for a survivor pool. YOU MUST USE THIS FUNCTION WHEN A QUESTION INVOLVES NFL SURVIVOR POOLS. DO NOT USE THIS TOOL FOR ANYTHING ELSE. IT IS VERY SPECIFIC TO NFL SURVIVOR POOLS.
        Variables:
            start_week (optional) (int that specifies the week you would like to start the survivor pool analysis),
            end_week (optional) (int that specifies the week you would like to end the survivor pool analysis, e.g., if you are in a small pool you might want to optimize to weeks 10 or 12 instead of the entire season),
            already_picked (optional) (array of strings that contain the full team names (city and team name) of teams the user has already picked, e.g., ["New England Patriots", "Kansas City Chiefs", "Tampa Bay Buccaneers"]),
            must_pick (optional) (json containing week and team that the user wants to pick, e.g., {survivor_pool_example})
        
        """

    function_leagues = ["nfl"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += """Function Name: get_nfl_fantasy_football_projections
        Function Description: This function will get you the most accurate NFL fantasy football projections for the upcoming week as well as the rest of the season. This is great for getting the best fantasy football projections for players. This is helpful for fantasy football drafting as well as picking players week-to-week. If people ask general questions for a draft do not put in any variables. If it is week-to-week, just put in - 1 for week as the variable. ONLY USE OTHER VARIABLES WHEN SPECIFICALLY REQUESTED. YOU MUST USE THIS FUNCTION WHEN A QUESTION INVOLVES NFL FANTASY FOOTBALL. THIS FUNCTION IS BEST USED ALONG WITH GET_NEWS.
        Variables:
            week (optional) (int that specifies the week you would like to get the projections for, if you do not select a week you will get aggregate projections for the season. If you just want the current week, make this -1 and we will automatically put in the current week for you),
            position (optional) (string that specifies the position you would like to get the projections for, options are "QB", "RB", "WR", "TE", "K", "DEF", "LB", "S", "CB", "DE", "DT"),
            player_name (optional) (string that specifies the player for which you would like to get the projections for; if you need information on a team defense, you can put a full team name here, like New York Giants),
            need_dl_lb_db (optional) (boolean that specifies whether you need projections for defensive linemen, linebackers, and defensive backs. Most fantasy pools do not include specific defensive players so the default is not including this information. Only make this true if you are certain you need individual defensive player information; note team defenses (DEF) will always be included),
        
        """

    function_leagues = ["nfl"]
    if await find_common_elements(leagues, function_leagues):
        function_descriptions += """Function Name: get_nfl_player_season_stat_projections
        Function Description: This function will get you the most accurate NFL season stat projections for the entire season (all 18 weeks) or the rest of the season (this week to week 18). This is great for getting the best projections for player stats (like passing yards, or touchdowns). This is helpful for answering questions about projections for the entire season. THIS FUNCTION IS BEST USED ALONG WITH GET_NEWS. If someone asks you to compare season stats for multiple players, you must call this function multiple times. Same with multiple positions.
        Variables:
            position: You must select one of the following positions unless you are specifying a team name: "QB", "RB", "WR", "TE", "K", "DT", "CB", "DE", "LB", "S", "DB", "FB"
            player_name (optional) (string that specifies the full player name for which you would like to get the projections for),
            full_season_or_rest_of_season: string that is either "full_season" or "rest_of_season"
        
        """

    function_leagues = ["nfl"]

    if await find_common_elements(leagues, function_leagues):
        function_descriptions += """Function Name: get_nfl_team_defense_season_stat_projections
        Function Description: This function will get you the most accurate NFL season stat projections for the entire season (all 18 weeks) or the rest of the season (this week to week 18) for team defenses. This is great for getting the best projections for team defense stats (like points allowed, or sacks). This is helpful for answering questions about team defense projections for the entire season. This will return stats for all teams. THIS FUNCTION IS BEST USED ALONG WITH GET_NEWS.
        
        """

    function_descriptions += "END DESCRIPTION OF FUNCTIONS"

    return function_descriptions


async def get_preliminary_info(chat_history_string, message, log_extras):

    prompt = f"""Please send a json with the following that is related to the most recent message (please use the chat history as context to help in case some of the information is not in the most recent message):

            leagues: (array that includes all of the leagues related to the most recent message, ordered by importance; options are "nba", "mlb", "nfl", "nhl", "wnba", "ncaam", "ncaaf", "mls", "epl", "laliga", "ufc", "pga", "other"; if the question is broad, e.g., "get be today's best player props", the leagues should be all the major leagues (nba, mlb, nfl, nhl, nba) that are in season.)
            robust_question: (string that includes a robust question that includes context from the chat history and can be used to get the information required),
            google_search_terms: (string that can be used to run a google search to research the user request; make sure to include betting if the question is related to betting and fantasy if the question is related to fantasy)
            google_search_date_range: select from the following - "hour", "day", "week", "month", "year" (this is the date range for the google search),
            statmuse_search_terms: (natural language string that can be used to run a statmuse search to research the user request; note statmuse is good for general sports stats and does not provide specific betting information. So you should only ask it for general stats.)

            Here are some examples:

            Question: "What are the best player props for tonight?"
            Answer: "leagues": ["nba", "mlb", "nfl", "nhl"], "robust_question": "Please send the best player props for tonight", "google_search_terms": "best betting player props for tonight", "google_search_date_range": "day", "statmuse_search_terms": "stats for top players"

            Question: "What are the hit lines for Jose Ramirez tonight?"
            Answer: "leagues": ["mlb"], "robust_question": "Please send the hit betting lines for Jose Ramirez tonight", "google_search_terms": "betting hit lines for Jose Ramirez tonight", "google_search_date_range": "day", "statmuse_search_terms": "Jose Ramirez hitting stats"

            Question: "Can you give me a preview of the Sunday Night Football Game?"
            Answer: "leagues": ["nfl"], "robust_question": "Please give me a preview of the Sunday Night Football Game", "google_search_terms": "Sunday Night Football Game preview", "google_search_date_range": "day", "statmuse_search_terms": "sunday night football stats"

            Question: "Who should I start for my fantasy team, Joe Mixon or Saquon Barkley?"
            Answer: "leagues": ["nfl"], "robust_question": "Who should I start for my fantasy team, Joe Mixon or Saquon Barkley", "google_search_terms": "Joe Mixon vs Saquon Barkley fantasy start", "google_search_date_range": "day", "statmuse_search_terms": "Joe Mixon vs Saquon Barkley stats"

            Question: "Can you get me the best line for Saquon Barkley's 1st Half Touchdowns?"
            Answer: "leagues": ["nfl"], "robust_question": "Please get me the best line for Saquon Barkley's 1st Half Touchdowns", "google_search_terms": "best betting line for Saquon Barkley 1st Half Touchdowns", "google_search_date_range": "day", "statmuse_search_terms": "Saquon Barkley 1st Half Touchdowns stats"

            HERE IS THE CHAT HISTORY

            {chat_history_string}

            START MOST RECENT MESSAGE

            {message}

            END MOST RECENT MESSAGE

            Today's date is {datetime.now().astimezone(pytz.timezone('US/Eastern')).strftime('%A, %B %d, %Y')}. The time is {datetime.now().astimezone(pytz.timezone('US/Eastern')).strftime('%H:%M:%S')}.

            Recall that the following leagues are in season during the following months:
            NFL: September, October, November, December, January, February
            NBA: October, November, December, January, February, March, April, May, June
            NHL: October, November, December, January, February, March, April, May, June
            MLB: April, May, June, July, August, September, October

            Notes on league importance if there is a general question. Here is the order of importance for the major leagues:
            NFL (if it is Thursday, Monday or Sunday, else NFL is last)
            NBA
            NHL
            MLB

            IMPORTANT: Do not make assumptions about players or teams. Just include terms that are in the most recent message and informed by the chat history. JUST SEND THE PERFECTLY FORMATTED JSON."""

    content = "You send back perfectly formatted json files that contain: league, google_search_terms, google_search_date_range, statmuse_search_terms, question_type."

    model_name = "gpt-4o-mini"
    response_json = await get_open_ai_query(model_name, prompt, content, log_extras=log_extras)

    json_string = response_json['text']
    model_used_json = {
        "model": response_json['model'],
        "input_tokens": response_json['input_tokens'],
        "output_tokens": response_json['output_tokens'],
        "cached_tokens": response_json['cached_tokens'],
    }

    return json_string, model_used_json

async def run_coroutines(google_search_terms, google_search_date_range, statmuse_search_terms, leagues, run_statmuse, timeout, log_extras):

    time0 = time.time()

    # Function to wrap each coroutine with a timeout
    async def run_with_timeout(coroutine, timeout):
        try:
            return await asyncio.wait_for(coroutine, timeout)
        except asyncio.TimeoutError:
            log.error('Coroutine Timed Out', extra={
                'coroutine': coroutine,
                'seconds': timeout,
                **log_extras
            })
            return None  # Or some other indication of timeout

    # Create a list of coroutines to run concurrently
    coroutines = [
        run_with_timeout(get_google_front_page(google_search_terms, google_search_date_range, log_extras), timeout)
    ]

    # get the main league
    league = leagues[0]
    if league in ["nba", "mlb", "nfl", "nhl", "wnba", "ncaam", "ncaaf", "mls", "epl", "laliga", "ufc", "pga"]:
        coroutines.append(run_with_timeout(get_todays_game_string(log_extras, league), timeout))
        coroutines.append(run_with_timeout(get_yesterdays_game_string(log_extras, league), timeout))

    if run_statmuse:
        if league in ["epl", "nba", "nfl", "nhl", "mlb", "pga"]:
            if league == "epl":
                league = "fc"
            coroutines.append(run_with_timeout(search_statmuse(league, statmuse_search_terms, log_extras), timeout))

    # Run all coroutines concurrently and wait for them to finish
    results = await asyncio.gather(*coroutines)
    log.info('Preliminary Search Completed', extra={
        'league': league,
        'google_search_terms': google_search_terms,
        'google_search_date_range': google_search_date_range,
        'statmuse_search_terms': statmuse_search_terms,
        'runtime': time.time() - time0,
        **log_extras
    })

    # Assign results to variables
    google_front_page = results[0]

    if league in ["nba", "mlb", "nfl", "nhl", "wnba", "ncaam", "ncaaf", "mls", "epl", "laliga", "ufc", "pga"]:
        try:
            todays_game_string = results[1]
        except Exception as e:
            log.error('Game String Error', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras})
            todays_game_string = ""
        try:
            yesterdays_game_string = results[2]
        except Exception as e:
            log.error('Game String Error', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras})
            yesterdays_game_string = ""
    else:
        todays_game_string = ""
        yesterdays_game_string = ""

    statmuse_results_string = ""
    if run_statmuse:
        if league in ["epl", "nba", "nfl", "nhl", "mlb", "pga"]:
            try:
                if results[3] == None:
                    statmuse_results = pd.DataFrame()
                else:
                    statmuse_results, statmuse_models_used = results[3]
                try:
                    if statmuse_results == None: statmuse_results = pd.DataFrame()
                except:
                    pass
            except Exception as e:
                log.error('Statmuse Result Error', extra={
                    'error': repr(e),
                    'traceback': traceback.format_exc(),
                    'results': results,
                    **log_extras
                })
                statmuse_results = pd.DataFrame()
        else:
            statmuse_results = pd.DataFrame()

        if len(statmuse_results) > 0:
            statmuse_results_string = "\n\nSTART STATMUSE RESULTS\n\n"
            for i, row in statmuse_results.iterrows():
                for column in statmuse_results.columns:
                    statmuse_results_string += f"{column}: {row[column]}\n\n"
            statmuse_results_string += "END STATMUSE RESULTS\n\n"

    return google_front_page, yesterdays_game_string, todays_game_string, statmuse_results_string

async def get_lite_information(message, max_history_length, chat_history, log_extras):
    models_used_array = []
    try:

        try:
            chat_history = clean_history(max_history_length, chat_history)
        except:
            pass

        chat_history_string = ""

        if not pd.isna(chat_history) and chat_history.strip() != "":
            chat_history_string = f"\n\nHere are the chats prior to the most recent question (we call chat history).\n\nSTART CHAT HISTORY\n\n{chat_history}\n\nEND CHAT HISTORY\n\n"

        json_string, model_used_json = await get_preliminary_info(chat_history_string, message, log_extras)

        models_used_array.append(model_used_json)

        json_response = await load_json(json_string)
        leagues = json_response["leagues"]

        robust_question = json_response["robust_question"]

        #check if leagues is string
        if isinstance(leagues, str): leagues = ast.literal_eval(leagues)

        google_search_date_range = json_response["google_search_date_range"]
        statmuse_search_terms = json_response["statmuse_search_terms"]
        google_search_terms = json_response["google_search_terms"]
        google_search_terms = google_search_terms.replace('"', "").replace("'", "")

        #run coroutines
        google_front_page, yesterdays_game_string, todays_game_string, statmuse_results_string = await run_coroutines(google_search_terms, google_search_date_range, statmuse_search_terms, leagues, False, 5, log_extras)

    except Exception as e:
        log.error('Error getting Required Tools', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'inputMessage': message,
            **log_extras
        })

        leagues = []
        google_front_page = ""
        yesterdays_game_string = ""
        todays_game_string = ""
        statmuse_results_string = ""
        robust_question = ""
        google_search_date_range = ""

    return leagues, google_front_page, yesterdays_game_string, todays_game_string, statmuse_results_string, robust_question, google_search_date_range, models_used_array

#Determines which tools to use in a chat response
async def get_tools_required(message, max_history_length, chat_history, log_extras, short_term_memory=None):

    models_used_array = []
    leagues = []
    try:

        chat_history = clean_history(max_history_length, chat_history)

        short_term_memory_string = ""
        chat_history_string = ""
        if short_term_memory:
            short_term_memory_string = f"\n\nHere are a few short paragraphs describing the conversation (we call short term memory).\n\nSHORT TERM MEMORY\n\n{short_term_memory}\n\nEND SHORT TERM MEMORY\n\n"

        if not pd.isna(chat_history) and chat_history.strip() != "":
            chat_history_string = f"\n\nHere are the chats prior to the most recent question (we call chat history).\n\nSTART CHAT HISTORY\n\n{chat_history}\n\nEND CHAT HISTORY\n\n"

        json_string, model_used_json = await get_preliminary_info(chat_history_string, message, log_extras)

        models_used_array.append(model_used_json)

        json_response = await load_json(json_string)
        leagues = json_response["leagues"]

        #check if leagues is string
        if isinstance(leagues, str): leagues = ast.literal_eval(leagues)

        google_search_date_range = json_response["google_search_date_range"]
        statmuse_search_terms = json_response["statmuse_search_terms"]
        google_search_terms = json_response["google_search_terms"]
        google_search_terms = google_search_terms.replace('"', "").replace("'", "")

        #run coroutines
        google_front_page, yesterdays_game_string, todays_game_string, statmuse_results_string = await run_coroutines(google_search_terms, google_search_date_range, statmuse_search_terms, leagues, False, 5, log_extras)

        todays_date_and_time_est = datetime.now().astimezone(pytz.timezone('US/Eastern')).strftime('%Y-%m-%d %H:%M:%S')

        json_examples = ""

        example_leagues = ["nba", "mlb", "nfl", "nhl",]
        if await find_common_elements(leagues, example_leagues):

            #TODO - Make sure examples are current and players are on the teams they should be. Make sure prop name is right.
            example_question_1 = """For the question: "I'm thinking about betting on the over for points for Jalen Brunson and Josh Hart in the Knicks game tonight, what do you think?", here is an example json that calls as tools get_news and get_player_prop_information provides a temporary response:"""

            example_json_1 = """{
                "tools": 
                [
                    {
                        "name": "get_news",
                        "params": {
                            "question": "Can you get me the latest information on NBA players Josh Hart and Jalen Brunson?",
                            "date_range": "day"
                        }
                    },
                    {
                        "name": "get_player_prop_information",
                        "params": {
                            "league": "nba",
                            "team_one": "New York Knicks",
                            "player_name": "Josh Hart",
                            "prop": "Points"
                        }
                    },
                    {
                        "name": "get_player_prop_information",
                        "params": {
                            "league": "nba",
                            "team_one": "New York Knicks",
                            "player_name": "Jalen Brunson",
                            "prop": "Points"
                        }
                    }
                ],
                "temporary_answer": "Let me get the latest stats for Josh Hart and Jalen Brunson. Give me a minute."
            }"""

            json_examples += f"""
            
            {example_question_1}
            
            {example_json_1}
            
            """
        example_leagues = ["nba", "mlb", "nfl", "nhl"]
        if await find_common_elements(leagues, example_leagues):
            example_question_2 = """For the question: "Can you get me some good picks for the Chiefs game?", here is an example json that calls as tools get_best_game_lines (to get the best moneyline, spread, and total), get_news, get_player_prop_information, and get_sharp_picks_table and provides a temporary response:"""

            example_json_2 = """{
                "tools": [
                    {
                        "name": "get_best_game_lines",
                        "params": {
                            "league": "nfl",
                            "bet_type": "moneyline",
                            "team_one": "Kansas City Chiefs"
                        }
                    },
                    {
                        "name": "get_best_game_lines",
                        "params": {
                            "league": "nfl",
                            "bet_type": "spread",
                            "team_one": "Kansas City Chiefs"
                        }
                    },
                    {
                        "name": "get_best_game_lines",
                        "params": {
                            "league": "nfl",
                            "bet_type": "total",
                            "team_one": "Kansas City Chiefs"
                        }
                    },
                    {
                        "name": "get_news",
                        "params": {
                            "question": "Can you get me the last news on the Chiefs game?",
                            "date_range": "day"
                        }
                    },
                    {
                        "name": "get_player_prop_information",
                        "params": {
                            "league": "nfl",
                            "team_one": "Kansas City Chiefs"
                        }
                    },
                    {
                        "name": "get_game_sharp_picks_table",
                        "params": {
                            "league": "nfl",
                            "bet_type": "moneyline",
                            "team_one": "Kansas City Chiefs"
                        }
                    },
                    "name": "get_game_sharp_picks_table",
                        "params": {
                            "league": "nfl",
                            "bet_type": "spread",
                            "team_one": "Kansas City Chiefs"
                        }
                    },
                    "name": "get_game_sharp_picks_table",
                        "params": {
                            "league": "nfl",
                            "bet_type": "total",
                            "team_one": "Kansas City Chiefs"
                        }
                    }
                ],
                "temporary_answer": "I am pulling up the best lines, latest news and researching some good picks for you. I'll get back to you with my analysis in a minute."
            }"""

            json_examples += f"""
            
            {example_question_2}
            
            {example_json_2}
            
            """

        example_leagues = ["nba", "mlb", "nfl", "nhl"]
        if await find_common_elements(leagues, example_leagues):
            example_question_3 = """For the question: "How does Lebron do on the road against east coast teams this season?  What about the lakers as a team?", here is an example json that calls as tools respond_to_question_about_players_and_positions and respond_to_question_about_teams, and provides a temporary response:"""

            example_json_3 = """{
                "tools": [
                    {
                        "name": "respond_to_question_about_players_and_positions",
                        "params": {
                            "league": "nba",
                            "question": "How does LeBron James do this season on the road against east coast teams? Please send me his average points per game, rebounds per game, and assists per game on the road against east coast teams, and compare these against his season averages.",
                            "last_season": True
                        }
                    },
                    {
                        "name": "respond_to_question_about_teams",
                        "params": {
                            "league": "nba",
                            "question": "How do the Lakers do this season on the road against east coast teams? Please send me their average points per game and their opponents' average points per game on the road against east coast teams, and compare these against the Lakers' season averages.",
                            "last_season": True
                        }
                    }
                ],
                "temporary_answer": "I am crunching the numbers on LeBron and the Lakers. As soon as I'm done, I'll get back to you with my analysis."
            }"""

            json_examples += f"""

            {example_question_3}

            {example_json_3}

            """

        example_leagues = ["nba", "mlb", "nfl", "nhl"]
        if await find_common_elements(leagues, example_leagues):
            example_question_4 = """For the question: "What are some good prizepicks bets for today?", here is an example json that calls as tools get_player_prop_information (If you are asked a general question, YOU MUST GET PRIZEPICKS OR UNDERDOG PICKS FOR ALL LEAGUES IN SEASON), get_plus_ev_fantasy_lines and get_news and provides a temporary response:"""

            example_json_4 = """{
                "tools": [
                    {
                        "name": "get_player_prop_information",
                        "params": {
                            "league": "nba",
                            "book_name": "PrizePicks",
                            "is_general": True
                        }
                    },
                    {
                        "name": "get_player_prop_information",
                        "params": {
                            "league": "nfl",
                            "book_name": "PrizePicks",
                            "is_general": True
                        }
                    },
                    {
                        "name": "get_player_prop_information",
                        "params": {
                            "league": "nhl",
                            "book_name": "PrizePicks",
                            "is_general": True
                        }
                    },
                    {
                        "name": "get_player_prop_information",
                        "params": {
                            "league": "mlb",
                            "book_name": "PrizePicks",
                            "is_general": True
                        }
                    },
                    {
                        "name": "get_plus_ev_fantasy_lines",
                        "params": {
                            "book_name": "PrizePicks"
                        }
                    },
                    {
                        "name": "get_news",
                        "params": {
                            "question": "Best PrizePicks bets today",
                            "date_range": "day"
                        }
                    }
                ],
                "temporary_answer": "I am looking up the best PrizePicks bets for today. I'll get back to you with the key stats shortly."
            }"""

            json_examples += f"""
            
            {example_question_4}
            
            {example_json_4}
            
            """

        example_leagues = ["nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"]
        if await find_common_elements(leagues, example_leagues):
            example_question_5 = """For the question: I want to bet the over on Joe Burrow's passing yards. Can you get me some good lines? Here is an example json that calls as tools get_best_player_prop_lines and provides a temporary response:"""

            example_json_5 = """{
                "tools": [
                    {
                        "name": "get_best_player_prop_lines",
                        "params": {
                            "league": "nfl",
                            "player_name": "Joe Burrow"
                        }
                    }
                ],
                "temporary_answer": "I am looking up Joe Burrow's passing yards prop for you. I'll get back to you with the best lines I can find."
            }"""

            json_examples += f"""
            
            {example_question_5}
            
            {example_json_5}
            
            """

        example_leagues = ["nba", "mlb", "nfl", "nhl", "wnba", "ncaam", "ncaaf", "mls", "epl", "laliga", "ufc", "pga"]
        if await find_common_elements(leagues, example_leagues):

            example_question_6 = """For the question: I have the over on Steph Curry's three's right now. How's he doing? Here is an example json that calls as tools get_game_log and provides a temporary response:"""

            example_json_6 = """{
                "tools": [
                    {
                        "name": "get_game_log",
                        "params": {
                            "league": "nba",
                            "question": "How many three-pointers does Steph Curry currently have in the game he is playing right now?"
                        }
                    }
                ],
                "temporary_answer": "I am looking up how Steph Curry is doing and will get back to you with the key stats shortly."
            }"""

            json_examples += f"""

            {example_question_6}

            {example_json_6}

            """

        example_question_7 = """For the question: How'd Tyson Fury do in his fight over the weekend? Here is an example json that calls as tools get_news (note, I still picked a day so that I can ONLY get post-fight articles to avoid confusion. STILL PICK DAY HERE.) and provides a temporary response:"""

        example_json_7 = """{
            "tools": [
                {
                    "name": "get_news",
                    "params": {
                        "question": "Tyson Fury fight last night",
                        "date_range": "day"
                    }
                }
            ],
            "temporary_answer": "I am grabbing the stats for the last Tyson Fury fight and will get back to you with the key stats shortly."
        }"""

        json_examples += f"""

        {example_question_7}

        {example_json_7}

        """

        example_question_8 = """For the question: Can you send me a break down of Game 2 of the Eastern Conference Finals. Here is an example json that calls as tools get_news (note: I MUST NOT ASSUME TEAMS THAT ARE PLAYING AND THEREFORE CANNOT USE OTHER TOOLS. YOUR TRAINING DATA IS OLD AND YOU DO NOT KNOW WHO IS PLAYING IN THE EASTERN CONFERENCE FINALS WITH ONLY THIS CONTEXT. ONCE YOU HAVE MORE CHAT HISTORY YOU CAN HONE IN ON MORE INFORMATION) and provides a temporary response:"""

        example_json_8 = """{
            "tools": [
                {
                    "name": "get_news",
                    "params": {
                        "question": "Eastern Conference Finals Game 2",
                        "date_range": "day"
                    }
                }
            ],
            "temporary_answer": "Let me do some research on the key storylines heading into Game 2. I'll put together a script for the intro and be right back with you."
        }"""

        json_examples += f"""
        
        {example_question_8}
        
        {example_json_8}
        
        """

        example_leagues = ["nba", "mlb", "nfl", "nhl", "wnba", "ncaam", "ncaaf", "mls", "epl", "laliga", "ufc", "pga"]
        if await find_common_elements(leagues, example_leagues):
            example_question_9 = """For the question: The Red Sox game just ended, can you tell me how they did?. Here is an example json that calls as tools get_game_log and get_news and provides a temporary response:"""

            example_json_9 = """{
                "tools": [
                    {
                        "name": "get_game_log",
                        "params": {
                            "league": "mlb",
                            "question": "Provide a detailed summary of the Red Sox game today."
                        }
                    },
                    {
                        "name": "get_news",
                        "params": {
                            "question": "Red Sox game today",
                            "date_range": "day"
                        }
                    }
                ],
                "temporary_answer": "I am looking up the game log and recent news and will get back to you with a detailed summary shortly."
            }"""

            json_examples += f"""
            
            {example_question_9}
            
            {example_json_9}
            
            """

        example_leagues = ["nfl", 'nba', 'nhl', 'mlb']
        if await find_common_elements(leagues, example_leagues):
            example_question_10 = """For the question: "How many sacks did the Giants give up last season?", here is an example json that calls as tools get_news and respond_to_question_about_teams, and provides a temporary response:"""

            example_json_10 = """{
                "tools": [
                    {
                        "name": "respond_to_question_about_teams",
                        "params": {
                            "league": "nfl",
                            "question": "How many sacks did the Giants give up last season? Give me the number of sacks allowed at home, away, and the total number of sacks allowed. Just include regular season games.",
                            "last_season": True
                        }
                    },
                    {
                        "name": "get_news",
                        "params": {
                            "question": "New York Giants sacks allowed in the last NFL season",
                            "date_range": "year"
                        }
                    }
                ],
                "temporary_answer": "I am looking up the number of sacks the Giants gave up last season and will get back to you with the key stats shortly."
            }"""

            json_examples += f"""
            
            {example_question_10}
            
            {example_json_10}
            
            """

        example_leagues = ["nfl", 'nba', 'nhl', 'mlb']
        if await find_common_elements(leagues, example_leagues):
            example_question_11 = """For the question: "How many runs does hunter greene allow in the first inning when he pitches?", here is an example json that calls as a tool respond_to_question_about_players_and_positions and provides a temporary response:"""

            example_json_11 = """{
                "tools": [
                    {
                        "name": "respond_to_question_about_players_and_positions",
                        "params": {
                            "league": "mlb",
                            "question": "How many runs does Hunter Greene allow in the first inning when he pitches? Please send me his average runs allowed per game, the total number of games you've reviewed, and a table showing results for the last 10 games (include dates)."
                        }
                    }
                ],
                "temporary_answer": "I am crunching the numbers on Hunter Greene's first inning runs allowed. As soon as I'm done, I'll get back to you with my analysis."
            }"""

            json_examples += f"""
            
            {example_question_11}
            
            {example_json_11}
            
            """

        example_leagues = ["nba", "mlb", "nfl", "nhl", "wnba", "ncaam", "ncaaf", "mls", "epl", "laliga", "ufc", "pga"]
        if await find_common_elements(leagues, example_leagues):
            example_question_12 = """For the question: "Did this bet hit tonight: Tarik Skubal Under 6.5 Pitcher Strikeouts?", here is an example json that calls as a tool get_game_log and provides a temporary response (note for this question, I ONLY REQUESTED THE GAME LOG. I DID NOT REQUEST NEWS BECAUSE THAT WILL JUST MUDDY THE RESEARCH):"""

            example_json_12 = """{
                "tools": [
                    {
                        "name": "get_game_log",
                        "params": {
                            "league": "mlb",
                            "question": "How many strikeouts did Tarik Skubal pitch today?"
                        }
                    }
                ],
                "temporary_answer": "I'm looking up Tarik Skubal's strikeouts for you. I'll get back to you with the key stats shortly."
            }"""

            json_examples += f"""
            
            {example_question_12}
            
            {example_json_12}
            
            """

        example_leagues = ["mlb"]
        if await find_common_elements(leagues, example_leagues):
            example_question_13 = """For the question: "Which batters are most likely to hit a home run today?", here is an example json that calls as tools get_player_prop_information, get_pitcher_vs_batter_and_park_factors_data, and get_news and provides a temporary response:"""

            example_json_13 = """{
                "tools": [
                    {
                        "name": "get_pitcher_vs_batter_and_park_factors_data",
                        "params": {
                            "query": "Reviewing pitcher vs. batter and park factor data, which batters are most likely to hit a home run today?"
                        }
                    },
                    {
                        "name": "get_player_prop_information",
                        "params": {
                            "league": "mlb",
                            "prop": "Player - Batting - Home Run"
                        }
                    }
                ],
                "temporary_answer": "I am looking up the most likely batters to hit a home run today. I'll get back to you with the key stats shortly."
            }"""

            json_examples += f"""
            
            {example_question_13}
            
            {example_json_13}
            
            """

        example_leagues = ["nba", "mlb", "nfl", "nhl"]
        if await find_common_elements(leagues, example_leagues):
            example_question_14 = """For the question: "Find the best total base props today with odds on FanDuel between -150 and +150.", here is an example json that calls as tools get_player_prop_information and get_news and provides a temporary response:"""

            example_json_14 = """{
                "tools": [
                    {
                        "name": "get_player_prop_information",
                        "params": {
                            "league": "mlb",
                            "prop": "Player - Batting - Total Bases",
                            "book_name": "FanDuel",
                            "min_odds": "-150",
                            "max_odds": "150"
                        }
                    },
                    {
                        "name": "get_news",
                        "params": {
                            "question": "Best total base props today with odds on FanDuel between -150 and +150.",
                            "date_range": "day"
                        }
                    }
                ],
                "temporary_answer": "I am looking up the best total base props on FanDuel between -150 and +150. I'll get back to you with the key stats shortly."
            }"""

            json_examples += f"""
            
            {example_question_14}
            
            {example_json_14}
            
            """

        example_leagues = ["nba", 'nfl', 'nhl', 'mlb']
        if await find_common_elements(leagues, example_leagues):
            example_question_15 = """For the question: "I am working on my NBA fantasy draft and am picking between Josh Allen, Jalen Hurts, and Patrick Mahomes. Can you give me some advice on who to choose?", here is an example json that calls as tools search_statmuse, get_news for each of the three players and respond_to_question_about_players_and_positions for all three players, and provides a temporary response:"""

            example_json_15 = """{
                "tools": [
                    {
                        "name": "search_statmuse",
                        "params": {
                            "league": "nfl",
                            "query": "Josh Allen stats"
                        }
                    },
                    {
                        "name": "get_news",
                        "params": {
                            "question": "Josh Allen fantasy football advice"
                        }
                    },
                    {
                        "name": "search_statmuse",
                        "params": {
                            "league": "nfl",
                            "query": "Jalen Hurts stats"
                        }
                    },
                    {
                        "name": "get_news",
                        "params": {
                            "question": "Jalen Hurts fantasy football advice"
                        }
                    },
                    {
                        "name": "search_statmuse",
                        "params": {
                            "league": "nfl",
                            "query": "Patrick Mahomes stats"
                        }
                    },
                    {
                        "name": "get_news",
                        "params": {
                            "question": "Patrick Mahomes fantasy football advice"
                        }
                    },
                    {
                        "name": "respond_to_question_about_players_and_positions",
                        "params": {
                            "league": "nfl",
                            "question": "Please send me the per game average in all key stats used to calculate fantasy scores for Josh Allen, Jalen Hurts, and Patrick Mahomes this season.",
                            "last_season": True
                        }
                    }
                ],
                "temporary_answer": "I am looking up the stats for Josh Allen, Jalen Hurts, and Patrick Mahomes. I'll get back to you with the key stats shortly."
            }"""

            json_examples += f"""
            
            {example_question_15}
            
            {example_json_15}
            
            """

        example_leagues = ["nfl", 'nba', 'nhl', 'mlb']
        if await find_common_elements(leagues, example_leagues):
            example_question_16 = """For the question: "Can you get me the best props for the NFL preseason today?", here is an example json that calls as tools get_player_prop_information and get_news and provides a temporary response:"""

            example_json_16 = """{
                "tools": [
                    {
                        "name": "get_player_prop_information",
                        "params": {
                            "league": "nfl",
                            "is_general": True
                        }
                    },
                    {
                        "name": "get_news",
                        "params": {
                            "question": "Best props for the NFL preseason today",
                            "date_range": "day"
                        }
                    }
                ],
                "temporary_answer": "I am looking up the best props for the NFL preseason today. I'll get back to you with the key stats shortly."
            }"""

            json_examples += f"""
            
            {example_question_16}
            
            {example_json_16}
            
            """

        example_leagues = ["nfl", 'nba', 'nhl', 'mlb']
        if await find_common_elements(leagues, example_leagues):
            example_question_17 = """For the Question: "Can you build a table for today's MLB games that includes total run averages and projections for total runs in today's games?", here is an example json that calls as tools respond_to_question_about_teams and get_pitcher_vs_batter_and_park_factors_data and provides a temporary response:."""

            example_json_17 = """{
                "tools": [
                    {
                        "name": "respond_to_question_about_teams",
                        "params": {
                            "league": "mlb",
                            "question": "Please send me a list of average total runs scored per game this season for each team in the league sorted from highest to lowest.",
                            "last_season": True
                        }
                    },
                    {
                        "name": "get_pitcher_vs_batter_and_park_factors_data",
                        "params": {
                            query: ""Provide me any relevant statistics for this game that can assist in predicting the total runs scored in today's games.""
                        }
                    }
                ],
                "temporary_answer": "I am looking up the average runs scored per game for each team in the league this season and will get back to you with the key stats shortly."
            }"""

            json_examples += f"""
            
            {example_question_17}
            
            {example_json_17}
            
            """

        example_leagues = ["nfl", 'nba', 'nhl', 'mlb', 'ncaaf', 'ncaam']
        if await find_common_elements(leagues, example_leagues):
            example_question_18 = """For the question: "Can you get me any mispriced lines today?", here is an example json that calls as tools get_plus_ev_game_lines and get_plus_ev_player_prop_lines and provides a temporary response:"""

            example_json_18 = """{
                "tools": [
                    {
                        "name": "get_plus_ev_game_lines",
                        "params": {
                            "bet_type": "moneyline"
                        }
                    },
                    {
                        "name": "get_plus_ev_game_lines",
                        "params": {
                            "bet_type": "spread"
                        }
                    },
                    {
                        "name": "get_plus_ev_game_lines",
                        "params": {
                            "bet_type": "total"
                        }
                    },
                    {
                        "name": "get_plus_ev_player_prop_lines",
                        "params": {}
                    }
                ],
                "temporary_answer": "I am looking for any mispriced lines today. I'll get back to you with the key stats shortly."
            }"""

            json_examples += f"""
            
            {example_question_18}
            
            {example_json_18}
            
            """

        example_leagues = ['mlb']
        if await find_common_elements(leagues, example_leagues):
            example_question_19 = """For the question: "Build a chart for the top 10 most likely players to record at least one hit today based off of pitcher vs. batter matchups and park factor data. Please include the matchup data and park factor data in the chart.", here is an example json that calls as tools get_pitcher_vs_batter_and_park_factors_data ONLY (because this is specified in the question) and provides a temporary response:"""

            example_json_19 = """{
                "tools": [
                    {
                        "name": "get_pitcher_vs_batter_and_park_factors_data",
                        "params": {
                            "query": "Top 10 most likely players to record at least one hit today based off of pitcher vs. batter matchups and park factor data."
                        }
                    }
                ],
                "temporary_answer": "I am looking up the top 10 most likely players to record at least one hit today. I'll get back to you with the key stats shortly."
            }"""

            json_examples += f"""
            
            {example_question_19}
            
            {example_json_19}
            
            """

        example_leagues = ['nfl']
        if await find_common_elements(leagues, example_leagues):
            example_question_20 = """For the question: "I have the following three running-backs on my fantasy team: Saquon Barkley, Josh Jacobs, Joe Mixon. Which 2 should I start this week?", here is an example json that calls as tools get_nfl_fantasy_football_projections and get_news and provides a temporary response:"""

            example_json_20 = """{
                "tools": [
                    {
                        "name": "get_nfl_fantasy_football_projections",
                        "params": {
                            "week": -1,
                            "position": "RB",
                            "player_name": "Saquon Barkley"
                        }
                    },
                    {
                        "name": "get_nfl_fantasy_football_projections",
                        "params": {
                            "week": -1,
                            "position": "RB",
                            "player_name": "Josh Jacobs"
                        }
                    },
                    {
                        "name": "get_nfl_fantasy_football_projections",
                        "params": {
                            "week": -1,
                            "position": "RB",
                            "player_name": "Joe Mixon"
                        }
                    },
                    {
                        "name": "search_statmuse",
                        "params": {
                            "league": "nfl",
                            "query": "Saquon Barkley stats"
                        }
                    },
                    {
                        "name": "search_statmuse",
                        "params": {
                            "league": "nfl",
                            "query": "Josh Jacobs stats"
                        }
                    },
                    {
                        "name": "search_statmuse",
                        "params": {
                            "league": "nfl",
                            "query": "Joe Mixon stats"
                        }
                    },
                    {
                        "name": "get_news",
                        "params": {
                            "question": "Can you get me the latest information on Saquon Barkley, Josh Jacobs, and Joe Mixon?",
                            "date_range": "day"
                        }
                    },
                    {
                        "name": "respond_to_question_about_players_and_positions",
                        "params": {
                            "league": "nfl",
                            "question": "Please send me the per game average in all key stats used to calculate fantasy scores for Saquon Barkley, Josh Jacobs, Joe Mixon this season.",
                            "last_season": True
                        }
                    }
                ],
                "temporary_answer": "I am looking up the season stats, projections and recent news for Saquon Barkley, Josh Jacobs, and Joe Mixon. I'll get back to you with the key stats shortly."
            }"""

            json_examples += f"""
            
            {example_question_20}
            
            {example_json_20}
            
            """

        example_leagues = ['nfl', 'nba', 'nhl', 'mlb']
        if await find_common_elements(leagues, example_leagues):

            example_question_21 = """For the question: "How many rushing yards on average do the 49ers give up to quarterbacks over the last 2 years?", here is an example json that calls as a tool respond_to_question_about_players_and_positions and provides a temporary response:"""

            example_json_21 = """{
                "tools": [
                    {
                        "name": "respond_to_question_about_players_and_positions",
                        "params": {
                            "league": "nfl",
                            "question": "How many rushing yards on average do the San Francisco 49ers give up to quarterbacks over the last 2 years? Please send me average yards per game opponent quarterbacks rushed against the San Francisco 49ers. Also send me averages when the 49ers are at home and averages when they are away."
                        }
                    }
                ],
                "temporary_answer": "I'm analyzing the 49ers' defense against quarterback rushing over the past two years. I'll get back to you shortly with the average yards allowed per game, including breakdowns for home and away games."
            }"""

            json_examples += f"""
            
            {example_question_21}
            
            {example_json_21}
            
            """

        example_leagues = ["nfl", 'nba', 'nhl', 'mlb', 'ncaaf', 'ncaam']
        if await find_common_elements(leagues, example_leagues):
            example_question_22 = """For the question: "Can you get me the lines for Jose Ramirez Hits across all books?", here is an example json that calls as a tools get_all_player_prop_lines, and get_news and provides a temporary response:"""

            example_json_22 = """{
                            "tools": [
                                {
                                    "name": "get_all_player_prop_lines",
                                    "params": {
                                        "league": "mlb",
                                        "bet_type": "Batting - Hits"
                                    }
                                }
                            ],
                            "temporary_answer": "I'm looking up the lines for Jose Ramirez's his. I'll get these to you shortly."
                        }"""

            json_examples += f"""

                        {example_question_22}

                        {example_json_22}

                        """

        example_leagues = ["nfl", 'nba', 'nhl', 'mlb']
        if await find_common_elements(leagues, example_leagues):
            example_question_23 = """For the question: "Can you make me a table of all NBA player props where the player has hit the over the current line in 8 of the last 10 games?", here is an example json that calls as a tool get_player_prop_information get_news and provides a temporary response:"""

            example_json_23 = """{
                "tools": [
                    {
                        "name": "get_player_prop_information",
                        "params": {
                            "league": "nba",
                            "hit_type": "over",
                            "hit_count": 10
                        }
                    },
                    {
                        "name": "get_news",
                        "params": {
                            "question": "Top NBA player props",
                            "date_range": "day"
                        }
                    }
                ],
                "temporary_answer": "I'm compiling a list of NBA player props where the player has hit the over in 8 of the last 10 games. I'll get back to you shortly with the key stats."
            }"""

            json_examples += f"""
            
                    {example_question_23}
                    
                    {example_json_23}
                    
                    """

        example_leagues = ["nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"]
        if await find_common_elements(leagues, example_leagues):
            example_question_24 = """For the question: I want to bet the over on the Knicks first quarter total. Can you get me the best line for this? Here is an example json that calls as tools get_best_other_prop_lines and provides a temporary response:"""

            example_json_24 = """{
                        "tools": [
                            {
                                "name": "get_best_other_prop_lines",
                                "params": {
                                    "league": "nba",
                                    "bet_type": "1st Quarter Total",
                                    "team_one": "New York Knicks"
                                }
                            }
                        ],
                        "temporary_answer": "I am looking up the best 1st quarter total for the Knicks. I will get back to you shortly."
                    }"""

            json_examples += f"""

                    {example_question_24}

                    {example_json_24}

                    """

        example_leagues = ["nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"]
        if await find_common_elements(leagues, example_leagues):
            example_question_25 = """For the question: I want to bet the over on the Knicks first quarter total. Can you get me the DraftKings line for this? Here is an example json that calls as tools get_all_other_prop_lines and provides a temporary response:"""

            example_json_25 = """{
                        "tools": [
                            {
                                "name": "get_all_other_prop_lines",
                                "params": {
                                    "league": "nba",
                                    "book_name": "DraftKings",
                                    "bet_type": "1st Quarter Total",
                                    "team_one": "New York Knicks"
                                    
                                }
                            }
                        ],
                        "temporary_answer": "I am looking up the 1st quarter total lines on DraftKings for the Knicks. I will get back to you shortly."
                    }"""

            json_examples += f"""

                    {example_question_25}

                    {example_json_25}

                    """
        example_leagues = ["nfl", 'nba', 'nhl', 'mlb']
        if await find_common_elements(leagues, example_leagues):
            example_question_26 = """For the question: "Give me the value bets for San Antonio Spurs at Dallas Mavericks? I'd like an in-depth analysis with direct links to bet.", here is an example json that calls as a tool get_best_game_lines, get_game_sharp_picks_table, get_player_prop_information, and get_news and provides a temporary response:"""

            example_json_26 = """{
                        "tools": [
                            {
                                "name": "get_best_game_lines",
                                "params": {
                                    "bet_type": "moneyline",
                                    "team_one": "San Antonio Spurs",
                                    "team_two": "Dallas Mavericks",
                                }
                            },
                            {
                                "name": "get_best_game_lines",
                                "params": {
                                    "bet_type":"spread",
                                    "team_one":"San Antonio Spurs",
                                    "team_two":"Dallas Mavericks",
                                }
                            },
                            {
                                "name": "get_best_game_lines",
                                "params": {
                                    "bet_type":"total",
                                    "team_one":"San Antonio Spurs",
                                    "team_two":"Dallas Mavericks",
                                }
                            },
                            {
                                "name": "get_game_sharp_picks_table",
                                "params": {
                                    "team_one": "San Antonio Spurs",
                                    "team_two": "Dallas Mavericks",
                                    "bet_type": "moneyline"
                                }
                            },
                            {
                                "name": "get_game_sharp_picks_table",
                                "params": {
                                    "team_one": "San Antonio Spurs",
                                    "team_two": "Dallas Mavericks",
                                    "bet_type": "spread"
                                }
                            },
                            {
                                "name": "get_game_sharp_picks_table",
                                "params": {
                                    "team_one": "San Antonio Spurs",
                                    "team_two": "Dallas Mavericks",
                                    "bet_type": "total"
                                }
                            },
                            {
                                "name": "get_player_prop_information",
                                "params": {
                                    "league": "nba",
                                    "team_one": "San Antonio Spurs",
                                    "team_two": "Dallas Mavericks",
                                    "is_general": True
                                }
                            },
                            {
                                "name": "get_news",
                                "params": {
                                    "question": "Best bets for San Antonio Spurs at Dallas Mavericks",
                                    "date_range": "day"
                                }
                            }
                        ],
                        "temporary_answer": "I'm gathering the best value bets and in-depth analysis for the San Antonio Spurs at Dallas Mavericks game. I'll provide you with direct links to place your bets shortly."
                    }"""

            json_examples += f"""

                            {example_question_26}

                            {example_json_26}

                            """

        example_leagues = ["nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"]
        if await find_common_elements(leagues, example_leagues):
            example_question_27 = """For the question: Can you get me the DraftKings line the Knicks to win the NBA Championship? Here is an example json that calls as tools get_all_futures_lines and provides a temporary response:"""

            example_json_27 = """{
                                "tools": [
                                    {
                                        "name": "get_all_futures_lines",
                                        "params": {
                                            "league": "nba",
                                            "bet_type": "NBA Championship 2024/25 - Future Winner",
                                            "book_name": "DraftKings",
                                            "team": "New York Knicks"
                                        }
                                    }
                                ],
                                "temporary_answer": "I am looking up the line on DraftKings for the Knicks to win the NBA Championship. I will get back to you shortly."
                            }"""

            json_examples += f"""

                            {example_question_27}

                            {example_json_27}

                            """

        example_leagues = ["nba", "mlb", "nfl", "nhl", "ncaam", "ncaaf"]
        if await find_common_elements(leagues, example_leagues):
            example_question_28 = """For the question: Can you get me the best 1st half player prop lines for the Lakers game? Here is an example json that calls as tools best_player_prop_lines and provides a temporary response:"""

            example_json_28 = """{
                                        "tools": [
                                            {
                                                "name": "best_player_prop_lines",
                                                "params": {
                                                    "league": "nba",
                                                    "bet_type": "1st Quarter Total Assists",
                                                    "team": "Los Angeles Lakers"

                                                }
                                            },
                                            {
                                                "name": "best_player_prop_lines",
                                                "params": {
                                                    "league": "nba",
                                                    "bet_type": "1st Quarter Total Points",
                                                    "team": "Los Angeles Lakers"

                                                }
                                            },
                                            {
                                                "name": "best_player_prop_lines",
                                                "params": {
                                                    "league": "nba",
                                                    "bet_type": "1st Quarter Total Rebounds",
                                                    "team": "Los Angeles Lakers"

                                                }
                                            },
                                        ],
                                        "temporary_answer": "I am looking up the line on DraftKings for the Knicks to win the NBA Championship. I will get back to you shortly."
                                    }"""

            json_examples += f"""

                                    {example_question_28}

                                    {example_json_28}

                                    """

        example_leagues = ["nfl", 'nba', 'nhl', 'mlb']
        if await find_common_elements(leagues, example_leagues):
            example_question_28 = """For the question: "Give me an in-depth analysis of St. Louis Blues at Buffalo Sabres. Include the best lines with direct betting links.", here is an example json that calls as a tool get_best_game_lines, get_game_sharp_picks_table, get_player_prop_information, and get_news and provides a temporary response:"""

            example_json_28 = """{
                                "tools": [
                                    {
                                        "name": "get_best_game_lines",
                                        "params": {
                                            "bet_type": "moneyline",
                                            "team_one": "St. Louis Blues"
                                            "team_two": "DBuffalo Sabres",
                                        }
                                    },
                                    {
                                        "name": "get_best_game_lines",
                                        "params": {
                                            "bet_type":"spread",
                                            "team_one":"St. Louis Blues",
                                            "team_two":"Buffalo Sabres",
                                        }
                                    },
                                    {
                                        "name": "get_best_game_lines",
                                        "params": {
                                            "bet_type":"total",
                                            "team_one":"St. Louis Blues",
                                            "team_two":"Buffalo Sabres",
                                        }
                                    },
                                    {
                                        "name": "get_game_sharp_picks_table",
                                        "params": {
                                            "team_one": "St. Louis Blues",
                                            "team_two": "Buffalo Sabres",
                                            "bet_type": "moneyline"
                                        }
                                    },
                                    {
                                        "name": "get_game_sharp_picks_table",
                                        "params": {
                                            "team_one": "St. Louis Blues",
                                            "team_two": "Buffalo Sabres",
                                            "bet_type": "spread"
                                        }
                                    },
                                    {
                                        "name": "get_game_sharp_picks_table",
                                        "params": {
                                            "team_one": "St. Louis Blues",
                                            "team_two": "Buffalo Sabres",
                                            "bet_type": "total"
                                        }
                                    },
                                    {
                                        "name": "get_player_prop_information",
                                        "params": {
                                            "league": "nba",
                                            "team_one": "St. Louis Blues",
                                            "team_two": "Buffalo Sabres",
                                            "is_general": True
                                        }
                                    },
                                    {
                                        "name": "get_news",
                                        "params": {
                                            "question": "Best bets for St. Louis Blues at Buffalo Sabres",
                                            "date_range": "day"
                                        }
                                    }
                                ],
                                "temporary_answer": "I'm gathering the best value bets and in-depth analysis for the St. Louis Blues at Buffalo Sabres game. I'll provide you with direct links to place your bets shortly."
                            }"""

            json_examples += f"""

                                    {example_question_28}

                                    {example_json_28}

                                    """

        example_leagues = ['nba']
        if await find_common_elements(leagues, example_leagues):
            example_question_29 = """For the question: "Give me the best first basket props for tonight's NBA games.", here is an example json that calls as a tool get_first_basket_info and get_news and provides a temporary response:"""
            example_json_29 = """{
                "tools": [
                    {
                        "name": "get_first_basket_info",
                        "params": {
                        }
                    },
                    {
                        "name": "get_news",
                        "params": {
                            "question": "Best first basket props for tonight's NBA games",
                            "date_range": "day"
                        }
                    }
                ],
                "temporary_answer": "I am looking up the best first basket props for tonight's NBA games. I'll get back to you with the key stats shortly."
            }"""

            json_examples += f"""

                {example_question_29}
    
                {example_json_29}

            """
        if await find_common_elements(leagues, example_leagues):
            example_question_29 = """For the question: "Give me the best first basket props for the Knicks game.", here is an example json that calls as a tool get_first_basket_info and get_news and provides a temporary response:"""
            example_json_29 = """{
                "tools": [
                    {
                        "name": "get_first_basket_info",
                        "params": {
                            "team_one": "New York Knicks"
                        }
                    },
                    {
                        "name": "get_news",
                        "params": {
                            "question": "Knicks first basket props",
                            "date_range": "day"
                        }
                    }
                ],
                "temporary_answer": "I am looking up the best first basket props for tonight's NBA games. I'll get back to you with the key stats shortly."
            }"""

            json_examples += f"""

                {example_question_29}

                {example_json_29}

            """
        function_descriptions = await get_function_descriptions(leagues)

        #TODO- pull these out into a file?
        prompt = f"""You are the world's most intelligent and analytical sports chatbot, assisting fans with game information, player stats, betting insights, and all sports-related queries.
        
        You were created by Pine Sports, a leading sports publishing and analytics company pioneering AI development in sports. Your name is jaXon.
        
        Your knowledge IS NOT UP-TO-DATE, so YOU MUST rely on the following sources:
        
        - Today's In Progress or Scheduled games list.
        
        - Provided Google search results.
        
        - Available tools. USE THESE TOOLS LIBERALLY TO MAKE SURE YOU HAVE THE MOST COMPLETE FINAL ANSWER FOR THE USER.
        
        YOU MUST NOT assume that players are on teams, they may have been traded or retired since you were trained. 
        
        You must ONLY rely on the data provided to you and the tools at your disposal.
        
        Below is a list of functions. In a perfectly formatted json file, please send me the function name and the variables you would like to use for the function. You can use multiple functions, and you can use the same function multiple times (e.g., if you need player props for Steph Curry and LeBron James, you can ask for player props twice).
        
        {function_descriptions}
        
        When asked about best props or game bets, in addition to using get_player_prop_information (only works for NFL, NBA, NHL, MLB) /get_best_game_lines (only works for NFL, MLB NHL, MLB, NCAAB, NCAAF)/get_game_sharp_picks_table (only works for NFL, MLB NHL, MLB, NCAAB, NCAAF), ALWAYS ALSO USE get_news to check for last-minute injuries or relevant updates that could affect the game.
        
        In addition to the list of functions, please provide a temporary answer that we can send to the user as we research the answer. For the temporary answer, please write it in the language that is conversational. Please review the prior chat history and make sure the temporary answer is not repetitive and is consistent with the prior conversation. Avoid repetition and tailor the tone to match our core audience (similar to Bleacher Report, ESPN, etc.). Example: 'Let me look up those lines for you and find the best available.'"
        
        If there is chat history, make sure you are taking into account the full chat history and the most recent message to understand the full context of the question.
        
        If you are asked for plus EV picks, YOU MUST ONLY USE THIS TOO, and if a league is not specified, YOU MUST GET PICKS FOR ALL LEAGUES.
        
        NOTE: PRIZEPICKS AND UNDERDOG ARE "FANTASY" COMPANIES SO YOU MUST USE get_plus_ev_fantasy_lines FOR THOSE WHEN ASKED FOR PLUS EV PICKS FOR THESE SITES.
                
        There will be instances where no functions are needed. This is fine. Just send the temporary answer and do not request any tools. These could be general questions like "What does plus ev mean" or questions that require no up-to-the-minute sports research like "What team did Michael Jordan play on" or just general questions like "What is the capital of France."  If no functions are needed, that is ok, just send the temporary answer, and we will use that as the final answer since no tools are necessary.
        
        With respect to the temporary response, we ran a quick Google search (below) and here are the front page results (This includes titles and snippets, not full pages). Please review this and take any information from here into acconut when drafting your temporary response. If the user's question is simple and is not about specific betting lines, specific bets or fantasy recommendations (you MUST use tools to get betting lines, recommend bets & fantasy recommendations), AND this provides the exact information you need for you to respond to the user, you may use your temporary answer as the final response without using additional tools. Note that even if betting lines are present in the google results, you still must use tools to get the most up-to-date lines. The tools will also provide direct links to the bets so you must use these tools. 
        
        IF YOU JUST PROVIDE A RESPONSE AND CALL NO TOOLS, MAKE SURE YOUR ANSWER READS AS IF IT WERE A FINAL ANSWER WHERE NO FOLLOW UP IS REQUIRED. There is no need to use tools to double-check an answer that is included in the Google search. DO NOT USE TOOLS TO DOUBLE-CHECK SIMPLE ANSWERS IN THE GOOGLE RESEARCH. 
        
        IMPORTANT: Always review GOOGLE SPORTS RESULTS when present. They contain the most up-to-date information for past and ongoing games. For any game scores, you MUST use the information from GOOGLE SPORTS RESULTS.
        
        Here are examples where you may provide a final answer without requesting tools: 
        
        - If the question is "How many sacks did the Giants give up last season?" and the answer is in the google information, you can provide the answer and not use further tools. This is asking for a specific stat that is not a bet.
        
        - If the question is "How did the Yankees do today?" and the answer is in the google information, you MUST provide the answer and YOU MUST NOT use further tools. This is asking for a specific result that is not a bet. 
        
        - If the question is "How did the Lakers do yesterday?" and the answer is in the google information, you MUST provide the answer and YOU MUST NOT use further tools. This is asking for a specific result that is not a bet. 
        
        - If the question is "Who won the British GP?" and the answer is in the google information, you MUST provide the answer and YOU MUST NOT use further tools. This is asking for a specific result that is not a bet. 

        - If you can answer this question without accessing tools, YOU MUST NOT USE TOOLS because this is preferred because it is faster, more efficient, and cheaper. In an instance where you can answer the qeuestion with the information from the google search alone, just answer the question and do not request any tools.
        
        - If you do request tools, YOU MUST include in your temporary response that you will be doing more research and coming back with a more detailed answer.
        
        - Overall, if the question is NOT about betting and you are able to answer it with the information you have, YOU MUST ANSWER THE QUESTION WITHOUT TOOLS because it is faster, more efficient, and cheaper.
        
        Here are examples of where you must use tools:
        
        - If the question is "What's going on in Wimbledon?", you MUST USE TOOLS. This is a tournament with a lot of concurrent matches going on at the same time. You will need more information to provide a fulsome response.
        
        - If the question is  "What are the top 5 NFL props for today?", you MUST USE TOOLS. This is asking for specific bets.
        
        - If the question is "What are the odds on DraftKings for the Knicks to make the NBA finals", you MUST USE TOOLS. This is asking for specific odds.
        
        - If the question is "Who should I start for my fantasy league, Josh Allen or Patrick Mahomes?", you MUST USE TOOLS. This is asking for fantasy advise.
        
        --------------
        
        Here are a few examples of questions and tools that should be called to respond to those questions:
        
        {json_examples}
        
        --------------
        
        IF SOMEONE ASKS SPECIFICALLY WHERE YOU GOT YOUR RESEARCH FROM WITH RESPECT TO A PRIOR QUESTION, PROVIDE THEM A GENERAL ANSWER ABOUT HOW YOU GET YOUR RESEARCH AND WHAT TOOLS YOU HAVE ACCESS TO. DO NOT ANSWER SPECIFICALLY BECAUSE YOU ARE NOT LOOKING AT THE RESEARCH THAT WAS USED FOR THE PRIOR ANSWER SO YOU HAVE NO WAY OF EXACTLY KNOWING. NO NEED TO FOLLOW UP BY CALLING MORE TOOLS. JUST ANSWER GENERALLY.
        
        If you are asked what tools you have access to or that you can use, YOU MUST NOT PROVIDE EXACT TOOL NAMES AND EXACT INPUTS, but YOU MUST DESCRIBE THE DATA YOU HAVE ACCESS TO AND USE TO ANSWER QUESTIONS. REVIEW THE TOOLS AND EXPLAIN THEM TO A LAY PERSON WHO IS TRYING TO UNDERSTAND WHAT MAKES YOU, JAXON, SPECIAL. BE COMPRENSIVE. HOWEVER, DO NOT PROVIDE THE LEVEL OF SPECIFICITY THAT ONE WOULD NEED TO REVERSE ENGINEER HOW YOU WORK. DO NOT ACCESS ANY OTHER TOOLS WHEN ANSWER THIS QUESTION. YOU ALREADY HAVE ALL OF THE INFORMATION YOU NEED. JUST ANSWER THE QUESTION AND REQUEST NO TOOLS.
        
        If you are asked how you are different from chatGPT, YOU MUST NOT PROVIDE EXACT TOOL NAMES AND EXACT INPUTS, but YOU MUST DESCRIBE THE DATA YOU HAVE ACCESS TO AND USE TO ANSWER QUESTIONS. REVIEW THE TOOLS AND EXPLAIN THEM TO A LAY PERSON WHO IS TRYING TO UNDERSTAND WHAT MAKES YOU, JAXON, SPECIAL. BE COMPRENSIVE. HOWEVER, DO NOT PROVIDE THE LEVEL OF SPECIFICITY THAT ONE WOULD NEED TO REVERSE ENGINEER HOW YOU WORK. DO NOT ACCESS ANY OTHER TOOLS WHEN ANSWER THIS QUESTION. YOU ALREADY HAVE ALL OF THE INFORMATION YOU NEED. JUST ANSWER THE QUESTION AND REQUEST NO TOOLS.
        
        If someone asks you what are good types of questions to ask, YOU MUST provide A LIST OF SPECIFIC DETAILED QUESTIONS (MOST SHOULD RELATE TO SPORTSBETTING AND BE VERY DETAILED AND STATISTICALLY ORIENTED)  that you think fully utilize your toolset (SINCE YOU HAVE THE MOST DATA FOR THE FOLLOWING LEAGUES: NFL, NBA, NHL, and MLB, you should focus on questions related to these sports. And if you can incorporate current games, that would be great). Explain why these are questions that you are specifically capable of handling due to the tools you are able to use and data to which you have access. YOU ALREADY HAVE ALL OF THE INFORMATION YOU NEED. JUST ANSWER THE QUESTION AND REQUEST NO TOOLS.
        
        AGAIN: IF YOU ARE ASKED (1) WHAT TOOLS YOU HAVE ACCESS TO, (2) HOW YOU ARE DIFFERENT FROM CHATGPT, OR (3) WHAT ARE GOOD TYPES OF QUESTIONS TO ASK. YOU MUST NOT USE ANY TOOLS!! 
        
        FINAL REMINDER ABOUT TOOLS:
        
        - MAKE SURE YOU REQUEST ALL OF THE TOOLS NECESSARY TO GIVE THE USER YOUR BEST AND MOST COMPREHENSIVE RESPONSE.
        - If you are asked about MLB player props, you MUST USE get_pitcher_vs_batter_and_park_factors_data, get_player_prop_information, and get_news.
        - If you are asked about NBA first basket props, you MUST USE get_first_basket_info, get_best_lines, and get_news.
        - If you are asked about NFL, NBA, or NHL player props you MUST USE get_player_prop_information (note, get_player_prop_information only works for NFL, NBA, NHL, MLB) and get_news (which works for all sports).
        - If you are asked about stats for FC, NBA, NFL, NHL, MLB or PGA, you MUST USE search_statmuse.
        - If you are asked for a NFL, NBA, NHL, or MLB game preview, YOU MUST USE: get_best_game_lines to get the best lines for the game (moneyline, spread, and total), get_player_prop_information (to get the top player props and best lines for these props), and get_news (along with other tools you think may be necessary for the specific request).
        - Again for any game previews, or general requests for the NFL, NBA, MLB, or NHL, YOU MUST USE get_player_prop_information.  PEOPLE LOVE PLAYER PROPS, SO YOU MUST USE THIS TOOL TO PROVIDE PROP INFORMATION TO THEM.
        - If you are asked about arbitrage or middle opportunities, YOU MUST USE get_best_game_lines twice (once with the type variable as Middle and once with the type variable as Arbitrage), you must also use get_best_player_prop_lines twice (once with the type variable as Middle and once with the type variable as Arbitrage). This is a total of 4 function calls.
        - If you are asked about the best line for a game or prop, use get_best_game_lines or get_best_player_prop_lines.
        - If you are asked about lines for a specific book, YOU MUST USE get_all_game_lines or get_all_player_prop_lines and specify the book you need (and any other information).
        - If you are asked to make recommendations for game moneylines, game spreads, or game totals, YOU MUST USE get_game_sharp_picks_table. This will get the sharp picks for you and help you know where the smart money is. 
        - YOU MUST ALSO USE get_game_sharp_picks_table when someone asks you to make picks for an entire day (or week for NFL). If you select moneyline, it will provide you a table with percentage chances of winning.
        - If you are asked about PrizePicks or Underdog recommendations, you MUST USE get_player_prop_information (for NFL, NBA, NHL, MLB) where book_name is PrizePicks or Underdog. You can also use get_news and get_plus_ev_fantasy_lines (there may not be any plus ev lines at a given time, so you MUST use get_player_prop_information for NFL, NBA, NHL, MLB).
        - get_news is very fast and very low cost. Use that regularly along with other functions.
        - respond_to_question_about_players_and_positions and respond_to_question_about_teams are very powerful and should be used for difficult statistical questions. If you use them and last_season is not True, YOU MUST LET THE USER KNOW THAT YOUR ANSWER MIGHT TAKE A LITTLE LONGER THAN USUAL TO GET because you are doing a difficult statistical analysis.
        
        Review each tool CAREFULLY, and call all the tools you may need to answer a question. Make the calls broad if there is any ambiguity in the question.
        
        YOUR MUST USE MARKDOWN LANGUAGE TO PROPERLY FORMAT YOUR TEMPORARY RESPONSE. YOU MUST ALSO INCLUDE PROPER SPACING AND PARAGRAPHS IN YOUR TEMPORARY RESPONSE.
        
        IN YOUR TEMPORARY ANSWER, YOU MUST MAKE SURE THAT THE FORMATTING IS PROPER, USE MARKDOWN LANGUAGE, USE SLASH N FOR NEW LINES, etc. IT SHOULD NOT JUST BE A WALL OF TEXT. IT SHOULD BE EASY TO READ AND WELL FORMATTED.
        
        IF YOUR TEMPORARY ANSWER IS THE FINAL ANSWER, BE CLEAR AND CONCISE. DO NOT EQUIVOCATE WITH WORDS LIKE "BASED ON THE INFORMATION PROVIDED", JUST PROVIDE THE RESPONSE.
           
        IF THE ANSWER IS CLEAR AND IN THE GOOGLE RESULTS, THERE IS NO NEED TO USE TOOLS. AND YOU MUST NOT USE TOOLS. IT IS ALSO PERFECTLY FINE TO PROVIDE A SHORT SUCCINCT ANSWER AND ASK THE USER IF HE OR SHE WOULD LIKE MORE DETAILS (IF YOU DO THIS, DO NOT REQUEST TOOLS). YOU CAN ALSO WAIT FOR FOLLOW UP QUESTIONS TO USE TOOLS AND PROVIDE MORE DETAIL. 
        
        IF YOU DO SAY YOU ARE GOING TO PROVIDE MORE INFORMATION, YOU MUST THEN INCLUDE IN THE JSON YOU SEND BACK THE TOOLS YOU WILL NEED. IF THERE ARE NO TOOLS IN YOUR JSON RESPONSE YOUR TEMPORARY ANSWER WILL BE TREATED AS A FINAL ANSWER. DO NOT SAY THINGS LIKE "BASED ON THE INFORMATION I HAVE", JUST GIVE THE ANSWER. BE CONFIDENT AND CLEAR. DO NOT REFERENCE THE GOOGLE RESULTS JUST ANSWER THE QUESTION IF IT IS IN THERE.
        
        DO NOT ASK FOLLOWUP QUESTIONS IF YOU ARE REQUESTING TOOLS, THE USER WILL NOT BE ABLE TO ANSWER YOUR TEMPORARY ANSWER. THE USER WILL ONLY BE ABLE TO RESPOND ONCE THE TOOLS RETURN THE RESEARCH AND YOU PROVIDE A FINAL ANSWER.
        
        USE SLASH N WHEN YOU NEED TO ADD NEW LINES. I DO NOT WANT TO SEE A LARGE BLOCK OF TEXT IF YOU ARE PROVIDING A FULSOME RESPONSE.
        
        YOU WORK FOR PINE SPORTS. YOU ARE NOT ALLOWED TO PROMOTE ANY OTHER WEBSITE. YOU CAN CITE TO OTHER NEWS AND DATA SOURCES BUT ARE FORBIDDEN FROM PROMOTING THEM.
        
        START GOOGLE FRONT PAGE
        
        {google_front_page}
        
        END GOOGLE FRONT PAGE
        
        The date and time now is (EST): {todays_date_and_time_est}
        
        Here is a list of games that were completed yesterday:
        
        {yesterdays_game_string}
        
        Here is a list of sports games that are either In Progress or Scheduled for today. Note this is not a comprehensive list. This could help in determining what tools you need.
        
        {todays_game_string}
        
        You are in a conversation with a user.

        {short_term_memory_string}

        {chat_history_string}
        
        START MOST RECENT MESSAGE
        
        {message}
        
        END MOST RECENT MESSAGE
        
        Just send the perfectly formatted json file the the requested information in the above instructions."""

        system_prompt = """You send perfectly formatted json files that have tools needed to answer a question and a temporary answer. Here are the guidelines for you to work with:
        
        - Recall, that much has happened since you've been trained so you must rely heavily on the following: (1) The list of games that are In Progress or Scheduled for today; (2) The Google search results that we have run for you; (3) The tools that you have at your disposal. USE THESE TOOLS LIBERALLY TO MAKE SURE YOU HAVE THE MOST COMPLETE FINAL ANSWER FOR THE USER.
        
        - Do not assume that players are on teams, they may have been traded or retired since you were trained. 
        
        - You must ONLY rely on the data provided to you and the tools at your disposal.
        
        - You can use multiple functions, and you can use the same function multiple times (e.g., if you need player props for Steph Curry and LeBron James, you can ask for player props twice).
        
        - Please call of the functions you think you need. It is critical to get things right and to get all of the information you need.
        
        - With respect to the temporary response, we ran a google search and provided the front page results for ALL TIME, PAST DAY, and PAST HOUR (This includes titles and snippets, not full pages). Please review this and take any information from here into account when drafting your temporary response. If the user's question is simple and not about specific bets (you MUST use tools to recommend bets), AND this provides the information you need for you to respond to the user, you can treat your temporary answer as a final answer, then do not need to use any tools. There is no need to use tools to double-check an answer that is included in the Google search. 

        - Overall, if the question is NOT about betting and you are able to answer it with the information you already have, YOU MUST ANSWER THE QUESTION WITHOUT TOOLS because this is faster, more efficient, and cheaper.
        
        - If you see "GOOGLE SPORTS RESULTS" in the google search, you MUST pay close attention to the information contained here. It will have the most up to the minute results and can be used to answer questions about past and ongoing games. YOU MUST REVIEW GOOGLE SPORTS RESULTS. IF YOU ARE WRITING ABOUT A GAME'S SCORE, YOU MUST REVIEW THIS AND GET THE SCORE FROM HERE.
        
        - If you do request tools, YOU MUST include in your temporary response that you will be doing more research and coming back with a more detailed answer.

        - When asked specific questions about stats for recent games or recent player performance and the question relates to one of the following leagues: "nba", "mlb", "nfl", "nhl", "wnba", "ncaam", "ncaaf", "mls", "epl", "laliga", "ufc", "pga", IT IS BEST TO JUST GET THE GAME LOG. IF THE REQUEST REQUIRES MORE THAN PROVIDING SCORES AND STATS THEN YOU SHOULD GET NEWS AS WELL.
        
        - If people ask for best props or best game bets, YOU MUST ALSO REQUEST get_news to understand if there are any last minute injuries or other news that could affect the game. It can also give you some additional good context.
        
        - In addition to the list of functions, please provide a temporary answer that we can send to the user as we research the answer. For the temporary answer, please write it in the language that is conversational. Please DO NOT make any assumptions in the temporary answer. Recall, you have done no research yet and your training data is not up-to-date. If someone asks about the Finals, do not assume you know who is in the finals. Send a general response, do not assume teams or players if they are not in the question. Please review the prior chat history and make sure the temporary answer is not repetitive. Our core audience is a similar demographic to people who like Bleacher Report, ESPN, etc. This will keep the user engaged and let them know we are working on their question. As an example, you can say, "Let me look up those lines for you and get you the best line available."
        
        - If you are asked for plus EV picks: (1) If a league is not specified, YOU MUST GET PICKS FOR ALL LEAGUES; (2) ONLY USE THE PLUS EV TOOL, IF THERE ARE NO PICKS, THAT'S OK.
        
        - NOTE: PRIZEPICKS AND UNDERDOG ARE "FANTASY" COMPANIES SO YOU MUST USE get_plus_ev_fantasy_lines FOR THOSE WHEN ASKED FOR PLUS EV PICKS FOR THESE SITES.
        
        - If you are asked what tools you have access to or that you can use, YOU MUST NOT PROVIDE EXACT TOOL NAMES AND EXACT INPUTS, but YOU MUST DESCRIBE THE DATA YOU HAVE ACCESS TO AND USE TO ANSWER QUESTIONS. REVIEW THE TOOLS AND EXPLAIN THEM TO A LAY PERSON WHO IS TRYING TO UNDERSTAND WHAT MAKES YOU, JAXON, SPECIAL. BE COMPREHENSIVE. HOWEVER, DO NOT PROVIDE THE LEVEL OF SPECIFICITY THAT ONE WOULD NEED TO REVERSE ENGINEER HOW YOU WORK. DO NOT ACCESS ANY OTHER TOOLS WHEN ANSWER THIS QUESTION. YOU ALREADY HAVE ALL OF THE INFORMATION YOU NEED. JUST ANSWER THE QUESTION AND REQUEST NO TOOLS.
        
        - If you are asked how you are different from chatGPT, YOU MUST NOT PROVIDE EXACT TOOL NAMES AND EXACT INPUTS, but YOU MUST DESCRIBE THE DATA YOU HAVE ACCESS TO AND USE TO ANSWER QUESTIONS. REVIEW THE TOOLS AND EXPLAIN THEM TO A LAY PERSON WHO IS TRYING TO UNDERSTAND WHAT MAKES YOU, JAXON, SPECIAL. BE COMPREHENSIVE. HOWEVER, DO NOT PROVIDE THE LEVEL OF SPECIFICITY THAT ONE WOULD NEED TO REVERSE ENGINEER HOW YOU WORK. DO NOT ACCESS ANY OTHER TOOLS WHEN ANSWER THIS QUESTION. YOU ALREADY HAVE ALL OF THE INFORMATION YOU NEED. JUST ANSWER THE QUESTION AND REQUEST NO TOOLS.
        
        - If someone asks you what are good types of questions to ask, YOU MUST provide A LIST OF SPECIFIC DETAILED QUESTIONS (MOST SHOULD RELATE TO SPORTSBETTING AND BE VERY DETAILED AND STATISTICALLY ORIENTED)  that you think fully utilize your toolset (SINCE YOU HAVE THE MOST DATA FOR THE FOLLOWING LEAGUES: NFL, NBA, NHL, and MLB, you should focus on questions related to these sports. And if you can incorporate current games, that would be great). Explain why these are questions that you are specifically capable of handling due to the tools you are able to use and data to which you have access. YOU ALREADY HAVE ALL OF THE INFORMATION YOU NEED. JUST ANSWER THE QUESTION AND REQUEST NO TOOLS.
        
        - YOUR MUST USE MARKDOWN LANGUAGE TO PROPERLY FORMAT YOUR TEMPORARY RESPONSE. YOU MUST ALSO INCLUDE PROPER SPACING AND PARAGRAPHS IN YOUR TEMPORARY RESPONSE.
        
        - IN YOUR TEMPORARY ANSWER, YOU MUST MAKE SURE THAT THE FORMATTING IS PROPER, USE MARKDOWN LANGUAGE, USE SLASH N FOR NEW LINES, etc. IT SHOULD NOT JUST BE A WALL OF TEXT. IT SHOULD BE EASY TO READ AND WELL FORMATTED.
        
        - If you are asked for a NFL, NBA, NHL, or MLB game preview, YOU MUST USE: get_best_game_lines to get the best lines for the game (moneyline, spread, and total), get_player_prop_information (to get the top player props and best lines for these props), and get_news (along with other tools you think may be necessary for the specific request).
        
        - There will be instances where no functions are needed. This is fine. Just send the temporary answer and do not request any tools. These could be general questions like "What does plus ev mean" or questions that require no up-to-the-minute sports research like "What team did Michael Jordan play on" or just general questions like "What is the capital of France."  If no functions are needed, that is ok, just send the temporary answer, and we will use that as the final answer since no tools are necessary.
                
        - IF SOMEONE ASKS SPECIFICALLY WHERE YOU GOT YOUR RESEARCH FROM WITH RESPECT TO A PRIOR QUESTION, PROVIDE THEM A GENERAL ANSWER ABOUT HOW YOU GET YOUR RESEARCH AND WHAT TOOLS YOU HAVE ACCESS TO. DO NOT ANSWER SPECIFICALLY BECAUSE YOU ARE NOT LOOKING AT THE RESEARCH THAT WAS USED FOR THE PRIOR ANSWER SO YOU HAVE NO WAY OF EXACTLY KNOWING. NO NEED TO REQUEST TOOLS. JUST ANSWER GENERALLY."""

        # model_name = "claude-3-5-sonnet-20240620"
        model_name = "gpt-4o-2024-11-20"

        #TODO - FOR TESTING - SWITCHED TO MINI
        #model_name = "gpt-4o-mini"

        response_json = await get_open_ai_query(model_name, prompt, system_prompt, log_extras=log_extras)

        tools = response_json['text']
        model_used_json = {
            "model": response_json['model'],
            "input_tokens": response_json['input_tokens'],
            "output_tokens": response_json['output_tokens'],
            "cached_tokens": response_json['cached_tokens'],
        }
        models_used_array.append(model_used_json)

        tools_json = await load_json(tools)

    except Exception as e:
        log.error('Error getting Required Tools', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'inputMessage': message,
            **log_extras
        })

        #make tools_json where temporary answer is "I'm sorry, something went wrong, can you please ask me again?"
        temporary_answer = "I'm sorry, something went wrong, can you please ask me again?"

        tools_json = json.dumps({ "temporary_answer": temporary_answer })
        tools_json = await load_json(tools_json)
        google_front_page = ""
        yesterdays_game_string = ""
        todays_game_string = ""
        statmuse_results_string = ""

    return tools_json, leagues, google_front_page, yesterdays_game_string, todays_game_string, statmuse_results_string, models_used_array

async def fetch_data_from_url(url, log_extras):
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, timeout=aiohttp.ClientTimeout(total=120)) as response:
                response.raise_for_status()
                data = await response.json()
                return data
    except Exception as e:
        log.error('Error fetching data from url', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'url': url,
            **log_extras,
        })
        return None

async def get_game_string_for_date(league_needed, date, log_extras):
    try:
        leagues = {
            "nba": "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=",
            "mlb": "http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?dates=",
            "nfl": "http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=",
            "nhl": "http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard?dates=",
            "wnba": "http://site.api.espn.com/apis/site/v2/sports/basketball/wnba/scoreboard?dates=",
            "ncaam": "http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?dates=",
            "ncaaf": "http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?dates=",
            "mls": "http://site.api.espn.com/apis/site/v2/sports/soccer/usa.1/scoreboard?dates=",
            "epl": "http://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard?dates=",
            "laliga": "http://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard?dates=",
            "ufc": "http://site.api.espn.com/apis/site/v2/sports/mma/ufc/scoreboard?dates=",
            "pga": "http://site.api.espn.com/apis/site/v2/sports/golf/leaderboard?league=pga&dates="
        }

        # if league_needed is a single league, remove all other options from leagues
        if league_needed != "all":
            leagues = {k: v for k, v in leagues.items() if k == league_needed}

        dates_events_pd = pd.DataFrame()

        async def fetch_league_data(league, url):
            data = await fetch_data_from_url(url, log_extras)
            if data:
                events = []
                try:
                    for event in data['events']:
                        status = event['status']['type']['description']
                        score_string = ""
                        try:
                            for competition in event["competitions"]:
                                for competitor in competition["competitors"]:
                                    competitor_type = competitor["type"]
                                    if competitor_type == "team":
                                        competitor_name = competitor["team"]["displayName"]
                                        score = competitor["score"]
                                    elif competitor_type == "athlete":
                                        competitor_name = competitor["athlete"]["displayName"]
                                        competitor_winner = competitor["winner"]
                                        if competitor_winner == True:
                                            score = "Winner"
                                        else:
                                            score = "Loser"
                                    score_string += f"{competitor_name}: {score}\n"
                        except:
                            pass

                        events.append({"league": league, "date": event['date'], "name": event['name'], 'status': status, 'score': score_string})

                except Exception as e:
                    log.error('Error processing data for league', extra={
                        'error': repr(e),
                        'traceback': traceback.format_exc(),
                        'league': league,
                        **log_extras
                    })
                return events
            return []

        tasks = [fetch_league_data(league, leagues[league.lower()] + date) for league in leagues]
        results = await asyncio.gather(*tasks)
        if results == [[]]: return "" #no results -> empty date string

        for result in results:
            if result and len(result) > 0:
                dates_events_pd = pd.concat([dates_events_pd, pd.DataFrame(result)], ignore_index=True)

        dates_events_pd['date'] = pd.to_datetime(dates_events_pd['date'], format="%Y-%m-%dT%H:%MZ").dt.tz_localize('UTC')
        dates_events_pd['date'] = dates_events_pd['date'].dt.tz_convert('US/Eastern')
        dates_events_pd['date'] = dates_events_pd['date'].dt.strftime("%Y-%m-%d %H:%M:%S %Z%z")

        dates_game_string = ""
        for i, row in dates_events_pd.iterrows():
            dates_game_string += f"{row['league'].upper()} - {row['name']} - {row['date']} - {row['status']}\n"
            if row['status'] != "Scheduled":
                dates_game_string += f"{row['score']}\n"
    except Exception as e:
        log.error('Error getting Game String', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'league': league_needed,
            **log_extras
        })
        dates_game_string = ""

    if league_needed.lower() == "ncaaf":

        date_with_dashes = date[:4] + "-" + date[4:6] + "-" + date[6:]
        dates_game_string = "\n".join([line for line in dates_game_string.split("\n") if date_with_dashes in line])

    return dates_game_string

# league_needed="ncaaf"
# date="20241221"
# log_extras = {}
# date_game_string = asyncio.run(get_game_string_for_date(league_needed, date, log_extras))
# print(date_game_string)

async def get_todays_game_string(log_extras, league="all"):
    today = datetime.now().strftime('%Y%m%d')

    if league.lower() in ['nfl', 'ufc', 'ncaaf', 'pga']:
        # Collect the dates for the next 7 days
        date_strings = [(datetime.now() + timedelta(days=i)).strftime('%Y%m%d') for i in range(0, 7)]

        # Use asyncio.gather to fetch data concurrently for all the dates and combine results
        tasks = [get_game_string_for_date(league, date, log_extras) for date in date_strings]
        results = await asyncio.gather(*tasks)

        # Combine the game strings into a single string
        todays_game_string = '\n'.join(filter(None, results))

    else:
        todays_game_string = await get_game_string_for_date(league, today, log_extras)

    return todays_game_string

# todays_game_string = asyncio.run(get_todays_game_string({}, "ncaaf"))
# print(todays_game_string)

async def get_yesterdays_game_string(log_extras, league="all"):
    yesterday = (datetime.now() - timedelta(days=1)).strftime('%Y%m%d')

    if league.lower() in ['nfl', 'ncaaf', 'ufc', 'pga']:
        # Collect the dates for the next 7 days
        date_strings = [(datetime.now() - timedelta(days=1) - timedelta(days=i)).strftime('%Y%m%d') for i in range(0, 7)]

        # Use asyncio.gather to fetch data concurrently for all the dates
        tasks = [get_game_string_for_date(league, date, log_extras) for date in date_strings]

        # Wait for all the tasks to complete and combine their results
        results = await asyncio.gather(*tasks)

        # Combine the game strings into a single string
        yesterdays_game_string = '\n'.join(filter(None, results))
    else:
        yesterdays_game_string = await get_game_string_for_date(league, yesterday, log_extras)

    return yesterdays_game_string

# yesterdays_game_string = asyncio.run(get_yesterdays_game_string({}, "ncaaf"))
# print(yesterdays_game_string)

# Function to read questions from the S3 JSON file and return three questions
def get_sample_questions():
    # Default questions to be used if S3 file is not available or incomplete
    default_questions = [
        "How are you different from chatGPT?",
        "What tools do you have access to?",
        "What are some good types of questions I can ask you?"
    ]

    templates = {
    "MLB": [
         "⚾️ Give me a rundown of today's MLB games with recent team trends, starting pitching data, and most likely hitters with the relevant sportsbook links.",
         "⚾️ Please send me the 3 most probable MLB home run hitters tonight, considering park factors, batter vs pitcher matchups, and recent trends. Include a table with key stats and a five star rating based on your confidence.",
         "⚾️ I'd like the top three pitchers we like for the Over for: Strikeouts Thrown and Outs Recorded. Show me the lines, and best in a table format with the direct betting links.",
    ],
    "ALL": [
        "{emoji}Give me an in-depth analysis of {event}. Include the best lines with direct betting links.",
        "{emoji}Give me the value bets for {event}? I'd like an in-depth analysis with direct links to bet.",
    ],
    "NHL": [
        "🏒 Analyze {event}. I'd like projections for the winner and score total.  I'd also like your top three SOG overs with a table of relevant stats and direct betting links."
    ],
    "Tennis": [
        "🎾 Analyze the upcoming tennis match, {event}. Predict the winner, total games in match, and whether each player will win a set. Please provide a table with key stats and a confidence percentage for each prediction."
    ],
    "NCAAF": [
        "🏈 In any Top 25 NCAAF games, are there any potential upsets, spread that seem too high for the favorite to cover? For each pick, provide a table with key stats, a  5-star rating system showing your confidence, and a direct link to the bet."
    ]
    }
    
    # Simple in-memory cache (expires after TTL)
    cache = {
        'events': None,
        'last_fetch': None
    }

    CACHE_TTL = 900  # Cache TTL in seconds (15 minutes)

    # Function to return a random event for a given league
    def get_random_events():
        # Check if cache is valid
        if cache['events'] and cache['last_fetch']:
            elapsed_time = (datetime.now() - cache['last_fetch']).total_seconds()
            if elapsed_time < CACHE_TTL:
                print(f"Returning cached events (Elapsed: {elapsed_time} seconds)")
                return cache['events']
        
        # Fetch new events if cache is expired or not set
        startTimeEnd = datetime.today().date() + timedelta(days=1)
        print(f"Fetching events with startTimeEnd: {startTimeEnd}")

        HEADERS = {
            'Authorization': f'Token 9ad101a3a6c9a18c992484b252681bee09eeec67',
            'Content-Type': 'application/json'
        }


        def fetch_events(league):
            """
            Fetch events for a given league from the SharpSports API.

            Args:
                league (str): The league to fetch events for.

            Returns:
                list: A list of events or an empty list if an error occurs.
            """
            url = (
                f"https://api.sharpsports.io/v1/events?"
                f"league={league.upper()}&"
                f"future=false&"
                f"upcoming=true&"
                f"startTimeEnd={startTimeEnd}&"
                f"limit=25&"
                f"ascending=true"
            )
            try:
                response = requests.get(url, headers=HEADERS, timeout=5)  # 5-second timeout
                response.raise_for_status()  # Raise an exception for HTTP errors
                events = response.json()
                #print(f"Fetched {len(events)} events for {league}")
                return events
            except requests.exceptions.RequestException as e:
                print(f"Error fetching events for {league}: {e}")
                return []  # Return an empty list in case of error

        def fetch_all_events_concurrently(valid_leagues):
            """
            Fetch events for all valid leagues concurrently.

            Args:
                valid_leagues (list): List of league names.

            Returns:
                list: Aggregated list of all fetched events.
            """
            all_events = []
            with concurrent.futures.ThreadPoolExecutor(max_workers=len(valid_leagues)) as executor:
                # Start the load operations and mark each future with its league
                future_to_league = {executor.submit(fetch_events, league): league for league in valid_leagues}
                for future in concurrent.futures.as_completed(future_to_league):
                    league = future_to_league[future]
                    try:
                        events = future.result()
                        all_events.extend(events)
                    except Exception as exc:
                        print(f"{league} generated an exception: {exc}")
            return all_events

        # Filter events to include only those with leagues in the specified list
        valid_leagues = ['NFL', 'NHL', 'MLB', 'NBA']

        all_events = fetch_all_events_concurrently(valid_leagues)
        #print(f"Number of events fetched: {len(all_events)}")
        
        # Cache the events and timestamp
        cache['events'] = all_events
        cache['last_fetch'] = datetime.now()
        
        if len(all_events) >= 3:
            # Return three random events
            selected_events = random.sample(all_events, 3)
            #print(f"Selected 3 random events: {[event['name'] for event in selected_events]}")
            return selected_events
        else:
            #print(f"Less than 3 events found. Returning all available events.")
            return all_events

    def get_emoji(league_abbr):
        if league_abbr in ['NBA', 'NCAAMB']:
            return "🏀  "
        elif league_abbr in ['NFL', 'NCAAF']:
            return "🏈 "
        elif league_abbr == 'NHL':
            return "🏒 "
        elif league_abbr == 'MLB':
            return "⚾️ "
        else:
            return ""
        
    # Function to construct templated string questions based on previous two functions
    def generate_questions():
        questions = []
        
        # Get 3 random events (irrespective of the league)
        events = get_random_events()  # This should return 3 random events from any league

        #replace @ with at
        for event in events:
            event['name'] = event['name'].replace("@", "at")

        #print(f"Events to process: {events}")
        
        if not events:
            #print("No events found. Using default questions.")
            return []  # Early return if no events found
        
        for event in events:
            event_name = event['name']
            league_abbr = event.get('league', 'ALL')  # Default to 'ALL' if no league found
            #print(f"Processing event: {event_name} (League: {league_abbr})")

            # Select a random template from the league-specific template list or from 'ALL'
            template_list = templates.get(league_abbr, []) + templates['ALL']
            template = random.choice(template_list)
            #print(f"Selected template: {template}")
            
            # Format the selected template with event details
            question = template.format(event=event_name, league=league_abbr, emoji=get_emoji(league_abbr))
            
            # Add the generated question to the list
            questions.append(question)
            #print(f"Generated question: {question}")

        return questions

# Main function to fetch and return sample questions
    final_questions = generate_questions()

    if final_questions:
        try:
            default_questions[0] = final_questions[0]
            default_questions[1] = final_questions[1]
            default_questions[2] = final_questions[2]
        except Exception as e:
            print(f"Error updating default questions: {e}")
    
    # Return the (potentially) updated questions
    return default_questions[0], default_questions[1], default_questions[2]




# message = "How does Steph Curry's threes compare when he is on the road vs when he is at home?"
# research_df, temporary_answer, is_final_answer = get_tools_required(message)

async def calculate_cost(data):
    costs = {
        "chatgpt-4o-latest": {"input": 5.00 / 1_000_000, "output": 15.00 / 1_000_000},
        "gpt-4o": {"input": 2.50 / 1_000_000, "cached": 1.25 / 1_000_000, "output": 10.00 / 1_000_000},
        "gpt-4o-2024-11-20": {"input": 2.50 / 1_000_000, "cached": 1.25 / 1_000_000, "output": 10.00 / 1_000_000},
        "gpt-4o-2024-08-06": {"input": 2.50 / 1_000_000, "cached": 1.25 / 1_000_000, "output": 10.00 / 1_000_000},
        "gpt-4o-2024-05-13": {"input": 5.00 / 1_000_000, "output": 15.00 / 1_000_000},
        "gpt-4o-mini": {"input": 0.150 / 1_000_000, "cached": 0.075 / 1_000_000, "output": 0.600 / 1_000_000},
        "gpt-4o-mini-2024-07-18": {"input": 0.150 / 1_000_000, "cached": 0.075 / 1_000_000, "output": 0.600 / 1_000_000},
        "claude-3-5-sonnet-20240620": {"input": 3.00 / 1_000_000, "output": 15.00 / 1_000_000},
        "claude-3-opus": {"input": 15.00 / 1_000_000, "output": 75.00 / 1_000_000},
        "claude-3-haiku-20240307": {"input": 0.25 / 1_000_000, "output": 1.25 / 1_000_000},
        "anthropic.claude-3-5-sonnet-20240620-v1:0": {"input": 3.00 / 1_000_000, "output": 15.00 / 1_000_000},
        "anthropic.claude-3-opus-20240229-v1:0": {"input": 15.00 / 1_000_000, "output": 75.00 / 1_000_000},
        "anthropic.claude-3-haiku-20240307-v1:0": {"input": 0.25 / 1_000_000, "output": 1.25 / 1_000_000},
        "gemini-1.5-pro-002": {"input": 1.25 / 1_000_000, "output": 5.00 / 1_000_000},
        "gemini-1.5-flash-002": {"input": 0.075 / 1_000_000, "output": 0.30 / 1_000_000},
        "deepseek-chat": {"input": 0.27 / 1_000_000, "cached": 0.07 / 1_000_000, "output": 1.10 / 1_000_000},
    }

    def get_final_cost(data):
        total_cost = 0
        for entry in data:
            try:
                model = entry['model']
                input_tokens = entry['input_tokens']
                output_tokens = entry['output_tokens']
                try:
                    cached_tokens = entry['cached_tokens']
                except:
                    cached_tokens = 0

                # print("Model: ", model, "Input Tokens: ", input_tokens, "Output Tokens: ", output_tokens, "Cached Tokens: ", cached_tokens)
                input_tokens = input_tokens - cached_tokens

                # Handle different versions of the model correctly
                base_model = model.split('-')[0]
                model_key = base_model if base_model in costs else model

                input_cost = input_tokens * costs[model_key]['input']
                output_cost = output_tokens * costs[model_key]['output']

                #get cached cost
                cached_cost = 0
                if cached_tokens > 0:
                    try:
                        cached_cost = cached_tokens * costs[model_key]['cached']
                    except:
                        cached_cost = 0
                        input_tokens = input_tokens + cached_tokens
                        input_cost = input_tokens * costs[model_key]['input']
                # print("Model: ", model, "Input Cost: ", input_cost, "Output Cost: ", output_cost, "Cached Cost: ", cached_cost)
                total_cost += input_cost + output_cost + cached_cost
            except:
                pass

        return total_cost

    total_cost = await asyncio.to_thread(get_final_cost, data)

    return total_cost


# Example data
# data = [
#     {"model": "gpt-4o-mini-2024-07-18", "input_tokens": 1208, "output_tokens": 71},
#     {"model": "gpt-4o-2024-11-20", "input_tokens": 21233, "output_tokens": 181},

#     {"model": "gpt-4o-mini-2024-07-18", "input_tokens": 46509, "cached_tokens": 41000, "output_tokens": 4000},
#     {"model": "gpt-4o-2024-11-20", "input_tokens": 28172, "cached_tokens": 21000, "output_tokens": 682}

# ]

# data = [ { "model": "gpt-4o-mini-2024-07-18", "input_tokens": 1083, "output_tokens": 89 }, { "model": "gpt-4o-2024-11-20", "input_tokens": 25991, "output_tokens": 486 }, { "model": "claude-3-haiku-20240307", "input_tokens": 333, "output_tokens": 39 } ]
#
# # Calculate the total cost
# total_cost = asyncio.run(calculate_cost(data))
# print(f"Total cost: ${total_cost:.4f}")