# async def clean_js_to_json(js_string):
#     def _clean():
#         try:
#             # Replace single quotes with double quotes
#             js_string_cleaned = re.sub(r"(\w+):", r'"\1":', js_string)  # Keys without quotes
#             js_string_cleaned = js_string_cleaned.replace("'", '"')
#             # Remove trailing commas in arrays and objects
#             js_string_cleaned = re.sub(r',\s*}', '}', js_string_cleaned)
#             js_string_cleaned = re.sub(r',\s*\]', ']', js_string_cleaned)
#         except Exception as e:
#             log.error('Error Cleaning JS', extra={'error': repr(e), 'traceback': traceback.format_exc(), 'js_string': js_string})
#             js_string_cleaned = None
#         return js_string_cleaned

#     js_string_cleaned = await asyncio.to_thread(_clean)
#     return js_string_cleaned

# async def update_row(table, id_name, id_value, update_name, update_value):
#     try:
#         url = f'{SUPABASE_URL}/rest/v1/{table}?{id_name}=eq.{id_value}'
#         headers = {
#             'apikey': SUPABASE_API_KEY,
#             'Authorization': f"Bearer {SUPABASE_API_KEY}",
#             'Content-Type': 'application/json'
#         }
#         data = {
#             update_name: update_value
#         }

#         data_json = json.dumps(data)

#         async with aiohttp.ClientSession() as session:
#             async with session.patch(url, headers=headers, data=data_json, timeout=aiohttp.ClientTimeout(total=120)) as response:
#                 response.raise_for_status()
#                 response_text = await response.text()

#         return response_text

#     except Exception as e:
#         log.error('Error Updating Row', extra={'error': repr(e), 'traceback': traceback.format_exc()})
#         return None

# async def get_user_information(user_id=None, user_name=None):
#     try:
#         if user_id is not None:
#             user_table = await get_table("users_and_actions", column_name="id", search=str(user_id))
#         elif user_name is not None:
#             user_table = await get_table("users_and_actions", column_name="username", search=user_name)
#         else:
#             return ""

#         user_name = user_table['username'].values[0]
#         nba_top_teams = user_table['nba_top_teams'].values[0]
#         nba_top_players = user_table['nba_top_players'].values[0]
#         nfl_top_teams = user_table['nfl_top_teams'].values[0]
#         nfl_top_players = user_table['nfl_top_players'].values[0]
#         nhl_top_teams = user_table['nhl_top_teams'].values[0]
#         nhl_top_players = user_table['nhl_top_players'].values[0]
#         mlb_top_teams = user_table['mlb_top_teams'].values[0]
#         mlb_top_players = user_table['mlb_top_players'].values[0]

#         user_information = f"User Name: {user_name}\n\nTop NBA Teams: {nba_top_teams}\n\nTop NBA Players: {nba_top_players}\n\nTop NFL Teams: {nfl_top_teams}\n\nTop NFL Players: {nfl_top_players}\n\nTop NHL Teams: {nhl_top_teams}\n\nTop NHL Players: {nhl_top_players}\n\nTop MLB Teams: {mlb_top_teams}\n\nTop MLB Players: {mlb_top_players}"

#     except Exception as e:
#         log.error('Error Getting User Info', extra={'error': repr(e), 'traceback': traceback.format_exc(), 'user_id': user_id, 'user_name': user_name})
#         user_information = ""

#     return user_information

# async def get_short_term_memory(user_id=None, user_name=None):
#     try:
#         if user_id is not None:
#             user_table = await get_table("users", column_name="user_id", search=str(user_id))
#         elif user_name is not None:
#             user_table = await get_table("users", column_name="username", search=user_name)
#         else:
#             return ""

#         short_term_memory = user_table['chat_short_term_memory'].values[0]

#     except Exception as e:
#         log.error('Error Getting Short Term Memory', extra={'error': repr(e), 'traceback': traceback.format_exc(), 'user_id': user_id, 'user_name': user_name})
#         short_term_memory = ""

#     return short_term_memory

