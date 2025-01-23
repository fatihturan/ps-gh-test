import asyncio
import stripe
from datetime import datetime, timedelta
import traceback
import calendar
from dateutil.relativedelta import relativedelta
import pytz
import json
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView, ListView
from django.views import View
from .tools import get_table
from .tools_main import get_sample_questions
from .models import Session, Chat, Survey
from django.contrib.auth.models import User
from django.conf import settings
from calendar import monthrange
from datetime import date, time
import uuid
from django.http import HttpResponseRedirect, JsonResponse
from django.db import IntegrityError
from django.core.serializers import serialize
from asgiref.sync import async_to_sync
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from chat.models import Chat
from chat.consumer_messages import suggested_query_sys_prompt, suggested_query_prompt
from chat.tools import get_tokens_from_string, get_open_ai_query, load_json
from django.core.cache import cache
from urllib.parse import quote_plus
from django.db.utils import DatabaseError




#transaction should fix the database connection error because it will rollback the transaction if there is an error
from django.db import transaction

import logging
log = logging.getLogger('json')
import os
import requests
import aiohttp
import re
from aiohttp import ClientResponseError


import time  # Add this import at the top of your views.py

#Prod Stripe Api Key & Customer Portal Url
stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')
SS_API_KEY = os.getenv('SS_API_KEY')

STRIPE_CUSTOMER_PORTAL_URL = os.environ.get('STRIPE_CUSTOMER_PORTAL_URL')

#"https://billing.stripe.com/p/login/6oEcOD2LPa4M0g0cMM"


MAX_JAXON_USER_GROUP_CHAT_COUNT = 500
ESSENTIAL_MONTHLY_PLAN_LIMIT = 80
PREMIUM_MONTHLY_PLAN_LIMIT = 250
ULTIMATE_MONTHLY_PLAN_LIMIT = 500

