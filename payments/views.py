from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from payments.models import StripeCustomer
from django.contrib.auth.models import User
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse, HttpResponse
from django.views import View
import stripe
from django.conf import settings
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib import messages
from django.http import HttpResponseRedirect
#Logger
import logging,traceback
logger = logging.getLogger('json')
from datetime import datetime, timezone, timedelta
import json
from users.models import Profile
import requests
import os
import urllib.parse
import sendgrid
from sendgrid.helpers.mail import Mail, Email, To, Content


#stripe keys
stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')
stripe_publishable_key = os.environ.get('STRIPE_PUBLISHABLE_KEY')
STRIPE_ENDPOINT_SECRET = os.environ.get('STRIPE_ENDPOINT_WEBHOOK_SECRET')

sendgrid_api_key = os.environ.get('SENDGRID_API_KEY')

cancel_coupon_id = os.environ.get('CANCEL_COUPON_ID')

essentialmonthlyid = os.environ.get('ESSENTIAL_MONTHLY_PRICE_ID')
essentialyearlyid = os.environ.get('ESSENTIAL_YEARLY_PRICE_ID')
premiummonthlyid = os.environ.get('PREMIUM_MONTHLY_PRICE_ID')
premiumyearlyid = os.environ.get('PREMIUM_YEARLY_PRICE_ID')
ultimatemonthlyid = os.environ.get('ULTIMATE_MONTHLY_PRICE_ID')
ultimateyearlyid = os.environ.get('ULTIMATE_YEARLY_PRICE_ID')
premiumdiscordid = os.environ.get('PREMIUM_DISCORD_PRICE_ID')

envurlbase = os.environ.get('DOMAIN_URL')

discord_client_id = os.environ.get('DISCORD_CLIENT_ID')
discord_client_secret = os.environ.get('DISCORD_CLIENT_SECRET')
discord_redirect_uri = os.environ.get('DISCORD_REDIRECT_URI')
discord_guild_id = os.environ.get('DISCORD_GUILD_ID') 
discord_bot_token = os.environ.get('DISCORD_BOT_TOKEN')
discord_subscriber_role_id = os.environ.get('DISCORD_SUBSCRIBER_ROLE_ID')

encoded_redirect_uri = None
if discord_redirect_uri: 
    encoded_redirect_uri = urllib.parse.quote(discord_redirect_uri, safe='')

oauth_url = f"https://discord.com/oauth2/authorize?client_id={discord_client_id}&response_type=code&redirect_uri={encoded_redirect_uri}&scope=identify+guilds.join"


def get_plan_limit(plan):

    essential_monthly_plan_limit = 50
    premium_monthly_plan_limit = 150
    ultimate_monthly_plan_limit = 300


    plan_limits = {
        'Essential Access': essential_monthly_plan_limit,
        'Premium Access': premium_monthly_plan_limit,
        'Ultimate Access': ultimate_monthly_plan_limit,
    }
    return plan_limits.get(plan, 0)


def get_stripe_plans(log_extra):
    try:
        # Fetch all active plans from Stripe and expand the product details
        plans = stripe.Price.list(active=True, expand=['data.product'])

        # Desired order of plans
        desired_order = ["Essential Access", "Premium Access", "Ultimate Access"]

        # Organize plans by product and interval
        combined_plans = {}

        for plan in plans['data']:
            product_name = plan['product']['name']
            interval = plan['recurring']['interval']
            amount = plan['unit_amount'] / 100  # Convert cents to dollars

            if product_name not in combined_plans:
                combined_plans[product_name] = {}

            combined_plans[product_name][interval] = {
                'id': plan['id'],
                'amount': amount,
                'currency': plan['currency'],
            }

        # Sort the combined_plans based on desired order
        sorted_plans = {name: combined_plans[name] for name in desired_order if name in combined_plans}

        return sorted_plans

    except stripe.error.StripeError as e:
        logger.error('GetSripePlansError', extra={
          'error': repr(e),
          'traceback': traceback.format_exc(),
          **log_extra
        })
        return None
    
    except Exception as e:
        logger.error('GetSripePlansUnhandledError', extra={
            'error': repr(e),
            'traceback': traceback.format_exc(),
            **log_extra
        })

def is_plan_active(end_date):
    """
    check if plan is active or not
    :end_date: 1725876305
    :return: True if plan active, False otherwise
    """
    # return if the subscription is expired
    current_period_end = datetime.fromtimestamp(end_date, tz=timezone.utc).date()
    is_expired = datetime.now(timezone.utc).date() > current_period_end
    return False if is_expired else True


def validate_stripe_coupon_code(coupon):
    codes = stripe.PromotionCode.list(active=True)
    for code in codes['data']:
        if code['code'] == coupon:
            return code['coupon']['id']
    return False

