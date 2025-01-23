import os
from googleapiclient.discovery import build
from urllib.request import urlopen
from bs4 import BeautifulSoup
import ssl
ssl._create_default_https_context = ssl._create_unverified_context
from datetime import datetime, timedelta
import json
import requests
import boto3
from django.conf import settings
import pandas as pd
import pickle
import anthropic
import openai
from openai import OpenAI
import traceback
from time import sleep
import re
from serpapi import GoogleSearch

from concurrent.futures import ThreadPoolExecutor
#from serpapi import GoogleSearch
from htmldate import find_date

import logging
log = logging.getLogger('json')

os.environ["OPENAI_API_KEY"] = settings.OPENAI_API_KEY

ANTHROPIC_API_KEY = settings.ANTHROPIC_API_KEY
OPENAI_API_KEY = settings.OPENAI_API_KEY
PERPLEXITY_API_KEY = settings.PERPLEXITY_API_KEY

def load_json(string):
    try:
        # First, try to load the entire string
        return json.loads(string)
    except json.JSONDecodeError:
        try:
            # If that fails, try to extract the JSON content
            match = re.search(r'(\{.*\})', string, re.DOTALL)
            if match:
                json_str = match.group(1)
                # Replace Python's True/False with JSON's true/false
                json_str = json_str.replace('False', 'false').replace('True', 'true')

                # Remove any non-printable characters
                json_str = re.sub(r'[\x00-\x1F\x7F-\x9F]', '', json_str)
                return json.loads(json_str)
            else:
                raise ValueError("No JSON object found in the string")
        except Exception as e:
            log.error('Error loading JSON', extra={'error': repr(e), 'traceback': traceback.format_exc(), 'json_string': string})
            return None

def get_open_ai_query_chat_bot_ai(model_name, prompt, content="", max_tokens=1800, temperature=0, sleep_time=1, counter=0):
    try:
        if "claude" in model_name.lower():
            client = anthropic.Anthropic(
                # defaults to os.environ.get("ANTHROPIC_API_KEY")
                api_key=ANTHROPIC_API_KEY,
            )

            user_message = {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt
                    }
                ]
            }

            message = client.messages.create(
                model=model_name,
                max_tokens=max_tokens,
                temperature=temperature,
                system=content,
                messages=[user_message],
            )

            model = message.model
            input_tokens = message.usage.input_tokens
            output_tokens = message.usage.output_tokens

            text = message.content[0].text
            log.info('Created Claude Message', extra={
                'client_message': message,
                'model': model,
                'input_tokens': input_tokens,
                'output_tokens': output_tokens,
            })

        else:
            openai.api_base = "https://api.openai.com/v1"
            openai.api_type = 'open_ai'
            openai.api_version = None
            openai.api_key = os.environ["OPENAI_API_KEY"]
            client = OpenAI()

            response = client.chat.completions.create(
                model=model_name,
                messages=[{"role": "system", "content": content}, {"role": "user", "content": prompt}],
                temperature=temperature,
                max_tokens=max_tokens,
                top_p=0.5,
                frequency_penalty=0,
                presence_penalty=0,
                stop=None,
            )

            model = response.model
            input_tokens = response.usage.prompt_tokens
            output_tokens = response.usage.completion_tokens
            text = response.choices[0].message.content

    except Exception as e:
        log.error('Error loading JSON', extra={'error': repr(e), 'traceback': traceback.format_exc()})
        if counter < 5:
            counter += 1
            sleep(sleep_time)
            sleep_time = sleep_time * 2
            response_json = get_open_ai_query_chat_bot_ai("claude-3-5-sonnet-20240620", prompt, content, max_tokens,
                                                    temperature, sleep_time, counter)
            text = response_json['text']
            model = response_json['model']
            input_tokens = response_json['input_tokens']
            output_tokens = response_json['output_tokens']

        else:
            text = "I'm sorry, I'm having trouble processing your request. Please try again later."
            model = "Error"
            input_tokens = 0
            output_tokens = 0

    # Remove "In conclusion, " or "In summary, " from text and capitalize first letter after.
    while True:
        if "In conclusion, " in text:
            index = text.find("In conclusion, ")
            first_text = text[:index]
            second_text = text[index + len("In conclusion, "):]
            second_text = second_text[0].upper() + second_text[1:]
            text = first_text + second_text
        elif "In summary, " in text:
            index = text.find("In summary, ")
            first_text = text[:index]
            second_text = text[index + len("In summary, "):]
            second_text = second_text[0].upper() + second_text[1:]
            text = first_text + second_text
        else:
            break

    # return model, input_tokens, output_tokens, text in json format
    response_json = {
        "model": model,
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "text": text
    }

    #TODO- I don't think this return value is right? line 125 above tries to read the output
    # of this function as response_json but we're just returning the string...
    return text

