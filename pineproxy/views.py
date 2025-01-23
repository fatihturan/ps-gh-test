from revproxy.views import ProxyView
import dtale
import pandas as pd
import time
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from blog.views import check_user_groups, get_ip
from users.models import S3ZipUpload
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from django.contrib import messages
from django.conf import settings as conf_settings

# dtale req files
import dtale.app as dtale_app
import dtale
import pandas as pd
import dtale.global_state as global_state
# s3 zip
import zipfile
import boto3
import io
from io import BytesIO,StringIO
from django.conf import settings
from blog.models import Post, Comment
from .models import *
from .forms import MLBForm, NFLForm, NBAForm, NHLForm
from django.urls import reverse
from notifications.models import UserNotification as Notification
import joblib
import urllib
import tempfile
import pandas as pd
pd.options.mode.chained_assignment = None  # default='warn'
import os
from statistics import NormalDist
import scipy
import random
import numpy as np
import math
# Logger
import logging, traceback
from pineproxy.scheduler import start_sheet
import json
import requests

logger = logging.getLogger('django') #TODO- replace with below?
log = logging.getLogger('json')

#TODO- validate that removing unused imports not causing any issues
#TODO- can we condense imports at all? ie one file with a bunch and then others that reference?

class TestProxyView(ProxyView):
    upstream = 'http://0.0.0.0:40000/'

    def dispatch(self, request, *path):
        path = request.path_info
        d1 = dtale.show(pd.DataFrame([1, 2, 3, 4, 5]), name="temp csv", ignore_duplicate=True, allow_cell_edits=False)
        while (not d1.is_up()):
            time.sleep(0.1)
        return super().dispatch(request, path)

def check_prop_master_user(user):
    if user:
        is_user_group = False
        is_user_group = user.groups.filter(name__in=['prop_master_user']).exists()
        if is_user_group: return True
        else: return False

@login_required
def stats_generating(request,sport_name=None):

    is_user_group = False
    is_user_group = request.user.groups.filter(name__in=['data_access_user', 'admin_user', 'moderator_user']).exists()

    context = {}
    context["user"] = request.user
    context["user_id"] = str(request.user.id)
    context["is_group"] = is_user_group
    #context['is_prop_master_user'] = check_prop_master_user(request.user)

    try:
        context["new_notifications"] = (Notification.objects.filter(user=request.user).exclude(sender=request.user).exclude(is_seen=True).count() > 0)
        context["notification_count"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).count()
        context["recent_notifications"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).order_by('-date')[:4]
    except:
        context["new_notifications"] = False
        context["notification_count"] = 0
        context["recent_notifications"] = []

    if sport_name:
        sports_name = Sports_name.objects.all().values_list('name', flat=True)
        context['sports_name'] = sports_name
        context['sport_name'] = sport_name

        return render(request, 'generating_stats.html', context)

@login_required
def index(request,sport_name=None):
    is_user_group = False
    is_user_group = request.user.groups.filter(name__in=['data_access_user', 'admin_user', 'moderator_user']).exists()

    context={}
    if sport_name:
        #gets sport id for users without access to Explore+
        if sport_name == "NBA": sport_prefix = "100000000001"
        elif sport_name == "NFL": sport_prefix = "100000000002"
        elif sport_name == "NHL": sport_prefix = "100000000003"
        elif sport_name == "MLB": sport_prefix = "100000000004"

        obj_sport_name = True
        try:
            obj = Sports_name.objects.get(name__iexact=sport_name)
        except:
            obj_sport_name = False
        if obj_sport_name:
            active_datasheet_zip = obj.active_sheet_name
            sport_id = str(obj.id)
            user_id = str(request.user.id)
            user = request.user

            if active_datasheet_zip:
                session = boto3.session.Session(aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
                s3 = session.resource("s3")
                bucket = s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME)
                s3_file_path = 'datafiles/' + active_datasheet_zip
                obj = bucket.Object(s3_file_path)

                if_data_sheet = True

                datasheet_names_and_id = {}
                team_data = pd.DataFrame()
                player_data = pd.DataFrame()
                dfs_data = pd.DataFrame()
                if is_user_group:
                    print("User has Explore+ access")
                    data_id = user_id + "_1"
                    data_prefix = user_id
                else:
                    print("User does not have Explore+ access")
                    data_id = sport_prefix + "_1"
                    data_prefix = sport_prefix

                name = (global_state.get_metadata(data_id) or {}).get('name')
                print("Data ID: {}".format(data_id))
                print("Sheet Name: {}".format(name))
                other_sport = False
                try:
                    if sport_name in name:
                        if_data_sheet = False
                        game_data = global_state.get_data("{}_1".format(data_prefix))
                        team_data = global_state.get_data("{}_2".format(data_prefix))
                        player_data = global_state.get_data("{}_3".format(data_prefix))
                        dfs_data = global_state.get_data("{}_4".format(data_prefix))
                    other_sport = True
                except:
                    pass

                try:
                    if if_data_sheet:

                        counter = 1
                        not_cleaned = True
                        with io.BytesIO(obj.get()["Body"].read()) as tf:
                            tf.seek(0)
                            with zipfile.ZipFile(tf, mode='r') as zipf:
                                for subfile in zipf.namelist():
                                    srt_counter = data_prefix + '_' + str(counter)

                                    if other_sport and not_cleaned:
                                        #TODO- error handling?
                                        try:
                                            global_state.cleanup(data_prefix + '_1')
                                        except:
                                            pass
                                        try:
                                            global_state.cleanup(data_prefix + '_2')
                                        except:
                                            pass
                                        try:
                                            global_state.cleanup(data_prefix + '_3')
                                        except:
                                            pass
                                        try:
                                            global_state.cleanup(data_prefix + '_4')
                                        except:
                                            pass
                                        not_cleaned = False

                                    name_split = subfile.split('.')[0]
                                    proper_name = name_split.replace('_', ' ')
                                    datasheet_names_and_id[srt_counter] = proper_name
                                    #PLK files are optimized for data analysis -- quick -- but not good for predictions
                                    if ("Team" in proper_name) and ("pkl" in subfile):
                                        data = zipf.read(subfile)
                                        team_data = pd.read_pickle(BytesIO(data))
                                        start_sheet(team_data, proper_name, srt_counter)
                                        #startup("", data=team_data, name=proper_name, allow_cell_edits=False, data_id=srt_counter)
                                    elif ("Player" in proper_name) and ("pkl" in subfile):
                                        data = zipf.read(subfile)
                                        player_data = pd.read_pickle(BytesIO(data))
                                        start_sheet(player_data, proper_name, srt_counter)
                                        #startup("", data=player_data, name=proper_name, allow_cell_edits=False, data_id=srt_counter)
                                    elif ("Fantasy" in proper_name) and ("pkl" in subfile):
                                        data = zipf.read(subfile)
                                        dfs_data = pd.read_pickle(BytesIO(data))
                                        start_sheet(dfs_data, proper_name, srt_counter)
                                        #startup("", data=dfs_data, name=proper_name, allow_cell_edits=False, data_id=srt_counter)
                                    elif ("Game" in proper_name) and ("pkl" in subfile):
                                        data = zipf.read(subfile)
                                        start_sheet(pd.read_pickle(BytesIO(data)), proper_name, srt_counter)
                                        #startup("", data=pd.read_pickle(BytesIO(data)), name=proper_name,allow_cell_edits=False, data_id=srt_counter)
                                    counter = counter + 1
                        application = dtale_app.build_app(
                            "", host=dtale_app.ACTIVE_HOST, reaper_on=True, hide_shutdown=True,
                            github_fork=False
                        )
                except Exception as e:
                    print("HERE GOT AN ERROR")
                    logger.error(e)

                date = team_data["Date"].max()
                last_week = (date - pd.DateOffset(weeks=1)).strftime("%Y-%m-%d")
                last_month = (date - pd.DateOffset(months=1)).strftime("%Y-%m-%d")
                last_year = (date - pd.DateOffset(years=1)).strftime("%Y-%m-%d")
                try:
                    this_season = team_data["Season Year"].max()
                except:
                    this_season = team_data["Season"].max()

                last_nfl_week = 0
                if sport_name == "NFL" or sport_name=="NFL-CBS":
                    last_nfl_week = team_data.loc[team_data["Season Year"] == this_season]["Week"].max()

                teams = team_data["Team"].unique()
                team_columns = team_data.columns

                additional_team_columns = ["Moneyline",
                                           "Implied Odds",
                                           "Final Score Spread",
                                           "Point Spread",
                                           "Opening Spread",
                                           "Closing Spread",
                                           "Point Spread Moneyline",
                                           "Point Spread Implied Odds",
                                           "Closing Spread Moneyline",
                                           "Closing Spread Implied Odds",
                                           "Spread Difference",
                                           "Total Score",
                                           "Total Score - First Five Innings",
                                           "Opening Over-Under",
                                           "Closing Over-Under",
                                           "Over-Under",
                                           "Over-Under Difference"]

                team_columns_final = []
                for column in team_columns:
                    if ("Team - " in column) or ("Opponent - " in column) or (column in additional_team_columns):
                        if not (("Pitcher" in column) or ("Pitching Hand" in column) or ("Starter" in column)):
                            team_columns_final.append(column)

                players = player_data["Player Name"].unique()
                player_columns = player_data.columns

                player_columns_final = []
                for column in player_columns:
                    if "Player - " in column:
                        if not (("Days Rest" in column) or ("Games in Last" in column) or ("Season" in column) or ("Minutes" in column) or ("Game ID" in column) or ("Week" in column) or ("Team" in column) or ("Player - Position" in column) or ("Pitching Hand" in column) or ("Batting Hand" in column)or ("Winning Pitcher" in column) or ("Losing Pitcher" in column) or ("Starter" in column)):
                            player_columns_final.append(column)

                obj = Sports_name.objects.get(name__iexact=sport_name)
                active_line_csv = obj.active_line_csv_dataset
                s3_line_csv_file_path = 'linefiles/' + active_line_csv

                client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                      aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
                csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=s3_line_csv_file_path)
                body = csv_obj['Body']
                csv_string = body.read().decode('utf-8')
                all_lines = pd.read_csv(StringIO(csv_string))

                todays_teams = []

                for i, row in all_lines.iterrows():
                    todays_teams.append(row["Home"])
                    todays_teams.append(row["Visitor"])

                # Updates game names
                if sport_name == "MLB":
                    tn = {'Full Name': ['NYM', 'KC', 'STL', 'PIT', 'TOR', 'TB', 'ATL', 'WSH', 'MIL', 'SFG', 'TEX',
                                        'SEA', 'PHI', 'CIN',
                                        'SD', 'LAD', 'ARI', 'COL', 'OAK', 'CWS', 'CHC', 'LAA', 'MIN', 'BAL', 'MIA',
                                        'DET', 'CLE', 'BOS',
                                        'HOU', 'NYY'],
                          'New Name': ['NY Mets', 'Kansas City', 'St. Louis', 'Pittsburgh', 'Toronto', 'Tampa Bay',
                                       'Atlanta',
                                       'Washington', 'Milwaukee', 'San Francisco', 'Texas', 'Seattle',
                                       'Philadelphia', 'Cincinnati',
                                       'San Diego', 'LA Dodgers', 'Arizona', 'Colorado', 'Oakland',
                                       'Chicago White Sox', 'Chicago Cubs',
                                       'LA Angels', 'Minnesota', 'Baltimore', 'Miami', 'Detroit', 'Cleveland',
                                       'Boston', 'Houston',
                                       'NY Yankees']}

                elif sport_name == "NFL":
                    tn = {'Full Name': ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN', 'DET',
                                        'GB', 'HOU', 'IND',
                                        'JAC', 'KC', 'LV', 'ChargersLA', 'RamsLA', 'MIA', 'MIN', 'NE', 'NO', 'NYG',
                                        'NYJ', 'LV', 'PHI',
                                        'PIT', 'ChargersLA', 'SF', 'SEA', 'TB', 'TEN', 'WAS', 'WAS'],
                          'New Name': ['Arizona', 'Atlanta', 'Baltimore', 'Buffalo', 'Carolina', 'Chicago',
                                       'Cincinnati', 'Cleveland',
                                       'Dallas', 'Denver', 'Detroit', 'Green Bay', 'Houston', 'Indianapolis',
                                       'Jacksonville',
                                       'Kansas City', 'Las Vegas', 'LA Chargers', 'LA Rams', 'Miami', 'Minnesota',
                                       'New England',
                                       'New Orleans', 'NY Giants', 'NY Jets', 'Oakland', 'Philadelphia',
                                       'Pittsburgh', 'San Diego',
                                       'San Francisco', 'Seattle', 'Tampa Bay', 'Tennessee', 'Washington',
                                       'Washington']}
                elif sport_name == "NBA":
                    tn = {
                        'Full Name': ['ATL', 'BOS', 'BKN', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW', 'HOU',
                                      'IND', 'LAC', 'LAL',
                                      'MEM', 'MIA', 'MIL', 'MIN', 'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHX', 'POR',
                                      'SAC', 'SAS', 'TOR',
                                      'UTA', 'WAS'],
                        'New Name': ['Atlanta', 'Boston', 'Brooklyn', 'Charlotte', 'Chicago', 'Cleveland', 'Dallas',
                                     'Denver',
                                     'Detroit', 'Golden State', 'Houston', 'Indiana', 'LA Clippers', 'LA Lakers',
                                     'Memphis', 'Miami',
                                     'Milwaukee', 'Minnesota', 'New Orleans', 'New York', 'Oklahoma City',
                                     'Orlando', 'Philadelphia',
                                     'Phoenix', 'Portland', 'Sacramento', 'San Antonio', 'Toronto', 'Utah',
                                     'Washington']}
                elif sport_name == "NHL":
                    tn = {
                        'Full Name': ['ANA', 'ARI', 'BOS', 'BUF', 'CGY', 'CAR', 'CHI', 'COL', 'CBJ', 'DAL', 'DET',
                                      'EDM', 'FLA', 'LA',
                                      'MIN', 'MTL', 'NSH', 'NJ', 'NYI', 'NYR', 'OTT', 'PHI', 'PIT', 'SJ', 'SEA',
                                      'STL', 'TB', 'TOR',
                                      'VAN', 'VGK', 'WSH', 'WPG', 'UTA'],
                        'New Name': ['Anaheim', 'Arizona', 'Boston', 'Buffalo', 'Calgary', 'Carolina', 'Chicago',
                                     'Colorado',
                                     'Columbus', 'Dallas', 'Detroit', 'Edmonton', 'Florida', 'Los Angeles',
                                     'Minnesota', 'Montreal',
                                     'Nashville', 'New Jersey', 'NY Islanders', 'NY Rangers', 'Ottawa',
                                     'Philadelphia', 'Pittsburgh',
                                     'San Jose', 'Seattle', 'St. Louis', 'Tampa Bay', 'Toronto', 'Vancouver',
                                     'Vegas', 'Washington',
                                     'Winnipeg', 'Utah']}

                team_names = pd.DataFrame(data=tn)

                for row in team_names.iterrows():
                    todays_teams = [team.replace(row[1][0], row[1][1]) for team in todays_teams]

                numerics = ['int16', 'int32', 'int64', 'float16', 'float32', 'float64']

                dfs_players = dfs_data["Player Name"].unique()
                dfs_columns = dfs_data.columns

                if sport_name == "NBA":
                    fp_dfs_player_data = dfs_data[dfs_data["Season Year"] == 2022]
                elif sport_name == "NFL" or sport_name == "NHL":
                    fp_dfs_player_data = dfs_data[dfs_data["Season Year"] == 2022]
                elif sport_name == "MLB":
                    fp_dfs_player_data = dfs_data[dfs_data["Season"] == 2023]

                fp_dfs_player_data = fp_dfs_player_data[fp_dfs_player_data["Team"].isin(todays_teams)]

                fp_dfs_players = fp_dfs_player_data["Player Name"].unique()
                fp_dfs_columns = fp_dfs_player_data.select_dtypes(include=numerics).columns

                s3_file_path = 'props/{}_prop_sheet.csv'.format(sport_name.lower())

                client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                      aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
                csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                            Key=s3_file_path)
                body = csv_obj['Body']
                csv_string = body.read().decode('utf-8')
                prop_sheet = pd.read_csv(StringIO(csv_string))

                prop_players = prop_sheet["Player Name"].unique()

                dfs_columns_final = []

                if "NFL" in sport_name:
                    for column in dfs_columns:
                        if ("Player - " in column) or ("Team - " in column):
                            if not (("Days Rest" in column) or ("Games in Last" in column) or ("Season" in column) or ("Minutes" in column) or ("Game ID" in column) or ("Week" in column) or ("Team" in column) or ("Player - Position" in column) or ("Pitching Hand" in column) or ("Batting Hand" in column)or ("Winning Pitcher" in column) or ("Losing Pitcher" in column) or ("Starter" in column)):
                                dfs_columns_final.append(column)
                else:
                    for column in dfs_columns:
                        if "Player - " in column:
                            if not (("Days Rest" in column) or ("Games in Last" in column) or ("Season" in column) or ("Minutes" in column) or ("Game ID" in column) or ("Week" in column) or ("Team" in column) or ("Player - Position" in column) or ("Pitching Hand" in column) or ("Batting Hand" in column)or ("Winning Pitcher" in column) or ("Losing Pitcher" in column) or ("Starter" in column)):
                                dfs_columns_final.append(column)

                fp_player_columns_final = []
                fp_dfs_columns_final = []

                if "NFL" in sport_name:
                    for column in fp_dfs_columns:
                        if ("Player - " in column) or ("Team - " in column):
                            if not (("Batting Order" in column) or ("At Bats" in column) or ("Dollar" in column) or ("Dollars" in column) or ("Fantasy" in column) or ("Salary" in column) or ("Days Rest" in column) or ("Games in Last" in column) or ("Season" in column) or ("Minutes" in column) or ("Game ID" in column) or ("Week" in column) or ("Team" in column) or ("Player - Position" in column) or ("Pitching Hand" in column) or ("Batting Hand" in column)or ("Winning Pitcher" in column) or ("Losing Pitcher" in column) or ("Starter" in column)):
                                fp_player_columns_final.append(column)
                            if (("Fantasy" in column) or ("Dollar" in column) or ("Dollars" in column)):
                                fp_dfs_columns_final.append(column)
                else:
                    for column in fp_dfs_columns:
                        if "Player - " in column:
                            if not (("Dollar" in column) or ("Dollars" in column) or ("Fantasy" in column) or ("Salary" in column) or ("Days Rest" in column) or ("Games in Last" in column) or ("Season" in column) or ("Minutes" in column) or ("Game ID" in column) or ("Week" in column) or ("Team" in column) or ("Player - Position" in column) or ("Pitching Hand" in column) or ("Batting Hand" in column)or ("Winning Pitcher" in column) or ("Losing Pitcher" in column) or ("Starter" in column)):
                                fp_player_columns_final.append(column)
                            if (("Fantasy" in column) or ("Dollar" in column) or ("Dollars" in column)):
                                fp_dfs_columns_final.append(column)
                del team_data
                del player_data
                del dfs_data

                player_project_games_counter = 1
                player_project_games = []
                while player_project_games_counter <=25:
                    player_project_games.append(player_project_games_counter)
                    player_project_games_counter = player_project_games_counter+1

                player_project_split = ['All Games', 'Home', 'Visitor', 'vs Opponent', 'Win', 'Loss']
                if sport_name == "MLB":
                    player_project_split.append("vs RH Pitcher")
                    player_project_split.append("vs LH Pitcher")
                    player_project_split.append("vs Probable Pitcher")
                elif sport_name == "NBA":
                    player_project_split.append("Win by 10+")
                    player_project_split.append("Loss by 10+")
                #Creating user instances dictionary for show data in UI
                data_id_and_names = {}
                for data_id in global_state.get_data():
                    user_sheet = user_id + "_"
                    if user_sheet in data_id:
                        name = (global_state.get_metadata(data_id) or {}).get('name')
                        data_id_and_names[data_id] = name

                context = {"user": user, "is_group": is_user_group, "user_id": user_id,
                        "datasheet_names_and_id": datasheet_names_and_id, "data_id_and_names": data_id_and_names,
                        "sport_name":sport_name, "teams": teams, "players": players, "dfs_players": dfs_players, "fp_dfs_players": fp_dfs_players, "prop_players": prop_players, "team_columns": team_columns_final, "player_columns":player_columns_final, "fp_player_columns": fp_player_columns_final,"dfs_columns":dfs_columns_final, "fp_dfs_columns":fp_dfs_columns_final, "player_project_games":player_project_games, "player_project_split":player_project_split, "last_game": date.strftime("%Y-%m-%d"), "last_week": last_week, "last_month": last_month, "last_year": last_year, "this_season": this_season, "last_nfl_week": last_nfl_week}
                #Get All Sports Name
                sports_name = Sports_name.objects.all().values_list('name',flat=True)
                context['sports_name']=sports_name
                context['CHARTS_URL']=conf_settings.CHARTS_URL
                context['random_number']=random.randint(10000000,99999999)
                #context['is_prop_master_user'] = check_prop_master_user(request.user)

                try:
                    context["new_notifications"] = (Notification.objects.filter(user=request.user).exclude(sender=request.user).exclude(is_seen=True).count() > 0)
                    context["notification_count"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).count()
                    context["recent_notifications"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).order_by('-date')[:4]
                except:
                    context["new_notifications"] = False
                    context["notification_count"] = 0
                    context["recent_notifications"] = []

                logger.info("{} {} {} {}".format(request.method, request.get_full_path(), get_ip(request), request.user.id))
                return render(request, 'stats.html', context)
            else:
                return HttpResponseNotFound("<h1 class='text-center'>Sport not found</h1>")
        else:
            return HttpResponseNotFound("<h1 class='text-center'>Sport not found</h1>")
    return render(request, 'stats.html', context)

def analyze(user_id, random_number):

    return redirect("{}{}/mobile_chart.html?#refresh={}".format(conf_settings.CHARTS_URL, user_id, random_number))