@login_required
def discord_oauth_callback(request):
    """Handles the callback from Discord after user authorizes the app"""
    logger.info('Handling Discord OAuth callback')
    
    # Step 1: Get the authorization code from the request
    code = request.GET.get('code')
    if not code:
        logger.error('No authorization code received from Discord')
        return JsonResponse({'error': 'Missing authorization code'}, status=400)

    logger.info(f'Received authorization code: {code}')
    
    # Step 2: Exchange the authorization code for an access token
    token_url = "https://discord.com/api/oauth2/token"
    token_data = {
        'client_id': discord_client_id,
        'client_secret': discord_client_secret,
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': discord_redirect_uri,
    }
    token_headers = {'Content-Type': 'application/x-www-form-urlencoded'}
    
    logger.info('Attempting to exchange code for access token')
    logger.debug(f'Token request data: {token_data}')
    
    try:
        # Step 3: Send the request to Discord
        token_response = requests.post(token_url, data=token_data, headers=token_headers)
        logger.info(f'Token response status code: {token_response.status_code}')
        logger.info(f'Token response text: {token_response.text}')
        
        # Check if we got a valid response
        if token_response.status_code != 200:
            logger.error(f'Failed to get access token, status code: {token_response.status_code}')
            return JsonResponse({'error': f'Failed to get access token from Discord, status code: {token_response.status_code}'}, status=token_response.status_code)
        
        try:
            token_json = token_response.json()
        except ValueError:
            logger.error(f'Failed to parse JSON from token response: {token_response.text}')
            return JsonResponse({'error': 'Failed to parse JSON from Discord'}, status=500)

        
        # Step 4: Check if the response contains the access token
        if 'access_token' not in token_json:
            logger.error(f'Access token missing from Discord response: {token_json}')
            return JsonResponse({'error': 'Failed to get access token from Discord'}, status=400)
        
        access_token = token_json['access_token']
        logger.info(f'Successfully retrieved access token: {access_token}')
        
        # Step 5: Get user info from Discord
        user_info_url = "https://discord.com/api/users/@me"
        headers = {
            'Authorization': f'Bearer {access_token}'
        }

        logger.info('Attempting to fetch user info from Discord')
        user_info_response = requests.get(user_info_url, headers=headers)
        logger.info(f'User info response status code: {user_info_response.status_code}')
        logger.info(f'User info response text: {user_info_response.text}')

        if user_info_response.status_code != 200:
            logger.error(f'Failed to fetch user info, status code: {user_info_response.status_code}')
            return JsonResponse({'error': f'Failed to fetch user info from Discord, status code: {user_info_response.status_code}'}, status=user_info_response.status_code)

        try:
            user_info_json = user_info_response.json()
        except ValueError:
            logger.error(f'Failed to parse JSON from token response: {user_info_response.text}')
            return JsonResponse({'error': 'Failed to parse JSON from Discord'}, status=500)

        
        

        if 'id' not in user_info_json:
            logger.error(f'User ID missing from Discord user info response: {user_info_json}')
            return JsonResponse({'error': 'Failed to get user ID from Discord'}, status=400)

        discord_user_id = user_info_json['id']
        discord_username = user_info_json['username']

        profile = request.user.profile
        profile.discord_Username = discord_username  # Save the Discord username
        profile.save()


        logger.info(f'Successfully retrieved Discord user ID: {discord_user_id}')
        
        # Step 6: Add the user to your Discord server
        guild_id = discord_guild_id  # Your Discord server ID
        bot_token = discord_bot_token  # Your bot token (make sure the bot has `guilds.join` permission)

        guild_url = f"https://discord.com/api/guilds/{guild_id}/members/{discord_user_id}"
        guild_data = {'access_token': access_token}
        guild_headers = {'Authorization': f'Bot {bot_token}'}

        logger.info('Attempting to add user to Discord server')
        guild_response = requests.put(guild_url, json=guild_data, headers=guild_headers)
        logger.debug(f'Guild add response status code: {guild_response.status_code}')
        logger.debug(f'Guild add response text: {guild_response.text}')

        if guild_response.status_code == 201:
            logger.info(f'Successfully added user to Discord server: {discord_user_id}')
        elif guild_response.status_code == 204:
            logger.info(f'User already in the server, no action needed: {discord_user_id}')
        else:
            logger.error(f'Failed to add user to Discord server, status code: {guild_response.status_code}')
            return JsonResponse({'error': f'Failed to add user to Discord server, status code: {guild_response.status_code}'}, status=guild_response.status_code)


        # Step 7: Optionally, assign a role to the user

        plan_id = request.user.profile.plan_id
        if plan_id in [premiummonthlyid, premiumyearlyid, ultimatemonthlyid, ultimateyearlyid, premiumdiscordid]:
            role_id = discord_subscriber_role_id  # The role you want to assign to the user
            role_url = f"https://discord.com/api/guilds/{guild_id}/members/{discord_user_id}/roles/{role_id}"

            logger.info('Attempting to assign role to user')
            try:
                role_response = requests.put(role_url, headers=guild_headers)
                logger.info(f'Role assign response status code: {role_response.status_code}')
                logger.info(f'Role assign response text: {role_response.text}')

                if role_response.status_code == 204:
                    logger.info('Role successfully assigned to the user')
                else:
                    logger.error(f'Failed to assign role to user, status code: {role_response.status_code}')
                    return JsonResponse({'error': f'Failed to assign role to user'}, status=role_response.status_code)
            except Exception as e:
                logger.error(f'Exception occurred during role assignment: {str(e)}')
                logger.error(traceback.format_exc())
                

            
            
        discord_server_url = f"https://discord.com/channels/{guild_id}"
        logger.info('User successfully added to Discord server and role assigned')
        return HttpResponseRedirect(discord_server_url)

    except Exception as e:
        logger.error(f'Exception occurred during OAuth flow: {str(e)}')
        logger.debug(traceback.format_exc())
        return JsonResponse({'error': 'An error occurred during the Discord OAuth process'}, status=500)

