from datetime import datetime
from pytz import timezone
import time
import asyncio
import pandas as pd
import traceback

from .helpers import get_table

import logging
log = logging.getLogger('json')

async def get_plus_ev_game_lines(bet_type="moneyline", league=None, book_name="all", team_one=None, team_two=None, log_extras={}, **kwargs):
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
        odds_table = await get_table(f"odds_table_{bet_type}_plus_ev_bets")
        if len(odds_table) == 0:
            await asyncio.sleep(2) #wait 2 seconds and try again
            odds_table = await get_table(f"odds_table_{bet_type}_plus_ev_bets")

        def process_odds_table(odds_table, book_name, team_one, team_two):
            if len(odds_table) > 0:
                odds_table = odds_table.drop(columns=['id', 'live'], errors='ignore')

            if book_name != "all" and len(odds_table) > 0:
                temp_odds_table = odds_table[odds_table['book_name'].str.lower() == book_name.lower()]
                if len(temp_odds_table) > 0: odds_table = temp_odds_table
            if league and len(odds_table) > 0:
                temp_odds_table = odds_table[odds_table['tournament'].str.lower() == league.lower()]
                if len(temp_odds_table) > 0: odds_table = temp_odds_table
            if team_one and len(odds_table) > 0:
                temp_odds_table = odds_table[(odds_table['home'].str.lower().str.contains(team_one.lower())) | (odds_table['visitor'].str.lower().str.contains(team_one.lower()))]
                if len(temp_odds_table) > 0: odds_table = temp_odds_table
            if team_two and len(odds_table) > 0:
                temp_odds_table = odds_table[(odds_table['home'].str.lower().str.contains(team_two.lower())) | (odds_table['visitor'].str.lower().str.contains(team_two.lower()))]
                if len(temp_odds_table) > 0: odds_table = temp_odds_table

            if len(odds_table) > 0:

                # SWITCH UTC TO EST
                odds_table['time'] = pd.to_datetime(odds_table['time'], errors='coerce', utc=True)
                odds_table['time'] = odds_table['time'].dt.tz_convert('US/Eastern')

                # Rename time to date
                odds_table = odds_table.rename(columns={'time': 'date'})
                odds_table['date'] = pd.to_datetime(odds_table['date'].dt.strftime('%Y-%m-%d'), errors='coerce')

                #round all floats to 2 decimal places
                odds_table = odds_table.round(2)

                #sort by expected value, highest to lowest
                odds_table = odds_table.sort_values(by='expected_value', ascending=False)

                #keep to 20 rows
                odds_table = odds_table.head(20)

                #drop home_abbreviation, visitor_abbreviation
                odds_table = odds_table.drop(columns=['home_abbreviation', 'visitor_abbreviation'], errors='ignore')

                #convert expected_value to string with %
                odds_table['expected_value'] = (odds_table['expected_value']).astype(str) + '%'
                odds_table['string'] = odds_table.apply(
                    lambda row: "\n".join([f"{col}: {row[col]}" for col in odds_table.columns if pd.notna(row[col])]),
                    axis=1
                )
            else:
                todays_date = pd.Timestamp.now().strftime('%Y-%m-%d')
                string = "Sorry, we could not find any games that matched your search.  Please try again later."
                log.warning('Empty DataFrame', extra={
                    'league': league,
                    'bet_type': bet_type,
                    'book_name': book_name,
                    'team_one': team_one,
                    'team_two': team_two,
                    **log_extras,
                })
                return pd.DataFrame(data={'date': [todays_date], 'string': [string]})
            # Just keep date and string
            return odds_table[['date', 'string']]

        odds_table = await asyncio.to_thread(process_odds_table, odds_table, book_name, team_one, team_two)

    except Exception as e:
        log.error('ToolError', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras})
        odds_table = pd.DataFrame(columns=['date', 'string'])

    if len(odds_table) == 0:
        odds_table = pd.concat([odds_table, pd.DataFrame({"date": datetime.now(timezone('US/Eastern')), "string": "Sorry we were unable to find any +EV bets at the moment."}, index=[0])])

    odds_table['tool_used'] = "get_plus_ev_game_lines"
    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'league': league,
        'team_one': team_one,
        'team_two': team_two,
        'bet_type': bet_type,
        'book_name': book_name,
        'runtime': time.time() - start_time
    })
    return odds_table, [] #no models used

# odds_table, models_used_array = asyncio.run(get_plus_ev_game_lines(league="nba"))
# for i, row in odds_table.iterrows():
#     for column in odds_table.columns:
#         print(f"{column}: {row[column]}")