@login_required
def project(request, sport_name, player_name, stat, prop, games_back, split="All Games", games_without_player="All Available"):

    nba_season_year = 2024
    nhl_season_year = 2023
    nfl_season_year = 2023
    mlb_season_year = 2023

    try:
        if prop == "none":
            has_prop = False
        else:
            try:
                prop = float(prop)
                has_prop = True
            except:
                has_prop = False

        games_back = int(games_back)

        session = boto3.session.Session(aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        s3 = session.resource("s3")
        bucket = s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME)

        obj = Sports_name.objects.get(name__iexact=sport_name)


        active_datasheet_zip = obj.active_sheet_name
        s3_file_path = 'datafiles/' + active_datasheet_zip

        obj = bucket.Object(s3_file_path)

        with io.BytesIO(obj.get()["Body"].read()) as tf:
            tf.seek(0)
            with zipfile.ZipFile(tf, mode='r') as zipf:
                for subfile in zipf.namelist():
                    name_split = subfile.split('.')[0]
                    proper_name = name_split.replace('_', ' ')
                    # PLK files are optimized for data analysis -- quick -- but not good for predictions
                    if ("Prop" in proper_name) and ("pkl" in subfile):
                        data = zipf.read(subfile)
                        all_player_stats = pd.read_pickle(BytesIO(data))

        obj = Sports_name.objects.get(name__iexact=sport_name)
        active_line_csv = obj.active_line_csv_dataset
        s3_line_csv_file_path = 'linefiles/' + active_line_csv

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=s3_line_csv_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        todays_games = pd.read_csv(StringIO(csv_string))

        todays_games['Time'] = pd.to_datetime(todays_games['Time'], errors='coerce')

        #sort by time oldest to newest
        todays_games = todays_games.sort_values(by='Time')


        # Updates game names
        if sport_name == "MLB":
            tn = {
                'Full Name': ['NYM', 'KC', 'STL', 'PIT', 'TOR', 'TB', 'ATL', 'WSH', 'MIL', 'SFG', 'TEX', 'SEA', 'PHI', 'CIN',
                              'SD', 'LAD', 'ARI', 'COL', 'OAK', 'CWS', 'CHC', 'LAA', 'MIN', 'BAL', 'MIA', 'DET', 'CLE',
                              'BOS', 'HOU', 'NYY'],
                'New Name': ['NY Mets', 'Kansas City', 'St. Louis', 'Pittsburgh', 'Toronto', 'Tampa Bay', 'Atlanta',
                             'Washington', 'Milwaukee', 'San Francisco', 'Texas', 'Seattle', 'Philadelphia', 'Cincinnati',
                             'San Diego', 'LA Dodgers', 'Arizona', 'Colorado', 'Oakland', 'Chicago White Sox',
                             'Chicago Cubs',
                             'LA Angels', 'Minnesota', 'Baltimore', 'Miami', 'Detroit', 'Cleveland', 'Boston', 'Houston',
                             'NY Yankees']}

        elif sport_name == "NFL":
            tn = {'Full Name': ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN', 'DET', 'GB', 'HOU',
                                'IND',
                                'JAC', 'KC', 'LV', 'ChargersLA', 'RamsLA', 'MIA', 'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'LV',
                                'PHI',
                                'PIT', 'ChargersLA', 'SF', 'SEA', 'TB', 'TEN', 'WAS', 'WAS'],
                  'New Name': ['Arizona', 'Atlanta', 'Baltimore', 'Buffalo', 'Carolina', 'Chicago', 'Cincinnati',
                               'Cleveland',
                               'Dallas', 'Denver', 'Detroit', 'Green Bay', 'Houston', 'Indianapolis', 'Jacksonville',
                               'Kansas City', 'Las Vegas', 'LA Chargers', 'LA Rams', 'Miami', 'Minnesota', 'New England',
                               'New Orleans', 'NY Giants', 'NY Jets', 'Oakland', 'Philadelphia', 'Pittsburgh', 'San Diego',
                               'San Francisco', 'Seattle', 'Tampa Bay', 'Tennessee', 'Washington', 'Washington']}
        elif sport_name == "NBA":
            tn = {
                'Full Name': ['ATL', 'BOS', 'BKN', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW', 'HOU', 'IND', 'LAC',
                              'LAL',
                              'MEM', 'MIA', 'MIL', 'MIN', 'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHX', 'POR', 'SAC', 'SAS',
                              'TOR',
                              'UTA', 'WAS'],
                'New Name': ['Atlanta', 'Boston', 'Brooklyn', 'Charlotte', 'Chicago', 'Cleveland', 'Dallas', 'Denver',
                             'Detroit', 'Golden State', 'Houston', 'Indiana', 'LA Clippers', 'LA Lakers', 'Memphis',
                             'Miami',
                             'Milwaukee', 'Minnesota', 'New Orleans', 'New York', 'Oklahoma City', 'Orlando',
                             'Philadelphia',
                             'Phoenix', 'Portland', 'Sacramento', 'San Antonio', 'Toronto', 'Utah', 'Washington']}
        elif sport_name == "NHL":
            tn = {
                'Full Name': ['ANA', 'ARI', 'BOS', 'BUF', 'CGY', 'CAR', 'CHI', 'COL', 'CBJ', 'DAL', 'DET', 'EDM', 'FLA',
                              'LA',
                              'MIN', 'MTL', 'NSH', 'NJ', 'NYI', 'NYR', 'OTT', 'PHI', 'PIT', 'SJ', 'SEA', 'STL', 'TB', 'TOR',
                              'VAN', 'VGK', 'WSH', 'WPG', 'UTA'],
                'New Name': ['Anaheim', 'Arizona', 'Boston', 'Buffalo', 'Calgary', 'Carolina', 'Chicago', 'Colorado',
                             'Columbus', 'Dallas', 'Detroit', 'Edmonton', 'Florida', 'Los Angeles', 'Minnesota', 'Montreal',
                             'Nashville', 'New Jersey', 'NY Islanders', 'NY Rangers', 'Ottawa', 'Philadelphia',
                             'Pittsburgh',
                             'San Jose', 'Seattle', 'St. Louis', 'Tampa Bay', 'Toronto', 'Vancouver', 'Vegas', 'Washington',
                             'Winnipeg', 'Utah']}

        team_names = pd.DataFrame(data=tn)

        for row in team_names.iterrows():
            todays_games.replace(row[1][0], row[1][1], inplace=True)

        print(todays_games)
        header_string = ""
        table_string = ""
        footer_string = ""

        if sport_name == "NBA":
            all_player_stats = all_player_stats[all_player_stats["Season Year"] >= nba_season_year]
        elif sport_name == "NFL":
            all_player_stats = all_player_stats[all_player_stats["Season Year"] >= nfl_season_year]
        elif sport_name == "NHL":
            all_player_stats = all_player_stats[all_player_stats["Season Year"] >= nhl_season_year]
        elif sport_name == "MLB":
            all_player_stats = all_player_stats[all_player_stats["Season"] >= mlb_season_year]

        player_stats = all_player_stats.loc[all_player_stats["Player Name"] == player_name]

        team = player_stats["Team"].iloc[-1]

        player_stats.replace(np.nan, 0, inplace=True)

        #Gets list of players on team for games without split
        games_without_players = all_player_stats.loc[all_player_stats["Game ID"].isin(player_stats["Game ID"].values)]
        games_without_players = games_without_players.loc[games_without_players["Team"] == team]
        games_without_players = games_without_players.loc[games_without_players["Player Name"] != player_name]
        games_without_players = games_without_players["Player Name"].drop_duplicates().values
        games_without_players = np.unique(games_without_players).tolist()

        #Test gw player
        #games_without_player = "Jaylen Nowell"

        games_without_games = all_player_stats.loc[all_player_stats["Player Name"] == games_without_player]
        player_stats = player_stats.loc[~player_stats["Game ID"].isin(games_without_games["Game ID"].values)]

        if sport_name == "NBA":
            position_format = "Player - Position 1 - DraftKings"
            if "FanDuel" in stat:
                position_format = "Player - Position - FanDuel"
            elif "Yahoo" in stat:
                position_format = "Player - Position - Yahoo"
        elif (sport_name == "NFL" or sport_name == "NHL"):
            position_format = "Player - Position - DraftKings"
            if "FanDuel" in stat:
                position_format = "Player - Position - FanDuel"
            elif "Yahoo" in stat:
                position_format = "Player - Position - Yahoo"
        elif sport_name == "MLB":
            position_format = "Player - Position"

        position = player_stats.mode()[position_format][0]
        if sport_name == "NBA" or sport_name == "NFL":
            starter = player_stats.mode()["Player - Starter"][0]

        print("TEAM is {}".format(team))
        opponent_pitcher = ""

        try:

            #get opponent.  First find games where Home or Visitor is team
            opponent_games = todays_games.loc[(todays_games['Home'] == team) | (todays_games['Visitor'] == team)]

            #sort by date oldest to newest
            opponent_games = opponent_games.sort_values(by='Time')

            opponent_game = opponent_games.iloc[0]
            if opponent_game['Home'] == team:
                opponent = opponent_game['Visitor']
                opponent_string = opponent
                home_visitor = "Home"
            else:
                opponent = opponent_game['Home']
                opponent_string = "@{}".format(opponent)
                home_visitor = "Visitor"
        except:
            print(traceback.format_exc())
            opponent = "Nobody"
            opponent_string = "N/A"
            home_visitor = "None"

            log.error('PropProjectionCantFindOpponent', extra={
                "sportName": sport_name,
                "playerName": player_name,
                "team": team,
                "stat": stat,
                "prop": prop
            })

        if opponent == "Nobody":
            print(todays_games)
            print("He's not playing today.")
        else:
            #Fix Ohtani pitching glitch
            if 'Player - Pitching' in stat:
                print("IN PITCHING")
                player_stats = player_stats.loc[player_stats["Player - Pitching - Innings Pitched"] > 0]
                player_stats.drop_duplicates(subset=["Game ID"], keep="first", inplace=True)
            elif "Ohtani" in player_name:
                print("IN OHTANI")
                player_stats = player_stats[player_stats["Player - Batting - At Bats"] > 0]
                player_stats.drop_duplicates(subset=["Game ID"], keep="first", inplace=True)
                print(player_stats.tail(10))

            #get short stat
            short_stat = stat[9:]
            sheet_stat = short_stat

            if short_stat == "PR":
                short_stat = "Points & Rebounds"
            elif short_stat == "SB":
                short_stat = "Steals & Blocks"
            elif short_stat == "PAR":
                short_stat = "Points, Assists & Rebounds"
            elif short_stat == "RA":
                short_stat = "Rebounds & Assists"
            elif short_stat == "PA":
                short_stat = "Points & Assists"

            if "batting" in short_stat.lower():
                short_stat = short_stat[10:]
            elif "pitching" in short_stat.lower():
                short_stat = short_stat[11:]

            print("SHORT STAT IS {}".format(short_stat))
            print("STAT IS {}".format(stat))

            # Get Trends
            if sport_name == "NBA":
                season_stats = player_stats[player_stats["Season Year"] >= nba_season_year]
            elif sport_name == "NHL":
                season_stats = player_stats[player_stats["Season Year"] >= nhl_season_year]
            elif sport_name == "NFL":
                season_stats = player_stats[player_stats["Season Year"] >= nfl_season_year]
            elif sport_name == "MLB":
                season_stats = player_stats[player_stats["Season"] >= mlb_season_year]

            print("Getting Season Trends")
            trends = []
            try:
                # Compute the average points scored all season
                average_points_season = season_stats[stat].mean().round(2)

                more_than_line = season_stats.loc[season_stats[stat] > prop]

                # Count the number of rows in the resulting DataFrame
                num_games_more_than_line = len(more_than_line)

                # Filter the DataFrame to select games where the player scored less than the line
                less_than_line = season_stats.loc[season_stats[stat] < prop]

                # Count the number of rows in the resulting DataFrame
                num_games_less_than_line = len(less_than_line)

                trends.append(f"Season<br>Average: {str(average_points_season)} {short_stat.lower()}<br>Over: {num_games_more_than_line} games | Under: {num_games_less_than_line} games<br><br>")

            except:
                pass

            print("Getting Home-Visitor Trends")
            try:
                if home_visitor == "Home":
                    # Select the rows where the player is at home
                    home_games = season_stats[player_stats["Home-Visitor"] == "Home"]

                    # Compute the average points scored by the player in home games
                    average_home_points = home_games[stat].mean().round(2)

                    home_more_than_line = home_games.loc[home_games[stat] > prop]

                    # Count the number of rows in the resulting DataFrame
                    num_home_more_than_line = len(home_more_than_line)

                    # Filter the DataFrame to select games where the player scored less than the line
                    home_less_than_line = home_games.loc[home_games[stat] < prop]

                    # Count the number of rows in the resulting DataFrame
                    num_home_less_than_line = len(home_less_than_line)

                    trends.append(f"Home<br>Average: {str(average_home_points)} {short_stat.lower()}<br>Over: {num_home_more_than_line} games | Under: {num_home_less_than_line} games<br><br>")
                else:
                    # Select the rows where the player is Visitor
                    visitor_games = season_stats[player_stats["Home-Visitor"] == "Visitor"]

                    # Compute the average points scored by the player in away games
                    average_visitor_points = visitor_games[stat].mean().round(2)

                    visitor_more_than_line = visitor_games.loc[visitor_games[stat] > prop]

                    # Count the number of rows in the resulting DataFrame
                    num_visitor_more_than_line = len(visitor_more_than_line)

                    # Filter the DataFrame to select games where the player scored less than the line
                    visitor_less_than_line = visitor_games.loc[visitor_games[stat] < prop]

                    # Count the number of rows in the resulting DataFrame
                    num_visitor_less_than_line = len(visitor_less_than_line)

                    trends.append(f"Visitor<br>Average: {str(average_visitor_points)} {short_stat.lower()}<br>Over: {num_visitor_more_than_line} games | Under: {num_visitor_less_than_line} games<br><br>")
            except:
                pass

            print("Getting last 20 trends")
            try:
                # Compute the average points scored in the last 20 games
                average_points_last_20 = player_stats.tail(20)[stat].mean().round(2)

                # Computer the number of games in the last 20 games where the player scored more than the line
                more_than_line_last_20 = len(player_stats.tail(20).loc[player_stats[stat] > prop])

                less_than_line_last_20 = len(player_stats.tail(20).loc[player_stats[stat] < prop])

                trends.append(f"Last 20<br>Average: {str(average_points_last_20)} {short_stat.lower()}<br>Over: {more_than_line_last_20} games | Under: {less_than_line_last_20} games<br><br>")
            except:
                pass

            print("Getting last 10 trends")
            try:
                # Compute the average points scored in the last 10 games
                average_points_last_10 = player_stats.tail(10)[stat].mean().round(2)

                # Computer the number of games in the last 10 games where the player scored more than the line
                more_than_line_last_10 = len(player_stats.tail(10).loc[player_stats[stat] > prop])

                less_than_line_last_10 = len(player_stats.tail(10).loc[player_stats[stat] < prop])

                trends.append(f"Last 10<br>Average: {str(average_points_last_10)} {short_stat.lower()}<br>Over: {more_than_line_last_10} games | Under: {less_than_line_last_10} games<br><br>")
            except:
                pass

            print("Getting last 5 trends")
            try:
                # Compute the average points scored in the last 5 games
                average_points_last_5 = player_stats.tail(5)[stat].mean().round(2)

                # Computer the number of games in the last 5 games where the player scored more than the line
                more_than_line_last_5 = len(player_stats.tail(5).loc[player_stats[stat] > prop])

                less_than_line_last_5 = len(player_stats.tail(5).loc[player_stats[stat] < prop])

                trends.append(f"Last 5<br>Average: {str(average_points_last_5)} {short_stat.lower()}<br>Over: {more_than_line_last_5} games | Under: {less_than_line_last_5} games<br><br>")
            except:
                pass


            print("Getting Opponent Trends")
            try:
                opponent_games = player_stats.loc[player_stats["Opponent"] == opponent]
                average_opponent_points = opponent_games[stat].mean().round(2)
                opponent_more_than_line = opponent_games.loc[opponent_games[stat] > prop]
                num_opponent_more_than_line = len(opponent_more_than_line)

                opponent_less_than_line = opponent_games.loc[opponent_games[stat] < prop]
                num_opponent_less_than_line = len(opponent_less_than_line)

                trends.append(f"Vs. Opponent<br>Average: {str(average_opponent_points)} {short_stat.lower()}<br>Over: {num_opponent_more_than_line} games | Under: {num_opponent_less_than_line} games<br><br>")
            except:
                pass


            if "batting" in stat.lower():
                print("Getting Pitcher Trends")
                try:
                    if opponent_pitcher != "":
                        print("OPPONENT PITCHER")
                        print(opponent_pitcher)
                        #"Player - Pitching - Pitching Hand"

                        #get opponent pitcher hand

                        try:
                            opponent_pitcher_hand = all_player_stats.loc[all_player_stats["Player Name"] == opponent_pitcher]["Player - Pitching - Pitching Hand"].values[0]

                            print("OPPONENT PITCHER HAND")
                            print(opponent_pitcher_hand)

                            #Get player average vs pitching hand
                            player_vs_pitcher_hand = season_stats.loc[season_stats["Opponent - Starting Pitching Hand"] == opponent_pitcher_hand][stat].mean().round(2)
                            player_vs_pitcher_hand_more_than_line = len(season_stats.loc[(season_stats["Opponent - Starting Pitching Hand"] == opponent_pitcher_hand) & (season_stats[stat] > prop)])
                            player_vs_pitcher_hand_less_than_line = len(season_stats.loc[(season_stats["Opponent - Starting Pitching Hand"] == opponent_pitcher_hand) & (season_stats[stat] < prop)])

                            trends.append(f"Vs. {opponent_pitcher_hand.capitalize()}-Handed Pitchers<br>Average: {str(player_vs_pitcher_hand)} {short_stat.lower()}<br>Over: {player_vs_pitcher_hand_more_than_line} games | Under: {player_vs_pitcher_hand_less_than_line} games<br><br>")

                        except:
                            #get stats vs "Right" pitcher
                            player_vs_pitcher_hand = season_stats.loc[season_stats["Opponent - Starting Pitching Hand"] == "Right"][stat].mean().round(2)
                            player_vs_pitcher_hand_more_than_line = len(season_stats.loc[(season_stats["Opponent - Starting Pitching Hand"] == "Right") & (season_stats[stat] > prop)])
                            player_vs_pitcher_hand_less_than_line = len(season_stats.loc[(season_stats["Opponent - Starting Pitching Hand"] == "Right") & (season_stats[stat] < prop)])

                            trends.append(f"Vs. Right-Handed Pitchers<br>Average: {str(player_vs_pitcher_hand)} {short_stat.lower()}<br>Over: {player_vs_pitcher_hand_more_than_line} games | Under: {player_vs_pitcher_hand_less_than_line} games<br><br>")

                            #get stats vs "Left" pitcher
                            player_vs_pitcher_hand = season_stats.loc[season_stats["Opponent - Starting Pitching Hand"] == "Left"][stat].mean().round(2)
                            player_vs_pitcher_hand_more_than_line = len(season_stats.loc[(season_stats["Opponent - Starting Pitching Hand"] == "Left") & (season_stats[stat] > prop)])
                            player_vs_pitcher_hand_less_than_line = len(season_stats.loc[(season_stats["Opponent - Starting Pitching Hand"] == "Left") & (season_stats[stat] < prop)])

                            trends.append(f"Vs. Left-Handed Pitchers<br>Average: {str(player_vs_pitcher_hand)} {short_stat.lower()}<br>Over: {player_vs_pitcher_hand_more_than_line} games | Under: {player_vs_pitcher_hand_less_than_line} games<br><br>")

                        try:
                            #get stats vs pitcher
                            print("GETTING STATS VS PITCHER")
                            print(f'GAMES: {str(len(player_stats.loc[player_stats["Opponent - Starting Pitcher"] == opponent_pitcher]))}')
                            player_vs_opponent_pitcher = player_stats.loc[player_stats["Opponent - Starting Pitcher"] == opponent_pitcher][stat].mean().round(2)
                            player_vs_opponent_pitcher_more_than_line = len(player_stats.loc[(player_stats["Opponent - Starting Pitcher"] == opponent_pitcher) & (player_stats[stat] > prop)])
                            player_vs_opponent_pitcher_less_than_line = len(player_stats.loc[(player_stats["Opponent - Starting Pitcher"] == opponent_pitcher) & (player_stats[stat] < prop)])
                            print("PLAYER VS OPPONENT PITCHER")
                            print(player_vs_opponent_pitcher)
                            print(player_vs_opponent_pitcher_more_than_line)
                            print(player_vs_opponent_pitcher_less_than_line)
                            trends.append(f"Vs. {opponent_pitcher}<br>Average: {str(player_vs_opponent_pitcher)} {short_stat.lower()}<br>Over: {player_vs_opponent_pitcher_more_than_line} games | Under: {player_vs_opponent_pitcher_less_than_line} games<br><br>")
                        except Exception as e:
                            print(e)
                            pass

                    else:
                        #get stats vs "Right" pitcher
                        player_vs_pitcher_hand = season_stats.loc[season_stats["Opponent - Starting Pitching Hand"] == "Right"][stat].mean().round(2)
                        player_vs_pitcher_hand_more_than_line = len(season_stats.loc[(season_stats["Opponent - Starting Pitching Hand"] == "Right") & (season_stats[stat] > prop)])
                        player_vs_pitcher_hand_less_than_line = len(season_stats.loc[(season_stats["Opponent - Starting Pitching Hand"] == "Right") & (season_stats[stat] < prop)])

                        trends.append(f"Vs. Right-Handed Pitchers<br>Average: {str(player_vs_pitcher_hand)} {short_stat.lower()}<br>Over: {player_vs_pitcher_hand_more_than_line} games | Under: {player_vs_pitcher_hand_less_than_line} games<br><br>")

                        #get stats vs "Left" pitcher
                        player_vs_pitcher_hand = season_stats.loc[season_stats["Opponent - Starting Pitching Hand"] == "Left"][stat].mean().round(2)
                        player_vs_pitcher_hand_more_than_line = len(season_stats.loc[(season_stats["Opponent - Starting Pitching Hand"] == "Left") & (season_stats[stat] > prop)])
                        player_vs_pitcher_hand_less_than_line = len(season_stats.loc[(season_stats["Opponent - Starting Pitching Hand"] == "Left") & (season_stats[stat] < prop)])

                        trends.append(f"Vs. Left-Handed Pitchers<br>Average: {str(player_vs_pitcher_hand)} {short_stat.lower()}<br>Over: {player_vs_pitcher_hand_more_than_line} games | Under: {player_vs_pitcher_hand_less_than_line} games<br><br>")
                except:
                    pass

            print(trends)

            trends_counter = 1

            # Get Split
            if split == "Home":
                player_stats = player_stats.loc[player_stats["Home-Visitor"] == "Home"]
            elif split == "Visitor":
                player_stats = player_stats.loc[player_stats["Home-Visitor"] == "Visitor"]
            elif split == "Win":
                player_stats = player_stats.loc[player_stats["Winner"] == "Win"]
            elif split == "Loss":
                player_stats = player_stats.loc[player_stats["Winner"] == "Loss"]
            elif split == "vs Opponent":
                player_stats = player_stats.loc[player_stats["Opponent"] == opponent]
            elif split == "Win by 10+":
                player_stats = player_stats.loc[player_stats["Final Score Spread"] >= 10]
            elif split == "Loss by 10+":
                player_stats = player_stats.loc[player_stats["Final Score Spread"] <= -10]
            elif split == "vs RH Pitcher":
                player_stats = player_stats.loc[player_stats["Opponent - Starting Pitching Hand"] == "Right"]
            elif split == "vs LH Pitcher":
                player_stats = player_stats.loc[player_stats["Opponent - Starting Pitching Hand"] == "Left"]
            elif split == "vs Probable Pitcher":
                player_stats = player_stats.loc[player_stats["Opponent - Starting Pitcher"] == opponent_pitcher]

            player_last_games = player_stats.tail(games_back)
            try:
                games_back = len(player_last_games)
            except:
                pass

            try:
                player_mean = player_last_games.mean()[stat]
                player_median = player_last_games.median()[stat]
                standard_deviation = player_last_games.std()[stat]
            except:
                try:
                    player_mean = player_last_games[stat].value
                    player_median = player_last_games[stat].value
                    standard_deviation = 0
                except:
                    player_mean = 0
                    player_median = 0
                    standard_deviation = 0

            if has_prop:
                prop_counter = 0
                normalized_prop_counter = 0
                counter = 0

            if sport_name == "NBA":
                team_stats = all_player_stats[all_player_stats["Season Year"] >= nba_season_year-1]
            elif sport_name == "NFL":
                team_stats = all_player_stats[all_player_stats["Season Year"] >= nfl_season_year-1]
            elif sport_name == "NHL":
                team_stats = all_player_stats[all_player_stats["Season Year"] >= nhl_season_year-1]
            elif sport_name == "MLB":
                team_stats = all_player_stats[all_player_stats["Season"] >= mlb_season_year-1]

            team_stats = team_stats.loc[team_stats[position_format] == position].copy()
            if sport_name == "NBA" or sport_name == "NFL":
                team_stats = team_stats.loc[team_stats["Player - Starter"] == starter].copy()
            team_stats.replace(np.nan, 0, inplace=True)
            team_stats_mean = team_stats.mean()[stat]

            normalized_stat_sum = 0

            date_list = []
            opponent_list = []
            stat_list = []
            normalized_stat_list = []
            hit_list = []

            for i, row in player_last_games.iterrows():
                opponent_stats = team_stats.loc[team_stats["Opponent"] == row["Opponent"]].copy()
                opponent_stats.replace(np.nan, 0, inplace=True)
                opponent_stats_mean = opponent_stats.mean()[stat]
                opponent_offset = team_stats_mean / opponent_stats_mean
                if row[stat] == 0:
                    normalized_stat = 0
                else:
                    opponent_stats_std = opponent_stats.std()[stat]
                    if opponent_stats_std > 0:
                        opponent_difference = opponent_stats_mean - team_stats_mean
                        std_diff = opponent_difference / opponent_stats_std
                        std_offset = standard_deviation * std_diff
                        if std_offset > 1:
                            std_offset = 1
                        if std_offset < -1:
                            std_offset = -1
                        normalized_stat = row[stat] + std_offset
                        if normalized_stat < 0:
                            normalized_stat = 0
                    else:
                        if np.isnan(opponent_offset) or opponent_offset == 0:
                            opponent_offset = 1
                        normalized_stat = row[stat] * opponent_offset

                normalized_stat_sum = normalized_stat_sum + normalized_stat

                #date_list.append(row["Date"].strftime("%-m/%-d/%y"))
                date_list.append(row["Date"].strftime("%-m/%-d"))
                opponent_list.append(row["Opponent"])
                stat_list.append(row[stat])
                if has_prop:
                    if row[stat] > prop:
                        hit_list.append("🟩")
                    elif row[stat] < prop:
                        hit_list.append("🟥")
                    else:
                        hit_list.append("⬜")
                try:
                    normalized_stat_list.append(normalized_stat.round(2))
                except:
                    normalized_stat_list.append(round(normalized_stat, 2))
                if has_prop:
                    if row[stat] >= prop:
                        prop_counter = prop_counter + 1

                    if normalized_stat > prop:
                        normalized_prop_counter = normalized_prop_counter + 1

            counter = len(player_last_games.index)

            deduped_date_list = []
            for i, v in enumerate(date_list):
                totalcount = date_list.count(v)
                count = date_list[:i].count(v)
                deduped_date_list.append(v + "(" + str(count + 1) + ")" if totalcount > 1 else v)

            print(deduped_date_list)

            if has_prop:
                last_games = pd.DataFrame({"Hit": hit_list, "Date": deduped_date_list, "Opponent": opponent_list, "{}".format(stat[9:]): stat_list, "Defense Adjusted": normalized_stat_list})
            else:
                last_games = pd.DataFrame({"Date": deduped_date_list, "Opponent": opponent_list, "{}".format(stat[9:]): stat_list, "Defense Adjusted": normalized_stat_list})
            stats_table = str(last_games.to_html(index=False))
            stats_table = stats_table.replace("🟩", "<center><div class='box green'></div></center>")
            stats_table = stats_table.replace("🟥", "<center><div class='box blue'></div></center>")
            stats_table = stats_table.replace("⬜", "<center><div class='box black'></div></center>")
            stats_table = stats_table.replace("Defense Adjusted", "Defense<br>Adjusted")
            stats_table = stats_table.replace("Offense - ","")
            stats_table = stats_table.replace("Defense - ", "")
            stats_table = stats_table.replace(" - ", " ")
            stats_table = stats_table.replace(" DraftKings", "")
            stats_table = stats_table.replace(" FanDuel", "")
            stats_table = stats_table.replace(" ESPN", "")
            stats_table = stats_table.replace(" Yahoo", "")
            stats_table = stats_table.replace("Points per 100 Dollars", "Points Per $100")
            if has_prop:
                table_string = "<center>" + stats_table + "</center>"
            else:
                table_string = "<center style='margin-top:15px'>" + stats_table + "</center>"
            normalized_average = normalized_stat_sum / counter

            footer_string = "<center style='margin-top:15px'>"
            #print("Average: {} {}".format(player_mean.round(2), stat[9:]))
            #footer_string = footer_string + "<strong>Mean/Median:</strong> {}/{}".format(player_mean.round(2), player_median.round(2))

            if has_prop:
                hitrate = 100 * (prop_counter/counter)
                #print("Over {} {}: {} times".format(prop, stat[9:], prop_counter))
                #footer_string = footer_string + "&emsp;|&emsp;"
                #footer_string = footer_string + "<strong>Hit Rate:</strong> {}%".format(round(hitrate,2))
                footer_string = footer_string + "</center>"
                #print("Under {} {}: {} times".format(prop, stat[9:], counter - prop_counter))

            #print("Normalized average: {} {}".format(normalized_average.round(2), stat[9:]))

            opponent_stats = team_stats.loc[team_stats["Opponent"] == opponent].copy()
            opponent_stats_mean = opponent_stats.mean()[stat]

            if normalized_average == 0:
                projection = 0
            else:
                opponent_stats_std = opponent_stats.std()[stat]
                #print("Opponent Stats - Standard Deviation: {}".format(opponent_stats_std))
                if opponent_stats_std > 0:
                    opponent_difference = opponent_stats_mean - team_stats_mean
                    #print("Opponent Stats - Difference: {}".format(opponent_difference))
                    std_diff = opponent_difference/opponent_stats_std
                    #print("Opponent Stats - STD Difference: {}".format(std_diff))
                    std_offset = standard_deviation * std_diff
                    if std_offset > 1:
                        std_offset = 1
                    if std_offset < -1:
                        std_offset = -1
                    #print("Opponent Stats - STD Offset: {}".format(std_offset))
                    projection = normalized_average + std_offset
                    if projection < 0:
                        projection = 0
                else:
                    opponent_offset = opponent_stats_mean / team_stats_mean
                    #print("Opponent Offset: {}".format(opponent_offset))
                    if np.isnan(opponent_offset) or opponent_offset == 0:
                        opponent_offset = 1
                    projection = normalized_average * opponent_offset
                    if player_median > 0:
                        if projection > player_median * 1.2:
                            projection = player_median * 1.2
                        if projection < player_median * 0.8:
                            projection = player_median * 0.8

            if not has_prop:
                #zscore -.68 & .68
                if not np.isnan(standard_deviation):
                    seventy_fifth = projection - (-.68 * standard_deviation)
                    twenty_fifth = projection - (.68 * standard_deviation)

                    footer_string = footer_string + "<center style='margin-top:10px'><strong>Projected Range (25th-75th Percentile):</strong> {} to {}</center>".format(twenty_fifth.round(2), seventy_fifth.round(2))
                    #footer_string = footer_string + "<center id='site-footer' style='display:none;margin-top:24px;font-size:14px;color:rgba(0,0,0,.7)'>https://www.pine-sports.com</center>"

                    try:
                        header_string = "<center style='margin-top:10px; margin-bottom:10px'><strong>Projection:</strong> {}</center>".format(projection.round(2)) + header_string
                        projection_round = projection.round(2)
                    except:
                        header_string = "<center style='margin-top:10px'><strong>Projection:</strong> {}</center>".format(round(projection, 2)) + header_string
                        projection_round = round(projection, 2)
                    # ("Next Opponent: {}.".format(opponent))
                    header_string = "<center style='margin-top:10px'><strong>Next Opponent:</strong> {}</center>".format(opponent_string) + header_string
                    next_opponent = "<center style='margin-top:10px'><strong>Next Opponent:</strong> {}</center>".format(opponent_string)
            if has_prop:
                if not np.isnan(standard_deviation):
                    # NEW CODE
                    if projection >= 10:
                        zscore = (projection - prop) / standard_deviation
                        over_percent = NormalDist().cdf(zscore)
                        under_percent = 1 - over_percent
                    else:
                        under_percent = scipy.stats.poisson.cdf(k=prop, mu=projection)
                        over_percent = 1 - under_percent

                    def get_moneyline(implied_odds):
                        implied_odds = implied_odds * 100

                        if (implied_odds > 50):
                            ml = -(implied_odds) / (100 - implied_odds) * 100
                        elif (implied_odds < 50):
                            ml = ((100 - implied_odds) / (implied_odds) * 100)
                        else:
                            ml = 100

                        return ml

                    if (over_percent != 0) and (over_percent != 1):
                        over_moneyline = get_moneyline(over_percent)
                    if (under_percent != 0) and (under_percent != 1):
                        under_moneyline = get_moneyline(under_percent)

                    #print("Projected Over Win Rate: {}% ".format(round((over_percent * 100), 2)))
                    footer_string = footer_string + "<center style='margin-top:10px'><strong>Projected Win Rate:</strong>&nbsp;{}%&nbsp;|&nbsp;{}%".format(round((over_percent * 100), 2), round((under_percent * 100), 2))
                    #print("Projected Over Moneyline: {}".format(int(over_moneyline)))
                    if (over_percent != 0) and (over_percent != 1):
                        footer_string = footer_string + "<br>"
                        footer_string = footer_string + "<strong>Projected Moneyline:</strong>&nbsp;{}&nbsp;|&nbsp;{}</center>".format(int(over_moneyline), int(under_moneyline))
                    #footer_string = footer_string + "<center id='site-footer' style='display:none;margin-top:24px;font-size:14px;color:#274970'>https://www.pine-sports.com</center>"

                    if over_percent > under_percent:
                        if over_percent <= .55:
                            header_string = "<center style='margin-top:10px;margin-bottom:15px'><span style='font-weight:500'>The Robot thinks this is a coin-flip</span></center>" + header_string
                            robot_likes = "<center style='margin-top:10px;margin-bottom:15px'><span style='font-weight:500'>The Robot thinks this is a coin-flip</span></center>"
                        else:
                            likes = "kinda likes"
                            if over_percent > .65:
                                likes = "likes"
                            if over_percent > .8:
                                likes = "really likes"
                            header_string = "<center style='margin-top:10px;margin-bottom:15px'><span style='font-weight:500'>The Robot {} the </span> <span class='likes-over' style='font-weight:600!important'>Over</span></center>".format(likes) + header_string
                            robot_likes = "<center style='margin-top:10px;margin-bottom:15px'><span style='font-weight:500'>The Robot {} the </span> <span class='likes-over' style='font-weight:600!important'>Over</span></center>".format(likes)
                    else:
                        if under_percent <= .55:
                            header_string = "<center style='margin-top:10px;margin-bottom:15px'><span style='font-weight:500'>The Robot thinks this is a coin-flip</span></center>" + header_string
                            robot_likes = "<center style='margin-top:10px;margin-bottom:15px'><span style='font-weight:500'>The Robot thinks this is a coin-flip</span></center>"
                        else:
                            likes = "kinda likes"
                            if under_percent > .65:
                                likes = "likes"
                            if under_percent > .8:
                                likes = "really likes"
                            header_string = "<center style='margin-top:10px;margin-bottom:15px'><span style='font-weight:500'>The Robot {} the </span> <span class='likes-under' style='font-weight:700!important'>Under</span></center>".format(likes) + header_string
                            robot_likes = "<center style='margin-top:10px;margin-bottom:15px'><span style='font-weight:500'>The Robot {} the </span> <span class='likes-under' style='font-weight:700!important'>Under</span></center>".format(likes)
                    try:
                        header_string = "<strong>Projection:</strong> {}</center>".format(projection.round(2)) + header_string
                        projection_round = projection.round(2)
                    except:
                        header_string = "<strong>Projection:</strong> {}</center>".format(round(projection, 2)) + header_string
                        projection_round = round(projection, 2)
                    header_string = "<br>" + header_string

                    header_string = "<center style='margin-top:10px'><strong>Line:</strong> {}".format(prop) + header_string
                    header_string = "<center style='margin-top:10px'><strong>Next Opponent:</strong> {}</center>".format(opponent)+header_string
                    next_opponent = "<center style='margin-top:10px'><strong>Next Opponent:</strong> {}</center>".format(opponent_string)
                else:
                    robot_likes = "The Robot needs more data for this pick."
                    try:
                        header_string = "<strong>Projection:</strong> {}</center>".format(projection.round(2)) + header_string
                        projection_round = projection.round(2)
                    except:
                        header_string = "<strong>Projection:</strong> {}</center>".format(round(projection, 2)) + header_string
                        projection_round = round(projection, 2)
                    header_string = "<center style='margin-top:10px'><strong>Line:</strong> {}".format(prop) + header_string
                    header_string = "<center style='margin-top:10px'><strong>Next Opponent:</strong> {}</center>".format(opponent)+header_string
                    next_opponent = "<center style='margin-top:10px'><strong>Next Opponent:</strong> {}</center>".format(opponent_string)
        last_games = last_games.rename(columns={"{}".format(stat[9:]): "data"})
        last_games["data"] = last_games["data"].astype(float)
        if math.isnan(projection_round):
            projection_round = "n/a"
        #gets double headers
        last_games['Match'] = last_games.Date.eq(last_games.Date.shift())

        def check_dupes(data):
            date = data[0]
            match = data[1]
            if match:
                date = "DH".format(date)
            return date

        last_games["Date"] = last_games[["Date", "Match"]].apply(check_dupes, axis=1)
        last_games.drop("Match", axis=1, inplace=True)

        for row in team_names.iterrows():
            last_games.replace(row[1][1], row[1][0], inplace=True)


        # get lines
        s3_line_csv_file_path = 'linefiles/fd_all_player_props.csv'

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=s3_line_csv_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        line_file = pd.read_csv(StringIO(csv_string))

        #get row where player_name equals player name, stat equals sheet_stat and line equals prop
        line_file = line_file[(line_file["Player Name"] == player_name) & (line_file["Prop"] == sheet_stat) & (line_file["Line"] == prop)]
        print("GETTING LINE FILE")
        print(player_name)
        print(sheet_stat)
        print(prop)
        print(line_file)

        got_fd_over = False
        got_fd_under = False
        external_market_id = 0
        over_odds = 0
        over_selection_id = 0
        under_odds = 0
        under_selection_id = 0

        try:
            #get external_market_id
            external_market_id = line_file["External Market ID"].values[0]

            #get Over Odds
            over_odds = line_file["Over Odds"].values[0]

            #get over_selection_id
            over_selection_id = line_file["Over Selection ID"].values[0]
            got_fd_over = True
            try:
                #get Under Odds
                under_odds = line_file["Under Odds"].values[0]

                #get under_selection_id
                under_selection_id = line_file["Under Selection ID"].values[0]
                got_fd_under = True
            except:
                pass
        except:
            pass

        del all_player_stats
        del todays_games
        del team_names

        player_project_games_counter = 1
        player_project_games = []
        while player_project_games_counter <= 25:
            player_project_games.append(player_project_games_counter)
            player_project_games_counter = player_project_games_counter + 1

        player_project_split = ['All Games', 'Home', 'Visitor', 'vs Opponent', 'Win', 'Loss']
        if sport_name == "MLB":
            player_project_split.append("vs RH Pitcher")
            player_project_split.append("vs LH Pitcher")
            player_project_split.append("vs Probable Pitcher")
        elif sport_name == "NBA":
            player_project_split.append("Win by 10+")
            player_project_split.append("Loss by 10+")

        context = {}


        context["sport_name"] = sport_name
        context["player_project_games"] = player_project_games
        context["player_project_split"] = player_project_split
        context["split"] = split
        context["games_back"] = games_back
        context["player_name"] = player_name
        context["stat"] = short_stat
        context["full_stat"] = stat
        context["prop"] = prop
        context["header_string"] = header_string
        context["table_string"] = table_string
        context["footer_string"] = footer_string
        context["stats_table"] = last_games
        context["has_line"] = has_prop
        context["projection"] = projection_round
        context["mean"] = player_mean.round(2)
        context["median"] = player_median.round(2)
        context["next_opponent"] = next_opponent
        context["games_without_players"] = games_without_players
        context["games_without_player"] = games_without_player
        context["trends"] = trends
        context["got_fd_over"] = got_fd_over
        context["got_fd_under"] = got_fd_under
        context["over_odds"] = over_odds
        context["under_odds"] = under_odds
        context["over_selection_id"] = over_selection_id
        context["under_selection_id"] = under_selection_id
        context["external_market_id"] = external_market_id


        if has_prop:
            if projection > prop:
                projection_class = "green-text"
            elif projection < prop:
                projection_class = "blue-text"
            else:
                projection_class = "black-text"
            if player_mean.round(2) > prop:
                mean_class = "green-text"
            elif player_mean.round(2) < prop:
                mean_class = "blue-text"
            else:
                mean_class = "black-text"
            if player_median.round(2) > prop:
                median_class = "green-text"
            elif player_median.round(2) < prop:
                median_class = "blue-text"
            else:
                median_class = "black-text"
            if round(hitrate,2) > 50:
                hit_rate_class = "green-text"
            elif round(hitrate,2) < 50:
                hit_rate_class = "blue-text"
            else:
                hit_rate_class = "black-text"

            context["line"] = prop
            context["hit_rate"] = "{}%".format(round(hitrate,2))
            context["robot_likes"] = robot_likes
            context["projection_class"] = projection_class
            context["mean_class"] = mean_class
            context["median_class"] = median_class
            context["hit_rate_class"] = hit_rate_class
            context["Error"] = False

    except Exception as e:
        print(e)
        context = {}
        context["Error"] = True

    return render(request, 'projection.html', context)