tomorrow = (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')
next_week = (datetime.now() + timedelta(days=7)).strftime('%Y-%m-%d')
league_data = {
            'NBA':
                {
                'end_date': tomorrow,
                 'moneylineId': 'MKT_bb279e104ac44dafa8f48ea26406e004',
                 'spreadId': 'MKT_c37761f2ced140bc828ee2462e6cfa65',
                 'totalId': 'MKT_a1fbaee728084dec96f01d9847609459'
                 },
            'NFL': 
                {
                'end_date': next_week,
                'moneylineId': 'MKT_091a1d75cd3643f499f9c2443ca00110',
                'spreadId': 'MKT_aeb49cb9f6504e6195be481ca1ec7f3b',
                'totalId': 'MKT_d9f67399280242b0b37ab3ad555c3340'},
            'NHL': {
                'end_date': tomorrow,
                'moneylineId': 'MKT_60ffd9a59a4d4e008ecfc350ba13221a',
                'spreadId': 'MKT_8f45b79dab2a446388ad34931f540cd6',
                'totalId': 'MKT_639fbd4abf304a81989532b909eb5c18'
                },
                
            'MLB':
                {   
                'end_date': tomorrow,
                'moneylineId': 'MKT_945039fb0b3b49c18b27f69d98826ee6',
                'spreadId': 'MKT_2e6c5ebe4c8d4812aa7987daf58cc754',
                'totalId': 'MKT_0c5fe50042f243629f20d312d31da59e'},
            'NCAAF': {
                'end_date': next_week,
                'moneylineId': 'MKT_cf337332eb21492bacb8b04a2c7ba5fa',
                'spreadId': 'MKT_626b199b7db14995b30a22dc256f4741',
                'totalId': 'MKT_9a24a4053ec44ba48bb5368ef7a6fe19'
            },
            'NCAAMB':
            {
                'end_date': tomorrow,
                'moneylineId': 'MKT_4a8d05093e5f4208a5fef2afbaa8ec9c',
                'spreadId': 'MKT_09d555b443944b80b894379b8323e721',
                'totalId': 'MKT_e99d8c043abf4411b93a2d4b3cdc7449'
            },
        }

bookImages = {
        'mg': {
            'book_id': 'BOOK_pPg9ABaPSj2mL6qoMTKR1A',
            'url': 'https://gamblespot-images.s3.amazonaws.com/betmgm-sports_sq.png'
        },
        'fd': {
            'book_id': 'BOOK_Rf7xRhS7TKQUl94Xkt5w',
            'url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSpDcHBn0QjpOHrHXo3b8GwKsVy89Q-vZiMg&s'
        },
        'ca': {
            'book_id': 'BOOK_IPBQaQQTCRxplZx7SYOA',
            'url': 'https://milehighsports.com/wp-content/uploads/2021/02/Caesars-300-x-300.png'
        },
        'dk': {
            'book_id': 'BOOK_nhLZ9l5DRs6w6KcE2n7vnw',
            'url': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBBWeocVibP40CmAZOeVpyqT70RFaXwqQ2og&s'
        },
        'br': {
            'book_id': 'BOOK_88064cc6787c47ccbd4bbb036c7f55c5',
            'url': 'https://sportsbooksonline-com.imgix.net/assets/local/Company/BetRivers-Square-Logo-2024.jpg'
        },
        'bs': {
            'book_id': 'BOOK_c81242f993894e67966b3ccfc4ba3a65',
            'url': 'https://www.sportsvideo.org/wp-content/uploads/2023/10/ESPN-BET-Logo-Secondary-768x768-1.jpg'
        }
    }

script_dir = os.path.dirname(os.path.abspath(__file__))
file_path = os.path.join(script_dir, 'team_logos.json')
try:
    with open(file_path, 'r') as file:
        team_logos = json.load(file)
except FileNotFoundError:
    print(f"Error: team_logos.json not found at {file_path}")
    team_logos = {}  # Handle the missing file case appropriately

script_dir_templates = os.path.dirname(os.path.abspath(__file__))
file_path_templates = os.path.join(script_dir_templates, 'template_objects.json')
try:
    with open(file_path_templates, 'r') as file:
        templates = json.load(file)
except FileNotFoundError:
    print(f"Error: team_logos.json not found at {file_path_templates}")
    templates = {}  # Handle the missing file case appropriately


def cache_api_response(url: str, response: dict, cache_type: str) -> None:
    """Cache API response with specific TTL based on type"""
    cache_key = quote_plus(url)
    ttl = settings.CACHE_TIMEOUTS.get(cache_type, 300)  # Default 5 minutes
    cache.set(cache_key, response, timeout=ttl)

def get_cached_response(url: str) -> dict:
    """Get cached API response"""
    cache_key = quote_plus(url)
    return cache.get(cache_key)

# get word count for all strings in research_df
def get_word_count(research_df):
    # drop duplicates
    research_df = research_df.drop_duplicates(subset=['string'])
    research_df['word_count'] = research_df['string'].apply(lambda x: get_tokens_from_string(x))
    return research_df

def is_valid_uuid(val):
    try:
        uuid.UUID(str(val))
        return True
    except ValueError:
        return False

def check_jaxon_user(user):
    retry_count = 0
    max_retries = 3
    
    while retry_count < max_retries:
        try:
            with transaction.atomic():
                is_jaxon = user.groups.filter(name='jaxon_user').exists()
                return is_jaxon
                
        except DatabaseError as e:
            retry_count += 1
            log.error('Database error in check_jaxon_user', extra={
                'error': str(e),
                'attempt': retry_count,
                'max_retries': max_retries,
                'user_id': user.id
            })
            if retry_count == max_retries:
                return False
            time.sleep(2 ** retry_count)  # Exponential backoff
    
    return False

def get_current_chat_count(user, start_date):
    if not start_date:
        return 0

    start_date = datetime.fromtimestamp(start_date, tz=pytz.UTC).date()
    count = Chat.objects.filter(
        user=user,
        created_at__date__gte=start_date,
        is_pro=True,  # Filter to count only pro chats
        answer__isnull=False  # Filter to count only chats with answers
    ).count()

    return count

def get_plan_limit(plan):
    try:
        log.info(f"Getting plan limit for {plan}", extra={})

        essential_monthly_plan_limit = ESSENTIAL_MONTHLY_PLAN_LIMIT
        premium_monthly_plan_limit = PREMIUM_MONTHLY_PLAN_LIMIT
        ultimate_monthly_plan_limit = ULTIMATE_MONTHLY_PLAN_LIMIT

        if "essential" in plan.lower():
            return essential_monthly_plan_limit
        elif "premium" in plan.lower():
            return premium_monthly_plan_limit
        elif "ultimate" in plan.lower():
            return ultimate_monthly_plan_limit
        else:
            return 0
    except:
        return 0

def get_customer_ids_with_email(email):

    customer_ids = []

    try:
        customers = stripe.Customer.list(email=email)
        for customer in customers.auto_paging_iter():
            customer_ids.append(customer['id'])

    except stripe.error.StripeError as e:
        log.error('Stripe Error', extra={'error': repr(e), 'traceback': traceback.format_exc()})
    except Exception as e:
        log.error('Unexpected Error', extra={'error': repr(e), 'traceback': traceback.format_exc()})

    return customer_ids

def get_customers_with_pine_username(pine_username):
    customers = []
    try:
        # Fetch all sessions (pagination may be necessary for large datasets)
        sessions = stripe.checkout.Session.list()

        # Loop through sessions to find one that matches the pine_username (client_reference_id)
        for session in sessions.auto_paging_iter():  # This handles pagination automatically
            client_reference_id = session.get('client_reference_id')
            if client_reference_id == pine_username:
                customer_id = session.get('customer')
                if customer_id:
                    customer_email = session['customer_details']['email']
                    customers.append({"customer_id": customer_id, "customer_email": customer_email})
    except Exception as e:
        log.error('Error Retrieving Session', extra={'error': repr(e), 'traceback': traceback.format_exc(), 'pine_username': pine_username})

    return customers


#TODO - get rid of this function.  Can just replace by calling the specific user's stripe info by email

def get_subscription_with_customer_ids(customer_ids, customer_email):
    final_subscription = None
    try:
        for customer_id in customer_ids:
            subscriptions = stripe.Subscription.list(customer=customer_id)
            for subscription in subscriptions.auto_paging_iter():
                if subscription['status'] == 'active':
                    subscription_id = subscription['id']
                    plan = subscription.get('plan', {})
                    plan_id = plan.get('id', '')
                    plan_nickname = plan.get('nickname', '')
                    interval = plan.get('interval', '')
                    amount = plan.get('amount', 0) / 100.0
                    current_period_start = datetime.fromtimestamp(subscription['current_period_start'])
                    current_period_end = datetime.fromtimestamp(subscription['current_period_end'])

                    # Use relativedelta for monthly periods
                    if interval == 'year':
                        monthly_period_start = datetime.now().replace(day=current_period_start.day)
                        monthly_period_end = monthly_period_start + relativedelta(months=1) - timedelta(seconds=1)
                    else:
                        monthly_period_start = current_period_start
                        monthly_period_end = current_period_end

                    # Ensure dates are valid
                    try:
                        monthly_period_start = monthly_period_start.replace(day=current_period_start.day)
                    except ValueError:
                        monthly_period_start = monthly_period_start.replace(day=1) + relativedelta(months=1) - timedelta(days=1)

                    # Update final_subscription if this subscription is better
                    if not final_subscription or amount > final_subscription['amount']:
                        final_subscription = {
                            "customer_id": customer_id,
                            "customer_email": customer_email,
                            "subscription_id": subscription_id,
                            "subscription_interval": interval,
                            "plan_id": plan_id,
                            "plan": plan_nickname,
                            "current_period_start": subscription['current_period_start'],
                            "current_period_end": subscription['current_period_end'],
                            "monthly_period_start": int(monthly_period_start.timestamp()),
                            "monthly_period_end": int(monthly_period_end.timestamp()),
                            "interval": interval,
                            "amount": amount
                        }
    except Exception as e:
        log.error('Error Fetching Subscriptions', extra={'error': repr(e), 'traceback': traceback.format_exc()})

    return final_subscription

def get_subscription_from_email(email):
    subscription = None
    customer_ids = get_customer_ids_with_email(email)
    if len(customer_ids) > 0:
        subscription = get_subscription_with_customer_ids(customer_ids, email)
    return subscription

def get_jaxon_info_api(user):

    # check if user is a string
    if isinstance(user, str):
        # get user object
        user = User.objects.get(username=user)

    current_chat_count = 0
    max_chat_count = 0
    monthly_period_end_string = ""
    is_jaxon_user = False
    customer_portal_url = '/subscribe/'

    #check if user is logged in
    if user.is_authenticated:
        try:
            user_email = user.email

            subscription = get_subscription_from_email(user_email)

            if subscription:
                customer_id = subscription['customer_id']
                customer_email = subscription['customer_email']
                subscription_id = subscription['subscription_id']
                subscription_interval = subscription['subscription_interval']
                plan_id = subscription['plan_id']
                plan = subscription['plan']
                current_period_start = subscription['current_period_start']
                current_period_end = subscription['current_period_end']
                monthly_period_start = subscription['monthly_period_start']
                monthly_period_end = subscription['monthly_period_end']

                #get user's profile
                try:
                    #transaction should fix the database connection error because it will rollback the transaction if there is an error
                    with transaction.atomic():
                        profile = user.profile

                        #update user's profile with stripe info
                        profile.stripe_customer_id = customer_id
                        profile.stripe_subscription_id = subscription_id
                        profile.subscription_interval = subscription_interval
                        profile.subscription_current_period_start = current_period_start
                        profile.subscription_current_period_end = current_period_end
                        profile.plan_id = plan_id
                        profile.plan_nickname = plan

                        #save profile
                        profile.save()


                        current_chat_count = get_current_chat_count(user, monthly_period_start)
                        max_chat_count = get_plan_limit(plan)
                        max_chat_count = max_chat_count
                        monthly_period_end = datetime.utcfromtimestamp(monthly_period_end)
                        monthly_period_end_string = monthly_period_end.strftime('%b. %d')

                        customer_portal_url = STRIPE_CUSTOMER_PORTAL_URL

                        log.info('Jaxon Customer Information', extra={
                            'Customer ID': customer_id,
                            'Customer Email': customer_email,
                            'Plan': plan,
                            'Current Period Start': current_period_start,
                            'Current Period End': current_period_end,
                            'Monthly Period Start': monthly_period_start,
                            'Monthly Period End': monthly_period_end,
                            'Chat Count': current_chat_count,
                            'Max Chat Count': max_chat_count,
                        })
                except Exception as e:
                    log.error('Error Updating Profile', extra={'error': repr(e), 'traceback': traceback.format_exc()})
            else:
                current_chat_count = 0
                max_chat_count = 0
                max_chat_count = max_chat_count
                monthly_period_end_string = ""

            # This makes is_jaxon_user true if the user is in the jaxon_user group or if they are a subscriber (which is get_question_limit).
            if max_chat_count > 0: is_jaxon_user = True

        except Exception as e:
            log.error('error getting Jaxon info', extra={'error': repr(e), 'traceback': traceback.format_exc()})


    return is_jaxon_user, current_chat_count, max_chat_count, monthly_period_end_string, customer_portal_url

def get_jaxon_info(user):

    # check if user is a string
    if isinstance(user, str):
        # get user object
        user = User.objects.get(username=user)

    plan = None
    current_chat_count = 0
    max_chat_count = 0
    monthly_period_end_string = ""
    is_jaxon_user = False
    customer_portal_url = "/subscribe/"

    #check if user is logged in
    if user.is_authenticated:
        try:

            # This is a group we use to give people free access (they have max limit that starts and first of the month)
            is_jaxon_user = check_jaxon_user(user)

            if is_jaxon_user:
                now = datetime.now()

                # Create a new datetime object for the first day of the current month
                monthly_period_start = datetime(now.year, now.month, 1)

                # Convert monthly_period_start to a Unix timestamp
                monthly_period_start_timestamp = monthly_period_start.timestamp()

                # Pass the Unix timestamp to get_current_chat_count
                current_chat_count = get_current_chat_count(user, monthly_period_start_timestamp)

                # This is max chat count for free access users
                max_chat_count = MAX_JAXON_USER_GROUP_CHAT_COUNT

                # Get the last day of the current month
                last_day = calendar.monthrange(now.year, now.month)[1]
                last_day_of_month = datetime(now.year, now.month, last_day)
                monthly_period_end_string = last_day_of_month.strftime('%b. %d') # Convert the date object to a string

                customer_portal_url = STRIPE_CUSTOMER_PORTAL_URL

            else:
                customer_email = user.email
                retry_count = 0
                max_retries = 3
                
                while retry_count < max_retries:
                    try:
                        with transaction.atomic():
                            try:
                                profile = user.profile
                            except user._meta.model.profile.RelatedObjectDoesNotExist:
                                log.error('Profile not found', extra={
                                    'user_id': user.id,
                                    'email': customer_email
                                })
                                return False, 0, 0, "", "/subscribe/"

                            # Get stripe info with null checks
                            customer_id = getattr(profile, 'stripe_customer_id', None) 
                            subscription_id = getattr(profile, 'stripe_subscription_id', None)
                            interval = getattr(profile, 'subscription_interval', None)
                            current_period_start = getattr(profile, 'subscription_current_period_start', None)
                            current_period_end = getattr(profile, 'subscription_current_period_end', None)
                            plan_id = getattr(profile, 'plan_id', None)
                            plan_nickname = getattr(profile, 'plan_nickname', None)

                            if current_period_end:
                                current_period_start = datetime.fromtimestamp(current_period_start)
                                current_period_end = datetime.fromtimestamp(current_period_end)

                                if current_period_end > datetime.now():
                                    if interval == 'year':
                                        now = datetime.now()
                                        days_in_month = monthrange(now.year, now.month)[1]
                                        day_to_use = min(current_period_start.day, days_in_month)
                                        monthly_period_start = now.replace(day=day_to_use)
                                        monthly_period_end = monthly_period_start + relativedelta(months=1) - timedelta(seconds=1)
                                    else:
                                        monthly_period_start = current_period_start
                                        monthly_period_end = current_period_end

                                    monthly_period_start_timestamp = monthly_period_start.timestamp()
                                    current_chat_count = get_current_chat_count(user, monthly_period_start_timestamp)
                                    max_chat_count = get_plan_limit(plan_nickname)
                                    monthly_period_end_string = monthly_period_end.strftime('%b. %d')
                                    customer_portal_url = STRIPE_CUSTOMER_PORTAL_URL

                                    log.info('Jaxon Customer Information', extra={
                                        'Customer ID': customer_id,
                                        'Customer Email': customer_email, 
                                        'Plan': plan_nickname,
                                        'Current Period Start': current_period_start,
                                        'Current Period End': current_period_end,
                                        'Monthly Period Start': monthly_period_start,
                                        'Monthly Period End': monthly_period_end,
                                        'Current Chat Count': current_chat_count,
                                        'Max Chat Count': max_chat_count
                                    })

                                    return True, current_chat_count, max_chat_count, monthly_period_end_string, customer_portal_url

                            return 0, 0, 0, "", "/subscribe/"

                    except DatabaseError as e:
                        retry_count += 1
                        log.error('Database connection error in get_jaxon_info', extra={
                            'error': str(e),
                            'attempt': retry_count,
                            'max_retries': max_retries,
                            'user_id': user.id,
                            'email': customer_email
                        })
                        if retry_count == max_retries:
                            return False, 0, 0, "", "/subscribe/"
                        time.sleep(2 ** retry_count)  # Exponential backoff

                return False, 0, 0, "", "/subscribe/"
        except Exception as e:
            log.error('error getting Jaxon info', extra={'error': repr(e), 'traceback': traceback.format_exc()})

    return is_jaxon_user, current_chat_count, max_chat_count, monthly_period_end_string, customer_portal_url

def calculate_implied_probability(american_odds: float) -> float:
    """
    Calculate the implied probability given American odds.

    Args:
        american_odds (float): The American odds.

    Returns:
        float: Implied probability as a percentage.
    """
    if american_odds > 0:
        # For positive odds (e.g., +150)
        return 100 / (american_odds + 100) * 100
    elif american_odds < 0:
        # For negative odds (e.g., -200)
        return (-american_odds) / (-american_odds + 100) * 100
    else:
        raise ValueError("American odds cannot be zero.")
    
def get_team_logo(team_logos, league, team_name):
    if league not in team_logos:
        print(f"Warning: League '{league}' not found in team_logos")

    return team_logos.get(league, {}).get(team_name, {}).get('WikipediaLogoUrl', None)

def get_team_abbr(team_logos, league, team_name):
    if league not in team_logos:
        print(f"Warning: League '{league}' not found in team_logos")

    return team_logos.get(league, {}).get(team_name, {}).get('abbr', team_name[:3])

async def get_prices(session, event_id, marketId, max_retries=3, base_delay=.5):
    url = f'https://api.sharpsports.io/v1/prices?eventId={event_id}&marketId={marketId}'
    log_extra = {'event_id': event_id, 'marketId': marketId, 'url': url}

    cached = get_cached_response(url)
    if (cached):
        log.info('[Chat View] [get_prices] Got Cached Data', extra=log_extra)
        return cached

    headers = {
        "accept": "application/json",
        "Authorization": f"Token {SS_API_KEY}"
    }
    
    retries = 0
    while retries <= max_retries:
        attempt = retries + 1
        try:
            async with session.get(url, headers=headers) as response:
                if response.status == 429:
                    delay = base_delay * (2 ** retries)
                    log_extra['response']  = str(response)
                    log.warning(f"[Chat View] [get_prices] Rate limited (429) Getting Prices.  Attempt {attempt}" , extra=log_extra)
                    await asyncio.sleep(delay)
                    retries += 1
                    continue
                
                response.raise_for_status()
                data = await response.json()
                cache_api_response(url, data, 'PRICES')
                log_extra['response'] = str(response)
                log.info(f"[Chat View] [get_prices] Successfully got prices.  Attempt {attempt}", extra=log_extra)
                return data
                
        except ClientResponseError as e:
            if e.status == 429 and retries < max_retries:
                delay = base_delay * (2 ** retries)
                log_extra['response'] = str(e)
                log.warning(f"[Chat View] [get_prices] Rate limited (429).  Attempt {attempt}" , extra=log_extra)
                await asyncio.sleep(delay)
                retries += 1
                continue
            log.error(f"Failed with status {e.status} for eventId={event_id}", extra={'attempt': attempt})
            return None
            
        except aiohttp.ClientError as e:
            log_extra['response'] = str(e)
            log.error(f'Error fetching prices for eventId.  Attempt {attempt}', extra=log_extra)
            if retries < max_retries:
                delay = base_delay * (2 ** retries)
                await asyncio.sleep(delay)
                retries += 1
                continue
            return None
    log_extra['max_retries'] = str(max_retries)
    log.error(f"All {max_retries + 1} attempts failed.", extra=log_extra)
    return None

async def get_teammates(player_id):

    player_url = f'https://api.sharpsports.io/v1/players/{player_id}'
    log_extra = {'player_id': player_id, 'url': player_url}

    headers = {
        "accept": "application/json",
        "Authorization": f"Token {SS_API_KEY}"
    }

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(player_url, headers=headers) as response:
                response.raise_for_status()
                data = await response.json()
                log_extra['response'] = str(response)
                log.info('[Chat View] [get_teammates] Successfully got player', extra=log_extra)
                team_id = data.get('currentTeams', [{}])[0].get('id', {})
    
    except aiohttp.ClientError as e:
        log_extra['response'] = str(e)
        log.error('[Chat View] [get_teammates] Error fetching player', extra=log_extra)
        return None


    url = f'https://api.sharpsports.io/v1/players?team={team_id}'
    log_extra = {'team_id': team_id, 'url': url}

    cached = get_cached_response(url)
    if cached:
        log.info('[Chat View] [get_players_by_team] Got Cached Data', extra=log_extra)
        return cached

    
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                data = await response.json()
                cache_api_response(url, data, 'PLAYERS')
                log_extra['response'] = str(response)
                log.info('[Chat View] [get_players_by_team] Successfully got players', extra=log_extra)
                return data
    except aiohttp.ClientError as e:
        log_extra['response'] = str(e)
        log.error('[Chat View] [get_players_by_team] Error fetching players', extra=log_extra)
        return None

async def get_marketselection_metadata(marketSelectionId,line,type,filters=''):
    # if filters then parse the dictionary and add to the url with the structure ?key=value
    filters_dict = json.loads(filters) if filters else None

    log_extra = {'marketSelectionId': str(marketSelectionId), 'line': str(line), 'type': str(type), 'filters': str(filters_dict)}

    # if filters: create a query param string from the dictionary and append to the url
    # e.g. ?key1=value1&key2=value2
    if filters_dict:
        query_params = '&'.join([f'{key}={value}' for key, value in filters_dict.items()])
        url = f'https://api.sharpsports.io/v1/marketSelections/{marketSelectionId}/{type}?line={line}&{query_params}'
    else:
        url = f'https://api.sharpsports.io/v1/marketSelections/{marketSelectionId}/{type}?line={line}'

    log_extra['url'] = url
    
    cached = get_cached_response(url)
    
    if cached:
        log.info('[Chat View] [get_marketselection_metadata] Got Cached Data', extra=log_extra)
        return cached

    headers = {
        "accept": "application/json",
        "Authorization": f"Token {SS_API_KEY}"
    }
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                data = await response.json()
                log_extra['response'] = str(response)
                log.info('[Chat View] [get_marketselection_metadata] Successfully got metadata', extra=log_extra)
                cache_api_response(url, data, 'MARKETSELECTION_METADATA')
                return data
    except aiohttp.ClientError as e:
        log_extra['response'] = str(e)
        log.error('[Chat View] [get_marketselection_metadata] Error fetching metadata', extra=log_extra)
        return None

async def fetch_betcard_data(session, link):
    url = f'https://api.sharpsports.io/v1/marketSelections/{link["marketSelectionId"]}?prices=true'
    # TODO set a cache for betcard data

    log_extra = {'url': url, 'link data': str(link)}
    headers = {
        "accept": "application/json",
        "Authorization": f"Token {SS_API_KEY}"
    }
    try:
        async with session.get(url, headers=headers) as response:
            response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
            response_data = await response.json()
            log_extra['response'] = str(response)
            log.info('[Chat View] [fetch_betcard_data] Got marketSelection', extra=log_extra)
            
            # logic for handling the title
            date = response_data.get('event', {}).get('startTime')
            event = response_data.get('event', {}).get('name')
            id = response_data.get('id')
            propDetails = response_data.get('propDetails', {})
            positionImageUrl = None
            line = None
            title = None

            team_name = response_data.get("position")
            league = response_data.get('event', {}).get('league')
            
            # Debugging information
            if league not in team_logos:
                log_extra['league'] = str(league)
                log.warning(f"Warning: League not found in team_logos")
            
            positionImageUrl = get_team_logo(team_logos, league, team_name)

            

            if propDetails:
                # Get values separately first for clarity
                player = propDetails.get("player")
                team = propDetails.get("team")
                position = response_data.get("position")
                line_value = link["line"] if link["line"] is not None else ""
                metric_special = propDetails.get("metricSpecial")
                proposition = response_data.get('proposition')

                # Format the title with proper f-string syntax
                title = f'{player or team} {position} {line_value} {metric_special or proposition}'
                if propDetails.get("team"):
                    team_name = propDetails.get("team")
                    league = response_data.get('event', {}).get('league')
                    
                    # Debugging information
                    if league not in team_logos:
                        print(f"Warning: League '{league}' not found in team_logos")
                    
                    positionImageUrl = team_logos.get(league, {}).get(team_name, {}).get('WikipediaLogoUrl', None)      
                if propDetails.get("playerId"):
                    player_id = propDetails.get("playerId")
                    positionImageUrl = f'https://player-headshots-sharpsports.s3.us-west-2.amazonaws.com/{player_id}.png'
                    try:
                        response = requests.head(positionImageUrl)

                        if response.status_code != 200:
                            positionImageUrl = 'https://player-headshots-sharpsports.s3.us-west-2.amazonaws.com/Default-Profile-Picture-PNG-Download-Image.png'
                    except requests.RequestException:
                        positionImageUrl = 'https://player-headshots-sharpsports.s3.us-west-2.amazonaws.com/Default-Profile-Picture-PNG-Download-Image.png'
                if propDetails.get("future"):
                    title = f'{response_data.get("position")} {response_data.get("marketName")}'
                        
            else:
                # Define title logic here but for now just use market position + market name
                line = link.get("line")
                if response_data.get('marketName') == 'Spread' and line is not None and line > 0:
                    line = f'+{line}'
                    title = f'{response_data.get("position")} {line or ""}'
                elif response_data.get('marketName') == 'Spread' and line is not None and line < 0:
                    title = f'{response_data.get("position")} {line or ""}'
                else:
                    title = f'{response_data.get("marketName")} - {response_data.get("position")} {line or ""}'
            # need to define and update count for each price

            count = 0
            item = {
                'bets': [],
                'id': id,
                'title': title,
                'count': count
            }
            bets = []
            
            # Iterate over each key in the prices object
            for key, prices in response_data.get('prices', {}).items():
                if prices is None:
                    continue
                # Filter prices to get the one where main is true
                if link["line"]:
                    match_price = next((price for price in prices if price.get('line') == link["line"]), None)
                else:
                    match_price = next((price for price in prices if price.get('main') == True), None)

                
                if match_price:
                # TODO - implement logic to calculate expected value, and/or implied probability, and/or sharp score

                    betMetric = 'Implied Probability'
                    odds = match_price.get('odds')
                    if odds is not None:
                        try:
                            implied_probability = calculate_implied_probability(odds)
                            betMetricValue = f'{implied_probability:.2f}%'
                        except ValueError as ve:
                            print(f'Error calculating implied probability for odds {odds}: {ve}')
                            betMetricValue = 'N/A'
                    else:
                        print(f'Odds not found for key {key}. Assigning N/A to betMetricValue.')
                        betMetricValue = 'N/A'

                    line = str(match_price.get('line'))
                    if response_data.get('proposition') == 'spread' and match_price.get('line') > 0:
                        line = f'+{line}'

                    if line == '0.0':
                        line = 'PK'

                    odds = str(match_price.get('odds'))
                    if match_price.get('odds') > 0:
                        odds = f'+{odds}'
                
                # select a random matric from list and assign to betMetric
                    bet = {
                        'line': line,
                        'odds': odds,
                        'bookImage': bookImages.get(key,{}).get('url'),
                        'date': date,
                        'event': event,
                        'id': key,
                        'betMetric':betMetric,
                        'betMetricValue':betMetricValue,
                        'positionImageUrl':positionImageUrl,
                        'betPlaceUrl': f'https://ui.sharpsports.io/place/{id}/{bookImages.get(key,{}).get("book_id")}?line={match_price.get("line")}'
                    }
                    bets.append(bet)
                    count += 1
                    log_extra.update(bet)
                    log.info('[Chat View] [fetch_betcard_data] Got bet', extra=log_extra)
            if bets:
                item['bets'] = bets
                item['count'] = count
                log.info(f'[Chat View] [fetch_betcard_data] Returning {count} bets', extra=log_extra)
                return id, item
    except aiohttp.ClientError as e:
        log_extra['response'] = str(e)
        log.error('[Chat View] [fetch_betcard_data] Error fetching betcard data', extra=log_extra)
        return None

#TODO - fix the chatId function

async def get_infobox_items(answer, chat_id):
    # Define the regex pattern to match marketSelectionId and line with word boundaries
    pattern = r'\bhttps://ui.sharpsports.io/place/(?P<marketSelectionId>MRKT_[a-zA-Z0-9]+)/BOOK_[a-zA-Z0-9]+(?:\?line=(?P<line>-?[0-9.]+))?\b'
    
    log_extra = {'chat_id': str(chat_id)}  # Convert values to strings

    # Ensure answer is a string
    if not isinstance(answer, str):
        answer = str(answer)

    matches = re.findall(pattern, answer)
    
    # Extract the components into a list of dictionaries
    link_data = [
        {
            'marketSelectionId': match[0],
            'line': float(match[1]) if match[1] else None
        }
        for match in matches
    ]


    

    info_box_items_dict = {}

    async with aiohttp.ClientSession() as session:
        tasks = [fetch_betcard_data(session, link) for link in link_data]
        results = await asyncio.gather(*tasks)
        for result in results:
            log_extra['result'] = str(result)  # Ensure result is JSON-serializable
            log.info('[Chat View] [get_infobox_items] Got betcard', extra=log_extra)
            if result:
                id, item = result
                info_box_items_dict[id] = item

    # parallelized call to get the summary data and add it to the infoboxitems dict

    # Convert the dictionary back to a list
    info_box_items = list(info_box_items_dict.values())
    log.info('[Chat View] [get_infobox_items] Returning infobox items', extra=log_extra)

    return info_box_items

async def get_suggested_questions(question, temp_answer, answer):

    model_name = "gpt-4o-mini"
    response = answer if temp_answer == '' else temp_answer
    prompt = suggested_query_prompt.format(question, response)
    #TODO- get sample questions dynamically and input into system prompt here... ?
    #TODO- more than just the most recent q/a? go back further?

    sys_prompt = suggested_query_sys_prompt
    response_json = await get_open_ai_query(model_name, prompt, sys_prompt)
    text = response_json['text'].replace('\n', ' ')
    data = await load_json(text)

    #return model_used for cost calc
    model_used_json = {
        'model': response_json['model'],
        'input_tokens': response_json['input_tokens'],
        'output_tokens': response_json['output_tokens'],
        'cached_tokens': response_json['cached_tokens'],
    }

    return data['suggestions'], model_used_json

async def get_events(session, league, end_date):
    start = time.time()
    
    url = f'https://api.sharpsports.io/v1/events?upcoming=true&league={league}&future=false&startTimeEnd={end_date}&limit=25&ascending=true'

    log_extra = {
        'league': str(league),
        'end_date': str(end_date),
        'url': url
    }

    log.info('[Chat View] [get_events] Getting events', extra=log_extra)

    cached = get_cached_response(url)
    if cached:
        log.info('[Chat View] [get_events] Got Cached Data', extra=log_extra)
        return cached

    headers = {
        "accept": "application/json",
        "Authorization": f"Token {SS_API_KEY}"
    }
    try:
        async with session.get(url, headers=headers) as response:
            response.raise_for_status()  # Raise an HTTPError for bad responses (4xx and 5xx)
            response_data = await response.json()
            total = time.time() - start
            log_extra['response'] = str(response)  # Convert response to string
            log_extra['total_runtime'] = str(total)
            log.info('[Chat View] [get_events] Successfully got events', extra=log_extra)
            cache_api_response(url, response_data, 'EVENTS')
            return response_data
    except aiohttp.ClientError as e:
        total = time.time() - start
        log_extra['response'] = str(e)  # Convert exception to string
        log_extra['total_runtime'] = str(total)
        log.error('[Chat View] [get_events] Error getting events', extra=log_extra)
        return None

async def rate_limited_task(sem,coro):
    async with sem:
        return await coro

async def get_main_lines_from_events(result, league, session):
    event_data = {}
    start = time.time()
    
    if not result:
        return event_data

    # Prepare all requests
    sem = asyncio.Semaphore(50)
    price_tasks = []
    
    for event in result:
        moneyline_task = rate_limited_task(sem, get_prices(session, event.get('id'), league_data[event.get('league')]['moneylineId']))
        spread_task = rate_limited_task(sem, get_prices(session, event.get('id'), league_data[event.get('league')]['spreadId']))
        total_task = rate_limited_task(sem,get_prices(session, event.get('id'), league_data[event.get('league')]['totalId']))
        price_tasks.extend([(event, 'moneyline', moneyline_task), 
                          (event, 'spread', spread_task),
                          (event, 'total', total_task)])

    # Execute all requests concurrently
    log_extra = {
        'league': str(league),
        'start': str(start),
        'price_tasks': len(price_tasks)
    }
    log.info('[Chat View] [get_main_lines_from_events] Executing price tasks', extra=log_extra)
    
    responses = await asyncio.gather(*[task for _, _, task in price_tasks], return_exceptions=True)

    # Process results
    for i in range(0, len(responses), 3):
        event = price_tasks[i][0]
        start_date = event.get('startDate')
        
        if start_date not in event_data:
            event_data[start_date] = []

        homeContestantId = event.get('contestantHome')['id']
        awayContestantId = event.get('contestantAway')['id']

        # Initialize selections as None
        homeMoneylineSelection = None
        awayMoneylineSelection = None
        homeSpreadSelection = None 
        awaySpreadSelection = None
        overTotalSelection = None
        underTotalSelection = None

        # Initialize all variables
        homeMoneyline = None
        awayMoneyline = None
        homeSpread = None
        awaySpread = None
        totalOver = None
        totalUnder = None

        moneyline_resp = responses[i] if not isinstance(responses[i], Exception) else None
        spread_resp = responses[i+1] if not isinstance(responses[i+1], Exception) else None
        total_resp = responses[i+2] if not isinstance(responses[i+2], Exception) else None

        # Process markets
        if moneyline_resp and 'markets' in moneyline_resp:
            for market in moneyline_resp['markets']:
                for offer in market['marketOffers']:
                    homeMoneylineSelection = next((item for item in offer['marketSelections'] 
                                                 if item['positionId'] == homeContestantId), None)
                    awayMoneylineSelection = next((item for item in offer['marketSelections'] 
                                                 if item['positionId'] == awayContestantId), None)
        if spread_resp and 'markets' in spread_resp:
            for market in spread_resp['markets']:
                for offer in market['marketOffers']:
                    homeSpreadSelection = next((item for item in offer['marketSelections'] 
                                                 if item['positionId'] == homeContestantId), None)
                    awaySpreadSelection = next((item for item in offer['marketSelections'] 
                                                 if item['positionId'] == awayContestantId), None)
        
        if total_resp and 'markets' in total_resp:
            for market in total_resp['markets']:
                for offer in market['marketOffers']:
                    overTotalSelection = next((item for item in offer['marketSelections'] 
                                                 if item['position'] == 'Over'), None)
                    underTotalSelection = next((item for item in offer['marketSelections'] 
                                                 if item['position'] == 'Under'), None)

        # get the best line for each market

        if homeMoneylineSelection:
                books = homeMoneylineSelection['books']                        
                homeMoneyline = {book['abbr']: next(price for price in book['prices'] if price['main']) for book in books if any(price['main'] for price in book['prices'])}
                best_book_abbr, best_book_data = max(homeMoneyline.items(), key=lambda x: x[1]['odds'])
                booklogo = bookImages.get(best_book_abbr, {}).get('url')
                homeMoneyline = {
                    'abbr': best_book_abbr,
                    'price': best_book_data,
                    'bookLogo': booklogo
                        }
        if awayMoneylineSelection:
                books = awayMoneylineSelection['books']
                awayMoneyline = {book['abbr']: next(price for price in book['prices'] if price['main']) for book in books if any(price['main'] for price in book['prices'])}
                best_book_abbr, best_book_data = max(awayMoneyline.items(), key=lambda x: x[1]['odds'])
                booklogo = bookImages.get(best_book_abbr, {}).get('url')
                awayMoneyline = {
                    'abbr': best_book_abbr,
                    'price': best_book_data,
                    'bookLogo': booklogo
                        }
        if homeSpreadSelection:
                books = homeSpreadSelection['books']
                homeSpread = {book['abbr']: next(price for price in book['prices'] if price['main']) for book in books if any(price['main'] for price in book['prices'])}
                best_book_abbr, best_book_data = max(homeSpread.items(), key=lambda x: x[1]['line'])
                booklogo = bookImages.get(best_book_abbr, {}).get('url')
                homeSpread = {
                    'abbr': best_book_abbr,
                    'price': best_book_data,
                    'bookLogo': booklogo
                        }
        if awaySpreadSelection:
                books = awaySpreadSelection['books']
                awaySpread = {book['abbr']: next(price for price in book['prices'] if price['main']) for book in books if any(price['main'] for price in book['prices'])}
                best_book_abbr, best_book_data = max(awaySpread.items(), key=lambda x: x[1]['line'])
                booklogo = bookImages.get(best_book_abbr, {}).get('url')
                awaySpread = {
                    'abbr': best_book_abbr,
                    'price': best_book_data,
                    'bookLogo': booklogo
                        }
        if overTotalSelection:
                books = overTotalSelection['books']
                totalOver = {book['abbr']: next(price for price in book['prices'] if price['main']) for book in books if any(price['main'] for price in book['prices'])}
                best_book_abbr, best_book_data = min(totalOver.items(), key=lambda x: x[1]['line'])
                booklogo = bookImages.get(best_book_abbr, {}).get('url')
                totalOver = {
                    'abbr': best_book_abbr,
                    'price': best_book_data,
                    'bookLogo': booklogo
                        }
        if underTotalSelection:
                books = underTotalSelection['books']
                totalUnder = {book['abbr']: next(price for price in book['prices'] if price['main']) for book in books if any(price['main'] for price in book['prices'])}
                best_book_abbr, best_book_data = max(totalUnder.items(), key=lambda x: x[1]['line'])
                booklogo = bookImages.get(best_book_abbr, {}).get('url')
                totalUnder = {
                    'abbr': best_book_abbr,
                    'price': best_book_data,
                    'bookLogo': booklogo
                        } 
                         
        try:
            event_data[start_date].append({
                    'startTime': event.get('startTime'),
                    'name': event.get('name'),
                    'id': event.get('id'),
                    'contestantHome': event.get('contestantHome'),
                    'contestantHomeAbbr': get_team_abbr(team_logos, event.get('league'), event.get('contestantHome')['fullName']),
                    'contestantHomeLogo': get_team_logo(team_logos, event.get('league'), event.get('contestantHome')['fullName']),
                    'contestantAway': event.get('contestantAway'),
                    'contestantAwayAbbr': get_team_abbr(team_logos, event.get('league'), event.get('contestantAway')['fullName']),
                    'contestantAwayLogo': get_team_logo(team_logos, event.get('league'), event.get('contestantAway')['fullName']),
                    'homeMoneyline': homeMoneyline,
                    'awayMoneyline': awayMoneyline,
                    'homeSpread': homeSpread,
                    'awaySpread': awaySpread,
                    'totalOver': totalOver,
                    'totalUnder': totalUnder
                })
            log_extra['eventId'] = str(event.get('id'))
            log.info('[Chat View] [get_main_lines_from_events] Added event to event_data', extra=log_extra)

        except Exception as e:
            log_extra['eventId'] = str(event.get('id'))
            log_extra['error'] = str(e)
            log.error('[Chat View] [get_main_lines_from_events] Error adding event to event_data', extra=log_extra)  

    total = time.time() - start
    log_extra['total_runtime'] = str(total)
    log.info('[Chat View] [get_main_lines_from_events] Finished processing events', extra=log_extra)

    return {'league': league, 'data': event_data}  

async def get_event_items(league_data):
    start = time.time()
    event_items = {}  # Will be keyed by league
    async with aiohttp.ClientSession() as session:
        tasks = [
            get_events(session, league, league_info['end_date'])
            for league, league_info in league_data.items()
        ]
        results = await asyncio.gather(*tasks)
       

        # add a .5 second wait between running tasks
        await asyncio.sleep(0.5)
        rate_limit = 10

        # Process each result batch in parallel with league info
        result_tasks = [
            get_main_lines_from_events(result, league, session)  
            for result, (league, _) in zip(results, league_data.items())
        ]

        # if result_tasks length is greater than rate_limit, split into chunks
        log_extra = {'result_tasks': str(len(result_tasks))}
        log.info('[Chat View] [get_event_items] Executing event tasks...', extra=log_extra)
        processed_results = await asyncio.gather(*result_tasks)


        
        # Organize by league first, then by date
        for result in processed_results:
            if result:
                league = result['league']
                if league not in event_items:
                    event_items[league] = {}
                    
                for start_date, events in result['data'].items():
                    if start_date not in event_items[league]:
                        event_items[league][start_date] = []
                    event_items[league][start_date].extend(events)
            else:
                log_extra['league'] = str(result.get('league'))
                log.error('[Chat View] [get_event_items] Error processing result', extra=log_extra)
    total_time = time.time() - start
    log_extra['total_runtime'] = str(total_time)
    log.info('[Chat View] [get_event_items] Finished processing events', extra=log_extra)
    return event_items
    
async def get_event_detail(event_id):
    url = f'https://api.sharpsports.io/v1/events/{event_id}'

    log_extra = {
        'event_id': str(event_id),
        'url': url
    }

    cached = get_cached_response(url)
    if cached:
        log.info('[Chat View] [get_event_detail] Got Cached Data', extra=log_extra)
        return cached

    headers = {
        "accept": "application/json",
        "Authorization": f"Token {SS_API_KEY}"
    }

    try:
        response = requests.get(url, headers=headers)
        log_extra['response'] = str(response)
        log.info('[Chat View] [get_event_detail] Getting event detail', extra=log_extra)
        response.raise_for_status()
        cache_api_response(url, response.json(), 'EVENT_DETAIL')
        return response.json()
    except requests.RequestException as e:
        log_extra['response'] = str(e)
        log.error('[Chat View] [get_event_detail] Error getting event detail', extra=log_extra)
        return None    

async def get_marketselection_detail(marketselection_id):
    url = f'https://api.sharpsports.io/v1/marketSelections/{marketselection_id}'

    log_extra = {
        'marketselection_id': str(marketselection_id),
        'url': url
    }

    # Check cache first
    cached = get_cached_response(url)
    if cached:
        log.info('[Chat View] [get_marketselection_detail] Got Cached Data', extra=log_extra)
        return cached

    headers = {
        "accept": "application/json",
        "Authorization": f"Token {SS_API_KEY}"
    }

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                response.raise_for_status()
                data = await response.json()
                log_extra['response'] = str(response)
                log.info('[Chat View] [get_marketselection_detail] Successfully got marketSelection', extra=log_extra)
                cache_api_response(url, data, 'MARKETSELECTION_DETAIL')
                return data
    except Exception as e:
        log_extra['response'] = str(e)
        log.error('[Chat View] [get_marketselection_detail] Error fetching marketSelection', extra=log_extra)
        return None           

#WRONG VIEW
class ChatView(LoginRequiredMixin, TemplateView):

    template_name = 'chat/chat.html'

    login_url = '/login/?next=/chat/'
    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)

        is_jaxon_user, current_chat_count, max_chat_count, monthly_period_end_string, customer_portal_url = get_jaxon_info(self.request.user)

        # lookup survey model by user and return a list of the formIds that are returned

       





        log.info('Context Data', extra={
            'Jaxon User': is_jaxon_user,
            'Chat Count': current_chat_count,
            'Max Chat Count': max_chat_count,
            'Monthly Period End': monthly_period_end_string,
            'Customer Portal Url': customer_portal_url,
        })

        context['username'] = self.request.user.username
        context['is_jaxon_user'] = is_jaxon_user
        context['current_chat_count'] = current_chat_count
        context['max_chat_count'] = max_chat_count
        context['monthly_period_end_string'] = monthly_period_end_string
        context['customer_portal_url'] = customer_portal_url
        question_one, question_two, question_three = get_sample_questions()
        
        context['question_one'] = question_one
        context['question_two'] = question_two
        context['question_three'] = question_three

        context['chat_session_id'] = uuid.uuid4()

        return context

