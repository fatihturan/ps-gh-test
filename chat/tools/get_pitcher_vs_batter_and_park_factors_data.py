from datetime import datetime
from pytz import timezone
import time
import pytz
import pandas as pd
import aiohttp
import aioboto3
import asyncio
from bs4 import BeautifulSoup
from .helpers import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_STORAGE_BUCKET_NAME

import traceback
import logging
log = logging.getLogger('json')

async def get_pitcher_vs_batter_and_park_factors_data(query, log_extras, **kwargs):
    start_time = time.time()
    try:
        async def fetch(session, url):
            async with session.get(url) as response:
                return await response.text()

        async def fetch_json(session, url):
            async with session.get(url) as response:
                return await response.json()

        async def process_pitcher(session, pitcher, team_type, visitor_team, home_team):
            pitcher_name = pitcher.find("a").text
            pitcher_hand = pitcher.find("span").text
            pitcher_url = "https://www.rotowire.com" + pitcher.find("a")["href"]
            pitcher_id = pitcher.find("a")["href"].split("-")[-1]

            api_url_1 = f"https://www.rotowire.com/baseball/tables/player-splits.php?playerID={pitcher_id}&position=P&type=position"
            api_url_2 = f"https://www.rotowire.com/baseball/ajax/player-page-data.php?id={pitcher_id}&stats=pitching"

            splits, opponent_stats_data = await asyncio.gather(
                fetch_json(session, api_url_1),
                fetch_json(session, api_url_2)
            )

            opponent_stats = opponent_stats_data['matchup']['pitching']
            for stat in opponent_stats:
                stat.pop("ID", None)
                stat.pop("firstname", None)
                stat.pop("lastname", None)
                #stat["URL"] = "https://www.rotowire.com" + stat["URL"]

            #convert to dataframe
            opponent_stats = pd.DataFrame(opponent_stats)

            #drop URL column
            try: opponent_stats = opponent_stats.drop(columns=['URL'])
            except: pass

            if team_type == "Visitor": opponent_stats['team'] = home_team
            elif team_type == "Home": opponent_stats['team'] = visitor_team

            try:
                columns = [
                    'slot',
                    'player',
                    'team',
                    'pos',
                    'bats',
                    'ab',
                    'h',
                    'hr',
                    'rbi',
                    'bb',
                    'sb',
                    'cs',
                    'so',
                    'avg',
                    'slg',
                    'obp',
                    'ops'
                ]
                opponent_stats = opponent_stats[columns]
            except:
                pass

            #convert to string
            opponent_stats = opponent_stats.to_string(index=False)

            splits_string = ""
            for entry in splits:
                for key, value in entry.items():
                    if key == "type": splits_string += f"{value}:\n"
                    else: splits_string += f"{key}: {value}\n"
                splits_string += "\n"

            if team_type == "Visitor":
                return (
                    f"{visitor_team} ({team_type}) Pitcher: {pitcher_name} ({pitcher_hand})\n"
                    #f"{team_type} Pitcher URL: {pitcher_url}\n"
                    f"{pitcher_name} Pitcher Splits:\n\n{str(splits_string)}\n"
                    f"{home_team} Career Batting Stats vs {pitcher_name} ({visitor_team} Pitcher):\n\n{str(opponent_stats)}\n\n"
                )
            elif team_type == "Home":
                return (
                    f"{home_team} ({team_type}) Pitcher: {pitcher_name} ({pitcher_hand})\n"
                    #f"{team_type} Pitcher URL: {pitcher_url}\n"
                    f"{pitcher_name} Pitcher Splits:\n\n{str(splits_string)}\n"
                    f"{visitor_team} Career Batting Stats vs {pitcher_name} ({home_team} Pitcher):\n\n{str(opponent_stats)}\n\n"
                )

        async def process_game(session, game):
            try:
                teams = game.find("div", class_="lineup__teams")
                visitor_team = teams.find("div", class_="lineup__team is-visit").text.strip()
                home_team = teams.find("div", class_="lineup__team is-home").text.strip()
                time = game.find("div", class_="lineup__time").text.strip()

                is_upcoming = True
                try:
                    #Time will be string formatted as follows: 12:05 PM ET.  Convert to datetime
                    time = datetime.strptime(time, "%I:%M %p ET")
                    today = datetime.now().date()
                    time = time.replace(year=today.year, month=today.month, day=today.day)
                    time = pytz.timezone('US/Eastern').localize(time)
                    #If the time is in the past, then the game has already started
                    if time < datetime.now(timezone('US/Eastern')):
                        is_upcoming = False
                except Exception as e:
                    log.error('Time Format Error', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras})

                if is_upcoming:
                    main_lineup = game.find("div", class_="lineup__main")
                    visitor_pitcher = main_lineup.find("ul", class_="lineup__list is-visit").find("div", class_="lineup__player-highlight-name")
                    home_pitcher = main_lineup.find("ul", class_="lineup__list is-home").find("div", class_="lineup__player-highlight-name")

                    visitor_data, home_data = await asyncio.gather(
                        process_pitcher(session, visitor_pitcher, "Visitor", visitor_team, home_team),
                        process_pitcher(session, home_pitcher, "Home", visitor_team, home_team)
                    )

                    return f"Game: {visitor_team} at {home_team}\nTime:{time}\n{visitor_data}{home_data}\n\n"
                else:
                    return ""

            except Exception as e:
                log.error('Error Processing Game', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras})
                return ""

        url = "https://www.rotowire.com/baseball/daily-lineups.php"

        async with aiohttp.ClientSession() as session:
            html = await fetch(session, url)
            soup = BeautifulSoup(html, "html.parser")
            games = soup.find_all("div", class_="lineup is-mlb")

            tasks = [process_game(session, game) for game in games]
            results = await asyncio.gather(*tasks)

            full_string = "".join(results).strip()

        #create dataframe with date, string, tool_used
        pitcher_df = pd.DataFrame({"date": [datetime.now(timezone('US/Eastern'))], "string": [full_string], "tool_used": ["get_pitcher_vs_batter_and_park_factors_data"]})
    except:
        print(traceback.format_exc())
        pitcher_df = pd.DataFrame(columns=['date', 'string', 'tool_used'])

    todays_date = datetime.now().strftime('%Y-%m-%d')

    try:
        #get {todays_date}_pitcher_vs_batter.txt from boto3
        s3_file_path = f"pitcher_vs_batter/{todays_date}_pitcher_vs_batter.txt"
        async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
            response = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_file_path)
            body = await response['Body'].read()
            body_string = body.decode('utf-8')

        #add to pitcher_df
        pitcher_df = pd.concat([pitcher_df, pd.DataFrame({"date": [datetime.now(timezone('US/Eastern'))], "string": [body_string], "tool_used": ["get_pitcher_vs_batter_and_park_factors_data"]})])

        #COMMENTING OUT SUMMARIZATION DUE TO LATENCY

        # prompt = f"""You received the following question: {query}
        #
        # Using the information below, please send a detailed explanation of the data that is relevant to the question.
        #
        # {pitcher_df.to_string()}
        #
        # DO NOT ANSWER THE QUESTION.  Just send the relevant stats.  Include player names, team names and statistics.
        # For example, if you are asked for people most likely to get a hit for a game, provide all relevant pitcher and hitter data for batters that have good stats, do not include data for batters that have bad stats.
        # Another person will provide an answer to this question and needs the relevant data to make an informed decision.
        # You do not have to provide statistics for every player and every game. Just provide the top statistics so the person answering the question has enough data to respond to the query.
        # Give this person options but you do not have to provide every single detail.  Time is critical and the longer you take to respond, the more the user waiting for the answer has to wait.
        #
        # For example, in one response you wrote:
        #
        #     **Game: TOR at TB**
        #     - **Ryan Yarbrough (TOR) vs. TB Batters:**
        #       - No relevant stats available.
        #
        # This is BAD.  It is not informative and you wasted time writing this.  That increased latency and did not add value to the response.  DO NOT DO THIS.
        #
        # In another response, the user requested people most likely to get a hit and you included the following:
        #
        #     - **Albert Suárez (BAL) vs. DET Batters:**
        #       - Heston Kjerstad: 0 AB, 0 H
        #       - Adley Rutschman: 1 AB, 0 H
        #
        # Again, this is useless information that wasted time.  This is too few at bats, and no hits for each.  This is not relevant to when asked for a list of people MOST LIKELY to get a hit.  DO NOT DO THIS.  ONLY INCLUDE USEFUL RELEVANT INFORMATION.
        #
        # You MUST be CONCISE as possible. Just provide the potentially relevant stats, player names, handedness, and team names. Do not make tables.  Concisely write the relevant player names, handedness, team names and stats.
        # Do not explain why they may or may not be relevant.  Do not include irrelevant stats. Just send the stats and ONLY THE STATS.  You only have 2 seconds to provide your response. Keep it quick and tight. Start now."""
        #
        # model = "gpt-4o-mini"
        # #model = "claude-3-5-sonnet-20240620"
        # #model = "claude-3-haiku-20240307"
        # system = "You review Pitchers vs. Batter data for today's games and pull out all of the relevant information data that is responsive to the query."
        #
        # print(f"GETTING LLM RESPONSE.  Start time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        #
        # response_json = await get_open_ai_query(model, prompt, system)
        #
        # print(f"GETTING LLM RESPONSE.  End time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        #
        # text = response_json['text']
        #
        # model = response_json['model']
        # input_tokens = response_json['input_tokens']
        # output_tokens = response_json['output_tokens']
        # cached_tokens = response_json['cached_tokens']
        #
        # model_used_json = {
        #     "model": model,
        #     "input_tokens": input_tokens,
        #     "output_tokens": output_tokens,
        #     "cached_tokens": cached_tokens,
        # }
        #
        # models_used_array.append(model_used_json)
        #
        # pitcher_df = pd.DataFrame({"date": [today], "string": [text], "tool_used": ["get_pitcher_vs_batter_and_park_factors_data"]})

    except:
        pass

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'runtime': time.time() - start_time
    })
    return pitcher_df, []

# pitcher_df, models_used_array = asyncio.run(get_pitcher_vs_batter_and_park_factors_data("What batters are most likely to get a hit today?"))
# for i, row in pitcher_df.iterrows():
#     print(f"NEW ROW")
#     print()
#     print()
#     print(row['date'])
#     print(row['string'])
#
#     print()
#
# print(models_used_array)