# async def get_long_term_memory(user_id=None, user_name=None):
#     try:
#         if user_id is not None:
#             user_table = await get_table("users", column_name="user_id", search=str(user_id))
#         elif user_name is not None:
#             user_table = await get_table("users", column_name="username", search=user_name)
#         else:
#             return "Failure"

#         long_term_memory = user_table['chat_long_term_memory'].values[0]

#     except Exception as e:
#         log.error('Error Getting Long Term Memory', extra={'error': repr(e), 'traceback': traceback.format_exc(), 'user_id': user_id, 'user_name': user_name})
#         long_term_memory = ""

#     return long_term_memory

# async def update_short_term_memory(user_id=None, user_name=None, chat_history=None):
#     try:
#         if user_id is not None:
#             user_table = await get_table("users", column_name="user_id", search=str(user_id))
#         elif user_name is not None:
#             user_table = await get_table("users", column_name="username", search=user_name)
#         else:
#             return ""

#         user_id = user_table['id'].values[0]

#         short_term_memory = user_table['chat_short_term_memory'].values[0]

#         prompt = f"""START SHORT TERM MEMORY\n\n{short_term_memory}\n\nEND SHORT TERM MEMORY\n\nSTART RECENT CHAT HISTORY\n\n{chat_history}\n\nEND RECENT CHAT HISTORY\n\nYou are a bot for a sports analytics website called Pine Sports. We store short-term and long-term memories about each user in a database for you. This helps you know how users like to interact with you, what language style they like using (and like you to use) what teams and players they like talking about, etc. You need to update the short term memory with the recent chat history. Please send the updated short term memory in a perfectly formatted json. Again please focus on what language style they like, what teams they like, what players they like, what types of bets they like making, and anything else that you know that will make their experience better if you remembered it. The json should be formatted as follows: 'chat_short_term_memory': 'The updated short term memory.'  Remember just send the perfectly formatted json."""

#         response_json = await get_open_ai_query('claude-3-5-sonnet-20240620', prompt)

#         response = response_json['text']

#         model = response_json['model']
#         input_tokens = response_json['input_tokens']
#         output_tokens = response_json['output_tokens']
#         cached_tokens = response_json['cached_tokens']

#         #TODO- return this anywhere??
#         model_used_json = {
#             "model": model,
#             "input_tokens": input_tokens,
#             "output_tokens": output_tokens,
#             "cached_tokens": cached_tokens,
#         }

#         memory_json = await load_json(response)

#         short_term_memory = memory_json['chat_short_term_memory']

#         response = await update_row("users", "id", str(user_id), "short_term_memory", short_term_memory)

#     except Exception as e:
#         log.error('Error Updating Short Term Memory', extra={'error': repr(e), 'traceback': traceback.format_exc(), 'user_id': user_id, 'user_name': user_name})
#         response = "Failure"

#     return response

# async def update_long_term_memory(user_id=None, user_name=None):
#     try:
#         if user_id is not None:
#             user_table = await get_table("users", column_name="user_id", search=str(user_id))
#         elif user_name is not None:
#             user_table = await get_table("users", column_name="username", search=user_name)
#         else:
#             return "Failure"

#         short_term_memory = user_table['chat_short_term_memory'].values[0]
#         long_term_memory = user_table['chat_long_term_memory'].values[0]

#         prompt = f"""START LONG TERM MEMORY\n\n{long_term_memory}\n\nEND LONG TERM MEMORY\n\nSTART SHORT TERM MEMORY\n\n{short_term_memory}\n\nEND SHORT TERM MEMORY\n\nYou are a bot for a sports analytics website called Pine Sports. We store short-term and long-term memories about each user in a database for you. This helps you know how users like to interact with you, what language style they like using (and like you to use) what teams and players they like talking about, etc. You need to update the short term memory with the recent chat history. Please send the updated short term memory in a perfectly formatted json. Again please focus on what language style they like, what teams they like, what players they like, what types of bets they like making, and anything else that you know that will make their experience better if you remembered it. The json should be formatted as follows: 'chat_long_term_memory': 'The updated long term memory.'  Remember just send the perfectly formatted json."""