def read_response(response, chat=False, is_article=False):
    dtype = type(response) #get the dtype of response
    #if the response is a string
    if dtype == str:
        text = response
    else:
        try:
            text = response["choices"][0]["text"]
        except:
            text = "Error"
            try:
                id = response["id"]
                finish_reason = response["choices"][0]["finish_reason"]
                completion_tokens = response["usage"]["completion_tokens"]
                prompt_tokens = response["usage"]["prompt_tokens"]
                total_tokens = response["usage"]["total_tokens"]

                log.info('Reading Response', extra={
                    'Response ID': id,
                    'Finish Reason': finish_reason,
                    'Completion Tokens': completion_tokens,
                    'Prompt Tokens': prompt_tokens,
                    'Total Tokens': total_tokens,
                })
            except:
                pass
        try:
            id = response["id"]
            finish_reason = response["choices"][0]["finish_reason"]
            completion_tokens = response["usage"]["completion_tokens"]
            prompt_tokens = response["usage"]["prompt_tokens"]
            total_tokens = response["usage"]["total_tokens"]
        except:
            pass

    #TODO- this appears to not be used at all... remove?
    if is_article:
        title = text[text.find("Title:")+7:text.find("Lede:")]
        lede = text[text.find("Lede:")+6:text.find("Body:")]
        body = text[text.find("Body:")+6:]

    return text

def get_search(search_term, league, **kwargs):
    log.info('Google Search Variables', extra={
        'search_term': search_term,
        'league': league,
        'kwargs': kwargs,
    })

    api_key = "AIzaSyArtBrt_sHNj6aXNrTMjCyb58xU6hmPN7Y"  # The API_KEY you acquired
    cse_id = "86bf24f7eb5114ac3"  # The search-engine-ID you created

    if league == "NFL": days_back = 2
    else: days_back = 1
    yesterday = datetime.now() - timedelta(days=days_back)
    yesterday = yesterday.strftime("%Y-%m-%d")
    sites = "site:espn.com" + " OR site:cbssports.com" + " OR site:theringer.com" \
        + " OR site:theathletic.com" + " OR site:nfl.com" + " OR site:nba.com" \
        + " OR site:nhl.com" + " OR site:mlb.com" + " OR site:foxsports.com" \
        + " OR site:nbcsports.com" + " OR site:yardbarker.com" + " OR site:fanduel.com" \
        + " OR site:pickswise.com" + " OR site:ballysports.com" + " OR site:sportsline.com" \
        + " OR site:bleacherreport.com" + " OR site:sbnation.com" + " OR site:usatoday.com" \
        + " OR site:foxbet.com" + " OR site:actionnetwork.com" + " OR site:sportskeeda.com" \
        + " OR site:formula1.com" + " OR site:cricbuzz.com" + " OR site:espncricinfo.com" \
        + " OR site:cricket365.com" + " OR site:cricketworld.com"

    #-site:yahoo.com -site:theathletic.com -site:ticketmaster.com -site:newsnow.com

    search_term = search_term + f" after:{yesterday} {sites}"
    service = build("customsearch", "v1", developerKey=api_key)
    res = service.cse().list(q=search_term, cx=cse_id, **kwargs).execute()

    if int(res['searchInformation']['totalResults']) == 0:

        #TODO- some of these print statements seem formatted for an end user - confirm that isn't the case...
        if search_term.find(",") != -1:
            print("Found no results.  Removing player name and trying again.")
            search_term = search_term.split(" , ")[1] + f" after:{yesterday} {sites}"
            service = build("customsearch", "v1", developerKey=api_key)
            res = service.cse().list(q=search_term, cx=cse_id, **kwargs).execute()
            if int(res['searchInformation']['totalResults']) == 0:
                print("Found no results.  Removing website limitation and trying again.")
                search_term = search_term.split(" , ")[1] + f" after:{yesterday}"
                service = build("customsearch", "v1", developerKey=api_key)
                res = service.cse().list(q=search_term, cx=cse_id, **kwargs).execute()
        else:
            print("Found no results.  Removing website limitation and trying again.")
            search_term = search_term.split(" , ")[1] + f" after:{yesterday}"
            service = build("customsearch", "v1", developerKey=api_key)
            res = service.cse().list(q=search_term, cx=cse_id, **kwargs).execute()

        if int(res['searchInformation']['totalResults']) == 0:
            print("Found no results.  Returning empty list.")
            res['items'] = []

    return res['items']

