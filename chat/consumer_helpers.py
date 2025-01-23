from chat.tools import get_tokens_from_string, get_open_ai_query, get_news, load_json
from chat.consumer_messages import get_google_prompt, suggested_query_sys_prompt, suggested_query_prompt
import pandas as pd
import time
import re
from typing import List, Dict
import requests
import aiohttp
import asyncio
import random
import json
import os

import logging
log = logging.getLogger('json')

script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, 'team_logos.json')
SS_API_KEY = os.getenv('SS_API_KEY')

try:
    with open(file_path, 'r') as file:
        team_logos = json.load(file)
except FileNotFoundError:
    print(f"Error: team_logos.json not found at {file_path}")
    team_logos = {}  # Handle the missing file case appropriately

# get word count for all strings in research_df
def get_word_count(research_df):
    # drop duplicates
    research_df = research_df.drop_duplicates(subset=['string'])
    research_df['word_count'] = research_df['string'].apply(lambda x: get_tokens_from_string(x))
    return research_df


def convert_to_datetime(x):
    if isinstance(x, (int, float)):
        return pd.to_datetime(x, unit='ms')
    else:
        return pd.to_datetime(x)
    
def clean_history(MAX_HISTORY_LENGTH, history):

    # keep only the last MAX_HISTORY_LENGTH words of chat history
    if len(history.split()) > MAX_HISTORY_LENGTH:
        history = " ".join(history.split()[-MAX_HISTORY_LENGTH:])

        # find first instance of You: and remove everything before it
        if "You:" in history:
            history = history[history.index("You:"):]

    return history


# This new function takes the chat history string received when a user asks a question and parses out the history by user and assistant messages.
# This allows us to feed it in properly to the OpenAI API.
async def parse_chat_history(chat_history: str) -> List[Dict[str, str]]:
    """
    Parses a chat history string and converts it into a list of message dictionaries.

    Args:
        chat_history (str): The raw chat history string.

    Returns:
        List[Dict[str, str]]: A list of messages with roles and content.
    """
    # Define regex pattern to split the chat history based on roles
    # The pattern uses a positive lookahead to keep the role indicators in the split result
    split_pattern = re.compile(r'(?m)^(You|Assistant):\s*')

    # Split the chat history while keeping the role indicators
    parts = split_pattern.split(chat_history)

    messages = []
    # If the chat history doesn't start with a role, the first element will be text before any role
    # We can choose to ignore it or handle it accordingly. Here, we'll ignore it.
    if parts and not re.match(r'^(You|Assistant):', chat_history.strip().split('\n', 1)[0]):
        # If there's text before the first role indicator, remove it
        parts.pop(0).strip()


    # Iterate over the parts two at a time: role and content
    for i in range(1, len(parts), 2):
        role = parts[i].strip().lower()
        content = parts[i + 1].strip()

        # Map 'You' to 'user' and 'Assistant' to 'assistant'
        if role == 'you':
            role = 'user'
        elif role == 'assistant':
            role = 'assistant'
        else:
            # If there are other roles, handle them here or skip
            continue

        messages.append({
            "role": role,
            "content": content
        })

    return messages
async def get_search_terms(yesterdays_game_string, todays_game_string, history, message, log_extras):
    st0 = time.time()
    prompt = get_google_prompt(yesterdays_game_string, todays_game_string, history, message)
    content = "You send back Google search terms. Just the terms, nothing else."
    model_name = "gpt-4o-mini"
    response_json = await get_open_ai_query(model_name, prompt, content, log_extras=log_extras)
    search_terms_time= time.time() - st0
    search_terms = response_json['text']
    model = response_json['model']
    input_tokens = response_json['input_tokens']
    output_tokens = response_json['output_tokens']
    cached_tokens = response_json['cached_tokens']

    model_used_json = {
        "model": model,
        "input_tokens": input_tokens,
        "output_tokens": output_tokens,
        "cached_tokens": cached_tokens
    }
    
    return search_terms, search_terms_time, model_used_json

