from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from blog.models import Post, Comment, Preference, CommentLike
from users.models import Follow, Profile
from notifications.models import UserNotification as Notification
from pineproxy.models import PredictNFLUserFormData, PredictNBAUserFormData, PredictNHLUserFormData, PredictMLBUserFormData
import random
from django.contrib.auth.models import User
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from .forms import NewCommentForm, PostForm
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseRedirect
from django.urls import reverse_lazy,reverse
from django.contrib.auth.models import User
from django.template.loader import render_to_string
import json
from django.db.models import Q
from django.utils import timezone
from uuid import uuid4
from django.views import generic
from bs4 import BeautifulSoup
import os, datetime
import boto3
from django.conf import settings as conf_settings
import re
from pineproxy.models import Sports_name
from users.models import UserSportsChoices
import requests
from io import BytesIO
#robots.txt
from django.http import HttpResponse
from django.views.decorators.http import require_GET
from PIL import Image
import difflib
import re
from chat.views import get_jaxon_info
#leaderboard
import pandas as pd
from io import StringIO
from django.conf import settings

#Logger
import logging,traceback
logger = logging.getLogger('django')

#new filder
from datetime import date, timedelta

from chat_bot_ai.chat_bot_ai import get_open_ai_query_chat_bot_ai, read_response, get_research, construct_research_prompt, construct_data_prompt, get_image_search, construct_editor_prompt, construct_fact_checker_prompt, construct_fact_check_editor_prompt, string_to_array, full_factcheck, get_answer_from_perplexity

# os.environ["OPENAI_API_KEY"] = "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"

@require_GET
def robots_txt(request):
    lines = [
        "User-Agent: *",
        "Disallow: */update/",
        "Disallow: */del/",
        "Disallow: */predict/*",
        "Disallow: */stats/*",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")

@require_GET
def last_post(request):
    enddate = date.today() + timedelta(days=1)
    startdate = enddate - timedelta(days=10)
    queryset = Post.objects.active().filter(publish__range=[startdate, enddate]).order_by('-publish')[:1]
    post_number = queryset[0].pk
    return HttpResponse(post_number, content_type="text/plain")

@require_GET
def favicon_ico(request):
    return redirect('https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/icons/favicon.ico')


def check_if_chart(url):
    is_chart = False
    try:
        response = requests.get(url)

        # Load the image from the image data
        image_bytes = response.content

        # Create an Amazon Rekognition client
        rekognition = boto3.client('rekognition', aws_access_key_id=conf_settings.AWS_ACCESS_KEY_ID,
                                   aws_secret_access_key=conf_settings.AWS_SECRET_ACCESS_KEY, region_name='us-east-1')

        # Call the DetectText operation
        response = rekognition.detect_text(Image={'Bytes': image_bytes})
        # Get the list of detected text blocks
        text_blocks = response['TextDetections']

        # Iterate through the text blocks and check for chart-like features
        for block in text_blocks:
            if block['Type'] == 'LINE' and block['Confidence'] > 90:
                # Check for axis labels, tick marks, gridlines, etc.
                if 'games without' in block['DetectedText'].lower() or 'player' in block[
                    'DetectedText'].lower() or "opponent" in block['DetectedText'].lower() or "date" in block[
                    'DetectedText'].lower() or "team" in block['DetectedText'].lower():
                    is_chart = True # Found a chart!
                    break
    except:
        pass

    return is_chart


def get_chart_color(url):
    response = requests.get(url)

    # Load the image from the image data
    image = Image.open(BytesIO(response.content))

    # Convert the image to grayscale
    gray_image = image.convert('L')

    # Get the width and height of the image
    width, height = gray_image.size

    # Calculate the average pixel value
    total_value = 0
    for x in range(width):
        for y in range(height):
            total_value += gray_image.getpixel((x, y))
    average_value = total_value / (width * height)

    # Determine whether the image is mostly white or mostly black based on the average pixel value
    if average_value > 128: return "white-chart" #mostly white
    else: return "black-chart" #mostly black

def detect_charts(html):
    # Parse the HTML using BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')

    # Find all images in the HTML
    images = soup.find_all('img')

    for image in images:
        # Check if the image has a src attribute
        if 'src' in image.attrs:
            # Get the image URL
            image_url = image['src']
            is_chart = check_if_chart(image_url)
            if is_chart:
                # Get the chart color
                chart_color = get_chart_color(image_url)
                # Add the chart color to the image tag
                current_classes = image.get('class', [])
                for current_class in current_classes:
                    print(current_class)
                    if 'chart' in current_class:
                        print("Removing old chart class")
                        current_classes.remove(current_class)
                current_classes.append(chart_color)
                image['class'] = current_classes

    # Return the modified HTML
    return str(soup)

def is_users(post_user, logged_user):
    status = False
    if post_user == logged_user:
        status = True
    elif check_user_moderator(logged_user):
        status = True
    return status


def get_ip(request):
    try:
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get("REMOTE_ADDR")
    except:
        ip = ""
    return ip

#clean html contains text return
def cleanhtml(raw_html):
    cleanr=re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext

#checks if user has AI access
def check_ai_user(user):
    if user:
        is_user_group = False
        is_user_group = user.groups.filter(name__in=['ai_user']).exists()
        if is_user_group:
            return True
        else:
            return False

def check_gpt_user(user):
    if user:
        is_user_group = False
        is_user_group = user.groups.filter(name__in=['gpt_user']).exists()
        if is_user_group:
            return True
        else:
            return False

def check_prop_master_user(user):
    if user:
        is_user_group = False
        is_user_group = user.groups.filter(name__in=['prop_master_user']).exists()
        if is_user_group:
            return True
        else:
            return False

#check user has access stats
def check_user_groups(user):
    if user:
        is_user_group = False
        is_user_group = user.groups.filter(name__in=['data_access_user','admin_user']).exists()
        if is_user_group:
            return True
        else:
            return False

#check moderator user
def check_user_moderator(user):
    if user:
        is_access = False
        is_access = user.groups.filter(name__in=['moderator_user']).exists()
        if is_access:
            return True
        else:
            return False


class CommunityView(generic.ListView):
    template_name = 'blog/home.html'
    context_object_name = 'posts'
    paginate_by = 10

    def get_queryset(self, **kwargs):

        community_name = self.kwargs['community_name']

        s3_file_path = "communities/communities.csv"

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                    Key=s3_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        communities = pd.read_csv(StringIO(csv_string))

        try:
            community = communities.loc[communities["community_name"].str.lower() == community_name.lower()].reset_index(drop=True)
            title_search = community["title_search"][0]
        except:
            title_search = community_name

        # get post by user selected sports
        try:
            # obj_user_sports = UserSportsChoices.objects.get(user=self.request.user.id)
            obj_user_sports = UserSportsChoices.objects.filter(user=self.request.user.id)[0].sports.all().values_list(
                'id', flat=True)
            # obj_user_sports = UserSportsChoices.objects.get(user=self.request.user.id).sports.all()
        except:
            obj_user_sports = None

        # Sorts by score.  Let's see how inefficient this is.  Might want to save score in database, and recalculate in an asynchronous manner
        if obj_user_sports:
            # Adds "Pine News" (0) to the list
            obj_user_sports_list = []
            for object in obj_user_sports:
                obj_user_sports_list.append(object)
                # Limit the number of Posts
            #qset = Post.objects.active().filter(related_sport__in=obj_user_sports_list).order_by('-publish')[:150]
            qset = Post.objects.active().filter(related_sport__in=obj_user_sports_list).filter(title__icontains=title_search).order_by('-publish')[:150]
            #queryset = sorted(qset[:150], key=lambda x: x.score(), reverse=True)
            queryset = qset
            #based on a vote, sorted by new rather than rank
        else:
            #qset = Post.objects.latestPublish()
            qset = Post.objects.active().filter(title__icontains=title_search).order_by('-publish')[:150]
            #queryset = sorted(qset, key=lambda x: x.score(), reverse=True)
            queryset = qset
            # based on a vote, sorted by new rather than rank

        # sorted by post score
        # queryset = Post.objects.active().order_by('-post_score')

        # if self.request.user.is_staff or self.request.user.is_superuser:
        #    queryset = Post.objects.all()

        return queryset

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        is_user_group = check_user_groups(self.request.user)

        is_jaxon_user, current_chat_count, max_chat_count, monthly_period_end_string, customer_portal_url = get_jaxon_info(self.request.user)
        #is_jaxon_user = check_jaxon_user(self.request.user)
        context['is_jaxon_user'] = is_jaxon_user

        community_name = self.kwargs['community_name']

        s3_file_path = "communities/communities.csv"

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                    Key=s3_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        communities = pd.read_csv(StringIO(csv_string))

        found_community = False
        try:

            community = communities.loc[communities["community_name"].str.lower() == community_name.lower()].reset_index(drop=True)
            discord_id = community["discord_id"][0]
            community_name = community["community_name"][0]
            found_community = True
            has_discord = community["has_discord"][0]
            discord_link = community["discord_link"][0]
            context["community_name"] = community_name
            context["has_discord"] = has_discord
            context["discord_link"] = discord_link
        except:
            context["community_name"] = community_name


        context['is_group'] = is_user_group
        context['is_ai_user'] = check_ai_user(self.request.user)
        # context['is_prop_master_user'] = check_prop_master_user(self.request.user)
        is_moderator = check_user_moderator(self.request.user)
        context['is_moderator'] = is_moderator
        # Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name', flat=True)
        context['sports_name'] = sports_name
        context['sort'] = "top"
        context['community'] = True


        def get_link(user_name):
            user_name = "<a href='https://www.pine-sports.com/user/{}'>{}</a>".format(user_name, user_name)
            return user_name
        try:
            s3_file_path = f"communities/{discord_id}_leaderboard.csv"

            client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                  aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
            csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                        Key=s3_file_path)
            body = csv_obj['Body']
            csv_string = body.read().decode('utf-8')
            last_weeks_trophies = pd.read_csv(StringIO(csv_string))
            last_weeks_trophies["Rank Number"] = last_weeks_trophies["Wins"] - (last_weeks_trophies["Losses"] / 1000)
            last_weeks_trophies["Rank"] = last_weeks_trophies["Rank Number"].rank(method='min', ascending=False).astype(int)
            last_weeks_trophies = last_weeks_trophies.sort_values(['Rank'])
            trophy_leaderboard = last_weeks_trophies.head(10)

            trophy_leaderboard_pd = pd.DataFrame()
            logged_user = self.request.user
            try:
                for i, row in trophy_leaderboard.iterrows():
                    try:
                        member = User.objects.filter(username__iexact=row["Name"])[0]
                        follow_status = Follow.objects.filter(user=logged_user, follow_user=member).exists()
                        trophy_leaderboard_pd = trophy_leaderboard_pd.append({"member": member, "optimized_image_url": Profile.objects.filter(user=member)[0].optimized_image_url, "rank": row["Rank"], "wins": row["Wins"], "losses": row["Losses"], "follow_status": follow_status}, ignore_index=True)
                    except:
                        trophy_leaderboard_pd = trophy_leaderboard_pd.append({"member": row["Name"], "optimized_image_url": "https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.amazonaws.com/media/defaultProfile.png?v=1", "rank": row["Rank"], "wins": row["Wins"], "losses": row["Losses"], "follow_status": True}, ignore_index=True)
            except Exception as e:
                print(e)
            trophy_leaderboard_pd["rank"] = trophy_leaderboard_pd["rank"].astype(int)
            trophy_leaderboard_pd["wins"] = trophy_leaderboard_pd["wins"].astype(int)
            trophy_leaderboard_pd["losses"] = trophy_leaderboard_pd["losses"].astype(int)
            context["trophy_leaderboard_pd"] = trophy_leaderboard_pd
            trophy_leaderboard["Member"] = trophy_leaderboard["Name"].apply(get_link)
            columns = ["Rank", "Member", "Wins", "Losses"]
            context["trophy_leaderboard"] = trophy_leaderboard[columns].to_html(index=False).replace("&lt;","<").replace("&gt;", ">")


        except:
            #if there is no leaderboard, found_community should be false
            found_community = False

        context["found_community"] = found_community
        context["suggest_followers"] = False
        context["got_mlb_top_charts"] = False
        context["got_nfl_top_charts"] = False
        context["got_nba_top_charts"] = False
        context["got_nhl_top_charts"] = False

        ads = pd.DataFrame()
        #sporttrade_image_number = int(random.randrange(1, 3))
        #sporttrade_ad = {"title": "A New Way to Bet on Sports = Trading Sports!", "post_number": int(random.randrange(1,4)), "link": "https://sporttrade.onelink.me/evxw/Pine", "image": f"images/ST-Pine-StoriesBanner_v{sporttrade_image_number}.png"}
        #ads = ads.append(sporttrade_ad, ignore_index=True)

        context["ads"] = ads

        try:
            new_notifications = (
                        Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).exclude(
                            is_seen=True).count() > 0)
            notification_count = Notification.objects.filter(user=self.request.user).exclude(
                sender=self.request.user).count()
            recent_notifications = Notification.objects.filter(user=self.request.user).exclude(
                sender=self.request.user).order_by('-date')[:4]

            context["new_notifications"] = new_notifications
            context["notification_count"] = notification_count
            context["recent_notifications"] = recent_notifications

        except:
            context["new_notifications"] = False
            context["notification_count"] = 0
            context["recent_notifications"] = []

        logger.info("{} {} {} {}".format(self.request.method, self.request.get_full_path(), get_ip(self.request),
                                         self.request.user.id))

        try:
            context['following_count'] = following_users_id = self.request.user.profile.following.count()
        except:
            context['following_count'] = 0
        return context