def get_search_new(league, search_term, num=30, **kwargs):
    try_counter = 0
    while try_counter < 5:
        if try_counter > 0:
            date_limitation_for_google_search = "week"
        else:
            date_limitation_for_google_search = "day"
        try:
            log.info('Google Search Variables', extra={
                'search_term': search_term,
                'league': league,
                'date_limitation': date_limitation_for_google_search,
                'kwargs': kwargs,
            })

            if date_limitation_for_google_search.lower() == "week":
                tbs = "qdr:w"
            elif date_limitation_for_google_search.lower() == "day":
                tbs = "qdr:d"

            sites = "site:espn.com" + " OR site:cbssports.com" + " OR site:theringer.com" \
                + " OR site:theathletic.com" + " OR site:nfl.com" + " OR site:nba.com" \
                + " OR site:nhl.com" + " OR site:mlb.com" + " OR site:foxsports.com" \
                + " OR site:nbcsports.com" + " OR site:yardbarker.com" + " OR site:fanduel.com" \
                + " OR site:pickswise.com" + " OR site:ballysports.com" + " OR site:sportsline.com" \
                + " OR site:bleacherreport.com" + " OR site:sbnation.com" + " OR site:usatoday.com" \
                + " OR site:foxbet.com" + " OR site:actionnetwork.com" + " OR site:sportskeeda.com" \
                + " OR site:formula1.com" + " OR site:cricbuzz.com" + " OR site:espncricinfo.com" \
                + " OR site:cricket365.com" + " OR site:cricketworld.com"
            search_term = search_term + " " + sites

            params = {
                "q": search_term,
                "location": "New York, United States",
                "hl": "en",
                "gl": "us",
                "num": num,
                "google_domain": "google.com",
                "tbs": tbs,
                "api_key": "ba492dddc1c865c77854a5dbd7a7c5114e974a5547448b087e5f51b9709b7a59",
            }

            search = GoogleSearch(params)
            results = search.get_dict()
            links_df = pd.DataFrame()

            for result in results['organic_results']:

                try:
                    try:
                        date = result['date']
                    except:
                        date = datetime.now().strftime('%b %d, %Y')

                    original_date = date
                    if "hours" in date or "minutes" in date or "seconds" in date:
                        date = datetime.now().strftime('%b %d, %Y')
                    elif "days" in date:
                        day_number = int(date.split(" ")[0])
                        date = (datetime.now() - timedelta(days=day_number)).strftime('%b %d, %Y')

                    links_df = links_df.append(
                        {'link': result['link'], 'original date': original_date, 'date': date, 'snippet': result['snippet']},
                        ignore_index=True)
                except Exception as e:
                    log.error('Error Parsing Search Results', extra={'error': repr(e), 'traceback': traceback.format_exc(), 'result': json.dumps(result)})

            return links_df['link'].tolist() #turn links['link'] into a list
        except Exception as e:
            log.error('Trying Search Again...', extra={'error': repr(e), 'traceback': traceback.format_exc()})
            try_counter = try_counter + 1

def get_image_search(search_term, **kwargs):
    temperature = 0
    max_tokens = 200
    model = "gpt-4o-mini"

    search_term = search_term + "\n\n------------------\n\nMINIMUM Google COVER IMAGE search terms that ONLY RELATE TO THE FOCUS OF THIS ARTICLE  IF A PLAYER, ALSO INCLUDE JUST THE TEAM THE PLAYER IS ON.  NO QUOTES.  SINGLE STRING OF SEARCH TERMS:"

    content = "You read articles and send google image search terms that would best find a COVER PHOTO about the player or team(s) that are the FOCUS of the article.  IF IT IS A PLAYER ALSO INCLUDE THE JUST TEAM THE PLAYER IS ON.  YOU JUST SEND THE SEARCH TERMS.  ONLY THE MINIMUM SEARCH TERMS NECESSARY.  NO QUOTES."
    prefix_messages = [{"role": "system", "content": content}]

    search_term = get_open_ai_query_chat_bot_ai(model, search_term, content, max_tokens, temperature)

    #remove " and ' from search term
    search_term = search_term.replace('"', '').replace("'", '')
    log.info('Search Terms', extra={'search_terms': search_term})

    try:
        api_key = "AIzaSyArtBrt_sHNj6aXNrTMjCyb58xU6hmPN7Y"  # The API_KEY you acquired
        cse_id = "86bf24f7eb5114ac3"  # The search-engine-ID you created

        # Send the request to the API
        #response = requests.get(f'https://www.googleapis.com/customsearch/v1?q={search_term}&key={api_key}&cx={cse_id}&searchType=image&imgSize=huge&dateRestrict=m')
        search_url = f'https://www.googleapis.com/customsearch/v1?q={search_term}&key={api_key}&cx={cse_id}&searchType=image&dateRestrict=m'
        response = requests.get(search_url)
        # Check the status code to make sure the request was successful
        if response.status_code == 200:
            # Extract the image URLs from the response
            image_urls = response.json()['items']
            log.info('Fetched Image from Google', extra={'image_urls': json.dumps(image_urls), 'search_url': search_url})
            #TODO- from my reading of this code this array is never more than one element...
            # so probably doesn't even need to be an array?
            final_image_urls = []
            temp_image_urls = []
            image_url = ""
            for item in image_urls:
                if "image/jpeg" in item["mime"] and item["image"]["height"] < item["image"]["width"]:
                    width = int(item["image"]["width"])
                    height = int(item["image"]["height"])
                    aspect_ratio = width / height
                    temp_image_urls.append(item["link"])
                    if aspect_ratio >= 1.33 and width > 600:  # Only include images with aspect ratio of 4:3 or wider
                        print("Adding image with aspect-ratio of " + str(aspect_ratio))
                        final_image_urls.append(item['link'])
                        break
            if len(final_image_urls) == 0:
                print("No images found with aspect ratio of 4:3 or wider.  Using first image found.")
                final_image_urls.append(temp_image_urls[0]['link'])

            #if there is one or more image urls
            image_url = final_image_urls[0]
        else:
            log.error('Error Fetching Image from Google', extra={'status': response.status_code, 'search_url': search_url})
            image_url = ""
    except:
        image_url = ""

    log.info('Selected Image Url', extra={'image_url': image_url, 'image_urls': json.dumps(image_urls), 'search_url': search_url})
    return image_url

