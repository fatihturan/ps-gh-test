import anthropic
import openai
import asyncio
import os
import json
import re
import aiohttp
from urllib.parse import quote
import pandas as pd
import numpy as np
import tiktoken
import unicodedata
from htmldate import find_date
from bs4 import BeautifulSoup
import time
import random
import sys
import os
from django.db.models import Q

import traceback
import logging
log = logging.getLogger('json')

from data.models import SportsNews, TeamNews, PlayerNews, SportsTweet

AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
SUPABASE_API_KEY = os.environ['SUPABASE_API_KEY']
SUPABASE_URL = os.environ['SUPABASE_URL']
AWS_CHART_BUCKET_NAME = os.environ['USER_CHARTS_BUCKET_S3']
AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']
SERP_API_KEY = os.environ['SERP_API_KEY']
GEMINI_API_KEY = os.environ['GEMINI_API_KEY']
DEEPSEEK_API_KEY = os.environ['DEEPSEEK_API_KEY']

MAX_WORD_COUNT = 20000
MAX_RESULTS = 20

def get_sports_tweet_table(timestamp_ms):
    
    tweet_queryset = SportsTweet.objects.filter(created_at__gt=timestamp_ms)
    data = list(tweet_queryset.values())
    df = pd.DataFrame(data)
    return df

def get_sports_news_table(timestamp_ms,league,players, teams, log_extras):
    
    #Filter all sports news by timestamp and league
    if not league:
        log.warning('No League Provided for GetNews', extra=log_extras)
        news_queryset = SportsNews.objects.filter(published__gt=timestamp_ms).order_by('-published')
    else: 
        news_queryset = SportsNews.objects.filter(published__gt=timestamp_ms,league=league).order_by('-published')

    player_queryset = None
    if players:

        #Get filters for players list
        player_filters = Q()
        for player in players:
            player_filters |= Q(playernews__player__iexact=player)

        #Filter SportsNews by related players
        player_queryset = news_queryset.filter(player_filters).distinct()
    

    team_queryset = None
    if teams: 

        #Get filters for teams list
        team_filters = Q()
        for team in teams:
            team_filters |= Q(teamnews__team__iexact=team)
        
        #Filter SportsNews by related teams
        team_queryset = news_queryset.filter(team_filters).distinct()
    
    if players and teams:
        #If both players and teams perform union of team and player related sportsNews querysets
        final_queryset = player_queryset | team_queryset
    elif players:
        final_queryset = player_queryset
    elif teams:
        final_queryset = team_queryset
    else:
        final_queryset = news_queryset

    #construct player and team columns
    players_col = []
    teams_col = []
    for item in final_queryset:
        players = PlayerNews.objects.filter(sports_news_id=item.id).values_list('player',flat=True)
        players_string = ", ".join(players)
        players_col.append(players_string)
        teams = TeamNews.objects.filter(sports_news_id=item.id).values_list('team',flat=True)
        teams_string = ", ".join(teams)
        teams_col.append(teams_string)


    #Create DataFrame from queryset values and add player and teams columns
    news_data = list(final_queryset.values())
    df = pd.DataFrame(news_data)
    df['players'] = players_col
    df['teams'] = teams_col
    return df
    
async def get_table(table_name, column_name=None, search=None, order_by=None, order="asc", limit=25000, offset=None, search_type="in", counter=0):
    try:
        headers = {
            'apikey': SUPABASE_API_KEY,
            'Authorization': f"Bearer {SUPABASE_API_KEY}"
        }

        if column_name is None:
            url = f"{SUPABASE_URL}/rest/v1/{table_name}?select=%2A"
        elif "null" in str(search).lower():
            url = f"{SUPABASE_URL}/rest/v1/{table_name}?{column_name}=is.null"
        else:
            if search_type == "gt":
                url = f"{SUPABASE_URL}/rest/v1/{table_name}?select=%2A&{column_name}=gt.{search}"
            elif search_type == "lt":
                url = f"{SUPABASE_URL}/rest/v1/{table_name}?select=%2A&{column_name}=lt.{search}"
            else:
                #url = f"{SUPABASE_URL}/rest/v1/{table_name}?select=%2A&{column_name}=in.({search})"
                search_encoded = quote(f"*{search}*")
                url = f"{SUPABASE_URL}/rest/v1/{table_name}?select=%2A&{column_name}=ilike.{search_encoded}"

        if order_by is not None: url += f"&order={order_by}.{order}"
        if limit is not None: url += f"&limit={limit}"
        if offset is not None: url += f"&offset={offset}"

        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=120)) as response:
                response.raise_for_status()
                data = await response.json()

        df = pd.DataFrame(data)

    except Exception as e:
        log.error('Error Getting Table', extra={'error': repr(e), 'traceback': traceback.format_exc()})
        if counter < 5:
            counter += 1
            asyncio.sleep(counter)
            df = await get_table(table_name, column_name, search, order_by, order, limit, offset, search_type, counter)
        else:
            return None

    return df