class PostListView(generic.ListView):
    template_name = 'blog/home.html'
    context_object_name = 'posts'
    paginate_by = 10

    def get_queryset(self):
        #get post by user selected sports
        try:
            # obj_user_sports = UserSportsChoices.objects.get(user=self.request.user.id)
            obj_user_sports = UserSportsChoices.objects.filter(user=self.request.user.id)[0].sports.all().values_list('id',flat=True)
            # obj_user_sports = UserSportsChoices.objects.get(user=self.request.user.id).sports.all()
        except:
            obj_user_sports = None

        #Sorts by score.  Let's see how inefficient this is.  Might want to save score in database, and recalculate in an asynchronous manner
        if obj_user_sports:
            #Adds "Pine News" (0) to the list 
            obj_user_sports_list = []
            for object in obj_user_sports:
                obj_user_sports_list.append(object)            
            #Limit the number of Posts
            qset = Post.objects.active().filter(related_sport__in=obj_user_sports_list).order_by('-publish')[:150]
            queryset = sorted(qset[:150],key=lambda x: x.score(), reverse=True)

        else:
            queryset = sorted(Post.objects.latestPublish(), key=lambda x: x.score(), reverse=True)

        #sorted by post score
        #queryset = Post.objects.active().order_by('-post_score')

        #if self.request.user.is_staff or self.request.user.is_superuser:
        #    queryset = Post.objects.all()
        
        return queryset


    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        is_user_group = check_user_groups(self.request.user)

        is_jaxon_user, current_chat_count, max_chat_count, monthly_period_end_string, customer_portal_url = get_jaxon_info(self.request.user)
        #is_jaxon_user = check_jaxon_user(self.request.user)
        context['is_jaxon_user'] = is_jaxon_user

        context['is_group']=is_user_group
        context['is_ai_user'] = check_ai_user(self.request.user)
        #context['is_prop_master_user'] = check_prop_master_user(self.request.user)
        is_moderator = check_user_moderator(self.request.user)
        context['is_moderator']=is_moderator
        #Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name',flat=True)
        context['sports_name']=sports_name
        context['sort'] = "top"
        context['community'] = False
        context["found_community"] = False

        s3_file_path = "leaderboards/predict_leaderboards.csv"

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                    Key=s3_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        predict_leaderboards = pd.read_csv(StringIO(csv_string))

        def get_link(user_name):
            user_name = "<a href='https://www.pine-sports.com/user/{}'>{}</a>".format(user_name, user_name)
            return user_name

        nba_winner_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NBA") & (predict_leaderboards["Predict Type"] == "Winner")][["Rank","Member","Model Score"]]
        nba_winner_leaderboard["Member"] = nba_winner_leaderboard["Member"].apply(get_link)
        context["nba_winner_leaderboard"] = nba_winner_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nba_ats_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NBA") & (predict_leaderboards["Predict Type"] == "Winner Against The Spread")][["Rank","Member","Model Score"]]
        nba_ats_leaderboard["Member"] = nba_ats_leaderboard["Member"].apply(get_link)
        context["nba_ats_leaderboard"] = nba_ats_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nba_ou_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NBA") & (predict_leaderboards["Predict Type"] == "Over-Under Result")][["Rank","Member","Model Score"]]
        nba_ou_leaderboard["Member"] = nba_ou_leaderboard["Member"].apply(get_link)
        context["nba_ou_leaderboard"] = nba_ou_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nfl_winner_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NFL") & (predict_leaderboards["Predict Type"] == "Winner")][["Rank","Member","Model Score"]]
        nfl_winner_leaderboard["Member"] = nfl_winner_leaderboard["Member"].apply(get_link)
        context["nfl_winner_leaderboard"] = nfl_winner_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nfl_ats_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NFL") & (predict_leaderboards["Predict Type"] == "Winner Against The Spread")][["Rank","Member","Model Score"]]
        nfl_ats_leaderboard["Member"] = nfl_ats_leaderboard["Member"].apply(get_link)
        context["nfl_ats_leaderboard"] = nfl_ats_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nfl_ou_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NFL") & (predict_leaderboards["Predict Type"] == "Over-Under Result")][["Rank","Member","Model Score"]]
        nfl_ou_leaderboard["Member"] = nfl_ou_leaderboard["Member"].apply(get_link)
        context["nfl_ou_leaderboard"] = nfl_ou_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nhl_winner_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NHL") & (predict_leaderboards["Predict Type"] == "Winner")][["Rank","Member","Model Score"]]
        nhl_winner_leaderboard["Member"] = nhl_winner_leaderboard["Member"].apply(get_link)
        context["nhl_winner_leaderboard"] = nhl_winner_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nhl_ats_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NHL") & (predict_leaderboards["Predict Type"] == "Winner Against The Spread")][["Rank","Member","Model Score"]]
        nhl_ats_leaderboard["Member"] = nhl_ats_leaderboard["Member"].apply(get_link)
        context["nhl_ats_leaderboard"] = nhl_ats_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nhl_ou_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NHL") & (predict_leaderboards["Predict Type"] == "Over-Under Result")][["Rank","Member","Model Score"]]
        nhl_ou_leaderboard["Member"] = nhl_ou_leaderboard["Member"].apply(get_link)
        context["nhl_ou_leaderboard"] = nhl_ou_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        mlb_winner_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "MLB") & (predict_leaderboards["Predict Type"] == "Winner")][["Rank","Member","Model Score"]]
        mlb_winner_leaderboard["Member"] = mlb_winner_leaderboard["Member"].apply(get_link)
        context["mlb_winner_leaderboard"] = mlb_winner_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        mlb_ats_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "MLB") & (predict_leaderboards["Predict Type"] == "Winner Against The Spread")][["Rank","Member","Model Score"]]
        mlb_ats_leaderboard["Member"] = mlb_ats_leaderboard["Member"].apply(get_link)
        context["mlb_ats_leaderboard"] = mlb_ats_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        mlb_ou_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "MLB") & (predict_leaderboards["Predict Type"] == "Over-Under Result")][["Rank","Member","Model Score"]]
        mlb_ou_leaderboard["Member"] = mlb_ou_leaderboard["Member"].apply(get_link)
        context["mlb_ou_leaderboard"] = mlb_ou_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        context["model_count"] = PredictNFLUserFormData.objects.count() + PredictNBAUserFormData.objects.count() + PredictNHLUserFormData.objects.count() + PredictMLBUserFormData.objects.count()
        s3_file_path = "leaderboards/liic_leaderboard.csv"

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                    Key=s3_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        liic_leaderboard = pd.read_csv(StringIO(csv_string))

        def add_goat(goats):
            goats = "🐐 x {}".format(str(goats))
            return goats

        def get_link(user_name):
            user_name = "<a href='https://www.pine-sports.com/user/{}'>{}</a>".format(user_name, user_name)
            return user_name

        liic_leaderboard["Goats"] = liic_leaderboard["Goats"].apply(add_goat)
        liic_leaderboard["Member"] = liic_leaderboard["Member"].apply(get_link)
        liic_leaderboard = liic_leaderboard.head(10)
        context["liic_leaderboard"] = liic_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")


        s3_file_path = "leaderboards/last_weeks_trophies.csv"

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                    Key=s3_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        last_weeks_trophies = pd.read_csv(StringIO(csv_string))
        last_weeks_trophies["Rank"] = last_weeks_trophies["Rank"].astype(int)
        last_weeks_trophies["Trophies"] = last_weeks_trophies["Trophies"].astype(int)

        logged_user = self.request.user
        suggest_followers = False
        members_to_follow = pd.DataFrame()

        try:
            counter = 0
            for i, row in last_weeks_trophies.iterrows():
                member = User.objects.filter(username=row["Member"])[0]
                follow_status = Follow.objects.filter(user=logged_user, follow_user=member).exists()
                if not follow_status and (logged_user != member) and (len(str(member.username)) <= 18):
                    members_to_follow = members_to_follow.append({"member": member, "optimized_image_url": Profile.objects.filter(user=member)[0].optimized_image_url}, ignore_index=True)
                    counter = counter+1
                    if counter >= 10:
                        break

            if len(members_to_follow) >= 5:
                suggest_followers = True

        except Exception as e:
            print(e)

        context["members_to_follow"] = members_to_follow
        context["suggest_followers"] = suggest_followers
        context["follow_placement"] = random.randrange(2,3)
        trophy_leaderboard = last_weeks_trophies.head(10)
        trophy_leaderboard["Member"] = trophy_leaderboard["Member"].apply(get_link)
        context["trophy_leaderboard"] = trophy_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")


        got_mlb_top_charts = False
        got_nfl_top_charts = False
        got_nba_top_charts = False
        got_nhl_top_charts = False

        found_league = []
        for league in ["nfl", "nba", "nhl", "mlb"]:
            try:
                got_top_charts = False
                s3_file_path = f"static/prop_charts/{league}_top_charts.csv"

                client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                      aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
                csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME,
                                            Key=s3_file_path)
                body = csv_obj['Body']
                csv_string = body.read().decode('utf-8')
                top_charts = pd.read_csv(StringIO(csv_string))
                top_charts["filename"] = "prop_charts/" + top_charts["filename"]

                def get_link(data):
                    league = data[0]
                    player = data[1]
                    line = data[2]
                    prop = data[3]

                    link = f"https://www.pine-sports.com/stats/project/{league}/{player}/{prop}/{line}/10/"

                    return link

                top_charts["link"] = top_charts[["league", "player", "line", "prop"]].apply(get_link, axis=1)


                if len(top_charts) >= 5:
                    got_top_charts = True
                    found_league.append(league)

            except Exception as e:
                got_top_charts = False
                top_charts = pd.DataFrame()
                print(e)

            context[f"{league}_top_charts"] = top_charts
            context[f"got_{league}_top_charts"] = got_top_charts

        if len(found_league) > 0:
            beginning = 1
            end = 2

            for league in found_league:
                placement = random.randrange(beginning,end)
                context[f"{league}_charts_placement"] = placement
                beginning = placement+2
                end = beginning+1

        print("Got NBA Charts: ", got_nba_top_charts)
        print("TOP NBA CHART: ", context["nba_top_charts"])

        ads = pd.DataFrame()
        #sporttrade_image_number = int(random.randrange(1, 3))
        #sporttrade_ad = {"title": "A New Way to Bet on Sports = Trading Sports!", "post_number": int(random.randrange(1,4)), "link": "https://sporttrade.onelink.me/evxw/Pine", "image": f"images/ST-Pine-StoriesBanner_v{sporttrade_image_number}.png"}
        #ads = ads.append(sporttrade_ad, ignore_index=True)

        context["ads"] = ads

        s3_file_path = f"static/promotions/fantasy_sites.csv"

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME,
                                    Key=s3_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        fantasy_sites = pd.read_csv(StringIO(csv_string))

        context["fantasy_sites"] = fantasy_sites
        #context["fantasy_counter"] = random.randrange(0,2)
        context["fantasy_counter"] = 0

        try:
            new_notifications = (Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).exclude(is_seen=True).count() > 0)
            notification_count = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).count()
            recent_notifications = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).order_by('-date')[:4]

            context["new_notifications"] = new_notifications
            context["notification_count"] = notification_count
            context["recent_notifications"] = recent_notifications

        except:
            context["new_notifications"] = False
            context["notification_count"] = 0
            context["recent_notifications"] = []

        logger.info("{} {} {} {}".format(self.request.method,self.request.get_full_path(),get_ip(self.request),self.request.user.id))

        try:
            context['following_count'] = following_users_id = self.request.user.profile.following.count()
        except:
            context['following_count'] = 0
        return context


