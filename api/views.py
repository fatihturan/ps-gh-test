from openai import OpenAI
import asyncio
import traceback
import json
import pandas as pd

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import IsAuthenticated

from django.conf import settings
from django.http import StreamingHttpResponse
from django.contrib.auth.models import AnonymousUser

from django.core.exceptions import ValidationError
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.parsers import JSONParser

from chat.tools.helpers import get_open_ai_query
from chat.tools_main import *
from chat.consumer_helpers import *
from chat.consumer_messages import *

import logging

MAX_WORD_COUNT = 20_000
MAX_MESSAGE_LENGTH = 5_000
MAX_HISTORY_LENGTH = 0
history = ""

OPENAI_API_KEY = settings.OPENAI_API_KEY

log = logging.getLogger('json')

class SingleTokenAuthentication(BaseAuthentication):
    def authenticate(self, request):
        # Look for the Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            raise AuthenticationFailed('Authorization header missing.')

        # Check if it starts with "Bearer "
        if not auth_header.startswith('Bearer '):
            raise AuthenticationFailed('Invalid Authorization header format.')

        # Extract the token
        token = auth_header.split(' ')[1]

        #TODO - SAM TO UPDATE THIS WITH STORED TOKEN
        # Replace this with your desired hardcoded token
        expected_token = "token123"

        if token != expected_token:
            raise AuthenticationFailed('Invalid token.')

        # Return AnonymousUser instead of None
        return (AnonymousUser(), None)