async def get_embeddings(text):
    openai.api_base = "https://api.openai.com/v1"
    openai.api_type = 'open_ai'
    openai.api_version = None
    openai.api_key = os.environ["OPENAI_API_KEY"]
    word_count = len(text.split())
    # just take the first 3000 words
    if word_count > 3000: text = " ".join(text.split(" ")[:3000])
    if len(text) > 15000: text = text[:15000]

    client = openai.AsyncOpenAI()
    try:
        response = await client.embeddings.create(
            model="text-embedding-3-small",
            input=text,
            encoding_format="float"
        )
        embeddings = response.data[0].embedding

        prompt_tokens = response.usage.prompt_tokens
        total_tokens = response.usage.total_tokens
    except:
        try:
            text = text[:5000]
            response = await client.embeddings.create(
                model="text-embedding-3-small",
                input=text,
                encoding_format="float"
            )
            embeddings = response.data[0].embedding

            prompt_tokens = response.usage.prompt_tokens
            total_tokens = response.usage.total_tokens

        except Exception as e:
            log.error('Error Getting Embeddings', extra={'error': repr(e), 'traceback': traceback.format_exc(), 'raw_string': text})
            embeddings = None
    return embeddings

async def load_json(string):
    def _load():
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
                log.error('Error Extracting JSON', extra={'error': repr(e), 'traceback': traceback.format_exc(), 'raw_string': string})
                return None

    return await asyncio.to_thread(_load)