class PostListViewNew(generic.ListView):
    template_name = 'blog/home.html'
    context_object_name = 'posts'
    paginate_by = 10

    def get_queryset(self):

        #get post by user selected sports
        try:
            # obj_user_sports = UserSportsChoices.objects.get(user=self.request.user.id)
            obj_user_sports = UserSportsChoices.objects.filter(user=self.request.user.id)[0].sports.all().values_list('id',flat=True)
            # obj_user_sports = UserSportsChoices.objects.get(user=self.request.user.id).sports.all()
        except:
            obj_user_sports = None

        #Sorts by score.  Let's see how inefficient this is.  Might want to save score in database, and recalculate in an asynchronous manner
        if obj_user_sports:

            #Adds "Pine News" (0) to the list
            obj_user_sports_list = []
            for object in obj_user_sports:
                obj_user_sports_list.append(object)

            #Limit the number of Posts
            startdate = date.today()
            enddate = startdate + timedelta(days=100)
            queryset = Post.objects.active().filter(related_sport__in=obj_user_sports_list).filter(publish__range=[startdate, enddate]).order_by('-publish')[:150]

        else:
            # gets active posts ordered by publish date
            #Limit the number of Posts
            enddate = date.today() + timedelta(days=1)
            startdate = enddate - timedelta(days=100)
            queryset = Post.objects.active().filter(publish__range=[startdate, enddate]).order_by('-publish')[:150]

        # gets active posts ordered by publish date
        # queryset = Post.objects.active().order_by('-publish')

        return queryset

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        is_user_group = check_user_groups(self.request.user)

        logger.info("{} {} {} {}".format(self.request.method, self.request.get_full_path(), get_ip(self.request),
                                         self.request.user.id))

        is_jaxon_user, current_chat_count, max_chat_count, monthly_period_end_string, customer_portal_url = get_jaxon_info(self.request.user)
        #is_jaxon_user = check_jaxon_user(self.request.user)
        context['is_jaxon_user'] = is_jaxon_user

        context['is_group'] = is_user_group
        context['is_ai_user'] = check_ai_user(self.request.user)
        #context['is_prop_master_user'] = check_prop_master_user(self.request.user)
        is_moderator = check_user_moderator(self.request.user)
        context['is_moderator'] = is_moderator
        #Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name',flat=True)
        context['sports_name']=sports_name
        context['sort'] = "new"
        context['community'] = False
        context["found_community"] = False

        s3_file_path = "leaderboards/predict_leaderboards.csv"

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                    Key=s3_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        predict_leaderboards = pd.read_csv(StringIO(csv_string))

        def get_link(user_name):
            user_name = "<a href='https://www.pine-sports.com/user/{}'>{}</a>".format(user_name, user_name)
            return user_name

        nba_winner_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NBA") & (predict_leaderboards["Predict Type"] == "Winner")][["Rank","Member","Model Score"]]
        nba_winner_leaderboard["Member"] = nba_winner_leaderboard["Member"].apply(get_link)
        context["nba_winner_leaderboard"] = nba_winner_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nba_ats_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NBA") & (predict_leaderboards["Predict Type"] == "Winner Against The Spread")][["Rank","Member","Model Score"]]
        nba_ats_leaderboard["Member"] = nba_ats_leaderboard["Member"].apply(get_link)
        context["nba_ats_leaderboard"] = nba_ats_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nba_ou_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NBA") & (predict_leaderboards["Predict Type"] == "Over-Under Result")][["Rank","Member","Model Score"]]
        nba_ou_leaderboard["Member"] = nba_ou_leaderboard["Member"].apply(get_link)
        context["nba_ou_leaderboard"] = nba_ou_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nfl_winner_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NFL") & (predict_leaderboards["Predict Type"] == "Winner")][["Rank","Member","Model Score"]]
        nfl_winner_leaderboard["Member"] = nfl_winner_leaderboard["Member"].apply(get_link)
        context["nfl_winner_leaderboard"] = nfl_winner_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nfl_ats_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NFL") & (predict_leaderboards["Predict Type"] == "Winner Against The Spread")][["Rank","Member","Model Score"]]
        nfl_ats_leaderboard["Member"] = nfl_ats_leaderboard["Member"].apply(get_link)
        context["nfl_ats_leaderboard"] = nfl_ats_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nfl_ou_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NFL") & (predict_leaderboards["Predict Type"] == "Over-Under Result")][["Rank","Member","Model Score"]]
        nfl_ou_leaderboard["Member"] = nfl_ou_leaderboard["Member"].apply(get_link)
        context["nfl_ou_leaderboard"] = nfl_ou_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nhl_winner_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NHL") & (predict_leaderboards["Predict Type"] == "Winner")][["Rank","Member","Model Score"]]
        nhl_winner_leaderboard["Member"] = nhl_winner_leaderboard["Member"].apply(get_link)
        context["nhl_winner_leaderboard"] = nhl_winner_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nhl_ats_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NHL") & (predict_leaderboards["Predict Type"] == "Winner Against The Spread")][["Rank","Member","Model Score"]]
        nhl_ats_leaderboard["Member"] = nhl_ats_leaderboard["Member"].apply(get_link)
        context["nhl_ats_leaderboard"] = nhl_ats_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nhl_ou_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NHL") & (predict_leaderboards["Predict Type"] == "Over-Under Result")][["Rank","Member","Model Score"]]
        nhl_ou_leaderboard["Member"] = nhl_ou_leaderboard["Member"].apply(get_link)
        context["nhl_ou_leaderboard"] = nhl_ou_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        mlb_winner_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "MLB") & (predict_leaderboards["Predict Type"] == "Winner")][["Rank","Member","Model Score"]]
        mlb_winner_leaderboard["Member"] = mlb_winner_leaderboard["Member"].apply(get_link)
        context["mlb_winner_leaderboard"] = mlb_winner_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        mlb_ats_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "MLB") & (predict_leaderboards["Predict Type"] == "Winner Against The Spread")][["Rank","Member","Model Score"]]
        mlb_ats_leaderboard["Member"] = mlb_ats_leaderboard["Member"].apply(get_link)
        context["mlb_ats_leaderboard"] = mlb_ats_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        mlb_ou_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "MLB") & (predict_leaderboards["Predict Type"] == "Over-Under Result")][["Rank","Member","Model Score"]]
        mlb_ou_leaderboard["Member"] = mlb_ou_leaderboard["Member"].apply(get_link)
        context["mlb_ou_leaderboard"] = mlb_ou_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        context["model_count"] = PredictNFLUserFormData.objects.count() + PredictNBAUserFormData.objects.count() + PredictNHLUserFormData.objects.count() + PredictMLBUserFormData.objects.count()

        s3_file_path = "leaderboards/liic_leaderboard.csv"

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                    Key=s3_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        liic_leaderboard = pd.read_csv(StringIO(csv_string))

        def add_goat(goats):
            goats = "🐐 x {}".format(str(goats))
            return goats

        def get_link(user_name):
            user_name = "<a href='https://www.pine-sports.com/user/{}'>{}</a>".format(user_name, user_name)
            return user_name

        liic_leaderboard["Goats"] = liic_leaderboard["Goats"].apply(add_goat)
        liic_leaderboard["Member"] = liic_leaderboard["Member"].apply(get_link)
        context["liic_leaderboard"] = liic_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        s3_file_path = "leaderboards/last_weeks_trophies.csv"

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                    Key=s3_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        last_weeks_trophies = pd.read_csv(StringIO(csv_string))
        last_weeks_trophies["Rank"] = last_weeks_trophies["Rank"].astype(int)
        last_weeks_trophies["Trophies"] = last_weeks_trophies["Trophies"].astype(int)
        trophy_leaderboard = last_weeks_trophies.head(10)
        trophy_leaderboard["Member"] = trophy_leaderboard["Member"].apply(get_link)
        context["trophy_leaderboard"] = trophy_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        ads = pd.DataFrame()
        #sporttrade_image_number = int(random.randrange(1, 3))
        #sporttrade_ad = {"title": "A New Way to Bet on Sports = Trading Sports!", "post_number": int(random.randrange(1,4)), "link": "https://sporttrade.onelink.me/evxw/Pine", "image": f"images/ST-Pine-StoriesBanner_v{sporttrade_image_number}.png"}
        #ads = ads.append(sporttrade_ad, ignore_index=True)

        context["ads"] = ads

        try:
            context['following_count'] = following_users_id = self.request.user.profile.following.count()
        except:
            context['following_count'] = 0
        try:
            context["new_notifications"] = (Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).exclude(is_seen=True).count() > 0)
            context["notification_count"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).count()
            context["recent_notifications"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).order_by('-date')[:4]
        except:
            context["new_notifications"] = False
            context["notification_count"] = 0
            context["recent_notifications"] = []
        return context


class PostListViewFollowing(LoginRequiredMixin, generic.ListView):
    template_name = 'blog/home.html'
    context_object_name = 'posts'
    paginate_by = 10

    def get_queryset(self):
        user = self.request.user
        following_users_id = user.profile.following #get follwing user list
        #get post by user selected sports
        try:
            # obj_user_sports = UserSportsChoices.objects.get(user=self.request.user.id)
            obj_user_sports = UserSportsChoices.objects.filter(user=self.request.user.id)[0].sports.all().values_list('id',flat=True)
            # obj_user_sports = UserSportsChoices.objects.get(user=self.request.user.id).sports.all()
        except:
            obj_user_sports = None

        #Sorts by score.  Let's see how inefficient this is.  Might want to save score in database, and recalculate in an asynchronous manner
        if obj_user_sports:

            #Adds "Pine News" (0) to the list
            obj_user_sports_list = []
            for object in obj_user_sports:
                obj_user_sports_list.append(object)

            #Limit the number of Posts
            queryset = Post.objects.active().filter(related_sport__in=obj_user_sports_list).filter(author_id__in=following_users_id).order_by('-publish')[:150]
        else:
            # gets following users posts ordered by publish date        
            queryset = Post.objects.active().filter(author_id__in=following_users_id).order_by('-publish')[:150]

        return queryset

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        is_user_group = check_user_groups(self.request.user)

        logger.info("{} {} {} {}".format(self.request.method, self.request.get_full_path(), get_ip(self.request),
                                         self.request.user.id))

        is_jaxon_user, current_chat_count, max_chat_count, monthly_period_end_string, customer_portal_url = get_jaxon_info(self.request.user)
        #is_jaxon_user = check_jaxon_user(self.request.user)
        context['is_jaxon_user'] = is_jaxon_user

        context['is_group'] = is_user_group
        context['is_ai_user'] = check_ai_user(self.request.user)
        #context['is_prop_master_user'] = check_prop_master_user(self.request.user)
        is_moderator = check_user_moderator(self.request.user)
        context['is_moderator'] = is_moderator
        context['sort'] = "following"
        context['community'] = False
        context["found_community"] = False

        #Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name',flat=True)
        context['sports_name']=sports_name

        s3_file_path = "leaderboards/predict_leaderboards.csv"

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                    Key=s3_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        predict_leaderboards = pd.read_csv(StringIO(csv_string))

        def get_link(user_name):
            user_name = "<a href='https://www.pine-sports.com/user/{}'>{}</a>".format(user_name, user_name)
            return user_name

        nba_winner_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NBA") & (predict_leaderboards["Predict Type"] == "Winner")][["Rank","Member","Model Score"]]
        nba_winner_leaderboard["Member"] = nba_winner_leaderboard["Member"].apply(get_link)
        context["nba_winner_leaderboard"] = nba_winner_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nba_ats_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NBA") & (predict_leaderboards["Predict Type"] == "Winner Against The Spread")][["Rank","Member","Model Score"]]
        nba_ats_leaderboard["Member"] = nba_ats_leaderboard["Member"].apply(get_link)
        context["nba_ats_leaderboard"] = nba_ats_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nba_ou_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NBA") & (predict_leaderboards["Predict Type"] == "Over-Under Result")][["Rank","Member","Model Score"]]
        nba_ou_leaderboard["Member"] = nba_ou_leaderboard["Member"].apply(get_link)
        context["nba_ou_leaderboard"] = nba_ou_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nfl_winner_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NFL") & (predict_leaderboards["Predict Type"] == "Winner")][["Rank","Member","Model Score"]]
        nfl_winner_leaderboard["Member"] = nfl_winner_leaderboard["Member"].apply(get_link)
        context["nfl_winner_leaderboard"] = nfl_winner_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nfl_ats_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NFL") & (predict_leaderboards["Predict Type"] == "Winner Against The Spread")][["Rank","Member","Model Score"]]
        nfl_ats_leaderboard["Member"] = nfl_ats_leaderboard["Member"].apply(get_link)
        context["nfl_ats_leaderboard"] = nfl_ats_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nfl_ou_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NFL") & (predict_leaderboards["Predict Type"] == "Over-Under Result")][["Rank","Member","Model Score"]]
        nfl_ou_leaderboard["Member"] = nfl_ou_leaderboard["Member"].apply(get_link)
        context["nfl_ou_leaderboard"] = nfl_ou_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nhl_winner_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NHL") & (predict_leaderboards["Predict Type"] == "Winner")][["Rank","Member","Model Score"]]
        nhl_winner_leaderboard["Member"] = nhl_winner_leaderboard["Member"].apply(get_link)
        context["nhl_winner_leaderboard"] = nhl_winner_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nhl_ats_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NHL") & (predict_leaderboards["Predict Type"] == "Winner Against The Spread")][["Rank","Member","Model Score"]]
        nhl_ats_leaderboard["Member"] = nhl_ats_leaderboard["Member"].apply(get_link)
        context["nhl_ats_leaderboard"] = nhl_ats_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        nhl_ou_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "NHL") & (predict_leaderboards["Predict Type"] == "Over-Under Result")][["Rank","Member","Model Score"]]
        nhl_ou_leaderboard["Member"] = nhl_ou_leaderboard["Member"].apply(get_link)
        context["nhl_ou_leaderboard"] = nhl_ou_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        mlb_winner_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "MLB") & (predict_leaderboards["Predict Type"] == "Winner")][["Rank","Member","Model Score"]]
        mlb_winner_leaderboard["Member"] = mlb_winner_leaderboard["Member"].apply(get_link)
        context["mlb_winner_leaderboard"] = mlb_winner_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        mlb_ats_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "MLB") & (predict_leaderboards["Predict Type"] == "Winner Against The Spread")][["Rank","Member","Model Score"]]
        mlb_ats_leaderboard["Member"] = mlb_ats_leaderboard["Member"].apply(get_link)
        context["mlb_ats_leaderboard"] = mlb_ats_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        mlb_ou_leaderboard = predict_leaderboards.loc[(predict_leaderboards["Sport"] == "MLB") & (predict_leaderboards["Predict Type"] == "Over-Under Result")][["Rank","Member","Model Score"]]
        mlb_ou_leaderboard["Member"] = mlb_ou_leaderboard["Member"].apply(get_link)
        context["mlb_ou_leaderboard"] = mlb_ou_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        context["model_count"] = PredictNFLUserFormData.objects.count() + PredictNBAUserFormData.objects.count() + PredictNHLUserFormData.objects.count() + PredictMLBUserFormData.objects.count()

        s3_file_path = "leaderboards/liic_leaderboard.csv"

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                    Key=s3_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        liic_leaderboard = pd.read_csv(StringIO(csv_string))

        def add_goat(goats):
            goats = "🐐 x {}".format(str(goats))
            return goats

        def get_link(user_name):
            user_name = "<a href='https://www.pine-sports.com/user/{}'>{}</a>".format(user_name, user_name)
            return user_name

        liic_leaderboard["Goats"] = liic_leaderboard["Goats"].apply(add_goat)
        liic_leaderboard["Member"] = liic_leaderboard["Member"].apply(get_link)
        context["liic_leaderboard"] = liic_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        s3_file_path = "leaderboards/last_weeks_trophies.csv"

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                    Key=s3_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        last_weeks_trophies = pd.read_csv(StringIO(csv_string))
        last_weeks_trophies["Rank"] = last_weeks_trophies["Rank"].astype(int)
        last_weeks_trophies["Trophies"] = last_weeks_trophies["Trophies"].astype(int)
        trophy_leaderboard = last_weeks_trophies.head(10)
        trophy_leaderboard["Member"] = trophy_leaderboard["Member"].apply(get_link)
        context["trophy_leaderboard"] = trophy_leaderboard.to_html(index=False).replace("&lt;", "<").replace("&gt;", ">")

        ads = pd.DataFrame()
        #sporttrade_image_number = int(random.randrange(1, 3))
        #sporttrade_ad = {"title": "A New Way to Bet on Sports = Trading Sports!", "post_number": int(random.randrange(1,4)), "link": "https://sporttrade.onelink.me/evxw/Pine", "image": f"images/ST-Pine-StoriesBanner_v{sporttrade_image_number}.png"}
        #ads = ads.append(sporttrade_ad, ignore_index=True)

        context["ads"] = ads

        try:
            context['following_count'] = following_users_id = self.request.user.profile.following.count()
        except:
            context['following_count'] = 0

        try:
            context["new_notifications"] = (Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).exclude(is_seen=True).count() > 0)
            context["notification_count"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).count()
            context["recent_notifications"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).order_by('-date')[:4]
        except:
            context["new_notifications"] = False
            context["notification_count"] = 0
            context["recent_notifications"] = []

        return context

