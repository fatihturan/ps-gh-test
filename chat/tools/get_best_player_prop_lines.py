import asyncio
import pandas as pd
import traceback
import difflib
import time

from .helpers import MAX_RESULTS
from .helpers import get_table, remove_accents


import logging
log = logging.getLogger('json')

async def get_best_player_prop_lines(league=None, bet_type="all", team_one=None, team_two=None, player_name=None, type="all", need_alts=False, log_extras={}, **kwargs):
    start_time = time.time()
    if team_one is None and team_two is None and player_name is None:
        log.warning('Missing Input Parameter', extra={
            'league': league,
            'bet_type': bet_type,
            'team_one': team_one,
            'team_two': team_two,
            'player_name': player_name,
            **log_extras,
        })

    try:
        odds_table = await get_table("odds_table_props_best_books")

        if len(odds_table) == 0:
            #wait 2 seconds and try again
            await asyncio.sleep(2)
            odds_table = await get_table("odds_table_props_best_books")

        def process_odds_table(odds_table, league, bet_type, team_one, team_two, player_name, type):
            # Drop the following columns: id, live
            odds_table = odds_table.drop(columns=['id', 'live'], errors='ignore')

            if league and len(odds_table) > 0:
                odds_table = odds_table[odds_table['tournament'].str.lower() == league.lower()]
            if bet_type != "all" and len(odds_table) > 0:
                #don't need this anymore because we are using dynamic prop names
                # bet_type = f"Player - {bet_type}"
                bet_types = odds_table['prop'].str.lower().unique()
                try:
                    #use difflib to find the closest match
                    closest_match = difflib.get_close_matches(bet_type.lower(), bet_types, n=1)
                    bet_type = closest_match[0]
                except:
                    pass
                odds_table = odds_table[odds_table['prop'].str.lower() == bet_type.lower()]
            if team_one and len(odds_table) > 0:
                odds_table = odds_table[odds_table['game'].str.lower().str.contains(team_one.lower())]
            if team_two and len(odds_table) > 0:
                odds_table = odds_table[odds_table['game'].str.lower().str.contains(team_two.lower())]
            if player_name and len(odds_table) > 0:
                player_names = odds_table['player_name'].unique()
                try:
                    #use difflib to find the closest match
                    closest_match = difflib.get_close_matches(player_name, player_names, n=1)
                    player_name = closest_match[0]
                except:
                    pass
                odds_table = odds_table[odds_table['player_name'].str.lower() == player_name.lower()]
            if type != "all" and len(odds_table) > 0:
                odds_table = odds_table[odds_table['type'].str.lower() == type.lower()]

            if not need_alts and len(odds_table) > 0:
                try:
                    odds_table = odds_table[odds_table['main'] == True]
                except:
                    pass
            if len(odds_table) == 0:
                todays_date = pd.Timestamp.now().strftime('%Y-%m-%d')
                string = "get_all_player_prop_lines returned 0 results.  YOU MUST TELL THE USER THAT YOU CURRENTLY DO NOT HAVE ACCESS TO PLAYER PROP LINES OR DIRECT LINKS TO THE BOOKS FOR PLAYER PROPS RIGHT NOW."
                odds_table = pd.DataFrame(data={'date': [todays_date], 'string': [string]})
                log.warning('Empty DataFrame', extra={
                    'league': league,
                    'bet_type': bet_type,
                    'team_one': team_one,
                    'team_two': team_two,
                    'player_name': player_name,
                    **log_extras,
                })
            else:
                # Sort by handle
                odds_table = odds_table.sort_values('handle')

                #drop duplicates
                odds_table = odds_table.drop_duplicates(subset=['player_name', 'prop', 'over_line', 'under_line'], keep='first')

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

                # ADD PINE LINK
                def get_pine_link(data):
                    player_name = data[0]
                    player_name_without_accents = remove_accents(player_name)
                    prop = data[1]
                    line = data[2]
                    pine_link = f"https://www.pine-sports.com/stats/project/MLB/{player_name_without_accents}/{prop}/{line}/10/".replace(" ", "%20")
                    return pine_link

                odds_table['pine_over_link'] = odds_table[['player_name', 'prop', 'over_line']].apply(get_pine_link, axis=1)
                odds_table['pine_under_link'] = odds_table[['player_name', 'prop', 'under_line']].apply(get_pine_link, axis=1)

                try:
                    #drop the following: vig_free_over_implied_odds, over_projection, vig_free_over_projection, vig_free_under_implied_odds, under_projection, vig_free_under_projection
                    odds_table = odds_table.drop(columns=['vig_free_over_implied_odds', 'over_projection', 'vig_free_over_projection', 'vig_free_under_implied_odds', 'under_projection', 'vig_free_under_projection'], errors='ignore')
                except:
                    pass

                odds_table['string'] = odds_table.apply(
                    lambda row: "\n".join([f"{col}: {row[col]}" for col in odds_table.columns if pd.notna(row[col])]),
                    axis=1
                )

                # Just keep date and string
                odds_table = odds_table[['date', 'string']]

            return odds_table

        odds_table = await asyncio.to_thread(process_odds_table, odds_table, league, bet_type, team_one, team_two, player_name, type)

    except Exception as e:
        log.error('ToolError', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras,})
        odds_table = pd.DataFrame(columns=['date', 'string'])

    if len(odds_table) > 0:
        odds_table['tool_used'] = "get_best_player_prop_lines"
    else: odds_table = pd.DataFrame(columns=['date', 'string', 'tool_used'])

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'league': league,
        'bet_type': bet_type,
        'team_one': team_one,
        'team_two': team_two,
        'player_name': player_name,
        'runtime': time.time() - start_time
    })
    return odds_table, [] #no models used

# odds_table, models_used = asyncio.run(get_best_player_prop_lines(
#     league="NBA",
#     bet_type="1st Quarter Total Points",
#     team_one="Golden State Warriors",
# ))
#
# for i, row in odds_table.iterrows():
#     for column in odds_table.columns:
#         print(f"{column}: {row[column]}")
#     print()
#     print()
#     print("_________________________________________________________")
#     print()
#     print()