from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.conf import settings
from chat.models import Chat, Session
from chat.views import get_jaxon_info
from asgiref.sync import sync_to_async
import asyncio
from django.utils import timezone
from openai import AsyncOpenAI
import anthropic
import time
import traceback
import re
import pandas as pd
from chat.tools_main import *
from chat.consumer_messages import *
from chat.consumer_helpers import *
from chat.tools import get_full_chat_history_summary
from chat.tools.helpers import get_open_ai_query
import tiktoken
import uuid
from datetime import datetime
import random

import logging
log = logging.getLogger('json')

#AB TESTING VARIABLES
AB_TEST = False #TODO - MAKE SURE TO SET TO FALSE IN PRODUCTION
AB_TEST_PRO_MODELS = ["gpt-4o-2024-11-20", "deepseek-chat"]
AB_TEST_LITE_MODELS = ["gpt-4o-mini", "deepseek-chat"]


ANTHROPIC_API_KEY = settings.ANTHROPIC_API_KEY
AWS_ACCESS_KEY_ID = settings.AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY = settings.AWS_SECRET_ACCESS_KEY
OPENAI_API_KEY = settings.OPENAI_API_KEY
GEMINI_API_KEY = settings.GEMINI_API_KEY
DEEPSEEK_API_KEY = settings.DEEPSEEK_API_KEY

MAX_WORD_COUNT = 20_000
MAX_MESSAGE_LENGTH = 5_000
MAX_HISTORY_LENGTH = 5_000