class UserPostListView(ListView):
    model = Post
    template_name = 'blog/user_posts.html'
    context_object_name = 'posts'
    paginate_by = 10

    def visible_user(self):
        return get_object_or_404(User, username__iexact=self.kwargs.get('username'))

    def get_context_data(self, **kwargs):
        visible_user = self.visible_user()
        logged_user = self.request.user

        if logged_user.username == '' or logged_user is None:
            can_follow = False
        else:
            can_follow = (Follow.objects.filter(user=logged_user,
                                                follow_user=visible_user).count() == 0)
        context = super().get_context_data(**kwargs)

        is_user_group = check_user_groups(self.request.user)
        context['is_group']=is_user_group
        context['is_ai_user'] = check_ai_user(self.request.user)
        #context['is_prop_master_user'] = check_prop_master_user(self.request.user)
        is_moderator = check_user_moderator(self.request.user)
        context['is_moderator']=is_moderator

        context['user_profile'] = visible_user

        user_name_font_size = 25

        if len(str(visible_user)) > 10:
            user_name_font_size = 20

        context["user_name_font_size"] = user_name_font_size

        context['can_follow'] = can_follow
        context['sort'] = "user"
        context['community'] = False
        context["found_community"] = False

        #Check follow status
        try:
            follow_status = Follow.objects.filter(user=logged_user, follow_user=visible_user).exists()
            context['follow_status'] = follow_status
        except:
            context['follow_status'] = False

        likes_count = 0
        posts = Post.objects.active().filter(author=visible_user).order_by('-publish')
        for post in posts:
            likes_count = likes_count + post.likes.count()

        context['likes'] = "{:,}".format(likes_count)

        comment_likes_count = 0
        comments = Comment.objects.filter(author=visible_user).order_by('date_posted')
        for comment in comments:
            comment_likes_count = comment_likes_count + comment.likes.count()

        context['comment_likes'] = "{:,}".format(comment_likes_count)

        context['likes_and_comment_likes'] = "{:,}".format(likes_count + comment_likes_count)

        context['optimized_image_url'] = Profile.objects.filter(user=visible_user)[0].optimized_image_url

        context['date_joined'] = visible_user.date_joined.strftime("%B %d, %Y")
        #Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name',flat=True)
        context['sports_name']=sports_name

        bio = visible_user.profile.bio
        twitter_handle = visible_user.profile.twitter_url

        has_bio = False
        has_twitter = False
        if bio:
            has_bio = True
        if twitter_handle:
            has_twitter = True

        context["has_twitter"] = has_twitter
        context["twitter_handle"] = twitter_handle
        context["has_bio"] = has_bio
        context["bio"] = bio

        ads = pd.DataFrame()
        #sporttrade_image_number = int(random.randrange(1, 3))
        #sporttrade_ad = {"title": "A New Way to Bet on Sports = Trading Sports!", "post_number": int(random.randrange(1,4)), "link": "https://sporttrade.onelink.me/evxw/Pine", "image": f"images/ST-Pine-StoriesBanner_v{sporttrade_image_number}.png"}
        #ads = ads.append(sporttrade_ad, ignore_index=True)

        context["ads"] = ads

        try:
            context["new_notifications"] = (Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).exclude(is_seen=True).count() > 0)
            context["notification_count"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).count()
            context["recent_notifications"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).order_by('-date')[:4]
        except:
            context["new_notifications"] = False
            context["notification_count"] = 0
            context["recent_notifications"] = []

        logger.info("{} {} {} {}".format(self.request.method,self.request.get_full_path(),get_ip(self.request),self.request.user.id))
        return context

    def get_queryset(self):
        user = self.visible_user()

        #gets active posts by username
        #Limit the number of Posts
        return Post.objects.active().filter(author=user).order_by('-publish')[:150]

    def post(self, request, *args, **kwargs):
        if request.user.id is not None:
            follows_between = Follow.objects.filter(user=request.user,
                                                    follow_user=self.visible_user())

            if 'follow' in request.POST:
                    new_relation = Follow(user=request.user, follow_user=self.visible_user())
                    if follows_between.count() == 0:
                        new_relation.save()
            elif 'unfollow' in request.POST:
                    if follows_between.count() > 0:
                        follows_between.delete()

        return self.get(self, request, *args, **kwargs)

class UserDraftListView(LoginRequiredMixin, ListView):
    model = Post
    template_name = 'blog/user_drafts.html'
    context_object_name = 'posts'
    paginate_by = 10

    def visible_user(self):
        return get_object_or_404(User, username=self.kwargs.get('username'))

    def get_context_data(self, **kwargs):
        visible_user = self.visible_user()
        logged_user = self.request.user

        if logged_user.username == '' or logged_user is None:
            can_follow = False
        else:
            can_follow = (Follow.objects.filter(user=logged_user,
                                                follow_user=visible_user).count() == 0)
        data = super().get_context_data(**kwargs)

        is_user_group = check_user_groups(self.request.user)
        data['is_group']=is_user_group
        #data['is_prop_master_user'] = check_prop_master_user(self.request.user)
        data['is_ai_user'] = check_ai_user(self.request.user)
        is_moderator = check_user_moderator(self.request.user)
        data['is_moderator']=is_moderator
        #Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name',flat=True)
        data['sports_name']=sports_name

        data['user_profile'] = visible_user
        data['can_follow'] = can_follow
        try:
            data["new_notifications"] = (Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).exclude(is_seen=True).count() > 0)
            data["notification_count"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).count()
            data["recent_notifications"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).order_by('-date')[:4]
        except:
            data["new_notifications"] = False
            data["notification_count"] = 0
            data["recent_notifications"] = []
        logger.info("{} {} {} {}".format(self.request.method,self.request.get_full_path(),get_ip(self.request),self.request.user.id))
        return data

    def get_queryset(self):
        user = self.visible_user()

        #gets draft posts by username
        return Post.objects.draft().filter(author=user).order_by('-date_posted')

    def post(self, request, *args, **kwargs):
        if request.user.id is not None:
            follows_between = Follow.objects.filter(user=request.user,
                                                    follow_user=self.visible_user())

            if 'follow' in request.POST:
                    new_relation = Follow(user=request.user, follow_user=self.visible_user())
                    if follows_between.count() == 0:
                        new_relation.save()
            elif 'unfollow' in request.POST:
                    if follows_between.count() > 0:
                        follows_between.delete()

        return self.get(self, request, *args, **kwargs)

