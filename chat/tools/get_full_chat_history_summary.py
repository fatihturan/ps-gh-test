from datetime import datetime
import time
import asyncio
import pandas as pd
import traceback

from .helpers import get_open_ai_query

import logging
log = logging.getLogger('json')

#This gets a summary of the full chat history if the chat is too long to fully put in the prompt
async def get_full_chat_history_summary(history):

    try:
        #get word count of history
        word_count = len(history.split())

        #get last 80,000 words of history
        if word_count > 80_000:
            history = ' '.join(history.split()[-80_000:])

        content = """You are provided a full chat history of a conversation between you and a user.  Your must summarize the chat history in a detailed, comprehensive manner.  This summary will be used to provide comprehensive responses to future questions.  We want future answers to be consistent with prior responses so be extremely detailed, especially with respect to statistics and recommendations.  You must provide ALL statistics, odds, lines and recommendations in this history in your summary.  We want future responses to have access to all of this robust detail.  Your response should just contain this robust, detailed, thorough, comprehensive summary of the chat history."""

        prompt = f"""START CHAT HISTORY\n{history}\nEND CHAT HISTORY
    
        This is an entire chat history of a conversation between you and a user.
        Please provide a detailed comprehensive summary of this conversation.  
        Include all relevant information about the teams mentioned, the players mentioned, the statistics or bets mentioned, the charts included, the stats within the charts, the recommendations you have made.
        Synthesize this information into a detailed summary that will be used to provide comprehensive responses to future questions.
        We want future answers to be consistent with prior responses so be extremely detailed, especially with respect to statistics and recommendations.
        You must provide ALL statistics, odds, lines and recommendations in this history in your summary.  We want future responses to have access to all of this robust detail.
        Your response should just contain this robust, detailed, thorough, comprehensive summary of the chat history."""

        response_json = await get_open_ai_query("gpt-4o-mini", prompt, content)

        response = response_json['text']

        model_used_json = {
            "model": response_json['model'],
            "input_tokens": response_json['input_tokens'],
            "output_tokens": response_json['output_tokens'],
            "cached_tokens": response_json['cached_tokens'],
        }

        response_df = pd.DataFrame(columns=['date', 'string', 'tool_used'])
        response_df = pd.concat([response_df, pd.DataFrame({"date": datetime.now().strftime('%Y-%m-%d'), "string": response, "tool_used": "get_full_chat_history_summary"}, index=[0])])

        return response_df, [model_used_json]

    except Exception as e:
        log.error('Error Getting Chat History Summary', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
        })
        response_df = pd.DataFrame(columns=['date', 'string', 'tool_used'])

        return response_df, []



