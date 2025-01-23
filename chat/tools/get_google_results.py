from datetime import datetime, timedelta
import time
import asyncio
import pandas as pd
import aiohttp
from serpapi import GoogleSearch
from .helpers import get_text, get_embeddings, cosine_similarity
from .helpers import SERP_API_KEY

import traceback
import logging
log = logging.getLogger('json')

async def get_search(search_term, date_limitation_for_google_search="day", num=10, is_sports=True, log_extras={}):
    async def fetch_results_json(json_endpoint):
        async with aiohttp.ClientSession() as session:
            async with session.get(json_endpoint) as response:
                results = await response.json()
        return results

    def process_results(results):
        try:
            links_df = pd.DataFrame()
            for result in results['organic_results']:
                try:
                    try: date = result['date']
                    except KeyError: date = datetime.now().strftime('%b %d, %Y')

                    original_date = date
                    if any(unit in date for unit in ["hours", "minutes", "seconds"]):
                        date = datetime.now().strftime('%b %d, %Y')
                    elif "days" in date:
                        day_number = int(date.split(" ")[0])
                        date = (datetime.now() - timedelta(days=day_number)).strftime('%b %d, %Y')

                    links_df = pd.concat([links_df, pd.DataFrame({'link': result['link'], 'original date': original_date, 'date': date, 'snippet': result['snippet']}, index=[0])])
                except Exception as e:
                    log.error('Error Processing Results', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras})
                    continue
        except:
            #sometimes there are no organic results
            links_df = pd.DataFrame(columns=['link', 'date', 'snippet'])

        return links_df['link'].tolist()

    try_counter = 0
    while try_counter < 5:
        if try_counter > 0:
            date_limitation_for_google_search = "week"
            is_sports = False
        try:
            if date_limitation_for_google_search.lower() == "year":
                tbs = "qdr:y"
            elif date_limitation_for_google_search.lower() == "month":
                tbs = "qdr:m"
            elif date_limitation_for_google_search.lower() == "week":
                tbs = "qdr:w"
            elif date_limitation_for_google_search.lower() == "day":
                tbs = "qdr:d"
            elif date_limitation_for_google_search.lower() == "hour":
                tbs = "&tbs=qdr:h"
            else:
                tbs = "qdr:d"

            sites = ""
            if is_sports:
                sports_sites = [
                    "espn.com", "cbssports.com", "theringer.com", "theathletic.com", "nfl.com", "nba.com",
                    "nhl.com", "mlb.com", "foxsports.com", "nbcsports.com", "yardbarker.com", "fanduel.com",
                    "pickswise.com", "ballysports.com", "sportsline.com", "bleacherreport.com", "sbnation.com",
                    "usatoday.com", "foxbet.com", "actionnetwork.com", "sportskeeda.com", "formula1.com",
                    "cricbuzz.com", "espncricinfo.com", "cricket365.com", "cricketworld.com"
                ]
                sites = " OR site:".join(sports_sites)
                sites = "site:" + sites

            search_term = search_term + " " + sites

            params = {
                "q": search_term,
                "location": "New York, United States",
                "hl": "en",
                "gl": "us",
                "num": num,
                "google_domain": "google.com",
                "tbs": tbs,
                "api_key": SERP_API_KEY,
                "async": True,
            }

            search = GoogleSearch(params)
            results = search.get_dict()

            result_status = results['search_metadata']['status']
            if result_status != "Success":
                done = False
                while not done:
                    results_json_endpoint = results['search_metadata']['json_endpoint']
                    results = await fetch_results_json(results_json_endpoint)
                    if results['search_metadata']['status'] == "Success":
                        done = True

            links = await asyncio.to_thread(process_results, results)
            return links

        except Exception as e:
            log.error('Error Searching Google', extra={
                'error': repr(e),
                'traceback': traceback.format_exc(),
                'try': try_counter,
                **log_extras
            })
            try_counter += 1

    return []

# links = asyncio.run(get_search("Who won wimbledon"))
# print(links)

async def get_google_results(question, search_term, date_limitation_for_google_search="day", num=10, is_sports=True, log_extras={}, **kwargs):
    start_time = time.time()
    try:
        links = await get_search(search_term, date_limitation_for_google_search, num, is_sports, log_extras)

        async def process_website(website):
            try:
                if len(website) > 50 and all(keyword not in website for keyword in ["lists", "player", "bold", "players"]):
                    title, date, text = await get_text(website, log_extras)
                    return {"title": title, "date": date, "text": text, "link": website}
            except Exception as e:
                log.error('Error Processing Website', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras})
            return None

        async def remove_non_ascii(input_string):
            if input_string is None: return None
            return ''.join(char for char in input_string if ord(char) < 128)

        async def process_row(row, query_embeddings):
            row_string = f"Title: {row['title']}\n\nDate: {row['date']}\n\n{row['text']}"
            word_count = len(row_string.split())
            if word_count > 4000: row_string = " ".join(row_string.split()[:4000])
            embeddings = await get_embeddings(row_string)
            cosine_sim = await cosine_similarity(embeddings, query_embeddings)
            return embeddings, word_count, cosine_sim

        async def process_dataframe(background_articles):
            background_articles['title'] = await asyncio.gather(*[remove_non_ascii(title) for title in background_articles['title']])
            background_articles['text'] = await asyncio.gather(*[remove_non_ascii(text) for text in background_articles['text']])
            background_articles = background_articles.dropna(subset=['date', 'title', 'text'])
            query_embeddings = await get_embeddings(question)
            results = await asyncio.gather(*[process_row(row, query_embeddings) for _, row in background_articles.iterrows()])
            embeddings, word_counts, cosine_similarities = zip(*results)
            background_articles['embeddings'] = embeddings
            background_articles['cosine_similarity'] = cosine_similarities
            background_articles = background_articles.sort_values('cosine_similarity', ascending=False)
            background_articles = background_articles.reset_index(drop=True)
            background_articles['date'] = pd.to_datetime(background_articles['date'].apply(lambda x: x.split('T')[0].split('+')[0]), errors='coerce', utc=True)
            background_articles['date'] = background_articles['date'].dt.tz_convert('US/Eastern').dt.strftime('%Y-%m-%d')
            background_articles['date'] = pd.to_datetime(background_articles['date'], errors='coerce')
            background_articles['string'] = background_articles.apply(lambda x: f"Title: {x['title']}\n\n{x['text']}", axis=1)
            background_articles = background_articles[['date', 'string']]
            background_articles['tool_used'] = "get_google_results"
            return background_articles

        background_articles = []
        async with aiohttp.ClientSession() as session:
            tasks = [process_website(website) for website in links]
            results = await asyncio.gather(*tasks)
            background_articles = [result for result in results if result]

        if background_articles:
            background_articles_df = pd.DataFrame(background_articles)
            background_articles_df = await process_dataframe(background_articles_df)
        else:
            background_articles_df = pd.DataFrame(columns=['date', 'string', 'tool_used'])
    except:
        background_articles_df = pd.DataFrame(columns=['date', 'string', 'tool_used'])

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'question': question,
        'search_term': search_term,
        'date_limitation': date_limitation_for_google_search,
        'num': num,
        'sports': is_sports,
        'runtime': time.time() - start_time
    })
    return background_articles_df, [] #no models used

# background_articles = asyncio.run(get_google_results("How many sacks did the Giants allow last season", "Giants Sacks Allowed"))
# for i, row in background_articles.iterrows():
#     print(row['date'])
#     print(row['string'])