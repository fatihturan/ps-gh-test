import asyncio
import pandas as pd
import traceback
import difflib
import time

from .helpers import MAX_RESULTS
from .helpers import get_table, remove_accents

import logging
log = logging.getLogger('json')

def process_odds_table(odds_table, league: str | None, book_name: str, bet_type: str, team_one: str | None, team_two: str | None, player: str | None, log_extras, need_alts: bool = False):
    odds_table = odds_table.drop(columns=['id', 'live'], errors='ignore') #drop columns

    if league and len(odds_table) > 0:
        odds_table = odds_table[odds_table['tournament'].str.lower() == league.lower()]
    if book_name != "all" and len(odds_table) > 0:
        odds_table = odds_table[odds_table['book_name'].str.lower() == book_name.lower()]

    if bet_type != "all" and len(odds_table) > 0:
        bet_types = odds_table['prop'].str.lower().unique()
        #TODO- i am assuming this is catching a "closest match DNE" or something - can probably just
        # do an if statement instead (test and apply logic elsewhere as relevant)
        try:
            #use difflib to find the closest match
            closest_match = difflib.get_close_matches(bet_type.lower(), bet_types, n=1)
            bet_type = closest_match[0]
        except:
            pass #TODO- log? Yes, we should probably log this.

        odds_table = odds_table[odds_table['prop'].str.lower() == bet_type.lower()]

    if team_one and len(odds_table) > 0:
        odds_table = odds_table[odds_table['game'].str.lower().str.contains(team_one.lower())]
    if team_two and len(odds_table) > 0:
        odds_table = odds_table[odds_table['game'].str.lower().str.contains(team_two.lower())]

    if player and len(odds_table) > 0:
        player_names = odds_table['player_name'].unique()
        try:
            #use difflib to find the closest match
            closest_match = difflib.get_close_matches(player, player_names, n=1)
            player = closest_match[0]
        except:
            pass #TODO- log?
        odds_table = odds_table[odds_table['player_name'].str.lower() == player.lower()]

    if not need_alts and len(odds_table) > 0:
        odds_table = odds_table[odds_table['main'] == True]

    if len(odds_table) == 0:
        todays_date = pd.Timestamp.now().strftime('%Y-%m-%d')
        string = "get_all_player_prop_lines returned 0 results.  YOU MUST TELL THE USER THAT YOU CURRENTLY DO NOT HAVE ACCESS TO PLAYER PROP LINES OR DIRECT LINKS TO THE BOOKS FOR PLAYER PROPS RIGHT NOW."
        odds_table = pd.DataFrame(data={'date': [todays_date], 'string': [string]})
        log.warning('Empty DataFrame', extra={
            'league': league,
            'bet_type': bet_type,
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

        # SWITCH UTC TO EST
        odds_table['time'] = pd.to_datetime(odds_table['time'], errors='coerce', utc=True)
        odds_table['time'] = odds_table['time'].dt.tz_convert('US/Eastern')

        # Rename time to date
        odds_table = odds_table.rename(columns={'time': 'date'})
        odds_table['date'] = pd.to_datetime(odds_table['date'].dt.strftime('%Y-%m-%d'), errors='coerce')

        # ADD PINE LINK
        def get_pine_link(data):
            player_name, prop, line = data #if data is expanded this will break
            player_name_without_accents = remove_accents(player_name)
            return f"https://www.pine-sports.com/stats/project/MLB/{player_name_without_accents}/{prop}/{line}/10/".replace(" ", "%20")

        odds_table['pine_link'] = odds_table[['player_name', 'prop', 'line']].apply(get_pine_link, axis=1)

        try:
            #drop abbreviated_name, team_short_name, slang-prop, vig_free_over_implied_odds, vig_free_under_implied_odds
            odds_table = odds_table.drop(columns=['abbreviated_name', 'team_short_name', 'slang-prop', 'vig_free_over_implied_odds', 'vig_free_under_implied_odds'], errors='ignore')
        except:
            pass

        odds_table['string'] = odds_table.apply(
            lambda row: "\n".join([f"{col}: {row[col]}" for col in odds_table.columns if pd.notna(row[col])]),
            axis=1
        )
        odds_table = odds_table[['date', 'string']] # Just keep date and string

    return odds_table

async def get_all_player_prop_lines(league=None, book_name="all", bet_type="all", team_one=None, team_two=None, player_name=None, need_alts=False, log_extras={}, **kwargs):
    start_time = time.time()
    if team_one is None and team_two is None and player_name is None:
        log.warning('Missing Input Parameter', extra={
            'league': league,
            'bet_type': bet_type,
            'book_name': book_name,
            'team_one': team_one,
            'team_two': team_two,
            'player_name': player_name,
            **log_extras,
        })

    try:
        odds_table = await get_table("odds_table_props_all_books")
        if len(odds_table) == 0:
            await asyncio.sleep(2) #wait 2 seconds and try again
            odds_table = await get_table("odds_table_props_all_books")
        odds_table = await asyncio.to_thread(process_odds_table, odds_table, league, book_name, bet_type, team_one, team_two, player_name, log_extras, need_alts)

    except Exception as e:
        log.error('ToolError', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'league': league,
            'bet_type': bet_type,
            'book_name': book_name,
            'team_one': team_one,
            'team_two': team_two,
            'player_name': player_name,
            **log_extras,
        })
        odds_table = pd.DataFrame(columns=['date', 'string'])

    if len(odds_table) > 0: odds_table['tool_used'] = "get_all_player_prop_lines"
    else: odds_table = pd.DataFrame(columns=['date', 'string', 'tool_used'])

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'league': league,
        'bet_type': bet_type,
        'book_name': book_name,
        'team_one': team_one,
        'team_two': team_two,
        'player_name': player_name,
        'runtime': time.time() - start_time
    })
    return odds_table, [] #models_used_array always empty here
#
# odds_table, models_used_array = asyncio.run(get_all_player_prop_lines(
#     league="nfl",
#     #book_name="DraftKings",
#     #bet_type="1st Quarter Total Points",
#     player_name="George Kittle"
# ))
#
# for i, row in odds_table.iterrows():
#     for column in odds_table.columns:
#         print(f"{column}: {row[column]}")