@csrf_exempt
def stripe_config(request):
    if request.method == 'GET':
        stripe_config = {
            'publicKey': stripe_publishable_key}
        return JsonResponse(stripe_config, safe=False)

class HomeView(TemplateView):
    template_name = "payments/home.html"

    def get(self, request, *args, **kwargs):
        if request.path == '/subscribe':
            return redirect('/subscribe/', permanent=True)
        return super().get(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['stripe_publishable_key'] = stripe_publishable_key

        context['essentialmonthlyid'] = essentialmonthlyid
        context['essentialyearlyid'] = essentialyearlyid
        context['premiummonthlyid'] = premiummonthlyid
        context['premiumyearlyid'] = premiumyearlyid
        context['ultimatemonthlyid'] = ultimatemonthlyid
        context['ultimateyearlyid'] = ultimateyearlyid
        context['premiumdiscordid'] = premiumdiscordid
        context['envurlbase'] = envurlbase
        context['discordOAuthUrl'] = oauth_url
        context['free_trial_eligible'] = True
        context['subscription_active'] = False
        
        auth = self.request.user.is_authenticated

        username = None
        if auth:
            try:
                username = self.request.user.username
                if username:
                    context['username'] = username
                    context['is_logged_in'] = True
                else:
                    context['username'] = "user-not-logged-in"
                    context['is_logged_in'] = False
            except: 
                context['username'] = "user-not-logged-in"
                context['is_logged_in'] = False
            try:
                # Get user profile
                profile = self.request.user.profile
                if profile:
                    # Add profile-related data to context
                    context['plan_id'] = profile.plan_id
                    context['subscription_canceled'] = profile.subscription_canceled
                    context['discord_username'] = profile.discord_Username or "no-discord-username"
                    if profile.subscription_current_period_end is not None:
                        if profile.subscription_current_period_end > datetime.now().timestamp():
                            context['subscription_active'] = True
                    
                    try:
                        trial_start = profile.trial_start
                        if trial_start:
                            # Convert trial_start from Unix timestamp to a datetime object
                            trial_start_date = datetime.fromtimestamp(trial_start).date()

                            # Check if 90 days from trial_start is greater than or equal to today's date
                            if trial_start_date + timedelta(days=90) >= datetime.now().date():
                                context['free_trial_eligible'] = False
                    except:
                        logger.error("Trial start date not found", extra = {
                            username: username
                        })
                else:
                    context['plan_id'] = "no-plan"
                    context['subscription_canceled'] = True
                    context['discord_username'] = "no-discord-username"
            except Profile.DoesNotExist:
                    # Handle case when profile does not exist
                    logger.warning(f"Profile not found for user", extra = {
                        username: username
                    })
                    context['plan_id'] = "no-plan"
                    context['subscription_canceled'] = True
                    context['discord_username'] = "no-discord-username"    
        else:
            context['username'] = "user-not-logged-in"
            context['is_logged_in'] = False
            context['plan_id'] = "no-plan"
            context['subscription_canceled'] = True
            context['discord_username'] = "no-discord-username"    


        log_extra = {
            "username": context.get('username'),
            "isLoggedIn": context.get('is_logged_in'),
            "planId": context.get('plan_id'),
            "subscriptionCancelled": context.get('subscription_cancelled'),
            "discordUserName": context.get('discord_username')
        }

        logger.info('SubscribePageHome', extra=log_extra)

        context['plans'] = get_stripe_plans(log_extra)
        try:
            if self.request.user.is_authenticated:
                # Retrieve the subscription & product
                subscription = self.request.user.profile.subscription
                # Feel free to fetch any additional data from 'subscription' or 'product'
                # https://stripe.com/docs/api/subscriptions/object
                # https://stripe.com/docs/api/products/object
                context.update({
                        "subscription": subscription
                    })
            return context
        except StripeCustomer.DoesNotExist:
            return context

    

class CreateCheckoutSessionView(View):
    def post(self, request, *args, **kwargs):
        # Log request receipt
        logger.info('Received POST request for checkout session.')

        stripe_customer_id = self.request.user.profile.stripe_customer_id
        username = self.request.user.username
        email = self.request.user.email

        log_extras = {
            'username': username,
            'stripeCustomerId': stripe_customer_id,
            'email': email 
        }

        try:
            # Log the body of the request
            logger.info(f'Request body: {request.body}')
            print('Request body:', request.body)

            # Parse the request body
            data = json.loads(request.body)
            price_id = data.get('id', None)
            success_url = data.get('success_url', None)
            cancel_url = data.get('cancel_url', None)
            free_trial_eligible = data.get('free_trial_eligible', True)
            coupon_id = data.get('coupon_id', None)

            # Log the extracted price_id
            logger.info(f'Price ID received', extra={
                "priceId": price_id,
                **log_extras
            })

            if not price_id:
                logger.error('[Create Checkout Session] Price ID is missing from the request', extra=log_extras)
                return JsonResponse({'error': 'Price ID is required.'}, status=400)

            # Log the success and cancel URLs
            logger.info('[Create Checkout Session] Setting session parameters', extra=log_extras)

            onboarding_questions = [
                {
                    "key": "use_case",
                    "label": {
                        "type": "custom",
                        "custom": "What is your primary use for jaXon?"
                    },
                    "type": "dropdown",
                    "dropdown":{
                        "options": [
                            {"label": "Give me picks",
                             "value": "picks"},
                            {"label": "Unique insights and news",
                                "value": "news"},
                                {"label": "General sports betting advice",
                                "value": "advice"},
                                {"label": "Access to advanced analytics",
                                "value": "tools"},
                                {"label": "Just curious",
                                "value": "curiosity"},
                                {"label": "Other",
                                "value": "other"}
                        ]
                    },
                    "optional": False,
                }
            ]

            if self.request.user.profile.stripe_customer_id and free_trial_eligible == "True":
                session_params = {
                    'payment_method_types': ['card'],
                    'line_items': [
                        {
                            'price': price_id,
                            'quantity': 1,
                        },
                    ],
                    'mode': 'subscription',
                    'success_url': success_url,
                    'cancel_url': cancel_url,
                    'allow_promotion_codes': True,
                    'client_reference_id': username,
                    'customer': stripe_customer_id,
                    'payment_method_collection': 'always',
                    'subscription_data': {
                        'trial_period_days': 3,
                    },
                    
                }
            elif stripe_customer_id is None and free_trial_eligible == "True":
                session_params = {
                    'payment_method_types': ['card'],
                    'line_items': [
                        {
                            'price': price_id,
                            'quantity': 1,
                        },
                    ],
                    'mode': 'subscription',
                    'success_url': success_url,
                    'cancel_url': cancel_url,
                    'allow_promotion_codes': True,
                    'client_reference_id': username,
                    'customer_email': email,
                    'payment_method_collection': 'always',
                    'subscription_data': {
                        'trial_period_days': 3,
                    },
                }
            elif stripe_customer_id and free_trial_eligible == "False":
                session_params = {
                    'payment_method_types': ['card'],
                    'line_items': [
                        {
                            'price': price_id,
                            'quantity': 1,
                        },
                    ],
                    'mode': 'subscription',
                    'success_url': success_url,
                    'cancel_url': cancel_url,
                    'allow_promotion_codes': True,
                    'client_reference_id': username,
                    'customer': stripe_customer_id,
                    'payment_method_collection': 'always',
                }
            elif stripe_customer_id is None and free_trial_eligible == "False":
                session_params = {
                    'payment_method_types': ['card'],
                    'line_items': [
                        {
                            'price': price_id,
                            'quantity': 1,
                        },
                    ],
                    'mode': 'subscription',
                    'success_url': success_url,
                    'cancel_url': cancel_url,
                    'allow_promotion_codes': True,
                    'client_reference_id': username,
                    'customer_email': email,
                    'payment_method_collection': 'always',
                }
            
            # Add onboarding questions to session parameters
            session_params['custom_fields'] = onboarding_questions
            print('Session Params:', session_params)

            if coupon_id:
                session_params['discounts'] = [{'coupon': coupon_id}]
                # Remove 'allow_promotion_codes' from session_params
                session_params.pop('allow_promotion_codes', None)
            

            # Log session parameters
            logger.info(f'[Create Checkout Session] Session Parameters Set', extra={
                'sessionParams': session_params,
                **log_extras
            })
            print('Session Params:', session_params)

            # Create checkout session
            checkout_session = stripe.checkout.Session.create(**session_params)

            # Log successful session creation
            logger.info(f'[Create Checkout Session] Successfully created Stripe Checkout session', extra={
                "checkoutSessionId": checkout_session.id,
                **log_extras
            })

            return JsonResponse({'sessionId': checkout_session.id})

        except json.JSONDecodeError as e:
            # Log JSON parsing error
            logger.error(f'[Create Checkout Session] Error decoding JSON', extra={
                'error': repr(e),
                'traceback': traceback.format_exc(),
                **log_extras
            })
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)

        except stripe.error.StripeError as e:
            # Log any Stripe API errors
            logger.error(f'[Create Checkout Session] Stripe error', {
                'error': repr(e),
                'traceback': traceback.format_exc(),
                **log_extras
            })
            return JsonResponse({'error': 'Stripe API error occurred.'}, status=500)

        except Exception as e:
            # Log any other unexpected errors
            logger.error(f'[Create Checkout Session] Unexpected error', extra={
                'error': repr(e),
                'traceback': traceback.format_exc(),
                **log_extras 
            })
            return JsonResponse({'error': 'An unexpected error occurred.'}, status=500)