class PostDetailView(generic.DetailView):
    model = Post
    template_name = 'blog/post_detail.html'

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        #Order comments by likes
        #comments_connected = Comment.objects.filter(post_connected=self.get_object()).annotate(likes_count=Count('likes')).order_by('-likes_count')

        #Order comments by date - descending
        #comments_connected = Comment.objects.filter(post_connected=self.get_object()).order_by('-date_posted')

        #Order comments by date - ascending
        comments_connected = Comment.objects.filter(post_connected=self.get_object()).order_by('date_posted')

        if self.request.user.id is not None:
            data['form'] = NewCommentForm(instance=self.request.user)

        #Count total Post Likes
        stuff = Post.objects.filter(id=self.kwargs['pk'])
        post_likes_obj = Post.objects.filter(id=self.kwargs['pk'])
        post_likes = 0
        if post_likes_obj:
            for user in post_likes_obj:
                post_likes = user.likes.count()
        # Count Total Comments likes
        comments_likes = 0
        if comments_connected:
            for i in comments_connected:
                comments_likes = i.likes.count()

        is_user_group = check_user_groups(self.request.user)
        data['is_group']=is_user_group
        #data['is_prop_master_user'] = check_prop_master_user(self.request.user)
        data['is_ai_user'] = check_ai_user(self.request.user)
        is_moderator = check_user_moderator(self.request.user)
        data['is_moderator']=is_moderator
        data['comments'] = comments_connected
        data['total_likes'] = post_likes
        data['total_comment_likes'] = comments_likes
        data['user'] = self.request.user
        #Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name',flat=True)
        data['sports_name']=sports_name
        related_sport = Post.objects.filter(id=self.kwargs['pk'])[0].related_sport.name

        robot_img = '<img src="https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/pk-robot.png" alt="robot" style="width:80px; margin-bottom:10px">'
        crown_img = '<img src="https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/pk-crown.svg" alt="prop-master" style="width:80px; margin-bottom:10px">'
        style = 'color:#666666; font-weight:600; display:inline-block; margin-top:12px; margin-bottom:15px'

        if related_sport == "Basketball" or related_sport == "Football" or related_sport == "Hockey" or related_sport == "Baseball":
            if related_sport == "Basketball":
                sport_category = "NBA"
            elif related_sport == "Football":
                sport_category = "NFL"
            elif related_sport == "Hockey":
                sport_category = "NHL"
            elif related_sport == "Baseball":
                sport_category = "MLB"
            footers = [
                "<a href='/stats/props/{}/' style='{}'>{}<br>The Robot to the rescue!<br>Use our prop cheat sheet and win.</a>".format(sport_category,style,robot_img),
                "<a href='/stats/props/{}/' style='{}'>{}<br>No need to sift through the clutter.<br>Just use the prop cheatsheet.</a>".format(sport_category,style,robot_img),
                "<a href='/stats/props/{}/' style='{}'>{}<br>I’m more than just an adorable Robot.<br>Unleash my AI mind and win!</a>".format(sport_category,style,robot_img),
                "<a href='/stats/props/{}/' style='{}'>{}<br>Change your outcomes.<br>Use Me.</a>".format(sport_category,style,robot_img),
                "<a href='/stats/props/{}/' style='{}'>{}<br>Can your fantasy team be saved?<br>I'm here to help.</a>".format(sport_category,style,robot_img),
                "<a href='/predict/{}/' style='{}'>{}<br>Make your own custom AI models.<br>Be Smarter. Use AI.</a>".format(sport_category,style,robot_img),
                "<a href='/predict/{}/' style='{}'>{}<br>Your Sports IQ + AI = Pine Sports</a>".format(sport_category,style,robot_img),
                "<a href='/predict/{}/' style='{}'>{}<br>Win your way.<br>Your AI model belongs to you.</a>".format(sport_category,style,robot_img),
                #"<a href='/prop-master/home/' style='{}'>{}<br>Competition is for everyone.<br>It's time to be crowned Prop Master!</a>".format(style,crown_img),
                #"<a href='/prop-master/home/' style='{}'>{}<br>Prove you're the best.<br>Start beating your friends today!</a>".format(style,crown_img),
                #"<a href='/prop-master/home/' style='{}'>{}<br>Watch games like never before!<br>Challenge your friends to Prop Master.</a>".format(style, crown_img),
                "<span style='{}'>Like what you just read? Completely disagree?<br>Let us know by commenting below 👇</span>".format(style),
                "<a href='/post/new/' style='{}'>It’s time to shine.<br>Share your best bets!</a>".format(style),
                "<a href='/post/new/' style='{}'>Strengthen the Pine Community.<br>Share your best bets!</a>".format(style),
            ]
        else:
            footers = [
                #"<a href='/prop-master/home/' style='{}'>{}<br>Competition is for everyone.<br>It's time to be crowned Prop Master!</a>".format(style,crown_img),
                #"<a href='/prop-master/home/' style='{}'>{}<br>Prove you're the best.<br>Start beating your friends today!</a>".format(style,crown_img),
                #"<a href='/prop-master/home/' style='{}'>{}<br>Watch games like never before!<br>Challenge your friends to Prop Master.</a>".format(style, crown_img),
                "<span style='{}'>Like what you just read? Completely disagree?<br>Let us know by commenting below 👇</span>".format(style),
                "<a href='/post/new/' style='{}'>It’s time to shine.<br>Share your best bets!</a>".format(style),
                "<a href='/post/new/' style='{}'>Strengthen the Pine Community.<br>Share your best bets!</a>".format(style),
            ]

        random_footer = random.randrange(0, len(footers))

        data["footer"] = footers[random_footer]

        #advertisement = "<hr><p>Pine Sports and Thrive Fantasy have partnered! You can score access to FREE plays when you sign up using the promo code PINE or by clicking <a href='https://www.thrivefantasy.com/?promo=PINE'><u><strong>HERE</strong></u></a>.</p><p><a href='https://www.thrivefantasy.com/?promo=PINE'><img src='https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.amazonaws.com/media/uploads/froala_editor/images/pine-thrive-promo.png' style='width: 300px;' class='fr-fic fr-dib'></a></p>"
        advertisement = ""
        data["advertisement"] = advertisement


        try:
            data["new_notifications"] = (Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).exclude(is_seen=True).count() > 0)
            data["notification_count"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).count()
            data["recent_notifications"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).order_by('-date')[:4]
        except:
            data["new_notifications"] = False
            data["notification_count"] = 0
            data["recent_notifications"] = []
        logger.info("{} {} {} {}".format(self.request.method,self.request.get_full_path(),get_ip(self.request),self.request.user.id))

        return data

    def post(self, request, *args, **kwargs):
        new_comment = Comment(content=request.POST.get('content'),
                              author=self.request.user,
                              post_connected=self.get_object())
        new_comment.save()

        return self.get(self, request, *args, **kwargs)

class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Post
    template_name = 'blog/post_delete.html'
    context_object_name = 'post'
    success_url = reverse_lazy('stories:blog-home') 

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)

        is_user_group = check_user_groups(self.request.user)
        data['is_group']=is_user_group
        #data['is_prop_master_user'] = check_prop_master_user(self.request.user)
        data['is_ai_user'] = check_ai_user(self.request.user)
        data['user'] = self.request.user
        try:
            data["new_notifications"] = (Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).exclude(is_seen=True).count() > 0)
            data["notification_count"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).count()
            data["recent_notifications"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).order_by('-date')[:4]
            logger.info("{} {} {} {}".format(self.request.method,self.request.get_full_path(),get_ip(self.request),self.request.user.id))
        except:
            data["new_notifications"] = False
            data["notification_count"] = 0
            data["recent_notifications"] = []
        return data

    def test_func(self):
        return is_users(self.get_object().author, self.request.user)


class PostCreateView(LoginRequiredMixin, CreateView):
    template_name = 'blog/post_new.html'
    form_class = PostForm
    model = Post

    def get_success_url(self):
        return reverse('stories:post-detail-noslug', kwargs={'pk': self.object.id})

    def form_valid(self, form):
        form.instance.content = detect_charts(form.instance.content)
        is_draft = form.instance.draft

        if not is_draft:
            form.instance.publish = timezone.now()
            
            logger.info("PUBLISH {} {} {}".format(self.request.get_full_path(), get_ip(self.request),
                                             self.request.user.id))
        else:
            logger.info("SAVE_DRAFT {} {} {}".format(self.request.get_full_path(), get_ip(self.request),
                                             self.request.user.id))
        form.instance.author = self.request.user

        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        session = boto3.session.Session(aws_access_key_id=conf_settings.AWS_ACCESS_KEY_ID,aws_secret_access_key=conf_settings.AWS_SECRET_ACCESS_KEY)
        s3 = session.resource("s3")
        bucket = s3.Bucket(conf_settings.USER_CHARTS_BUCKET_S3)
        data = super().get_context_data(**kwargs)
        user_id = str(self.request.user.id)
        event_id = user_id + timezone.now().strftime('%Y%m-%d%H-%M%S-') + str(uuid4())
        ##Local charts
        # file_path = './static/stories/post/'+user_id
        # is_dir = os.path.isdir(file_path)
        # html_files_name=False
        # if is_dir:
        #     html_files_name = sorted(os.listdir(file_path), reverse=True)
        # if html_files_name:

        #     # file_name_and_days = []
        #     # for name in html_files_name:
        #     #     created = os.path.getctime(file_path+'/'+name)
        #     #     file_created_date = datetime.datetime.fromtimestamp(created).date()
        #     #     diff_days_obj = datetime.datetime.now().date()-file_created_date            
        #     #     if diff_days_obj:
        #     #         str_days = str(diff_days_obj)
        #     #         get_days = str_days.split()[0]
        #     #         days = int(get_days)
        #     #         if days < 7:
        #     #             c = name+' | '+'Last day'
        #     #             file_name_and_days.append(c)
        #     #         elif days > 7 and days < 30:
        #     #             c = name+' | '+'Last week'
        #     #             file_name_and_days.append(c)
        #     #         elif days > 30:
        #     #             c = name+' | '+'Last month'
        #     #             file_name_and_days.append(c)
        #     #         else:
        #     #             c = name+' | '+'Error'
        #     #             file_name_and_days.append(c)
        #     #     else:
        #     #         c = name+' | '+'Last day'
        #     #         file_name_and_days.append(c)
        #     data['html_files_name']=html_files_name
        # else:
        #     data['html_files_name']=['No Saved Charts']

        #S3 dir file list
        S3_file_path = 'charts/'+user_id+'/'
        usr_id = user_id+'/'
        new_s3_html = []
        for object_summary in bucket.objects.filter(Prefix=S3_file_path):
            path_file = object_summary.key
            html_file_name = path_file.split(usr_id)[-1]
            if not "mobile" in html_file_name:
                new_s3_html.append(html_file_name)
        if new_s3_html:
            #Orders in reverse chronological order
            new_s3_html.reverse()
            data['html_files_name']=new_s3_html
        else:
            data['html_files_name']=['No Saved Charts']

        logger.info("{} {} {} {}".format(self.request.method,self.request.get_full_path(),get_ip(self.request),self.request.user.id))
        is_user_group = check_user_groups(self.request.user)
        data['is_group']=is_user_group
        #data['is_prop_master_user'] = check_prop_master_user(self.request.user)
        data['is_ai_user'] = check_ai_user(self.request.user)
        data['is_gpt_user'] = check_gpt_user(self.request.user)
        data['user_id'] = user_id
        data['event_id'] = event_id
        data['user'] = self.request.user
        data['CHARTS_URL'] = conf_settings.CHARTS_URL
        #Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name',flat=True)
        data['sports_name']=sports_name
        try:
            data["new_notifications"] = (Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).exclude(is_seen=True).count() > 0)
            data["notification_count"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).count()
            data["recent_notifications"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).order_by('-date')[:4]
        except:
            data["new_notifications"] = False
            data["notification_count"] = 0
            data["recent_notifications"] = []
        return data

class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    form_class = PostForm
    template_name = 'blog/post_new.html'
    # success_url = reverse_lazy('stories:blog-home')

    def get_success_url(self):
        return reverse('stories:post-detail-noslug', kwargs={'pk': self.object.id})

    def form_valid(self, form):
        form.instance.content = detect_charts(form.instance.content)
        is_draft = form.instance.draft
        if is_draft:
            form.instance.draft = True
            if not form.instance.publish:
                form.instance.publish = None
            logger.info("SAVE_DRAFT {} {} {}".format(self.request.get_full_path(), get_ip(self.request),
                                             self.request.user.id))
        else:
            form.instance.draft = False
            if form.instance.publish:
                form.instance.last_edited_date = timezone.now()
            else:
                form.instance.publish = timezone.now()
            logger.info("PUBLISH {} {} {}".format(self.request.get_full_path(), get_ip(self.request),
                                             self.request.user.id))

        return super().form_valid(form)

    def test_func(self):
        return is_users(self.get_object().author, self.request.user)

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        user_id = str(self.request.user.id)
        
        #S3 dir file list
        S3_file_path = 'charts/'+user_id+'/'
        usr_id = user_id+'/'
        new_s3_html = []
        session = boto3.session.Session(aws_access_key_id=conf_settings.AWS_ACCESS_KEY_ID,aws_secret_access_key=conf_settings.AWS_SECRET_ACCESS_KEY)
        s3 = session.resource("s3")
        bucket = s3.Bucket(conf_settings.USER_CHARTS_BUCKET_S3)
        for object_summary in bucket.objects.filter(Prefix=S3_file_path):
            path_file = object_summary.key
            html_file_name = path_file.split(usr_id)[-1]
            if not "mobile" in html_file_name:
                new_s3_html.append(html_file_name)
        if new_s3_html:
            new_s3_html.reverse()
            data['html_files_name']=new_s3_html
        else:
            data['html_files_name']=['No Saved Charts']

        is_user_group = check_user_groups(self.request.user)
        data['is_group']=is_user_group
        #data['is_prop_master_user'] = check_prop_master_user(self.request.user)
        data['is_ai_user'] = check_ai_user(self.request.user)
        data['user_id'] = user_id
        data['CHARTS_URL'] = conf_settings.CHARTS_URL
        #Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name',flat=True)
        data['sports_name']=sports_name
        try:
            data["new_notifications"] = (Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).exclude(is_seen=True).count() > 0)
            data["notification_count"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).count()
            data["recent_notifications"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).order_by('-date')[:4]
        except:
            data["new_notifications"] = False
            data["notification_count"] = 0
            data["recent_notifications"] = []
        logger.info("{} {} {} {}".format(self.request.method,self.request.get_full_path(),get_ip(self.request),self.request.user.id))
        #data['tag_line'] = 'Edit a post'
        return data

class FollowsListView(ListView):
    model = Follow
    template_name = 'blog/follow.html'
    context_object_name = 'follows'

    def visible_user(self):
        return get_object_or_404(User, username=self.kwargs.get('username'))

    def get_queryset(self):
        user = self.visible_user()
        return Follow.objects.filter(user=user).order_by('-date')

    def get_context_data(self, *, object_list=None, **kwargs):
        data = super().get_context_data(**kwargs)
        is_user_group = check_user_groups(self.request.user)
        data['is_group']=is_user_group
        #data['is_prop_master_user'] = check_prop_master_user(self.request.user)
        data['is_ai_user'] = check_ai_user(self.request.user)
        data['follow'] = 'follows'
        try:
            data["new_notifications"] = (Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).exclude(is_seen=True).count() > 0)
            data["notification_count"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).count()
            data["recent_notifications"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).order_by('-date')[:4]
        except:
            data["new_notifications"] = False
            data["notification_count"] = 0
            data["recent_notifications"] = []
        return data