def project_bot(request, sport_name, player_name, stat, prop, games_back, split="All Games", games_without_player="All Available"):

    try:

        if prop == "none":
            has_prop = False
        else:
            try:
                prop = float(prop)
                has_prop = True
            except:
                has_prop = False

        games_back = int(games_back)

        session = boto3.session.Session(aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        s3 = session.resource("s3")
        bucket = s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME)

        obj = Sports_name.objects.get(name__iexact=sport_name)


        active_datasheet_zip = obj.active_sheet_name
        s3_file_path = 'datafiles/' + active_datasheet_zip

        obj = bucket.Object(s3_file_path)

        with io.BytesIO(obj.get()["Body"].read()) as tf:
            tf.seek(0)
            with zipfile.ZipFile(tf, mode='r') as zipf:
                for subfile in zipf.namelist():
                    name_split = subfile.split('.')[0]
                    proper_name = name_split.replace('_', ' ')
                    # PLK files are optimized for data analysis -- quick -- but not good for predictions
                    if ("Prop" in proper_name) and ("pkl" in subfile):
                        data = zipf.read(subfile)
                        all_player_stats = pd.read_pickle(BytesIO(data))

        print("Got prop files")


        header_string = ""
        table_string = ""
        footer_string = ""

        player_stats = all_player_stats.loc[all_player_stats["Player Name"] == player_name]
        player_stats.replace(np.nan, 0, inplace=True)

        print("Got player stats")

        obj = Sports_name.objects.get(name__iexact=sport_name)
        active_line_csv = obj.active_line_csv_dataset
        s3_line_csv_file_path = 'linefiles/' + active_line_csv

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=s3_line_csv_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        todays_games = pd.read_csv(StringIO(csv_string))

        print("Got todays games")

        # Updates game names
        if sport_name == "MLB":
            tn = {
                'Full Name': ['NYM', 'KC', 'STL', 'PIT', 'TOR', 'TB', 'ATL', 'WSH', 'MIL', 'SFG', 'TEX', 'SEA', 'PHI', 'CIN',
                              'SD', 'LAD', 'ARI', 'COL', 'OAK', 'CWS', 'CHC', 'LAA', 'MIN', 'BAL', 'MIA', 'DET', 'CLE',
                              'BOS',
                              'HOU', 'NYY'],
                'New Name': ['NY Mets', 'Kansas City', 'St. Louis', 'Pittsburgh', 'Toronto', 'Tampa Bay', 'Atlanta',
                             'Washington', 'Milwaukee', 'San Francisco', 'Texas', 'Seattle', 'Philadelphia', 'Cincinnati',
                             'San Diego', 'LA Dodgers', 'Arizona', 'Colorado', 'Oakland', 'Chicago White Sox',
                             'Chicago Cubs',
                             'LA Angels', 'Minnesota', 'Baltimore', 'Miami', 'Detroit', 'Cleveland', 'Boston', 'Houston',
                             'NY Yankees']}

        elif sport_name == "NFL":
            tn = {'Full Name': ['ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN', 'DET', 'GB', 'HOU',
                                'IND',
                                'JAC', 'KC', 'LV', 'LAC', 'LAR', 'MIA', 'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'LV',
                                'PHI',
                                'PIT', 'LAC', 'SF', 'SEA', 'TB', 'TEN', 'WAS', 'WAS'],
                  'New Name': ['Arizona', 'Atlanta', 'Baltimore', 'Buffalo', 'Carolina', 'Chicago', 'Cincinnati',
                               'Cleveland',
                               'Dallas', 'Denver', 'Detroit', 'Green Bay', 'Houston', 'Indianapolis', 'Jacksonville',
                               'Kansas City', 'Las Vegas', 'LA Chargers', 'LA Rams', 'Miami', 'Minnesota', 'New England',
                               'New Orleans', 'NY Giants', 'NY Jets', 'Oakland', 'Philadelphia', 'Pittsburgh', 'San Diego',
                               'San Francisco', 'Seattle', 'Tampa Bay', 'Tennessee', 'Washington', 'Washington']}
        elif sport_name == "NBA":
            tn = {
                'Full Name': ['ATL', 'BOS', 'BKN', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW', 'HOU', 'IND', 'LAC',
                              'LAL',
                              'MEM', 'MIA', 'MIL', 'MIN', 'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHX', 'POR', 'SAC', 'SAS',
                              'TOR',
                              'UTA', 'WAS'],
                'New Name': ['Atlanta', 'Boston', 'Brooklyn', 'Charlotte', 'Chicago', 'Cleveland', 'Dallas', 'Denver',
                             'Detroit', 'Golden State', 'Houston', 'Indiana', 'LA Clippers', 'LA Lakers', 'Memphis',
                             'Miami',
                             'Milwaukee', 'Minnesota', 'New Orleans', 'New York', 'Oklahoma City', 'Orlando',
                             'Philadelphia',
                             'Phoenix', 'Portland', 'Sacramento', 'San Antonio', 'Toronto', 'Utah', 'Washington']}
        elif sport_name == "NHL":
            tn = {
                'Full Name': ['ANA', 'ARI', 'BOS', 'BUF', 'CGY', 'CAR', 'CHI', 'COL', 'CBJ', 'DAL', 'DET', 'EDM', 'FLA',
                              'LA',
                              'MIN', 'MTL', 'NSH', 'NJ', 'NYI', 'NYR', 'OTT', 'PHI', 'PIT', 'SJ', 'SEA', 'STL', 'TB', 'TOR',
                              'VAN', 'VGK', 'WSH', 'WPG', 'UTA'],
                'New Name': ['Anaheim', 'Arizona', 'Boston', 'Buffalo', 'Calgary', 'Carolina', 'Chicago', 'Colorado',
                             'Columbus', 'Dallas', 'Detroit', 'Edmonton', 'Florida', 'Los Angeles', 'Minnesota', 'Montreal',
                             'Nashville', 'New Jersey', 'NY Islanders', 'NY Rangers', 'Ottawa', 'Philadelphia',
                             'Pittsburgh',
                             'San Jose', 'Seattle', 'St. Louis', 'Tampa Bay', 'Toronto', 'Vancouver', 'Vegas', 'Washington',
                             'Winnipeg', 'Utah']}

        team_names = pd.DataFrame(data=tn)

        for row in team_names.iterrows():
            todays_games.replace(row[1][0], row[1][1], inplace=True)

        team = player_stats["Team"].iloc[-1]

        print("TEAM is {}".format(team))
        opponent_pitcher = ""
        try:
            opponent = todays_games.loc[todays_games['Home'] == team, 'Visitor'].iloc[0]
            if sport_name == "MLB":
                print("IN IF1")
                opponent_pitcher = todays_games.loc[todays_games['Home'] == team, 'Visitor - Starting Pitcher'].iloc[0]
            opponent_string = opponent
            home_visitor = "Home"
            print(home_visitor)
        except Exception as e:
            print(e)
            try:
                opponent = todays_games.loc[todays_games['Visitor'] == team, 'Home'].iloc[0]
                opponent_string = "@{}".format(opponent)
                if sport_name == "MLB":
                    print("IN IF2")
                    opponent_pitcher = todays_games.loc[todays_games['Visitor'] == team, 'Home - Starting Pitcher'].iloc[0]
                home_visitor = "Visitor"
            except Exception as e:
                print(e)
                opponent = "Nobody"
                home_visitor = "None"


        #Fix Ohtani pitching glitch
        if 'Player - Pitching' in stat:
            print("IN PITCHING")
            player_stats = player_stats.loc[player_stats["Player - Pitching - Innings Pitched"] > 0]
            player_stats.drop_duplicates(subset=["Game ID"], keep="first", inplace=True)

        elif "Ohtani" in player_name:
            print("IN OHTANI")
            player_stats = player_stats[player_stats["Player - Batting - At Bats"] > 0]
            player_stats.drop_duplicates(subset=["Game ID"], keep="first", inplace=True)

        # Get Split
        if split == "Home":
            player_stats = player_stats.loc[player_stats["Home-Visitor"] == "Home"]
        elif split == "Visitor":
            player_stats = player_stats.loc[player_stats["Home-Visitor"] == "Visitor"]
        elif split == "Win":
            player_stats = player_stats.loc[player_stats["Winner"] == "Win"]
        elif split == "Loss":
            player_stats = player_stats.loc[player_stats["Winner"] == "Loss"]
        elif split == "vs Opponent":
            player_stats = player_stats.loc[player_stats["Opponent"] == opponent]
        elif split == "Win by 10+":
            player_stats = player_stats.loc[player_stats["Final Score Spread"] >= 10]
        elif split == "Loss by 10+":
            player_stats = player_stats.loc[player_stats["Final Score Spread"] <= -10]
        elif split == "vs RH Pitcher":
            player_stats = player_stats.loc[player_stats["Opponent - Starting Pitching Hand"] == "Right"]
        elif split == "vs LH Pitcher":
            player_stats = player_stats.loc[player_stats["Opponent - Starting Pitching Hand"] == "Left"]
        elif split == "vs Probable Pitcher":
            player_stats = player_stats.loc[player_stats["Opponent - Starting Pitcher"] == opponent_pitcher]

        if games_without_player != "All Available":
            games_without_games = all_player_stats.loc[all_player_stats["Player Name"] == games_without_player]
            player_stats = player_stats.loc[~player_stats["Game ID"].isin(games_without_games["Game ID"].values)]

        player_last_games = player_stats.tail(games_back)

        print(f"Players last games: {player_last_games}")
        try:
            player_mean = player_last_games.mean()[stat]
            player_median = player_last_games.median()[stat]
        except:
            try:
                player_mean = player_last_games[stat].value
                player_median = player_last_games[stat].value
            except:
                player_mean = 0
                player_median = 0

        print("Got player mean & median")
        print(player_mean)
        print(player_median)

        date_list = []
        opponent_list = []
        stat_list = []
        prop_counter = 0

        for i, row in player_last_games.iterrows():
            date_list.append(row["Date"].strftime("%-m/%-d"))
            opponent_list.append(row["Opponent"])
            stat_list.append(row[stat])

            if has_prop:
                if row[stat] >= prop:
                    prop_counter = prop_counter + 1

                counter = len(player_last_games.index)
                hitrate = 100 * (prop_counter / counter)

        deduped_date_list = []
        for i, v in enumerate(date_list):
            totalcount = date_list.count(v)
            count = date_list[:i].count(v)
            deduped_date_list.append(v + "(" + str(count + 1) + ")" if totalcount > 1 else v)

        print(deduped_date_list)

        last_games = pd.DataFrame({"Date": deduped_date_list, "Opponent": opponent_list, "data": stat_list, "int_data": [int(stat) for stat in stat_list]})

        for row in team_names.iterrows():
            last_games.replace(row[1][1], row[1][0], inplace=True)

        player_project_games_counter = 1
        player_project_games = []
        while player_project_games_counter <= 25:
            player_project_games.append(player_project_games_counter)
            player_project_games_counter = player_project_games_counter + 1

        player_project_split = ['All Games', 'Home', 'Visitor', 'vs Opponent', 'Win', 'Loss']
        if sport_name == "MLB":
            player_project_split.append("vs RH Pitcher")
            player_project_split.append("vs LH Pitcher")
            player_project_split.append("vs Probable Pitcher")
        elif sport_name == "NBA":
            player_project_split.append("Win by 10+")
            player_project_split.append("Loss by 10+")

        context = {}

        short_stat = stat[9:]

        if short_stat == "PR":
            short_stat = "Points & Rebounds"
        elif short_stat == "SB":
            short_stat = "Steals & Blocks"
        elif short_stat ==  "PAR":
            short_stat = "Points, Assists & Rebounds"
        elif short_stat == "RA":
            short_stat = "Rebounds & Assists"
        elif short_stat == "PA":
            short_stat = "Points & Assists"

        context["sport_name"] = sport_name
        context["player_project_games"] = player_project_games
        context["player_project_split"] = player_project_split
        context["split"] = split
        context["games_back"] = games_back
        context["player_name"] = player_name
        context["stat"] = short_stat
        context["full_stat"] = stat
        context["prop"] = prop
        context["header_string"] = header_string
        context["table_string"] = table_string
        context["footer_string"] = footer_string
        context["has_line"] = has_prop
        context["mean"] = player_mean.round(2)
        context["median"] = player_median.round(2)
        context["games_without_player"] = games_without_player
        context["stats_table"] = last_games
        if has_prop:

            if has_prop:
                if player_mean.round(2) > prop:
                    mean_class = "green-text"
                elif player_mean.round(2) < prop:
                    mean_class = "blue-text"
                else:
                    mean_class = "black-text"
                if player_median.round(2) > prop:
                    median_class = "green-text"
                elif player_median.round(2) < prop:
                    median_class = "blue-text"
                else:
                    median_class = "black-text"
                if round(hitrate, 2) > 50:
                    hit_rate_class = "green-text"
                elif round(hitrate, 2) < 50:
                    hit_rate_class = "blue-text"
                else:
                    hit_rate_class = "black-text"
            context["line"] = prop
            context["hit_rate"] = "{}%".format(round(hitrate,2))
            context["Error"] = False
            context["mean_class"] = mean_class
            context["median_class"] = median_class
            context["hit_rate_class"] = hit_rate_class
    except Exception as e:
        print(e)
        context = {}
        context["Error"] = True

    return render(request, 'projection_bot.html', context)


