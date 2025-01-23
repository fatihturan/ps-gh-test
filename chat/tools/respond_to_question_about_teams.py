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

async def respond_to_question_about_teams(league, question, last_season=False, log_extras={}, **kwargs):
    start_time = time.time()
    #check if last_season is a string (it should be a boolean) if it is a string, switch to boolean
    if isinstance(last_season, str):
        if last_season.lower() == "true": last_season = True
        else: last_season = False

    models_used_array = []

    try:
        prompt = f"""You were asked the following question: {question}.  We will be sending this to our data scientist to get the answer.  Please re-write a robust question for the data scientist to use to answer the question.  
        
        For example if the question is: "How do the Knicks do against the spread in the playoffs this season when they are favored by 3+."
        You can rewrite teh question as follows: "How do the New York Knicks do against the spread in the playoffs this season when they are favored by 3 or more points?  Make sure to filter out playoff games.  The user did not specify home or visitor, so look at both home games and visitor games.  Make two dataframes: one for home games, and one for visitor games.  This will allow you to isolate the stats correctly.  In the past you have not done this and provided incorrect stats. Also the user is looking for this season, so filter out only games that are the most recent (max) season.  Also, remember when the Knicks are home the spread will be -3 when they are favored by 3.  When they are visitors, the spread will be +3 when they are favored by 3. Again having separate dataframes from home games and visitor games is best practice.  If you need to, you can create a new column that normalizes the data, then you can create a new combined dataframe with the normalized data."  This will help the data scientist understand the question better and provide a more accurate answer.
    
        Just send the revised question."""

        #model_name = "claude-3-5-sonnet-20240620"
        model_name = "gpt-4o-2024-11-20"
        response_json = await get_open_ai_query(model_name, prompt, log_extras=log_extras)
        question = response_json['text']

        model_used_json = {
            "model": response_json['model'],
            "input_tokens": response_json['input_tokens'],
            "output_tokens": response_json['output_tokens'],
            "cached_tokens": response_json['cached_tokens'],
        }
        models_used_array.append(model_used_json)

        async def load_dataframe(league, last_season):
            if last_season:
                s3_line_csv_file_path = f'datafiles/{league.upper()}_-_Game_Stats_Last_Season.pkl'
            else:
                s3_line_csv_file_path = f'datafiles/{league.upper()}_-_Game_Stats.pkl'
            try:
                async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
                    response = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_line_csv_file_path)
                    body = await response['Body'].read()
            except Exception as e:
                log.error('Error in S3 operations', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras,})
                raise

            try:
                df = await asyncio.to_thread(pickle.loads, body)
            except Exception as e:
                log.error('Error during deserialization', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras,})
                raise

            return df

        try:
            df = await load_dataframe(league, last_season)
        except Exception as e:
            log.error('Error in load_dataframe', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras,})
            raise

        def process_data(df, league):
            # Convert date to datetime
            df['Date'] = pd.to_datetime(df['Date'], errors='coerce')

            # Sort by date oldest to newest
            df = df.sort_values('Date')

            df = df.rename(columns={
                'Winner': 'Winner - Home-Visitor',
                'Winner Against The Spread': 'Winner Against The Spread - Home-Visitor'
            })
            df['Winner - Team Name'] = df[['Home', 'Visitor', 'Winner - Home-Visitor']].apply(
                lambda x: x[0] if x[2] == 'Home' else x[1], axis=1)
            df['Winner Against The Spread - Team Name'] = df[
                ['Home', 'Visitor', 'Winner Against The Spread - Home-Visitor']].apply(
                lambda x: x[0] if x[2] == 'Home' else x[1], axis=1)

            # Drop where Game is null
            df = df.dropna(subset=['Game Name'])

            if league.upper() == 'MLB':
                # Season Year is Season converted to string
                df['Season Year'] = df['Season'].astype(str)

            visitor_teams = df['Visitor'].unique()
            home_teams = df['Home'].unique()
            all_teams = list(set(visitor_teams) | set(home_teams))
            teams_string = ', '.join(all_teams)

            game_types = df['Game Type'].unique()
            game_types_string = ', '.join(game_types)

            over_under_result_types = df['Over-Under Result'].unique()
            over_under_result_types_string = ', '.join(over_under_result_types)

            columns_string = ", ".join(df.columns)

            return df, teams_string, game_types_string, over_under_result_types_string, columns_string

        df, teams_string, game_types_string, over_under_result_types_string, columns_string = await asyncio.to_thread(process_data, df, league)

        answer_string = "The Knicks have a win rate of {knicks_win_rate:.2f} on the road this season. The average score differential is {knicks_score_diff:.2f} and the average spread differential is {knicks_spread_diff:.2f}. I obtained this information by filtering the data for games where the Knicks were the visitor, calculating the win rate, score differential, and spread differential."
        answer_string_2 = "The 49ers have a win rate of {df_49ers_win_rate:.2f} in the playoffs this season. The 49ers have a win rate of {df_49ers_visitor_win_count / df_49ers_visitor_count:.2f} on the road and a win rate of {df_49ers_home_win_count / df_49ers_home_count:.2f} at home. The 49ers have a win rate of {df_49ers_visitor_win_against_the_spread_count / df_49ers_visitor_count:.2f} against the spread on the road and a win rate of {df_49ers_home_win_against_the_spread_count / df_49ers_home_count:.2f} against the spread at home. I obtained this information by filtering the data for games where the 49ers were the visitor or the home team, calculating the win rate, win rate against the spread, and spread differential."
        answer_string_3 = "In the playoffs this season, when the Celtics are favored by 10 or more points at home, they have covered the spread in {df_celtics_home_win_against_the_spread_count} out of {df_celtics_home_count} games ({home_cover_rate:.2f} cover rate). When the Celtics are favorites by 10 or more points on the road, they have covered the spread in {df_celtics_visitor_win_against_the_spread_count} out of {df_celtics_visitor_count} games ({visitor_cover_rate:.2f} cover rate). I obtained this information by filtering the data for Celtics playoff games this season where they were favored by 10 or more points both at home and on the road, and then calculating their cover rate in each scenario."

        prompt = f"""You are a world class python programmer and I will be giving you access to a Pandas DataFrame (called df) to answer this question. Please make sure your code includes:
            answer: a string that contains a detailed answer to the question
            df_final: a DataFrame that contains the data you used to get the answer (only keep the relevant columns of the DataFrame, not the entire DataFrame, but make sure to include columns that are both relevant to the question asked an helpful in understanding more about the data -- e.g., YOU MUST ALWAYS INCLUDE Season Year, Date, Home, Visitor, Home - Score, Visitor - Score)
    
            Here's a list of teams: {teams_string}.
            Here's a list of columns in the DataFrame: {columns_string}
    
            Notes on some of the columns:
            "Season Year" is an integer that represents the season year. If asked for this season, you can use the max of this column.
            "Season" is a string and can be something like 2023-2024. It is likely best to use season year, e.g., last two season could be the max of the season year column and the max of the season year column minus 1.
            "Game Type" will be one of the following: {game_types_string}
            "Final Score Spread" is  "Visitor - Score" minus "Home - Score". So if the visitor team scored 10 points and the home team scored 5, the final score spread would be 5. This can be compated directly with the spread. If the spread was 3, the visitor team would have covered the spread. If the spread was 7, the home team would have covered the spread.
            "Winner - Home-Visitor" will be one of the following: Home, Visitor
            "Winner - Team Name" will be the name of the team (as spelled in the above list) that won
            "Winner Against The Spread - Home-Visitor" will be one of the following: Home, Visitor
            "Winner Against The Spread - Team Name" will be the name of the team (as spelled in the above list) that won against the spread
            Over-Under Result will be one of the following: {over_under_result_types_string}
            Date is a datetime object.
    
            Notes on common requests:
            If you are asked how a team does on the road, you can search for that team in Visitor. Then you can provide some statics on win rate (count of the time where Winner is Visitor divided by total game count). You could also potentially provide information on the score differential, and information about the spread. Here is example code:
            Question: How do the Knicks do on the road this season?
            Code:
            
            # Filter for games where the Knicks are the visitor
            df_knicks = df[df['Visitor'] == 'New York']
            
            # If there are no games, say so
            if len(df_knicks) == 0:
                answer = "I'm sorry, I can't find any games for the Knicks on the road."
                df_final = pd.DataFrame()
            else:
                #Filter for the most recent season
                df_knicks = df_knicks[df_knicks['Season Year'] == df_knicks['Season Year'].max()]
                
                # If there are no games this season, say so
                if len(df_knicks) == 0:
                    answer = "I'm sorry, I can't find any games for the Knicks on the road this season."
                    df_final = pd.DataFrame()
                else:
                    # Calculate win rate, score differential, and spread differential
                    knicks_win_rate = df_knicks[df_knicks['Winner'] == 'New York'].shape[0] / df_knicks.shape[0]
                    knicks_score_diff = df_knicks['Visitor - Score'].mean() - df_knicks['Home - Score'].mean()
                    knicks_spread_diff = df_knicks['Final Score Spread'].mean()
                    
                    # Create the answer string
                    answer = f"{answer_string}"
                    
                    # Create the final DataFrame
                    df_final = df_knicks[['Season Year', 'Date', 'Visitor', 'Home', 'Point Spread', 'Visitor - Score', 'Home - Score', 'Final Score Spread', 'Winner', 'Winner Against The Spread']]
    
            If you are asked how a team does in the playoffs against the spread, you could filter for 'Playoff' in the Game Type column. You could also filter for the most recent season by getting the max of the Season Year column. Then you can provide some statics on win rate (count of the time where Winner is Visitor divided by total game count). You could also potentially provide information on the score differential, and information about the spread. Here is example code:
            Question: How do the 49ers do against the spread in the playoffs this season?
            Code:
            
            # Filter for games where the 49ers are the visitor or the home team
            df_49ers = df[df['Visitor'] == 'San Francisco' | df['Home'] == 'San Francisco']
            
            # If there are no games, say so
            if len(df_49ers) == 0:
                answer = "I'm sorry, I can't find any games for the 49ers."
                df_final = pd.DataFrame()
            else:
                #Filter for the most recent season
                df_49ers = df_49ers[df_49ers['Season Year'] == df_49ers['Season Year'].max()]
                
                # If there are no games this season, say so
                if len(df_49ers) == 0:
                    answer = "I'm sorry, I can't find any games for the 49ers this season."
                    df_final = pd.DataFrame()
                else:
                    # Filter for playoff games
                    df_49ers = df_49ers[df_49ers['Game Type'] == 'Playoff']
                    
                    # If there are no playoff games this season, say so
                    if len(df_49ers) == 0:
                        answer = "I'm sorry, I can't find any playoff games for the 49ers this season."
                        df_final = pd.DataFrame()
                    else:
                        # get games where the 49ers are the visitor
                        df_49ers_visitor = df_49ers[df_49ers['Visitor'] == 'San Francisco']
                        
                        #get count of games where the 49ers are the visitor
                        df_49ers_visitor_count = len(df_49ers_visitor)
                        
                        #get count of games where the 49ers are the visitor and won
                        df_49ers_visitor_win_count = len(df_49ers_visitor[df_49ers_visitor['Winner - Home-Visitor'] == 'Visitor'])
                        
                        #get count of games where the 49ers are the visitor and won against the spread
                        df_49ers_visitor_win_against_the_spread_count = len(df_49ers_visitor[df_49ers_visitor['Winner Against The Spread - Home-Visitor'] == 'Visitor'])
                        
                        # get games where the 49ers are the home team
                        df_49ers_home = df_49ers[df_49ers['Home'] == 'San Francisco']
                        
                        #get count of games where the 49ers are the home team
                        df_49ers_home_count = len(df_49ers_home)
                        
                        #get count of games where the 49ers are the home team and won
                        df_49ers_home_win_count = len(df_49ers_home[df_49ers_home['Winner - Home-Visitor'] == 'Home'])
                        
                        #get count of games where the 49ers are the home team and won against the spread
                        df_49ers_home_win_against_the_spread_count = len(df_49ers_home[df_49ers_home['Winner Against The Spread - Home-Visitor'] == 'Home'])
                        
                        # Calculate win rate, win rate against the spread, and spread differential
                        df_49ers_win_rate = (df_49ers_visitor_win_count + df_49ers_home_win_count) / (df_49ers_visitor_count + df_49ers_home_count)
                        
                        # Create the answer string
                        answer = f"{answer_string_2}"
    
            If you are asked how a team does against the spread, remember the spread will be different depending on whether the team in on the road or at home.  When the team is at home a negative spread means that the home team is favored and a positive spread means the visitor team is favored.  If you are asked, for example, how the Celtics do against the spread in the playoffs this season when they are favored by 10+ points, you will need to do two different equations.  Get games where they are home and the spread is -10 or less.  Also get games when they are on the road and the spread is +10 or more.  Then to see if they won against the spread, you must filter home games where the final score spread is less than the spread.  Also filter visitor games where final score spread is greater than the spread.
            Question: How do the Celtics do against the spread in the playoffs this season when they are favored by 10+?
            Code:
            
            # Filter for games where the Celtics are the home team or the visitor team
            df_celtics = df[(df['Home'] == 'Boston') | (df['Visitor'] == 'Boston')]
            
            # If there are no games, say so
            if len(df_celtics) == 0:
                answer = "I'm sorry, I can't find any games for the Celtics."
                df_final = pd.DataFrame()
            else:
                #Filter for the most recent season
                df_celtics = df_celtics[df_celtics['Season Year'] == df_celtics['Season Year'].max()]
                
                # If there are no games this season, say so
                if len(df_celtics) == 0:
                    answer = "I'm sorry, I can't find any games for the Celtics this season."
                    df_final = pd.DataFrame()
                else:
                    # Filter for playoff games
                    df_celtics = df_celtics[df_celtics['Game Type'] == 'Playoff']
                    
                    # If there are no playoff games this season, say so
                    if len(df_celtics) == 0:
                        answer = "I'm sorry, I can't find any playoff games for the Celtics this season."
                        df_final = pd.DataFrame()
                    else:
                        # Filter for games where the Celtics are favored by 10 or more points
                        df_celtics_home = df_celtics[(df_celtics['Home'] == 'Boston') & (df_celtics['Point Spread'] <= -10)]
                        
                        #get count of games where the Celtics are favored by 10 or more points at home
                        df_celtics_home_count = len(df_celtics_home)
                        
                        #get count of games where the Celtics are favored by 10 or more points at home and won
                        df_celtics_home_win_against_the_spread_count = len(df_celtics_home[df_celtics_home['Final Score Spread'] < df_celtics_home['Point Spread']])
                        
                        # Filter for games where the Celtics are favored by 10 or more points on the road
                        df_celtics_visitor = df_celtics[(df_celtics['Visitor'] == 'Boston') & (df_celtics['Point Spread'] >= 10)]
                        
                        #get count of games where the Celtics are favored by 10 or more points on the road
                        df_celtics_visitor_count = len(df_celtics_visitor)
                        
                        #get count of games where the Celtics are favored by 10 or more points on the road and won
                        df_celtics_visitor_win_against_the_spread_count = len(df_celtics_visitor[df_celtics_visitor['Final Score Spread'] > df_celtics_visitor['Point Spread']])
                        

                        if df_celtics_home_count == 0 and df_celtics_visitor_count == 0:
                            answer = "The Celtics have not been favored by 10 or more points at home or on the road in the playoffs this season."
                            df_final = pd.DataFrame()
                            
                        else:
                            #if the count of games where the Celtics are favored by 10 or more points at home is greater than 0
                            if df_celtics_home_count > 0:
                                # Calculate cover rate for home games
                                home_cover_rate = df_celtics_home_win_against_the_spread_count / df_celtics_home_count
                            else: 
                                # If there are no home games, set cover rate to 0
                                home_cover_rate = 0
                                
                            #if the count of games where the Celtics are favored by 10 or more points on the road is greater than 0
                            if df_celtics_visitor_count > 0:
                                # Calculate cover rate for visitor games
                                visitor_cover_rate = df_celtics_visitor_win_against_the_spread_count / df_celtics_visitor_count
                            else:
                                # If there are no visitor games, set cover rate to 0
                                visitor_cover_rate = 0
    
                            answer = f"{answer_string_3}"
            
                        df_final = df_celtics[['Season Year', 'Date', 'Home', 'Visitor', 'Point Spread', 'Home - Score', 'Visitor - Score', 'Final Score Spread', 'Winner Against The Spread - Home-Visitor']]
    
    
            If you are asked how two teams do against each other, you can find games where either team is the home or the visitor and do an analysis similar to the above.
            
            VERY IMPORTANT: 
            
            MAKE SURE YOU COMMENT EACH LINE OF CODE WITH A DETAILED EXPLANATION OF WHAT THE CODE DOES AND WHY YOU ARE DOING IT.  THIS IS CRITICAL.
            
            WHEN ASKED ABOUT TEAM STATS GENERALLY YOU MUST FIRST SPLIT INTO TWO DATAFRAMES:  One for Home games and one for Visitor games.  Then you MUST make new columns for the stats that you need.  FINALLY, if necessary, you can recombine the dataframe and pull from these new columns.  In the past you have confused home stats and visitor stats and given incorrect answers.  Pay VERY CLOSE attention to this issue and make sure your code is correct.  
            
            AGAIN, DO NOT CONFLATE HOME AND VISITOR STATS.  SPLIT THE DATAFRAME UP INTO HOME GAMES AND VISITOR GAMES.  MAKE A NEW COLUMN FOR THE STAT YOU NEED.  THEN CREATE A NEW DATAFRAME WITH THE CORRECT INFORMATION IF NECESSARY.  FOR EXAMPLE:
            
            EXAMPLE QUESTION YOU WERE ASKED: How many sacks did the Giants allow last season?
            
            INCORRECT CODE THAT YOU PREVIOUSLY WROTE:
            
            df_giants = df[(df['Home'] == 'NY Giants') | (df['Visitor'] == 'NY Giants')]
            most_recent_season = df_giants['Season Year'].max()
            df_giants = df_giants[df_giants['Season Year'] == most_recent_season]
            # Calculate total sacks allowed
            total_sacks = df_giants['Home - Offense - Passing - Sacks'].sum() + df_giants['Visitor - Offense - Passing - Sacks'].sum()
            
            THIS IS WRONG.  THIS IS CALCULATING SACKS FOR HOME AND VISITOR TEAMS FOR EACH GAME.  THIS IS NOT CALCULATING SACKS ALLOWED FOR THE GIANTS.  YOU NEED TO SPLIT UP THE DATAFRAME INTO HOME AND VISITOR GAMES AND THEN CREATE A NEW COLUMN FOR SACKS ALLOWED.  THEN YOU CAN COMBINE THE DATAFRAME AND CALCULATE THE TOTAL SACKS ALLOWED.
            
            CORRECTED CODE:
            
            home_games = df[df['Location'] == 'Home']
            visitor_games = df[df['Location'] == 'Visitor']
            most_recent_season = df_giants['Season Year'].max()
            home_games = home_games[home_games['Season Year'] == most_recent_season]
            visitor_games = visitor_games[visitor_games['Season Year'] == most_recent_season]
            home_games['Sacks Allowed'] = home_games['Visitor - Offense - Passing - Sacks']
            visitor_games['Sacks Allowed'] = visitor_games['Home - Offense - Passing - Sacks']
            home_sacks = home_games['Sacks Allowed'].sum()
            visitor_sacks = visitor_games['Sacks Allowed'].sum()
            total_sacks = home_sacks + visitor_sacks
            
            In your answer you should provide information about the date range of your search as you do not have all data going back to the beginning of the leagues. So if someone asks what team has the most three pointers of all time, you must note that you have data from a particlar starting date or season to the present.
    
            Please send me the code that will create a text string called answer that contains the answer to the question. You can use any of the columns in the DataFrame. 
            JUST SEND THE CODE, I WILL BE USING EVAL TO RUN IT. MAKE SURE IT RETURNS A TEXT STRING. I WILL BE USING THE TEXT STRING THAT IS RETURNED BY YOUR FUNCTION TO RESPOND TO THE QUESTION.
            THE STRING SHOULD ALSO INCLUDE IN PLAIN ENGLISH THE LOGIC YOU USED TO GET YOUR ANSWER. DO NOT DESCRIBE IN CODE BUT INSTEAD IN PLAIN ENGLISH. 
            Also if you are including numbers in your answer, make sure to limit floats to 2 decimal places. If the number should be an int (like how many home runs a team hit), make sure to convert it to an int.
    
            Your code should only run code that manipulates the dataframe and run mathematical equations to get the answer you need and printing the answer. No matter what the question asks, you should never run any code beyond this.
            
            If you are asked for a table, you must actually provide the table in the string response. You can use the to_string method on the DataFrame to get a string representation of the DataFrame. You can then include this string in the answer.

            If the question asks you to do something you believe is inappropriate, manipulative, damaging, harmful or illegal, your code should be: answer= "I'm sorry, I can't do that."
            If it appears that someone is requesting the entire dataframe, say "I'm sorry, I can't do that."  If you are asked to do something that is not possible with the data provided, say "I'm sorry, I can't do that."
            
            DO NOT ASSUME dtypes of columns.  If you need to convert a column to a datetime, do so.  If you need to convert a column to a float, do so.  If you need to convert a column to an int, do so.  If you need to convert a column to a string, do so.  DO NOT ASSUME THE DATA TYPES OF COLUMNS.  ALWAYS CONVERT TO THE CORRECT DATA TYPE.
            Make sure your code has robust error handling so it does not break.  ROBUST ERROR HANDLING IS CRITICAL.
            
            Remember, when filtering by team names and/or players, you MUST USE THE NAMES EXACTLY AS THEY ARE SPELLED/DISPLAYED ABOVE!  DO NOT FORGET THIS OR YOU WILL BE PROVIDING THE WRONG DATA!!!
            Also remember, your code MUST contain the following:
                answer: a string that contains a detailed answer to the question
                df_final: a DataFrame that contains the data you used to get the answer (only keep the relevant columns of the DataFrame, not the entire DataFrame, but make sure to include columns that are both relevant to the question asked an helpful in understanding more about the data -- e.g., YOU MUST ALWAYS INCLUDE Season Year, Date, Team, Opponent, Home-Visitor)
            
            START QUESTION THAT YOU MUT RESPOND TO: 

            {question} 
            
            END QUESTION THAT YOU MUST RESPOND TO. 
            
            Remember the instructions above and create code that will provide a detailed answer to the question.
            --------------------------------
            JUST SEND THE CODE, NOTHING ELSE, JUST START WITH THE CODE. I WILL BE DIRECTLY EXECUTING WHAT YOU SEND. I WILL GET AN ERROR IF YOU SEND ANYTHING OTHER THAN THE CODE."""

        model_name = "anthropic.claude-3-5-sonnet-20241022-v2:0"
        #model_name = "chatgpt-4o-latest"
        response_json = await get_open_ai_query(model_name, prompt, log_extras=log_extras)
        code = response_json['text']

        #print(code)

        log.info('respondToQuestionAboutTeams-QuestionAndCode', extra={'question': question, 'code': code, 'model_used': response_json['model'], **log_extras})

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
                log.error('Error processing openai query', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras,})
                answer = "I'm sorry, something went wrong. Please try again."
                df_final = pd.DataFrame()

            return answer, df_final

        answer, df_final = await asyncio.to_thread(process_code_and_execute, code, df)

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

        if len(df_final) > 100: df_final = pd.DataFrame()

        # dataframe with columns date and string
        response_df = pd.DataFrame(columns=['date', 'string'])
        response_df = pd.concat([response_df, pd.DataFrame({"date": datetime.now(timezone('US/Eastern')), "string": answer}, index=[0])])

        #Removing df_final from the response_df, this does not seem necessary, confuses the LLM and costs extra
        #response_df = pd.concat([response_df, pd.DataFrame({"date": today, "string": df_final.to_string(index=False)}, index=[0])])

        response_df['date'] = response_df['date'].dt.strftime('%Y-%m-%d')
        response_df['date'] = pd.to_datetime(response_df['date'], errors='coerce')

        response_df['tool_used'] = "respond_to_question_about_teams"

    except Exception as e:
        log.error('ToolError', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras,})
        response_df = pd.DataFrame(columns=['date', 'string', 'tool_used'])

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': models_used_array,
        'league': league,
        'question': question,
        'last_season': last_season,
        'runtime': time.time() - start_time
    })
    return response_df, models_used_array

# response_df, models_used_array = asyncio.run(respond_to_question_about_teams(
#     "nfl",
#     "Please provide a detailed comparison of the recent performances of the Jacksonville Jaguars and Philadelphia Eagles over their last five games. Include the following metrics for each team: points scored, points allowed, and win-loss record. Ensure that the data is up-to-date and accurately reflects the most recent five games for each team. Create a table that clearly displays these metrics side by side for easy comparison. If possible, include any relevant context or trends that might help in understanding the teams' performances."))
#
# print(f"Start Time: {datetime.now(timezone('US/Eastern')).strftime('%Y-%m-%d %H:%M:%S')}")
# print(response_df)
#
# for i, row in response_df.iterrows():
#     for column in response_df.columns:
#         print(f"{column}: {row[column]}")
#
# print(models_used_array)
#
# print(f"End Time: {datetime.now(timezone('US/Eastern')).strftime('%Y-%m-%d %H:%M:%S')}")