class FollowersListView(ListView):
    model = Follow
    template_name = 'blog/follow.html'
    context_object_name = 'follows'

    def visible_user(self):
        return get_object_or_404(User, username=self.kwargs.get('username'))

    def get_queryset(self):
        user = self.visible_user()
        return Follow.objects.filter(follow_user=user).order_by('-date')

    def get_context_data(self, *, object_list=None, **kwargs):
        data = super().get_context_data(**kwargs)
        is_user_group = check_user_groups(self.request.user)
        data['is_group']=is_user_group
        #data['is_prop_master_user'] = check_prop_master_user(self.request.user)
        data['is_ai_user'] = check_ai_user(self.request.user)
        data['follow'] = 'followers'
        try:
            data["new_notifications"] = (Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).exclude(is_seen=True).count() > 0)
            data["notification_count"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).count()
            data["recent_notifications"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).order_by('-date')[:4]
        except:
            data["new_notifications"] = False
            data["notification_count"] = 0
            data["recent_notifications"] = []
        return data

class SearchListView(generic.ListView):
    template_name = 'blog/search.html'
    context_object_name = 'posts'
    paginate_by = 10

    def get_queryset(self):
        search = self.request.GET.get('search')
        return Post.objects.filter(Q(date_posted__lte=timezone.now()),
                                   Q(title__contains=search) | Q(content__contains=search)).order_by('-date_posted')

    def get_context_data(self, **kwargs):
        
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        is_user_group = check_user_groups(self.request.user)
        context['is_group']=is_user_group
        context['is_ai_user'] = check_ai_user(self.request.user)
        #context['is_prop_master_user'] = check_prop_master_user(self.request.user)
        # Add in a QuerySet
        context['search'] = self.request.GET.get('search')
        try:
            context["new_notifications"] = (Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).exclude(is_seen=True).count() > 0)
            context["notification_count"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).count()
            context["recent_notifications"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).order_by('-date')[:4]
        except:
            context["new_notifications"] = False
            context["notification_count"] = 0
            context["recent_notifications"] = []
        return context

# Like View Functionality====================================================================================

def LikeView(request,pk):
    if request.method == "POST":
        post = get_object_or_404(Post,id=request.POST.get('post_id'))
        liked = False
        if post.likes.filter(id=request.user.id).exists():
            post.likes.remove(request.user)
            liked = False
        else:
            post.likes.add(request.user)
            liked = True

    return HttpResponseRedirect(reverse('stories:post-detail-noslug',args =[str(pk)]))


# Like Functionality====================================================================================

@login_required
def postpreference(request, postid, userpreference):
        if request.method == "POST":
                eachpost= get_object_or_404(Post, id=postid)
                obj=''
                valueobj=''
                try:
                        obj= Preference.objects.get(user= request.user, post= eachpost)
                        valueobj= obj.value 
                        valueobj= int(valueobj)
                        userpreference= int(userpreference)
                        if valueobj != userpreference:
                                obj.delete()
                                upref= Preference()
                                upref.user= request.user
                                upref.post= eachpost
                                upref.value= userpreference
                                if userpreference == 1 and valueobj != 1:
                                        eachpost.likes += 1
                                        eachpost.dislikes -=1
                                elif userpreference == 2 and valueobj != 2:
                                        eachpost.dislikes += 1
                                        eachpost.likes -= 1
                                upref.save()
                                eachpost.save()
                                context= {'eachpost': eachpost,
                                  'postid': postid}
                                return redirect('stories:blog-home')
                        elif valueobj == userpreference:
                                obj.delete()
                                if userpreference == 1:
                                        eachpost.likes -= 1
                                elif userpreference == 2:
                                        eachpost.dislikes -= 1
                                eachpost.save()
                                context= {'eachpost': eachpost,
                                  'postid': postid}
                                return redirect('stories:blog-home')
                                
                except Preference.DoesNotExist:
                        upref= Preference()
                        upref.user= request.user
                        upref.post= eachpost
                        upref.value= userpreference
                        userpreference= int(userpreference)
                        if userpreference == 1:
                                eachpost.likes += 1
                        elif userpreference == 2:
                                eachpost.dislikes +=1
                        upref.save()
                        eachpost.save()                            

                        context= {'post': eachpost,
                          'postid': postid}

                        return redirect('stories:blog-home')

        else:
                eachpost= get_object_or_404(Post, id=postid)
                context= {'eachpost': eachpost,
                          'postid': postid}

                return redirect('stories:blog-home')

def postlikepreference(request):

    id = request.GET.get('id')
    like_value = request.GET.get('value')
    dataobj = Post.objects.get(id=int(id))
  
    if like_value == "false":
        dataobj.likes.add(request.user)
        #Turns on notifications for everyone
        is_user_group=True
        #is_user_group = request.user.groups.filter(name__in=['notification_user']).exists()
        if is_user_group:
            obj = Preference.objects.create(user=request.user, post=dataobj)
        try:
            logger.info("LIKE {} {} {}".format(request.get_full_path(), get_ip(request), request.user.id))
        except:
            pass
    else:
        if dataobj.likes.filter(id=request.user.id).exists():
            dataobj.likes.remove(request.user)
            #Turns on notifications for everyone
            is_user_group = True
            #is_user_group = request.user.groups.filter(name__in=['notification_user']).exists()
            if is_user_group:
                obj = Preference.objects.filter(user=request.user, post=dataobj).delete()
            try:
                logger.info("UNLIKE {} {} {}".format(request.get_full_path(), get_ip(request), request.user.id))
            except:
                pass
    
    post_data = Post.objects.get(id=id)
    html = render_to_string(request=request, template_name='blog/render_to_like.html', context={'post': post_data})

    return JsonResponse({'html':html})


def comment_postlikepreference(request):
    id = request.GET.get('id')
    like_value = request.GET.get('value')
    dataobj = Comment.objects.get(id=int(id))
    #Turns on notifications for everyone
    is_user_group = True
    #is_user_group = request.user.groups.filter(name__in=['notification_user']).exists()
  
    if like_value == "false":
        dataobj.likes.add(request.user)
        if_comment_like = CommentLike.objects.filter(comment_id=int(id))
        if is_user_group:
            if not if_comment_like:
                comment_text=cleanhtml(dataobj.content)
                obj = CommentLike.objects.create(comment_id=int(id), user=request.user, comment=comment_text[:50], post=dataobj.post_connected, comment_author=dataobj.author)

        logger.info("COMMENT_LIKE {} {} {}".format(request.get_full_path(), get_ip(request), request.user.id))

    else:
        if dataobj.likes.filter(id=request.user.id).exists():
            a = dataobj.likes.remove(request.user)
            if is_user_group:
                obj = CommentLike.objects.filter(comment_id=int(id)).delete()
            logger.info("COMMENT_UNLIKE {} {} {}".format(request.get_full_path(), get_ip(request), request.user.id))
    
    post_data = Comment.objects.get(id=id)
    html = render_to_string(request=request, template_name='blog/render_to_comment_like.html', context={'comment_like': post_data})
    return JsonResponse({'html':html})


def delete_comment_confirm(request,id):
    user = str(request.user)
    if id:
        comment = Comment.objects.filter(id=id)
        if comment:
            for comment_detail in comment:
                if str(comment_detail.author)==user or check_user_moderator(request.user):
                    context = {"comment_detail":comment_detail,"id":comment_detail.id}
                    return render(request,'blog/post_comment_delete.html',context)
                return redirect('/')
    

def delete_comment(request,id=None):
    user = str(request.user)
    logger.info("DELETE_COMMENT {} {} {}".format(request.get_full_path(), get_ip(request), request.user.id))
    if id:
        comment = Comment.objects.filter(id=id)
        if comment:
            for comment_detail in comment:
                if str(comment_detail.author)==user or check_user_moderator(request.user):
                    comment_detail.delete()
                    return JsonResponse({"msg":"Comment Deleted"})
        return redirect('/')
    return redirect('/')

def Like_comment(request,id):
    comment = get_object_or_404(Comment, id=request.POST.get('comment_id'))
    comment.likes.add(request.user)
    logger.info("COMMENT_LIKE {} {} {}".format(request.get_full_path(), get_ip(request),request.user.id))
    return redirect('/')