@login_required
def leaderboard(request, sport_name, pt):

    if "MLB" in sport_name:
        leaderboard = PredictMLBUserFormData.objects.filter(predict_type=pt).order_by('-created')
    elif "NFL" in sport_name:
        leaderboard = PredictNFLUserFormData.objects.filter(predict_type=pt).order_by('-created')
    elif "NBA" in sport_name:
        leaderboard = PredictNBAUserFormData.objects.filter(predict_type=pt).order_by('-created')
    elif "NHL" in sport_name:
        leaderboard = PredictNHLUserFormData.objects.filter(predict_type=pt).order_by('-created')

    user_names = []
    model_names = []
    model_scores = []

    for item in leaderboard:
        if str(item.user) != "pine-admin":
            user_names.append(item.user)
            model_names.append(item.model_name)
            model_scores.append(item.model_score_percentage())

    leaderboard_pd = pd.DataFrame(data={"Member": user_names, "Model Name": model_names, "Model Score": model_scores})
    leaderboard_pd.drop_duplicates(subset=['Member'], keep='first', inplace=True)
    leaderboard_pd.sort_values(by=['Model Score'], ascending=False, inplace=True)
    leaderboard_pd["Rank"] = leaderboard_pd.rank(method='first', ascending=False).astype(int)
    columns = ["Rank", "Member", "Model Name", "Model Score"]
    leaderboard_pd["Model Score"] = leaderboard_pd["Model Score"].astype(str) + '%'
    leaderboard_pd = leaderboard_pd[columns]
    leaderboard_pd = leaderboard_pd.head(10)
    context = {}
    context["leaderboard"] = leaderboard_pd.to_html(index=False)
    context["pt"] = pt
    context["sport_name"] = sport_name

    return render(request, 'leaderboard.html', context)

@login_required
def model_score(request, sport_name, model_type, confidence_score=0):

    user_id = str(request.user.id)
    user = request.user

    if model_type == "Winner":
        if sport_name == "MLB":
            model = PredictMLBUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner').order_by('-created')[0]
        elif sport_name == "NBA":
            model = PredictNBAUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner').order_by('-created')[0]
        elif sport_name == "NHL":
            model = PredictNHLUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner').order_by('-created')[0]
        elif sport_name == "NFL":
            model = PredictNFLUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner').order_by('-created')[0]

    elif model_type == "Winner Against The Spread":
        if sport_name == "MLB":
            model = PredictMLBUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner Against The Spread').order_by('-created')[0]
        elif sport_name == "NBA":
            model = PredictNBAUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner Against The Spread').order_by('-created')[0]
        elif sport_name == "NHL":
            model = PredictNHLUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner Against The Spread').order_by('-created')[0]
        elif sport_name == "NFL":
            model = PredictNFLUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner Against The Spread').order_by('-created')[0]

    elif model_type == "Over-Under Result":
        if sport_name == "MLB":
            model = PredictMLBUserFormData.objects.filter(user=request.user.id).filter(predict_type='Over-Under Result').order_by('-created')[0]
        elif sport_name == "NBA":
            model = PredictNBAUserFormData.objects.filter(user=request.user.id).filter(predict_type='Over-Under Result').order_by('-created')[0]
        elif sport_name == "NHL":
            model = PredictNHLUserFormData.objects.filter(user=request.user.id).filter(predict_type='Over-Under Result').order_by('-created')[0]
        elif sport_name == "NFL":
            model = PredictNFLUserFormData.objects.filter(user=request.user.id).filter(predict_type='Over-Under Result').order_by('-created')[0]


    # Gets the test predictions from S3.  Probably don't need to do this for everyone, just Predict+ members.
    s3_file_path = "predictions/{}_{}_{}.csv".format(urllib.parse.quote(str(user)),
                                                     urllib.parse.quote(str(model.model_name)),
                                                     urllib.parse.quote(str(model.created)))
    client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
    csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                Key=s3_file_path)
    body = csv_obj['Body']
    csv_string = body.read().decode('utf-8')
    score_predictions = pd.read_csv(StringIO(csv_string))
    total = len(score_predictions.index)

    if model_type == "Winner":
        column_one = "Prediction - Probability of Home being Winner"
        column_two = "Prediction - Probability of Visitor being Winner"
    elif model_type == "Winner Against The Spread":
        column_one = "Prediction - Probability of Home being Winner ATS"
        column_two = "Prediction - Probability of Visitor being Winner ATS"
    elif model_type == "Over-Under Result":
        column_one = "Prediction - Probability of Over"
        column_two = "Prediction - Probability of Under"

    def get_highest(data):
        if data[0] > data[1]:
            return data[0]
        else:
            return data[1]

    score_predictions["Highest Confidence"] = score_predictions[[column_one, column_two]].apply(get_highest, axis=1)

    confidence_max = score_predictions["Highest Confidence"].max() * 100
    confidence_min = score_predictions["Highest Confidence"].min() * 100

    has_confidence_score = False
    try:
        confidence_score = float(confidence_score)/100
        if confidence_score > 0: has_confidence_score = True
    except:
        confidence_score = 0

    if has_confidence_score:
        score_predictions = score_predictions.loc[(score_predictions[column_one] >= confidence_score) | (score_predictions[column_two] >= confidence_score)]
        confidence_count = len(score_predictions.index)
    else:
        confidence_count = 0

    correct = (score_predictions["Correct"] == "Yes").sum()
    incorrect = (score_predictions["Correct"] == "No").sum()

    correct_percent = (correct / (correct+incorrect)) * 100

    context = {}
    context["sport_name"] = sport_name
    context["model_type"] = model_type
    context["confidence_score"] = confidence_score * 100
    context["has_confidence_score"] = has_confidence_score
    context["total"] = total
    context["confidence_count"] = confidence_count
    context["correct"] = correct
    context["incorrect"] = incorrect
    context["correct_percent"] = correct_percent.round(2)
    context["confidence_max"] = confidence_max.round(2)
    context["confidence_min"] = confidence_min.round(2)
    return render(request, 'model_score.html', context)

@login_required
def predict(request,sport_name=None):
    context={}

    #Checks if the user has Predict+ access.
    is_user_group = False
    is_user_group = request.user.groups.filter(name__in=['data_access_user', 'admin_user', 'moderator_user']).exists()

    winner_link = ""
    winner_against_the_spread_link = ""
    total_score_link = ""

    #Makes sure there's a sports name
    if sport_name:
        obj_sport_name = True
        try:
            #Get's info related to the sport
            obj = Sports_name.objects.get(name__iexact=sport_name)
        except:
            obj_sport_name = False
        if obj_sport_name:
            #gets the active line data sheet (ie upcoming DraftKings game lines)
            active_datasheet_zip = obj.active_sheet_name

            sport_id = str(obj.id)
            user_id = str(request.user.id)
            user = request.user

            user_data_id = []

            #clears out dtale to prepare for new user data
            if user_id:
                for data_id in global_state.get_data():
                    user_sheet = user_id+"_"
                    if user_sheet in data_id:
                        user_data_id.append(data_id)
                    if user_data_id:
                        for data_id in user_data_id:
                            global_state.cleanup(data_id)

            #downloads new historic datasets
            if active_datasheet_zip:
                session = boto3.session.Session(aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
                s3 = session.resource("s3")
                bucket = s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME)
                s3_file_path = 'datafiles/' + active_datasheet_zip
                obj = bucket.Object(s3_file_path)

                if_data_sheet = True
                curr_data = dtale.global_state.get_data()

                datasheet_names_and_id = {}


                winner,winners_against_the_spread,total_score=None,None,None

                # Gets MLB predict models
                if sport_name == "MLB":
                    is_winner_data = PredictMLBUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner').order_by('-created')
                    if is_winner_data:
                        winner = is_winner_data[0]
                    is_winners_against_the_spread = PredictMLBUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner Against The Spread').order_by('-created')
                    if is_winners_against_the_spread:
                        winners_against_the_spread = is_winners_against_the_spread[0]
                    is_total_score = PredictMLBUserFormData.objects.filter(user=request.user.id).filter(predict_type='Over-Under Result').order_by('-created')
                    if is_total_score:
                        total_score = is_total_score[0]

                # Gets NFL predict models
                elif "NFL" in sport_name:
                    is_winner_data = PredictNFLUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner').order_by('-created')
                    if is_winner_data:
                        winner = is_winner_data[0]
                    is_winners_against_the_spread = PredictNFLUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner Against The Spread').order_by('-created')
                    if is_winners_against_the_spread:
                        winners_against_the_spread = is_winners_against_the_spread[0]
                    is_total_score = PredictNFLUserFormData.objects.filter(user=request.user.id).filter(predict_type='Over-Under Result').order_by('-created')
                    if is_total_score:
                        total_score = is_total_score[0]

                # Gets NBA predict models
                elif sport_name == "NBA":
                    is_winner_data = PredictNBAUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner').order_by('-created')
                    if is_winner_data:
                        winner = is_winner_data[0]
                    is_winners_against_the_spread = PredictNBAUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner Against The Spread').order_by('-created')
                    if is_winners_against_the_spread:
                        winners_against_the_spread = is_winners_against_the_spread[0]
                    is_total_score = PredictNBAUserFormData.objects.filter(user=request.user.id).filter(predict_type='Over-Under Result').order_by('-created')
                    if is_total_score:
                        total_score = is_total_score[0]

                # Gets NHL predict models
                elif sport_name == "NHL":
                    is_winner_data = PredictNHLUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner').order_by('-created')
                    if is_winner_data:
                        winner = is_winner_data[0]
                    is_winners_against_the_spread = PredictNHLUserFormData.objects.filter(user=request.user.id).filter(predict_type='Winner Against The Spread').order_by('-created')
                    if is_winners_against_the_spread:
                        winners_against_the_spread = is_winners_against_the_spread[0]
                    is_total_score = PredictNHLUserFormData.objects.filter(user=request.user.id).filter(predict_type='Over-Under Result').order_by('-created')
                    if is_total_score:
                        total_score = is_total_score[0]

                else:
                    is_winner_data, is_winners_against_the_spread, is_total_score = None, None, None

                #This is likely not necessary since I am cleaning up data above
                if len(curr_data):
                    for data_id in global_state.get_data():
                        user_sheet = user_id + "_" + "1"
                        if user_sheet in data_id:
                            if_data_sheet = False
                try:
                    if if_data_sheet:
                        #gets team stats and game stats from .zip file
                        only_use_this_csv = ['Team Stats','Game Stats']
                        with io.BytesIO(obj.get()["Body"].read()) as tf:
                            tf.seek(0)
                            with zipfile.ZipFile(tf, mode='r') as zipf:
                                for subfile in zipf.namelist():
                                    name_split = subfile.split('.')[0]
                                    proper_name = name_split.replace('_', ' ')
                                    if any(x in proper_name for x in only_use_this_csv):
                                        #CSVs take longer to load but are optimized for predictions
                                        if ("Team Stats" in proper_name) and ("csv" in subfile):
                                            data = zipf.read(subfile)
                                            team_data = pd.read_csv(BytesIO(data), parse_dates=["Date"])
                                        elif ("Game Stats" in proper_name) and ("csv" in subfile):
                                            data = zipf.read(subfile)
                                            game_data = pd.read_csv(BytesIO(data), parse_dates=["Date"])

                                        #datasheet_names_and_id[srt_counter] = proper_name
                                        #startup("", data=pd.read_csv(BytesIO(data), parse_dates=['Date']), name=proper_name, allow_cell_edits=False, data_id=srt_counter)

                            #creates list of basic stats for each sport
                            if sport_name == "MLB":
                                basic_stats = [
                                    'Game ID',
                                    'Game Name',
                                    'Season',
                                    'Date',
                                    'Team',
                                    'Opponent',
                                    #'Temperature',
                                    #'Wind Speed',
                                    #'Wind Direction',
                                    #'Duration',
                                    'Home-Visitor',
                                    #'Attendance',
                                    'Team - Runs',
                                    'Team - Hits',
                                    'Team - Errors',
                                    'Opponent - Runs',
                                    'Opponent - Hits',
                                    'Opponent - Errors',
                                    #'Moneyline',
                                    #'Implied Odds',
                                    #'Final Score Spread',
                                    #'Winner',
                                    #'Point Spread',
                                    #'Point Spread Moneyline',
                                    #'Point Spread Implied Odds',
                                    #'Spread Difference',
                                    #'Winner Against The Spread',
                                    #'Total Score',
                                    #'Over-Under',
                                    #'Over-Under Difference',
                                    #'Over-Under Result',
                                ]
                            elif "NFL" in sport_name:
                                basic_stats = [
                                    'Game ID',
                                    'Game Name',
                                    'Season Year',
                                    'Date',
                                    'Week',
                                    'Team',
                                    'Opponent',
                                    'Home-Visitor',
                                    'Team - Score',
                                    'Opponent - Score',
                                ]
                            elif sport_name == "NBA":
                                basic_stats = [
                                    'Game ID',
                                    'Game Name',
                                    'Season Year',
                                    'Date',
                                    'Team',
                                    'Opponent',
                                    'Home-Visitor',
                                    'Team - Score',
                                    'Opponent - Score',
                                ]
                            elif sport_name == "NHL":
                                basic_stats = [
                                    'Game ID',
                                    'Game Name',
                                    'Season Year',
                                    'Date',
                                    'Team',
                                    'Opponent',
                                    'Home-Visitor',
                                    'Team - Final Score',
                                    'Opponent - Final Score',
                                ]

                            has_winner_score_predictions = False

                            #checks if there is a winner model
                            if is_winner_data:
                                # finds stats that user chose
                                selected_game_stats, selected_historic_stats = winner.selected_stats()
                                selected_moving_average_stats = [s + " - Moving Average" for s in selected_historic_stats]

                                #gets moving averages.  This is probably only necessary for Predict+ users.
                                selected_data, winner_all_ma, hv = winner.model.get_moving_averages(team_data, "Winner", winner.predict_year, winner.predict_train, selected_game_stats, selected_historic_stats)

                                # adds the game score and winner so moving average spreadsheet has basic scoring metrics
                                columns_to_keep = basic_stats + ['Final Score Spread', 'Winner'] + selected_game_stats + selected_moving_average_stats
                                columns_to_keep = list(dict.fromkeys(columns_to_keep))
                                winner_all_ma = winner_all_ma[columns_to_keep]

                                #When a user builds a model, the default score is -1, this means the model has not been built yet.
                                #This builds model if it has not yet been built
                                if winner.model_score == -1:
                                    top_pipe, top_model, top_score, last_game = winner.model.train_and_test(winner.predict_type, game_data, selected_data, hv, winner.user.username, winner.model_name, winner.created)
                                    winner.model_score = top_score
                                    winner.model_type = top_model
                                    winner.last_game = last_game
                                    winner.save()
                                has_winner_score_predictions = True

                                #Renames some columns so d-tale can read them better.  It is having issues when a column name (Closing Spread) is contained within another column name (Closing Spread Moneyline)
                                if is_user_group:
                                    try:
                                        winner_all_ma.rename(columns={"Closing Spread Moneyline": "Closing-Spread Moneyline"}, inplace=True)
                                    except:
                                        pass
                                    try:
                                        winner_all_ma.rename(columns={"Closing Spread Implied Odds": "Closing-Spread Implied Odds"}, inplace=True)
                                    except:
                                        pass
                                    try:
                                        winner_all_ma.rename(columns={"Point Spread Moneyline": "Point-Spread Moneyline"}, inplace=True)
                                    except:
                                        pass
                                    try:
                                        winner_all_ma.rename(columns={"Point Spread Implied Odds": "Closing-Point Spread Implied Odds"}, inplace=True)
                                    except:
                                        pass

                                    start_sheet(winner_all_ma, "Winner Moving Average", '{}_1'.format(user_id))
                                    #startup("", data=winner_all_ma, name="Winner Moving Average", allow_cell_edits=False, data_id='{}_1'.format(user_id))

                                try:
                                    #Gets the test predictions from S3.  Probably don't need to do this for everyone, just Predict+ members.
                                    s3_file_path = "predictions/{}_{}_{}.csv".format(urllib.parse.quote(str(user)),urllib.parse.quote(str(winner.model_name)),urllib.parse.quote(str(winner.created)))
                                    client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
                                    csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                                                Key=s3_file_path)
                                    body = csv_obj['Body']
                                    csv_string = body.read().decode('utf-8')
                                    score_predictions = pd.read_csv(StringIO(csv_string))
                                    winner_link = "https://pinesports-prod-s3-user-charts-us-west-2-192279148113.s3-us-west-2.amazonaws.com/{}".format(urllib.parse.quote(s3_file_path))
                                    if is_user_group:
                                        #if the person is a Predict+ member it uploads tested predictions to d-tale
                                        start_sheet(score_predictions, "Winner Score Predictions", '{}_11'.format(user_id))
                                        #startup("", data=score_predictions, name="Winner Score Predictions", allow_cell_edits=False, data_id='{}_11'.format(user_id))
                                except:
                                    has_winner_score_predictions = False

                            has_winner_ats_score_predictions = False

                            # checks if there is a winner against the spread model
                            if is_winners_against_the_spread:
                                # finds stats that user chose
                                selected_game_stats, selected_historic_stats = winners_against_the_spread.selected_stats()
                                selected_moving_average_stats = [s + " - Moving Average" for s in selected_historic_stats]

                                # gets moving averages.  This is probably only necessary for Predict+ users.
                                selected_data, winners_against_the_spread_all_ma, hv = winners_against_the_spread.model.get_moving_averages(team_data, "Winner Against The Spread", winners_against_the_spread.predict_year, winners_against_the_spread.predict_train, selected_game_stats, selected_historic_stats)

                                # adds the game score, point spread, winner against the spread, so moving average spreadsheet has basic scoring metrics
                                if sport_name == "MLB":
                                    columns_to_keep = basic_stats + ['Final Score Spread', 'Point Spread', 'Spread Difference', 'Winner Against The Spread'] + selected_game_stats + selected_moving_average_stats
                                elif "NFL" in sport_name:
                                    columns_to_keep = basic_stats + ['Final Score Spread', 'Closing Spread', 'Spread Difference', 'Winner Against The Spread'] + selected_game_stats + selected_moving_average_stats
                                elif sport_name == "NBA":
                                    columns_to_keep = basic_stats + ['Final Score Spread', 'Point Spread', 'Spread Difference', 'Winner Against The Spread'] + selected_game_stats + selected_moving_average_stats
                                elif sport_name == "NHL":
                                    columns_to_keep = basic_stats + ['Final Score Spread', 'Closing Spread', 'Spread Difference', 'Winner Against The Spread'] + selected_game_stats + selected_moving_average_stats
                                columns_to_keep = list(dict.fromkeys(columns_to_keep))
                                winners_against_the_spread_all_ma = winners_against_the_spread_all_ma[columns_to_keep]

                                #When a user builds a model, the default score is -1, this means the model has not been built yet.
                                #This builds model if it has not yet been built
                                if winners_against_the_spread.model_score == -1:
                                    top_pipe, top_model, top_score, last_game = winners_against_the_spread.model.train_and_test(winners_against_the_spread.predict_type, game_data, selected_data, hv, winners_against_the_spread.user.username, winners_against_the_spread.model_name, winners_against_the_spread.created)
                                    winners_against_the_spread.model_score = top_score
                                    winners_against_the_spread.model_type = top_model
                                    winners_against_the_spread.last_game = last_game
                                    winners_against_the_spread.save()
                                has_winner_ats_score_predictions = True

                                # Renames some columns so d-tale can read them better.  It is having issues when a column name (Closing Spread) is contained within another column name (Closing Spread Moneyline)
                                if is_user_group:
                                    try:
                                        winners_against_the_spread_all_ma.rename(columns={"Closing Spread Moneyline": "Closing-Spread Moneyline"}, inplace=True)
                                    except:
                                        pass
                                    try:
                                        winners_against_the_spread_all_ma.rename(columns={"Closing Spread Implied Odds": "Closing-Spread Implied Odds"}, inplace=True)
                                    except:
                                        pass
                                    try:
                                        winners_against_the_spread_all_ma.rename(columns={"Point Spread Moneyline": "Point-Spread Moneyline"}, inplace=True)
                                    except:
                                        pass
                                    try:
                                        winners_against_the_spread_all_ma.rename(columns={"Point Spread Implied Odds": "Point-Spread Implied Odds"}, inplace=True)
                                    except:
                                        pass

                                    start_sheet(winners_against_the_spread_all_ma, "Winner ATS Moving Average", '{}_2'.format(user_id))
                                    #startup("", data=winners_against_the_spread_all_ma, name="Winner ATS Moving Average", allow_cell_edits=False, data_id='{}_2'.format(user_id))


                                try:
                                    # Gets the test predictions from S3.  Probably don't need to do this for everyone, just Predict+ members.
                                    s3_file_path = "predictions/{}_{}_{}.csv".format(urllib.parse.quote(str(user)),urllib.parse.quote(str(winners_against_the_spread.model_name)),urllib.parse.quote(str(winners_against_the_spread.created)))
                                    client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
                                    csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                                                Key=s3_file_path)
                                    body = csv_obj['Body']
                                    csv_string = body.read().decode('utf-8')
                                    score_predictions = pd.read_csv(StringIO(csv_string))
                                    winner_against_the_spread_link = "https://pinesports-prod-s3-user-charts-us-west-2-192279148113.s3-us-west-2.amazonaws.com/{}".format(urllib.parse.quote(s3_file_path))
                                    if is_user_group:
                                        # if the person is a Predict+ member it uploads tested predictions to d-tale
                                        start_sheet(score_predictions, "Winner Against the Spread Score Predictions", '{}_21'.format(user_id))
                                        #startup("", data=score_predictions, name="Winner Against the Spread Score Predictions", allow_cell_edits=False, data_id='{}_21'.format(user_id))
                                except:
                                    has_winner_ats_score_predictions = False

                            has_ou_predictions = False

                            # checks if there is an over-under model
                            if is_total_score:
                                # finds stats that user chose
                                selected_game_stats, selected_historic_stats = total_score.selected_stats()
                                selected_moving_average_stats = [s + " - Moving Average" for s in selected_historic_stats]

                                # gets moving averages.  This is probably only necessary for Predict+ users.
                                selected_data, total_score_all_ma, hv = total_score.model.get_moving_averages(team_data, "Over-Under Result", total_score.predict_year, total_score.predict_train, selected_game_stats, selected_historic_stats)

                                # adds the total score, over-under, over-under result, so moving average spreadsheet has basic scoring metrics
                                if sport_name == "MLB":
                                    columns_to_keep = basic_stats + ['Total Score', 'Over-Under', 'Over-Under Difference','Over-Under Result'] + selected_game_stats + selected_moving_average_stats
                                elif "NFL" in sport_name:
                                    columns_to_keep = basic_stats + ['Total Score', 'Closing Over-Under', 'Over-Under Difference', 'Over-Under Result'] + selected_game_stats + selected_moving_average_stats
                                elif sport_name == "NBA":
                                    columns_to_keep = basic_stats + ['Total Score', 'Over-Under', 'Over-Under Difference','Over-Under Result'] + selected_game_stats + selected_moving_average_stats
                                elif sport_name == "NHL":
                                    columns_to_keep = basic_stats + ['Total Score', 'Closing Over-Under', 'Over-Under Difference','Over-Under Result'] + selected_game_stats + selected_moving_average_stats
                                columns_to_keep = list(dict.fromkeys(columns_to_keep))
                                total_score_all_ma = total_score_all_ma[columns_to_keep]

                                #When a user builds a model, the default score is -1, this means the model has not been built yet.
                                #This builds model if it has not yet been built
                                if total_score.model_score == -1:
                                    top_pipe, top_model, top_score, last_game = total_score.model.train_and_test(total_score.predict_type, game_data, selected_data, hv, total_score.user.username, total_score.model_name, total_score.created)
                                    total_score.model_score = top_score
                                    total_score.model_type = top_model
                                    total_score.model_type = top_model
                                    total_score.last_game = last_game
                                    total_score.save()
                                has_ou_predictions = True

                                # Renames some columns so d-tale can read them better.  It is having issues when a column name (Closing Spread) is contained within another column name (Closing Spread Moneyline)
                                if is_user_group:
                                    try:
                                        total_score_all_ma.rename(columns={"Closing Spread Moneyline": "Closing-Spread Moneyline"}, inplace=True)
                                    except:
                                        pass
                                    try:
                                        total_score_all_ma.rename(columns={"Closing Spread Implied Odds": "Closing-Spread Implied Odds"}, inplace=True)
                                    except:
                                        pass
                                    try:
                                        total_score_all_ma.rename(columns={"Point Spread Moneyline": "Point-Spread Moneyline"}, inplace=True)
                                    except:
                                        pass
                                    try:
                                        total_score_all_ma.rename(columns={"Point Spread Implied Odds": "Point-Spread Implied Odds"}, inplace=True)
                                    except:
                                        pass

                                    start_sheet(total_score_all_ma, "Over-Under Moving Average",'{}_3'.format(user_id))
                                    #startup("", data=total_score_all_ma, name="Over-Under Moving Average", allow_cell_edits=False, data_id='{}_3'.format(user_id))

                                try:
                                    # Gets the test predictions from S3.  Probably don't need to do this for everyone, just Predict+ members.
                                    s3_file_path = "predictions/{}_{}_{}.csv".format(urllib.parse.quote(str(user)),urllib.parse.quote(str(total_score.model_name)),urllib.parse.quote(str(total_score.created)))
                                    client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
                                    csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                                                Key=s3_file_path)
                                    body = csv_obj['Body']
                                    csv_string = body.read().decode('utf-8')
                                    score_predictions = pd.read_csv(StringIO(csv_string))
                                    total_score_link = "https://pinesports-prod-s3-user-charts-us-west-2-192279148113.s3-us-west-2.amazonaws.com/{}".format(urllib.parse.quote(s3_file_path))
                                    if is_user_group:
                                        # if the person is a Predict+ member it uploads tested predictions to d-tale
                                        start_sheet(score_predictions, "Over-Under Score Predictions", '{}_31'.format(user_id))
                                        #startup("", data=score_predictions, name="Over-Under Score Predictions", allow_cell_edits=False, data_id='{}_31'.format(user_id))
                                except:
                                    has_ou_predictions = False
                        application = dtale_app.build_app(
                            "", host=dtale_app.ACTIVE_HOST, reaper_on=False, hide_shutdown=True,
                            github_fork=False
                        )
                except Exception as e:
                    logger.error(e)

                #Gets full name of data to display in d-tale
                data_id_and_names = {}
                for data_id in global_state.get_data():
                    user_sheet = user_id + "_"
                    if user_sheet in data_id:
                        name = (global_state.get_metadata(data_id) or {}).get('name')
                        data_id_and_names[data_id] = name

                context = {"user": user, "is_group": is_user_group, "user_id": user_id,
                        "datasheet_names_and_id": datasheet_names_and_id, "data_id_and_names": data_id_and_names,
                        "sport_name":sport_name}

                #Get forms for all sports
                sports_name = Sports_name.objects.all().values_list('name',flat=True)
                context['sports_name']=sports_name
                context['MLB_form']=MLBForm()
                context['NFL_form'] = NFLForm()
                context['NBA_form'] = NBAForm()
                context['NHL_form'] = NHLForm()

                #context['is_prop_master_user'] = check_prop_master_user(request.user)

                context['is_winner_data']=winner
                context['is_winners_against_the_spread']=winners_against_the_spread
                context['is_total_score']=total_score

                context['has_winner_score_predictions']=has_winner_score_predictions
                context['has_winner_ats_score_predictions'] = has_winner_ats_score_predictions
                context['has_ou_predictions'] = has_ou_predictions

                context['winner_link'] = winner_link
                context['winner_against_the_spread_link'] = winner_against_the_spread_link
                context['total_score_link'] = total_score_link
                print("PRINTING WINNER LINK")
                print(context['winner_link'])
                try:
                    context["new_notifications"] = (Notification.objects.filter(user=request.user).exclude(sender=request.user).exclude(is_seen=True).count() > 0)
                    context["notification_count"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).count()
                    context["recent_notifications"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).order_by('-date')[:4]
                except:
                    context["new_notifications"] = False
                    context["notification_count"] = 0
                    context["recent_notifications"] = []

                logger.info("{} {} {} {}".format(request.method, request.get_full_path(), get_ip(request), request.user.id))

                return render(request, 'predict.html', context)
        else:
            return HttpResponseNotFound("<h1 class='text-center'>Sport not found</h1>")
    return render(request, 'predict.html', context)