def create_portal_session(stripe_customer_id, stripe_subscription_id=None, return_url=None, update=False, renew=False):
    log_extras = {
        'stripeCustomerId': stripe_customer_id,
        'stripeSubscriptionId': stripe_subscription_id,
        'returnUrl': return_url,
        'update': update,
        'renew': renew,
    }

    # Step 1: Update subscription if renew is true
    if renew:
        try:
            # Modify the subscription to remove cancel_at_period_end
            stripe.Subscription.modify(
                stripe_subscription_id,
                cancel_at_period_end=False,
                coupon=cancel_coupon_id
            )
            logger.info('[Renewal] Subscription updated with cancel_at_period_end=False and coupon applied', extra=log_extras)

            # Set up the portal session parameters to confirm the update
            session_params = {
                'return_url': return_url,
                'customer': stripe_customer_id,
            }
        except stripe.error.StripeError as e:
            logger.error('[Renewal] Error applying coupon or updating subscription', extra={
                'error': str(e),
                'traceback': traceback.format_exc(),
                **log_extras
            })
            return None

    # Step 2: If `update` is true but not renew, set session parameters for subscription update
    elif update:
        session_params = {
            'return_url': return_url,
            'customer': stripe_customer_id,
            'flow_data': {
                "type": "subscription_update",
                "subscription_update": {
                    "subscription": stripe_subscription_id
                }
            }
        }

    # Step 3: Default case, without any special update or renew actions
    else:
        session_params = {
            'return_url': return_url,
            'customer': stripe_customer_id
        }

    # Log session parameters
    logger.info('[Create Portal Session] Session parameters', extra={
        'sessionParams': session_params,
        **log_extras
    })

    # Create and return the portal session
    try:
        portal_session = stripe.billing_portal.Session.create(**session_params)
        logger.info('[Create Portal Session] Successfully created session', extra={
            'portalSessionId': portal_session.id,
            **log_extras
        })
        return portal_session
    except stripe.error.StripeError as e:
        logger.error('[Create Portal Session] Error creating portal session', extra={
            'error': str(e),
            'traceback': traceback.format_exc(),
            **log_extras
        })
        return None
    