async def get_news_articles(max_history_length, history, models_used_array, message, yesterdays_game_string, todays_game_string, log_extras):

    history = clean_history(max_history_length, history)

    search_terms_time = 0
    # get news articles
    if not pd.isna(history) and history.strip() != "":
        
        search_terms, search_terms_time, model_used_json = await get_search_terms(yesterdays_game_string, todays_game_string, history, message, log_extras)

        models_used_array.append(model_used_json)

        search_terms = search_terms.replace('"', "").replace("'", "")
    else:
        search_terms = message

    st1 = time.time()
    research_df, models_used = await get_news(search_terms)
    get_news_time = time.time() - st1

    models_used_array += models_used
    return research_df, models_used_array, get_news_time, search_terms_time




async def get_blocked_url_keywords():

    # TODO consider creating a database or csv that we can continuously add based on what we see in the logs
    blocked_url_keywords = [
        "youtube",
        "serpapi",
        "reddit",
        "betus.com",
        "bet365.com",
        "collegefootballnews",
        "predictz.com",
        "pickdawgz.com",
        "bettingodds.com",
        "bleachernation.com",
        "iheart.com",
        "sportsinteraction.com",
        "kick.com",
        "oddschecker.com",
        "sportsinteraction.com",
        "oddsportal.com",
        "azscore.com",
        "windrawwin.com",
        "whoscored.com",
        "lineups.com",
        "thelines.com",
        "livescores.biz",
        "pari-bet.in",
        "bets.com"
    ]

    return blocked_url_keywords

async def get_question_summary(message):

    todays_date = pd.Timestamp.now().strftime('%Y-%m-%d')

    prompt = f"""You are a sports-specific chatbot who receives questions about sports.  
                    
                    Today's date is: {todays_date}
                    
                    Below is the first question in a chatbot session.  
                    Please send a very short summary of the question that we can add to the sidebar of our chat UI for the user to refrence later.  Just send the summary.
                    
                    USER MESSAGE: {message}

                    The summary should be something succinct that would look good in a side panel in the UI.  Here are some examples:
                    - Knicks vs. Pacers Overview
                    - 8-Leg NBA Parlay
                    - 2024 NBA Champion Prediction
                    - 2024 NFL MVP Prediction
                    - Cowboys vs. Giants Preview
                    - Top NBA Player Props

                    Just send the summary of the above message in a style similar to the above examples."""
    response_json = await get_open_ai_query("gpt-4o-mini", prompt)
    question_summary = response_json['text']

    model_used_json = {
        "model": response_json['model'],
        "input_tokens": response_json['input_tokens'],
        "output_tokens": response_json['output_tokens'],
        "cached_tokens": response_json['cached_tokens'],
    }

    return question_summary, model_used_json



async def add_tools_pro(google_urls, tools_requested):

    try:
        # add get_website_text to tools_requested for each url in google_urls
        for url in google_urls:

            # Add urls that are consistently erroring out here
            blocked_url_keywords = await get_blocked_url_keywords()

            # Only add the tool request if none of the blocked keywords are in the URL.
            if not any(keyword in url for keyword in blocked_url_keywords):
                tools_requested.append({"name": "get_website_text", "params": {"url": url}})
    except:
        pass

    return tools_requested

async def add_tools_lite(robust_question, google_search_date_range, google_urls):
    # get urls from tools request

    # add get_website_text to tools_requested for each url in google_urls

    tools_requested = []

    # Add get_news to tools_requested
    tools_requested.append({"name": "get_news", "params": {"question": robust_question, "date_range": google_search_date_range}})

    # Get urls from google front page
    for url in google_urls:

        # Add urls that are consistently erroring out here
        blocked_url_keywords = await get_blocked_url_keywords()

        # Only add the tool request if none of the blocked keywords are in the URL.
        if not any(keyword in url for keyword in blocked_url_keywords):
            tools_requested.append({"name": "get_website_text", "params": {"url": url}})

    return tools_requested