@login_required
def predict_generating(request, sport_name, pt):

    is_user_group = request.user.groups.filter(name__in=['data_access_user', 'admin_user', 'moderator_user']).exists()
    context = {}

    context["user"] = request.user
    context["user_id"] = str(request.user.id)
    context["is_group"] = is_user_group
    #context['is_prop_master_user'] = check_prop_master_user(request.user)
    try:
        context["new_notifications"] = (Notification.objects.filter(user=request.user).exclude(sender=request.user).exclude(is_seen=True).count() > 0)
        context["notification_count"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).count()
        context["recent_notifications"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).order_by('-date')[:4]
    except:
        context["new_notifications"] = False
        context["notification_count"] = 0
        context["recent_notifications"] = []

    sports_name = Sports_name.objects.all().values_list('name', flat=True)
    context['sports_name'] = sports_name
    context['sport_name'] = sport_name
    context['predict_type'] = pt
    return render(request, 'generating_predictions.html', context)

@login_required
def predict_results(request, sport_name, pt):

    if (sport_name == "MLB") or (sport_name == "NFL") or (sport_name=="NFL-CBS") or (sport_name == "NBA") or (sport_name == "NHL"):

        print("IN PREDICT RESULTS: {}".format(pt))
        try:
            request, context = get_predictions(request, pt, sport_name)
            return render(request, 'my_predictions.html', context)
        except:
            context = {}
            context['success'] = False
            return render(request, 'my_predictions.html', context)


    return redirect("/")

def joke_sheet_tb(request):
    context = {}
    s3_file_path = 'consistency_sheets/mlb_consistency_sheet.csv'

    client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
    csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME,
                                Key=s3_file_path)
    body = csv_obj['Body']
    csv_string = body.read().decode('utf-8')
    consistency_sheet = pd.read_csv(StringIO(csv_string))

    consistency_sheet["Line"] = pd.to_numeric(consistency_sheet["Line"])
    consistency_sheet["Best Hit %"] = pd.to_numeric(consistency_sheet["Best Hit %"])
    consistency_sheet["L10 Hit %"] = pd.to_numeric(consistency_sheet["L10 Hit %"])
    consistency_sheet["L9 Hit %"] = pd.to_numeric(consistency_sheet["L9 Hit %"])
    consistency_sheet["L8 Hit %"] = pd.to_numeric(consistency_sheet["L8 Hit %"])
    consistency_sheet["L7 Hit %"] = pd.to_numeric(consistency_sheet["L7 Hit %"])
    consistency_sheet["L6 Hit %"] = pd.to_numeric(consistency_sheet["L6 Hit %"])
    consistency_sheet["L5 Hit %"] = pd.to_numeric(consistency_sheet["L5 Hit %"])
    consistency_sheet= consistency_sheet.loc[consistency_sheet["Prop"] == "Batting - Total Bases"]
    consistency_sheet = consistency_sheet.loc[consistency_sheet["Line"] == 1.5]
    consistency_sheet = consistency_sheet.loc[consistency_sheet["Best Hit %"] >= 70]

    def get_sentence(data):
        best_hit_string = data[0]
        best_hit_rate = data[1]

        if best_hit_string == "L10":
            best_hit = 10
        elif best_hit_string == "L9":
            best_hit = 9
        elif best_hit_string == "L8":
            best_hit = 8
        elif best_hit_string == "L7":
            best_hit = 7
        elif best_hit_string == "L6":
            best_hit = 6
        elif best_hit_string == "L5":
            best_hit = 5

        sentence = f"{round((best_hit_rate/100) * best_hit)} out of last {best_hit} games."

        return sentence

    consistency_sheet["Sentence"] = consistency_sheet[["Best Hit", "Best Hit %"]].apply(get_sentence, axis=1)

    consistency_sheet = consistency_sheet.rename({"Player Name": "Player_Name"}, axis=1)

    consistency_sheet = consistency_sheet[["Player_Name", "Sentence"]]
    context["consistency_sheet"] = consistency_sheet

    return render(request, 'joke_sheet_tb.html', context)

def joke_sheet_nba(request, prop):

    if prop == "Threes":
        pine_prop = "Three Points Made"
    else:
        pine_prop = "Points"

    context = {}
    s3_file_path = 'consistency_sheets/nba_consistency_sheet.csv'

    client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
    csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME,
                                Key=s3_file_path)
    body = csv_obj['Body']
    csv_string = body.read().decode('utf-8')
    consistency_sheet = pd.read_csv(StringIO(csv_string))

    consistency_sheet["Line"] = pd.to_numeric(consistency_sheet["Line"])
    consistency_sheet["Best Hit %"] = pd.to_numeric(consistency_sheet["Best Hit %"])
    consistency_sheet["L10 Hit %"] = pd.to_numeric(consistency_sheet["L10 Hit %"])
    consistency_sheet["L9 Hit %"] = pd.to_numeric(consistency_sheet["L9 Hit %"])
    consistency_sheet["L8 Hit %"] = pd.to_numeric(consistency_sheet["L8 Hit %"])
    consistency_sheet["L7 Hit %"] = pd.to_numeric(consistency_sheet["L7 Hit %"])
    consistency_sheet["L6 Hit %"] = pd.to_numeric(consistency_sheet["L6 Hit %"])
    consistency_sheet["L5 Hit %"] = pd.to_numeric(consistency_sheet["L5 Hit %"])
    consistency_sheet= consistency_sheet.loc[consistency_sheet["Prop"] == pine_prop]
    consistency_sheet = consistency_sheet.loc[consistency_sheet["Best Hit %"] >= 70]

    def get_sentence(data):
        best_hit_string = data[0]
        best_hit_rate = data[1]

        if best_hit_string == "L10":
            best_hit = 10
        elif best_hit_string == "L9":
            best_hit = 9
        elif best_hit_string == "L8":
            best_hit = 8
        elif best_hit_string == "L7":
            best_hit = 7
        elif best_hit_string == "L6":
            best_hit = 6
        elif best_hit_string == "L5":
            best_hit = 5

        sentence = f"{round((best_hit_rate/100) * best_hit)} out of last {best_hit} games."

        return sentence

    consistency_sheet["Sentence"] = consistency_sheet[["Best Hit", "Best Hit %"]].apply(get_sentence, axis=1)

    consistency_sheet = consistency_sheet.rename({"Player Name": "Player_Name"}, axis=1)

    consistency_sheet = consistency_sheet[["Player_Name", "Sentence", "Line"]]

    context["prop"] = prop
    context["consistency_sheet"] = consistency_sheet

    return render(request, 'joke_sheet_nba.html', context)


def get_book(request, book):
    ip_address = get_ip(request)

    counter = 0
    done = False
    while not done:
        try:
            geolocation_url = 'https://geolocation-db.com/jsonp/' + ip_address
            response = requests.get(geolocation_url)
            result = response.content.decode()
            result = result.split("(")[1].strip(")")
            result = json.loads(result)
            country = result.get('country_name')
            state = result.get('state')
            done = True
        except:
            counter = counter+1
            if counter >= 25:
                done = True
                country = "Error"
                state = "Error"

    s3_line_csv_file_path = 'linefiles/book_links.csv'

    client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
    csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=s3_line_csv_file_path)
    body = csv_obj['Body']
    csv_string = body.read().decode('utf-8')
    book_links = pd.read_csv(StringIO(csv_string))

    book_info = book_links.loc[book_links["Book"] == book]
    book_info_single = book_info.loc[book_links["State"] == state]



    if len(book_info_single) == 0:
        book_info_single = book_info.loc[book_links["State"] == "Other"]
    if len(book_info_single) == 0:
        book_info_single = book_info.loc[book_links["State"] == "All"]
    try:
        url = book_info_single["Link"].values[0]
    except:
        url = "https://www.google.com/search?q=" + book

    s3_line_csv_file_path = 'linefiles/book_recorder.csv'

    client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
    csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=s3_line_csv_file_path)
    body = csv_obj['Body']
    csv_string = body.read().decode('utf-8')
    book_recorder = pd.read_csv(StringIO(csv_string))
    book_recorder = book_recorder.append({"Book": book, "State": state}, ignore_index=True)
    print(book_recorder)

    csv_buffer = StringIO()
    book_recorder.to_csv(csv_buffer, index=False)
    s3_upload_path = "linefiles/book_recorder.csv"
    client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
    client.put_object(ACL='public-read', Bucket=settings.AWS_STORAGE_BUCKET_NAME,
                      Body=csv_buffer.getvalue(), Key=s3_upload_path, ContentType='text/html', )

    return redirect(url)

def bet_builder(request, bet_id):

    context = {}
    try:
        s3_line_csv_file_path = 'linefiles/pine_fd_urls.csv'

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=s3_line_csv_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        pine_fd_urls = pd.read_csv(StringIO(csv_string))
        fd_url = pine_fd_urls.loc[pine_fd_urls["pine_url"] == bet_id]["fd_url"].values[0]

        user_name = pine_fd_urls.loc[pine_fd_urls["pine_url"] == bet_id]["user_name"].values[0]
        html_string = pine_fd_urls.loc[pine_fd_urls["pine_url"] == bet_id]["html_string"].values[0]

        #test html string
        #html_string = "<a href='https://www.pine-sports.com/stats/project/NBA/Jaylen Brown/Player - Points/27.5/10/'>Jaylen Brown | Under 27.5 points</a>"
        test_number=1
        #replace three points made with threes
        html_string = html_string.replace("three points made", "threes")
        html_string = html_string.replace("batting - ", "")
        html_string = html_string.replace("pitching -", "")
        html_string = html_string.replace(" - ", " ")

        #count the number of | in html_string
        bet_counter = html_string.count("|")

        context["bet_counter"] = bet_counter
        context["fd_url"] = fd_url
        context["got_url"] = True
        context["user_name"] = user_name
        context["html_string"] = html_string

        try:
            print("TRYING TO UPDATE COUNTER")
            counter = int(pine_fd_urls.loc[pine_fd_urls["pine_url"] == bet_id]["counter"].values[0])
            counter = counter + 1
            pine_fd_urls.loc[pine_fd_urls["pine_url"] == bet_id, "counter"] = counter

            csv_buffer = StringIO()
            pine_fd_urls.to_csv(csv_buffer, index=False)
            s3_upload_path = "linefiles/pine_fd_urls.csv"
            client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                  aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
            client.put_object(ACL='public-read', Bucket=settings.AWS_STORAGE_BUCKET_NAME,
                              Body=csv_buffer.getvalue(), Key=s3_upload_path, ContentType='text/html', )

        except:
            pass

    except Exception as e:
        print(e)
        fd_url = "https://wlfanduel.adsrv.eacdn.com/C.ashx?btag=a_27378b_2436c_&affid=10113&siteid=27378&adid=2436&c=27378"

        context["fd_url"] = fd_url
        context["got_url"] = False
        context["user_name"] = "No User Name"
        context["html_string"] = "No HTML String"

    return render(request, 'bet_slip.html', context)

def prop_bet(request, bet_id):

    context = {}

    try:
        context["fd_url"] = f"https://account.sportsbook.fanduel.com/sportsbook/addToBetslip?{bet_id}"
        context["got_url"] = True

    except Exception as e:
        print(e)
        fd_url = "https://wlfanduel.adsrv.eacdn.com/C.ashx?btag=a_27378b_2436c_&affid=10113&siteid=27378&adid=2436&c=27378"

        context["fd_url"] = fd_url
        context["got_url"] = False

    logger.info("PROP_SLIP {} {} {}".format(request.get_full_path(), get_ip(request), request.user.id))

    return render(request, 'prop_slip.html', context)

def discord_bot(request):
    url = "https://discord.com/api/oauth2/authorize?client_id=975865110000201788&permissions=292057901056&scope=bot%20applications.commands"

    logger.info("DISCORD_BOT_REQUEST {} {} {}".format(request.get_full_path(), get_ip(request), request.user.id))

    return redirect(url)

def consistency_sheet(request, league, game = "none", games_back=10, percent=70, ou="over"):

    print(league)

    games_back = int(games_back)
    if games_back > 10:
        games_back = 10

    percent = int(percent)

    context = {}
    s3_file_path = f'consistency_sheets/ps_{league.lower()}_consistency_sheet.csv'

    client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
    csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME,
                                Key=s3_file_path)
    body = csv_obj['Body']
    csv_string = body.read().decode('utf-8')
    consistency_sheet = pd.read_csv(StringIO(csv_string))

    games = consistency_sheet["Game"].drop_duplicates().values
    print(games)


    found_game = game in games


    if game == "none" or not found_game:
        game = consistency_sheet["Game"][0]
        print("NOT FOUND")

    print(game)

    consistency_sheet = consistency_sheet.loc[consistency_sheet["Game"] == game]

    consistency_sheet = consistency_sheet.replace("Receiving - Yards", "Receiving Yards")
    consistency_sheet = consistency_sheet.replace("Receiving - Receptions", "Receptions")
    consistency_sheet = consistency_sheet.replace("Receiving - Longest Gain", "Longest Receiving Gain")
    consistency_sheet = consistency_sheet.replace("Rushing - Attempts", "Rushing Attempts")
    consistency_sheet = consistency_sheet.replace("Rushing - Longest Rushing Attempt", "Longest Rushing Attempt")
    consistency_sheet = consistency_sheet.replace("Passing - Longest Pass", "Longest Pass")
    consistency_sheet = consistency_sheet.replace("Passing - Completions", "Passing Completions")
    consistency_sheet = consistency_sheet.replace("Rushing - Yards", "Rushing Yards")
    consistency_sheet = consistency_sheet.replace("Passing - Attempts", "Passing Attempts")
    consistency_sheet = consistency_sheet.replace("Passing - Interceptions", "Interceptions")
    consistency_sheet = consistency_sheet.replace("Passing - Yards", "Passing Yards")
    consistency_sheet = consistency_sheet.replace("Passing - Touchdowns", "Passing Touchdowns")
    consistency_sheet = consistency_sheet.replace("Rushing and Receiving Yards", "Rushing & Receiving Yards")
    consistency_sheet = consistency_sheet.replace("PR", "Points & Rebounds")
    consistency_sheet = consistency_sheet.replace("PA", "Points & Assists")
    consistency_sheet = consistency_sheet.replace("PAR", "Points, Rebounds & Assists")
    consistency_sheet = consistency_sheet.replace("RA", "Rebounds & Assists")
    consistency_sheet = consistency_sheet.replace("SB", "Steals & Blocks")

    consistency_sheet["Line"] = pd.to_numeric(consistency_sheet["Line"])
    consistency_sheet[f"Hit %"] = pd.to_numeric(consistency_sheet[f"L{games_back} Hit %"])
    consistency_sheet[f"Mean"] = pd.to_numeric(consistency_sheet[f"L{games_back} Mean"]).round(2)

    if ou == "over":
        consistency_sheet = consistency_sheet.loc[consistency_sheet[f"L{games_back} Hit %"] >= percent]
    else:
        consistency_sheet = consistency_sheet.loc[consistency_sheet[f"L{games_back} Hit %"] <= 100-percent]

    if ou == "over":
        consistency_sheet["Hit_Rate"] = consistency_sheet[f"L{games_back} Hit %"].astype(int)
    else:
        consistency_sheet["Hit_Rate"] = 100 - consistency_sheet[f"L{games_back} Hit %"].astype(int)

    def get_url(url):

        split_number = url.rfind("/", 0, url.rfind("/"))

        url = url[:split_number] + f"/{games_back}/"


        return url

    consistency_sheet["URL"] = consistency_sheet["Pine URL"].apply(get_url)

    consistency_sheet = consistency_sheet.rename({"Player Name": "Player_Name"}, axis=1)

    teams = game.split(" vs. ")
    team1 = teams[0]
    team2 = teams[1]

    consistency_sheet1 = consistency_sheet.loc[consistency_sheet["Team"] == team1]
    consistency_sheet2 = consistency_sheet.loc[consistency_sheet["Team"] == team2]

    consistency_sheet1 = consistency_sheet1[["Player_Name", "Prop", "Line", "Mean", "Hit_Rate", "URL"]]
    consistency_sheet2 = consistency_sheet2[["Player_Name", "Prop", "Line", "Mean", "Hit_Rate", "URL"]]

    consistency_sheet1 = consistency_sheet1.sort_values(by=['Hit_Rate'], ascending=False)
    consistency_sheet2 = consistency_sheet2.sort_values(by=['Hit_Rate'], ascending=False)

    percent_data = [[100, "all"],[90,"90+%"],[80,"80+%"],[70,"70+%"],[60, "60+%"]]
    percent_list = pd.DataFrame(percent_data, columns=["number", "text"])

    context["ou_list"] = ["over", "under"]
    context["percent_list"] = percent_list
    context["league"] = league
    context["consistency_sheet1"] = consistency_sheet1
    context["consistency_sheet2"] = consistency_sheet2
    context["team1"] = team1
    context["team2"] = team2
    context["game"] = game
    context["games"] = games
    context["games_back"] = games_back
    context["percent"] = percent
    context["ou"] = ou
    context["games_back_list"] = [2,3,4,5,6,7,8,9,10]

    if league.upper() == "NBA":
        sport_type = "basketball"
    elif league.upper() == "MLB":
        sport_type = "baseball"
    elif league.upper() == "NFL":
        sport_type = "football"
    elif league.upper() == "NHL":
        sport_type = "hockey"
    else:
        sport_type = ""
    context['sport_type'] = sport_type
    context['sport_image'] = f"https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/{sport_type}.png"

    return render(request, 'consistency_sheet.html', context)