async def get_open_ai_query(model_name, prompt, content="", max_tokens=4000, temperature=0, sleep_time=1, counter=0, log_extras={}):
    start_time = time.time()
    cached_tokens = 0
    try:
        if "claude" in model_name.lower():
            client = anthropic.AsyncAnthropicBedrock(
                aws_access_key=AWS_ACCESS_KEY_ID,
                aws_secret_key=AWS_SECRET_ACCESS_KEY,
                aws_region="us-west-2"
            )

            #change model names:
            if "sonnet" in model_name.lower():
                model_name = "anthropic.claude-3-5-sonnet-20241022-v2:0"
            elif "haiku" in model_name.lower():
                model_name = "anthropic.claude-3-haiku-20240307-v1:0"
            elif "opus" in model_name.lower():
                model_name = "anthropic.claude-3-opus-20240229-v1:0"

            user_message = {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt
                    }
                ]
            }

            message = await client.messages.create(
                model=model_name,
                max_tokens=max_tokens,
                temperature=1,
                system=content,
                messages=[user_message],
            )

            model = message.model
            input_tokens = message.usage.input_tokens
            output_tokens = message.usage.output_tokens

            text = message.content[0].text
        elif "o1" in model_name.lower():
            openai.api_base = "https://api.openai.com/v1"
            openai.api_type = 'open_ai'
            openai.api_version = None
            openai.api_key = os.environ["OPENAI_API_KEY"]
            client = openai.AsyncOpenAI()

            response = await client.chat.completions.create(
                model=model_name,
                messages=[{"role": "user", "content": prompt}],
                # temperature=temperature,
                # max_tokens=max_tokens,
                # top_p=0.5,
                # frequency_penalty=0,
                # presence_penalty=0,
                # stop=None,
            )

            model = response.model
            input_tokens = response.usage.prompt_tokens
            output_tokens = response.usage.completion_tokens
            text = response.choices[0].message.content

        elif "gemini" in model_name.lower():

            client = openai.AsyncOpenAI(
                api_key=os.environ['GEMINI_API_KEY'],
                base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
            )

            response = await client.chat.completions.create(
                model=model_name,
                messages=[{"role": "system", "content": content}, {"role": "user", "content": prompt}],
                temperature=temperature,
                max_tokens=max_tokens,
                top_p=0.5,
            )

            model = response.model

            text = response.choices[0].message.content

            # encoding = tiktoken.encoding_for_model("gpt-4")
            # input_tokens = len(encoding.encode(content + prompt))
            # output_tokens = len(encoding.encode(text))

            input_tokens = response.usage.prompt_tokens
            output_tokens = response.usage.completion_tokens
        elif "deepseek" in model_name.lower():
            client = openai.AsyncOpenAI(
                api_key=os.environ['DEEPSEEK_API_KEY'],
                base_url="https://api.deepseek.com"
            )

            response = await client.chat.completions.create(
                model=model_name,
                messages=[{"role": "system", "content": content}, {"role": "user", "content": prompt}],
                temperature=temperature,
                max_tokens=max_tokens,
                top_p=0.5,
            )

            print(response)

            model = response.model

            text = response.choices[0].message.content

            # encoding = tiktoken.encoding_for_model("gpt-4")
            # input_tokens = len(encoding.encode(content + prompt))
            # output_tokens = len(encoding.encode(text))

            model = response.model
            input_tokens = response.usage.prompt_tokens
            output_tokens = response.usage.completion_tokens
            try:
                #print("IN TRY")
                cached_tokens = response.usage.prompt_cache_hit_tokens
                #print(f"Cached Tokens: {cached_tokens}")
            except:
                #print("IN EXCEPT")
                try:
                    cached_tokens = response.usage.prompt_tokens_details.catched_tokens
                except:
                    cached_tokens = 0

        else:
            openai.api_base = "https://api.openai.com/v1"
            openai.api_type = 'open_ai'
            openai.api_version = None
            openai.api_key = os.environ["OPENAI_API_KEY"]
            client = openai.AsyncOpenAI()

            response = await client.chat.completions.create(
                model=model_name,
                messages=[{"role": "system", "content": content}, {"role": "user", "content": prompt}],
                temperature=temperature,
                max_tokens=max_tokens,
                top_p=0.5,
                frequency_penalty=0,
                presence_penalty=0,
                #stop=None,
            )

            #print(response)

            model = response.model
            input_tokens = response.usage.prompt_tokens
            output_tokens = response.usage.completion_tokens
            try:
                cached_tokens = response.usage.prompt_tokens_details['cached_tokens']
            except:
                try:
                    cached_tokens = response.usage.prompt_tokens_details.catched_tokens
                except:
                    cached_tokens = 0

            text = response.choices[0].message.content

    except Exception as e:
        #print(traceback.format_exc())
        log.error('Error Getting AI Query', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            'model_name': model_name,
            **log_extras,
        })

        if counter < 5:
            counter += 1
            await asyncio.sleep(sleep_time)
            sleep_time = sleep_time * 2
            response_json = await get_open_ai_query("claude-3-5-sonnet-20240620", prompt, content, max_tokens, temperature, sleep_time, counter, log_extras)
            text = response_json['text']
            model = response_json['model']
            input_tokens = response_json['input_tokens']
            output_tokens = response_json['output_tokens']
            cached_tokens = response_json['cached_tokens']

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

    #return model, input_tokens, output_tokens, text in json format
    response_json = {
        "model": model,
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "cached_tokens": cached_tokens,
        "text": text
    }

    log.info('OpenAI Query Completed', extra={
        'model_called': model_name, #input
        'model_used': model, #output
        'runtime': time.time() - start_time,
        **log_extras,
    })
    return response_json

# prompt="What's the capital of France?"
# response_json = asyncio.run(get_open_ai_query("deepseek-chat", prompt))
# print(response_json)

