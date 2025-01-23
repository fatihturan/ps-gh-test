import asyncio
import pandas as pd
import traceback
import difflib
import time
import numpy as np

from .helpers import MAX_RESULTS
from .helpers import get_table

import logging
log = logging.getLogger('json')

async def get_best_other_prop_lines(league=None, bet_type="all", team_one=None, team_two=None, type="all", need_alts=False, log_extras={}, **kwargs):
    start_time = time.time()
    try:
        odds_table = await get_table("odds_table_other_props_best_books")

        if len(odds_table) == 0:
            #wait 2 seconds and try again
            await asyncio.sleep(2)
            odds_table = await get_table("odds_table_other_props_best_books")

        def process_odds_table(odds_table, league, bet_type, team_one, team_two, type):
            # Drop the following columns: id, live
            odds_table = odds_table.drop(columns=['id', 'live'], errors='ignore')

            if league and len(odds_table) > 0:
                odds_table = odds_table[odds_table['tournament'].str.lower() == league.lower()]
            if bet_type != "all" and len(odds_table) > 0:
                #don't need this anymore because we are using dynamic prop names
                # bet_type = f"Player - {bet_type}"
                bet_types = odds_table['market_name'].str.lower().unique()
                try:
                    #use difflib to find the closest match
                    closest_match = difflib.get_close_matches(bet_type.lower(), bet_types, n=1)
                    bet_type = closest_match[0]
                except:
                    pass
                odds_table = odds_table[odds_table['market_name'].str.lower() == bet_type.lower()]
            if team_one and len(odds_table) > 0:
                odds_table = odds_table[odds_table['game'].str.lower().str.contains(team_one.lower())]
            if team_two and len(odds_table) > 0:
                odds_table = odds_table[odds_table['game'].str.lower().str.contains(team_two.lower())]
            if type != "all" and len(odds_table) > 0:
                odds_table = odds_table[odds_table['type'].str.lower() == type.lower()]

            if not need_alts and len(odds_table) > 0:
                try:
                    odds_table = odds_table[odds_table['main'] == True]
                except:
                    pass
            if len(odds_table) == 0:
                todays_date = pd.Timestamp.now().strftime('%Y-%m-%d')
                string = "get_best_other_prop_lines returned 0 results.  YOU MUST TELL THE USER THAT YOU CURRENTLY DO NOT HAVE ACCESS TO GAME AND TEAM PROP LINES OR DIRECT LINKS TO THE BOOKS FOR GAME AND TEAM PROPS RIGHT NOW."
                odds_table = pd.DataFrame(data={'date': [todays_date], 'string': [string]})
                log.warning('Empty DataFrame', extra={
                    'league': league,
                    'team_one': team_one,
                    'team_two': team_two,
                    **log_extras,
                })
            else:
                # Sort by handle lowest to highest
                odds_table = odds_table.sort_values('handle')

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

                try:
                    #drop: home_over_yes_market_selection_id, home_over_yes_book_id, visitor_under_no_market_selection_id, visitor_under_no_book_id
                    odds_table = odds_table.drop(columns=['home_over_yes_market_selection_id', 'home_over_yes_book_id', 'visitor_under_no_market_selection_id', 'visitor_under_no_book_id', 'home_abbreviation', 'visitor_abbreviation'], errors='ignore')
                except:
                    pass

                odds_table['string'] = odds_table.apply(
                    lambda row: "\n".join([f"{col}: {row[col]}" for col in odds_table.columns if pd.notna(row[col])]),
                    axis=1
                )

                # Just keep date and string
                odds_table = odds_table[['date', 'string']]

            return odds_table

        odds_table = await asyncio.to_thread(process_odds_table, odds_table, league, bet_type, team_one, team_two, type)

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
        'team_one': team_one,
        'team_two': team_two,
        'runtime': time.time() - start_time
    })
    return odds_table, [] #no models used

# odds_table, models_used = asyncio.run(get_best_other_prop_lines(league="NBA"))
# for i, row in odds_table.iterrows():
#     for column in odds_table.columns:
#         print(f"{column}: {row[column]}")