def one_hundred_sheet(request, league, ou="over"):

    s3_file_path = f'consistency_sheets/ps_{league.lower()}_consistency_sheet.csv'

    client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
    csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME,
                                Key=s3_file_path)
    body = csv_obj['Body']
    csv_string = body.read().decode('utf-8')
    consistency_sheet = pd.read_csv(StringIO(csv_string))
    print(consistency_sheet.columns)
    consistency_sheet.drop(consistency_sheet[consistency_sheet['Team'] == 'None'].index, inplace=True)

    if ou == "over":
        consistency_sheet = consistency_sheet.loc[((consistency_sheet["Best Hit %"] >= 100) | (consistency_sheet["L4 Hit %"] >= 100) | (consistency_sheet["L3 Hit %"] >= 100))]
    else:
        consistency_sheet = consistency_sheet.loc[((consistency_sheet["L10 Hit %"] <= 0) | (consistency_sheet["L9 Hit %"] <= 0) | (consistency_sheet["L8 Hit %"] <= 0) | (consistency_sheet["L7 Hit %"] <= 0) | (consistency_sheet["L6 Hit %"] <= 0) | (consistency_sheet["L5 Hit %"] <= 0) | (consistency_sheet["L4 Hit %"] <= 0) | (consistency_sheet["L3 Hit %"] <= 0))]

    consistency_sheet = consistency_sheet.replace("Receiving - Yards", "Receiving Yards")
    consistency_sheet = consistency_sheet.replace("Receiving - Receptions", "Receptions")
    consistency_sheet = consistency_sheet.replace("Receiving - Longest Gain", "Longest Receiving Gain")
    consistency_sheet = consistency_sheet.replace("Rushing - Attempts", "Rushing Attempts")
    consistency_sheet = consistency_sheet.replace("Rushing - Longest Rushing Attempt", "Longest Rushing Attempt")
    consistency_sheet = consistency_sheet.replace("Passing - Longest Pass", "Longest Pass")
    consistency_sheet = consistency_sheet.replace("Passing - Completions", "Passing Completions")
    consistency_sheet = consistency_sheet.replace("Rushing - Yards", "Rushing Yards")
    consistency_sheet = consistency_sheet.replace("Passing - Attempts", "Passing Attempts")
    consistency_sheet = consistency_sheet.replace("Passing - Interceptions", "Interceptions")
    consistency_sheet = consistency_sheet.replace("Passing - Yards", "Passing Yards")
    consistency_sheet = consistency_sheet.replace("Passing - Touchdowns", "Passing Touchdowns")
    consistency_sheet = consistency_sheet.replace("Rushing and Receiving Yards", "Rushing & Receiving Yards")
    consistency_sheet = consistency_sheet.replace("PR", "Points & Rebounds")
    consistency_sheet = consistency_sheet.replace("PA", "Points & Assists")
    consistency_sheet = consistency_sheet.replace("PAR", "Points, Rebounds & Assists")
    consistency_sheet = consistency_sheet.replace("RA", "Rebounds & Assists")
    consistency_sheet = consistency_sheet.replace("SB", "Steals & Blocks")

    consistency_sheet["Line"] = pd.to_numeric(consistency_sheet["Line"])

    consistency_sheet = consistency_sheet.rename({"Player Name": "Player_Name"}, axis=1)

    def get_best_hit(data):
        print("GETTING BEST HIT")
        print(ou)
        print(data[0])
        if ou == "over":
            if data[0] == 100:
                return 10
            elif data[1] == 100:
                return 9
            elif data[2] == 100:
                return 8
            elif data[3] == 100:
                return 7
            elif data[4] == 100:
                return 6
            elif data[5] == 100:
                return 5
            elif data[6] == 100:
                return 4
            elif data[7] == 100:
                return 3
            else:
                return 0
        else:
            if data[0] == 0:
                return 10
            elif data[1] == 0:
                return 9
            elif data[2] == 0:
                return 8
            elif data[3] == 0:
                return 7
            elif data[4] == 0:
                return 6
            elif data[5] == 0:
                return 5
            elif data[6] == 0:
                return 4
            elif data[7] == 0:
                return 3
            else:
                return 0

    consistency_sheet["Best Hit"] = consistency_sheet[["L10 Hit %", "L9 Hit %", "L8 Hit %", "L7 Hit %", "L6 Hit %", "L5 Hit %", "L4 Hit %", "L3 Hit %"]].apply(get_best_hit, axis=1)

    #if ou == "over":
    #    consistency_sheet = consistency_sheet.loc[consistency_sheet[f"L{games_back} Hit %"] >= percent]
    #else:
    #    consistency_sheet = consistency_sheet.loc[consistency_sheet[f"L{games_back} Hit %"] <= 100 - percent]

    #if ou == "over":
    #    consistency_sheet["Hit_Rate"] = consistency_sheet[f"L{games_back} Hit %"].astype(int)
    #else:
    #    consistency_sheet["Hit_Rate"] = 100 - consistency_sheet[f"L{games_back} Hit %"].astype(int)

    def get_url(data):
        url = data[0]
        games_back = data[1]

        split_number = url.rfind("/", 0, url.rfind("/"))

        url = url[:split_number] + f"/{games_back}/"

        return url

    consistency_sheet["URL"] = consistency_sheet[["Pine URL", "Best Hit"]].apply(get_url, axis=1)

    unique_values = consistency_sheet["Best Hit"].unique()
    unique_values = np.sort(unique_values)[::-1]

    all_consistency_sheets = pd.DataFrame()

    for value in unique_values:
        print("Value: ", value)
        specific_sheet = consistency_sheet.loc[consistency_sheet["Best Hit"] == value]
        specific_sheet[f"Hit %"] = pd.to_numeric(specific_sheet[f"L{value} Hit %"])
        specific_sheet[f"Mean"] = pd.to_numeric(specific_sheet[f"L{value} Mean"]).round(2)
        print("Value Length: ", len(specific_sheet))
        print("Columns: ", specific_sheet.columns)
        all_consistency_sheets = all_consistency_sheets.append({"value": int(value), "value_length": len(specific_sheet), "specific_sheet": specific_sheet}, ignore_index=True)

    print(all_consistency_sheets)

    context = {}
    context["league"] = league
    context["all_consistency_sheets"] = all_consistency_sheets
    context["ou"] = ou
    context["ou_list"] = ["over", "under"]
    context['percent'] = 100
    if league.upper() == "NBA":
        sport_type = "basketball"
    elif league.upper() == "MLB":
        sport_type = "baseball"
    elif league.upper() == "NFL":
        sport_type = "football"
    elif league.upper() == "NHL":
        sport_type = "hockey"
    else:
        sport_type = ""
    context['sport_type'] = sport_type
    context['sport_image'] = f"https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/{sport_type}.png"

    return render(request, '100_sheet.html', context)

def full_consistency_sheet(request, league, games_back=10, percent=70, ou="over"):

    games_back = int(games_back)
    if games_back > 10:
        games_back = 10

    percent = int(percent)

    context = {}
    s3_file_path = f'consistency_sheets/ps_{league.lower()}_consistency_sheet.csv'

    client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
    csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME,
                                Key=s3_file_path)
    body = csv_obj['Body']
    csv_string = body.read().decode('utf-8')
    consistency_sheet = pd.read_csv(StringIO(csv_string))

    games = consistency_sheet["Game"].drop_duplicates().values

    consistency_sheet = consistency_sheet.replace("Receiving - Yards", "Receiving Yards")
    consistency_sheet = consistency_sheet.replace("Receiving - Receptions", "Receptions")
    consistency_sheet = consistency_sheet.replace("Receiving - Longest Gain", "Longest Receiving Gain")
    consistency_sheet = consistency_sheet.replace("Rushing - Attempts", "Rushing Attempts")
    consistency_sheet = consistency_sheet.replace("Rushing - Longest Rushing Attempt", "Longest Rushing Attempt")
    consistency_sheet = consistency_sheet.replace("Passing - Longest Pass", "Longest Pass")
    consistency_sheet = consistency_sheet.replace("Passing - Completions", "Passing Completions")
    consistency_sheet = consistency_sheet.replace("Rushing - Yards", "Rushing Yards")
    consistency_sheet = consistency_sheet.replace("Passing - Attempts", "Passing Attempts")
    consistency_sheet = consistency_sheet.replace("Passing - Interceptions", "Interceptions")
    consistency_sheet = consistency_sheet.replace("Passing - Yards", "Passing Yards")
    consistency_sheet = consistency_sheet.replace("Passing - Touchdowns", "Passing Touchdowns")
    consistency_sheet = consistency_sheet.replace("Rushing and Receiving Yards", "Rushing & Receiving Yards")
    consistency_sheet = consistency_sheet.replace("PR", "Points & Rebounds")
    consistency_sheet = consistency_sheet.replace("PA", "Points & Assists")
    consistency_sheet = consistency_sheet.replace("PAR", "Points, Rebounds & Assists")
    consistency_sheet = consistency_sheet.replace("RA", "Rebounds & Assists")
    consistency_sheet = consistency_sheet.replace("SB", "Steals & Blocks")

    consistency_sheet["Line"] = pd.to_numeric(consistency_sheet["Line"])
    consistency_sheet[f"Hit %"] = pd.to_numeric(consistency_sheet[f"L{games_back} Hit %"])
    consistency_sheet[f"Mean"] = pd.to_numeric(consistency_sheet[f"L{games_back} Mean"]).round(2)

    if ou == "over":
        consistency_sheet = consistency_sheet.loc[consistency_sheet[f"L{games_back} Hit %"] >= percent]
    else:
        consistency_sheet = consistency_sheet.loc[consistency_sheet[f"L{games_back} Hit %"] <= 100 - percent]

    if ou == "over":
        consistency_sheet["Hit_Rate"] = consistency_sheet[f"L{games_back} Hit %"].astype(int)
    else:
        consistency_sheet["Hit_Rate"] = 100 - consistency_sheet[f"L{games_back} Hit %"].astype(int)

    def get_url(url):

        split_number = url.rfind("/", 0, url.rfind("/"))

        url = url[:split_number] + f"/{games_back}/"

        return url

    consistency_sheet["URL"] = consistency_sheet["Pine URL"].apply(get_url)

    consistency_sheet = consistency_sheet.rename({"Player Name": "Player_Name"}, axis=1)

    sheet_length = len(consistency_sheet)
    print("SHEET LENGTH: ", sheet_length)

    full_consistency_sheet = pd.DataFrame()
    consistency_sheet_original = consistency_sheet.copy()
    site_length = 0
    for game in games:
        print(game)
        consistency_sheet = consistency_sheet_original.loc[consistency_sheet_original["Game"] == game]

        teams = game.split(" vs. ")
        team1 = teams[0]
        team2 = teams[1]

        consistency_sheet1 = consistency_sheet.loc[consistency_sheet["Team"] == team1]
        consistency_sheet2 = consistency_sheet.loc[consistency_sheet["Team"] == team2]
        consistency_sheet_both_teams = pd.concat([consistency_sheet1, consistency_sheet2])
        consistency_sheet_both_teams = consistency_sheet_both_teams.sort_values(by=['Hit_Rate'], ascending=False)

        length = int(len(consistency_sheet_both_teams)/2)
        consistency_sheet1 = consistency_sheet_both_teams.iloc[:length]
        consistency_sheet2 = consistency_sheet_both_teams.iloc[length:]

        consistency_sheet1 = consistency_sheet1[["Player_Name", "Team", "Prop", "Line", "Mean", "Hit_Rate", "URL"]]
        consistency_sheet2 = consistency_sheet2[["Player_Name", "Team", "Prop", "Line", "Mean", "Hit_Rate", "URL"]]

        consistency_sheet1 = consistency_sheet1.sort_values(by=['Hit_Rate'], ascending=False)
        consistency_sheet2 = consistency_sheet2.sort_values(by=['Hit_Rate'], ascending=False)
        if len(consistency_sheet1) > 0 or len(consistency_sheet2) > 0:
            site_length += max(len(consistency_sheet1), len(consistency_sheet2))
            full_consistency_sheet = full_consistency_sheet.append({"cum_length": site_length, "game": game, "team1": team1, "team2": team2, "consistency_sheet1": consistency_sheet1, "consistency_sheet2": consistency_sheet2}, ignore_index=True)
            print(site_length)
    print("SITE LENGTH: ", site_length)

    min_difference = 99999999999
    min_index = int(len(full_consistency_sheet)/2)
    for index, row in full_consistency_sheet.iterrows():
        difference = abs(row["cum_length"] - site_length/2)
        print("INDEX: ", index)
        print("DIFFERENCE: ", difference)
        print("MIN DIFFERENCE: ", min_difference)
        if difference < min_difference:
            print("MIN INDEX: ", min_index)
            min_difference = difference
            min_index = index
    full_consistency_sheet_1 = full_consistency_sheet.iloc[:min_index + 1]
    full_consistency_sheet_2 = full_consistency_sheet.iloc[min_index + 1:]

    percent_data = [[100, "all"],[90,"90+%"],[80,"80+%"],[70,"70+%"],[60, "60+%"]]
    percent_list = pd.DataFrame(percent_data, columns=["number", "text"])

    context["ou_list"] = ["over", "under"]
    context["percent_list"] = percent_list
    context["league"] = league
    context["full_consistency_sheet"] = full_consistency_sheet
    context["full_consistency_sheet_1"] = full_consistency_sheet_1
    context["full_consistency_sheet_2"] = full_consistency_sheet_2
    context["games_back"] = games_back
    context["percent"] = percent
    context["ou"] = ou
    context["games_back_list"] = [2,3,4,5,6,7,8,9,10]

    if league.upper() == "NBA":
        sport_type = "basketball"
    elif league.upper() == "MLB":
        sport_type = "baseball"
    elif league.upper() == "NFL":
        sport_type = "football"
    elif league.upper() == "NHL":
        sport_type = "hockey"
    else:
        sport_type = ""
    context['sport_type'] = sport_type
    context['sport_image'] = f"https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/{sport_type}.png"

    return render(request, 'full_consistency_sheet.html', context)

def ps_sheet(request, league, game = "none", games_back=2):

    games_back = int(games_back)
    if games_back > 10:
        games_back = 10

    context = {}
    s3_file_path = f'consistency_sheets/ps_{league.lower()}_consistency_sheet.csv'

    client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
    csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME,
                                Key=s3_file_path)
    body = csv_obj['Body']
    csv_string = body.read().decode('utf-8')
    consistency_sheet = pd.read_csv(StringIO(csv_string))

    if game == "none":
        game = consistency_sheet["Game"][0]

    games = consistency_sheet["Game"].drop_duplicates()

    consistency_sheet = consistency_sheet.loc[consistency_sheet["Game"] == game]

    consistency_sheet = consistency_sheet.replace("Receiving - Yards", "Receiving Yards")
    consistency_sheet = consistency_sheet.replace("Receiving - Receptions", "Receptions")
    consistency_sheet = consistency_sheet.replace("Receiving - Longest Gain", "Longest Receiving Gain")
    consistency_sheet = consistency_sheet.replace("Rushing - Attempts", "Rushing Attempts")
    consistency_sheet = consistency_sheet.replace("Rushing - Longest Rushing Attempt", "Longest Rushing Attempt")
    consistency_sheet = consistency_sheet.replace("Passing - Longest Pass", "Longest Pass")
    consistency_sheet = consistency_sheet.replace("Passing - Completions", "Passing Completions")
    consistency_sheet = consistency_sheet.replace("Rushing - Yards", "Rushing Yards")
    consistency_sheet = consistency_sheet.replace("Passing - Attempts", "Passing Attempts")
    consistency_sheet = consistency_sheet.replace("Passing - Interceptions", "Interceptions")
    consistency_sheet = consistency_sheet.replace("Passing - Yards", "Passing Yards")
    consistency_sheet = consistency_sheet.replace("Passing - Touchdowns", "Passing Touchdowns")
    consistency_sheet = consistency_sheet.replace("Rushing and Receiving Yards", "Rushing & Receiving Yards")
    consistency_sheet = consistency_sheet.replace("PR", "Points & Rebounds")
    consistency_sheet = consistency_sheet.replace("PA", "Points & Assists")
    consistency_sheet = consistency_sheet.replace("PAR", "Points, Rebounds & Assists")
    consistency_sheet = consistency_sheet.replace("RA", "Rebounds & Assists")
    consistency_sheet = consistency_sheet.replace("SB", "Steals & Blocks")

    consistency_sheet["Line"] = pd.to_numeric(consistency_sheet["Line"])
    consistency_sheet[f"Hit %"] = pd.to_numeric(consistency_sheet[f"L{games_back} Hit %"])
    consistency_sheet[f"Mean"] = pd.to_numeric(consistency_sheet[f"L{games_back} Mean"]).round(2)
    consistency_sheet = consistency_sheet.loc[consistency_sheet[f"L{games_back} Hit %"] >= 100]

    consistency_sheet = consistency_sheet.rename({"Player Name": "Player_Name"}, axis=1)


    teams = game.split(" vs. ")
    print(teams)
    team1 = teams[0]
    team2 = teams[1]

    consistency_sheet1 = consistency_sheet.loc[consistency_sheet["Team"] == team1]
    consistency_sheet2 = consistency_sheet.loc[consistency_sheet["Team"] == team2]
    print(consistency_sheet)
    print(consistency_sheet1)
    print(consistency_sheet2)
    consistency_sheet1 = consistency_sheet1[["Player_Name", "Prop", "Line", "Mean"]]
    consistency_sheet2 = consistency_sheet2[["Player_Name", "Prop", "Line", "Mean"]]

    consistency_sheet1 = consistency_sheet1.sort_values(by=['Player_Name'])
    consistency_sheet2 = consistency_sheet2.sort_values(by=['Player_Name'])

    context["league"] = league
    context["consistency_sheet1"] = consistency_sheet1
    context["consistency_sheet2"] = consistency_sheet2
    context["team1"] = team1
    context["team2"] = team2
    context["game"] = game
    context["games"] = games
    context["games_back"] = games_back
    context["games_back_list"] = [2,3,4,5,6,7,8,9,10]

    if league.upper() == "NBA":
        sport_type = "basketball"
    elif league.upper() == "MLB":
        sport_type = "baseball"
    elif league.upper() == "NFL":
        sport_type = "football"
    elif league.upper() == "NHL":
        sport_type = "hockey"
    else:
        sport_type = ""
    context['sport_type'] = sport_type
    context['sport_image'] = f"https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/{sport_type}.png"

    return render(request, 'ps_sheet.html', context)

def prop_sheet(request, sport_name, sort="Robot"):
    context = {}
    #checks if user has Predict+ access
    is_user_group = False
    is_user_group = request.user.groups.filter(name__in=['data_access_user', 'admin_user', 'moderator_user']).exists()
    if sport_name:
        try:
            s3_file_path = 'props/{}_prop_sheet.csv'.format(sport_name.lower())

            client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                  aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
            csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                        Key=s3_file_path)
            body = csv_obj['Body']
            csv_string = body.read().decode('utf-8')
            prop_sheet = pd.read_csv(StringIO(csv_string))

            prop_sheet["Mean"] = prop_sheet["Mean"].round(2)
            prop_sheet["Projection"] = prop_sheet["Projection"].round(2)
            prop_sheet["Over Count"] = prop_sheet["Over Count"].astype(int)
            prop_sheet["Under Count"] = prop_sheet["Under Count"].astype(int)
            prop_sheet["Under ML"] = prop_sheet["Under ML"].astype(int)
            prop_sheet["Over ML"] = prop_sheet["Over ML"].astype(int)

            games = prop_sheet["Game"].drop_duplicates()
            players = prop_sheet["Player Name"].drop_duplicates()
            props = prop_sheet["Prop"].drop_duplicates().sort_values()
            robot_likes = prop_sheet["Robot Likes"].drop_duplicates()

            columns = [
                "Game",
                "Player Name",
                "Prop",
                "Line",
                "Over ML",
                "Under ML",
                "Projection",
                "Mean",
                "Median",
                "Over Count",
                "Under Count",
                "Robot Likes"
            ]

            prop_sheet = prop_sheet[columns]

            columns = [
                "Game",
                "Player Name",
                "Prop",
                "Line",
                "Projection",
                "Robot Likes"
            ]

            prop_sheet_mobile = prop_sheet[columns]

            if len(prop_sheet.index) > 0:

                max_over_ml = prop_sheet["Over ML"].max()
                min_over_ml = prop_sheet["Over ML"].min()

                max_under_ml = prop_sheet["Under ML"].max()
                min_under_ml = prop_sheet["Under ML"].min()

                max_line = prop_sheet["Line"].max()
                min_line = prop_sheet["Line"].min()

                if sort == "Over":
                    prop_sheet.sort_values(by=['Over Count'], ascending=False, inplace=True)
                elif sort == "Under":
                    prop_sheet.sort_values(by=['Under Count'], ascending=False, inplace=True)
                elif sort == "Projection":
                    prop_sheet.sort_values(by=['Projection'], ascending=False, inplace=True)
                context["sort"] = sort
                context["max_over_ml"] = max_over_ml
                context["min_over_ml"] = min_over_ml
                context["max_under_ml"] = max_under_ml
                context["min_under_ml"] = min_under_ml
                context["max_line"] = max_line
                context["min_line"] = min_line
                context['sport_name'] = sport_name
                context['sport_name_lower'] = sport_name.lower()
                context['todays_props'] = prop_sheet.to_html(index=False).replace("<table", "<table id='myTable' ").replace("&lt;", "<").replace("&gt;", ">")
                context['todays_props_mobile'] = prop_sheet_mobile.to_html(index=False).replace("<table", "<table id='myTableMobile' ").replace("&lt;", "<").replace("&gt;", ">")
                context['success'] = True
                context['games'] = games
                context['players'] = players
                context['props'] = props
                context['robot_likes'] = robot_likes
                if sport_name == "NBA":
                    sport_type = "basketball"
                elif sport_name == "MLB":
                    sport_type = "baseball"
                elif sport_name == "NFL":
                    sport_type = "football"
                elif sport_name == "NHL":
                    sport_type = "hockey"
                else:
                    sport_type = ""
                context['sport_type'] = sport_type
                context['sport_image'] = f"https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/{sport_type}.png"
            else:
                context['success'] = False
        except Exception as e:
            print(e)
            context['success'] = False
    else:
        context['success'] = False

    return render(request, 'prop_sheet.html', context)