class CreatePortalSessionView(View):
    def post(self, request, *args, **kwargs):
        # Log request receipt

        username = self.request.user.username
        stripe_customer_id = self.request.user.profile.stripe_customer_id
        stripe_subscription_id = self.request.user.profile.stripe_subscription_id

        log_extras = {
            'username': username, 
            'stripeCustomerId': stripe_customer_id,
            'stripeSubscriptionId': stripe_subscription_id
        }

        try:
            # Log the body of the request
            logger.info(f'[Create Portal Session] Request body', extra={
                'body': request.body,
                **log_extras
            })

            # Parse the request body
            data = json.loads(request.body)
            return_url = data.get('return_url', None)
            update = data.get('update', None)
            renew = data.get('renew', None)

            portal_session = create_portal_session(stripe_customer_id,stripe_subscription_id,return_url,update,renew)

            #REMOVE TO TAKE THEM TO PORTAL ON RENEWAL
            if renew:
                #TODO send an email confirming the change
                return JsonResponse({'url': envurlbase + '/chat/'})
            
            return JsonResponse(portal_session)
            

        except json.JSONDecodeError as e:
            # Log JSON parsing error
            logger.error(f'[Create Portal Session] Error decoding JSON', extra={
                'error': repr(e),
                'traceback': traceback.format_exc(),
                **log_extras 
            })
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)

        except stripe.error.StripeError as e:
            # Log any Stripe API errors
            logger.error(f'[Create Portal Session] Stripe Error', extra={
                'error': repr(e),
                'traceback': traceback.format_exc(),
                **log_extras 
            })
            return JsonResponse({'error': 'Stripe API error occurred.'}, status=500)

        except Exception as e:
            # Log any other unexpected errors
            logger.error(f'[Create Portal Session] Unexpected Error', extra={
                'error': repr(e),
                'traceback': traceback.format_exc(),
                **log_extras 
            })
            return JsonResponse({'error': 'An unexpected error occurred.'}, status=500)


class DiscordSubscribeView(TemplateView):
    template_name = "payments/home_discord.html"  # Point to the new template

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['stripe_publishable_key'] = stripe_publishable_key

        context['essentialmonthlyid'] = essentialmonthlyid
        context['essentialyearlyid'] = essentialyearlyid
        context['premiummonthlyid'] = premiummonthlyid
        context['premiumyearlyid'] = premiumyearlyid
        context['ultimatemonthlyid'] = ultimatemonthlyid
        context['ultimateyearlyid'] = ultimateyearlyid
        context['premiumdiscordid'] = premiumdiscordid
        context['envurlbase'] = envurlbase
        context['discordOAuthUrl'] = oauth_url

        auth = self.request.user.is_authenticated
       

        username = self.request.user.username


        if auth:
            try:
                if username:
                    context['username'] = username
                    context['is_logged_in'] = True
                else:
                    context['username'] = "user-not-logged-in"
                    context['is_logged_in'] = False
            except: 
                context['username'] = "user-not-logged-in"
                context['is_logged_in'] = False
            try:
                # Get user profile
                profile = self.request.user.profile
                if profile:
                    # Add profile-related data to context
                    context['plan_id'] = profile.plan_id
                    context['subscription_canceled'] = profile.subscription_canceled
                    context['discord_username'] = profile.discord_Username or "no-discord-username"
                else:
                    context['plan_id'] = "no-plan"
                    context['subscription_canceled'] = True
                    context['discord_username'] = "no-discord-username"
            except Profile.DoesNotExist:
                    # Handle case when profile does not exist
                    logger.warning(f"[Discord Subscribe] Profile not found for user", extra={
                        'username': username
                    })
                    context['plan_id'] = "no-plan"
                    context['subscription_canceled'] = True
                    context['discord_username'] = "no-discord-username"    
        else:
            context['username'] = "user-not-logged-in"
            context['is_logged_in'] = False
            context['plan_id'] = "no-plan"
            context['subscription_canceled'] = True
            context['discord_username'] = "no-discord-username"    

        log_extras = {
            'username': username,
            'isLoggedIn': context['is_logged_in'],
            'planId': context['plan_id'],
            'discordUsername': context['discord_username'],
            'subscriptionCancelled': context['subscription_canceled']
        }

        logger.info('[Discord Subscribe] Completed', extra=log_extras)

        context['plans'] = get_stripe_plans(log_extras)
        try:
            if self.request.user.is_authenticated:
                # Retrieve the subscription & product
                subscription = self.request.user.profile.subscription
                # Feel free to fetch any additional data from 'subscription' or 'product'
                # https://stripe.com/docs/api/subscriptions/object
                # https://stripe.com/docs/api/products/object
                context.update({
                        "subscription": subscription
                    })
            return context
        except StripeCustomer.DoesNotExist:
            return context