def get_text(url):

    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) '
                        'AppleWebKit/537.36 (KHTML, like Gecko) '   
                        'Chrome/90.0.4430.212 Safari/537.36'
    }
    try:
        response = requests.get(url, headers=headers, timeout=2)
        html = response.content
        soup = BeautifulSoup(html, features="html.parser")

        # kill all script and style elements
        for script in soup(["script", "style"]):
            script.extract()

        # TO DO - THINK ABOUT SORTING BY TITLE & DESCRIPTION KEYWORD FREQUENCY
        # Extract the title and description metadata
        try:
            title = soup.find('title').text
        except:
            try:
                title = soup.find('h1').text
            except:
                title = ""
        try:
            date = find_date(url)
        except:
            date = ""
        # get all paragraphs
        paragraphs = soup.find_all('p')

        # combine paragraphs into a single string
        text = ""
        for paragraph in paragraphs: text += paragraph.text + "\n\n"

        text = filter_text(text)
        return f'TITLE: {title}\n\nDATE: {date}\n\nTEXT: {text}'

    except Exception as e:
        log.error('Error Getting Text', extra={'error': repr(e), 'traceback': traceback.format_exc()})
        return None

def filter_text(input_str):
    # split the string into a list of lines
    lines = input_str.split("\n")

    # create a new list to hold the lines with at least 10 characters
    filtered_lines = []

    # iterate through the lines and check the length
    spam_words = [
        "videosnflnfl",
        "sportsline",
        "cookies",
        "website",
        "web site",
        "browse",
        "trademarks",
        "sponsorship",
        "privacy",
        "terms",
        "contact",
        "advertising",
        "advertisements",
        "advertisers",
        "advertiser",
        "stocks",
        "etfs",
        "yahoo",
        "crypto",
        "click",
        "bonuses",
        "bonus",
        "sync",
        "subscribe",
        "newsletter",
        "fox sports",
        "disclaimer"
        "vox media",
        "ethics statement",
        "terms of use",
        "cbssports.com",
        "cbs sports",
        "copyright",
        "commercial use",
        "unautorized",
        "strictly prohibited",
        "now playing video",
        "how to watch",
        "Weblog",
        "now playing audio",
        "nflnba",
        "21 years and older",
        "pickswise",
        "gambling problem",
        "news and rumors",
        "always free",
        "emailed daily",
        "on sale",
        "draftKings nation",
        "slug:",
        "refers to the act of choosing the winning,"
        "wager based on how many points",
        "moneyline bet involves choosing",
        "new to sports betting or a betting pro",
        "fox bet",
        "see all odds",
        "sportsbookwire",
        "tipico",
        "betftw",
        "thehuddle",
        "predictions and best bets",
        "data from",
        "skip to main",
        "sportsbookset",
        "draftKings nation",
        "https",
        "murder",
        "watch:",
        "score picks",
        "cash in",
        "espnfantasy",
        "listenwatchespn+",
        "fpi prediction",
        "|",
        "picks & predictions",
        "chalkchalk",
        "pickcenter",
        "pick center",
        "twitterfacebook",
        "facebooktwitter",
        "nfl+ is here",
        "espnfantasylistenwatchespn+",
        "bold predictions",
        "a look at all",
        "from the point spread",
        "expert pick from",
        "player prop bet",
        "bettors can wager",
        "anytime touchdown",
        "wager",
        "same game parlay",
        "sgp",
        "same game parlays",
        "nflncaa",
        "nbanhl",
        "nflnba",
        "nflnhl",
        "nbanhl",
        "nhlnba",
        "watchespn",
        "espn app",
        "you win",
        "fantasysportsbookracingcasinohomelog",
        "fantasysportsbook",
        "nflnfl",
        "nbanba",
        "mlbmlb"
        "oddsnfl",
        "picksnfl",
        "oddsnba",
        "picksnba",
        "oddsnhl",
        "picksnhl",
        "oddsmlb",
        "picksmlb",
    ]

    for line in lines:
        if (len(line) >= 100) and (not any(word in line.lower() for word in spam_words)):
            is_spam = False
            #words = line.split(" ")
            #for word in words:
                #if len(word) >= 25:
                #    is_spam = True
            if not is_spam:
                filtered_lines.append(line)

    # join the filtered lines back into a single string
    output_str = "\n".join(filtered_lines)

    return(output_str)

#This now counts the number of keywords vs total words, so it likes keyword density
def count_words(string, keywords):
    try:
        # Initialize a count for the number of occurrences of the words
        count = 0
        string_count = 0
        for i in range(len(keywords)):
            keywords[i] = keywords[i].lower()

        # Split the string into a list of words
        string_words = string.split()

        # Iterate over the list of words
        for string_word in string_words:
            string_word = string_word.lower()
            string_count+= 1
            if string_word in keywords:
                count += 1
    except Exception as e:
        log.error('Error Counting Words', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'input_string': string,
            'keywords': keywords,
        })
        return 0

    keyword_density = (count/string_count) * 1000
    log.info('Counted Words', extra={
        'input_string': string,
        'keywords': keywords,
        'keyword_count': count,
        'string_count': string_count,
        'density': keyword_density,
    })

    return keyword_density