def hr_sheet(request, sort="Robot"):

    context = {}

    try:
        s3_file_path = 'props/hr_sheet.csv'

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                    Key=s3_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        prop_sheet = pd.read_csv(StringIO(csv_string))

        prop_sheet["Mean"] = prop_sheet["Mean"].round(2)
        prop_sheet["Projection"] = prop_sheet["Projection"].round(2)
        prop_sheet["Projected ML"] = prop_sheet["Projected ML"].astype(int)
        prop_sheet["Over Count"] = prop_sheet["Over Count"].astype(int)
        prop_sheet["Under Count"] = prop_sheet["Under Count"].astype(int)
        prop_sheet["ML"] = prop_sheet["Draftkings Moneyline"].astype(int)

        games = prop_sheet["Game"].drop_duplicates()
        players = prop_sheet["Player Name"].drop_duplicates()
        props = prop_sheet["Prop"].drop_duplicates().sort_values()
        robot_likes = prop_sheet["Robot Likes"].drop_duplicates()

        if len(prop_sheet.index) > 0:

            max_ml = prop_sheet["ML"].max()
            min_ml = prop_sheet["ML"].min()

            if sort == "Over":
                prop_sheet.sort_values(by=['Over Count'], ascending=False, inplace=True)
            elif sort == "Under":
                prop_sheet.sort_values(by=['Under Count'], ascending=False, inplace=True)
            elif sort == "Projection":
                prop_sheet.sort_values(by=['Projection'], ascending=False, inplace=True)
            context["sort"] = sort
            context["max_ml"] = max_ml
            context["min_ml"] = min_ml

            context['sport_name'] = "MLB"
            context['sport_name_lower'] = "mlb"

            # columns = [
            #     "Game",
            #     "Player Name",
            #     "ML",
            #     "Projected ML",
            #     "Projection",
            #     "Mean",
            #     "Median",
            #     "Over Count",
            #     "Under Count",
            #     "Robot Likes"
            # ]

            columns = [
                "Game",
                "Player Name",
                "ML",
                "Mean",
                "Median",
                "Over Count",
                "Under Count",
                "Robot Likes"
            ]

            prop_sheet = prop_sheet[columns]

            # columns = [
            #     "Game",
            #     "Player Name",
            #     "ML",
            #     "Projected ML",
            #     "Projection",
            #     "Robot Likes"
            # ]

            columns = [
                "Game",
                "Player Name",
                "ML",
                "Mean",
                "Robot Likes"
            ]

            prop_sheet_mobile = prop_sheet[columns]

            context['todays_props'] = prop_sheet.to_html(index=False).replace("<table", "<table id='myTable' ").replace(
                "&lt;", "<").replace("&gt;", ">")
            context['todays_props_mobile'] = prop_sheet_mobile.to_html(index=False).replace("<table",
                                                                                            "<table id='myTableMobile' ").replace(
                "&lt;", "<").replace("&gt;", ">")
            context['success'] = True
            context['games'] = games
            context['players'] = players
            context['props'] = props
            context['robot_likes'] = robot_likes

            context['sport_type'] = "football"
            context['sport_image'] = f"https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/baseball.png"

            print("Made it to the end!!")
        else:
            context['success'] = False
    except Exception as e:
        print("ERROR!")
        print(e)
        pass

    return render(request, 'hr_sheet.html', context)

def anytime_td_sheet(request, sort="Robot"):

    context = {}

    try:
        s3_file_path = 'props/anytime_td_sheet.csv'

        client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                              aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
        csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                    Key=s3_file_path)
        body = csv_obj['Body']
        csv_string = body.read().decode('utf-8')
        prop_sheet = pd.read_csv(StringIO(csv_string))

        prop_sheet["Mean"] = prop_sheet["Mean"].round(2)
        prop_sheet["Projection"] = prop_sheet["Projection"].round(2)
        prop_sheet["Projected ML"] = prop_sheet["Projected ML"].astype(int)
        prop_sheet["Over Count"] = prop_sheet["Over Count"].astype(int)
        prop_sheet["Under Count"] = prop_sheet["Under Count"].astype(int)
        prop_sheet["ML"] = prop_sheet["Draftkings Moneyline"].astype(int)

        games = prop_sheet["Game"].drop_duplicates()
        players = prop_sheet["Player Name"].drop_duplicates()
        props = prop_sheet["Prop"].drop_duplicates().sort_values()
        robot_likes = prop_sheet["Robot Likes"].drop_duplicates()

        columns = [
            "Game",
            "Player Name",
            "ML",
            "Projected ML",
            "Projection",
            "Mean",
            "Median",
            "Over Count",
            "Under Count",
            "Robot Likes"
        ]

        prop_sheet = prop_sheet[columns]

        columns = [
            "Game",
            "Player Name",
            "ML",
            "Projected ML",
            "Projection",
            "Robot Likes"
        ]

        prop_sheet_mobile = prop_sheet[columns]

        if len(prop_sheet.index) > 0:

            max_ml = prop_sheet["ML"].max()
            min_ml = prop_sheet["ML"].min()

            if sort == "Over":
                prop_sheet.sort_values(by=['Over Count'], ascending=False, inplace=True)
            elif sort == "Under":
                prop_sheet.sort_values(by=['Under Count'], ascending=False, inplace=True)
            elif sort == "Projection":
                prop_sheet.sort_values(by=['Projection'], ascending=False, inplace=True)
            context["sort"] = sort
            context["max_ml"] = max_ml
            context["min_ml"] = min_ml

            context['sport_name'] = "NFL"
            context['sport_name_lower'] = "nfl"
            context['todays_props'] = prop_sheet.to_html(index=False).replace("<table", "<table id='myTable' ").replace(
                "&lt;", "<").replace("&gt;", ">")
            context['todays_props_mobile'] = prop_sheet_mobile.to_html(index=False).replace("<table",
                                                                                            "<table id='myTableMobile' ").replace(
                "&lt;", "<").replace("&gt;", ">")
            context['success'] = True
            context['games'] = games
            context['players'] = players
            context['props'] = props
            context['robot_likes'] = robot_likes

            context['sport_type'] = "football"
            context['sport_image'] = f"https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/football.png"

            print("Made it to the end!!")
        else:
            context['success'] = False
    except Exception as e:
        print("ERROR!")
        print(e)
        pass

    logger.info("ANYTIME_TD_SHEET {} {} {}".format(request.get_full_path(), get_ip(request), request.user.id))

    return render(request, 'anytime_td_sheet.html', context)

def pp_sheet(request, sport_name, sort="Robot"):
    context = {}
    #checks if user has Predict+ access
    is_user_group = False
    is_user_group = request.user.groups.filter(name__in=['data_access_user', 'admin_user', 'moderator_user']).exists()
    if sport_name:
        try:
            s3_file_path = 'props/{}_pp_sheet_complete.csv'.format(sport_name.lower())

            client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                  aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
            csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                        Key=s3_file_path)
            body = csv_obj['Body']
            csv_string = body.read().decode('utf-8')
            prop_sheet = pd.read_csv(StringIO(csv_string))

            prop_sheet["Mean"] = prop_sheet["Mean"].round(2)
            prop_sheet["Median"] = prop_sheet["Median"].round(2)
            prop_sheet["Projection"] = prop_sheet["Projection"].round(2)
            prop_sheet["Over Count"] = prop_sheet["Over Count"].astype(int)
            prop_sheet["Under Count"] = prop_sheet["Under Count"].astype(int)

            games = prop_sheet["Game"].drop_duplicates()
            players = prop_sheet["Player Name"].drop_duplicates()
            props = prop_sheet["Prop"].drop_duplicates().sort_values()
            robot_likes = prop_sheet["Robot Likes"].drop_duplicates()

            columns = [
                "Game",
                "Player Name",
                "Prop",
                "Line",
                "Projection",
                "Mean",
                "Median",
                "Over Count",
                "Under Count",
                "Robot Likes"
            ]

            prop_sheet = prop_sheet[columns]

            columns = [
                "Game",
                "Player Name",
                "Prop",
                "Line",
                "Projection",
                "Robot Likes"
            ]

            prop_sheet_mobile = prop_sheet[columns]

            if len(prop_sheet.index) > 0:

                max_line = prop_sheet["Line"].max()
                min_line = prop_sheet["Line"].min()

                if sort == "Over":
                    prop_sheet.sort_values(by=['Over Count'], ascending=False, inplace=True)
                elif sort == "Under":
                    prop_sheet.sort_values(by=['Under Count'], ascending=False, inplace=True)
                context["sort"] = sort
                context["max_line"] = max_line
                context["min_line"] = min_line
                context['sport_name'] = sport_name
                context['sport_name_lower'] = sport_name.lower()
                context['todays_props'] = prop_sheet.to_html(index=False).replace("<table", "<table id='myTable' ").replace("&lt;", "<").replace("&gt;", ">")
                context['todays_props_mobile'] = prop_sheet_mobile.to_html(index=False).replace("<table", "<table id='myTableMobile' ").replace("&lt;", "<").replace("&gt;", ">")
                context['success'] = True
                context['games'] = games
                context['players'] = players
                context['props'] = props
                context['robot_likes'] = robot_likes
                if sport_name.upper() == "NBA":
                    sport_type = "basketball"
                elif sport_name.upper() == "MLB":
                    sport_type = "baseball"
                elif sport_name.upper() == "NFL":
                    sport_type = "football"
                elif sport_name.upper() == "NHL":
                    sport_type = "hockey"
                else:
                    sport_type = ""
                context['sport_type'] = sport_type
                context['sport_image'] = f"https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/{sport_type}.png"
            else:
                context['success'] = False
        except Exception as e:
            print(e)
            context['success'] = False
    else:
        context['success'] = False

    return render(request, 'pp_sheet.html', context)

def underdog_sheet(request, sport_name, sort="Robot"):
    context = {}
    #checks if user has Predict+ access
    is_user_group = False
    is_user_group = request.user.groups.filter(name__in=['data_access_user', 'admin_user', 'moderator_user']).exists()
    if sport_name:
        try:
            s3_file_path = 'props/{}_underdog_sheet.csv'.format(sport_name.lower())

            client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                  aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
            csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                        Key=s3_file_path)
            body = csv_obj['Body']
            csv_string = body.read().decode('utf-8')
            prop_sheet = pd.read_csv(StringIO(csv_string))

            prop_sheet["Mean"] = prop_sheet["Mean"].round(2)
            prop_sheet["Median"] = prop_sheet["Median"].round(2)
            prop_sheet["Projection"] = prop_sheet["Projection"].round(2)
            prop_sheet["Over Count"] = prop_sheet["Over Count"].astype(int)
            prop_sheet["Under Count"] = prop_sheet["Under Count"].astype(int)

            games = prop_sheet["Game"].drop_duplicates()
            players = prop_sheet["Player Name"].drop_duplicates()
            props = prop_sheet["Prop"].drop_duplicates().sort_values()
            robot_likes = prop_sheet["Robot Likes"].drop_duplicates()

            columns = [
                "Game",
                "Player Name",
                "Prop",
                "Line",
                "Projection",
                "Mean",
                "Median",
                "Over Count",
                "Under Count",
                "Robot Likes"
            ]

            prop_sheet = prop_sheet[columns]

            columns = [
                "Game",
                "Player Name",
                "Prop",
                "Line",
                "Projection",
                "Robot Likes"
            ]

            prop_sheet_mobile = prop_sheet[columns]

            if len(prop_sheet.index) > 0:

                max_line = prop_sheet["Line"].max()
                min_line = prop_sheet["Line"].min()

                if sort == "Over":
                    prop_sheet.sort_values(by=['Over Count'], ascending=False, inplace=True)
                elif sort == "Under":
                    prop_sheet.sort_values(by=['Under Count'], ascending=False, inplace=True)
                context["sort"] = sort
                context["max_line"] = max_line
                context["min_line"] = min_line
                context['sport_name'] = sport_name
                context['sport_name_lower'] = sport_name.lower()
                context['todays_props'] = prop_sheet.to_html(index=False).replace("<table", "<table id='myTable' ").replace("&lt;", "<").replace("&gt;", ">")
                context['todays_props_mobile'] = prop_sheet_mobile.to_html(index=False).replace("<table", "<table id='myTableMobile' ").replace("&lt;", "<").replace("&gt;", ">")
                context['success'] = True
                context['games'] = games
                context['players'] = players
                context['props'] = props
                context['robot_likes'] = robot_likes

                if sport_name.upper() == "NBA":
                    sport_type = "basketball"
                elif sport_name.upper() == "MLB":
                    sport_type = "baseball"
                elif sport_name.upper() == "NFL":
                    sport_type = "football"
                elif sport_name.upper() == "NHL":
                    sport_type = "hockey"
                else:
                    sport_type = ""
                context['sport_type'] = sport_type
                context['sport_image'] = f"https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/{sport_type}.png"

            else:
                context['success'] = False
        except Exception as e:
            print(e)
            context['success'] = False
    else:
        context['success'] = False

    return render(request, 'underdog_sheet.html', context)


def thrive_sheet(request, sport_name):
    context = {}
    #checks if user has Predict+ access
    is_user_group = False
    is_user_group = request.user.groups.filter(name__in=['data_access_user', 'admin_user', 'moderator_user']).exists()
    if sport_name:
        try:
            s3_file_path = 'props/{}_thrive_sheet_complete.csv'.format(sport_name.lower())

            client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                  aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
            csv_obj = client.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3,
                                        Key=s3_file_path)
            body = csv_obj['Body']
            csv_string = body.read().decode('utf-8')
            prop_sheet = pd.read_csv(StringIO(csv_string))
            prop_sheet = prop_sheet.rename(columns={"contest_name": "Contest Name", "game": "Game", "prop": "Prop", "prop_value": "Line", "player_name": "Player Name", "over_points": "Over Points", "under_points": "Under Points"})
            prop_sheet["Mean"] = prop_sheet["Mean"].round(2)
            prop_sheet["Projection"] = prop_sheet["Projection"].round(2)
            prop_sheet["Over Count"] = prop_sheet["Over Count"].astype(int)
            prop_sheet["Under Count"] = prop_sheet["Under Count"].astype(int)
            prop_sheet["Under Points"] = prop_sheet["Under Points"].astype(int)
            prop_sheet["Over Points"] = prop_sheet["Over Points"].astype(int)
            contests = prop_sheet["Contest Name"].drop_duplicates()
            games = prop_sheet["Game"].drop_duplicates()
            players = prop_sheet["Player Name"].drop_duplicates()
            props = prop_sheet["Prop"].drop_duplicates().sort_values()
            robot_likes = prop_sheet["Robot Likes"].drop_duplicates()

            columns = [
                "Contest Name",
                "Game",
                "Player Name",
                "Prop",
                "Line",
                "Over Points",
                "Under Points",
                "Projection",
                "Mean",
                "Median",
                "Over Count",
                "Under Count",
                "Robot Likes"
            ]

            prop_sheet = prop_sheet[columns]

            columns = [
                "Game",
                "Player Name",
                "Prop",
                "Line",
                "Projection",
                "Robot Likes"
            ]

            prop_sheet_mobile = prop_sheet[columns].drop_duplicates().sort_values(["Game", "Player Name", "Prop", "Line"])

            if len(prop_sheet.index) > 0:

                max_over_ml = prop_sheet["Over Points"].max()
                min_over_ml = prop_sheet["Over Points"].min()

                max_under_ml = prop_sheet["Under Points"].max()
                min_under_ml = prop_sheet["Under Points"].min()

                max_line = prop_sheet["Line"].max()
                min_line = prop_sheet["Line"].min()

                context["max_over_ml"] = max_over_ml
                context["min_over_ml"] = min_over_ml
                context["max_under_ml"] = max_under_ml
                context["min_under_ml"] = min_under_ml
                context["max_line"] = max_line
                context["min_line"] = min_line
                context['sport_name'] = sport_name
                context['sport_name_lower'] = sport_name.lower()
                context['todays_props'] = prop_sheet.to_html(index=False).replace("<table", "<table id='myTable' ").replace("&lt;", "<").replace("&gt;", ">")
                context['todays_props_mobile'] = prop_sheet_mobile.to_html(index=False).replace("<table", "<table id='myTableMobile' ").replace("&lt;", "<").replace("&gt;", ">")
                context['success'] = True
                context['contests'] = contests
                context['games'] = games
                context['players'] = players
                context['props'] = props
                context['robot_likes'] = robot_likes

                if sport_name.upper() == "NBA":
                    sport_type = "basketball"
                elif sport_name.upper() == "MLB":
                    sport_type = "baseball"
                elif sport_name.upper() == "NFL":
                    sport_type = "football"
                elif sport_name.upper() == "NHL":
                    sport_type = "hockey"
                else:
                    sport_type = ""
                context['sport_type'] = sport_type
                context['sport_image'] = f"https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/{sport_type}.png"

            else:
                context['success'] = False
        except Exception as e:
            print(e)
            context['success'] = False
    else:
        context['success'] = False

    return render(request, 'thrive_sheet.html', context)