class ModifyConfirmView(TemplateView):
    template_name = "payments/modify_confirm.html"  # Point to the new template

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        subscription_id = kwargs.get('subscription_id')
        cancel_coupon = stripe.Coupon.retrieve(cancel_coupon_id)
        percent_off = cancel_coupon.percent_off
        subscription = stripe.Subscription.retrieve(subscription_id)
        price_id = subscription['items']['data'][0]['plan']['id']
        context['price_id'] = price_id
        context['cancel_coupon_id'] = cancel_coupon_id
        context['stripe_publishable_key'] = stripe_publishable_key

        try:
            subscription_status = stripe.Subscription.retrieve(subscription_id).status
        except:
            subscription_status = None

        context['subscription_status'] = subscription_status

        # Attempt to convert percent_off to float if it's not already and then round it
        if isinstance(percent_off, (int, float)):
            percent_off_rounded = round(float(percent_off), 0)
            context['percent_off'] = int(percent_off_rounded)  # Ensure it's an integer
        else:
            context['percent_off'] = 0
        context['duration_in_months'] = cancel_coupon.duration_in_months
        

        auth = self.request.user.is_authenticated
        username = self.request.user.username

        context['envurlbase'] = envurlbase


        if auth:
            try:
                if username:
                    context['username'] = username
                    context['is_logged_in'] = True
                    context['subscription_id'] = subscription_id
                else:
                    context['username'] = "user-not-logged-in"
                    context['is_logged_in'] = False
                    context['subscription_id'] = "no-subscription-id"
            except: 
                context['username'] = "user-not-logged-in"
                context['is_logged_in'] = False
                context['subscription_id'] = "no-subscription-id"
            try:
                # Get user profile
                profile = self.request.user.profile
                if profile:
                    # Add profile-related data to context
                    context['plan_id'] = profile.plan_id
                    context['current_price'] = stripe.Price.retrieve(profile.plan_id).unit_amount / 100
                    current_price = context['current_price']
                    discounted_price = current_price * (1 - (percent_off / 100))
                    new_price = int(discounted_price * 100) / 100.0  # Truncate to 2 decimal places
                    context['new_price'] = new_price
                else:
                    context['plan_id'] = "no-plan"
            except Profile.DoesNotExist:
                    # Handle case when profile does not exist
                    logger.warning(f"[Modify Subscribe] Profile not found for user", extra={
                        'username': username
                    })
                    context['plan_id'] = "no-plan"
        else:
            context['username'] = "user-not-logged-in"
            context['is_logged_in'] = False
            context['plan_id'] = "no-plan"

        log_extras = {
            'username': username,
            'isLoggedIn': context['is_logged_in'],
            'planId': context['plan_id'],
        }

        return context


class SuccessView(LoginRequiredMixin, TemplateView):
    template_name = "payments/success.html"


class CancelView(LoginRequiredMixin, TemplateView):
    template_name = "payments/cancel.html"

