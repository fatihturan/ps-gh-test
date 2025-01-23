from datetime import datetime, timedelta
import time
from pytz import timezone
import asyncio
import aiohttp
import pandas as pd
import traceback

import logging
log = logging.getLogger('json')

async def fetch_league_events(url, league, date_string, log_extras):
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url + date_string, timeout=aiohttp.ClientTimeout(total=120)) as response:
                response.raise_for_status()
                data = await response.json()

        def process_events(data, league):
            events_data = [
                {
                    "league": league,
                    "date": event['date'],
                    "name": event['name'],
                    "id": event['id']
                }
                for event in data.get('events', [])
            ]
            return events_data

        events_data = await asyncio.to_thread(process_events, data, league)
        return events_data

    except Exception as e:
        log.error('Error Fetching League Events', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'url': url,
            **log_extras,
        })
        return None

async def get_list_of_games(league=None, log_extras={}, **kwargs):
    start_time = time.time()
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

        next_week = datetime.now(timezone('US/Eastern')) + timedelta(days=8)

        async def fetch_all_events(leagues_to_fetch):
            tasks = []
            for league, url in leagues_to_fetch.items():
                for days_ago in range(16):
                    date = next_week - timedelta(days=days_ago)
                    date_string = date.strftime("%Y%m%d")
                    tasks.append(fetch_league_events(url, league, date_string, log_extras))
            return await asyncio.gather(*tasks)

        if league:
            url = leagues[league.lower()]
            all_events = await fetch_all_events({league: url})
        else:
            all_events = await fetch_all_events(leagues)

        all_events = [event for sublist in all_events for event in sublist if event]  # Flatten the list and filter out None

        def process_events_to_dataframe(events):
            df = pd.DataFrame(events)
            df = df.rename(columns={"name": "string"})
            df['date'] = pd.to_datetime(df['date'], errors='coerce', utc=True)
            df['date'] = df['date'].dt.tz_convert('US/Eastern')
            df['date'] = df['date'].dt.strftime('%Y-%m-%d')
            df['date'] = pd.to_datetime(df['date'], errors='coerce')
            return df

        all_events = await asyncio.to_thread(process_events_to_dataframe, all_events)

    except Exception as e:
        log.error('ToolError', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'league': league,
            **log_extras,
        })
        all_events = pd.DataFrame(columns=['date', 'string'])

    if not all_events.empty: all_events['tool_used'] = "get_list_of_games"
    else: all_events = pd.DataFrame(columns=['date', 'string', 'tool_used'])

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'league': league,
        'runtime': time.time() - start_time
    })
    return all_events[['date', 'string', 'tool_used']], [] #no models used

# all_events = asyncio.run(get_list_of_games("mlb"))
# print(all_events)