def get_full_prop_name(prop_name):

    if prop_name.lower() == "par":
        prop_name = "Points, Assists, and Rebounds"
    elif prop_name.lower() == "pra":
        prop_name = "Points, Assists, and Rebounds"
    elif prop_name.lower() == "pr":
        prop_name = "Points and Rebounds"
    elif prop_name.lower() == "pa":
        prop_name = "Points and Assists"
    elif prop_name.lower() == "ra":
        prop_name = "Rebounds and Assists"
    elif prop_name.lower() == "sb":
        prop_name = "Steals and Blocks"

    return prop_name

def get_player_data(league, player_name, prop, line, team1_full_name, team2_full_name):
    try:
        line = float(line)
        s3_line_csv_file_path = f'datafiles/{league.upper()}_-_Prop_Stats.pkl'
        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=s3_line_csv_file_path)
        body = csv_obj['Body']
        all_player_data = pickle.loads(body.read())

        prop_name = prop
        if "rebounds" in prop.lower():
            prop = "Total Rebounds"

        if league.upper() in ['NBA', 'NHL', 'MLB']:
            prop = "Player - " + prop
        else:
            prop = "Player - Offense - " + prop

        #TODO- does this need to be updated?
        if league.upper() == "NBA":
            season_name = "Season Year"
            season_year = 2024
        elif league.upper() == "MLB":
            season_name = "Season"
            season_year = 2023
        elif league.upper() == "NHL":
            season_name = "Season Year"
            season_year = 2023
        elif league.upper() == "NFL":
            season_name = "Season Year"
            season_year = 2023

        #Get "Game Name", "Date" and prop where "Player Name" is "LeBron James" and Season Year is 2023
        player_data = all_player_data.loc[(all_player_data["Player Name"].str.lower() == player_name.lower()) & (all_player_data[season_name] == season_year), ["Team", "Opponent", "Game Name", "Date", "Home-Visitor", prop]]

        player_team_name = player_data["Team"].iloc[-1]
        if player_team_name == team1_full_name: opponent = team2_full_name
        else: opponent = team1_full_name

        # Compute the average points scored all season
        average_points_season = player_data[prop].mean().round(2)

        # Select the rows where the player is at home
        home_games = player_data[player_data["Home-Visitor"] == "Home"]

        # Compute the average points scored by the player in home games
        average_home_points = home_games[prop].mean().round(2)

        # Select the rows where the player is Visitor
        visitor_games = player_data[player_data["Home-Visitor"] == "Visitor"]

        # Compute the average points scored by the player in away games
        average_visitor_points = visitor_games[prop].mean().round(2)

        more_than_line = player_data.loc[player_data[prop] > line]

        # Count the number of rows in the resulting DataFrame
        num_games_more_than_line = len(more_than_line)

        # Filter the DataFrame to select games where the player scored less than the line
        less_than_line = player_data.loc[player_data[prop] < line]

        # Count the number of rows in the resulting DataFrame
        num_games_less_than_line = len(less_than_line)

        # Compute the average points scored in the last 5 games
        average_points_last_5 = player_data.tail(5)[prop].mean().round(2)

        # Computer the number of games in the last 5 games where the player scored more than the line
        more_than_line_last_5 = len(player_data.tail(5).loc[player_data[prop] > line])

        # Compute the average points scored in the last 10 games
        average_points_last_10 = player_data.tail(10)[prop].mean().round(2)

        # Computer the number of games in the last 10 games where the player scored more than the line
        more_than_line_last_10 = len(player_data.tail(10).loc[player_data[prop] > line])

        # Compute the average points scored in the last 20 games
        average_points_last_20 = player_data.tail(20)[prop].mean().round(2)

        # Computer the number of games in the last 20 games where the player scored more than the line
        more_than_line_last_20 = len(player_data.tail(20).loc[player_data[prop] > line])

        trend_number = average_points_last_5 - average_points_season
        if trend_number > 0: trend_last_5 = "up"
        else: trend_last_5 = "down"

        trend_number = average_points_last_10 - average_points_season
        if trend_number > 0: trend_last_10 = "up"
        else: trend_last_10 = "down"

        full_prop_name = get_full_prop_name(prop_name)

        string = f"{player_name} is averaging {str(average_points_season)} {full_prop_name.lower()} this season.  At home, he's averaging {str(average_home_points)} {full_prop_name.lower()} this season.  On the road, he's averaging {str(average_visitor_points)} {full_prop_name.lower()} this season. "
        string = string + f"This season he has had more than {line} {full_prop_name.lower()} in {num_games_more_than_line} games and less than {line} {full_prop_name.lower()} in {num_games_less_than_line} games. "
        string = string + f"Over the last 20 games, he's averaging {str(average_points_last_20)} {full_prop_name.lower()} and has had more than {line} {full_prop_name.lower()} in {more_than_line_last_20} games. "
        string = string + f"Over the last 10 games, he's averaging {str(average_points_last_10)} {full_prop_name.lower()} and has had more than {line} {full_prop_name.lower()} in {more_than_line_last_10} games. "
        string = string + f"Over the last 5 games, he's averaging {str(average_points_last_5)} {full_prop_name.lower()} and has had more than {line} {full_prop_name.lower()} in {more_than_line_last_5} games. "
        string = string + f"Over the last 10 games, he's trending {trend_last_10} and over the last 5 games, he's trending {trend_last_5}."

        try:
            opponent_data = player_data.loc[player_data["Opponent"] == opponent]
            opponent_games = len(opponent_data)
            if opponent_games > 0:
                opponent_average = opponent_data[prop].mean().round(2)
                string = string + f"  In {opponent_games} games against {opponent}, he's averaging {str(opponent_average)} {full_prop_name.lower()}."
        except Exception as e:
            log.error('Error Getting Opponent Data', extra={
                'error': repr(e),
                'traceback': traceback.format_exc(),
                'player_data': json.dumps(player_data),
            })
    except Exception as e:
        log.error('Error Getting Player Data', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'league': league,
            'player_name': player_name,
            'prop': prop,
            'line': line,
            'team1': team1_full_name,
            'team2': team2_full_name,
        })
        string = ""

    return string