class ChatConsumer(AsyncWebsocketConsumer):
    @sync_to_async
    def get_today_chat_count(self):
        today = timezone.now().date()
        return Chat.objects.filter(
            user=self.user,
            created_at__date=today,
            is_pro=True,
            answer__isnull=False
        ).count()

    async def connect(self):
        self.user = self.scope["user"]
        self.username = self.user.username
        path = self.scope['path']

        pattern = r"/chat/ws/chat/([0-9a-fA-F-]{36})//ws"

        match = re.search(pattern, path)
        if match:
            self.chat_session_id = match.group(1)
        else:
            self.chat_session_id = 'error_session'
        
        log.warning('[Consumers] WebSocketConnection', extra={
            "username": self.username,
            "chatSessionId": self.chat_session_id,
        })

        await self.accept()

    async def disconnect(self, close_code):
        log.warning('[Consumers] WebSocketDisconnect', extra={
            "username": self.username,
            "chatSessionId": self.chat_session_id,
            "closeCode": close_code
        })

    @sync_to_async
    def get_max_chat_count(self):
        return self.user.profile.get_question_limit

    async def thumbs_action(self, event):

        chat_id = event.get('chat_id')
        action = event.get('action')

        # Check if both chat_id and action are provided
        if not chat_id or not action:

            log.error('InvalidThumbAction', extra={
                "chatId": chat_id,
                "chatSessionId": self.chat_session_id,
                "thumbAction": action,
                "username": self.username
            })  

            await self.send(text_data=json.dumps({
                'type': 'thumbs_action_response',
                'chat_id': chat_id,
                'action': action,
                'success': False,
                'message': 'Invalid chat_id or action'
            }))
            return

        try:
            # Fetch the chat object asynchronously
            chat = await sync_to_async(Chat.objects.get)(id=chat_id)

            # Update the thumbs_up or thumbs_down based on the action
            if action == 'up':
                chat.thumbs_up = True
                chat.thumbs_down = False
            elif action == 'down':
                chat.thumbs_up = False
                chat.thumbs_down = True
            else:
                await self.send(text_data=json.dumps({
                    'type': 'thumbs_action_response',
                    'chat_id': chat_id,
                    'action': action,
                    'success': False,
                    'message': 'Invalid action'
                }))
                return

            # Save the updated chat object
            await sync_to_async(chat.save)()

            log.info('ThumbAction', extra={
                "chatId": chat_id,
                "chatSessionId": self.chat_session_id,
                "thumbAction": action,
                 "username": self.username
            })  
            # Send success response to the frontend
            await self.send(text_data=json.dumps({
                'type': 'thumbs_action_response',
                'chat_id': chat_id,
                'action': action,
                'success': True,
                'message': 'Thumbs action updated successfully'
            }))

        except Chat.DoesNotExist:
            # Handle case where the chat does not exist
            await self.send(text_data=json.dumps({
                'type': 'thumbs_action_response',
                'chat_id': chat_id,
                'action': action,
                'success': False,
                'message': f'Chat with id {chat_id} does not exist'
            }))


    async def thumbs_feedback(self, event):

        chat_id = event.get('chat_id')
        feedback = event.get('feedback')

        # Check if both chat_id and feedback are provided
        if not chat_id or not feedback:

            log.error('InvalidThumbFeedback', extra={
                "chatId": chat_id,
                "chatSessionId": self.chat_session_id,
                "thumbFeedback": feedback,
                "username": self.username
            })  

            await self.send(text_data=json.dumps({
                'type': 'thumbs_feedback_response',
                'chat_id': chat_id,
                'feedback': feedback,
                'success': False,
                'message': 'Invalid chat_id or feedback'
            }))
            return

        try:
            # Fetch the chat object asynchronously
            chat = await sync_to_async(Chat.objects.get)(id=chat_id)

            # Update the feedback
            chat.feedback = feedback

            #print('feedback: ',feedback)

            # Save the updated chat object
            await sync_to_async(chat.save)()

            log.info('ThumbAction', extra={
                "chatId": chat_id,
                "chatSessionId": self.chat_session_id,
                "thumbFeedback": feedback,
                 "username": self.username
            })  
            # Send success response to the frontend
            await self.send(text_data=json.dumps({
                'type': 'thumbs_feedback_response',
                'chat_id': chat_id,
                'feedback': feedback,
                'success': True,
                'message': 'Thumbs feedback updated successfully'
            }))

        except Chat.DoesNotExist:
            # Handle case where the chat does not exist
            await self.send(text_data=json.dumps({
                'type': 'thumbs_feedback_response',
                'chat_id': chat_id,
                'feedback': feedback,
                'success': False,
                'message': f'Chat with id {chat_id} does not exist'
            }))

    async def stream_final_response(self, model, stream_messages, chat, models_used_array, system_prompt, question_with_research, username, current_chat_count):
        cached_tokens = 0
        if "gpt" in model.lower() or "gemini" in model.lower() or "deepseek" in model.lower():
            if "gpt" in model.lower():
                client = AsyncOpenAI(api_key=OPENAI_API_KEY)
                stream = await client.chat.completions.create(model=model, temperature=0, messages=stream_messages, stream=True, stream_options={"include_usage": True})
            elif "gemini" in model.lower():
                client = AsyncOpenAI(
                    api_key=GEMINI_API_KEY,
                    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
                )
                stream = await client.chat.completions.create(model=model, temperature=0.5, messages=stream_messages, stream=True)
            else:
                client = AsyncOpenAI(
                    api_key=DEEPSEEK_API_KEY,
                    base_url="https://api.deepseek.com"
                )
                stream = await client.chat.completions.create(model=model, temperature=0, messages=stream_messages, stream=True)
            answer = ""

            encoding = tiktoken.encoding_for_model("gpt-4")

            try:
                counter = 0
                chunk_run_id = str(uuid.uuid4())

                model_used_json = {}
                async for chunk in stream:
                    if len(chunk.choices) > 0:
                        if chunk.choices[0].delta.content:
                            if counter == 0:
                                chunk_event = "on_parser_start"
                                chunk_name = "Assistant"
                                chunk_text = ""

                                if "gpt" in model.lower():
                                    chunk_run_id = chunk.id

                                chunk_json = {
                                    "event": chunk_event,
                                    "name": chunk_name,
                                    "run_id": chunk_run_id,
                                    "data": {"chunk": chunk_text},
                                    "chat_id": str(chat.id)  # Include chat_id
                                }
                                await self.send(text_data=json.dumps(chunk_json))

                            chunk_event = "on_parser_stream"
                            chunk_name = "Assistant"

                            if "gpt" in model.lower():
                                chunk_run_id = chunk.id

                            chunk_text = chunk.choices[0].delta.content
                            chunk_json = {
                                "event": chunk_event,
                                "name": chunk_name,
                                "run_id": chunk_run_id,
                                "data": {"chunk": chunk_text},
                                "chat_id": str(chat.id)  # Include chat_id
                            }

                            await self.send(text_data=json.dumps(chunk_json))

                            answer += chunk_text
                            counter += 1
                    if "gpt" in model.lower():
                        if chunk.usage:
                            model = chunk.model
                            input_tokens = chunk.usage.prompt_tokens
                            output_tokens = chunk.usage.completion_tokens

                            try:
                                cached_tokens = chunk.usage.prompt_tokens_details['cached_tokens']
                            except:
                                try:
                                    cached_tokens = chunk.usage.prompt_tokens_details.cached_tokens
                                except:
                                    pass

                            model_used_json = {
                                "model": model,
                                "input_tokens": input_tokens,
                                "output_tokens": output_tokens,
                                "cached_tokens": cached_tokens
                            }

                    elif "deepseek" in model.lower():
                        if chunk.usage:
                            model = chunk.model
                            input_tokens = chunk.usage.prompt_tokens
                            output_tokens = chunk.usage.completion_tokens
                            try:
                                cached_tokens = chunk.usage.prompt_cache_hit_tokens
                            except:
                                pass

                            model_used_json = {
                                "model": model,
                                "input_tokens": input_tokens,
                                "output_tokens": output_tokens,
                                "cached_tokens": cached_tokens
                            }

                    else:
                        model = chunk.model
                        input_tokens = len(encoding.encode(str(stream_messages)))
                        output_tokens = len(encoding.encode(answer))
                        model_used_json = {
                            "model": model,
                            "input_tokens": input_tokens,
                            "output_tokens": output_tokens,
                            "cached_tokens": cached_tokens
                        }

                models_used_array.append(model_used_json)

                await self.send(text_data=json.dumps({
                    'type': 'end_of_stream',
                    'chat_id': str(chat.id)
                }))

            except Exception as e:
                log.error('ModelError', extra={
                    "chatId": chat.id,
                    "chatSessionId": self.chat_session_id,
                    "username": self.username,
                    "error": repr(e),
                    "traceback": traceback.format_exc(),
                    "model": model
                })
                await self.send(text_data=json.dumps({
                    'type': 'assistant_message',
                    'chat_id': str(chat.id),
                    'message': "I'm sorry, I'm having trouble processing your request. Can you please try again?"
                }))
                await self.send(text_data=json.dumps({
                    'type': 'end_of_stream',
                    'chat_id': str(chat.id)
                }))
        else:
            client = anthropic.AsyncAnthropicBedrock(
                aws_access_key=AWS_ACCESS_KEY_ID,
                aws_secret_key=AWS_SECRET_ACCESS_KEY,
                aws_region="us-west-2"
            )

            answer = ""

            try:
                counter = 0
                input_tokens = 0
                output_tokens = 0
                chunk_run_id = str(uuid.uuid4())

                async with client.messages.stream(
                        system=system_prompt,
                        messages=[
                            {"role": "user", "content": question_with_research}
                        ],
                        model=model,
                        max_tokens=4000,
                        temperature=0,
                ) as stream:
                    async for event in stream:
                        if event.type == "message_start":
                            input_tokens = event.message.usage.input_tokens
                        elif event.type == "content_block_delta":
                            if counter == 0:
                                chunk_event = "on_parser_start"
                                chunk_name = "Assistant"
                                chunk_text = ""
                                chunk_json = {
                                    "event": chunk_event,
                                    "name": chunk_name,
                                    "run_id": chunk_run_id,
                                    "data": {"chunk": chunk_text},
                                    "chat_id": str(chat.id)  # Include chat_id
                                }
                                await self.send(text_data=json.dumps(chunk_json))

                            chunk_event = "on_parser_stream"
                            chunk_name = "Assistant"
                            chunk_text = event.delta.text
                            chunk_json = {
                                "event": chunk_event,
                                "name": chunk_name,
                                "run_id": chunk_run_id,
                                "data": {"chunk": chunk_text},
                                "chat_id": str(chat.id)  # Include chat_id
                            }
                            await self.send(text_data=json.dumps(chunk_json))
                            answer += chunk_text
                            counter += 1
                        elif event.type == "message_delta" and event.usage:
                            output_tokens = event.usage.output_tokens

                model_used_json = {
                    "model": model,
                    "input_tokens": input_tokens,
                    "output_tokens": output_tokens,
                    "cached_tokens": cached_tokens
                }

                models_used_array.append(model_used_json)

                await self.send(text_data=json.dumps({
                    'type': 'end_of_stream',
                    'chat_id': str(chat.id)
                }))

            except Exception as e:
                log.error('Model', extra={
                    "chatId": chat.id,
                    "chatSessionId": self.chat_session_id,
                    "username": self.username,
                    "error": repr(e),
                    "traceback": traceback.format_exc(),
                    "model": model
                })

        return answer, models_used_array

    async def get_and_save_answer(self, model, stream_messages, chat, models_used_array, system_prompt, question_with_research, username, current_chat_count, history, google_front_page, temporary_answer, tools_requested, tool_used_string, ab_test=False, ab_test_models=[]):

        answer, models_used_array = await self.stream_final_response(model, stream_messages, chat, models_used_array, system_prompt, question_with_research, username, current_chat_count)

        try:
            models_used_string = json.dumps(models_used_array, indent=2)
        except Exception as e:
            log.error('Error Generating Response', extra={
                "chatId": chat.id,
                "chatSessionId": self.chat_session_id,
                "username": self.username,
                "error": repr(e),
                "traceback": traceback.format_exc(),
                "modelsUsedArray": models_used_array

            })
            models_used_string = ""

        try:
            total_cost = await calculate_cost(models_used_array)

        except Exception as e:
            total_cost = None
            log.error('Error Calculating Cost', extra={
                "chatId": chat.id,
                "chatSessionId": self.chat_session_id,
                "username": self.username,
                "error": repr(e),
                "traceback": traceback.format_exc(),
            })

        if ab_test:
            ab_test_model_one = ab_test_models[0]
            ab_test_model_two = ab_test_models[1]
            answer = f"<{ab_test_model_one} vs. {ab_test_model_two} -- {model} Answer> " + answer

        chat.chat_session_id = self.chat_session_id
        chat.chat_history = history
        chat.google_front_page = google_front_page
        chat.temporary_answer = temporary_answer
        chat.tools_requested = tools_requested
        chat.tools_used = tool_used_string
        chat.question_with_research = question_with_research
        chat.answer = answer
        chat.models_used = models_used_string
        chat.cost = total_cost

        await sync_to_async(chat.save)()

        return answer, models_used_string, total_cost

    async def respond_to_chat_pro(self, text_data_json):

        # define variables for Chat Model
        message = None
        history = None
        temporary_answer = None
        google_front_page = None
        tools_requested = None
        tool_used_string = None
        question_with_research = None
        answer = None
        models_used_array = []
        is_final_answer = False
        username = self.scope["user"]
        message = text_data_json["message"]
        chat = Chat(question=message, user=username, chat_session_id=self.chat_session_id, is_pro=True)
        await sync_to_async(chat.save)()

        log_extras = {
            "chatId": chat.id,
            "chatSessionId": self.chat_session_id,
            "username": self.username,
            "pro": True,
        }

        t0 = time.time()
        startup_time = 0
        tools_required_time = 0
        temp_answer_time = 0
        process_tools_time = 0
        search_terms_time = 0
        get_news_time = 0
        final_answer_time = 0
        final_stream_start_time = 0
        partial_temp_answer_time = 0
        final_research_time = 0
        partial_final_answer_time = 0
        partial_final_stream_start_time = 0

        try:
            is_jaxon_user, current_chat_count, max_chat_count, monthly_period_end_string, customer_portal_url = await asyncio.to_thread(get_jaxon_info, username)

            log.info('ChatStart', extra={
                "isJaxonUser": is_jaxon_user,
                "currentChatCount": current_chat_count,
                "maxChatCount": max_chat_count,
                "monthlyPeriodEnd": monthly_period_end_string,
                "question": message,
                **log_extras,
            })

            #Cut down message length if over max size
            if len(message) > MAX_MESSAGE_LENGTH:
                message = message[:MAX_MESSAGE_LENGTH]
                log.warning('Message over max length', extra={
                    "messageLength": len(message),
                    **log_extras,
                })

            history = text_data_json["history"]


            #Send a default message if user is not a jaxon user
            if not is_jaxon_user:
                log.info('NotJaxonUser', extra=log_extras)     

                not_jaxon_user_message = get_not_jaxon_user_message()
                await self.send(text_data=not_jaxon_user_message)
                await self.send(text_data=json.dumps({
                    'type': 'end_of_stream',
                    'chat_id': str(chat.id)
                }))
                return

            #Send an upgrade message if user has exceeded chat count
            if current_chat_count >= max_chat_count:

                log.warning('MaxChatCount', extra=log_extras)     

                upgrade_message = get_upgrade_message(monthly_period_end_string, customer_portal_url)

                await self.send(text_data=upgrade_message)
                await self.send(text_data=json.dumps({
                    'type': 'end_of_stream',
                    'chat_id': str(chat.id)
                }))
                return
            
            t1 = time.time()
            startup_time = t1 - t0

            try:
                # tools_json, google_front_page, yesterdays_game_string, todays_game_string, statmuse_results_string, models_used_array
                tools_json, leagues, google_front_page, yesterdays_game_string, todays_game_string, statmuse_results_string, models_used_to_get_tools_required = await get_tools_required(
                    message, MAX_HISTORY_LENGTH, history, log_extras)

                t2 = time.time()
                tools_required_time = t2 - t1

                log.info('ToolsRequired', extra={
                    **log_extras,
                    "tools": tools_json,
                    "models": models_used_to_get_tools_required
                })  
                
                # add models_used_to_get_tools_required to models_used_array
                models_used_array += models_used_to_get_tools_required

                temporary_answer = tools_json['temporary_answer']

                temporary_answer = temporary_answer.replace('\n', '<br>')

                await self.send(text_data=temporary_answer)

                t3 = time.time()
                temp_answer_time = t3 - t0
                partial_temp_answer_time = t3 - t2

                log.info('SentTempAnswer', extra={
                    **log_extras,
                    "tempAnswer": temporary_answer,
                    "toolsJson": tools_json
                })

                await asyncio.sleep(.5)


                #region Process Tools
                if "tools" in tools_json:

                    # if length of tools in tools_json is > 0, then process tools
                    if len(tools_json["tools"]) > 0:

                        tools_requested = tools_json["tools"]
                        if isinstance(tools_requested, dict):
                            # Single tool case
                            tools_requested = [tools_requested]

                        google_urls = []
                        if not all('get_plus_ev' in tool['name'] for tool in tools_requested):
                            google_urls = get_urls(google_front_page)
                            tools_requested = await add_tools_pro(google_urls, tools_requested)

                        research_df, models_used_by_tools = await process_tools(tools_requested, log_extras)
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
                t4 = time.time()
                process_tools_time = t4 - t3
                #endregion Process Tools
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
                t4 = time.time()

            #Slim down and optimize research df if needed
            if len(research_df) > 0:
                log.info('GotResearch',extra={
                    **log_extras,
                    "length": len(research_df)
                })
                is_final_answer = False

                research_df = await asyncio.to_thread(get_word_count, research_df)


                if "mlb" in [league.lower() for league in leagues]:
                    final_max_word_count = MAX_WORD_COUNT + 10_000
                else:
                    final_max_word_count = MAX_WORD_COUNT

                if research_df['word_count'].sum() > final_max_word_count:
                    research_df = await get_optimized_research_df(research_df, message, final_max_word_count, log_extras)
                    log.info('GotOptimizedResearch',extra={
                        **log_extras,
                        "length": len(research_df)
                    })

                tool_used_string = await get_tool_used_string(research_df, log_extras)

                # drop word_count
                try:
                    research_df = research_df.drop(columns=['word_count'])
                    # research_df = research_df.drop(columns=['word_count', 'tool_used'])
                except:
                    pass
            
            else:
                log.warning('GotNoResearch',extra=log_extras)
                tool_used_string = ""
                is_final_answer = True
                is_error = False
                try:
                    is_error, is_final_answer, research_df, models_used_array, get_news_time, search_terms_time = await check_for_errors(tools_json, MAX_HISTORY_LENGTH, history, models_used_array, message, yesterdays_game_string, todays_game_string, log_extras, temporary_answer, get_news_time, search_terms_time)

                except Exception as e:
                    log.error('CheckForErrorsError',extra={
                        **log_extras,
                        "error": repr(e),
                        "traceback": traceback.format_exc()
                    })
                    is_error = True
                    is_final_answer = False
                    pass



            log.info('GotFinalResearch',extra={
                **log_extras,
                "length": len(research_df),
                "columns": research_df.columns
            })

            t5 = time.time()
            final_research_time = t5 - t4
            try:
                research_df['date'] = research_df['date'].apply(convert_to_datetime)
            except Exception as e:
                log.error('ConvertDateError',extra={
                    **log_extras,
                    "error": repr(e),
                    "traceback": traceback.format_exc()
                })

            if is_final_answer:
                st0 = time.time()
                if is_error:
                    await self.send(text_data=json.dumps({
                        'type': 'assistant_message',
                        'chat_id': str(chat.id),
                        'message': "I'm sorry, I'm having trouble processing your request. Can you please try again?"
                    }))

                await self.send(text_data=json.dumps({
                    'type': 'end_of_stream',
                    'chat_id': str(chat.id)
                }))
                t6 = None

            else:
                st0 = time.time()

                research_string = await get_research_string(research_df)

                history_string = ""


                if len(history.split()) > MAX_HISTORY_LENGTH:
                    shortened_history = clean_history(MAX_HISTORY_LENGTH, history)

                    #TODO - Continue working on debugging this.  It is causing an error.
                    # print("GETTING FULL CHAT HISTORY SUMMARY")
                    # full_history_summary_df, model_used_array = await get_full_chat_history_summary(history)
                    # full_history_summary = full_history_summary_df['string'].values[0]
                    # models_used_array += model_used_array
                    # history_string = "\n\nSTART FULL CHAT HISTORY SUMMARY\n\n" + full_history_summary + "\n\nEND FULL CHAT HISTORY SUMMARY\n\n"

                else:
                    shortened_history = history

                #This parses the chat history into a list of dictionaries with roles (user, assistant) and content
                recent_messages = await parse_chat_history(shortened_history)

                todays_date_and_time_est = datetime.now().astimezone(pytz.timezone('US/Eastern')).strftime(
                    '%Y-%m-%d %H:%M:%S')

                google_front_page = google_front_page.replace(
                    " (if you want more information about this, use the tool get_website_text and provide this url)",
                    "")

                system_prompt = get_system_prompt()

                # this constructs the question with research prompt
                question_with_research = await get_question_with_research(chat.id, leagues, yesterdays_game_string, todays_game_string, google_front_page, statmuse_results_string, research_string, tool_used_string, todays_date_and_time_est, history_string, message, temporary_answer)

                #stream_messages = [{"role": "system", "content": [{"type": "text", "text": f"{system_prompt}"}]}, {"role": "user", "content": f"{question_with_research}"}]

                # Construct the final stream_messages
                stream_messages = [
                                      {
                                          "role": "system",
                                          "content": [{"type": "text", "text": f"{system_prompt}"}]
                                      }
                                  ] + recent_messages + [
                                      {
                                          "role": "user",
                                          "content": f"{question_with_research}"
                                      }
                                  ]


                t6 = time.time()
                final_stream_start_time = t6 - t0
                partial_final_stream_start_time = t6 - t5


                model = "gpt-4o-2024-11-20"
                # model = "gemini-2.0-flash-exp"
                # model = "anthropic.claude-3-5-sonnet-20241022-v2:0"
                # model = "chatgpt-4o-latest"
                # model = "deepseek-chat"

                if AB_TEST:
                    ab_test_models = AB_TEST_PRO_MODELS

                    #select 2 random models from the list of models
                    random.shuffle(ab_test_models)
                    ab_test_models = ab_test_models[:2]

                    #Get each model
                    ab_test_model_one = ab_test_models[0]
                    ab_test_model_two = ab_test_models[1]

                    #Get answer with first model and save
                    answer, models_used_string, total_cost = await self.get_and_save_answer(ab_test_model_one, stream_messages, chat, models_used_array, system_prompt, question_with_research, username, current_chat_count, history, google_front_page, temporary_answer, tools_requested, tool_used_string, ab_test=AB_TEST, ab_test_models=ab_test_models)

                    #Create a new chat, get answer with second model and save
                    new_chat = Chat(question=message, user=username, chat_session_id=self.chat_session_id)
                    await sync_to_async(new_chat.save)()

                    answer, models_used_string, total_cost = await self.get_and_save_answer(ab_test_model_two, stream_messages, new_chat, models_used_array, system_prompt, question_with_research, username, current_chat_count, history, google_front_page, temporary_answer, tools_requested, tool_used_string, ab_test=AB_TEST, ab_test_models=ab_test_models)

                else:
                    ab_test_models = []

                    answer, models_used_string, total_cost = await self.get_and_save_answer(model, stream_messages, chat, models_used_array, system_prompt, question_with_research, username, current_chat_count, history, google_front_page, temporary_answer, tools_requested, tool_used_string, ab_test=AB_TEST, ab_test_models=ab_test_models)

            final_answer_time = time.time() - st0

            t7 = time.time()
            if t6: partial_final_answer_time = t7 - t6
            else: partial_final_answer_time = t7 - t5

        except Exception as e:
            try:
                models_used_string = json.dumps(models_used_array, indent=2)
            except Exception as e:
                log.error('Error Generating Response', extra={
                    **log_extras,
                    "error": repr(e),
                    "traceback": traceback.format_exc(),
                    "modelsUsedArray": models_used_array

                })
                models_used_string = ""

            try:
                total_cost = await calculate_cost(models_used_array)
            except Exception as e:
                total_cost = None
                log.error('Error Calculating Cost', extra={
                    **log_extras,
                    "error": repr(e),
                    "traceback": traceback.format_exc(),
                })

            log.error('Error Generating Response', extra={
                **log_extras,
                "error": repr(e),
                "traceback": traceback.format_exc()
            })
            await self.send(text_data=json.dumps({
                'type': 'assistant_message',
                'chat_id': str(chat.id),
                'message': "I'm sorry, I'm having trouble processing your request. Can you please try again?"
            }))
            await self.send(text_data=json.dumps({
                'type': 'end_of_stream',
                'chat_id': str(chat.id)
            }))
            t7 = time.time()

        # Considerations... latency - should this be happening here? or at the VERY end of this function?
        #   should we be trying to do this at the same time as streaming the full response?
        #   should this be happening on every question? or only questions that don't need tools?
        #   do we always want to give suggested queries? or have a button a user can click to surface suggestions?
                

        t9 = time.time()
        partial_total_time = t9 - t7
        log.info('SentFinalAnswer', extra={
            **log_extras,
            "question": message,
            "tempAnswer": temporary_answer,
            "answer": answer,
            "modelsUsed": models_used_string,
            "totalCost": total_cost,
            "singleAnswer": is_final_answer,
            "runtime": {
                #Partial Times in order:
                "startup": startup_time,
                "toolsRequired": tools_required_time,
                "partialTempAnswer": partial_temp_answer_time,
                "processTools": process_tools_time,
                "finalResearch": final_research_time,
                "partialStartFinalStream": partial_final_stream_start_time,
                "partialFinalAnswer": partial_final_answer_time,
                "partialTotalResponse": partial_total_time,
                #Overall Runtime
                "totalResponse": t9 - t0,
                #Additional Timing Breakdowns
                "startFinalStream": final_stream_start_time,
                "finalAnswer": final_answer_time,
                "getNews": get_news_time,
                "searchTerms": search_terms_time,
                "tempAnswer": temp_answer_time,
            }
        })

        # If there's no history, create a summary of the question and save it to the session
        if pd.isna(history) or history == "":
            question_summary, model_used_json = await get_question_summary(message)

            models_used_array.append(model_used_json)

            session = await sync_to_async(Session.objects.get)(session_id=self.chat_session_id)
            session.summary = question_summary
            await sync_to_async(session.save)()

        # Send chat ID to the client
        await self.send(text_data=json.dumps({
            'type': 'chat_id',
            'chat_id': chat.id
        }))

    async def respond_to_chat_lite(self, text_data_json):
        # define variables for Chat Model
        message = None
        history = None
        temporary_answer = None
        google_front_page = None
        tools_requested = None
        tool_used_string = None
        question_with_research = None
        answer = None
        models_used_array = []
        is_final_answer = False
        username = self.scope["user"]
        message = text_data_json["message"]
        chat = Chat(question=message, user=username, chat_session_id=self.chat_session_id, is_pro=False)

        await sync_to_async(chat.save)()

        log_extras = {
            "chatId": chat.id,
            "chatSessionId": self.chat_session_id,
            "username": self.username,
            "pro": False,
        }

        # Reset time variables
        t0 = time.time()
        startup_time = 0
        lite_information_time = 0
        process_tools_time = 0
        final_answer_time = 0
        final_stream_start_time = 0
        final_research_time = 0
        partial_final_answer_time = 0
        partial_final_stream_start_time = 0

        try:
            #Get Jaxon User Info
            is_jaxon_user, current_chat_count, max_chat_count, monthly_period_end_string, customer_portal_url = await asyncio.to_thread(get_jaxon_info, username)

            #Log Jaxon User Info
            log.info('ChatStart', extra={
                "isJaxonUser": is_jaxon_user,
                "currentChatCount": current_chat_count,
                "maxChatCount": max_chat_count,
                "monthlyPeriodEnd": monthly_period_end_string,
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

            history = text_data_json["history"]

            # Send a default message if user is not a jaxon user
            if not is_jaxon_user:
                log.info('NotJaxonUser', extra=log_extras)

                not_jaxon_user_message = get_not_jaxon_user_message()
                await self.send(
                    text_data=not_jaxon_user_message)
                await self.send(text_data=json.dumps({
                    'type': 'end_of_stream',
                    'chat_id': str(chat.id)
                }))
                return

            t1 = time.time()
            startup_time = t1 - t0

            #Get lite information - google front page, games, statmuse results
            leagues, google_front_page, yesterdays_game_string, todays_game_string, statmuse_results_string, robust_question, google_search_date_range, models_used_to_get_lite_information = await get_lite_information(message, MAX_HISTORY_LENGTH, history, log_extras)
            #get google front page, yesterday's game string, today's game string, statmuse_results_string

            t2 = time.time()

            lite_information_time = t2 - t1

            #Log that you got lite information
            log.info('LiteInformation', extra=log_extras)

            # add models_used_to_get_tools_required to models_used_array
            models_used_array += models_used_to_get_lite_information

            google_urls = get_urls(google_front_page)
            tools_requested = await add_tools_lite(robust_question, google_search_date_range, google_urls)


            research_df, models_used_by_tools = await process_tools(tools_requested, log_extras)
            models_used_array += models_used_by_tools


            t3 = time.time()
            process_tools_time = t3 - t2
            # endregion Process Tools

            # Slim down and optimize research df if needed
            log.info('GotResearch', extra={
                "length": len(research_df),
                **log_extras,
            })
            is_final_answer = False

            research_df = await asyncio.to_thread(get_word_count, research_df)

            if research_df['word_count'].sum() > MAX_WORD_COUNT:
                research_df = await get_optimized_research_df(research_df, message, MAX_WORD_COUNT,log_extras)
                log.info('GotOptimizedResearch', extra={
                    "length": len(research_df),
                    **log_extras,
                })

            tool_used_string = await get_tool_used_string(research_df, log_extras)

            # drop word_count
            try:
                research_df = research_df.drop(columns=['word_count'])
                # research_df = research_df.drop(columns=['word_count', 'tool_used'])
            except:
                pass

            log.info('GotFinalResearch', extra={
                "length": len(research_df),
                "columns": research_df.columns,
                **log_extras,
            })

            t4 = time.time()
            final_research_time = t4 - t3
            try:
                research_df['date'] = research_df['date'].apply(convert_to_datetime)
            except Exception as e:
                log.error('ConvertDateError', extra={
                    "error": repr(e),
                    "traceback": traceback.format_exc(),
                    **log_extras,
                })

            st0 = time.time()

            research_string = await get_research_string(research_df)

            history_string = ""

            if len(history.split()) > MAX_HISTORY_LENGTH:
                shortened_history = clean_history(MAX_HISTORY_LENGTH, history)

                # TODO - Continue working on debugging this.  It is causing an error.
                # print("GETTING FULL CHAT HISTORY SUMMARY")
                # full_history_summary_df, model_used_array = await get_full_chat_history_summary(history)
                # full_history_summary = full_history_summary_df['string'].values[0]
                # models_used_array += model_used_array
                # history_string = "\n\nSTART FULL CHAT HISTORY SUMMARY\n\n" + full_history_summary + "\n\nEND FULL CHAT HISTORY SUMMARY\n\n"

            else:
                shortened_history = history

            # This parses the chat history into a list of dictionaries with roles (user, assistant) and content
            recent_messages = await parse_chat_history(shortened_history)

            todays_date_and_time_est = datetime.now().astimezone(pytz.timezone('US/Eastern')).strftime(
                '%Y-%m-%d %H:%M:%S')

            google_front_page = google_front_page.replace(
                " (if you want more information about this, use the tool get_website_text and provide this url)",
                "")

            system_prompt = get_system_prompt_lite()

            # this constructs the question with research prompt
            question_with_research = await get_question_with_research_lite(chat.id, leagues, yesterdays_game_string,
                                                                      todays_game_string, google_front_page,
                                                                      statmuse_results_string, research_string,
                                                                      tool_used_string, todays_date_and_time_est,
                                                                      history_string, message)

            # stream_messages = [{"role": "system", "content": [{"type": "text", "text": f"{system_prompt}"}]}, {"role": "user", "content": f"{question_with_research}"}]

            # Construct the final stream_messages
            stream_messages = [
                                  {
                                      "role": "system",
                                      "content": [{"type": "text", "text": f"{system_prompt}"}]
                                  }
                              ] + recent_messages + [
                                  {
                                      "role": "user",
                                      "content": f"{question_with_research}"
                                  }
                              ]

            model = "gpt-4o-mini"
            # model = "gemini-1.5-flash-002"
            # model = "deepseek-chat"

            t5 = time.time()
            final_stream_start_time = t5 - t0
            partial_final_stream_start_time = t5 - t4

            if AB_TEST:
                ab_test_models = AB_TEST_LITE_MODELS

                # select 2 random models from the list of models
                random.shuffle(ab_test_models)
                ab_test_models = ab_test_models[:2]

                # Get each model
                ab_test_model_one = ab_test_models[0]
                ab_test_model_two = ab_test_models[1]

                # Get answer with first model and save
                answer, models_used_string, total_cost = await self.get_and_save_answer(ab_test_model_one, stream_messages, chat, models_used_array, system_prompt, question_with_research, username, current_chat_count, history, google_front_page, temporary_answer, tools_requested, tool_used_string, ab_test=AB_TEST, ab_test_models=ab_test_models)

                # Create a new chat, get answer with second model and save
                new_chat = Chat(question=message, user=username, chat_session_id=self.chat_session_id)
                await sync_to_async(new_chat.save)()

                answer, models_used_string, total_cost = await self.get_and_save_answer(ab_test_model_two, stream_messages, new_chat, models_used_array, system_prompt, question_with_research, username, current_chat_count, history, google_front_page, temporary_answer, tools_requested, tool_used_string, ab_test=AB_TEST, ab_test_models=ab_test_models)

            else:
                ab_test_models = []
                answer, models_used_string, total_cost = await self.get_and_save_answer(model, stream_messages, chat, models_used_array, system_prompt, question_with_research, username, current_chat_count, history, google_front_page, temporary_answer, tools_requested, tool_used_string, ab_test=AB_TEST, ab_test_models=ab_test_models)

            final_answer_time = time.time() - st0

            t6 = time.time()
            if t5: partial_final_answer_time = t6 - t5
            else: partial_final_answer_time = t6 - t4

        except Exception as e:

            try:
                models_used_string = json.dumps(models_used_array, indent=2)
            except Exception as e:
                log.error('Error Generating Response', extra={
                    **log_extras,
                    "error": repr(e),
                    "traceback": traceback.format_exc(),
                    "modelsUsedArray": models_used_array

                })
                models_used_string = ""

            try:
                total_cost = await calculate_cost(models_used_array)
            except Exception as e:
                total_cost = None
                log.error('Error Calculating Cost', extra={
                    **log_extras,
                    "error": repr(e),
                    "traceback": traceback.format_exc(),
                })

            #print(traceback.format_exc())
            log.error('Error Generating Response', extra={
                "error": repr(e),
                "traceback": traceback.format_exc(),
                **log_extras,
            })
            await self.send(text_data=json.dumps({
                'type': 'assistant_message',
                'chat_id': str(chat.id),
                'message': "I'm sorry, I'm having trouble processing your request. Can you please try again?"
            }))
            await self.send(text_data=json.dumps({
                'type': 'end_of_stream',
                'chat_id': str(chat.id)
            }))
            t6 = time.time()

        # Considerations... latency - should this be happening here? or at the VERY end of this function?
        #   should we be trying to do this at the same time as streaming the full response?
        #   should this be happening on every question? or only questions that don't need tools?
        #   do we always want to give suggested queries? or have a button a user can click to surface suggestions?
       

        t8 = time.time()
        partial_total_time = t8 - t6
        log.info('SentFinalAnswer', extra={
            **log_extras,
            "question": message,
            "tempAnswer": temporary_answer,
            "answer": answer,
            "modelsUsed": models_used_string,
            "totalCost": total_cost,
            "singleAnswer": is_final_answer,
            "runtime": {
                # Partial Times in order:
                "startup": startup_time,
                "liteInformation": lite_information_time,
                "processTools": process_tools_time,
                "finalResearch": final_research_time,
                "partialStartFinalStream": partial_final_stream_start_time,
                "partialFinalAnswer": partial_final_answer_time,
                "partialTotalResponse": partial_total_time,
                # Overall Runtime
                "totalResponse": t8 - t0,
                # Additional Timing Breakdowns
                "startFinalStream": final_stream_start_time,
                "finalAnswer": final_answer_time,
            }
        })

        # If there's no history, create a summary of the question and save it to the session
        if pd.isna(history) or history == "":
            question_summary, model_used_json = await get_question_summary(message)

            models_used_array.append(model_used_json)

            session = await sync_to_async(Session.objects.get)(session_id=self.chat_session_id)
            session.summary = question_summary
            await sync_to_async(session.save)()


        # Send chat ID to the client
        await self.send(text_data=json.dumps({
            'type': 'chat_id',
            'chat_id': chat.id
        }))

    async def receive(self, text_data):

        text_data_json = json.loads(text_data)
        print('text_data_json: ',text_data_json)

        if 'action' in text_data_json and 'chat_id' in text_data_json:

            await self.thumbs_action(text_data_json)
        elif 'feedback' in text_data_json and 'chat_id' in text_data_json:
            await self.thumbs_feedback(text_data_json)
        else:
            try:
                is_pro = text_data_json['proMode']
            except:
                is_pro = False
                log.error('Pro Mode Not Set',{})

            if is_pro:
                await self.respond_to_chat_pro(text_data_json)
            else:
                await self.respond_to_chat_lite(text_data_json)
        