class AskView(APIView):
    """
    API endpoint that takes a 'message' as input and returns the response.
    """

    authentication_classes = [SingleTokenAuthentication]

    def get_lite_answer(self, message, need_answer, pine_links, news_links, style_prompt, log_extras):

        lite_model = "gpt-4o-mini"

        history = None
        models_used_array = []

        # Log Jaxon User Info
        log.info('ChatStart', extra={
            "question": message,
            **log_extras,
        })

        # Cut down message length if over max size
        if len(message) > MAX_MESSAGE_LENGTH:
            message = message[:MAX_MESSAGE_LENGTH]
            log.warning('Message over max length', extra={
                "messageLength": len(message),
                **log_extras,
            })

        leagues, google_front_page, yesterdays_game_string, todays_game_string, statmuse_results_string, robust_question, google_search_date_range, models_used_to_get_lite_information = asyncio.run(get_lite_information(message, MAX_HISTORY_LENGTH, history, log_extras))

        # Log that you got lite information
        log.info('LiteInformation', extra=log_extras)

        # add models_used_to_get_tools_required to models_used_array
        models_used_array += models_used_to_get_lite_information

        google_urls = get_urls(google_front_page)

        tools_requested = asyncio.run(add_tools_lite(robust_question, google_search_date_range, google_urls))

        research_df, models_used_by_tools = asyncio.run(process_tools(tools_requested, log_extras))
        models_used_array += models_used_by_tools

        log.info('GotResearch', extra={
            "length": len(research_df),
            **log_extras,
        })

        research_df = get_word_count(research_df)

        if research_df['word_count'].sum() > MAX_WORD_COUNT:
            research_df =  asyncio.run(get_optimized_research_df(research_df, message, MAX_WORD_COUNT, log_extras))
            log.info('GotOptimizedResearch', extra={
                "length": len(research_df),
                **log_extras,
            })

        tool_used_string = asyncio.run(get_tool_used_string(research_df, log_extras))

        # drop word_count
        try:
            research_df = research_df.drop(columns=['word_count'])
        except:
            pass

        try:
            research_df['date'] = research_df['date'].apply(convert_to_datetime)
        except Exception as e:
            log.error('ConvertToDatetimeError', extra={
                **log_extras,
                "error": repr(e),
                "traceback": traceback.format_exc()
            })

        research_string = asyncio.run(get_research_string(research_df))

        history_string = ""

        system_prompt = style_prompt

        chat_id = "api"
        todays_date_and_time_est = datetime.now().astimezone(pytz.timezone('US/Eastern')).strftime('%Y-%m-%d %H:%M:%S')

        # this constructs the question with research prompt
        question_with_research = asyncio.run(get_question_with_research_lite(chat_id, leagues, yesterdays_game_string, todays_game_string, google_front_page, statmuse_results_string, research_string, tool_used_string, todays_date_and_time_est, history_string, message, pine_links=pine_links, news_links=news_links, question_with_research_style_lite=style_prompt))

        log.info('GotQuestionWithResearchPro', extra={
            **log_extras,
            "question_with_research": question_with_research
        })

        if need_answer:
            response_json = asyncio.run(get_open_ai_query(lite_model, question_with_research, system_prompt))

            response = response_json["text"]

            model = response_json["model"]
            input_tokens = response_json["input_tokens"]
            output_tokens = response_json["output_tokens"]
            cached_tokens = response_json["cached_tokens"]

            model_used_json = {
                "model": model,
                "input_tokens": input_tokens,
                "output_tokens": output_tokens,
                "cached_tokens": cached_tokens
            }

            models_used_array.append(model_used_json)

            log.info('GotResponse', extra={
                **log_extras,
                "response": response
            })

        else:
            response = ""

        return question_with_research, response, models_used_array


    def get_pro_answer(self, message, need_answer, pine_links, sharpsports_links, news_links, style_prompt, log_extras):

        pro_model = "gpt-4o-2024-11-20"

        models_used_array = []

        leagues = []
        google_front_page = ""
        research_string = ""
        get_news_time = 0
        search_terms_time = 0

        log.info('ChatStart', extra={
            "question": message,
            **log_extras,
        })

        # Cut down message length if over max size
        if len(message) > MAX_MESSAGE_LENGTH:
            message = message[:MAX_MESSAGE_LENGTH]
            log.warning('Message over max length', extra={
                "messageLength": len(message),
                **log_extras,
            })

        try:
            tools_json, leagues, google_front_page, yesterdays_game_string, todays_game_string, statmuse_results_string, models_used_to_get_tools_required = asyncio.run(get_tools_required(message, MAX_HISTORY_LENGTH, history, log_extras))

            log.info('ToolsRequired', extra={
                **log_extras,
                "tools": tools_json,
                "models": models_used_to_get_tools_required
            })

            # add models_used_to_get_tools_required to models_used_array
            models_used_array += models_used_to_get_tools_required

            temporary_answer = tools_json['temporary_answer']

            # region Process Tools
            if "tools" in tools_json:

                # if length of tools in tools_json is > 0, then process tools
                if len(tools_json["tools"]) > 0:

                    tools_requested = tools_json["tools"]
                    if isinstance(tools_requested, dict):
                        # Single tool case
                        tools_requested = [tools_requested]

                    google_urls = []

                    # if only tools called are plus_ev tools, do not get_website_text
                    if not all('get_plus_ev' in tool['name'] for tool in tools_requested):
                        google_urls = get_urls(google_front_page)
                        tools_requested = asyncio.run(add_tools_pro(google_urls, tools_requested))

                    research_df, models_used_by_tools = asyncio.run(process_tools(tools_requested, log_extras))
                    models_used_array += models_used_by_tools

                else:
                    log.warning('NoToolsRequested', extra={
                        **log_extras,
                        "toolsJson": tools_json
                    })
                    # empty dataframe with columns date and string
                    research_df = pd.DataFrame(columns=['date', 'string', 'tool_used'])
            else:
                log.warning('NoToolsRequested', extra={
                    **log_extras,
                    "toolsJson": tools_json
                })
                # empty dataframe with columns date and string
                research_df = pd.DataFrame(columns=['date', 'string', 'tool_used'])
            is_error = False


        except Exception as e:

            log.error('GetToolsError', extra={
                **log_extras,
                "error": repr(e),
                "traceback": traceback.format_exc()

            })

            tools_json = """{"temporary_answer": "I'm sorry, I'm having trouble processing your request. Can you please try again?"}"""
            yesterdays_game_string = ""
            todays_game_string = ""
            statmuse_results_string = ""
            tools_json = json.loads(tools_json)
            research_df = pd.DataFrame(columns=['date', 'string', 'tool_used'])
            is_error = True
            temporary_answer = tools_json['temporary_answer']

        # Slim down and optimize research df if needed
        if len(research_df) > 0:
            log.info('GotResearch', extra={
                **log_extras,
                "length": len(research_df)
            })
            is_final_answer = False

            research_df = get_word_count(research_df)

            if "mlb" in [league.lower() for league in leagues]:
                final_max_word_count = MAX_WORD_COUNT + 10_000
            else:
                final_max_word_count = MAX_WORD_COUNT

            if research_df['word_count'].sum() > final_max_word_count:
                research_df = asyncio.run(
                    get_optimized_research_df(research_df, message, final_max_word_count, log_extras))
                log.info('GotOptimizedResearch', extra={
                    **log_extras,
                    "length": len(research_df)
                })

            tool_used_string = asyncio.run(get_tool_used_string(research_df, log_extras))

            # drop word_count
            try:
                research_df = research_df.drop(columns=['word_count'])
                # research_df = research_df.drop(columns=['word_count', 'tool_used'])
            except:
                pass

        else:
            log.warning('GotNoResearch', extra=log_extras)
            tool_used_string = ""
            is_final_answer = True
            is_error = False
            try:
                is_error, is_final_answer, research_df, models_used_array, get_news_time, search_terms_time = asyncio.run(
                    check_for_errors(tools_json, MAX_HISTORY_LENGTH, history, models_used_array, message,
                                     yesterdays_game_string, todays_game_string, log_extras, temporary_answer,
                                     get_news_time, search_terms_time))

            except Exception as e:
                log.error('NewsArticleError', extra={
                    **log_extras,
                    "error": repr(e),
                    "traceback": traceback.format_exc()
                })
                is_error = True
                is_final_answer = False
                pass

        log.info('GotFinalResearch', extra={
            **log_extras,
            "length": len(research_df),
            "columns": research_df.columns
        })

        if is_final_answer:
            log.info('FinalAnswer', extra=log_extras)
            response = temporary_answer
            if is_error:
                response = "I'm sorry, I'm having trouble processing your request. Can you please try again?"
        else:
            research_string = asyncio.run(get_research_string(research_df))

        system_prompt = style_prompt

        todays_date_and_time_est = datetime.now().astimezone(pytz.timezone('US/Eastern')).strftime('%Y-%m-%d %H:%M:%S')

        history_string = ""
        chat_id = "api"
        question_with_research = asyncio.run(
            get_question_with_research(chat_id, leagues, yesterdays_game_string, todays_game_string, google_front_page,
                                       statmuse_results_string, research_string, tool_used_string,
                                       todays_date_and_time_est, history_string, message, temporary_answer, pine_links=pine_links, sharpsports_links=sharpsports_links, news_links=news_links, question_with_research_style=style_prompt))

        #Remove string that is in Pine research specific to jaXon.
        question_with_research = question_with_research.replace("IF YOU SEE A LINK THAT STARTS WITH 'https://ui.sharpsorts.io', this is a link that will direct the user to the bet on the sportsbook. YOU MUST INCLUDE THIS FOR ANY RECOMMENDED BETS. ALWAYS INCLUDE THE POSITION (I.E., OVER, UNDER).", "")
        question_with_research = question_with_research.replace("SHARPSPORTS AND PINE LINKS MUST ALWAYS BE MARKDOWN LINKS/INLINE LINKS WITH A DESCRIPTION (LIKE PLAYER NAME, TEAM NAME, BOOK NAME) IN THE TEXT AND THE URL ONLY IN PARENTHESES, e.g. [Book Name](SharpSports Link) or [Player Name](Pine Sports Link). THE URL MUST NEVER APPEAR IN THE TEXT.IF YOU ARE MAKING RECOMMENDATIONS, YOUR RECOMMENDATIONS MUST NEVER CONTRADICT THE PINE AI-POWERED PROJECTION. YOU HAVE A LOT OF OPTIONS TO CHOSE FROM, ONLY MAKE RECOMMENDATIONS WHERE THE REST OF THE CONTEXT IN THE RESEARCH SUPPORTS THE PINE AI-POWERED PROJECTION.", "")


        log.info('GotQuestionWithResearchPro', extra={
            **log_extras,
            "question_with_research": question_with_research
        })

        if need_answer:
            response_json = asyncio.run(get_open_ai_query(pro_model, question_with_research, system_prompt))

            response = response_json["text"]

            model = response_json["model"]
            input_tokens = response_json["input_tokens"]
            output_tokens = response_json["output_tokens"]
            cached_tokens = response_json["cached_tokens"]

            model_used_json = {
                "model": model,
                "input_tokens": input_tokens,
                "output_tokens": output_tokens,
                "cached_tokens": cached_tokens
            }

            models_used_array.append(model_used_json)

            log.info('GotResponse', extra={
                **log_extras,
                "response": response
            })

        else:
            response = ""

        return question_with_research, response, models_used_array

    def post(self, request, format=None):

        # Extract the message from the request body
        message = request.data.get('message', None)

        # Extract the user_id from the request body
        user_id = request.data.get('user_id', None)

        try:
            need_answer = request.data.get('need_answer', None)
            #check if need_answer is a string
            if isinstance(need_answer, str):
                #convert string to boolean
                if need_answer.lower() == "true":
                    need_answer = True
                else:
                    need_answer = False
        except:
            print(traceback.format_exc())
            need_answer = False

        try:
            is_pro = request.data.get('is_pro', None)
            #check if is_pro is a string
            if isinstance(is_pro, str):
                #convert string to boolean
                if is_pro.lower() == "true":
                    is_pro = True
                else:
                    is_pro = False
        except:
            print(traceback.format_exc())
            is_pro = False

        try:
            pine_links = request.data.get('pine_links', None)
            if isinstance(is_pro, str):
                # convert string to boolean
                if pine_links.lower() == "true":
                    pine_links = True
                else:
                    pine_links = False
        except:
            print(traceback.format_exc())
            pine_links = False

        try:
            sharpsports_links = request.data.get('sharpsports_links', None)
            if isinstance(is_pro, str):
                # convert string to boolean
                if sharpsports_links.lower() == "true":
                    sharpsports_links = True
                else:
                    sharpsports_links = False
        except:
            print(traceback.format_exc())
            sharpsports_links = False

        try:
            news_links = request.data.get('news_links', None)
            if isinstance(is_pro, str):
                # convert string to boolean
                if news_links.lower() == "true":
                    news_links = True
                else:
                    news_links = False
        except:
            print(traceback.format_exc())
            news_links = False

        try:
            style_prompt = request.data.get('style_prompt', None)
        except:
            style_prompt = None

        if not message:
            return Response(
                {"error": "A 'message' field is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        if not user_id:
            return Response(
                {"error": "A 'user_id' field is required."},
                status=status.HTTP_400_BAD_REQUEST
            )


        log_extras = {
            "userId": user_id,
            "pro": is_pro,
            "need_answer": need_answer,
            "chat_message": message,
            "pine_links": pine_links,
            "sharpsports_links": sharpsports_links,
            "news_links": news_links,
            "style_prompt": style_prompt
        }

        try:
            if is_pro:
                prompt, response, models_used_array = self.get_pro_answer(message, need_answer, pine_links, sharpsports_links, news_links, style_prompt, log_extras)
            else:
                prompt, response, models_used_array = self.get_lite_answer(message, need_answer, pine_links, news_links, style_prompt, log_extras)

            try:
                total_cost = asyncio.run(calculate_cost(models_used_array))
            except Exception as e:
                total_cost = None
                log.error('Error Calculating Cost', extra={
                    **log_extras,
                    "error": repr(e),
                    "traceback": traceback.format_exc(),
                })
            # Return the answer as the response
            return Response(
                {"message": message, "prompt": prompt, "response": response, "total_cost": total_cost},
                status=status.HTTP_200_OK
            )

        except Exception as e:
            print(f"ERROR: {e}")
            return Response(
                {"error": "An error occurred while processing the request.", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

