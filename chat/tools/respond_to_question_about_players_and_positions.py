from datetime import datetime
from pytz import timezone
import time
import asyncio
import pandas as pd
import traceback
import aioboto3
import pickle
from .helpers import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_STORAGE_BUCKET_NAME
from .helpers import get_open_ai_query


import logging
log = logging.getLogger('json')

async def respond_to_question_about_players_and_positions(league, question, last_season=False, log_extras={}, **kwargs):
    start_time = time.time()
    df_time, process_time, query_time, answer_time, retry_time, finish = 0, 0, 0, 0, 0, 0
    t1, t2, t3, t4, t5 = None, None, None, None, None

    models_used_array = []
    #check if last_season is a string (it should be a boolean) if it is a string, switch to boolean
    if isinstance(last_season, str):
        if last_season.lower() == "true": last_season = True
        else: last_season = False

    async def load_dataframe(league, last_season):
        if last_season:
            s3_line_csv_file_path = f'datafiles/{league.upper()}_-_Player_Stats_Last_Season.pkl'
        else:
            s3_line_csv_file_path = f'datafiles/{league.upper()}_-_Player_Stats.pkl'
        try:
            async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
                response = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_line_csv_file_path)
                body = await response['Body'].read()
        except Exception as e:
            log.error('Error in S3 operations', extra={'error': repr(e), **log_extras,})
            raise

        try:
            df = await asyncio.to_thread(pickle.loads, body)
        except Exception as e:
            log.error('Error during deserialization', extra={'error': repr(e), **log_extras,})
            raise

        return df

    try:
        df = await load_dataframe(league, last_season)
    except Exception as e:
        log.error('Error in load_dataframe', extra={'error': repr(e), **log_extras,})
        raise
    t1 = time.time()
    df_time = t1 - start_time

    try:
        def process_data(df, league):
            # Convert date to datetime
            df['Date'] = pd.to_datetime(df['Date'], errors='coerce')

            # Sort by date oldest to newest
            df = df.sort_values('Date')

            # Drop where Player Name is null
            df = df.dropna(subset=['Player Name'])

            if league.upper() == 'MLB':
                # Season Year is Season converted to string
                df['Season Year'] = df['Season'].astype(str)
            if league.upper() == 'NBA':
                df["Player - Position"] = df["Player - Position 1"]
                # Drop Player - Position 1 and Player - Position 2
                df = df.drop(columns=['Player - Position 1', 'Player - Position 2'])

            opponents = df['Opponent'].unique()
            player_names = df['Player Name'].unique()

            opponents_string = ', '.join(opponents)
            player_names_string = ', '.join(player_names)

            columns_string = ", ".join(df.columns)

            game_types = df['Game Type'].unique()
            game_types_string = ', '.join(game_types)

            positions = df['Player - Position'].unique()
            positions_string = ', '.join(positions)

            sport_specific_string = ""
            if league.upper() == 'NBA' or league.upper() == 'NFL':
                starter_types = df['Player - Starter'].unique()
                starter_types_string = ', '.join(starter_types)
                sport_specific_string = f"Here are the options for Starter Type: {starter_types_string}"
            elif league.upper() == 'MLB':
                batting_hand_types = df['Player - Batting - Batting Hand'].unique()
                batting_hand_types_string = ', '.join(batting_hand_types)
                sport_specific_string = f"Here are the options for Batting Hand: {batting_hand_types_string}"

                pitching_hand_types = df['Player - Pitching - Pitching Hand'].unique()
                pitching_hand_types_string = ', '.join(pitching_hand_types)
                sport_specific_string += f"\nHere are the options for Pitching Hand: {pitching_hand_types_string}"

                starting_pitcher_types = df['Player - Pitching - Starting Pitcher'].unique().astype(str)
                starting_pitcher_types_string = ', '.join(starting_pitcher_types)
                sport_specific_string += f"\nHere are the options for Starting Pitcher Type: {starting_pitcher_types_string}"

            return (df, opponents_string, player_names_string, columns_string,
                    game_types_string, positions_string, sport_specific_string)

        try:
            df, opponents_string, player_names_string, columns_string, game_types_string, positions_string, sport_specific_string = await asyncio.to_thread(process_data, df, league)
        except:
            log.error('Error processing data', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras})
        t2 = time.time()
        process_time = t2 - t1

        answer_string = "When Josh Hart is injured, Jalen Brunson averages {average_points:.2f} points, {average_assists:.2f} assists, and {average_rebounds:.2f} rebounds per game. This was calculated by identifying the games where Jalen Brunson and Josh Hart were on the same team, and where Jalen Brunson played without Josh Hart and averaging his performance metrics in those games."
        points_string = "{df['Points'].mean()}"
        season_year_string = "{min(last_two_seasons)}-{max(last_two_seasons)}"
        average_string = "{avg_rushing_yards:.2f}"
        length_string = "{len(df_qbs)}"


        prompt = f"""You are a world class python programmer and I will be giving you access to a Pandas DataFrame (called df) to answer this question. Please make sure your code includes:
        answer: a string that contains a detailed answer to the question
        df_final: a DataFrame that contains the data you used to get the answer (only keep the relevant columns of the DataFrame, not the entire DataFrame, but make sure to include columns that are both relevant to the question asked an helpful in understanding more about the data -- e.g., YOU MUST ALWAYS INCLUDE Season Year, Date, Team, Opponent, Home-Visitor)
        
        If you are asked about a player use the player's full name, import difflib and use difflib to find the first closest match.
        Here's a list of teams: {opponents_string}.
        Here's a list of columns in the DataFrame: {columns_string}
    
        Notes on some of the columns:
        Season Year is an integer that represents the season year. If asked for this season, you can use the max of this column.
        Season is a string and can be something like 2023-2024. It is likely best to use season year, e.g., last two season could be the max of the season year column and the max of the season year column minus 1.
        Home-Visitor will either be 'Home' or 'Visitor'
        Winner will either be 'Win' or 'Loss'
        Winner Against The Spread will either be 'Win' or 'Loss' or 'Push'
        IMPORTANT NOTE ABOUT SPREAD: SINCE THIS IS NORMALIZED BY PLAYERS AND TEAMS, IF A TEAM OR PLAYER IS FAVORED, THE SPREAD WILL BE POSITIVE.  IF A TEAM OR PLAYER IS THE UNDERDOG, THE SPREAD WILL BE NEGATIVE.  AS NOTED BELOW, THIS CAN BE COMPARED DIRECTLY TO THE FINAL SCORE SPREAD.
        IMPORTANT NOTE ABOUT SPREAD: SINCE THE SPREADS ARE NORMALIZED YOU MAY HAVE TO REVERSE THE SPREAD THAT IS BEING ASKED IN A QUESTION.  FOR EXAMPLE, IF SOMEONE ASKS "What is Lamar Jackson's average pass attempts when coming into a game with a spread of -7 or better?" LET'S ASSUME THAT THE USER WANTS TO KNOW WHEN LAMAR JACKSON IS THE UNDERDOG.  YOU WOULD NEED TO FILTER FOR GAMES WHERE LAMAR JACKSON'S TEAM IS THE FAVORITE, SO YOU WOULD FILTER FOR GAMES WHERE THE SPREAD IS 7 OR HIGHER.  YOU WOULD NEED TO FLIP THE SPREAD.
        Final Score Spread is the difference in score between the player's team and opponent. So if the player's team scored 10 points and the opponent scored 5, the final score spread would be 5. This can be compared directly with the spread. If the spread was 3, the player's team would have covered the spread. If the spread was 7, the player's team would not have covered the spread.
        Over-Under result will be either 'Over' or 'Under' or 'Push'
        Date is a datetime object.
        Here are the options for Game Type: {game_types_string}
        Here are the options for Player - Position: {positions_string}
        {sport_specific_string}
    
        Notes on common requests:
        If you are asked for how a player does on the road, you can filter for 'Visitor' in the Home-Visitor column. Then you can provide an average of the player's stats. You could also see how that compares to the player's average at home, and overall.
        If you are asked how a player is doing in the playoffs, you can filter for 'Playoff' in the Game Type column. You can also filter for the most recent season by getting the max of the Season Year column. Then you can provide an average of the player's stats. You could also see how that compares to the player's average in the regular season.
        If you are asked for defense vs position (or DvP) for a player and a team, (1) get the player's position; (2) get the average score for players in that position vs the team in question; (3) get the average score for players in that position vs all teams; (4) divide the average score for players in that position vs the team in question by the average score for players in that position vs all teams; (5) multiply by 100 to get a percentage.
        If you are asked how a player does when another player is injured, you can get the game ids for the player in question and the game ids for the injured player . The games where the player is playing and the injured player is out will be the ones where the game ids appear in the player's games but not the injured players. You must also make sure you are only comparing games where both players are on the same team. Once you get the game ids where the player is playing and the injured player is not. Then you can provide an average of the player's stats. You could also see how that compares to the player's average when the injured player is in the game. 
        If you are asked for a table, you must actually provide the table in the string response. You can use the to_string method on the DataFrame to get a string representation of the DataFrame. You can then include this string in the answer.
        
        Here's an example of how to get the correct dataframe for games where Jalen Brunson played when Josh Hart was injured:
    
        #get games where jalen brunson is playing
        df_jalen_brunson = df[df['Player Name'] == 'Jalen Brunson']
        if (len(df_jalen_brunson) == 0):
            answer = "I'm sorry, I can't find games for Jalen Brunson."
            df_final = pd.DataFrame()
        else:
            #get jalen brunson's team (last team he played for)
            jalen_team = df_jalen_brunson['Team'].values[-1]
            #get only games where jalen is playing for most recent team
            df_jalen_brunson = df_jalen_brunson[df_jalen_brunson['Team'] == jalen_team]
    
            #get games where Josh Hart is playing
            df_julius_randle = df[df['Player Name'] == 'Josh Hart']
            if len(df_julius_randle) == 0:
                answer = "I'm sorry, I can't find games for Josh Hart."
                df_final = pd.DataFrame()
            else:
                #get only games where julius is playing for most recent team
                df_julius_randle = df_julius_randle[df_julius_randle['Team'] == jalen_team]
                if len(df_julius_randle) == 0:
                    answer = "I'm sorry, I can't find games for Josh Hart on the same team as Jalen Brunson."
                    df_final = pd.DataFrame()
                else:
                    #get first game id for julius
                    julius_first_game_id = df_julius_randle['Game ID'].values[0]
                    #limit jalen to games >= julius first game id
                    df_jalen_brunson = df_jalen_brunson[df_jalen_brunson['Game ID'] >= julius_first_game_id]
                    #get unique game ids for jalen
                    jalen_game_ids = df_jalen_brunson['Game ID'].unique()
                    #get unique game ids for julius
                    julius_game_ids = df_julius_randle['Game ID'].unique()
                    #get game ids for jalen without julius
                    game_ids_without_julius = [game_id for game_id in jalen_game_ids if game_id not in julius_game_ids]
                    #get df for jalen without julius
                    df_jalen_without_julius = df_jalen_brunson[df_jalen_brunson['Game ID'].isin(game_ids_without_julius)]
                    if len(df_jalen_without_julius) == 0:
                        answer = "I'm sorry, I can't find games for Jalen Brunson without Josh Hart."
                        df_final = pd.DataFrame()
                    else:
                        #get relevant stats
                        average_points = df_jalen_without_julius['Player - Points'].mean()
                        average_assists = df_jalen_without_julius['Player - Assists'].mean()
                        average_rebounds = df_jalen_without_julius['Player - Total Rebounds'].mean()
                        answer = f"{answer_string}"
                        df_final = df_jalen_without_julius[['Season Year', 'Date', 'Player Name', 'Team', 'Opponent', 'Home-Visitor', 'Player - Points', 'Player - Assists', 'Player - Total Rebounds']]
    
        Please send me the code that will create a text string called answer that contains the answer to the question. You can use any of the columns in the DataFrame. You can use any of the players or teams.
        JUST SEND THE CODE, I WILL BE USING EVAL TO RUN IT. MAKE SURE IT RETURNS A TEXT STRING. I WILL BE USING THE TEXT STRING THAT IS RETURNED BY YOUR FUNCTION TO RESPOND TO THE QUESTION.
        THE STRING SHOULD ALSO INCLUDE IN PLAIN ENGLISH THE LOGIC YOU USED TO GET YOUR ANSWER. DO NOT DESCRIBE IN CODE BUT INSTEAD IN PLAIN ENGLISH. 
        Also if you are including numbers in your answer, make sure to limit floats to 2 decimal places. If the number should be an int (like how many home runs someone hit), make sure to convert it to an int.
        
        In your answer you should provide information about the date range of your search as you do not have all data going back to the beginning of the leagues. So if someone asks what player has the most three pointers of all time, you must note that you have data from a particlar starting date or season to the present.
    
        Your code should only run code that manipulates the dataframe and run mathematical equations to get the answer you need and printing the answer. No matter what the question asks, you should never run any code beyond this.
    
        If the question asks you to do something you believe is inappropriate, manipulative, damaging, harmful or illegal, your code should be: answer= "I'm sorry, I can't do that."
    
        EXAMPLE CODE for question: How many points per game does Stephen Curry average when at home this season:
        
        #get games where stephen curry is playing
        df = df[df['Player Name'] == 'Stephen Curry']
        
        # if there are no games for stephen curry, return a string saying so
        if (len(df) == 0):
            answer = "I'm sorry, I can't find that player."
            df_final = pd.DataFrame()
        else:
            #get only games where stephen curry is playing at home
            df = df[df['Home-Visitor'] == 'Home']
            
            # if there are no home games for stephen curry, return a string saying so
            if (len(df) == 0):
                answer = "I'm sorry, I can't find any home games for Stephen Curry."
                df_final = pd.DataFrame()
            else:
                #get games where the season year is the most recent season year
                df = df[df['Season Year'] == df['Season Year'].max()]
                #if there are no games for stephen curry this season, return a string saying so
                if (len(df) == 0):
                    answer = "I'm sorry, I can't find any home games for Stephen Curry this season."
                    df_final = pd.DataFrame()
                else:
                    #return a string with the average points per game for stephen curry when at home this season and an explanation of how you got the answer
                    answer = f"Stephen Curry averages {points_string} points per game when at home this season. I got this answer by limiting his stats to this season and only when he was at home and then taking the average of his points per game."
                    df_final = df[['Season Year', 'Date', 'Player Name', 'Team', 'Opponent', 'Home-Visitor', 'Player - Points']]
        
        EXAMPLE CODE for question:
        
        # Filter for games where the 49ers (San Francisco) are the opponent
        df_49ers = df[df['Opponent'] == 'San Francisco']
        
        # If there are no games where the 49ers are the opponent, return a string saying so
        if len(df_49ers) == 0:
            answer = "I'm sorry, I can't find any games where the 49ers were the opponent."
            df_final = pd.DataFrame()
        else:
            # Filter for the last two seasons by getting the max season year and the one before it
            max_season_year = df_49ers['Season Year'].max()
            last_two_seasons = [max_season_year, max_season_year - 1]
            df_49ers_last_two_seasons = df_49ers[df_49ers['Season Year'].isin(last_two_seasons)]
        
            # If there are no games in the last two seasons, return a string saying so
            if len(df_49ers_last_two_seasons) == 0:
                answer = "I'm sorry, I can't find any games for the 49ers in the last two seasons."
                df_final = pd.DataFrame()
            else:
                # Filter for quarterbacks (Player - Position == 'QB')
                df_qbs = df_49ers_last_two_seasons[df_49ers_last_two_seasons['Player - Position'] == 'QB']
        
                # If there are no quarterbacks, return a string saying so
                if len(df_qbs) == 0:
                    answer = "I'm sorry, I can't find any quarterbacks who played against the 49ers in the last two seasons."
                    df_final = pd.DataFrame()
                else:
                    # Calculate the average rushing yards for quarterbacks
                    avg_rushing_yards = df_qbs['Player - Offense - Rushing - Yards'].mean()
        
                    # If there are no rushing yards data, return a string saying so
                    if pd.isna(avg_rushing_yards):
                        answer = "I'm sorry, I can't find any rushing yards data for quarterbacks against the 49ers in the last two seasons."
                        df_final = pd.DataFrame()
                    else:
                        # Create the final dataframe with relevant columns
                        df_final = df_qbs[['Season Year', 'Date', 'Team', 'Opponent', 'Home-Visitor', 'Player Name', 'Player - Offense - Rushing - Yards']]
        
                        # Create the answer string with detailed explanation
                        answer = (f"Over the last two seasons ({season_year_string}), "
                                  f"the San Francisco 49ers have given up an average of {average_string} rushing yards per game to quarterbacks. "
                                  f"This was calculated using data from {length_string} games where quarterbacks played against the 49ers.")
        
        Note in the above examples, I accounted for the possibility that there may not be relevant data. This will provide an answer no matter what the data is. You should do the same in your code.
        Make your answer as detailed as possible. Include as much as you can in your answer. When getting an average, it is important to explain how many games you used for the average. When someone asks for the best player for x, you can also note the top 3 or 5 to give context. The more context the better.
        
        DO NOT ASSUME dtypes of columns.  If you need to convert a column to a datetime, do so.  If you need to convert a column to a float, do so.  If you need to convert a column to an int, do so.  If you need to convert a column to a string, do so.  DO NOT ASSUME THE DATA TYPES OF COLUMNS.  ALWAYS CONVERT TO THE CORRECT DATA TYPE.
            
        Make sure your code has robust error handling so it does not break.  ROBUST ERROR HANDLING IS CRITICAL.
        
        MAKE SURE YOU COMMENT EACH LINE OF CODE WITH A DETAILED EXPLANATION OF WHAT THE CODE DOES AND WHY YOU ARE DOING IT.  THIS IS CRITICAL.
        
        Remember, when filtering by team names and/or players, you MUST USE THE NAMES EXACTLY AS THEY ARE SPELLED/DISPLAYED ABOVE!  DO NOT FORGET THIS OR YOU WILL BE PROVIDING THE WRONG DATA!!!
        Also remember, your code MUST contain the following:
            answer: a string that contains a detailed answer to the question
            df_final: a DataFrame that contains the data you used to get the answer (only keep the relevant columns of the DataFrame, not the entire DataFrame, but make sure to include columns that are both relevant to the question asked an helpful in understanding more about the data -- e.g., YOU MUST ALWAYS INCLUDE Season Year, Date, Team, Opponent, Home-Visitor)
        
        START QUESTION YOU MUST RESPOND TO: {question} END QUESTION YOU MUST RESPOND TO. 
        
        Remember the instructions above and create code that will provide a detailed answer to the question.
        
        --------------------------------
        JUST SEND THE CODE, NOTHING ELSE, JUST START WITH THE CODE. I WILL BE DIRECTLY EXECUTING WHAT YOU SEND. I WILL GET AN ERROR IF YOU SEND ANYTHING OTHER THAN THE CODE."""

        model_name = "anthropic.claude-3-5-sonnet-20241022-v2:0"
        #model_name = "chatgpt-4o-latest"

        response_json = await get_open_ai_query(model_name, prompt, log_extras=log_extras)
        code = response_json['text']
        t3 = time.time()
        query_time = t3 - t2

        log.info('respondToQuestionAboutPlayersAndPositions-QuestionAndCode', extra={'question': question, 'code': code, 'model_used': response_json['model'], **log_extras})

        model_used_json = {
            "model": response_json['model'],
            "input_tokens": response_json['input_tokens'],
            "output_tokens": response_json['output_tokens'],
            "cached_tokens": response_json['cached_tokens'],
        }
        models_used_array.append(model_used_json)

        def process_code_and_execute(code, df):
            code = code.replace("```python", "").replace("```", "").strip()
            code = code.replace('\n\n', '\n')
            answer = None

            try:
                context_vars = globals().copy()  # or locals().copy() if this code is inside a function
                context_vars.update(locals())
                exec(code, context_vars, context_vars)
                answer = context_vars['answer']
                df_final = context_vars['df_final']

            except Exception as e:
                log.error('Error processing openai query', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras})
                answer = "I'm sorry, something went wrong. Please try again."
                df_final = pd.DataFrame()

            return answer, df_final

        answer, df_final = await asyncio.to_thread(process_code_and_execute, code, df)
        t4 = time.time()
        answer_time = t4 - t3
        t5 = None
        if "I'm sorry" in answer:
            model_name = "gpt-4o-2024-11-20"
            response_json = await get_open_ai_query(model_name, prompt, log_extras=log_extras)
            code = response_json['text']

            model_used_json = {
                "model": response_json['model'],
                "input_tokens": response_json['input_tokens'],
                "output_tokens": response_json['output_tokens'],
                "cached_tokens": response_json['cached_tokens'],
            }
            models_used_array.append(model_used_json)

            answer, df_final = await asyncio.to_thread(process_code_and_execute, code, df)
            #if we retry -> include both attempts in answer time
            t5 = time.time()
            retry_time = t5 - t4

        if len(df_final) > 100: df_final = pd.DataFrame()

        #dataframe with columns date and string
        response_df = pd.DataFrame(columns=['date', 'string'])
        response_df = pd.concat([response_df, pd.DataFrame({"date": datetime.now(timezone('US/Eastern')), "string": answer}, index=[0])])

        #Removing df_final from the response_df, this does not seem necessary, confuses the LLM and costs extra
        #response_df = pd.concat([response_df, pd.DataFrame({"date": today, "string": df_final.to_string(index=False)}, index=[0])])

        response_df['date'] = response_df['date'].dt.strftime('%Y-%m-%d')
        response_df['date'] = pd.to_datetime(response_df['date'], errors='coerce')

        response_df['tool_used'] = "respond_to_question_about_players_and_positions"

    except:
        response_df = pd.DataFrame(columns=['date', 'string'])
        response_df = pd.concat([response_df, pd.DataFrame({"date": datetime.now(timezone('US/Eastern')), "string": "I'm sorry, something went wrong. Please try again."}, index=[0])])
        response_df['date'] = response_df['date'].dt.strftime('%Y-%m-%d')
        response_df['date'] = pd.to_datetime(response_df['date'], errors='coerce')
        response_df['tool_used'] = "respond_to_question_about_players_and_positions"

    end_time = time.time()
    #in case it errors out before some of these are assigned
    if t5: finish = end_time - t5
    elif t4: finish = end_time - t4
    elif t3: finish = end_time - t3
    elif t2: finish = end_time - t2
    elif t1: finish = end_time - t1
    else: finish = end_time - start_time
    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': models_used_array,
        'league': league,
        'question': question,
        'last_season': last_season,
        'runtime': end_time - start_time,
        'full_runtime': {
            'loadDataFrame': df_time,
            'processData': process_time,
            'openAiQuery': query_time,
            'processAnswer': answer_time,
            'retryAnswer': retry_time,
            'finish': finish,
        }
    })
    return response_df, models_used_array

#print(f"Start time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
#response_df, models_used_array = asyncio.run(respond_to_question_about_players_and_positions('nba', 'How does LeBron James do this season on the road against east coast teams. Please send me his average points per game, rebounds per game, and assists per game on the road against east coast teams, and compare these against his season averages.', True))
#response_df, model_used_array = asyncio.run(respond_to_question_about_players_and_positions("nfl", "How many rushing yards on average do the 49ers give up to quarterbacks over the last 2 years?", last_season=False))
# response_df, model_used_array = asyncio.run(respond_to_question_about_players_and_positions("nfl", "Please provide a table of all running backs who have played against the Minnesota Vikings this season, including player name, team, week, rushing yards, and receiving yards.", last_season=False))
#response_df, model_used_array = asyncio.run(respond_to_question_about_players_and_positions("mlb", "Please provide the hottest hitters over the last 7 days with their batting average, OPS, ISO, wOBA, and barrel percentage in a table format."))
# for i, row in response_df.iterrows():
#     print(row['string'])
#
# print(model_used_array)
#
# print(f"End time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")