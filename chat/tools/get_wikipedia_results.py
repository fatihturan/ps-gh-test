from datetime import datetime
from pytz import timezone
import time
import pandas as pd
import aiohttp
from bs4 import BeautifulSoup

import traceback
import logging
log = logging.getLogger('json')

async def get_wikipedia_results(search_term: str, log_extras: dict, **kwargs) -> pd.DataFrame:
    start_time = time.time()
    try:
        url = "https://en.wikipedia.org/w/api.php"
        params = {
            "action": "query",
            "format": "json",
            "list": "search",
            "srsearch": search_term,
            "utf8": 1,
            "srlimit": 1
        }

        async with aiohttp.ClientSession() as session:
            async with session.get(url, params=params) as response:
                data = await response.json()

                if "query" in data and "search" in data["query"] and len(data["query"]["search"]) > 0:
                    page_id = data["query"]["search"][0]["pageid"]
                    page_title = data["query"]["search"][0]["title"]
                    summary_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{page_title}"
                    async with session.get(summary_url) as summary_response:
                        summary_data = await summary_response.json()
                        summary = summary_data.get("extract", "No summary available.")

                    content_params = {
                        "action": "parse",
                        "format": "json",
                        "pageid": page_id,
                        "prop": "text",
                        "utf8": 1
                    }

                    async with session.get(url, params=content_params) as content_response:
                        content_data = await content_response.json()
                        if "parse" in content_data and "text" in content_data["parse"]:
                            full_page = content_data["parse"]["text"]["*"]
                            soup = BeautifulSoup(full_page, "html.parser")
                            full_page = soup.get_text()
                            # remove everything after "References[edit]"
                            full_page = full_page.split("References[edit]")[0]
                        else:
                            full_page = "No content available."

                else:
                    summary = "No results found."
                    full_page = "No content available."

            final_summary = f"{summary}\n\n{full_page}"

            # create dataframe with date, string, tool_used
            final_summary_df = pd.DataFrame({"date": [datetime.now(timezone('US/Eastern'))], "string": [final_summary], "tool_used": ["get_wikipedia_results"]})
    except Exception as e:
        log.error('ToolError', extra={'error': repr(e), 'traceback': traceback.format_exc(), **log_extras})
        final_summary_df = pd.DataFrame(columns=['date', 'string', 'tool_used'])

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'search_term': search_term,
        'runtime': time.time() - start_time
    })
    return final_summary_df, [] #no models used

# final_summary_df, models_used_array = asyncio.run(get_wikipedia_results("LeBron James"))
# print(final_summary_df['string'][0])