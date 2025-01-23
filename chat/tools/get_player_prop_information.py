from datetime import date, datetime
import time
import asyncio
import aioboto3
import pandas as pd
import traceback
from io import StringIO
import difflib
import numpy as np

from .helpers import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_CHART_BUCKET_NAME, AWS_STORAGE_BUCKET_NAME, MAX_RESULTS
from .helpers import get_table, remove_accents

import logging
log = logging.getLogger('json')

async def get_player_prop_information(league, team_one=None, team_two=None, player_name=None, prop="None", hit_type=None, hit_count=None, is_general=True, book_name="Best", min_odds=-10000, max_odds=+10000, log_extras={}, **kwargs):
    start_time = time.time()
    momentum_time, team_time, process_time, finish = 0, 0, 0, 0
    t1, t2, t3 = None, None, None
    if prop != "None" or player_name:
        is_general = False
    try:
        #If the prop requested is home runs, get the pine home run sheet.  These are one-sided props and are not currently in the recommendations engine.
        if "home run" in prop.lower():
            async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
                s3_momentum_sheet_file_path = f'props/hr_sheet.csv'

                # Fetch momentum sheet CSV file
                momentum_sheet_obj = await client.get_object(Bucket=AWS_CHART_BUCKET_NAME,Key=s3_momentum_sheet_file_path)
                momentum_sheet_body = await momentum_sheet_obj['Body'].read()
                csv_string = momentum_sheet_body.decode('utf-8')
                momentum_sheet = pd.read_csv(StringIO(csv_string))

                if len(momentum_sheet) > 0:
                    # Define a regular expression pattern to match and remove the unwanted parts
                    pattern = r'<a href=| target=.*$'

                    # Apply the pattern to clean the 'Robot Likes' column
                    momentum_sheet['Robot Likes'] = momentum_sheet['Robot Likes'].str.replace(pattern, '', regex=True).str.strip()

                    #rename Robot Likes to Pine URL
                    try:
                        momentum_sheet = momentum_sheet.rename(columns={"Robot Likes": "Pine URL"})
                    except:
                        pass

            s3_line_csv_file_path = f'datafiles/{league.upper()}_-_Player_Stats_Last_Season.pkl'
            async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
                s3_player_stats_file_path = f'momentum_sheets/{league.lower()}_momentum_sheet.csv'

                # Fetch momentum sheet CSV file
                player_stats_obj = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_player_stats_file_path)
                player_stats_body = await player_stats_obj['Body'].read()
                csv_string = player_stats_body.decode('utf-8')
                player_stats = pd.read_csv(StringIO(csv_string))


                if len(momentum_sheet) > 0:
                    #Get unique columns on player name, team, and opponent
                    player_stats = player_stats[["Player Name", "Team", "Opponent"]].drop_duplicates()

                    #merge on player name
                    momentum_sheet = pd.merge(momentum_sheet, player_stats, how='left', on='Player Name')


        #if the prop requested is rushing and receiving touchdowns (i.e., anytime touchdowns), get the pine rushing and receiving touchdowns sheet.  These are one-sided props and are not currently in the recommendations engine.
        elif "rushing and receiving touchdowns" in prop.lower() or "anytime touchdowns" in prop.lower() or ("touchdowns" in prop.lower() and "passing" not in prop.lower()):
            async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
                s3_momentum_sheet_file_path = f'props/anytime_td_sheet.csv'

                # Fetch momentum sheet CSV file
                momentum_sheet_obj = await client.get_object(Bucket=AWS_CHART_BUCKET_NAME,Key=s3_momentum_sheet_file_path)
                momentum_sheet_body = await momentum_sheet_obj['Body'].read()
                csv_string = momentum_sheet_body.decode('utf-8')
                momentum_sheet = pd.read_csv(StringIO(csv_string))

                if len(momentum_sheet) > 0:
                    # Define a regular expression pattern to match and remove the unwanted parts
                    pattern = r'<a href=| target=.*$'

                    # Apply the pattern to clean the 'Robot Likes' column
                    momentum_sheet['Robot Likes'] = momentum_sheet['Robot Likes'].str.replace(pattern, '',regex=True).str.strip()

                    # rename Robot Likes to Pine URL
                    try:
                        momentum_sheet = momentum_sheet.rename(columns={"Robot Likes": "Pine URL"})
                    except:
                        pass

            s3_line_csv_file_path = f'datafiles/{league.upper()}_-_Player_Stats_Last_Season.pkl'
            async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
                s3_player_stats_file_path = f'momentum_sheets/{league.lower()}_momentum_sheet.csv'

                # Fetch momentum sheet CSV file
                player_stats_obj = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME,Key=s3_player_stats_file_path)
                player_stats_body = await player_stats_obj['Body'].read()
                csv_string = player_stats_body.decode('utf-8')
                player_stats = pd.read_csv(StringIO(csv_string))

                if len(momentum_sheet) > 0:
                    # Get unique columns on player name, team, and opponent
                    player_stats = player_stats[["Player Name", "Team", "Opponent"]].drop_duplicates()

                    # merge on player name
                    momentum_sheet = pd.merge(momentum_sheet, player_stats, how='left', on='Player Name')

        #Else get the recommendations sheet for the league (previously called the momentum sheet).
        else:
            async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
                s3_momentum_sheet_file_path = f'momentum_sheets/{league.lower()}_momentum_sheet.csv'

                # Fetch momentum sheet CSV file
                momentum_sheet_obj = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_momentum_sheet_file_path)
                momentum_sheet_body = await momentum_sheet_obj['Body'].read()
                csv_string = momentum_sheet_body.decode('utf-8')
                momentum_sheet = pd.read_csv(StringIO(csv_string))


        t1 = time.time()
        momentum_time = t1 - start_time
        
        #This gets the team names from the team names momentum sheet.  This is used to convert the team names in the recommendations sheet to the full team names.
        async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
            # Fetch team names CSV file
            s3_team_name_file_path = f'momentum_sheets/{league.upper()}_Team_Names_Momentum_Sheet.csv'
            team_names_obj = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_team_name_file_path)
            team_names_body = await team_names_obj['Body'].read()
            csv_string = team_names_body.decode('utf-8')
            team_names = pd.read_csv(StringIO(csv_string))

        if len(momentum_sheet) > 0:
            # Remove spaces in momentum_sheet["Pine URL"]
            momentum_sheet["Pine URL"] = momentum_sheet["Pine URL"].str.replace(" ", "%20")

        t2 = time.time()
        team_time = t2 - t1


        def process_momentum_sheet(momentum_sheet, team_names, team_one, team_two, player_name, prop, hit_type, hit_count):
            def get_updated_team_name(original_team_name):
                try:
                    new_team_name = team_names[team_names['Pine Name'] == original_team_name]['Full Name'].values[0]
                except IndexError:
                    new_team_name = original_team_name
                return new_team_name

            if len(momentum_sheet) > 0:
                momentum_sheet['Team'] = momentum_sheet['Team'].apply(get_updated_team_name)
                momentum_sheet['Opponent'] = momentum_sheet['Opponent'].apply(get_updated_team_name)

                momentum_sheet['Prop'] = momentum_sheet['Prop'].str.replace('PAR', 'Points & Assists & Rebounds')
                momentum_sheet['Prop'] = momentum_sheet['Prop'].str.replace('PA', 'Points & Assists')
                momentum_sheet['Prop'] = momentum_sheet['Prop'].str.replace('PR', 'Points & Rebounds')
                momentum_sheet['Prop'] = momentum_sheet['Prop'].str.replace('RA', 'Rebounds & Assists')
                momentum_sheet['Prop'] = momentum_sheet['Prop'].str.replace('SB', 'Steals & Blocks')

                if not "home run" in prop.lower() and not "rushing and receiving touchdowns" in prop.lower():
                    # Drop unnecessary columns
                    columns_to_drop = [
                        'DraftKings Over Implied Odds', 'DraftKings Under Implied Odds', 'FanDuel Over ML',
                        'FanDuel Under ML', 'FanDuel Over Implied Odds', 'FanDuel Under Implied Odds',
                        'VS Opponent Season', 'Best Hit %', 'Best Hit', 'Projected Over ML (DraftKings)',
                        'Projected Under ML (DraftKings)', 'Projected Over ML (FanDuel)', 'Projected Under ML (FanDuel)',
                        'L9 Hit %', 'L9 Mean', 'L8 Hit %', 'L8 Mean', 'L7 Hit %', 'L7 Mean', 'L6 Hit %', 'L6 Mean',
                        'L4 Hit %', 'L4 Mean', 'L3 Hit %', 'L3 Mean', 'L2 Hit %', 'L2 Mean', 'Best Hit %', 'Best Hit',
                        'L20 Std', 'L15 Std', 'L10 Std', 'L5 Std'
                    ]
                    momentum_sheet = momentum_sheet.drop(columns=columns_to_drop)

            if player_name and len(momentum_sheet) > 0:
                all_player_names = momentum_sheet['Player Name'].str.lower().unique()
                try:
                    closest_match = difflib.get_close_matches(player_name.lower(), all_player_names, n=1)
                    closest_match = closest_match[0]
                except:
                    closest_match = player_name.lower()
                if closest_match:
                    momentum_sheet = momentum_sheet[momentum_sheet['Player Name'].str.lower() == closest_match]
            if len(momentum_sheet) == 0:
                log.error('Error Filtering Momentum Sheet on Player Name', extra={'playerName': closest_match, **log_extras})


            if prop != "None" and len(momentum_sheet) > 0:
                try:
                    #TODO- reformat and/or log
                    #get closest match using difflib
                    all_props = momentum_sheet['Prop'].str.lower().unique()
                    try:
                        closest_match = difflib.get_close_matches(prop.lower(), all_props, n=1)
                    except:
                        closest_match = prop.lower()

                    if closest_match: prop = closest_match[0]
                except:
                    pass

                momentum_sheet = momentum_sheet[momentum_sheet['Prop'].str.lower().str.contains(prop.lower())]

            if len(momentum_sheet) == 0:
                log.error('Error Filtering Momentum Sheet on Prop', extra={'propLowerCase': prop.lower(), **log_extras})

            if "home run" in prop.lower():
                odds_table = asyncio.run(get_table("odds_table_props_all_books", "prop", "Player - Batting - Home Run"))

                if len(odds_table) > 0:
                    #Remove accents
                    odds_table['player_name'] = odds_table['player_name'].apply(lambda x: remove_accents(x))
                    odds_table = odds_table[~odds_table['book_name'].str.lower().str.contains("underdog")]
                    odds_table = odds_table[~odds_table['book_name'].str.lower().str.contains("prizepicks")]
                    #Sort by by player name then lowest over implied odds
                    odds_table = odds_table.sort_values(by=['player_name', 'over_odds'], ascending=[True, True])
                    #drop duplicates on player name
                    odds_table = odds_table.drop_duplicates(subset=['player_name'])

                    #TODO- do we need to define this list like 7 times?
                    columns = [
                        'tournament',
                        'game',
                        'player_name',
                        'prop',
                        'book_name',
                        'line',
                        'over_odds',
                        'over_link',
                        'under_odds',
                        'under_link',
                        'handle'
                    ]

            elif "rushing and receiving touchdowns" in prop.lower():
                odds_table = asyncio.run(get_table("odds_table_props_all_books", "prop", "Player - Offense - Rushing and Receiving Touchdowns"))

                if len(odds_table) > 0:
                    odds_table['player_name'] = odds_table['player_name'].apply(lambda x: remove_accents(x))
                    odds_table = odds_table[~odds_table['book_name'].str.lower().str.contains("underdog")]
                    odds_table = odds_table[~odds_table['book_name'].str.lower().str.contains("prizepicks")]
                    #Sort by by player name then lowest over implied odds
                    odds_table = odds_table.sort_values(by=['player_name', 'over_odds'], ascending=[True, True])
                    #drop duplicates on player name
                    odds_table = odds_table.drop_duplicates(subset=['player_name'])
                    columns = [
                        'tournament',
                        'game',
                        'player_name',
                        'prop',
                        'book_name',
                        'line',
                        'over_odds',
                        'over_link',
                        'under_odds',
                        'under_link',
                        'handle'
                    ]
            else:
                if book_name == "Best":

                    odds_table = asyncio.run(get_table("odds_table_props_best_books", "tournament", league.upper()))

                    if len(odds_table) > 0:
                        odds_table['player_name'] = odds_table['player_name'].apply(lambda x: remove_accents(x))
                        columns = [
                            'tournament',
                            'player_name',
                            'prop',
                            'over_line',
                            'over_odds',
                            'book_-_best_over_book',
                            'over_link',
                            'under_line',
                            'under_odds',
                            'book_-_best_under_book',
                            'under_link',
                            'handle',
                            'type'
                        ]
                else:
                    odds_table = asyncio.run(get_table("odds_table_props_all_books", "book_name", book_name))
                    if len(odds_table) == 0:
                        log.error('Error Getting Odds Table filtering on Book', extra={'bookName': book_name, **log_extras})
                        odds_table = asyncio.run(get_table("odds_table_props_best_books", "tournament", league.upper()))

                    if len(odds_table) > 0:
                        odds_table['player_name'] = odds_table['player_name'].apply(lambda x: remove_accents(x))
                        columns = [
                            'tournament',
                            'player_name',
                            'prop',
                            'book_name',
                            'line',
                            'over_odds',
                            'over_link',
                            'under_odds',
                            'under_link',
                            'handle'
                        ]

            if "home run" not in prop.lower() and "rushing and receiving touchdowns" not in prop.lower() and len(odds_table) > 0:
                temp_odds_table = odds_table[(odds_table['over_odds'] >= min_odds) & (odds_table['over_odds'] <= max_odds)]
                if len(temp_odds_table) > 0:
                    odds_table = temp_odds_table
                else:
                    log.error('Error Filtering Momentum Sheet on Over Odds', extra={'minOdds': min_odds, 'maxOdds': max_odds, **log_extras})
                temp_odds_table = odds_table[(odds_table['under_odds'] >= min_odds) & (odds_table['under_odds'] <= max_odds)]
                if len(temp_odds_table) > 0:
                    odds_table = temp_odds_table
                else:
                    log.error('Error Filtering Momentum Sheet on Under Odds', extra={'minOdds': min_odds, 'maxOdds': max_odds, **log_extras})

            if len(odds_table) > 0:
                odds_table = odds_table[columns]

            if len(odds_table) > 0:
                # round all floats to 2
                for column in odds_table.columns:
                    if odds_table[column].dtype == 'float64':
                        odds_table[column] = odds_table[column].round(2)

                #merge the two tables left on Player Name & Prop, right on player_name & prop
                momentum_sheet_with_odds = pd.merge(momentum_sheet, odds_table, how='inner', left_on=['Sport', 'Player Name', 'Prop'], right_on=['tournament', 'player_name', 'prop'])

                if len(momentum_sheet_with_odds) > 0:
                    #drop where over_odds is null
                    momentum_sheet_with_odds = momentum_sheet_with_odds[momentum_sheet_with_odds['over_odds'].notnull()]
                else:
                    # could be "best" or book, need both over_line and under_line as well as line
                    momentum_sheet_with_odds = momentum_sheet
                    momentum_sheet['over_line'] = momentum_sheet['DraftKings Line']
                    momentum_sheet['over_odds'] = momentum_sheet['DraftKings Over ML']
                    momentum_sheet['under_line'] = momentum_sheet['DraftKings Line']
                    momentum_sheet['under_odds'] = momentum_sheet['DraftKings Under ML']
                    momentum_sheet['line'] = momentum_sheet['DraftKings Line']

                if "home run" in prop.lower() or "rushing and receiving touchdowns" in prop.lower():
                    if team_one and len(momentum_sheet_with_odds) > 0:
                        momentum_sheet_with_odds = momentum_sheet_with_odds[momentum_sheet_with_odds['game'].str.lower().str.contains(team_one.lower())]
                    if len(momentum_sheet_with_odds) == 0:
                        log.error('Error Filtering Momentum Sheet on Team One', extra={'teamOne': team_one, **log_extras})
                    if team_two and len(momentum_sheet_with_odds) > 0:
                        momentum_sheet_with_odds = momentum_sheet_with_odds[momentum_sheet_with_odds['game'].str.lower().str.contains(team_two.lower())]
                    if len(momentum_sheet_with_odds) == 0:
                        log.error('Error Filtering Momentum Sheet on Team Two', extra={'teamTwo': team_two, **log_extras})
                else:
                    if team_one and len(momentum_sheet_with_odds) > 0:
                        momentum_sheet_with_odds = momentum_sheet_with_odds[
                            momentum_sheet_with_odds['Team'].str.lower().str.contains(team_one.lower()) |
                            momentum_sheet_with_odds['Opponent'].str.lower().str.contains(team_one.lower())
                        ]
                    if len(momentum_sheet_with_odds) == 0:
                        log.error('Error Filtering Momentum Sheet on Team One', extra={'teamOne': team_one, **log_extras})

                    if team_two and len(momentum_sheet_with_odds) > 0:
                        momentum_sheet_with_odds = momentum_sheet_with_odds[
                            momentum_sheet_with_odds['Team'].str.lower().str.contains(team_two.lower()) |
                            momentum_sheet_with_odds['Opponent'].str.lower().str.contains(team_two.lower())
                        ]

                    if len(momentum_sheet_with_odds) == 0:
                        log.error('Error Filtering Momentum Sheet on Team Two', extra={'teamTwo': team_two, **log_extras})

                if len(momentum_sheet_with_odds) > 0:
                    #drop tournament, player_name, prop
                    try:
                        momentum_sheet_with_odds = momentum_sheet_with_odds.drop(columns=['tournament', 'player_name', 'prop'])
                    except:
                        pass

                    #convert time to string
                    momentum_sheet_with_odds['Time'] = pd.to_datetime(momentum_sheet_with_odds['Time'], errors='coerce')
                    momentum_sheet_with_odds['Time'] = momentum_sheet_with_odds['Time'].dt.strftime('%Y-%m-%d %H:%M:%S')

                try:
                    #drop where over_line is null
                    if book_name == "Best" and "home run" not in prop.lower() and "rushing and receiving touchdowns" not in prop.lower():
                        momentum_sheet_with_odds = momentum_sheet_with_odds[momentum_sheet_with_odds['over_line'].notnull()]
                    else:
                        momentum_sheet_with_odds = momentum_sheet_with_odds[momentum_sheet_with_odds['line'].notnull()]
                except Exception as e:
                    log.error('Error Filtering Momentum Sheet', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras})

                momentum_sheet = momentum_sheet_with_odds

            if not "home run" in prop.lower() and not "rushing and receiving touchdowns" in prop.lower():
                # Drop additional columns and rename as specified
                columns_to_drop_2 = [
                    'Weighted Average', 'FanDuel Line', 'FanDuel Pick Implied Odds Difference',
                    'DraftKings Pick Implied Odds Difference', 'FanDuel Pick',
                    "Projected Over Implied Odds (DraftKings)", "Projected Under Implied Odds (DraftKings)",
                    "Projected Over Implied Odds (FanDuel)", "Projected Under Implied Odds (FanDuel)"
                ]
                try:
                    momentum_sheet = momentum_sheet.drop(columns=columns_to_drop_2)
                except:
                    pass
                try:
                    momentum_sheet = momentum_sheet.rename(columns={
                        'Projection': 'Pine Sports AI-Powered Projection',
                        'DraftKings Pick': 'Pine Sports AI-Powered Pick',
                        'DraftKings Over ML': 'Over Moneyline',
                        'DraftKings Under ML': 'Under Moneyline'
                    })
                except:
                    pass

                momentum_sheet['Book Projection'] = momentum_sheet[['DraftKings Projection', 'FanDuel Projection']].mean(axis=1)

                def get_pick(data):
                    projection = data[0]
                    book_projection = data[1]
                    if projection > book_projection:
                        return "Over"
                    else:
                        return "Under"

                momentum_sheet['Pine Sports AI-Powered Pick'] = momentum_sheet[['Pine Sports AI-Powered Projection', 'Book Projection']].apply(get_pick, axis=1)

                def get_category(data):
                    pick = data[0]
                    last_ten_hit = data[1]
                    line = data[2]
                    projection = data[3]

                    projection_minus_line = projection - line

                    if pick == "Over" and last_ten_hit >= 70 and projection_minus_line > 0:
                        category = 1
                    elif pick == "Over" and last_ten_hit >= 40 and projection_minus_line > 0:
                        category = 2
                    elif pick == "Over":
                        category = 3
                    elif pick == "Under" and last_ten_hit <= 30 and projection_minus_line < 0:
                        category = 3
                    elif pick == "Under" and last_ten_hit <= 60 and projection_minus_line < 0:
                        category = 2
                    else:
                        category = 1

                    return category


                if book_name == "Best":
                    #TODO - get line, drop over_line, under_line, drop odds and link that doesn't align with pick
                    #TODO - make sure projection is greater than line for over picks and less than for under picks for category 1
                    momentum_sheet["line"] = momentum_sheet[['over_line', 'under_line', 'Pine Sports AI-Powered Pick']].apply(lambda x: x[0] if x[2] == "Over" else x[1], axis=1)

                momentum_sheet['category'] = momentum_sheet[['Pine Sports AI-Powered Pick', 'L10 Hit %', 'line', 'Pine Sports AI-Powered Projection']].apply(get_category, axis=1)

                if player_name == None:
                    #only keep where line = DraftKings Line (this is what hit % is based off of, so we need to make sure it's consistent)
                    momentum_sheet = momentum_sheet[momentum_sheet['DraftKings Line'] == momentum_sheet['line']]

                if book_name == "Best":
                    #drop line
                    try:
                        momentum_sheet = momentum_sheet.drop(columns=['line'])
                    except:
                        pass
                #momentum_sheet['abs_projection_difference'] = abs((momentum_sheet['Pine Sports AI-Powered Projection'] - momentum_sheet['Book Projection'])/momentum_sheet['Pine Sports AI-Powered Projection'])
                momentum_sheet['abs_projection_difference'] = abs(momentum_sheet['Pine Sports AI-Powered Projection'] - momentum_sheet['Book Projection'])

                # sort by category, lowest to highest, then abs_projection_difference highest to lowest
                momentum_sheet = momentum_sheet.sort_values(by=['category', 'abs_projection_difference'], ascending=[True, False])

                try:
                    momentum_sheet = momentum_sheet.drop(columns=['DraftKings Line', 'Over Moneyline', 'Under Moneyline', 'DraftKings Projection', 'FanDuel Projection', 'Book Projection', 'abs_projection_difference', 'category'])
                except:
                    pass
            else:

                #sort by projection highest to lowest
                momentum_sheet = momentum_sheet.sort_values(by='Projection', ascending=False)

            #if is_general drop where Prop is the following: Batting - 1st Base, Batting - 2nd Base, Batting - 3rd Base, Batting - RBIs, Batting - Stolen Bases, Steals & Blocks, Steals, Blocks
            if is_general:
                momentum_sheet = momentum_sheet[~momentum_sheet['Prop'].str.contains('Batting - 1st Base|Batting - 2nd Base|Batting - 3rd Base|Batting - RBIs|Batting - Stolen Bases|Steals & Blocks|Steals|Blocks')]

            #drop duplicates on Player Name, Prop
            momentum_sheet = momentum_sheet.drop_duplicates(subset=['Player Name', 'Prop'])

            if hit_type:
                if hit_count:
                    column = f"L{hit_count} Hit %"
                else:
                    column = "L10 Hit %"
                if hit_type.lower() == "over":
                    #sort by column highest to lowest
                    momentum_sheet = momentum_sheet.sort_values(by=column, ascending=False)
                elif hit_type.lower() == "under":
                    #sort by column lowest to highest
                    momentum_sheet = momentum_sheet.sort_values(by=column, ascending=True)

            try:
                if not hit_type:
                    #Get the top MAX_RESULTS, get a mix of overs and unders
                    overs = momentum_sheet[momentum_sheet['Pine Sports AI-Powered Pick'] == "Over"]
                    unders = momentum_sheet[momentum_sheet['Pine Sports AI-Powered Pick'] == "Under"]

                    under_results = int(MAX_RESULTS/2)
                    over_results = MAX_RESULTS - under_results

                    top_overs = overs.head(over_results)
                    top_unders = unders.head(under_results)
                    momentum_sheet = pd.concat([top_overs, top_unders])
                else:
                    #This is already sorted by hit_type, just get max_results
                    momentum_sheet = momentum_sheet.head(MAX_RESULTS)
            except:
                try:
                    if "rushing and receiving touchdowns" in prop.lower() or"home run" in prop.lower():
                        #sort by Over Count, highest to lowest
                        momentum_sheet = momentum_sheet.sort_values(by='Over Count', ascending=False)
                except:
                    pass
                momentum_sheet = momentum_sheet.head(MAX_RESULTS)
            #if league is mlb, drop Opponent DVP
            if league.lower() == "mlb" and "home run" not in prop.lower():
                try:
                    momentum_sheet = momentum_sheet.drop(columns=['Opponent DVP'])
                except:
                    pass

            elif "home run" in prop.lower() or "rushing and receiving touchdowns" in prop.lower():
                try:
                    momentum_sheet = momentum_sheet.drop(columns=['Line', 'Draftkings Moneyline', 'Draftkings Implied Odds', 'Projection', 'Projected ML', 'Projection Difference'])
                except:
                    pass

            momentum_sheet_final = pd.DataFrame(columns=['date', 'string'])

            #momentum_sheet_string = momentum_sheet.to_string(index=False)}

            momentum_sheet_string = ""
            for i, row in momentum_sheet.iterrows():
                for column in momentum_sheet.columns:
                    #remove na columns and standard deviation columns
                    if not pd.isna(row[column]) and not "Std" in column:
                        momentum_sheet_string += f"{column}: {row[column]}\n"
                momentum_sheet_string += "\n\n"
            momentum_sheet_final = momentum_sheet_final.append({"date": date, "string": momentum_sheet_string}, ignore_index=True)

            return momentum_sheet_final

        momentum_sheet_final = await asyncio.to_thread(
            process_momentum_sheet, momentum_sheet, team_names, team_one, team_two, player_name, prop, hit_type, hit_count
        )

        t3 = time.time()
        process_time = t3 - t2

        try:
            momentum_sheet_final['date'] = pd.to_datetime(momentum_sheet_final['date'], errors='coerce')
            momentum_sheet_final['date'] = momentum_sheet_final['date'].dt.strftime('%Y-%m-%d')
            momentum_sheet_final['date'] = pd.to_datetime(momentum_sheet_final['date'], errors='coerce')
        except:
            pass

        if not momentum_sheet_final.empty:
            momentum_sheet_final['tool_used'] = "get_player_prop_information"
        else:
            momentum_sheet_final = pd.DataFrame(columns=['date', 'string', 'tool_used'])
            momentum_sheet_final = pd.concat([momentum_sheet_final, pd.DataFrame([{"date": datetime.now().strftime('%Y-%m-%d'), "string": f"No player props found that match the following request: get_player_prop_information(league={league}, team_one={team_one}, team_two={team_two}, player_name={player_name}, prop={prop}, is_general={is_general}, book_name={book_name}, min_odds={min_odds}, max_odds={max_odds})", "tool_used": "get_player_prop_information"}])])

    except Exception as e:
        print(traceback.format_exc())
        log.error('ToolError', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras})
        momentum_sheet_final = pd.DataFrame(columns=['date', 'string', 'tool_used'])
        momentum_sheet_final = pd.concat([momentum_sheet_final, pd.DataFrame([{"date": datetime.now().strftime('%Y-%m-%d'), "string": f"No player props found that match the following request: get_player_prop_information(league={league}, team_one={team_one}, team_two={team_two}, player_name={player_name}, prop={prop}, is_general={is_general}, book_name={book_name}, min_odds={min_odds}, max_odds={max_odds})", "tool_used": "get_player_prop_information"}])])

    end_time = time.time()
    #in case it errors out before some of these are assigned
    if t3: finish = end_time - t3
    elif t2: finish = end_time - t2
    elif t1: finish = end_time - t1
    else: finish = end_time - start_time
    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'league': league,
        'team_one': team_one,
        'team_two': team_two,
        'player_name': player_name,
        'prop': prop,
        'general': is_general,
        'book_name': book_name,
        'min_odds': min_odds,
        'max_odds': max_odds,
        'runtime': time.time() - start_time,
        'full_runtime': {
            'getMomentumSheet': momentum_time,
            'getTeams': team_time,
            'processMomentumSheet': process_time,
            'finish': finish,
        }
    })
    return momentum_sheet_final, [] #no models used

# momentum_sheet_final, models_used_array = asyncio.run(
#     get_player_prop_information(
#         #is_general=True,
#         league="nfl",
#         #player_name="George Kittle",
#         prop="Player - Offense - Rushing and Receiving Touchdowns",
#         #hit_type="over",
#         #hit_count=5,
#         #team_one="Winnipeg Jets",
#         #team_two="San Jose Sharks",
#         #book_name="DraftKings"
#         #is_general=True
#     )
# )
#
# print(momentum_sheet_final['string'].values[0])