#         #response_json = await get_open_ai_query('claude-3-5-sonnet-20240620', prompt)
#         response_json = await get_open_ai_query('gpt-4o-2024-11-20 ', prompt)

#         response = response_json['text']

#         model = response_json['model']
#         input_tokens = response_json['input_tokens']
#         output_tokens = response_json['output_tokens']
#         cached_tokens = response_json['cached_tokens']

#         #TODO- return this anywhere??
#         model_used_json = {
#             "model": model,
#             "input_tokens": input_tokens,
#             "output_tokens": output_tokens,
#             "cached_tokens": cached_tokens,
#         }

#         memory_json = await load_json(response)

#         long_term_memory = memory_json['chat_long_term_memory']

#         response = await update_row("users", "id", str(user_id), "long_term_memory", long_term_memory)

#     except Exception as e:
#         log.error('Error Updating Long Term Memory', extra={
#             'error': repr(e),
#             'traceback': traceback.format_exc(),
#             'user_id': user_id,
#             'user_name': user_name
#         })
#         response = "Failure"

#     return response

# async def get_prop_page_information(league, player, prop, line, games_back=10, split="All Games", **kwargs):
#     try:
#         url = f"https://pine-sports.com/stats/bot/project/{league.upper()}/{player}/{prop}/{line}/{games_back}/{split}/"
#         url_to_return = f"https://pine-sports.com/stats/project/{league.upper()}/{player}/{prop}/{line}/{games_back}/{split}/"

#         async with aiohttp.ClientSession() as session:
#             async with session.get(url, timeout=aiohttp.ClientTimeout(total=120)) as response:
#                 response.raise_for_status()
#                 page_content = await response.text()

#         def parse_page_content(page_content):
#             soup = BeautifulSoup(page_content, 'html.parser')

#             # Get the table with class dataframe
#             table_html = soup.find_all('table', class_='dataframe')[0]
#             table = pd.DataFrame(pd.read_html(str(table_html))[0])

#             # Get line, average, median, and hit rate
#             line = table['Line'][0]
#             average = table['Average'][0]
#             median = table['Median'][0]
#             hit_rate = table['Hit Rate'][0]

#             scripts = soup.find_all('script')

#             data = None
#             background_colors = None

#             # Search through <script> tags to find the one containing the Chart data
#             for script in scripts:
#                 if script.string and 'var myChart = new Chart' in script.string:
#                     # Regex to extract the datasets part of the Chart's data
#                     data_match = re.search(r'data:\s*(\{.*?\})\s*,', script.string, re.DOTALL)
#                     if data_match:
#                         # Clean the JavaScript object to make it JSON parseable
#                         cleaned_json_string = asyncio.run(clean_js_to_json(data_match.group(1)))
#                         try:
#                             data_json = json.loads(cleaned_json_string)
#                             # Assuming the first dataset is the "Points" dataset
#                             points_dataset = data_json['datasets'][0]
#                             data = points_dataset['data']
#                             background_colors = points_dataset['backgroundColor']
#                         except json.JSONDecodeError as e:
#                             log.error('Error Decoding JSON', extra={'error': repr(e)})
#                         break

#             over_unders = []
#             for color in background_colors:
#                 if color == 'rgba(78, 196, 143, 1)': over_unders.append('Over')
#                 elif color == 'rgba(39,73,112, 1)': over_unders.append('Under')
#                 else: over_unders.append('Push')

#             prop_dataframe = pd.DataFrame({prop: data, 'over_under': over_unders})

#             return line, average, median, hit_rate, prop_dataframe

#         line, average, median, hit_rate, prop_dataframe = await asyncio.to_thread(parse_page_content, page_content)
#     except:
#         line, average, median, hit_rate, prop_dataframe = None, None, None, None, None

#     return url_to_return, line, average, median, hit_rate, prop_dataframe