def sendEmail(to_address,from_address,template_id,dynamic_data):
                
        message = Mail(
        from_email=from_address,
        to_emails=to_address)
        
        message.dynamic_template_data = dynamic_data
        message.template_id = template_id
        # create our sendgrid client object, pass it our key, then send and return our response objects
        try:
            sg = sendgrid.SendGridAPIClient(api_key = os.environ.get('SENDGRID_API_KEY'))
            response = sg.send(message)
            code, body, headers = response.status_code, response.body, response.headers
            logger.info('Email Sent', extra={
                'to_address': to_address,
                'from_address': from_address,
                'template_id': template_id,
                'dynamic_data': dynamic_data,
                'response': response
            })
        except Exception as e:
            logger.error('Email Error', extra={
                'error': repr(e),
                'traceback': traceback.format_exc(),
                'to_address': to_address,
                'from_address': from_address,
                'template_id': template_id,
                'dynamic_data': dynamic_data
            })
        return str(response.status_code)

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE', None)

    logger.info('[Stripe Webhook] Webhook Received', extra={})
    
    try:
        # Verify the webhook signature
        
        event = stripe.Webhook.construct_event(
            payload, sig_header, STRIPE_ENDPOINT_SECRET
        )
        

    except ValueError:
        # Invalid payload
        return JsonResponse({'error': 'Invalid payload'}, status=400)
    except stripe.error.SignatureVerificationError:
        # Invalid signature
        return JsonResponse({'error': 'Invalid signature'}, status=400)

    # Handle the event based on the event type
    event_type = event['type']

    # Handle session completed (new subscription or upgrade)
    if event_type == 'checkout.session.completed':
        session = event['data']['object']

        client_reference_id = session.get('client_reference_id')  # Username reference
        stripe_customer_id = session.get('customer')  # Stripe customer ID
        stripe_subscription_id = session.get('subscription')  # Stripe subscription ID

        try:
            user = User.objects.get(username=client_reference_id)
            profile = user.profile
            profile.stripe_customer_id = stripe_customer_id
            profile.stripe_subscription_id = stripe_subscription_id

            # Retrieve the subscription object from Stripe
            if stripe_subscription_id:
                subscription = stripe.Subscription.retrieve(stripe_subscription_id)
                interval = subscription['plan']['interval']
                current_period_start = subscription['current_period_start']
                current_period_end = subscription['current_period_end']
                plan_id = subscription['plan']['id']
                plan_nickname = subscription['plan'].get('nickname', 'No nickname')
                trial_start = subscription.get('trial_start', None)

                # Update the profile with subscription details
                profile.subscription_interval = interval
                profile.subscription_current_period_start = current_period_start
                profile.subscription_current_period_end = current_period_end
                profile.plan_id = plan_id
                profile.plan_nickname = plan_nickname

            profile.save()

            logger.info(f"[Stripe Webhook] Profile Updated", extra={
                'subInterval': interval,
                'currentPeriodStart': current_period_start,
                'currentPeriodEnd': current_period_end,
                'planId': plan_id,
                'planNickname': plan_nickname,
                'trialStart': subscription['trial_start'],
                'username': user.username,
                'stripeCustomerId': stripe_customer_id,
                'stripeSubscriptionId': stripe_subscription_id,
                'event': 'chekcout.sesson.completed'
            })
            return JsonResponse({'status': 'success'}, status=200)

        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
        except Profile.DoesNotExist:
            return JsonResponse({'error': 'Profile not found'}, status=404)

    # Handle subscription renewal (recurring payment success)
    elif event_type == 'invoice.payment_succeeded':
        invoice = event['data']['object']
        stripe_customer_id = invoice['customer']
        stripe_subscription_id = invoice['subscription']

        try:
            # Find the user by Stripe customer ID
            profile = Profile.objects.get(stripe_customer_id=stripe_customer_id)
            user = profile.user

            # Retrieve the subscription object
            subscription = stripe.Subscription.retrieve(stripe_subscription_id)
            trial_start = subscription.get('trial_start', None)
            interval = subscription['plan']['interval']
            current_period_start = subscription['current_period_start']
            current_period_end = subscription['current_period_end']
            plan_id = subscription['plan']['id']
            plan_nickname = subscription['plan'].get('nickname', 'No nickname')

            # Update the profile with new subscription details (renewal)
            profile.stripe_subscription_id = stripe_subscription_id
            profile.subscription_interval = interval
            profile.subscription_current_period_start = current_period_start
            profile.subscription_current_period_end = current_period_end
            profile.plan_id = plan_id
            profile.plan_nickname = plan_nickname

            profile.save()
            logger.info(f"[Stripe Webhook] Profile Updated", extra={
                'subInterval': interval,
                'currentPeriodStart': current_period_start,
                'currentPeriodEnd': current_period_end,
                'planId': plan_id,
                'planNickname': plan_nickname,
                'trialStart': subscription['trial_start'],
                'username': user.username,
                'stripeCustomerId': stripe_customer_id,
                'stripeSubscriptionId': stripe_subscription_id,
                'event': 'invoice.payment_succeeded'
            })
            return JsonResponse({'status': 'success'}, status=200)

        except Profile.DoesNotExist:
            return JsonResponse({'error': 'Profile not found'}, status=404)

    # Handle subscription upgrades or changes
    elif event_type == 'customer.subscription.updated':
        subscription = event['data']['object']
        stripe_customer_id = subscription['customer']
        stripe_subscription_id = subscription['id']

        trial_start = subscription.get('trial_start', None)

        try:
            # Find the user by Stripe customer ID
            profile = Profile.objects.get(stripe_customer_id=stripe_customer_id)
            user = profile.user

            # Extract updated subscription details
            interval = subscription['plan']['interval']
            current_period_start = subscription['current_period_start']
            current_period_end = subscription['current_period_end']
            plan_id = subscription['plan']['id']
            plan_nickname = subscription['plan'].get('nickname', 'No nickname')
            updated_cancel_at_period_end = subscription.get('cancel_at_period_end', False)
            previous_cancel_at_period_end = event['data'].get('previous_attributes', {}).get('cancel_at_period_end', None)
            discount = subscription.get('discount', None)

            # Update profile with updated subscription information
            profile.stripe_subscription_id = stripe_subscription_id
            profile.subscription_interval = interval
            profile.subscription_current_period_start = current_period_start
            profile.subscription_current_period_end = current_period_end
            profile.plan_id = plan_id
            profile.plan_nickname = plan_nickname
            profile.trial_start = trial_start

            profile.save()
            logger.info(f"[Stripe Webhook] Profile Updated", extra={
                'subInterval': interval,
                'currentPeriodStart': current_period_start,
                'currentPeriodEnd': current_period_end,
                'planId': plan_id,
                'planNickname': plan_nickname,
                'username': user.username,
                'stripeCustomerId': stripe_customer_id,
                'stripeSubscriptionId': stripe_subscription_id,
                'event': 'customer.subscription.updated'
            })

            # sending the cancellation email
            if updated_cancel_at_period_end and previous_cancel_at_period_end is False:
                print('Sending cancellation email')
                cancel_template_id = os.environ.get('CANCEL_EMAIL_TEMPLATE_ID')
                # define offer url & text
                if discount is None:
                    # need a url and connected view that removes the cancel at period end and applies the 50% discount then redirects to the right portal view
                    offer_url = f"{envurlbase}/subscribe/modify/confirm/{stripe_subscription_id}/"
                    percent_off = int(stripe.Coupon.retrieve(cancel_coupon_id).percent_off)
                    offer_text = f"Renew At a {percent_off}% Discount for {stripe.Coupon.retrieve(cancel_coupon_id).duration_in_months} months!"
                    
                else:
                    offer_url = f"https://form.typeform.com/to/ZrOZcMJj#sub_id={stripe_subscription_id}"
                    offer_text = "Let us know why"
                #should just make this an environment variable
                from_address = "ryan@pine-sports.com"
                to_address = [user.email]

                dynamic_data = {
                        'offer_url': offer_url,
                        'offer_text': offer_text,
                    }
                try:
                    sendEmail(to_address,from_address,cancel_template_id,dynamic_data)
                    logger.warn('Cancellation envent')
                except Exception as e:
                    logger.error('sendemail error: ', extra={
                        'error': repr(e),
                        'traceback': traceback.format_exc(),
                        'to_address': to_address,
                        'from_address': from_address,
                        'template_id': cancel_template_id,
                        'dynamic_data': dynamic_data
                    })
            else:
                logger.info('No cancellation email sent')

            return JsonResponse({'status': 'success'}, status=200)

        except Profile.DoesNotExist:
            return JsonResponse({'error': 'Profile not found'}, status=404)

    # Handle subscription cancellation (but keep access until the period ends)
    elif event_type == 'customer.subscription.deleted':
        subscription = event['data']['object']
        stripe_customer_id = subscription['customer']
        trial_start = subscription.get('trial_start', None)

        try:
            # Find the user by Stripe customer ID
            profile = Profile.objects.get(stripe_customer_id=stripe_customer_id)
            user = profile.user

            # Mark the subscription as canceled but retain access until the end of the period
            profile.subscription_canceled = True

            logger.info(f"[Stripe Webhook] Profile Updated", extra={
                'username': user.username,
                'stripeCustomerId': stripe_customer_id,
                'event': 'customer.subscription.deleted'
            })
            profile.save()

            return JsonResponse({'status': 'subscription canceled, access retained'}, status=200)

        except Profile.DoesNotExist:
            return JsonResponse({'error': 'Profile not found'}, status=404)
    
    elif event_type == 'customer.subscription.created':
        subscription = event['data']['object']
        stripe_customer_id = subscription['customer']
        stripe_subscription_id = subscription['id']

        try:
            # Find the user by Stripe customer ID
            profile = Profile.objects.get(stripe_customer_id=stripe_customer_id)
            user = profile.user

            # Retrieve the subscription object
            subscription = stripe.Subscription.retrieve(stripe_subscription_id)
            interval = subscription['plan']['interval']
            current_period_start = subscription['current_period_start']
            current_period_end = subscription['current_period_end']
            plan_id = subscription['plan']['id']
            plan_nickname = subscription['plan'].get('nickname', 'No nickname')
            customer = stripe.Customer.retrieve(stripe_customer_id)
            # email = customer['email']

            # Update the profile with new subscription details (renewal)
            profile.stripe_subscription_id = stripe_subscription_id
            profile.subscription_interval = interval
            profile.subscription_current_period_start = current_period_start
            profile.subscription_current_period_end = current_period_end
            profile.plan_id = plan_id
            profile.plan_nickname = plan_nickname
            

            profile.save()
            logger.info(f"[Stripe Webhook] Profile Updated", extra={
                'subInterval': interval,
                'currentPeriodStart': current_period_start,
                'currentPeriodEnd': current_period_end,
                'planId': plan_id,
                'planNickname': plan_nickname,
                'username': user.username,
                'stripeCustomerId': stripe_customer_id,
                'stripeSubscriptionId': stripe_subscription_id,
                'event': 'customer.subscription.created'
            })
            # attempt to send the welcome email
            if plan_id != premiumdiscordid:
                welcome_template_id = os.environ.get('WELCOME_EMAIL_TEMPLATE_ID')
                from_address = "ryan@pine-sports.com" 
                to_address = [user.email]
                dynamic_data = {
                        'Name': customer['name'],
                    }
                try:
                    sendEmail(to_address,from_address,welcome_template_id,dynamic_data)
                except Exception as e:
                    logger.error('sendemail error: ', extra={
                        'error': repr(e),
                        'traceback': traceback.format_exc(),
                        'to_address': to_address,
                        'from_address': from_address,
                        'template_id': welcome_template_id,
                        'dynamic_data': dynamic_data
                    })
            else:
                logger.warn('No welcome email sent for discord subscription')

            return JsonResponse({'status': 'success'}, status=200)



        except Profile.DoesNotExist:
            return JsonResponse({'error': 'Profile not found'}, status=404)

    
        
    # If event is not handled
    return JsonResponse({'status': 'unhandled event'}, status=400)

@login_required
def cancel_subscription(request):
    if request.method == 'GET':
        try:
            stripe_customer = StripeCustomer.objects.get(user=request.user)
            stripe.Subscription.modify(
                stripe_customer.stripeSubscriptionId,
                cancel_at_period_end=True,
                )
            messages.success(request, 'Successfully cancelled subscription')
        except Exception as e:
            logger.warning(f"Error occurred during cancelling subscription: {repr(e)}")
        return redirect('settings')