class NewsView(ListView):
    template_name = 'chat/news.html'
    model = Chat
    context_object_name = 'news'
    paginate_by = 10

    def get_queryset(self):

        date_range = "year"

        date_ranges = {
            "week": timedelta(days=7),
            "month": timedelta(days=30),
            "year": timedelta(days=365),
            "day": timedelta(days=1)
        }

        midnight = datetime.combine(date.today(), time())
        if date_range in date_ranges:
            midnight -= date_ranges[date_range]

        timestamp_ms = int(midnight.timestamp() * 1000)

        #TODO- none of these are accessed anywhere?
        news_table =  asyncio.run(get_table("sports_news", column_name="published", search=str(timestamp_ms), search_type="gt"))
        news_table_full = asyncio.run(
            get_table("sports_news", column_name="league", search="nfl", order_by="published", order="desc",
                      limit=2500))
        news = get_table("news", order_by="created_at", ascending=False)

class ChatWithReactView(LoginRequiredMixin, TemplateView):
    template_name = 'chat/chat_with_react.html'
    login_url = '/login/?next=/chat/'

    def get(self, request, *args, **kwargs):
        sid = kwargs.get('sid', None)


        if sid and is_valid_uuid(sid):
            return super().get(request, *args, **kwargs)
        else:
            # Generate a unique `session_id` and handle potential duplicates
            sid = uuid.uuid4()

            done = False
            while not done:
                try:
                    # Attempt to create the session with the generated `sid`
                    Session.objects.create(session_id=sid, user=request.user)
                    done = True

                except IntegrityError:
                    # If the `sid` already exists, try again
                    pass


            return HttpResponseRedirect('/chat/'+str(sid))

    def get_context_data(self, **kwargs):

        context = super().get_context_data(**kwargs)
        sid = kwargs['sid']
        user = self.request.user

        try:
            profile = user.profile
            profile_picture = profile.optimized_image_url()
            if not profile_picture:
                profile_picture = '/static/images/default-profile-picture.png'
        except profile.DoesNotExist:
            profile_picture = '/static/images/default-profile-picture.png'

       
        try:
            events = async_to_sync(get_event_items)(league_data)    
            context['events'] = json.dumps(events)
        except Exception as e:
            log.error('Error getting events', extra={'error': repr(e), 'traceback': traceback.format_exc()})
            context['events'] = "[]"


        # Fetch Jaxon user info
        is_jaxon_user, current_chat_count, max_chat_count, monthly_period_end_string, customer_portal_url = get_jaxon_info(self.request.user)


        # Log the value of profile_picture
        log.info('Context Data', extra={
            'Jaxon User': is_jaxon_user,
            'Chat Count': current_chat_count,
            'Max Chat Count': max_chat_count,
            'Monthly Period End': monthly_period_end_string,
            'Customer Portal Url': customer_portal_url,
            'profile_picture': profile_picture
        })

        # Basic user info and subscription details
        context['username'] = self.request.user.username
        context['is_jaxon_user'] = is_jaxon_user
        context['current_chat_count'] = current_chat_count
        context['max_chat_count'] = max_chat_count
        context['monthly_period_end_string'] = monthly_period_end_string
        context['customer_portal_url'] = customer_portal_url
        context['profile_picture'] = profile_picture

        # Sample questions
        question_one, question_two, question_three = get_sample_questions()
        context['questions'] = [
            question_one,
            question_two,
            question_three
        ]
        context['infobox'] = "[]"

        # Current chat session ID
        context['chat_session_id'] = sid

        # Retrieve session and associated chat history
        try:
            session = Session.objects.get(session_id=sid)
            #get all chats where chat_session_id is the same as the session id
            chat_history = Chat.objects.filter(chat_session_id=sid).order_by('created_at')
            context['chat_history'] = serialize("json", chat_history)

            last_chat = chat_history.last()
            if last_chat:
                prev_answer = last_chat.answer
                context['infobox'] = json.dumps(async_to_sync(get_infobox_items)(prev_answer, last_chat.id))

        except Session.DoesNotExist:
            # In case the session somehow doesn’t exist, set an empty chat history
            chat_history = []

        context['chat_history'] = serialize("json", chat_history)

        # Retrieve all sessions for the current user to populate the sidebar
        # Filter out sessions where the summary is null
        user_sessions = Session.objects.filter(user=self.request.user, summary__isnull=False).order_by('-created_at')
        context['user_sessions'] = serialize("json", user_sessions)

        
        # Fetch and parse events
        #events_json = context['events']
        #events = json.loads(events_json)
        # Get a set of leagues from the events
        # add a 12 hour cache for leagues

        events_json = context['events']

        #events_json = async_to_sync(get_events)(league_data)

        # If events_json is a JSON string, parse it into a Python object
        if isinstance(events_json, str):
            events = json.loads(events_json)
        else:
            events = events_json  # Already a Python object

        cached_leagues = cache.get('leagues')
        if cached_leagues is None:
            leagues = set()
            for event in events:
                leagues.add(event)
            cache.set('leagues', leagues, settings.CACHE_TIMEOUTS['LEAGUES'])
        else:
            leagues = cached_leagues

        # Filter templates based on leagues and 'All', excluding 'Event' specific questions
        filtered_templates = {}
        for category, category_data in templates.items():
            filtered_category = {}
            for league in ['All'] + list(leagues):
                if league in category_data:
                    league_info= category_data[league]
                    # Exclude 'Event' specific questions
                    league_data_filtered = {k: v for k, v in league_info.items() if k != 'Event'}
                    if league_data_filtered:
                        filtered_category[league] = league_data_filtered
            if filtered_category:
                filtered_templates[category] = filtered_category

        # Add filtered_templates to context
        context['categorized_suggestions'] = filtered_templates

        context['surveys'] = []

        return context