def get_predictions(request, pt, sport_name):

    context = {}
    #checks if user has Predict+ access
    is_user_group = False
    is_user_group = request.user.groups.filter(name__in=['data_access_user', 'admin_user', 'moderator_user']).exists()

    #Makes sure a sport is passed
    if sport_name:
        obj_sport_name = True
        try:
            obj = Sports_name.objects.get(name__iexact=sport_name)
        except:
            obj_sport_name = False
        if obj_sport_name:

            #gets the active data filename for the relevant sport
            active_datasheet_zip = obj.active_sheet_name
            active_line_csv = obj.active_line_csv_dataset

            sport_id = str(obj.id)
            user_id = str(request.user.id)
            user = request.user


            if active_datasheet_zip:
                # gets the most recent stats for the relevant sport
                session = boto3.session.Session(aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
                s3 = session.resource("s3")
                bucket = s3.Bucket(settings.AWS_STORAGE_BUCKET_NAME)
                s3_file_path = 'datafiles/' + active_datasheet_zip
                obj = bucket.Object(s3_file_path)

                if_data_sheet = True
                curr_data = dtale.global_state.get_data()

                datasheet_names_and_id = {}

                #MLB predict user data
                winner=None
                if sport_name == "MLB":
                    is_prediction_data = PredictMLBUserFormData.objects.filter(user=request.user.id).filter(predict_type=pt).order_by('-created')
                elif sport_name == "NFL" or sport_name=="NFL-CBS":
                    is_prediction_data = PredictNFLUserFormData.objects.filter(user=request.user.id).filter(predict_type=pt).order_by('-created')
                elif sport_name == "NBA":
                    is_prediction_data = PredictNBAUserFormData.objects.filter(user=request.user.id).filter(predict_type=pt).order_by('-created')
                elif sport_name == "NHL":
                    is_prediction_data = PredictNHLUserFormData.objects.filter(user=request.user.id).filter(predict_type=pt).order_by('-created')
                if is_prediction_data:
                    prediction = is_prediction_data[0]
                try:
                    if if_data_sheet:
                        #Only needs game and team stats to make predictions
                        only_use_this_csv = ['Team Stats','Game Stats']
                        with io.BytesIO(obj.get()["Body"].read()) as tf:
                            tf.seek(0)
                            with zipfile.ZipFile(tf, mode='r') as zipf:
                                for subfile in zipf.namelist():
                                    name_split = subfile.split('.')[0]
                                    proper_name = name_split.replace('_', ' ')
                                    if any(x in proper_name for x in only_use_this_csv):
                                        data = zipf.read(subfile)
                                        if ("Team Stats" in proper_name) and ("csv" in subfile):
                                            team_data = pd.read_csv(BytesIO(data), parse_dates=["Date"])
                                        elif ("Game Stats" in proper_name) and ("csv" in subfile):
                                            game_data = pd.read_csv(BytesIO(data), parse_dates=["Date"])
                        if is_prediction_data:

                            #gets stats user selected for preductions
                            selected_game_stats, selected_historic_stats = prediction.selected_stats()
                            with tempfile.TemporaryFile() as fp:

                                #gets user's model (pkl file)
                                s3_file_path = "predictions/{}_{}_{}.pkl".format(urllib.parse.quote(str(user)),urllib.parse.quote(str(prediction.model_name)),urllib.parse.quote(str(prediction.created)))

                                client = boto3.client('s3', aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                                                      aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'])
                                client.download_fileobj(Fileobj=fp, Bucket=os.environ['USER_CHARTS_BUCKET_S3'], Key=s3_file_path)
                                fp.seek(0)
                                top_pipe = joblib.load(fp)

                            #Gets the most current lines
                            s3_line_csv_file_path = 'linefiles/' + active_line_csv
                            client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID,aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY)
                            csv_obj = client.get_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=s3_line_csv_file_path)
                            body = csv_obj['Body']
                            csv_string = body.read().decode('utf-8')
                            all_lines = pd.read_csv(StringIO(csv_string))

                            #gets additional model info
                            model_name = prediction.model_name
                            model_type = prediction.model_type
                            prediction_stat = prediction.predict_type
                            games_back = int(prediction.predict_train)
                            years_back = int(prediction.predict_year)
                            last_game = prediction.last_game

                            #gets the last game that the model was trained on
                            last_played_game = game_data["Game ID"].max()
                            save_model = False

                            #if additional games have been played, the model needs to be updated and saved
                            if last_game < last_played_game:
                                save_model = True

                            #this likely can just be in the if statement above
                            top_pipe, last_game = prediction.model.update_model(game_data, team_data, top_pipe, model_name, prediction_stat, games_back, years_back, last_game, selected_historic_stats, selected_game_stats)

                            #saves model if necessary
                            if save_model:
                                with tempfile.TemporaryFile() as fp:
                                    joblib.dump(top_pipe, fp)
                                    fp.seek(0)
                                    # File send to S3
                                    s3_upload_path = "predictions/{}_{}_{}.pkl".format(urllib.parse.quote(str(user)),urllib.parse.quote(str(prediction.model_name)),urllib.parse.quote(str(prediction.created)))
                                    client = boto3.client('s3', aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                                                          aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'])
                                    client.put_object(ACL='public-read', Bucket=os.environ['USER_CHARTS_BUCKET_S3'],
                                                      Body=fp.read(), Key=s3_upload_path, ContentType='text/html', )

                            #builds prediction spreadsheet
                            prediction_game_spreadsheet, prediction_team_spreadsheet, last_game = prediction.model.build_prediction_spreadsheets(game_data, team_data, all_lines)

                            #gets train and test data
                            train_and_test_data = prediction.model.get_prediction_moving_averages(prediction_game_spreadsheet, prediction_team_spreadsheet, prediction_stat, games_back, model_name, last_game, selected_historic_stats, selected_game_stats)

                            #gets todays predictions
                            todays_predictions = prediction.model.predict_games(top_pipe, train_and_test_data, prediction_stat, prediction_game_spreadsheet, last_game, model_name)

                            #cleans up predictions based on sport and prediction type.  Also creates separate desktop and mobile tables.
                            if sport_name == "MLB":
                                todays_predictions.rename(columns={"Temperature": "Temp"}, inplace=True)
                            if pt == "Winner":
                                if sport_name == "MLB":
                                    todays_predictions.drop(["Game ID", "Season", "Point Spread", "Over-Under", "Visitor - Point Spread Moneyline", "Visitor - Point Spread Implied Odds", "Home - Point Spread Moneyline", "Home - Point Spread Implied Odds", 'Park Factor', 'Park Factor - wOBACon', 'Park Factor - xwOBACon', 'Park Factor - BACON', 'Park Factor - xBACON', 'Park Factor - Hard Hit', 'Park Factor - Runs', 'Park Factor - On Base Percentage', 'Park Factor - Hits', 'Park Factor - First Base', 'Park Factor - Second Base', 'Park Factor - Third Base', 'Park Factor - Home Runs', 'Park Factor - Bases on Balls', 'Park Factor - Strikeouts', 'Park Factor - Plate Appearances'], axis=1, inplace=True)
                                elif sport_name == "NBA":
                                    todays_predictions.drop(["Game ID", "Season Year", "Point Spread", "Over-Under"], axis=1, inplace=True)
                                elif sport_name == "NFL" or sport_name=="NFL-CBS":
                                    todays_predictions.drop(["Game ID", "Season Year", "Closing Spread", "Closing Over-Under"], axis=1, inplace=True)
                                    #todays_predictions = todays_predictions.drop(["Game ID", "Closing Spread", "Closing Over-Under"], axis=1)
                                    if sport_name=="NFL-CBS":
                                        def get_highest_prob(prob):
                                            if prob[0] > prob[1]:
                                                return prob[0]
                                            else:
                                                return prob[1]
                                        todays_predictions["Highest Probability"] = todays_predictions[["Prediction - Probability of Home being Winner", "Prediction - Probability of Visitor being Winner"]].apply(get_highest_prob, axis=1)
                                        todays_predictions["Rank"] = todays_predictions["Highest Probability"].rank(method='first', ascending=True).astype(int)
                                        todays_predictions.drop(["Highest Probability"], axis=1, inplace=True)
                                elif sport_name == "NHL":
                                    todays_predictions = todays_predictions.drop(["Game ID", "Season Year", "Closing Spread", "Closing Over-Under", "Visitor - Closing Spread Moneyline", "Visitor - Closing Spread Implied Odds", "Home - Closing Spread Moneyline", "Home - Closing Spread Implied Odds"], axis=1)
                                todays_predictions["Prediction - Probability of Visitor being Winner"] = (todays_predictions["Prediction - Probability of Visitor being Winner"] * 100).round(2).astype(str) + '%'
                                todays_predictions["Prediction - Probability of Home being Winner"] = (todays_predictions["Prediction - Probability of Home being Winner"] * 100).round(2).astype(str) + '%'
                                try:
                                    todays_predictions["Visitor - Implied Odds"] = (todays_predictions["Visitor - Implied Odds"]).round(2).astype(str) + '%'
                                    todays_predictions["Home - Implied Odds"] = (todays_predictions["Home - Implied Odds"]).round(2).astype(str) + '%'
                                except:
                                    todays_predictions["Visitor - Closing Implied Odds"] = (todays_predictions["Visitor - Closing Implied Odds"]).round(2).astype(str) + '%'
                                    todays_predictions["Home - Closing Implied Odds"] = (todays_predictions["Home - Closing Implied Odds"]).round(2).astype(str) + '%'
                            elif pt == "Winner Against The Spread":
                                if sport_name == "MLB":
                                    todays_predictions.drop(["Game ID", "Season", "Over-Under", "Visitor - Moneyline", "Visitor - Implied Odds", "Home - Moneyline", "Home - Implied Odds", 'Park Factor', 'Park Factor - wOBACon', 'Park Factor - xwOBACon', 'Park Factor - BACON', 'Park Factor - xBACON', 'Park Factor - Hard Hit', 'Park Factor - Runs', 'Park Factor - On Base Percentage', 'Park Factor - Hits', 'Park Factor - First Base', 'Park Factor - Second Base', 'Park Factor - Third Base', 'Park Factor - Home Runs', 'Park Factor - Bases on Balls', 'Park Factor - Strikeouts', 'Park Factor - Plate Appearances'], axis=1, inplace=True)
                                    try:
                                        todays_predictions["Visitor - Point Spread Implied Odds"] = (todays_predictions["Visitor - Point Spread Implied Odds"]).round(2).astype(str) + '%'
                                        todays_predictions["Home - Point Spread Implied Odds"] = (todays_predictions["Home - Point Spread Implied Odds"]).round(2).astype(str) + '%'
                                    except:
                                        pass
                                elif sport_name == "NBA":
                                    todays_predictions.drop(["Game ID", "Season Year", "Over-Under", "Visitor - Moneyline", "Visitor - Implied Odds", "Home - Moneyline", "Home - Implied Odds"], axis=1, inplace=True)
                                elif sport_name == "NFL" or sport_name=="NFL-CBS":
                                    todays_predictions.drop(["Game ID", "Season Year", "Closing Over-Under", "Visitor - Moneyline", "Visitor - Implied Odds", "Home - Moneyline", "Home - Implied Odds"], axis=1, inplace=True)

                                    if sport_name == "NFL-CBS":
                                        def get_highest_prob(prob):
                                            if prob[0] > prob[1]:
                                                return prob[0]
                                            else:
                                                return prob[1]
                                        todays_predictions["Highest Probability"] = todays_predictions[["Prediction - Probability of Home being Winner ATS","Prediction - Probability of Visitor being Winner ATS"]].apply(get_highest_prob, axis=1)
                                        todays_predictions["Rank"] = todays_predictions["Highest Probability"].rank(method='first', ascending=True).astype(int)
                                        todays_predictions.drop(["Highest Probability"],axis=1, inplace=True)
                                elif sport_name == "NHL":
                                    todays_predictions.drop(["Game ID", "Season Year", "Closing Over-Under", "Visitor - Closing Moneyline", "Visitor - Closing Implied Odds","Home - Closing Moneyline", "Home - Closing Implied Odds"], axis=1, inplace=True)
                                    try:
                                        todays_predictions["Visitor - Closing Spread Implied Odds"] = (todays_predictions["Visitor - Closing Spread Implied Odds"]).round(2).astype(str) + '%'
                                        todays_predictions["Home - Closing Spread Implied Odds"] = (todays_predictions["Home - Closing Spread Implied Odds"]).round(2).astype(str) + '%'
                                    except:
                                        pass
                                todays_predictions["Prediction - Probability of Visitor being Winner ATS"] = (todays_predictions["Prediction - Probability of Visitor being Winner ATS"] * 100).round(2).astype(str) + '%'
                                todays_predictions["Prediction - Probability of Home being Winner ATS"] = (todays_predictions["Prediction - Probability of Home being Winner ATS"] * 100).round(2).astype(str) + '%'
                                #todays_predictions["Visitor - Implied Odds"] = (todays_predictions["Visitor - Implied Odds"]).round(2).astype(str) + '%'
                                #todays_predictions["Home - Implied Odds"] = (todays_predictions["Home - Implied Odds"]).round(2).astype(str) + '%'
                                    #todays_predictions = todays_predictions.drop(["Game ID", "Closing Over-Under", "Visitor - Moneyline", "Visitor - Implied Odds", "Home - Moneyline", "Home - Implied Odds"], axis=1)
                            elif pt == "Over-Under Result":
                                if sport_name == "MLB":
                                    todays_predictions.drop(["Game ID",  "Season", "Point Spread", "Visitor - Moneyline", "Visitor - Implied Odds", "Visitor - Point Spread Moneyline", "Visitor - Point Spread Implied Odds", "Home - Moneyline", "Home - Implied Odds", "Home - Point Spread Moneyline", "Home - Point Spread Implied Odds", 'Park Factor', 'Park Factor - wOBACon', 'Park Factor - xwOBACon', 'Park Factor - BACON', 'Park Factor - xBACON', 'Park Factor - Hard Hit', 'Park Factor - Runs', 'Park Factor - On Base Percentage', 'Park Factor - Hits', 'Park Factor - First Base', 'Park Factor - Second Base', 'Park Factor - Third Base', 'Park Factor - Home Runs', 'Park Factor - Bases on Balls', 'Park Factor - Strikeouts', 'Park Factor - Plate Appearances'], axis=1, inplace=True)
                                elif sport_name == "NFL" or sport_name=="NFL-CBS":
                                    todays_predictions.drop(["Game ID", "Season Year", "Closing Spread", "Visitor - Moneyline", "Visitor - Implied Odds", "Home - Moneyline", "Home - Implied Odds"], axis=1, inplace=True)
                                elif sport_name == "NBA":
                                    todays_predictions.drop(["Game ID", "Season Year", "Point Spread", "Visitor - Moneyline", "Visitor - Implied Odds", "Home - Moneyline", "Home - Implied Odds"], axis=1, inplace=True)
                                elif sport_name == "NHL":
                                    todays_predictions.drop(["Game ID",  "Season Year", "Closing Spread", "Visitor - Closing Moneyline", "Visitor - Closing Implied Odds", "Visitor - Closing Spread Moneyline", "Visitor - Closing Spread Implied Odds", "Home - Closing Moneyline", "Home - Closing Implied Odds", "Home - Closing Spread Moneyline", "Home - Closing Spread Implied Odds"], axis=1, inplace=True)

                                todays_predictions["Prediction - Probability of Over"] = (todays_predictions["Prediction - Probability of Over"] * 100).round(2).astype(str) + '%'
                                todays_predictions["Prediction - Probability of Under"] = (todays_predictions["Prediction - Probability of Under"] * 100).round(2).astype(str) + '%'
                                #todays_predictions["Visitor - Implied Odds"] = (todays_predictions["Visitor - Implied Odds"]).round(2).astype(str) + '%'
                                #todays_predictions["Home - Implied Odds"] = (todays_predictions["Home - Implied Odds"]).round(2).astype(str) + '%'
                                #todays_predictions = todays_predictions.drop(["Game ID",  "Closing Spread", "Visitor - Moneyline", "Visitor - Implied Odds", "Home - Moneyline", "Home - Implied Odds"], axis=1)
                            prediction.last_game = last_game
                            prediction.save()

                            #get mobile predictions
                            if sport_name == "MLB":
                                todays_predictions_mobile = todays_predictions.drop(["Date", "Venue", "Temp", "Wind Speed", "Home - Starting Pitcher", "Visitor - Starting Pitcher"], axis=1)
                            else:
                                todays_predictions_mobile = todays_predictions.drop(["Date"], axis=1)
                            if pt == "Winner":
                                def get_highest_prob(prob):
                                    if prob[0] > prob[1]:
                                        return prob[0]
                                    else:
                                        return prob[1]
                                todays_predictions_mobile["Prediction Probability"] = todays_predictions_mobile[["Prediction - Probability of Home being Winner","Prediction - Probability of Visitor being Winner"]].apply(get_highest_prob,axis=1)
                                try:
                                    todays_predictions_mobile.drop(["Visitor - Implied Odds", "Home - Implied Odds", "Prediction - Probability of Home being Winner", "Prediction - Probability of Visitor being Winner"], axis=1, inplace=True)
                                except:
                                    todays_predictions_mobile.drop(["Visitor - Closing Implied Odds", "Home - Closing Implied Odds", "Prediction - Probability of Home being Winner", "Prediction - Probability of Visitor being Winner"], axis=1, inplace=True)
                                try:
                                    cols = list(todays_predictions_mobile.columns.values)
                                    cols.pop(cols.index('Rank'))
                                    todays_predictions_mobile = todays_predictions_mobile[cols + ['Rank']]
                                except:
                                    pass
                            elif pt == "Winner Against The Spread":
                                def get_highest_prob(prob):
                                    if prob[0] > prob[1]:
                                        return prob[0]
                                    else:
                                        return prob[1]
                                todays_predictions_mobile["Prediction Probability"] = todays_predictions_mobile[["Prediction - Probability of Home being Winner ATS","Prediction - Probability of Visitor being Winner ATS"]].apply(get_highest_prob,axis=1)
                                todays_predictions_mobile.drop(["Prediction - Probability of Home being Winner ATS","Prediction - Probability of Visitor being Winner ATS"], axis=1, inplace=True)
                                try:
                                    cols = list(todays_predictions_mobile.columns.values)
                                    cols.pop(cols.index('Rank'))
                                    todays_predictions_mobile = todays_predictions_mobile[cols + ['Rank']]
                                except:
                                    pass
                            elif pt == "Over-Under Result":
                                def get_highest_prob(prob):
                                    if prob[0] > prob[1]:
                                        return prob[0]
                                    else:
                                        return prob[1]
                                todays_predictions_mobile["Prediction Probability"] = todays_predictions_mobile[["Prediction - Probability of Over","Prediction - Probability of Under"]].apply(get_highest_prob,axis=1)
                                todays_predictions_mobile.drop(["Prediction - Probability of Over","Prediction - Probability of Under"], axis=1, inplace=True)

                        application = dtale_app.build_app(
                            "", host=dtale_app.ACTIVE_HOST, reaper_on=False, hide_shutdown=True,
                            github_fork=False
                        )
                except Exception as e:
                    logger.error(e)

                #Creating user instances dictionary for show data in UI
                data_id_and_names = {}
                for data_id in global_state.get_data():
                    user_sheet = user_id + "_"
                    if user_sheet in data_id:
                        name = (global_state.get_metadata(data_id) or {}).get('name')
                        data_id_and_names[data_id] = name

                context = {"user": user, "is_group": is_user_group, "user_id": user_id,
                        "datasheet_names_and_id": datasheet_names_and_id, "data_id_and_names": data_id_and_names,
                        "sport_name":sport_name}
                #Get All Sports Name
                sports_name = Sports_name.objects.all().values_list('name',flat=True)
                context['sports_name']=sports_name
                context['todays_predictions'] = todays_predictions.to_html(index=False)
                context['todays_predictions_mobile'] = todays_predictions_mobile.to_html(index=False)
                context['is_prediction_data']=prediction
                context['success'] = True
                #context['is_prop_master_user'] = check_prop_master_user(request.user)
    return request, context

@login_required
def help_index(request):
    context = {}
    is_user_group = check_user_groups(request.user)
    user_id = str(request.user.id)
    context['is_group'] = is_user_group
    #context['is_prop_master_user'] = check_prop_master_user(request.user)
    context['sports_name'] = Sports_name.objects.all().values_list('name', flat=True)
    context["user_id"] = user_id
    logger.info("{} {} {} {}".format(request.method, request.get_full_path(), get_ip(request), request.user.id))
    return render(request, 'help.html', context)


@login_required
def help_iframe(request):
    context = {}
    is_user_group = check_user_groups(request.user)
    user_id = str(request.user.id)
    context['is_group'] = is_user_group
    #context['is_prop_master_user'] = check_prop_master_user(request.user)
    context['sports_name'] = Sports_name.objects.all().values_list('name', flat=True)
    context["user_id"] = user_id
    logger.info("{} {} {} {}".format(request.method, request.get_full_path(), get_ip(request), request.user.id))
    return render(request, 'help-iframe.html', context)


@login_required
def home(request):
    user_id = str(request.user.id)
    context = {}
    #Get All Sports Name
    sports_name = Sports_name.objects.all().values_list('name',flat=True)
    context['sports_name']=sports_name
    is_user_group = check_user_groups(request.user)
    context['is_group'] = is_user_group
    #context['is_prop_master_user'] = check_prop_master_user(request.user)
    context['sports_name'] = Sports_name.objects.all().values_list('name', flat=True)
    context["user_id"] = user_id
    logger.info("{} {} {} {}".format(request.method, request.get_full_path(), get_ip(request), request.user.id))
    return render(request, 'home.html', context)


def getting_started(request):
    logger.info("{} {} {} {}".format(request.method, request.get_full_path(), get_ip(request), request.user.id))
    return render(request, 'getting_started.html')


def get_data_access(request):
    logger.info("{} {} {} {}".format(request.method, request.get_full_path(), get_ip(request), request.user.id))
    context = {}
    context['user'] = request.user


    #gets likes & comments trophies
    visible_user = request.user

    likes_count = 0
    posts = Post.objects.active().filter(author=visible_user).order_by('-publish')
    for post in posts:
        likes_count = likes_count + post.likes.count()

    context['likes'] = likes_count

    comment_likes_count = 0
    comments = Comment.objects.filter(author=visible_user).order_by('date_posted')
    for comment in comments:
        comment_likes_count = comment_likes_count + comment.likes.count()

    context['comment_likes'] = comment_likes_count

    all_likes = likes_count + comment_likes_count

    context['all_likes'] = all_likes

    likes_left = 100-all_likes

    context['likes_left'] = likes_left

    return render(request, 'get_data_access.html', context)

@login_required
def predict_mlb_form_data(request):
    if request.method == 'POST':
        predict_type = request.POST.getlist('predict_type')
        predict_year = request.POST.getlist('years')
        predict_train = request.POST.getlist('moving_avg')
        predict_stats = request.POST.getlist('predict_stats_checks')
        model_name = request.POST.get('model_name')
        obj = PredictMLBUserFormData.objects.create(
            user = request.user,
            predict_type = ','.join(predict_type), # that using extract list items and single string save to db
            predict_year = ','.join(predict_year),
            predict_train = ','.join(predict_train),
            predict_stats = ','.join(predict_stats),
            model_name = model_name,
        )
        obj.save()

        request.user.profile.models_built_today = request.user.profile.models_built_today+1
        request.user.profile.save()

        user_id = str(request.user.id)
        context = {}
        # Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name', flat=True)
        context['sports_name'] = sports_name
        is_user_group = check_user_groups(request.user)
        context['is_group'] = is_user_group
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        context["user_id"] = user_id
        context["sport_name"] = "MLB"
        context["predict_type"] = predict_type
        try:
            context["new_notifications"] = (Notification.objects.filter(user=request.user).exclude(sender=request.user).exclude(is_seen=True).count() > 0)
            context["notification_count"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).count()
            context["recent_notifications"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).order_by('-date')[:4]
        except:
            context["new_notifications"] = False
            context["notification_count"] = 0
            context["recent_notifications"] = []
        #return redirect('/predict/MLB/')
        return render(request, 'building_model.html', context)

@login_required
def predict_nfl_form_data(request):
    if request.method == 'POST':
        predict_type = request.POST.getlist('predict_type')
        predict_year = request.POST.getlist('years')
        predict_train = request.POST.getlist('moving_avg')
        predict_stats = request.POST.getlist('predict_stats_checks')
        model_name = request.POST.get('model_name')
        obj = PredictNFLUserFormData.objects.create(
            user = request.user,
            predict_type = ','.join(predict_type), # that using extract list items and single string save to db
            predict_year = ','.join(predict_year),
            predict_train = ','.join(predict_train),
            predict_stats = ','.join(predict_stats),
            model_name = model_name,
        )
        obj.save()

        request.user.profile.models_built_today = request.user.profile.models_built_today+1
        request.user.profile.save()

        user_id = str(request.user.id)
        context = {}
        # Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name', flat=True)
        context['sports_name'] = sports_name
        is_user_group = check_user_groups(request.user)
        context['is_group'] = is_user_group
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        context["user_id"] = user_id
        context["sport_name"] = "NFL"
        context["predict_type"] = predict_type
        try:
            context["new_notifications"] = (Notification.objects.filter(user=request.user).exclude(sender=request.user).exclude(is_seen=True).count() > 0)
            context["notification_count"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).count()
            context["recent_notifications"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).order_by('-date')[:4]
        except:
            context["new_notifications"] = False
            context["notification_count"] = 0
            context["recent_notifications"] = []
        return render(request, 'building_model.html', context)

@login_required
def predict_nfl_cbs_form_data(request):
    if request.method == 'POST':
        predict_type = request.POST.getlist('predict_type')
        predict_year = request.POST.getlist('years')
        predict_train = request.POST.getlist('moving_avg')
        predict_stats = request.POST.getlist('predict_stats_checks')
        model_name = request.POST.get('model_name')
        obj = PredictNFLUserFormData.objects.create(
            user = request.user,
            predict_type = ','.join(predict_type), # that using extract list items and single string save to db
            predict_year = ','.join(predict_year),
            predict_train = ','.join(predict_train),
            predict_stats = ','.join(predict_stats),
            model_name = model_name,
        )
        obj.save()

        request.user.profile.models_built_today = request.user.profile.models_built_today+1
        request.user.profile.save()

        user_id = str(request.user.id)
        context = {}
        # Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name', flat=True)
        context['sports_name'] = sports_name
        is_user_group = check_user_groups(request.user)
        context['is_group'] = is_user_group
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        context["user_id"] = user_id
        context["sport_name"] = "NFL-CBS"
        context["predict_type"] = predict_type
        try:
            context["new_notifications"] = (Notification.objects.filter(user=request.user).exclude(sender=request.user).exclude(is_seen=True).count() > 0)
            context["notification_count"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).count()
            context["recent_notifications"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).order_by('-date')[:4]
        except:
            context["new_notifications"] = False
            context["notification_count"] = 0
            context["recent_notifications"] = []
        return render(request, 'building_model.html', context)

@login_required
def predict_nba_form_data(request):
    if request.method == 'POST':
        predict_type = request.POST.getlist('predict_type')
        predict_year = request.POST.getlist('years')
        predict_train = request.POST.getlist('moving_avg')
        predict_stats = request.POST.getlist('predict_stats_checks')
        model_name = request.POST.get('model_name')
        obj = PredictNBAUserFormData.objects.create(
            user = request.user,
            predict_type = ','.join(predict_type), # that using extract list items and single string save to db
            predict_year = ','.join(predict_year),
            predict_train = ','.join(predict_train),
            predict_stats = ','.join(predict_stats),
            model_name = model_name,
        )
        obj.save()

        request.user.profile.models_built_today = request.user.profile.models_built_today+1
        request.user.profile.save()

        user_id = str(request.user.id)
        context = {}
        # Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name', flat=True)
        context['sports_name'] = sports_name
        is_user_group = check_user_groups(request.user)
        context['is_group'] = is_user_group
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        context["user_id"] = user_id
        context["sport_name"] = "NBA"
        context["predict_type"] = predict_type
        try:
            context["new_notifications"] = (Notification.objects.filter(user=request.user).exclude(sender=request.user).exclude(is_seen=True).count() > 0)
            context["notification_count"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).count()
            context["recent_notifications"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).order_by('-date')[:4]
        except:
            context["new_notifications"] = False
            context["notification_count"] = 0
            context["recent_notifications"] = []
        return render(request, 'building_model.html', context)

@login_required
def predict_nhl_form_data(request):
    if request.method == 'POST':
        predict_type = request.POST.getlist('predict_type')
        predict_year = request.POST.getlist('years')
        predict_train = request.POST.getlist('moving_avg')
        predict_stats = request.POST.getlist('predict_stats_checks')
        model_name = request.POST.get('model_name')
        obj = PredictNHLUserFormData.objects.create(
            user = request.user,
            predict_type = ','.join(predict_type), # that using extract list items and single string save to db
            predict_year = ','.join(predict_year),
            predict_train = ','.join(predict_train),
            predict_stats = ','.join(predict_stats),
            model_name = model_name,
        )
        obj.save()

        request.user.profile.models_built_today = request.user.profile.models_built_today+1
        request.user.profile.save()

        user_id = str(request.user.id)
        context = {}
        # Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name', flat=True)
        context['sports_name'] = sports_name
        is_user_group = check_user_groups(request.user)
        context['is_group'] = is_user_group
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        context["user_id"] = user_id
        context["sport_name"] = "NHL"
        context["predict_type"] = predict_type
        try:
            context["new_notifications"] = (Notification.objects.filter(user=request.user).exclude(sender=request.user).exclude(is_seen=True).count() > 0)
            context["notification_count"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).count()
            context["recent_notifications"] = Notification.objects.filter(user=request.user).exclude(sender=request.user).order_by('-date')[:4]
        except:
            context["new_notifications"] = False
            context["notification_count"] = 0
            context["recent_notifications"] = []
        return render(request, 'building_model.html', context)
      

@login_required
def activate_line_dataset(request):
    context = {}
    is_admin_group = request.user.groups.filter(name__in=['admin_user']).exists()
    if is_admin_group:
        obj_s3_files = LineSpreadsheetUpload.objects.all().order_by('-date_uploaded')
        all_csv_files = []
        if obj_s3_files:
            for files in obj_s3_files:
                raw_file_name = files.file
                file_id = str(files.id)
                file_name =raw_file_name.split("linefiles/")[-1].strip()
                if '.csv' in file_name:
                    all_csv_files.append(file_name)

        # active_csv = ActiveLineDatafilesCsv.objects.filter(status="True").values_list('data_csv_name',flat=True)

        is_user_group = check_user_groups(request.user)
        #Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name',flat=True)
        context['sports_name']=sports_name
        #Get Active zip sheet names and sport
        # active_sports_and_sheets = Sports_name.objects.values('name','active_sheet_name')

        context['is_group']=is_user_group
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        context['all_csv_files']=all_csv_files
        # context['active_sports_and_sheets']=active_sports_and_sheets
        # context['activate_csv']=active_csv
        logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
        return render(request, "active_line_csv_dataset.html", context)
    return redirect("/")

def change_active_line_csv_status(request):
    logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
    if request.method == "POST":
        selected = request.POST.get('optradio')
        selected_sport = request.POST.get('select_sport_name')
        try:
            obj_sport_name = Sports_name.objects.get(name__iexact=selected_sport)
        except:
            obj_sport_name = None
        if obj_sport_name:
            obj_sport_name.active_line_csv_dataset=selected
            obj_sport_name.save()
            logger.info("ACTIVE_LINE_DATASET_CHANGE {} {} {}".format(request.get_full_path(), get_ip(request),request.user.id))
            messages.success(request, 'CSV status changed successfully')
            return redirect(reverse('change_active_line_csv_status'))
        else:
            messages.warning(request, 'Something  Wrong.. Please try again!')
        return redirect(reverse('change_active_line_csv_status'))
    else:
        return redirect(reverse('activate_line_dataset'))

def check_instance(request, instance_id):
    dtypes = global_state.get_dtypes(instance_id)
    if dtypes is None:
        return JsonResponse('Failure', safe=False)
    else:
        return JsonResponse('Success', safe=False)


@login_required
def ListDatafilesS3(request):
    is_admin = request.user.groups.filter(name__in=['admin_user']).exists()
    if is_admin:
        if request.method == 'POST':
            s3_client = boto3.client('s3',
                                     aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
                                     aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY, )
            seleted_datafiles = request.POST.getlist('selected_datafiles')
            seleted_linefiles = request.POST.getlist('selected_linefiles')
            if len(seleted_datafiles):
                for i in seleted_datafiles:
                    delete = s3_client.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=i)
                    S3ZipUpload.objects.filter(file__endswith=i).delete()
            if len(seleted_linefiles):
                for i in seleted_linefiles:
                    delete = s3_client.delete_object(Bucket=settings.AWS_STORAGE_BUCKET_NAME, Key=i)
                    LineSpreadsheetUpload.objects.filter(file__endswith=i).delete()
            messages.success(request, 'Files Deleted successfully')
            return redirect('delete_datafiles_s3')

        s3_resource = boto3.resource('s3')
        bucket = s3_resource.Bucket(settings.AWS_STORAGE_BUCKET_NAME)
        datafiles = bucket.objects.filter(Prefix='datafiles/')
        linefiles = bucket.objects.filter(Prefix='linefiles/')
        context = {'datafiles': datafiles, 'linefiles': linefiles}
        return render(request, 'ListOfDatafilesS3.html', context)

    else:
        return redirect("/")


def health_check(request):
    context = {}
    return render(request, 'health.html', context)