async def cosine_similarity(vector_a, vector_b):
    """
    Compute the cosine similarity between two vectors.

    Args:
    vector_a (np.array): A numpy array representing the first vector.
    vector_b (np.array): A numpy array representing the second vector.

    Returns:
    float: The cosine similarity between the two vectors.
    """

    def _compute_similarity():
        try:
            # Calculate the dot product of the vectors
            dot_product = np.dot(vector_a, vector_b)

            # Calculate the norm (magnitude) of each vector
            norm_a = np.linalg.norm(vector_a)
            norm_b = np.linalg.norm(vector_b)

            # Calculate the cosine similarity
            similarity = dot_product / (norm_a * norm_b)
        except Exception as e:
            log.error('Error Computing Similarity', extra={'error': repr(e), 'traceback': traceback.format_exc()})
            similarity = None
        return similarity

    similarity = await asyncio.to_thread(_compute_similarity)
    return similarity

async def calculate_similarities(final_news_table, question_embedding):
    similarity_tasks = [
        cosine_similarity(question_embedding, row['embeddings'])
        for _, row in final_news_table.iterrows()
    ]
    similarities = await asyncio.gather(*similarity_tasks)
    final_news_table['cosine_similarity'] = similarities

    return final_news_table

def get_tokens_from_string(string: str) -> int:
    """Returns the number of tokens in a text string."""
    encoding = tiktoken.encoding_for_model("gpt-4")
    num_tokens = len(encoding.encode(string))
    return num_tokens

def remove_accents(input_str):
    # Normalize the string to its decomposed form
    nfkd_form = unicodedata.normalize('NFKD', input_str)
    # Filter out the characters that are not combining marks (accents)
    return ''.join([c for c in nfkd_form if not unicodedata.combining(c)])

async def filter_text(input_str):
    try:
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

        def filter_lines(lines, spam_words):
            filtered_lines = []
            for line in lines:
                if len(line) >= 100 and not any(word in line.lower() for word in spam_words):
                    filtered_lines.append(line)
            return "\n".join(filtered_lines)

        lines = input_str.split("\n")
        output_str = await asyncio.to_thread(filter_lines, lines, spam_words)
    except:
        output_str = input_str

    return output_str

async def get_text(url, log_extras={}):

    #sets timout to 10 seconds
    TIMEOUT = 10

    base_url = url.split("/")[2]

    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Connection": "keep-alive",
        "Referer": f"https://{base_url}/",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "DNT": "1",  # Do Not Track
    }

    userAgents = [
        {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
            "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
        },
        {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            "sec-ch-ua": "\"Google Chrome\";v=\"124\", \"Chromium\";v=\"124\", \"Not.A/Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Win10\"",
        },
        {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
            "sec-ch-ua": "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Win10\"",
        },
        {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
            "sec-ch-ua": "\"Google Chrome\";v=\"124\", \"Chromium\";v=\"124\", \"Not.A/Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
        },
    ]

    headers.update(random.choice(userAgents))

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=TIMEOUT)) as response:
                response.raise_for_status()
                html = await response.text()

        def parse_html(html):
            soup = BeautifulSoup(html, features="html.parser")

            # Kill all script and style elements
            for script in soup(["script", "style"]):
                script.extract()

            # Extract the title and description metadata
            try:
                title = soup.find('title').text
            except:
                try: title = soup.find('h1').text
                except: title = ""

            # Combine paragraphs into a single string
            paragraphs = soup.find_all('p')
            text = "\n\n".join(paragraph.text for paragraph in paragraphs)

            tables = soup.find_all('table')
            table_string = ""
            if tables:
                for table in tables:
                    try:
                        # convert to dataframe
                        df = pd.read_html(str(table), flavor='html5lib')[0]
                        df_string = df.to_string(index=False)
                        table_string += df_string + "\n\n"
                    except:
                        pass
            return title, text, table_string

        title, text, table_string = await asyncio.to_thread(parse_html, html)

        try: date = find_date(url)
        except: date = ""

        text = await filter_text(text)
        text = text + "\n\n" + table_string

    except Exception as e:
        log.error('Error Getting Text', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            **log_extras,
        })
        return None, None, None

    return title, date, text