async def get_research_string(research_df):
    research_string = "START RESEARCH\n\n"
    for i, row in research_df.iterrows():
        for column in research_df.columns:
            if "tool_used" in column:
                research_string += f"TOOL USED TO GET THIS RESEARCH: {row[column]}\n\n"
                if "get_player_prop_information" in row[column]:
                    research_string += "MAKE SURE TO PUT ANY OF THE DATA FOUND ABOVE THAT IS RELEVANT TO YOUR RESPONSE IN TABLE WITH RELEVANT STATISTICS.  ALWAYS INCLUDE HIT %, the PINE PROJECTION and THE LINE.\n\n"
                    research_string += "WHEN YOU ARE SELECTING PLAYER PROP RECOMMENDATIONS, START WITH THE PROPS THAT HAVE THE LARGEST GAP BETWEEN LINE AND PINE SPORTS AI-POWERED PROJECTION.\n\n"
                    research_string += "IF YOU ARE USING ANY INFORMATION FROM THIS RESEARCH, YOU MUST TO INCLUDE A LINK TO THE PINE URL.\n\n"
                    research_string += "IF YOU SEE A LINK THAT STARTS WITH 'https://ui.sharpsorts.io', this is a link that will direct the user to the bet on the sportsbook. YOU MUST INCLUDE THIS FOR ANY RECOMMENDED BETS. ALWAYS INCLUDE THE POSITION (I.E., OVER, UNDER).\n\n"
                    research_string += "SHARPSPORTS AND PINE LINKS MUST ALWAYS BE MARKDOWN LINKS/INLINE LINKS WITH A DESCRIPTION (LIKE PLAYER NAME, TEAM NAME, BOOK NAME) IN THE TEXT AND THE URL ONLY IN PARENTHESES, e.g. [Book Name](SharpSports Link) or [Player Name](Pine Sports Link). THE URL MUST NEVER APPEAR IN THE TEXT."
                    research_string += "IF YOU ARE MAKING RECOMMENDATIONS, YOUR RECOMMENDATIONS MUST NEVER CONTRADICT THE PINE AI-POWERED PROJECTION. YOU HAVE A LOT OF OPTIONS TO CHOSE FROM, ONLY MAKE RECOMMENDATIONS WHERE THE REST OF THE CONTEXT IN THE RESEARCH SUPPORTS THE PINE AI-POWERED PROJECTION."
                if "lines" in row[column]:
                    research_string += "IF YOU ARE USING ANY INFORMATION FROM THIS RESEARCH, YOU MUST TO INCLUDE A LINK TO THE URL FOR THE BET.\n\n"
                    research_string += "IF YOU SEE A LINK THAT STARTS WITH 'https://ui.sharpsorts.io', this is a link that will direct the user to the bet on the sportsbook. YOU MUST INCLUDE THIS FOR ANY RECOMMENDED BETS. ALWAYS INCLUDE THE POSITION (I.E., OVER, UNDER).\n\n"
                    research_string += "IF YOU ARE USING THIS RESEARCH, YOU MUST INCLUDE ALL THE RELEVANT STATS IN A TABLE.\n\n"
                    research_string += "LINKS MUST ALWAYS BE MARKDOWN LINKS/INLINE LINKS WITH A DESCRIPTION (LIKE PLAYER NAME, TEAM NAME, BOOK NAME) IN THE TEXT AND THE URL ONLY IN PARENTHESES, e.g. [Book Name](SharpSports Link) or [Player Name](Pine Sports Link). THE URL MUST NEVER APPEAR IN THE TEXT."
            elif "date" in column:
                research_string += f"DATE: {row[column]}\n\n"
            else:
                research_string += str(row[column]) + "\n\n"

        research_string += "\n\n"
        research_string += "----------------------------------------"
        research_string += "\n\n"
    research_string += "END RESEARCH"

    return research_string


