from datetime import datetime
from pytz import timezone
import time
import pandas as pd
import aiohttp
import asyncio
from bs4 import BeautifulSoup
from .helpers import get_open_ai_query
import traceback
import logging
log = logging.getLogger('json')

async def search_statmuse(league: str, query: str, log_extras: dict, **kwargs) -> str:
    start_time = time.time()
    models_used_array = []
    try:
        def process_tables(tables):
            table_string = ""
            for table in tables:
                table_df = pd.read_html(str(table))[0]
                table_string += table_df.to_string() + "\n\n"
            return table_string

        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }

        URL = f'https://www.statmuse.com/{league.lower()}/ask/{query.replace(" ", "-")}'

        async with aiohttp.ClientSession() as session:
            async with session.get(URL, headers=headers) as response:
                content = await response.text()

        soup = BeautifulSoup(content, 'html.parser')
        text = soup.text

        # Process tables asynchronously
        tables = soup.find_all("table")
        table_string = await asyncio.to_thread(process_tables, tables)
        text += table_string
    except:
        text = ""

    model = "gpt-4o-mini"
    #model = "claude-3-haiku-20240307"
    system = "You reveiew questions and results from StatsMuse and pull out all of the relevant information from the StatsMuse data that is responsive to the question."
    prompt = f"""You received the following question: '{query}'. 
    
    We ran this query on StatMuse and got the following results:
    
    {text}
    
    Please review the question and the results from StatsMuse and pull out all of the relevant information from the StatsMuse data that is responsive to the question.  Provide as much detail as possible; however be concise in how you frame the data.  I want your response to be rich with information but concise.  Providing the information in bulleted format with very brief summary is best.  Use as few output tokens as possible to convey as much information as you can.  You have 2 seconds to respond."""

    response_json = await get_open_ai_query(model, prompt, system, log_extras=log_extras)

    model_used_json = {
        "model": response_json['model'],
        "input_tokens": response_json['input_tokens'],
        "output_tokens": response_json['output_tokens'],
        "cached_tokens": response_json['cached_tokens'],
    }
    models_used_array.append(model_used_json)

    result_df = pd.DataFrame({"date": [datetime.now(timezone('US/Eastern'))], "string": [response_json['text']], "tool_used": ["search_statmuse"]})

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': models_used_array,
        'league': league,
        'query': query,
        'runtime': time.time() - start_time
    })
    return result_df, models_used_array