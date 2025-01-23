from datetime import datetime, timedelta
import time
from pytz import timezone
import asyncio
import aiohttp
import pandas as pd
import traceback
from .helpers import get_open_ai_query, load_json, get_tokens_from_string

import logging
log = logging.getLogger('json')

async def get_events_for_date(league: str, date: datetime):
    league_urls = {
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

    url = league_urls.get(league.lower(), "")
    #TODO- log on this case?
    if not url: return pd.DataFrame()  # Return an empty DataFrame if the league is not found
    url_with_date = url + date.strftime("%Y%m%d")

    async with aiohttp.ClientSession() as session:
        async with session.get(url_with_date, timeout=aiohttp.ClientTimeout(total=120)) as response:
            response.raise_for_status()
            data = await response.json()

    def process_events(data, league):
        events = []
        for event in data['events']:
            try: event_status = event['status']['type']['description']
            except: event_status = None
            event_pd = pd.DataFrame({"league": [league], "date": [event['date']], "name": [event['name']], "status": event_status, "id": [event['id']]})
            events.append(event_pd)
        return pd.concat(events) if events else pd.DataFrame()

    return await asyncio.to_thread(process_events, data, league) #events_df

async def get_single_game_log_json(league, game_id, log_extras):
    try:
        base_url = "http://site.api.espn.com/apis/site/v2/sports/{}/summary?event={}"

        league_endpoints = {
            "nba": "basketball/nba",
            "mlb": "baseball/mlb",
            "nfl": "football/nfl",
            "nhl": "hockey/nhl",
            "wnba": "basketball/wnba",
            "ncaam": "basketball/mens-college-basketball",
            "ncaaf": "football/college-football",
            "mls": "soccer/usa.1",
            "epl": "soccer/eng.1",
            "laliga": "soccer/esp.1",
            "ufc": "mma/ufc",
            "pga": "golf"
        }

        sport = league_endpoints.get(league.lower())
        if not sport: return ""

        url = base_url.format(sport, game_id)

        async with aiohttp.ClientSession() as session:
            async with session.get(url, timeout=aiohttp.ClientTimeout(total=120)) as response:
                response.raise_for_status()
                game_log_json = await response.json()

        def process_game_log_json(game_log_json):
            game_log_json.pop('playsMap', None)
            game_log_json.pop('atBats', None)
            game_log_json.pop('format', None)
            game_log_json.pop('broadcasts', None)
            game_log_json.pop('predictor', None)
            game_log_json.pop('pickcenter', None)
            game_log_json.pop('againstTheSpread', None)
            game_log_json.pop('rosters', None)
            game_log_json.pop('winprobability', None)
            game_log_json.pop('news', None)
            game_log_json.pop('videos', None)
            game_log_json.pop('plays', None)
            game_log_json.pop('playsMap', None)
            game_log_json.pop('standings', None)
            return game_log_json

        game_log_json = await asyncio.to_thread(process_game_log_json, game_log_json)

    except Exception as e:
        log.error('Error getting game log json', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'league': league,
            **log_extras,
        })
        game_log_json = None

    return game_log_json

async def get_available_game_log_events_for_league(league, log_extras):
    try:
        tomorrow = datetime.now(timezone('US/Eastern')) + timedelta(days=1)
        dates = [tomorrow - timedelta(days=i) for i in range(9)]

        async def fetch_all_dates():
            tasks = [get_events_for_date(league, date) for date in dates]
            return await asyncio.gather(*tasks)

        results = await fetch_all_dates()

        def concat_and_process(results):
            all_events = pd.concat(results)
            all_events['date'] = pd.to_datetime(all_events['date'], errors='coerce', utc=True)
            all_events['date'] = all_events['date'].dt.tz_convert('US/Eastern')
            all_events['date'] = all_events['date'].dt.strftime('%Y-%m-%d')
            return all_events

        all_events = await asyncio.to_thread(concat_and_process, results)
    except Exception as e:
        log.error('Error getting game log events', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'league': league,
            **log_extras,
        })
        all_events = None

    return all_events

