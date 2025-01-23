import asyncio
import pandas as pd
import traceback
import time

from .helpers import MAX_RESULTS
from .helpers import get_table

import logging
log = logging.getLogger('json')

def process_odds_table(odds_table, league: str | None, team_one: str | None, team_two: str | None, type, log_extras, need_alts: bool):

    odds_table = odds_table.drop(columns=['id', 'live'], errors='ignore') #drop columns

    if league and len(odds_table) > 0:
        odds_table = odds_table[odds_table['tournament'].str.lower() == league.lower()]
    if team_one and len(odds_table) > 0:
        odds_table = odds_table[(odds_table['home'].str.lower().str.contains(team_one.lower())) | (odds_table['visitor'].str.lower().str.contains(team_one.lower()))]
    if team_two and len(odds_table) > 0:
        odds_table = odds_table[(odds_table['home'].str.lower().str.contains(team_two.lower())) | (odds_table['visitor'].str.lower().str.contains(team_two.lower()))]
    if type != "all" and len(odds_table) > 0:
        odds_table = odds_table[odds_table['type'].str.lower() == type.lower()]

    if not need_alts and len(odds_table) > 0:
        try:
            odds_table = odds_table[odds_table['main'] == True]
        except:
            pass

    if len(odds_table) == 0:
        todays_date = pd.Timestamp.now().strftime('%Y-%m-%d')
        string = "get_best_game_lines returned 0 results.  YOU MUST TELL THE USER THAT YOU CURRENTLY DO NOT HAVE ACCESS TO LIVE GAME LINES OR DIRECT LINKS TO THE BOOKS FOR GAMES RIGHT NOW."
        odds_table = pd.DataFrame(data={'date': [todays_date], 'string': [string]})
        log.warning('Empty DataFrame', extra={
            'league': league,
            'team_one': team_one,
            'team_two': team_two,
            **log_extras,
        })
    else:
        # SWITCH UTC TO EST
        odds_table['time'] = pd.to_datetime(odds_table['time'], errors='coerce', utc=True)
        odds_table['time'] = odds_table['time'].dt.tz_convert('US/Eastern')

        # Sort by handle lowest to highest
        odds_table = odds_table.sort_values('handle')

        # drop duplicates
        odds_table = odds_table.drop_duplicates()

        #only keep MAX_RESULTS rows
        odds_table = odds_table.head(MAX_RESULTS)

        # Rename time to date
        odds_table = odds_table.rename(columns={'time': 'date'})
        odds_table['date'] = pd.to_datetime(odds_table['date'].dt.strftime('%Y-%m-%d'), errors='coerce')

        odds_table['string'] = odds_table.apply(
            lambda row: "\n".join([f"{col}: {row[col]}" for col in odds_table.columns if pd.notna(row[col])]),
            axis=1
        )
        odds_table = odds_table[['date', 'string']] # Just keep date and string

    return odds_table

async def get_best_game_lines(league=None, bet_type="moneyline", team_one=None, team_two=None, type="all", need_alts=False, log_extras={}, **kwargs):
    start_time = time.time()
    if team_one is None and team_two is None:
        log.warning('Missing Input Parameter', extra={
            'league': league,
            'bet_type': bet_type,
            'team_one': team_one,
            'team_two': team_two,
            **log_extras,
        })

    try:
        odds_table = await get_table(f"odds_table_{bet_type}_best_books")
        if len(odds_table) == 0:
            await asyncio.sleep(2) #wait 2 seconds and try again
            odds_table = await get_table(f"odds_table_{bet_type}_best_books")
        odds_table = await asyncio.to_thread(process_odds_table, odds_table, league, team_one, team_two, type, log_extras, need_alts)

    except Exception as e:
        log.error('ToolError', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'league': league,
            'bet_type': type,
            'team_one': team_one,
            'team_two': team_two,
            **log_extras,
        })
        odds_table = pd.DataFrame(columns=['date', 'string'])

    if not odds_table.empty: odds_table['tool_used'] = "get_best_game_lines"
    else: odds_table = pd.DataFrame(columns=['date', 'string', 'tool_used'])

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'league': league,
        'bet_type': type,
        'team_one': team_one,
        'team_two': team_two,
        'runtime': time.time() - start_time
    })
    return odds_table, [] #models_used_array always empty

# odds_table,models_used_array = asyncio.run(get_best_game_lines(league="nfl", bet_type="spread", need_alts=True))
# for i, row in odds_table.iterrows():
#     for column in odds_table.columns:
#         print(row[column])