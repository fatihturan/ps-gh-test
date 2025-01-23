import asyncio
import pandas as pd
import traceback
import difflib
import time
import numpy as np

from .helpers import get_table
from .helpers import MAX_RESULTS

import logging
log = logging.getLogger('json')

def process_odds_table(odds_table, league: str | None, book_name: str, bet_type: str, team_one: str | None, team_two: str | None, log_extras, need_alts: bool = False):
    odds_table = odds_table.drop(columns=['id', 'live'], errors='ignore') #drop columns

    if league and len(odds_table) > 0:
        odds_table = odds_table[odds_table['tournament'].str.lower() == league.lower()]
    if book_name != "all" and len(odds_table) > 0:
        odds_table = odds_table[odds_table['book_name'].str.lower() == book_name.lower()]

    if bet_type != "all" and len(odds_table) > 0:
        bet_types = odds_table['market_name'].str.lower().unique()
        #TODO- i am assuming this is catching a "closest match DNE" or something - can probably just
        # do an if statement instead (test and apply logic elsewhere as relevant)
        try:
            #use difflib to find the closest match
            closest_match = difflib.get_close_matches(bet_type.lower(), bet_types, n=1)
            bet_type = closest_match[0]
        except:
            pass #TODO- log? Yes, we should probably log this.
        odds_table = odds_table[odds_table['market_name'].str.lower() == bet_type.lower()]

    if team_one and len(odds_table) > 0:
        odds_table = odds_table[odds_table['game'].str.lower().str.contains(team_one.lower())]
    if team_two and len(odds_table) > 0:
        odds_table = odds_table[odds_table['game'].str.lower().str.contains(team_two.lower())]

    if not need_alts and len(odds_table) > 0:
        odds_table = odds_table[odds_table['main'] == True]

    if len(odds_table) == 0:
        todays_date = pd.Timestamp.now().strftime('%Y-%m-%d')
        string = "get_all_other_prop_lines returned 0 results.  YOU MUST TELL THE USER THAT YOU CURRENTLY DO NOT HAVE ACCESS TO GAME AND TEAM PROP LINES OR DIRECT LINKS TO THE BOOKS FOR GAME AND TEAM PROPS RIGHT NOW."
        odds_table = pd.DataFrame(data={'date': [todays_date], 'string': [string]})
        log.warning('Empty DataFrame', extra={
            'league': league,
            'book_name': book_name,
            'team_one': team_one,
            'team_two': team_two,
            **log_extras,
        })
    else:

        # drop duplicates
        odds_table = odds_table.drop_duplicates()

        # If length is over MAX_RESULTS just keep first MAX_RESULTS
        if len(odds_table) > MAX_RESULTS:
            odds_table = odds_table.head(MAX_RESULTS)

        # drop columns that are na
        odds_table = odds_table.replace('', np.nan)
        odds_table = odds_table.dropna(axis=1, how='all')

        try:
            # drop: home_over_yes_market_selection_id, home_over_yes_book_id, visitor_under_no_market_selection_id, visitor_under_no_book_id
            odds_table = odds_table.drop(columns=['home_over_yes_market_selection_id', 'visitor_under_no_market_selection_id', 'book_id', 'home_abbreviation', 'visitor_abbreviation'], errors='ignore')
        except:
            pass

        # SWITCH UTC TO EST
        odds_table['time'] = pd.to_datetime(odds_table['time'], errors='coerce', utc=True)
        odds_table['time'] = odds_table['time'].dt.tz_convert('US/Eastern')

        # Rename time to date
        odds_table = odds_table.rename(columns={'time': 'date'})
        odds_table['date'] = pd.to_datetime(odds_table['date'].dt.strftime('%Y-%m-%d'), errors='coerce')

        odds_table['string'] = odds_table.apply(
            lambda row: "\n".join([f"{col}: {row[col]}" for col in odds_table.columns if pd.notna(row[col])]),
            axis=1
        )
        odds_table = odds_table[['date', 'string']] # Just keep date and string

    return odds_table

async def get_all_other_prop_lines(league=None, book_name="all", bet_type="all", team_one=None, team_two=None, need_alts=False, log_extras={}, **kwargs):
    start_time = time.time()

    try:
        odds_table = await get_table("odds_table_other_props_all_books")
        if len(odds_table) == 0:
            await asyncio.sleep(2) #wait 2 seconds and try again
            odds_table = await get_table("odds_table_other_props_all_books")
        odds_table = await asyncio.to_thread(process_odds_table, odds_table, league, book_name, bet_type, team_one, team_two, log_extras, need_alts)

    except Exception as e:
        print(traceback.format_exc())

        log.error('ToolError', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'league': league,
            'bet_type': bet_type,
            'book_name': book_name,
            'team_one': team_one,
            'team_two': team_two,
            **log_extras,
        })
        odds_table = pd.DataFrame(columns=['date', 'string'])

    if len(odds_table) > 0: odds_table['tool_used'] = "get_all_other_prop_lines"
    else: odds_table = pd.DataFrame(columns=['date', 'string', 'tool_used'])

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'league': league,
        'bet_type': bet_type,
        'book_name': book_name,
        'team_one': team_one,
        'team_two': team_two,
        'runtime': time.time() - start_time
    })
    return odds_table, [] #models_used_array always empty here

# try:
#     odds_table, models_used_array = asyncio.run(get_all_other_prop_lines(
#         league="NBA",
#         #book_name="DraftKings",
#         bet_type="1st Quarter Total",
#     ))
# except:
#     print(traceback.format_exc())
#
# for i, row in odds_table.iterrows():
#     for column in odds_table.columns:
#         print(f"{column}: {row[column]}")