# all_events = asyncio.run(get_available_game_log_events_for_league("mlb"))
# for i, row in all_events.iterrows():
#     print(row)

async def get_game_log(league, question, log_extras, **kwargs):
    async def process_single_key(key, game_log_key, question, todays_date_and_time_est, game_name, date, models_used_array):
        prompt = f"""START GAME LOG KEY (ONE OF MANY)

        {game_log_key}

        END GAME LOG (ONE OF MANY)

        START QUESTION

        {question}

        END QUESTION

        You are a researcher for a world renowned sports publication.

        Today's date and time (EST) is: {todays_date_and_time_est}

        We are not interested in season statistics.  JUST STATISTICS FOR: {game_name} on {date}.

        YOU WILL BE DOING THIS FOR EACH KEY IN THE GAME LOG.  IF THERE IS NO RELEVANT INFORMATION HERE, JUST SAY SO."""

        content = "You provide detailed game summaries based on game logs. You review the game log carefully and provide all relevant statistics."

        response_json = await get_open_ai_query("claude-3-haiku-20240307", prompt, content, log_extras=log_extras)

        #TODO- This isn't actually returning anywhere...
        #TODO, We need to add this to the final response

        models_used_array.append({
            "model": response_json['model'],
            "input_tokens": response_json['input_tokens'],
            "output_tokens": response_json['output_tokens'],
            "cached_tokens": response_json['cached_tokens'],
        })

        return f"Response for key: {key}\n\n{response_json['text']}"

    # Function to process all game log keys concurrently
    async def process_all_game_log_keys(game_log_json, question, todays_date_and_time_est, game_name, date, models_used_array):
        tasks = []
        for key in game_log_json:
            game_log_key = f"{key}\n\n{game_log_json[key]}"
            token_count = get_tokens_from_string(game_log_key)
            if game_log_json[key] and token_count < 200000:
                tasks.append(
                    asyncio.create_task(
                        process_single_key(key, game_log_key, question, todays_date_and_time_est, game_name, date, models_used_array)
                    )
                )

        # Await all tasks and return the collected responses
        return await asyncio.gather(*tasks)

    start_time = time.time()
    try:
        models_used_array = []

        # Get available game logs and process them
        game_logs = await get_available_game_log_events_for_league(league, log_extras)

        # Remove duplicates and sort by date
        game_logs = game_logs.drop_duplicates(subset=['id'])
        game_logs['datetime'] = pd.to_datetime(game_logs['date'], errors='coerce')
        game_logs = game_logs.sort_values(by='datetime', ascending=True)
        game_logs = game_logs.drop(columns=['datetime'])

        # Build game log string
        game_log_string = ""
        for _, row in game_logs.iterrows():
            game_log_string += f"game_id: {row['id']}\ngame_name: {row['name']}\ngame_date: {row['date']}\n\ngame_status:{row['status']}\n\n-----------------------------------\n\n"

        todays_date_and_time_est = datetime.now(timezone('US/Eastern')).strftime('%Y-%m-%d %H:%M:%S')

        # Prompt for selecting the correct game log
        prompt = f"""START LIST OF AVAILABLE GAME LOGS

        {game_log_string}

        END LIST OF AVAILABLE GAME LOGS

        START QUESTION

        {question}

        END QUESTION

        You are a researcher for a world renowned sports publication.

        Today's date and time (EST) is: {todays_date_and_time_est}

        IN ADDITION TO THE DATE, PAY PARTICULAR ATTENTION TO THE STATUS OF THE GAME AS WEEK.

        IF SOMEONE ASKS FOR YESTERDAY'S GAME, DO NOT PICK TODAY'S GAME.  PICK THE GAME THAT HAPPENED YESTERDAY (THE COMPLETED GAME).

        ONLY SEND WHAT IS REQUESTED IN THE EXACT FORMAT THAT IS REQUESTED. JUST SEND THE PERFECTLY STRUCTURED JSON FILE"""

        content = "You send perfectly formatted json files with the following two variables: 'game_id': 'The game_id of the requested game.' 'reasoning': 'The reasoning why you believe that is the correct game id.' ONLY SEND WHAT IS REQUESTED."

        model_name = "gpt-4o-2024-11-20"

        response_json = await get_open_ai_query(model_name, prompt, content, log_extras=log_extras)
        response = response_json['text']

        # Log model usage details
        models_used_array.append({
            "model": response_json['model'],
            "input_tokens": response_json['input_tokens'],
            "output_tokens": response_json['output_tokens'],
            "cached_tokens": response_json['cached_tokens'],
        })

        # Parse the game log response
        game_log_json = await load_json(response)

        game_id = str(game_log_json['game_id'])
        date = game_logs[game_logs['id'] == game_id]['date'].values[0]
        game_name = game_logs[game_logs['id'] == game_id]['name'].values[0]

        # Fetch the specific game log details
        game_log_json = await get_single_game_log_json(league, game_id, log_extras)

        # If the game log exists, process the keys concurrently
        if game_log_json:
            game_log_responses = await process_all_game_log_keys(game_log_json, question, todays_date_and_time_est, game_name, date, models_used_array)            
            game_log_string = "\n\n".join(game_log_responses) # Compile all responses into the final string

        # Final prompt using the collected game log responses
        final_prompt = f"""START GAME LOG STRING

        {game_log_string}

        END GAME LOG STRING

        START QUESTION

        {question}

        END QUESTION

        You are a researcher for a world renowned sports publication.

        Today's date and time (EST) is: {todays_date_and_time_est}

        IMPORTANT: The final score is in the "header" section of the game log.  YOU MUST MAKE SURE THAT ALL OF YOUR STATS MATCH THE FINAL SCORE IN THE HEADER.  

        Provide all of the relevant game and team statistics to provide a fulsome complete thorough answer. 
        
        We have only pulled game statistics.  There should not be any season statistics in the game log.  If you see any season statistics, please ignore them.
        
        Review the game log closely. You will be scored on your accuracy. DOUBLE CHECK YOUR WORK."""

        #print(f"START PROMPT\n\n{final_prompt}\n\nEND PROMPT")

        final_content = "You provide detailed game summaries based on game logs."
        final_response_json = await get_open_ai_query("claude-3-5-sonnet-20240620", final_prompt, final_content, log_extras=log_extras)

        final_response = final_response_json['text']

        # Log model usage details for the final call
        models_used_array.append({
            "model": final_response_json['model'],
            "input_tokens": final_response_json['input_tokens'],
            "output_tokens": final_response_json['output_tokens'],
            "cached_tokens": response_json['cached_tokens'],
        })

        # Return the final response as a DataFrame
        game_log_df = pd.DataFrame([{"date": pd.to_datetime(date), "string": final_response, 'tool_used': 'get_game_log'}])

        log.info('toolCompleted', extra={
            **log_extras,
            'models_used_array': models_used_array,
            'league': league,
            'question': question,
            'runtime': time.time() - start_time
        })
        return game_log_df, models_used_array

    except Exception as e:
        log.error('ToolError', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'league': league,
            'question': question,
            **log_extras,
        })
        return pd.DataFrame(columns=['date', 'string', 'tool_used']), []

# game_log, models_used_array = asyncio.run(get_game_log("nfl", "How did the Giants do last weekend?"))
# game_log, models_used_array = asyncio.run(get_game_log("mlb", "How did the Yankees do yesterday?"))
# for i, row in game_log.iterrows():
#     for column in game_log.columns:
#         print(f"{column}: {row[column]}")
# print(models_used_array)