#Generates response for chatbot
def generate_response(request):

    has_error = False
    try:
        # Get the message and user ID from the request
        try: message = request.POST['message']
        except: message = ""
        try: event_id = request.GET['event_id']
        except: event_id = ""
        try: full_chat = request.GET['full_chat']
        except: full_chat = ""
        try: step = request.GET['step']
        except: step = "start"
        try:
            print("IN TRY GETTING STEP COUNT")
            step_count = request.GET['step_count']
            print("STEP COUNT STRING IS {}".format(step_count))
            step_count = int(step_count)
            print("STEP COUNT IS {}".format(step_count))
        except:
            step_count = 0
        try:
            known_variables = "{" + request.GET['known_variables'] + "}".replace('""', '", "')
        except:
            known_variables = ""
        try:
            last_message = request.GET['last_message']
        except:
            last_message = ""
        if known_variables == "": found_data = False
        else: found_data = True

        if "why you are making that bet" in last_message.lower():
            message = "My reasoning is: " + message
        if "line" in last_message.lower() and "line" not in message:
            message = "The line is " + message
        print(message)
        print("EVENT_ID")
        print(event_id)
        print("FULL_CHAT")
        print(full_chat)
        print("STEP")
        print(step)
        print("STEP COUNT")
        print(step_count)
        print("KNOWN_VARIABLES")
        print(known_variables)
        print("LAST_MESSAGE")
        print(last_message)

        is_inapproprate = False
        inapproprate_classification = ""

        if is_inapproprate:

            data = {
                'response': inapproprate_classification,
                'step': "done_writing",
                'step_count': step_count,
                'full_chat': full_chat,
                'known_variables': known_variables,
                'last_message': last_message,
            }

            json_data = json.dumps(data)
            return HttpResponse(json_data, content_type='application/json')

        if step == "test":
            image = get_image_search("Lebron James" + " playing")

            # Create a JSON response
            data = {
                'response': "Done!",
                'step': "done_writing",
                'step_count': step_count,
                'full_chat': full_chat + " " + message,
                'known_variables': "known_varliables" + known_variables,
                'last_message': "This is the last message",
                'title': "Test Title",
                'body': f"<p><img src = '{image}'></p><p>Test Body</p>",
            }

            json_data = json.dumps(data)

        if step == 'start':
            prompt = construct_data_prompt(message, full_chat, prompt_type="about_sports", summary="")

            temperature = 0
            max_tokens = 1000
            model = "gpt-4o-mini"

            response = get_open_ai_query_chat_bot_ai(prompt=prompt, model_name=model, max_tokens=max_tokens, temperature=temperature)

            got_response = False
            except_counter = 0
            while not got_response:
                except_counter += 1
                try:
                    print("READING RESPONSE...")
                    response_text = read_response(response)
                    if response_text == "Error":
                        has_error = True
                    got_response = True
                except Exception as e:
                    if except_counter < 4:
                        print(e)
                        print(except_counter)
                        print("GETTING AI RESPONSE")

                        temperature = 0
                        max_tokens = 1000
                        model = "gpt-4o-mini"
                        response = get_open_ai_query_chat_bot_ai(prompt=prompt, model_name=model, max_tokens=max_tokens, temperature=temperature)
                    else:
                        print("ERROR")
                        has_error = True
                        response_to_send = "There was an error. Please try again."
                        got_response = True

            if "no" in response_text.lower():
                response_to_send = "Sorry, I am a sports bot.  I don't know anything about that. I'm happy to help you with sports questions."
                full_chat = ""

                data = {
                    'response': response_to_send,
                    'step': "start",
                    'step_count': step_count,
                    'full_chat': full_chat,
                    'known_variables': known_variables,
                    'last_message': last_message,
                }

                print(data)

                json_data = json.dumps(data)

            else:
                print("Great, looks like this is about sports!")
                prompt = construct_data_prompt(message, full_chat, prompt_type="get_teams_players", summary="")
                temperature = 0
                max_tokens = 1000
                model = "gpt-4o-mini"
                response = get_open_ai_query_chat_bot_ai(prompt=prompt, model_name=model, max_tokens=max_tokens, temperature=temperature)
                print("in get_teams_players.")
                print(response)

                got_response = False
                except_counter = 0
                while not got_response:
                    except_counter += 1
                    try:
                        print("READING RESPONSE...")
                        response_text = read_response(response)
                        if response_text == "Error":
                            has_error = True
                        got_response = True
                    except Exception as e:
                        if except_counter < 4:
                            print(e)
                            print("TRYING AGAIN")
                            print(except_counter)
                            print("GETTING AI RESPONSE")

                            temperature = 0
                            max_tokens = 1000
                            model = "gpt-4o-mini"
                            response = get_open_ai_query_chat_bot_ai(prompt=prompt, model_name=model, max_tokens=max_tokens, temperature=temperature)
                        else:
                            print("ERROR")
                            has_error = True
                            response_to_send = "There was an error. Please try again."
                            got_response = True

                print("RESPONSE TEXT")
                print(response_text)

                try:
                    league = response_text.split("league=")[1].strip("'")
                except:
                    pass
                try:
                    teams = response_text.split("teams=[")[1].split("]")[0].replace("'", "").split(", ")
                except:
                    pass
                try:
                    players = response_text.split("players=[")[1].split("]")[0].replace("'", "").split(", ")
                except:
                    pass
                try:
                    questions = []
                    print("SEEING IF I CAN GET MORE INFORMATION")
                    if league.lower() in ["nba", "nfl", "mlb", "nhl"]:
                        if len(players) > 0:
                            print("We're talking about players")
                            print(len(players))
                            for player in players:
                                if len(player) > 0:
                                    questions.append(f"What team is {player} on?")
                        if len(questions) > 0:
                            print("Questions is greater than 0")
                            fact_check_string = full_factcheck(questions, league)
                            message = message +". " + fact_check_string
                            print("FACT CHECK STRING")
                            print(fact_check_string)
                    else:
                        if len(players) > 0:
                            print("We're talking about players")
                            print(len(players))
                            for player in players:
                                if len(player) > 0:
                                    questions.append(f"What team is {player} on?")
                        print("TEAMS LENGTH")
                        print(len(teams))
                        if len(teams) > 0 and len(teams) < 2:
                            print("We're talking about teams")
                            for team in teams:
                                if team != "":
                                    print("ADDING QUESTION")
                                    questions.append(f"Who is {team} playing next?")
                                    print(questions)
                        fact_check_string = ""
                        for question in questions:
                            print("IN QUESTION LOOP")
                            print(question)
                            response = get_answer_from_perplexity(question)
                            fact_check_string = fact_check_string + ". " + response
                        message = message +". " + fact_check_string
                        print("FULL MESSAGE")
                        print(message)
                except Exception as e:
                    print(e)
                    pass

                step = "getting_info"


        if step == 'getting_info':

            prompt = construct_data_prompt(message, full_chat, prompt_type="getting_info", summary="")
            print("GETTING AI RESPONSE")

            temperature = 0
            max_tokens = 1000
            model = "gpt-4o-mini"
            response = get_open_ai_query_chat_bot_ai(prompt=prompt, model_name=model, max_tokens=max_tokens, temperature=temperature)

            print("GOT AI RESPONSE")
            print(response)

            got_response = False
            except_counter = 0
            while not got_response:
                except_counter += 1
                try:
                    print("READING RESPONSE...")
                    print("GETTING INDEXES")
                    response_text = read_response(response)
                    if response_text == "Error":
                        has_error = True
                    print("RESPONSE TEXT")
                    print(response_text)
                    start_index = response_text.index('{')
                    end_index = response_text.rindex('}') + 1
                    print(start_index)
                    print(end_index)
                    response_text = response_text[start_index:end_index]

                    #count " in response_text
                    quote_count = 0
                    for char in response_text:
                        if char == '"':
                            quote_count += 1

                    # count ' in response_text
                    single_quote_count = 0
                    for char in response_text:
                        if char == "'":
                            single_quote_count += 1


                    if single_quote_count > quote_count:
                        response_text = response_text.replace("'", '"')

                    response_json = json.loads(response_text)

                    print("RESPONSE JSON")
                    print(response_json)

                    print(response_json["league"])
                    print(response_json["team1_full_name"])
                    print(response_json["team2_full_name"])
                    print(response_json["bet_type"])
                    print(response_json["prop_type"])
                    print(response_json["player_name"])
                    print(response_json["line"])
                    print(response_json["bet"])
                    got_response = True

                except Exception as e:
                    if except_counter < 4:
                        print(e)
                        print("TRYING AGAIN")
                        print(except_counter)
                        print("GETTING AI RESPONSE")

                        temperature = 0
                        max_tokens = 1000
                        model = "gpt-4o-mini"
                        response = get_open_ai_query_chat_bot_ai(prompt=prompt, model_name=model, max_tokens=max_tokens, temperature=temperature)

                        print("GOT AI RESPONSE")
                        print(response)
                    else:
                        print("ERROR")
                        has_error = True
                        response_to_send = "There was an error. Please try again."
                        got_response = True

            known_variables = ""
            #check if response_json["team1_full_name"] is null
            known_league = False
            known_team1 = False
            known_team2 = False
            known_bet_type = False
            known_prop_type = False
            known_player_name = False
            known_line = False
            known_bet = False

            if response_json["league"] is not None and response_json["league"] != "None" and response_json["league"] != "":
                known_variables = known_variables + '"league": ' + f'"{response_json["league"]}", '
                known_league = True

            if known_league and (response_json["league"] in ["NBA", "NFL", "MLB", "NHL"]):
                print("GETTING TEAM NAMES")
                #get team names
                s3_line_csv_file_path = f'linefiles/{response_json["league"].upper()}_Team_Names.csv'
                print(s3_line_csv_file_path)
                client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                      aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
                csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=s3_line_csv_file_path)
                body = csv_obj['Body']
                csv_string = body.read().decode('utf-8')
                team_names = pd.read_csv(StringIO(csv_string))
                print("GETTING GAME LINES")
                try:
                    #get game lines
                    obj = Sports_name.objects.get(name__iexact=response_json["league"].upper())
                    active_line_csv = obj.active_line_csv_dataset
                    s3_line_csv_file_path = 'linefiles/' + active_line_csv
                    print(s3_line_csv_file_path)
                    client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
                    csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=s3_line_csv_file_path)
                    body = csv_obj['Body']
                    csv_string = body.read().decode('utf-8')
                    todays_games = pd.read_csv(StringIO(csv_string))

                    # Create a dictionary mapping the "New Name" column to the "Full Name" column
                    name_map = dict(zip(team_names['AN Name'], team_names['Full Name']))

                    todays_games['Visitor Full Name'] = todays_games['Visitor'].map(name_map)
                    todays_games['Home Full Name'] = todays_games['Home'].map(name_map)

                    print("GETTING PROP LINES")
                except:
                    pass
                try:
                    #get prop lines
                    s3_file_path = 'props/{}_prop_sheet.csv'.format(response_json["league"].lower())
                    print(s3_file_path)
                    client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
                    csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                                Key=s3_file_path)
                    body = csv_obj['Body']
                    csv_string = body.read().decode('utf-8')
                    prop_sheet = pd.read_csv(StringIO(csv_string))

                    # Create a dictionary mapping the "New Name" column to the "Full Name" column
                    prop_sheet[['Visitor', 'Home']] = prop_sheet['Game'].str.split(' vs. ', expand=True)
                    name_map = dict(zip(team_names['New Name'], team_names['Full Name']))

                    prop_sheet['Visitor Full Name'] = prop_sheet['Visitor'].map(name_map)
                    prop_sheet['Home Full Name'] = prop_sheet['Home'].map(name_map)

                    if response_json["team1_full_name"] is not None and response_json["team1_full_name"] != "None" and response_json["team1_full_name"] != "":
                        known_team1 = True
                    if response_json["team2_full_name"] is not None and response_json["team2_full_name"] != "None" and response_json["team2_full_name"] != "":
                        known_team2 = True
                    if response_json["player_name"] is not None and response_json["player_name"] != "None" and response_json["player_name"] != "":
                        known_player_name = True

                    if known_player_name:
                        print("known player name")
                        if len(response_json["prop_type"]) > 4:
                            response_json["bet_type"] = "Player Prop"
                        if "prop" in response_json["bet_type"].lower() or response_json["bet_type"].lower() is None or response_json["bet_type"] == "None" or response_json["bet_type"] == "":
                            try:
                                try:
                                    print(prop_sheet.head(4))
                                    print("Getting stats for {}".format(response_json["player_name"]))
                                    selected_rows = prop_sheet.loc[prop_sheet['Player Name'].str.lower() == response_json["player_name"].lower()]
                                except Exception as e:
                                    print("EXCEPTION")
                                    print(e)
                                print(selected_rows)
                                if len(selected_rows) > 0:
                                    home = selected_rows['Home'].iloc[0]
                                    visitor = selected_rows['Visitor'].iloc[0]

                                    print(selected_rows['Home Full Name'])
                                    print(selected_rows['Visitor Full Name'])
                                    response_json["team1_full_name"] = home
                                    response_json["team2_full_name"] = visitor
                                    response_json["bet_type"] = "Prop Bet"
                                    # Print the values
                                    print(f'Home: {home}, Visitor: {visitor}')

                            except:
                                pass
                except:
                    pass

                if known_team1 and not known_team2:
                    print("In known team 1 and not known team 2")

                    try:
                        todays_games['Home Full Name']
                        print(todays_games['Home Full Name'])
                        print(todays_games['Visitor Full Name'])
                        print("SELECTING ROWS")
                        selected_rows = todays_games.loc[todays_games['Home Full Name'].str.lower() == response_json["team1_full_name"].lower()]
                        if len(selected_rows) > 0:
                            response_json["team2_full_name"] = selected_rows["Visitor Full Name"].iloc[0]
                        else:
                            selected_rows = todays_games.loc[todays_games['Visitor Full Name'].str.lower() == response_json["team1_full_name"].lower()]
                            if len(selected_rows) > 0:
                                response_json["team2_full_name"] = selected_rows["Home Full Name"].iloc[0]
                        print("TEAM 2 FULL NAME: " + response_json["team2_full_name"])
                    except:
                        pass

                if "prop" in response_json["bet_type"].lower() and known_player_name and response_json["prop_type"] is not None and response_json["prop_type"] != "None" and response_json["prop_type"] != "":
                    try:
                        print("Trying to get line")
                        s3_line_csv_file_path = f'linefiles/{response_json["league"].lower()}_prop_names.csv'

                        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
                        csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=s3_line_csv_file_path)
                        body = csv_obj['Body']
                        csv_string = body.read().decode('utf-8')
                        prop_names = pd.read_csv(StringIO(csv_string))

                        prop = response_json["prop_type"]

                        print(prop)

                        prop_names["Prop"] = prop_names["Prop"].apply(lambda x: x.lower())
                        closest_prop_name = difflib.get_close_matches(prop.lower(), prop_names["Prop"])[0]
                        print(closest_prop_name)
                        sheet_prop_name = prop_names[(prop_names["Prop"] == closest_prop_name)]["Sheet Name"].values[0]
                        print(sheet_prop_name)
                        print("SHEET PROP NAME: " + sheet_prop_name)
                        response_json["prop_type"] = sheet_prop_name
                        if response_json["line"] is None or response_json["line"] == "None" or response_json["line"] == "":
                            selected_rows = prop_sheet.loc[
                                (prop_sheet['Player Name'].str.lower() == response_json["player_name"].lower()) & (
                                            prop_sheet['Prop'].str.lower() == sheet_prop_name.lower())]
                            print(selected_rows)

                            if len(selected_rows) > 0:
                                response_json["line"] = selected_rows["Line"].iloc[0]
                                print(f'Line: {response_json["line"]}')
                    except:
                        pass

                if "moneyline" not in response_json["bet_type"].lower() and (response_json["line"] is None or response_json["line"] == "None" or response_json["line"] == ""):
                    if "spread" in response_json["bet_type"].lower() and known_team1 and known_team2:
                        print("This is a spread bet")
                        try:
                            selected_rows = todays_games.loc[todays_games['Home Full Name'] == response_json["team1_full_name"]]
                            if len(selected_rows) > 0:
                                response_json["line"] = selected_rows["DraftKings Home Spread"].iloc[0]
                            else:
                                selected_rows = todays_games.loc[todays_games['Visitor Full Name'] == response_json["team1_full_name"]]
                                if len(selected_rows) > 0:
                                    response_json["line"] = selected_rows["DraftKings Home Spread"].iloc[0]

                            print(f'Line: {response_json["line"]}')
                        except:
                            pass

                    elif (response_json["bet_type"].lower() in ["total", "over/under", "over-under", "over", "under", "over under", "overunder"]) and known_team1 and known_team2:
                        print("This is a total bet")
                        try:
                            selected_rows = todays_games.loc[todays_games['Home Full Name'] == response_json["team1_full_name"]]
                            if len(selected_rows) > 0:
                                response_json["line"] = selected_rows["DraftKings Over Line"].iloc[0]
                            else:
                                selected_rows = todays_games.loc[todays_games['Visitor Full Name'] == response_json["team1_full_name"]]
                                if len(selected_rows) > 0:
                                    response_json["line"] = selected_rows["DraftKings Over Line"].iloc[0]

                            print(f'Line: {response_json["line"]}')
                        except:
                            pass

            if response_json["team1_full_name"] is not None and response_json["team1_full_name"] != "None" and response_json["team1_full_name"] != "":
                known_variables = known_variables + '"team1_full_name": ' + f'"{response_json["team1_full_name"]}", '
                known_team1 = True
            if response_json["team2_full_name"] is not None and response_json["team2_full_name"] != "None" and response_json["team2_full_name"] != "":
                known_variables = known_variables + '"team2_full_name": ' + f'"{response_json["team2_full_name"]}", '
                known_team2 = True
            if response_json["bet_type"] is not None and response_json["bet_type"] != "None" and response_json["bet_type"] != "":
                known_variables = known_variables + '"bet_type": ' + f'"{response_json["bet_type"]}", '
                known_bet_type = True
            if response_json["prop_type"] is not None and response_json["prop_type"] != "None" and response_json["prop_type"] != "":
                known_variables = known_variables + '"prop_type": ' + f'"{response_json["prop_type"]}", '
                known_prop_type = True
            if response_json["player_name"] is not None and response_json["player_name"] != "None" and response_json["player_name"] != "":
                known_variables = known_variables + '"player_name": ' + f'"{response_json["player_name"]}", '
                known_player_name = True
            if response_json["line"] is not None and response_json["line"] != "None" and response_json["line"] != "":
                known_variables = known_variables + '"line": ' + f'"{response_json["line"]}", '
                known_line = True
            if response_json["bet"] is not None and response_json["bet"] != "None" and response_json["bet"] != "":
                known_variables = known_variables + '"bet": ' + f'"{response_json["bet"]}", '
                known_bet = True


            if not known_team1:
                response_to_send = "It looks like you may have forgotten the team names of the game.  Can you tell me what teams are playing?"

            elif not known_team2:
                response_to_send = f"It looks like you gave me one team but I still need the second.  Can you tell me who the {response_json['team1_full_name']} are playing?"

            elif not known_bet_type:
                response_to_send = "What type of bet are you making?  Is it a Moneyline, Spread, Total, or a Player Prop?"

            elif "prop" in response_json["bet_type"].lower() and (not known_prop_type):
                response_to_send = "Can you give me more information on type of prop you are betting?"

            elif "prop" in response_json["bet_type"].lower() and (not known_player_name):
                response_to_send = "Sorry if I missed it, what player are you betting on?"

            elif "moneyline" not in response_json["bet_type"].lower() and (not known_line):
                response_to_send = "You may have forgotten tell me the line.  Can you tell me what it is?"

            elif not known_bet:
                response_to_send = "Can you tell me what side you are betting?"

            else:
                print("In summarize opinion.")
                prompt = construct_data_prompt(message, full_chat, prompt_type="summarize_opinion", summary="")
                print("GOT PROMPT")
                print(prompt)
                temperature = 0
                max_tokens = 1000
                model = "gpt-4o-mini"
                response = get_open_ai_query_chat_bot_ai(prompt=prompt, model_name=model, max_tokens=max_tokens, temperature=temperature)

                print(response)

                got_response = False
                except_counter = 0
                while not got_response:
                    except_counter += 1
                    try:
                        print("READING RESPONSE...")
                        response_text = read_response(response, chat=True)
                        if response_text == "Error":
                            has_error = True
                        got_response = True
                    except Exception as e:
                        if except_counter < 4:
                            print(e)
                            print("TRYING AGAIN")
                            print(except_counter)
                            print("GETTING AI RESPONSE")

                            temperature = 0
                            max_tokens = 1000
                            model = "gpt-4o-mini"
                            response = get_open_ai_query_chat_bot_ai(prompt=prompt, model_name=model, max_tokens=max_tokens, temperature=temperature)
                        else:
                            print("ERROR")
                            has_error = True
                            response_to_send = "There was an error. Please try again."
                            got_response = True


                opinion = read_response(response, chat=True).replace("\n", "")
                if opinion == "Error":
                    has_error = True
                print("OPINION")
                print(opinion)

                if "false" in opinion.lower():
                    response_to_send = "Can you tell me a little more about why you are making that bet?"

                else:
                    response_to_send = "Thanks for all of the information, I'll get to work on your article! It may take me a couple minutes, I'm digging deep into Explore+. Hang on tight and please do not refresh the page."
                    opinion = opinion.replace('"', '').replace("'", "")
                    known_variables = known_variables + '"opinion": ' + f'"{opinion}"'
                    stripped_string = known_variables.strip('{')
                    stripped_string = stripped_string.strip('}')
                    known_variables = "{" + stripped_string + "}"
                    step = "start_writing"

            print("RESPONSE TO SEND")
            print(response_to_send)

            # Create a JSON response
            data = {
                'response': response_to_send,
                'step': step,
                'step_count': step_count + 1,
                'full_chat': full_chat + " " + message,
                'known_variables': known_variables,
                'last_message': response_to_send
            }

            print(data)

            json_data = json.dumps(data)

        if step == "start_writing":
            stripped_string = known_variables.strip('{')
            stripped_string = stripped_string.strip('}')
            known_variables = "{" + stripped_string + "}"

            print("WRITING ARTICLE")
            data = {
                'response': response_to_send,
                'step': "writing_article",
                'step_count': step_count + 1,
                'full_chat': full_chat + " " + message,
                'known_variables': known_variables,
                'last_message': last_message
            }

            json_data = json.dumps(data)

        if step == "writing_article":
            stripped_string = known_variables.strip('{')
            stripped_string = stripped_string.strip('}')
            known_variables = "{" + stripped_string + "}"
            print("IN WRITING ARTICLE")

            #count " in known_variables
            quote_count = 0
            for char in known_variables:
                if char == '"':
                    quote_count += 1

            #count ' in known_variables
            single_quote_count = 0
            for char in known_variables:
                if char == "'":
                    single_quote_count += 1

            if single_quote_count > quote_count:
                known_variables = known_variables.replace("'", '"')
            print("JSON known_variables")
            json_known_variables = json.loads(known_variables)

            print(json_known_variables)

            league = json_known_variables["league"]
            team1_full_name = json_known_variables["team1_full_name"]
            team2_full_name = json_known_variables["team2_full_name"]
            bet_type = json_known_variables["bet_type"]
            try:
                prop_type = json_known_variables["prop_type"]
                player_name = json_known_variables["player_name"]
            except:
                prop_type = None
                player_name = None
            try:
                line = json_known_variables["line"]
            except:
                line = None
            bet = json_known_variables["bet"]
            opinion = json_known_variables["opinion"]

            #Making consistent writing syle choices
            writing_preference = "You are a young new sports writer. Turn this research into an article of they type that you would see on Barstool Sports. Use current Gen Z & Millennial sports and sports betting jargon. Also write a concise, short, catchy click-bait title for this article that you would see on Barstool Sports. You are writing long-form content on a website of user-generated content that has a large engaged betting community.  Even though your articles have casual tone, they are detailed, and long-form, with references to data and statistics.  You delve into the details of the games and players on which you are focused and make sure your numerous readers have all of the full context of the situation. You are known for drafting compelling long-form sports content that is factually accurate and helpful for all. You are objective but persuasive."
            word_count = "800"

            print("HERE IS THE BET TYPE")
            print(bet_type)
            print("HERE IS THE PROP TYPE")
            print(prop_type)

            temperature = .7
            max_tokens = 800
            model = "gpt-4o-mini"

            print("RESEARCHING...")
            try:
                print("league: " + league)
            except:
                print("league: None")
                league = ""
            try:
                print("team1_full_name: " + team1_full_name)
            except:
                print("team1_full_name: None")
                team1_full_name = ""
            try:
                print("team2_full_name: " + team2_full_name)
            except:
                print("team2_full_name: None")
                team2_full_name = ""
            try:
                print("bet_type: " + bet_type)
            except:
                print("bet_type: None")
                bet_type = ""
            try:
                print("prop_type: " + prop_type)
                print("player_name: " + player_name)
            except:
                print("prop_type: None")
                print("player_name: None")
                prop_type = ""
                player_name = ""
            try:
                print("line: " + line)
            except:
                print("line: None")
                line = ""
            try:
                print("bet: " + bet)
            except:
                print("bet: None")
                bet = ""
            try:
                print("opinion: " + opinion)
            except:
                print("opinion: None")
                opinion = ""
            try:
                print("writing_preference: " + writing_preference)
            except:
                print("writing_preference: None")
                writing_preference = ""
            try:
                print("word_count: " + word_count)
            except:
                print("word_count: None")
                word_count = ""

            if "prop" in bet_type.lower():
                search = player_name + " " + team1_full_name + " vs. " + team2_full_name
                print("GETTING RESEARCH FOR PLAYER PROPS")
                print(search)
                print(prop_type)
                date_and_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
                filename = f"{event_id}_{date_and_time}_research.txt"
                print("CALLING GET RESEARCH")
                text = get_research(search, league, team1_full_name, team2_full_name, bet_type, player_name, prop_type, line, bet, opinion, writing_preference, word_count, model, temperature, max_tokens, filename)
                print("GOT RESEARCH")
            else:
                print("GETTING RESEARCH FOR GAME BETS")
                search = team1_full_name + " vs. " + team2_full_name
                date_and_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
                filename = f"{event_id}_{date_and_time}_research.txt"
                print("CALLING GET RESEARCH")
                text = get_research(search, league, team1_full_name, team2_full_name, bet_type, player_name, prop_type, line, bet, opinion, writing_preference, word_count, model, temperature, max_tokens, filename)
                print("GOT RESEARCH")
            print(text)

            image = get_image_search(text)

            title = text[text.find("Title: ") + 7:text.find("Lede: ")]
            lede = text[text.find("Lede: ") + 6:text.find("Body: ")]
            body = text[text.find("Body: ") + 6:]
            print ("TITLE")
            #remove " from start and end of title
            if title[0] == '"':
                title = title[1:]
            if title[-1] == '"':
                title = title[:-1]
            print(title)
            print ("LEDE")
            print(lede)
            lede = "<p><em>" + lede + "</em></p>"
            print ("BODY")
            print(body)
            body = "<p>" + body.replace("\n", "</p><p>") + "</p>"
            body = body.replace("<p></p>", "")
            if image != "":
                lede = "<p><img class = 'fr-fic fr-dib' src='" + image + "'></p>" + lede

            body = lede + body
            print("DONE WRITING ARTICLE")
            response_to_send = "I'm done! I hope this is a great starting point for you to write an amazing article."
            print("SENDING RESPONSE")
            print(response_to_send)
            data = {
                'response': response_to_send,
                'step': "done_writing",
                'step_count': step_count + 1,
                'full_chat': full_chat + " " + message,
                'known_variables': known_variables,
                'last_message': last_message,
                'title': title,
                'body': body,
                'image': image
            }

            print(data)

            json_data = json.dumps(data)
    except Exception as e:
        print("ERROR")
        print(e)
        try:
            message = request.POST['message']
        except:
            message = ""
        try:
            full_chat = request.GET['full_chat']
        except:
            full_chat = ""
        try:
            step = request.GET['step']
        except:
            step = "start"
        try:
            known_variables = "{" + request.GET['known_variables'] + "}".replace('""', '", "')
        except:
            known_variables = ""
        try:
            last_message = request.GET['last_message']
        except:
            last_message = ""

        response_to_send = "I'm sorry, I'm having trouble with that. Please refresh your screen and try again. It may be that our AI servers are over-loaded, so it might be worth waiting a few minutes before trying again."

        data = {
            'response': response_to_send,
            'step': "start",
            'step_count': step_count + 1,
            'full_chat': "",
            'known_variables': "",
            'last_message': "",
            'title': "",
            'body': "",
            'image': ""
        }
        json_data = json.dumps(data)

    if has_error:
        data = {
            'response': "I'm sorry, I'm having trouble with that. Please refresh your screen and try again. It may be that our AI servers are over-loaded, so it might be worth waiting a few minutes before trying again.",
            'step': "start",
            'step_count': step_count + 1,
            'full_chat': "",
            'known_variables': "",
            'last_message': "",
            'title': "",
            'body': "",
            'image': ""
        }
        json_data = json.dumps(data)

    #upload to s3 storage bucket in the folder chat_bot_files
    print("Uploading JSON to S3")
    filename = f"{event_id}_{step_count}.json"
    s3_upload_path = 'chat_bot_files/' + filename
    print(s3_upload_path)
    s3 = boto3.resource('s3')
    client = boto3.client('s3', aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                          aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'])
    client.put_object(ACL='public-read',
                      Bucket=settings.AWS_STORAGE_BUCKET_NAME, Body=json_data,
                      Key=s3_upload_path,
                      ContentType='application/json', )
    print("Done Uploading JSON to S3")

    return HttpResponse(json_data, content_type='application/json')