def get_research(search_terms, league, team1_full_name="", team2_full_name="", bet_type="", player_name="", prop_type="", line=0, bet="", opinion="", writing_preference="", word_count=600,  model="gpt-4o-mini", temperature=0, max_tokens=1000, filename=""):
    try:
        if "prop" in bet_type.lower():
            full_prop_name = get_full_prop_name(prop_type)
            search_terms = str(player_name + " , " + full_prop_name)
            if (team1_full_name not in search_terms) and (team1_full_name != ""):
                search_terms = str(search_terms + " " + team1_full_name)
            if (team2_full_name not in search_terms) and (team2_full_name != ""):
                search_terms = str(search_terms + " " + team2_full_name)

            explore_plus_string = get_player_data(league, player_name, prop_type, line, team1_full_name, team2_full_name)
        else: explore_plus_string = ""

        results = get_search(search_terms + ' predictions', league, num=10) + get_search(search_terms + ' preview', league, num=10) + get_search(search_terms + ' best bets', league, num=10)

        #dedupes results
        all_links = []
        for result in results:
            all_links.append(result["link"])

        deduped_links = list(set(all_links))
        log.info('Got Research Links', extra={'links': deduped_links})

        background_articles = []
        max_workers = 10

        def process_website(website):
            try:
                if len(website) > 50 and all(
                        keyword not in website for keyword in ["lists", "player", "bold", "players"]):
                    text = get_text(website)
                    if 250 < len(text.split()) < 1500:
                        return text
            except Exception as e:
                log.error('Error Processing Website', extra={
                    'error': repr(e),
                    'traceback': traceback.format_exc(),
                    'website': website,
                })
            return None

        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            for result in executor.map(process_website, deduped_links):
                if result: background_articles.append(result)

        background_articles = sorted(background_articles, key=len)

        keywords = search_terms.split()

        # Filter background_articles to include only those that contain at least one of the specified keywords
        background_articles = [article for article in background_articles if count_words(article, keywords) > 2]

        # Sort background_articles based on the count of specified keywords in each article
        background_articles = sorted(background_articles, key=lambda s: count_words(s, keywords), reverse=True)

        # Set the maximum total word count for the selected articles
        max_word_count = 4000
        current_word_count = 0

        # Initialize an empty list to store the selected articles
        selected_articles = []

        # Iterate through the sorted background_articles and add them to the selected_articles list
        # until the total word count reaches or exceeds the max_word_count
        for article in background_articles:
            article_word_count = len(article.split())
            if current_word_count + article_word_count <= max_word_count:
                selected_articles.append(article)
                current_word_count += article_word_count
            else:
                break

        # Update the background_articles list with the selected articles
        background_articles = selected_articles
        background_articles.reverse() #Reverse the order of the background articles

        # Join the background articles into a single string
        background_articles = "\n\n".join(background_articles)

    except Exception as e:
        background_articles = ""
        explore_plus_string = ""
        log.error('Error Getting Research', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'search_terms': search_terms,
            'league': league
        })

    # Resarch and write first draft
    prompt = construct_research_prompt(league, team1_full_name, team2_full_name, bet_type, player_name, prop_type, line, bet, opinion, writing_preference, explore_plus_string, word_count, background_articles)

    content = "You are a sports writer for a world renowned sports publication. You only write factual information based on the research provided to you.  ONLY SEND WHAT IS REQUESTED IN THE EXACT FORMAT THAT IS REQUESTED.  JUST SEND BACK THE JSON FILE"

    json_string = get_open_ai_query_chat_bot_ai(model, prompt, content)

    json_file = load_json(json_string)

    text = "Title: " + json_file["Title"] + "\n\n" + "Lede: " + json_file["Lede"] + "\n\n" + "Body: " + json_file["Body"]

    return text