# TODO - have events added to context without the prices and have the events endpoint return everything.  Add an example to the frontend of how to use this endpoint

@method_decorator(csrf_exempt, name='dispatch')
class EventsView(View):
    async def get(self, request, *args, **kwargs):
        try:
            events = await get_event_items(league_data)
            return JsonResponse(events, safe=False, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
@method_decorator(csrf_exempt, name='dispatch')
class BetCardView(View):
    def get(self, request, chatId, *args, **kwargs):
        start_time = time.time()
        try:
            # Retrieve the Chat object using the chatId
            chat = get_object_or_404(Chat, id=chatId)
            # Get the message from the chat object
            message = chat.answer
            # Process the message (e.g., generate infobox items)
            infobox = async_to_sync(get_infobox_items)(message, chatId)
            end_time = time.time()
            duration = end_time - start_time
            log.info('BetCardView processed', extra={
                'chatId': chatId,
                'processing_time': duration
            })
            return JsonResponse(infobox, safe=False, status=200)
        except Exception as e:
            end_time = time.time()
            duration = end_time - start_time
            log.error('Error in BetCardView', extra={
                'error': repr(e),
                'traceback': traceback.format_exc(),
                'chatId': chatId,
                'processing_time': duration
            })
            return JsonResponse({'error': 'Error in BetCardView'}, status=500)

@method_decorator(csrf_exempt, name='dispatch')
class SuggestedQueriesView(View):
    
    def get(self, request, id, *args, **kwargs):
        start_time = time.time()

        if id.startswith('MRKT_'):
            # add logic for getting marketSelection specific suggested queries
            marketSelectionId = id
            # get the marketSelection from the sharpsports api

            try:
                marketSelection = async_to_sync(get_marketselection_detail)(marketSelectionId)
                marketName = marketSelection['marketName']
                position = marketSelection['position']

                relevant_questions = {'query':f'analyze {marketName} - {position}. Include any relevant statistics, best lines and direct bet links.'}
            
                return JsonResponse(relevant_questions, safe=False, status=200)
            except Exception as e:
                return JsonResponse({'error': 'Error in SuggestedQueriesView'}, status=500)
        elif id.startswith('EVNT_'):
            eventId = id
            try:
                event = async_to_sync(get_event_detail)(eventId)

                relevant_questions = {}
    
                # Categories to check
                categories = templates.keys()
                
                for category in categories:
                        
                    category_questions = []
                    
                    # Get league-specific event questions if they exist

                    if event['league'] in templates[category].keys():
                       
                        if "Event" in templates[category][event['league']].keys():
                            league_questions = templates[category][event['league']]["Event"]["Questions"]
                            category_questions.extend(league_questions)
                    
                    # Get general "All" sport event questions
                    if "All" in templates[category].keys() and "Event" in templates[category]["All"].keys():
                        all_questions = templates[category]["All"]["Event"]["Questions"]
                        category_questions.extend(all_questions)
                    
                    # Replace {event} placeholder with actual event name
                    category_questions = [q.replace("{event}", event['name']) for q in category_questions]
                    
                    if category_questions:
                        relevant_questions[category] = category_questions
                return JsonResponse(relevant_questions, safe=False, status=200)

            except Exception as e:
                return JsonResponse({'error': 'Error in SuggestedQueriesView'}, status=500)
                
        else:
            try:
                chatId = id
                # Retrieve the Chat object using the chatId
                chat = get_object_or_404(Chat, id=chatId)
                # Get the message from the chat object
                answer = chat.answer
                question = chat.question
                temp_answer = chat.temporary_answer

                # Process the message (e.g., generate infobox items)
                suggested_queries = async_to_sync(get_suggested_questions)(question,temp_answer,answer)
                end_time = time.time()
                duration = end_time - start_time
                log.info('Suggested_queries processed', extra={
                    'chatId': chatId,
                    'processing_time': duration
                })
                return JsonResponse(suggested_queries, safe=False, status=200)
            except Exception as e:
                end_time = time.time()
                duration = end_time - start_time
                log.error('Error in SuggestedQueriesView', extra={
                    'error': repr(e),
                    'traceback': traceback.format_exc(),
                    'chatId': chatId,
                    'processing_time': duration
                })
                return JsonResponse({'error': 'Error in SuggestedQueriesView'}, status=500)
        
@method_decorator(csrf_exempt, name='dispatch')
class ChartDataView(View):
    def get(self, request, marketSelectionId, line, type, *args, **kwargs):
        # Debug full request info

        # TODO add relevant dropdown values to the endpoint

        filters = request.GET.get('filters', '')
        start_time = time.time()
        try:
            # Get filters from query params, default to empty string
            filters = request.GET.get('filters', '')
            
            
            # Pass the raw filters string to your function or use it directly
            chartData = async_to_sync(get_marketselection_metadata)(
                marketSelectionId,
                line,
                type,
                filters=filters  # Pass filters as a raw string
            )
            # check to see if chartData has a player key with an id value.  if so, call the get_player_by_team_id function

            if chartData['player']['id']:
                player_id = chartData['player']['id']
                teammmates = async_to_sync(get_teammates)(player_id)

            chartInfo = {marketSelectionId: chartData, 'type': type, 'gamesWithout': teammmates}
            end_time = time.time()
            duration = end_time - start_time
            log.info('ChartDataView processed', extra={
                'marketSelectionId': marketSelectionId,
                'processing_time': duration
            })
            return JsonResponse(chartInfo, safe=False, status=200)
        except Exception as e:
            end_time = time.time()
            duration = end_time - start_time
            log.error('Error in ChartDataView', extra={
                'error': repr(e),
                'traceback': traceback.format_exc(),
                'marketSelectionId': marketSelectionId,
                'processing_time': duration
            })
            return JsonResponse({'error': 'Error in ChartDataView'}, status=500)

# create a post View called SubmitSurveyView that will take the 2 ids from the url endpoint and store the data in the Survey model
@method_decorator(csrf_exempt, name='dispatch')
class SubmitSurveyView(View):
    def post(self, request, user, formid, responseid, *args, **kwargs):
        try:
            user_obj = User.objects.get(username=user)
            survey = Survey.objects.create(
                user=user_obj,
                created_at=datetime.now(),
                formId=formid,
                responseId=responseid
            )
            try:
                # Validate survey data before save
                if not survey.formId:
                    log.warning('Attempting to save survey with empty form_ids', 
                               extra={'user': self.request.user.username})

                survey.save()
                log.info('Survey saved successfully', 
                         extra={
                             'user': self.request.user.username,
                             'formId': survey.formId,
                             'created_at': survey.created_at,
                            'responseId': survey.responseId

                         })

            except Exception as e:
                log.error('Failed to save survey', 
                          extra={
                              'error': str(e),
                              'traceback': traceback.format_exc(),
                              'user': self.request.user.username,
                              'form_id': survey.formId,
                             'created_at': survey.created_at,
                            'response_id': survey.responseId
                          })
                raise  # Re-raise to handle in calling code

            return JsonResponse({'success': 'Survey submitted successfully'}, status=200)
        except Exception as e:
            print('submit survey error', e)
            return JsonResponse({'error': str(e)}, status=500)