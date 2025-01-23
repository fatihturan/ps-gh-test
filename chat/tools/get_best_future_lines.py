import asyncio
import pandas as pd
import traceback
import difflib
import time
import numpy as np
import aioboto3

from .helpers import MAX_RESULTS
from .helpers import get_table
from .helpers import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_STORAGE_BUCKET_NAME

import logging
log = logging.getLogger('json')

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

async def get_best_futures_lines(league=None, bet_type="all", team=None, player=None, type="all", log_extras={}, **kwargs):
    start_time = time.time()
    try:

        unique_futures_one_sided_names, unique_futures_two_sided_names = await get_unique_futures_names()

        one_sided = False

        if bet_type in unique_futures_one_sided_names:
            one_sided = True
        if one_sided:
            odds_table = await get_table("odds_table_futures_one_sided_all_books")
            if len(odds_table) > 0:
                odds_table = odds_table[odds_table['best'] == 'Yes']
        else:
            odds_table = await get_table("odds_table_futures_two_sided_best_books")

        if len(odds_table) == 0:
            #wait 2 seconds and try again
            await asyncio.sleep(2)
            if one_sided:
                odds_table = await get_table("odds_table_futures_one_sided_all_books")
                if len(odds_table) > 0:
                    odds_table = odds_table[odds_table['best'] == 'Yes']
            else:
                odds_table = await get_table("odds_table_futures_two_sided_best_books")


        def process_odds_table(odds_table, league, bet_type, team, player, type):
            # Drop the following columns: id, live
            odds_table = odds_table.drop(columns=['id', 'live'], errors='ignore')

            if league and len(odds_table) > 0:
                odds_table = odds_table[odds_table['tournament'].str.lower() == league.lower()]
            if bet_type != "all" and len(odds_table) > 0:
                #don't need this anymore because we are using dynamic prop names
                # bet_type = f"Player - {bet_type}"
                bet_types = odds_table['event_name'].str.lower().unique()
                try:
                    #use difflib to find the closest match
                    closest_match = difflib.get_close_matches(bet_type.lower(), bet_types, n=1)
                    bet_type = closest_match[0]
                except:
                    pass
                odds_table = odds_table[odds_table['event_name'].str.lower() == bet_type.lower()]
            if one_sided and len(odds_table) > 0:
                if team and len(odds_table) > 0:
                    odds_table = odds_table[odds_table['position'].str.lower().str.contains(team.lower())]
                if player and len(odds_table) > 0:
                    odds_table = odds_table[odds_table['position'].str.lower().str.contains(player.lower())]
            else:
                if team and len(odds_table) > 0:
                    odds_table = odds_table[odds_table['team_name'].str.lower().str.contains(team.lower())]
                if player and len(odds_table) > 0:
                    odds_table = odds_table[odds_table['player_name'].str.lower().str.contains(player.lower())]

            if type != "all" and len(odds_table) > 0:
                odds_table = odds_table[odds_table['type'].str.lower() == type.lower()]

            if len(odds_table) == 0:
                todays_date = pd.Timestamp.now().strftime('%Y-%m-%d')
                string = "get_best_futures_lines returned 0 results.  YOU MUST TELL THE USER THAT YOU CURRENTLY DO NOT HAVE ACCESS TO LIVE FUTURES LINES OR DIRECT LINKS TO THE BOOKS FOR FUTURES RIGHT NOW."
                odds_table = pd.DataFrame(data={'date': [todays_date], 'string': [string]})
                log.warning('Empty DataFrame', extra={
                    'league': league,
                    'team': team,
                    'player_name': player,
                    **log_extras,
                })
            else:
                # Sort by handle lowest to highest (only works for two sided props)
                try:
                    odds_table = odds_table.sort_values('handle')
                except:
                    pass

                # drop duplicates
                odds_table = odds_table.drop_duplicates()

                # If length is over MAX_RESULTS just keep first MAX_RESULTS
                if len(odds_table) > MAX_RESULTS:
                    odds_table = odds_table.head(MAX_RESULTS)

                # SWITCH UTC TO EST
                odds_table['time'] = pd.to_datetime(odds_table['time'], errors='coerce', utc=True)
                odds_table['time'] = odds_table['time'].dt.tz_convert('US/Eastern')

                # Rename time to date
                odds_table = odds_table.rename(columns={'time': 'date'})

                odds_table['date'] = odds_table['date'].dt.strftime('%Y-%m-%d')
                odds_table['date'] = pd.to_datetime(odds_table['date'], errors='coerce')

                # drop columns that are na
                odds_table = odds_table.replace('', np.nan)
                odds_table = odds_table.dropna(axis=1, how='all')

                if one_sided:
                    try:
                        odds_table = odds_table.drop(columns=['market_selection_id', 'book_id', 'line', 'main'],errors='ignore')
                    except:
                        pass
                else:

                    try:
                        #drop: home_over_yes_market_selection_id, home_over_yes_book_id, visitor_under_no_market_selection_id, visitor_under_no_book_id
                        odds_table = odds_table.drop(columns=['market_offer_id', 'home_over_yes_market_selection_id', 'home_over_yes_book_id', 'visitor_under_no_market_selection_id', 'visitor_under_no_book_id', 'main'], errors='ignore')
                    except:
                        pass

                odds_table['string'] = odds_table.apply(
                    lambda row: "\n".join([f"{col}: {row[col]}" for col in odds_table.columns if pd.notna(row[col])]),
                    axis=1
                )

                # Just keep date and string
                odds_table = odds_table[['date', 'string']]

            return odds_table

        odds_table = await asyncio.to_thread(process_odds_table, odds_table, league, bet_type, team, player, type)

    except Exception as e:
        log.error('ToolError', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras,})
        odds_table = pd.DataFrame(columns=['date', 'string'])

    if len(odds_table) > 0:
        odds_table['tool_used'] = "get_best_other_prop_lines"
    else:
        odds_table = pd.DataFrame(columns=['date', 'string', 'tool_used'])

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'league': league,
        'bet_type': bet_type,
        'team': team,
        'player': player,
        'runtime': time.time() - start_time
    })
    return odds_table, [] #no models used

# odds_table, models_used = asyncio.run(get_best_futures_lines(
#     league="NFL",
#     bet_type="NFL Regular Season 2024/25 - Future Player Prop Total Passing Yards",
#     player="Aaron Rodgers",
# ))
# for i, row in odds_table.iterrows():
#     for column in odds_table.columns:
#         print(f"{column}: {row[column]}")