def construct_data_prompt(message, full_chat, data_received = "", prompt_type = "", summary=""):
    today = datetime.now().strftime('%Y-%m-%d')

    if summary != "":
        summary = f"Here is a further summary of the person's view of the game '{summary}'. "
    if data_received != "":
        data_received = f"Here are the variables we already know: '{data_received}'. "
    if prompt_type != "about_sports":
        model = "llama-3.1-sonar-large-128k-online"
        question = f"Today's date is {today}.  I am a sports writer and researcher.  My boss just gave me the following assignment to write:\n\n{full_chat + ' ' + message}' {summary}{data_received}\n\nPlease send me the following to help me research this assignment: what league is being discussed (NBA, NFL, MLB, NHL, etc.) full player names, any teams referenced or inferred (ie because a player is on that team).  DO NOT SEND ME ANY STATISTICS.  I will be getting these on my own."
        content = "Provide as much context as possible for me to research this task."

        answer = get_answer_from_perplexity(question, content, model)
        message = f"CONTEXT: {answer}\n\nMESSAGE: {message}"
    if prompt_type == "about_sports":
        prompt = f"You are a sports specific chatbot. You receive the following message: '{message}'  Is this message about sports? Just answer Yes/No."
    elif prompt_type == "get_teams_players":
        prompt = f"You are a sports specific chatbot. You receive the following message: '{message}'  What teams and players are explicitly mentioned in this message? Do not assume that a player is on a team, he may have been traded recently.  If a player is mentioned but not a team just return the player.  Also, what league (e.g., NFL, NBA, NHL, MLB) are these players/teams in?  You are allowed to assume the league based on the information given. Answer in the following python format providing full player names and team names (city + full team name): teams=[''], players=[''], league=''"
    elif prompt_type == "summarize_opinion":
        prompt = f"You are a sports specific chatbot. You receive the following message: '{full_chat + ' ' + message}'  Paste any section of this that includes the reasoning the user is making the selection.  If there is no reasoning reply with: FALSE."
    else:
        prompt = f"You are a sports specific chatbot. You receive the following message: '{full_chat + ' ' + message}' {summary}{data_received}" + "In the json format, tell me what this person wants to write about. Leave a term blank if the user did not provide that information. You can guess the league (e.g., NBA, NFL, MLB, NHL) based on the teams. Please provide the full team name (city + full team name). 'bet' should be either a full team name (city + full team name), home, visitor, over or under. Bet type should only be one of the following: spread, moneyline, total score, player prop. prop_type should only be a type of player statistic.  For basketball, prop_type can include more than one stat, for example, (1) Points, Rebounds and Assists; or (2) Points and Assists; (3) Steals and Blocks.  If there is a player name provide the full name of the player.  Line must be a number; do not assume that any number is the line.  The word 'line' or 'spread' or 'total' must be in the sentence.  The user must make clear that the number they are providing is the line.  Please provide abbreviations for leagues. {'league', 'team1_full_name', 'team2_full_name', 'bet_type', 'prop_type', 'player_name', 'line', 'bet'}"

    log.info('Data Prompt Constructed', extra={'prompt': prompt, 'prompt_type': prompt_type})
    return prompt

def construct_research_prompt(league, visitor, home, bet_type, player, prop, line, bet, lean, style, explore_plus_string, words, background_articles = ""):

    if background_articles != "":
        prompt = "START RESEARCH\n\n" + background_articles + "\n\nEND RESEARCH\n\n"
    else:
        prompt = ""
    if explore_plus_string != "":
        prompt += f"Along with the information provided you have been given the following critical additional information from your research team:\n\n{explore_plus_string}\n\n"
    else:
        prompt += ""

    prompt = prompt + f"Today's date is: {datetime.now().strftime('%Y-%m-%d')}\n\n"
    prompt = prompt +  f"You are a sports reporter for a new edgy young data-oriented sports analytics website. You are tasked with writing a story about the upcoming {league} game between {visitor} and {home}.\n"

    prompt = prompt + f"You have been told to write approximately {words} words.\n"

    if "prop" in bet_type.lower():
        full_prop_name = get_full_prop_name(prop)
        prompt = prompt + f"You have been assigned to write about {player}.\n"
        if bet.lower() == "over":
            prompt = prompt + f"You have been told to write about why you are picking the over for {player} {full_prop_name} where the line is {line}.\n"
        else:
            prompt = prompt + f"You have been told to write about why you are picking the under for {player} {full_prop_name} where the line is {line}.\n"
    elif bet_type.lower() == "moneyline":
        if bet.lower() == "home":
            prompt = prompt + f"You have been told to write about why you are picking {home} to win the game.\n"
        elif bet.lower() == "visitor":
            prompt = prompt + f"You have been told to write about why you are picking {visitor} to win the game.\n"
        elif (bet.lower() == "None") or (bet.lower() is None):
            prompt = prompt + f"You have been told to write an analysis of the game and make a specific prediction of who will win, noting that there is always uncertainty in games.\n"
        else:
            prompt = prompt + f"You have been told to write about why you are picking {bet} to win the game.\n"
    elif bet_type.lower() == "spread":
        if bet.lower() == "home":
            prompt = prompt + f"You have been told to write about why you are picking {home} to win against the spread of {line}.\n"
        elif bet.lower() == "visitor":
            prompt = prompt + f"You have been told to write about why you are picking {visitor} to win against the spread of {line}.\n"
        elif (bet.lower() == "None") or (bet.lower() is None):
            prompt = prompt + f"You have been told to write an analysis of the game and make a specific prediction of who will win against the spread of {line}, noting that there is always uncertainty in games.\n"
        else:
            prompt = prompt + f"You have been told to write about why you are picking {bet} to win against the spread of {line}.\n"
    elif bet_type.lower() == "total":
        if bet.lower() == "over":
            prompt = prompt + f"You have been told to write about why you are picking the over for the total score where the line is {line}.\n"
        elif bet.lower() == "under":
            prompt = prompt + f"You have been told to write about why you are picking the under for the total score where the line is {line}.\n"
        else:
            prompt = prompt + f"You have been told to write an analysis of the game and make a specific prediction of whether the total score of the game will be over or under the line of {line}, noting that there is always uncertainty in games.\n"

    prompt = prompt + f"You have been given the following themes to think about when writing your story: {lean}\n"

    prompt = prompt + f"Your writing style has been described as follows (NOTE: this style must be implicit in the text of your article, not explicitly stated): {style}.  You are not allowed to use phrases like 'sure thing', safe bet' or 'guarantee'.  You also are forbidden from using the word 'poised'.\n"

    prompt = prompt + f"Your assignment is to write an based ONLY on the facts and themes presented to you.  You must write the article in the following format (the lee should be one sentence and clearly describe your opinion, the body should be a convincing article supporting your opinion):\n\n"
    prompt = prompt + f"Title\n" + f"Lede\n" + f"Body\n"
    prompt = prompt + "Please send a json with these three fields filld out {'Title': '', 'Lede': '', 'Body': ''}."
    prompt = prompt + "\n\nJUST SEND THE PERFECTLY FORMATTED JSON\n\n"

    log.info('Reserach Prompt Constructed', extra={'prompt': prompt})
    return prompt


