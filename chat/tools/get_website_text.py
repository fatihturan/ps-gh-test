from datetime import datetime
import time
import asyncio
import pandas as pd
from .helpers import get_text

import logging
log = logging.getLogger('json')

async def get_website_text(url, log_extras, **kwargs):
    start_time = time.time()
    try:
        #sets timeout to 10 seconds
        TIMEOUT = 10
        title, date, text = await asyncio.wait_for(get_text(url, log_extras), timeout=TIMEOUT)
    except asyncio.TimeoutError:
        # Handle timeout by setting title and text to None and date to today
        title, text = None, None
        date = datetime.now().strftime('%Y-%m-%d')

    if not pd.isna(date) and date != "":
        date = pd.to_datetime(date, errors='coerce')
        date = date.strftime('%Y-%m-%d')
    else:
        date = datetime.now().strftime('%Y-%m-%d')

    string = f"Title: {title}\n\nDate: {date}\n\n{text}\n\nURL: {url}\n\n"
    tool_used = "get_website_text"

    research_df = pd.DataFrame(columns=['date', 'string', 'tool_used'])
    research_df = pd.concat([research_df, pd.DataFrame({"date": date, "string": string, "tool_used": tool_used}, index=[0])])

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'url': url,
        'runtime': time.time() - start_time
    })
    return research_df, [] #no models used

# print(f"Start time: {datetime.now()}")
# research_df, models_used_array = asyncio.run(get_website_text(url="https://thegameday.com/mlb/props/"))
# print(f"End time: {datetime.now()}")
# for i, row in research_df.iterrows():
#     for column in research_df.columns:
#         print(f"{column}: {row[column]}")