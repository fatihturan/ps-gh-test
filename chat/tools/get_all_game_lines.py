import asyncio
import pandas as pd
import traceback
import time

from .helpers import get_table
from .helpers import MAX_RESULTS

import logging
log = logging.getLogger('json')

def process_odds_table(odds_table, league: str | None, book_name: str, team_one: str | None, team_two: str | None, log_extras, need_alts: bool = False):
    odds_table = odds_table.drop(columns=['id', 'live'], errors='ignore') #drop columns

    if league and len(odds_table) > 0:
        odds_table = odds_table[odds_table['tournament'].str.lower() == league.lower()]
    if book_name != "all" and len(odds_table) > 0:
        odds_table = odds_table[odds_table['book_name'].str.lower() == book_name.lower()]
    if team_one and len(odds_table) > 0:
        odds_table = odds_table[(odds_table['home'].str.lower().str.contains(team_one.lower())) | (odds_table['visitor'].str.lower().str.contains(team_one.lower()))]
    if team_two and len(odds_table) > 0:
        odds_table = odds_table[(odds_table['home'].str.lower().str.contains(team_two.lower())) | (odds_table['visitor'].str.lower().str.contains(team_two.lower()))]

    if not need_alts and len(odds_table) > 0:
        try:
            odds_table = odds_table[odds_table['main'] == True]
        except:
            pass

    if len(odds_table) == 0:
        todays_date = pd.Timestamp.now().strftime('%Y-%m-%d')
        string = "get_all_game_lines returned 0 results.  YOU MUST TELL THE USER THAT YOU CURRENTLY DO NOT HAVE ACCESS TO LIVE GAME LINES OR DIRECT LINKS TO THE BOOKS FOR GAMES RIGHT NOW."
        odds_table = pd.DataFrame(data={'date': [todays_date], 'string': [string]})
        log.warning('Empty DataFrame', extra={
            'league': league,
            'book_name': book_name,
            'team_one': team_one,
            'team_two': team_two,
            **log_extras,
        })
    else:
        # SWITCH UTC TO ET
        odds_table['time'] = pd.to_datetime(odds_table['time'], errors='coerce', utc=True)
        odds_table['time'] = odds_table['time'].dt.tz_convert('US/Eastern')

        # Rename time to date
        odds_table = odds_table.rename(columns={'time': 'date'})
        odds_table['date'] = pd.to_datetime(odds_table['date'].dt.strftime('%Y-%m-%d'), errors='coerce')

        try:
            # drop: home_abbreviation, visitor_abbreviation, vig_free_home_implied_odds, vig_free_visitor_implied_odds
            odds_table = odds_table.drop(columns=['home_abbreviation', 'visitor_abbreviation', 'vig_free_home_implied_odds', 'vig_free_visitor_implied_odds'], errors='ignore')
        except:
            pass

    #drop duplicates
    odds_table = odds_table.drop_duplicates()

    #only keep MAX_RESULTS rows
    odds_table = odds_table.head(MAX_RESULTS)

    odds_table['string'] = odds_table.apply(
        lambda row: "\n".join([f"{col}: {row[col]}" for col in odds_table.columns if pd.notna(row[col])]),
        axis=1
    )


    # Just keep date and string
    return odds_table[['date', 'string']]

async def get_all_game_lines(league=None, bet_type="moneyline", book_name="all", team_one=None, team_two=None, need_alts=False, log_extras={}, **kwargs):
    start_time = time.time()
    if team_one is None and team_two is None:
        log.warning('Missing Input Parameter', extra={
            'league': league,
            'bet_type': bet_type,
            'book_name': book_name,
            'team_one': team_one,
            'team_two': team_two,
            **log_extras,
        })

    try:
        odds_table = await get_table(f"odds_table_{bet_type}_all_books")
        if len(odds_table) == 0:
            await asyncio.sleep(2) #wait 2 seconds and try again
            odds_table = await get_table(f"odds_table_{bet_type}_all_books")
        odds_table = await asyncio.to_thread(process_odds_table, odds_table, league, book_name, team_one, team_two, log_extras, need_alts)

    except Exception as e:
        log.error('ToolError', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'league': league,
            'bet_type': bet_type,
            'book_name': book_name,
            **log_extras,
        })
        odds_table = pd.DataFrame(columns=['date', 'string'])

    if not odds_table.empty: odds_table['tool_used'] = "get_all_game_lines"
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

# odds_table, models_used = asyncio.run(get_all_game_lines(
#     league="nba",
#     team_one="New York Knicks",
#     bet_type="spread",
#     book_name="DraftKings",
# ))
#
# for i, row in odds_table.iterrows():
#     for column in odds_table.columns:
#         print(f"{column}: {row[column]}")