def construct_editor_prompt(response):
    prompt = "START DRAFT\n\n" + response + "\n\nEND DRAFT\n\n"
    prompt = prompt + "Imagine a world where you are a writer for an edgy, new, young, sports analytics website. Turn this draft into an article that could be on Barstool Sports. Be inclusive and talk about winning together. Use current Gen Z & Millennial sports and sports betting jargon. Write using the vocabulary that someone at a 5th grade reading level will understand. Also write a concise, short, catchy click-bait title for this article.\nTitle: \nLede: \nBody:\nPlease rewrite the above draft with this in mind using the above format."
    return prompt

def construct_fact_checker_prompt(response):
    prompt = "Imagine a world where you are a fact-checker for a world-renowned sports publication. You received the below article:\n\n"
    prompt = prompt + "START DRAFT\n\n" + response + "\n\nEND DRAFT\n\n"
    prompt = prompt + "You will be sending questions to a very simplistic bot that will try to answer them. Draft a list of every and all factual questions that must be answered to fact-check this article.  Include all statistics or numbers referenced in the article.  Make the questions very simple, straightforward, and detailed enough so the bot can understand.  Each question should address a single fact in the article. Please do not send the bot compound questions. Please do not use words like they, them, or he.  Please use full player and team names in each question.  Put the questions in a python array with each question in quotes. Just send the array."
    return prompt

def construct_fact_check_editor_prompt(response, fact_check):

    prompt = "Imagine a world where you are a fact-check editor for a world-renowned sports publication. You received the below article:\n\n"
    prompt = prompt + "START DRAFT\n\n" + response + "\n\nEND DRAFT\n\n"
    prompt = prompt + "You also received the following fact-checked questions & answers from your fact-checker:\n\n"
    prompt = prompt + "START FACT CHECK\n\n" + fact_check + "\n\nEND FACT CHECK\n\n"
    prompt = prompt + "Please redraft the article removing any incorrect facts based on the fact-checker package.  If anything is unclear, keep the text as it is, only remove clear errors.  Once you have removed incorrect facts, please edit the article so it flows well and SEO optimize the content.  Use the following format:\nTitle: \nLede: \nBody:\n"
    return prompt

def string_to_array(string):
    string = string[string.find("[")+1:string.find("]")]
    string = string.replace('"', "").replace("'", "").replace(", ", ",")
    string_array = string.split(",")
    return string_array

def factcheck_question(league, question):
    try: answer = get_answer_from_perplexity(question)
    except: answer = "I don't know."
    return question, answer

def get_answer_from_perplexity(question, content="Be precise and concise.", model="llama-3.1-sonar-large-128k-online"):
    api_key = PERPLEXITY_API_KEY
    url = "https://api.perplexity.ai/chat/completions"

    # Send the API key as a bearer token in the Authorization header
    payload = {
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": content
            },
            {
                "role": "user",
                "content": question
            }
        ]
    }
    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    response = requests.post(url, json=payload, headers=headers)
    response_json = response.json()

    return response_json['choices'][0]['message']['content']

def add_space_after_period(text):
    result = []
    for i, char in enumerate(text):
        result.append(char)
        if char == '.':
            if i + 1 < len(text):
                next_char = text[i + 1]
                if next_char.isalpha():
                    result.append(' ')
    return ''.join(result)

def full_factcheck(questions, league):
    fact_check_string = ""
    for question in questions:
        try:
            question, answer = factcheck_question(league, question)
            if not "no results" in answer and not "not understand" in answer and not "StatMuse" in question and not "StatMuse" in answer:
                fact_check_string += question + "?\n" + answer + ".\n"
        except:
            pass
    return fact_check_string

def construct_post_prompt(post):
    prompt = post + "\n\n"
    prompt += "You received the above html blog post for https://www.pine-sports.com, a sports analytics website that gives users the ability to build their own AI models and has no code data science tools to analyze historic sports data.  Please add markdown formatting to the post.  Please also fix any typos. Please only send the html."
    return prompt