async def check_temporary_response(temporary_response, log_extras):
    prompt = (
        f"""You check bot answers to see if they promised any follow up information. If they did, respond with True, if not, respond with False. Note: "Feel free to ask any questions" is not promising follow up imformation, but "I'll be back shortly with a detailed preview" is. You also provide a reason for your response.

        Here are a few examples:
        bot_response: Let me gather the latest information and stats on the New York Giants for the upcoming season. I'll be back shortly with a detailed preview.
        your_response: False. Reason: The bot promised to gather more information and get back to the user.

        bot_response: Based on recent predictions, the United States is expected to win the most medals at the 2024 Summer Olympics in Paris. I'll gather more detailed information and get back to you shortly.
        your_response: False. Reason: The bot promised to gather more information and get back to the user.

        both_response: The 2024 Summer Olympics in Paris will officially start on Friday, July 26, 2024, and will run through Sunday, August 11, 2024. Some events will begin as early as Wednesday, July 24, 2024.
        your_response: True. Reason: The bot provided the information without promising to gather more information.

        bot_response: The 2024 Olympics in Paris will start on Friday, July 26, 2024, and will run until Sunday, August 11, 2024. Some events will begin as early as July 24, 2024, before the official opening ceremony.
        your_response: True. Reason: The bot provided the information without promising to gather more information.

        bot_response: Based on recent projections, the United States is expected to win more gold medals than China at the 2024 Olympics. The U.S. is projected to win around 39 gold medals, while China is forecasted to win approximately 34 gold medals. If you need more detailed information or further analysis, feel free to ask!
        your_response: True. Reason: The bot offered to provide more detailed information if needed.

        bot_response: Let me gather the latest information on the New York Giants for the 2024 NFL season. I'll be back with a detailed analysis shortly.
        your_response: False. Reason: The bot promised to gather more information and get back to the user.

        bot_response: The Boston Red Sox have the most strikeouts by a team against left-handed pitchers this season, with 328 strikeouts. If you need more detailed information or stats, feel free to ask!
        your_response: True. Reason: The bot offered to provide more detailed information if needed.

        Here is the bot response you need to review: {temporary_response}"""
    )

    content = "You send back True or False based on whether the bot promised to gather more information and get back to the user."

    model_name = "claude-3-5-sonnet-20240620"
    response_json = await get_open_ai_query(model_name, prompt, content, log_extras=log_extras)

    is_final_answer = response_json['text']
    model_used_json = {
        "model": response_json['model'],
        "input_tokens": response_json['input_tokens'],
        "output_tokens": response_json['output_tokens'],
        "cached_tokens": response_json['cached_tokens'],
    }

    return is_final_answer, model_used_json

async def check_for_errors(tools_json, MAX_HISTORY_LENGTH, history, models_used_array, message, yesterdays_game_string, todays_game_string, log_extras, temporary_answer, get_news_time, search_terms_time):
    if "tools" in tools_json and len(tools_json["tools"]) > 0:

        research_df, models_used_array, get_news_time, search_terms_time = await get_news_articles(MAX_HISTORY_LENGTH, history, models_used_array, message, yesterdays_game_string, todays_game_string, log_extras)
        log.info('GotNewsArticles', extra={
            **log_extras,
            "length": len(research_df)
        })

        if len(research_df) == 0:
            is_error = True
            is_final_answer = False
        else:
            is_error = False
            is_final_answer = False
    else:

        is_final_answer_string, model_used_json = await check_temporary_response(temporary_answer, log_extras)

        log.info('CheckedTempResponses', extra={
            **log_extras,
            "isFinalAnswer": is_final_answer_string
        })

        models_used_array.append(model_used_json)

        if "false" in is_final_answer_string.lower():

            research_df, models_used_array, get_news_time, search_terms_time = await get_news_articles(MAX_HISTORY_LENGTH, history, models_used_array, message, yesterdays_game_string, todays_game_string, log_extras)
            log.info('GotNewsArticles', extra={
                **log_extras,
                "length": len(research_df)
            })

            if len(research_df) == 0:
                is_error = True
                is_final_answer = False
            else:
                is_error = False
                is_final_answer = False

    return is_error, is_final_answer, research_df, models_used_array, get_news_time, search_terms_time
