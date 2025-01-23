from datetime import datetime
from pytz import timezone
import time
import asyncio
import pandas as pd
from .helpers import get_table

import logging
log = logging.getLogger('json')

async def get_game_sharp_picks_table(league=None, bet_type="moneyline", team_one=None, team_two=None, line=None, log_extras={}, **kwargs):
    start_time = time.time()
    odds_table = await get_table(f"odds_table_{bet_type}_pinnacle")
    if len(odds_table) == 0:
        await asyncio.sleep(2) # wait 2 seconds and try again
        odds_table = await get_table(f"odds_table_{bet_type}_pinnacle")

    if league and len(odds_table) > 0:
        #TODO- if len > 0 here? Yeah, that would be a good idea.
        odds_table = odds_table[odds_table['tournament'].str.lower() == league.lower()]
    if team_one and len(odds_table) > 0:
        temp_odds_table = odds_table[(odds_table['home'].str.lower().str.contains(team_one.lower())) | (odds_table['visitor'].str.lower().str.contains(team_one.lower()))]
        if len(temp_odds_table) > 0: odds_table = temp_odds_table
    if team_two and len(odds_table) > 0:
        temp_odds_table = odds_table[(odds_table['home'].str.lower().str.contains(team_two.lower())) | (odds_table['visitor'].str.lower().str.contains(team_two.lower()))]
        if len(temp_odds_table) > 0: odds_table = temp_odds_table

    if bet_type == "moneyline" and len(odds_table) > 0:
        columns = ['time', 'tournament', 'game', 'home', 'visitor', 'vig_free_home_implied_odds', 'vig_free_visitor_implied_odds']
        odds_table = odds_table[columns]
        #rename vig_free_home_implied_odds to "home_sharp_win_percentage" and "vig_free_visitor_implied_odds" to "visitor_sharp_win_percentage"
        odds_table = odds_table.rename(columns={'vig_free_home_implied_odds': 'home_sharp_win_percentage', 'vig_free_visitor_implied_odds': 'visitor_sharp_win_percentage'})
        #round to 2 decimal places
        odds_table['home_sharp_win_percentage'] = odds_table['home_sharp_win_percentage'].round(2)
        odds_table['visitor_sharp_win_percentage'] = odds_table['visitor_sharp_win_percentage'].round(2)
    elif bet_type == "spread" and len(odds_table) > 0:
        #convert line to float and round to 1 decimal
        odds_table['line'] = odds_table['line'].astype(float)
        odds_table['line'] = odds_table['line'].round(1)

        got_line = False
        if line and len(odds_table) > 0:
            temp_odds_table = odds_table[odds_table['line'] == line]
            if len(temp_odds_table) > 0:
                odds_table = temp_odds_table
                got_line = True
        if not got_line and len(odds_table) > 0:
            #convert vig_free_home_implied_odds and vig_free_visitor_implied_odds to float
            odds_table['vig_free_home_implied_odds'] = odds_table['vig_free_home_implied_odds'].astype(float)
            odds_table['vig_free_visitor_implied_odds'] = odds_table['vig_free_visitor_implied_odds'].astype(float)

            #odds_difference is the abs value of the difference between the vig_free_home_implied_odds and vig_free_visitor_implied_odds
            odds_table['odds_difference'] = abs(odds_table['vig_free_home_implied_odds'] - odds_table['vig_free_visitor_implied_odds'])

            #sort by time, game, and odds_difference lowest to highest
            odds_table = odds_table.sort_values(by=['time', 'game', 'odds_difference'])

            #drop duplicates based on time and game, keep first - this gets the true line
            odds_table = odds_table.drop_duplicates(subset=['time', 'game'], keep='first')

            #remove odds_difference
            odds_table = odds_table.drop(columns=['odds_difference'])

        if len(odds_table) > 0:
            columns = ['time', 'tournament', 'game', 'home', 'visitor', 'line', 'vig_free_home_implied_odds', 'vig_free_visitor_implied_odds']
            odds_table = odds_table[columns]

            #rename vig_free_home_implied_odds to "home_sharp_win_percentage" and "vig_free_visitor_implied_odds" to "visitor_sharp_win_percentage"
            odds_table = odds_table.rename(columns={'vig_free_home_implied_odds': 'home_sharp_win_percentage_against_the_spread', 'vig_free_visitor_implied_odds': 'visitor_sharp_win_percentage_against_the_spread'})

            #round to 2 decimal places
            odds_table['home_sharp_win_percentage_against_the_spread'] = odds_table['home_sharp_win_percentage_against_the_spread'].round(2)
            odds_table['visitor_sharp_win_percentage_against_the_spread'] = odds_table['visitor_sharp_win_percentage_against_the_spread'].round(2)
    else:
        if len(odds_table) > 0:
            #convert line to float and round to 1 decimal
            odds_table['line'] = odds_table['line'].astype(float)
            odds_table['line'] = odds_table['line'].round(1)
            got_line = False
            if line:
                temp_odds_table = odds_table[odds_table['line'] == line]
                if len(temp_odds_table) > 0:
                    odds_table = temp_odds_table
                    got_line = True
            if not got_line and len(odds_table) > 0:
                #convert vig_free_over_implied_odds and vig_free_under_implied_odds to float
                odds_table['vig_free_over_implied_odds'] = odds_table['vig_free_over_implied_odds'].astype(float)
                odds_table['vig_free_under_implied_odds'] = odds_table['vig_free_under_implied_odds'].astype(float)

                #odds_difference is the abs value of the difference between the vig_free_over_implied_odds and vig_free_under_implied_odds
                odds_table['odds_difference'] = abs(odds_table['vig_free_over_implied_odds'] - odds_table['vig_free_under_implied_odds'])

                #sort by time, game, and odds_difference lowest to highest
                odds_table = odds_table.sort_values(by=['time', 'game', 'odds_difference'])

                #drop duplicates based on time and game, keep first - this gets the true line
                odds_table = odds_table.drop_duplicates(subset=['time', 'game'], keep='first')

                #remove odds_difference
                odds_table = odds_table.drop(columns=['odds_difference'])

            if len(odds_table) > 0:
                columns = ['time', 'tournament', 'game', 'home', 'visitor', 'line', 'vig_free_over_implied_odds', 'vig_free_under_implied_odds']
                odds_table = odds_table[columns]
                #rename vig_free_over_implied_odds to "over_sharp_win_percentage" and "vig_free_under_implied_odds" to "under_sharp_win_percentage"
                odds_table = odds_table.rename(columns={'vig_free_over_implied_odds': 'over_sharp_win_percentage', 'vig_free_under_implied_odds': 'under_sharp_win_percentage'})
                #round to 2 decimal places
                odds_table['over_sharp_win_percentage'] = odds_table['over_sharp_win_percentage'].round(2)
                odds_table['under_sharp_win_percentage'] = odds_table['under_sharp_win_percentage'].round(2)

    results_df = pd.DataFrame(columns=['date', 'string', 'tool_used'])

    if len(odds_table) > 0:
        results_df = pd.concat([results_df, pd.DataFrame({"date": [datetime.now(timezone('US/Eastern'))], "string": [f"START SHARP PICKS\n\n{odds_table.to_string()}\n\nEND SHARP PICKS\n\n"], "tool_used": ["get_game_sharp_picks_table"]})])

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'league': league,
        'bet_type': bet_type,
        'line': line,
        'team_one': team_one,
        'team_two': team_two,
        'runtime': time.time() - start_time
    })
    return results_df, [] #no models used

# results_df, models_used_array = asyncio.run(get_game_sharp_picks_table(league="nfl", bet_type="spread", team_one="New York Giants", line=-2.5))
# print(results_df['string'][0])