# async def get_line_file_from_s3(file_name):
#     try:
#         s3_file_path = f'sportradar-lines/{file_name}'
#         async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
#             response = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_file_path)
#             body = await response['Body'].read()
#             csv_string = body.decode('utf-8')
#             line_file = pd.read_csv(StringIO(csv_string))
#     except:
#         line_file = pd.DataFrame()

#     return line_file

# async def get_current_nfl_week(date):
#     #TODO- probably would rather not have this be hardcoded...
#     # First game is Thursday, Sept 5, 2024 (First Tuesday is 9/3)
#     season_start = datetime(2024, 9, 3, tzinfo=pytz.UTC)
#     days_since_start = (date - season_start).days

#     # Calculate the current week (each week starts on a Thursday)
#     if days_since_start < 0: return 1 # The season hasn't started yet
#     else:
#         current_week = (days_since_start // 7) + 1
#         if current_week > 18: return 18  # The regular season has ended
#         return current_week

# # current_week = asyncio.run(get_current_nfl_week(datetime.now(timezone('US/Eastern'))))
# # print(f"Current NFL week: {current_week}")

# async def get_sample_questions_old():
#     leagues = {
#         "nba": "http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=",
#         "mlb": "http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?dates=",
#         "nfl": "http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=",
#         "nhl": "http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard?dates=",
#         "ncaam": "http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?dates=",
#         "ncaaf": "http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard?dates=",
#         "wnba": "http://site.api.espn.com/apis/site/v2/sports/basketball/wnba/scoreboard?dates=",
#         "mls": "http://site.api.espn.com/apis/site/v2/sports/soccer/usa.1/scoreboard?dates=",
#         "epl": "http://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard?dates=",
#         "laliga": "http://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard?dates=",
#         "ufc": "http://site.api.espn.com/apis/site/v2/sports/mma/ufc/scoreboard?dates=",
#         "pga": "http://site.api.espn.com/apis/site/v2/sports/golf/leaderboard?league=pga&dates="
#     }

#     today = datetime.now().strftime('%Y%m%d')
#     yesterday = (datetime.now() - timedelta(days=1)).strftime('%Y%m%d')

#     async def fetch_all_leagues(leagues, date):
#         tasks = [fetch_league_data(league, leagues[league.lower()], date) for league in ['nfl', 'nba', 'nhl', 'mlb', 'wnba']]
#         results = await asyncio.gather(*tasks)
#         try:
#             events_pd = pd.concat([pd.DataFrame(result) for result in results if result], ignore_index=True)
#         except:
#             events_pd = pd.DataFrame()
#         return events_pd

#     todays_events_pd = await fetch_all_leagues(leagues, today)
#     yesterdays_events_pd = await fetch_all_leagues(leagues, yesterday)

#     question_one = ""
#     question_two = ""
#     question_three = ""
#     try:
#         todays_league = todays_events_pd['league'].values[0]
#         question_one =  f"What are some good {todays_league.upper()} props for tonight?"
#     except:
#         question_one = f"What are some good bets for tonight?"

#     try:
#         todays_league_games = todays_events_pd[todays_events_pd['league'] == todays_league]
#         todays_games_length = len(todays_league_games)
#         random_game = random.randint(0, todays_games_length - 1)
#         todays_game = todays_league_games['name'].values[random_game]
#         teams = todays_game.split(" at ")
#         home_team = teams[1]
#         question_two = f"Who do we like for the {home_team} game tonight?"
#     except:
#         question_two = f"How does Jayson Tatum do in home games compared to away games?"

#     try:
#         yesterdays_games_length = len(yesterdays_events_pd)
#         random_game = random.randint(0, yesterdays_games_length - 1)
#         yesterdays_games = yesterdays_events_pd['name'].values[random_game]
#         teams = yesterdays_games.split(" at ")
#         home_team = teams[1]
#         question_three = f"How did {home_team} do last night?"
#     except:
#         question_three = f"How many yards did Patrick Mahomes throw for last season?"

#     return question_one, question_two, question_three