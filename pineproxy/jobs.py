from pineproxy.models import Test_Schedule_Tasks
from users.models import Profile
import datetime
from datetime import date, timedelta
from blog.models import Post

from dtale.views import startup
import dtale.global_state as global_state
from django.conf import settings
import boto3
from io import BytesIO, StringIO
import logging, traceback
import pandas as pd
import concurrent.futures
from .models import *

from users.models import PropMaster
import dateutil.parser as parser
from notifications.models import UserNotification as Notification

logger = logging.getLogger('django')

def test_task():
    print('RUNNING JOB test_task TASK')
    Test_Schedule_Tasks.objects.create(name='test')

def ResetModelsBuiltTodayAsync():
    obj = Profile.objects.all()
    obj.update(models_built_today=0)
    print(f'RUNNING JOB ResetModelsBuiltTodayAsync {datetime.datetime.now()}')

def Add_Sheet(data_type, proper_name, id):
    startup("", data=data_type, name=proper_name, allow_cell_edits=False, data_id=id)

def Reset_Instances():
    counter_one = 1
    counter_two = 1
    print("Resetting Instances")
    while (counter_one <= 4):
        while (counter_two <= 4):
            try:
                global_state.cleanup("10000000000{}_{}".format(str(counter_one), str(counter_two)))
            except:
                pass
            counter_two = counter_two+1

        counter_one = counter_one+1
        counter_two = 1

def process_profile(profile):

    try:
        date_joined = profile.user.date_joined.strftime('%Y-%m-%d %H:%M:%S')
    except:
        date_joined = None

    try:
        last_login = profile.user.last_login.strftime('%Y-%m-%d %H:%M:%S')
    except:
        last_login = None

    profile_data = {
        'user_id': profile.user.id,
        'username': profile.user.username,
        'email': profile.user.email,
        'date_joined': date_joined,
        'last_login': last_login,
        'bio': profile.bio,
        'twitter_url': profile.twitter_url,
        'discord_username': profile.discord_Username,
        'phone_number': str(profile.phone_number),
        'follower_count': profile.follower_count,
        'following_count': profile.following_count,
    }

    print(profile_data)
    return profile_data

def Get_Users():

    print("Getting users")
    profiles = Profile.objects.select_related('user').all()
    data = []

    with concurrent.futures.ThreadPoolExecutor() as executor:
        results = list(executor.map(process_profile, profiles))

    for result in results:
        data.append(result)

    users_df = pd.DataFrame(data)

    # File send to S3
    csv_buffer = StringIO()
    users_df.to_csv(csv_buffer, index=False)
    filename = "users.csv"
    s3_upload_path = 'databases/' + filename
    client = boto3.client('s3', aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                          aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'])
    client.put_object(ACL='public-read',
                      Bucket=os.environ['USER_CHARTS_BUCKET_S3'], Body=csv_buffer.getvalue(),
                      Key=s3_upload_path,
                      ContentType='text/html', )

    print("Uploaded users")



def Get_Leaderboards():

    print("Getting Leaderboards")

    sports_names = ["MLB", "NBA", "NFL", "NHL"]
    predict_types = ["Winner", "Winner Against The Spread", "Over-Under Result"]
    predict_leaderboards = pd.DataFrame()

    for sport_name in sports_names:
        for pt in predict_types:
            if "MLB" in sport_name:
                leaderboard = PredictMLBUserFormData.objects.filter(predict_type=pt).order_by('-created')
            elif "NFL" in sport_name:
                leaderboard = PredictNFLUserFormData.objects.filter(predict_type=pt).order_by('-created')
            elif "NBA" in sport_name:
                leaderboard = PredictNBAUserFormData.objects.filter(predict_type=pt).order_by('-created')
            elif "NHL" in sport_name:
                leaderboard = PredictNHLUserFormData.objects.filter(predict_type=pt).order_by('-created')
            print("Got Models for {} {}".format(sport_name, pt))
            user_names = []
            model_names = []
            model_scores = []

            for item in leaderboard:
                if str(item.user) != "pine-admin":
                    user_names.append(item.user)
                    model_names.append(item.model_name)
                    model_scores.append(item.model_score_percentage())
            print("Got all usernames")
            leaderboard_pd = pd.DataFrame(data={"Member": user_names, "Model Name": model_names, "Model Score": model_scores})
            leaderboard_pd.drop_duplicates(subset=['Member'], keep='first', inplace=True)
            leaderboard_pd.sort_values(by=['Model Score'], ascending=False, inplace=True)
            leaderboard_pd["Rank"] = leaderboard_pd.rank(method='first', ascending=False).astype(int)
            leaderboard_pd = leaderboard_pd.head(10)
            leaderboard_pd["Sport"] = sport_name
            leaderboard_pd["Predict Type"] = pt
            columns = ["Sport", "Predict Type", "Rank", "Member", "Model Score"]
            leaderboard_pd["Model Score"] = leaderboard_pd["Model Score"].astype(str) + '%'
            leaderboard_pd = leaderboard_pd[columns]
            predict_leaderboards = predict_leaderboards.append(leaderboard_pd)
            print("Made leaderboard")

    # File send to S3
    csv_buffer = StringIO()
    predict_leaderboards.to_csv(csv_buffer, index=False)
    filename = "predict_leaderboards.csv"
    s3_upload_path = 'leaderboards/' + filename
    s3 = boto3.resource('s3')
    client = boto3.client('s3', aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                          aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'])
    client.put_object(ACL='public-read',
                      Bucket=os.environ['USER_CHARTS_BUCKET_S3'], Body=csv_buffer.getvalue(),
                      Key=s3_upload_path,
                      ContentType='text/html', )

    print("Uploaded leaderboards")

def Get_Last_Week_Trophies():
    print("Getting last week's trophies")
    users = User.objects.order_by('username')
    today = date.today().strftime('%Y-%m-%d')
    last_week = (date.today() - timedelta(days=7)).strftime('%Y-%m-%d')

    last_weeks_trophies = pd.DataFrame()
    for user in users:
        posts = Post.objects.active().filter(author=user).filter(publish__range=[last_week, today]).order_by('-publish')
        likes_count = 0
        for post in posts:
            likes_count = likes_count + post.likes.count()
        if likes_count > 0:
            last_weeks_trophies = last_weeks_trophies.append({"Member": user, "Trophies": likes_count}, ignore_index=True)

    last_weeks_trophies.sort_values(by=["Trophies"], ascending=False, inplace=True)
    last_weeks_trophies["Rank"] = last_weeks_trophies["Trophies"].rank(method='min', ascending=False)

    columns = ["Rank", "Member", "Trophies"]
    last_weeks_trophies = last_weeks_trophies[columns]

    # File send to S3
    csv_buffer = StringIO()
    last_weeks_trophies.to_csv(csv_buffer, index=False)

    filename = "last_weeks_trophies.csv"
    s3_upload_path = 'leaderboards/' + filename
    s3 = boto3.resource('s3')
    client = boto3.client('s3', aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                          aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'])
    client.put_object(ACL='public-read',
                      Bucket=os.environ['USER_CHARTS_BUCKET_S3'], Body=csv_buffer.getvalue(),
                      Key=s3_upload_path,
                      ContentType='text/html', )

    print("Uploaded leaderboards")

def prop_game_complete_tag():
    print('RUNNING JOB prop_game_complete_tag TASK','datetime==',datetime.now())

    obj=PropMaster.objects.all().filter(game_completed=False).order_by('-game_date').distinct('game_date')
    game_date_list=list(set([i.game_date_only for i in obj])) # get unique date list

    completed_games_data = {} # all final game tag dict
    s3 = boto3.client('s3')
    #get all users game_date wise filename 
    for game_date in game_date_list:
        filename = 'props/{}_nba_games.csv'.format(game_date)        
        try:
            tester = s3.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3, Key=filename)
        except Exception as e:
            print(e)
        if tester:
            d = tester['Body'].read().decode('UTF-8')
            games = pd.read_csv(StringIO(d))
            games.columns = games.columns.str.replace(' ', '_')
            completed_games=games['Status']=='Final'
            selected_col = games[completed_games][['Date','Game','Status']]
            completed_games_data[game_date]=selected_col


    for key,value in completed_games_data.items():
        for index, row in value.iterrows():
            pd_date = row['Date']
            date = parser.parse(pd_date) #convert pandas datetime to django datetime
            game_date = date - timedelta(hours=5)
            game_name = row['Game']
            # custom_date = parser.parse('2022-02-27T00:30Z')
            PropMaster.objects.filter(game_date__date=game_date.date(),game_name=game_name).update(game_completed=True) # update game completed field


def prop_master_score_update():
    print('RUNNING JOB prop_master_score_update TASK','datetime==',datetime.now())
    obj=PropMaster.objects.filter(game_completed=True,challenge_accepted=True, game_setttled=False)
    
    for data in obj:
        try:   
            print("id==",data.id)
            print("uid==",data.uid)
            game_name = data.game_name
            player1_email = data.player1_email
            player2_email = data.player2_email
            game_date_only = data.game_date_only
        
            player1_name = data.player1_name
            player2_name = data.player2_name

            player1_score=0
            player2_score=0
            player1_locked_score=0
            player2_locked_score=0
            player1_tiebreak_score = 0
            player2_tiebreak_score = 0

            p1_choices = []
            p2_choices = []
            for i in data.props_data[player1_email]:
                d = {'Player Name': i['Player_Name'], 'Prop': i['Prop'], 'Line': i['Line'], data.player1_name: i['Selection']}
                p1_choices.append(d)

            player1_choices = pd.DataFrame(p1_choices)

            for i in data.props_data[player2_email]:
                d = {'Player Name': i['Player_Name'], 'Prop': i['Prop'], 'Line': i['Line'], data.player2_name: i['Selection']}
                p2_choices.append(d)

            player2_choices = pd.DataFrame(p2_choices)

            generated_dataframe = pd.merge(player1_choices, player2_choices, on=['Player Name', 'Prop', 'Line'], how='left')

            s3 = boto3.client('s3')
            filename = 'props/{}_nba_prop_scores.csv'.format(game_date_only)

            try:
                tester = s3.get_object(Bucket=settings.USER_CHARTS_BUCKET_S3, Key=filename)
            except Exception as e:
                print(e)
            if tester:
                d = tester['Body'].read().decode('UTF-8')
                props = pd.read_csv(StringIO(d))

                props = props[props["Game"] == game_name]

                props = props[["Player Name", "Prop", "Score"]]

                generated_dataframe = pd.merge(generated_dataframe, props, on=['Player Name', 'Prop'], how='left')
                generated_dataframe = generated_dataframe.dropna()

                def win_lose(data):
                    try:
                        line = float(data[0])
                        score = float(data[1])
                        choice = data[2]
                        if score > line:
                            winning = "Over"
                        elif score < line:
                            winning = "Under"
                        else:
                            winning = "Push"

                        if winning in choice:
                            if choice == "Over":
                                choice_html = '<span class="locked">{}</span>'.format(choice)
                            else:
                                choice_html = '<span class="winning">{}</span>'.format(choice)
                        elif winning == "Push":
                            choice_html = choice
                        else:
                            choice_html = '<span class="losing">{}</span>'.format(choice)
                        return choice_html
                    except Exception as e:
                        print("EXCEPTION")
                        print(e)
                        return data[2]
                generated_dataframe[player1_name] = generated_dataframe[["Line", "Score", player1_name]].apply(win_lose, axis=1)

                generated_dataframe[player2_name] = generated_dataframe[["Line", "Score", player2_name]].apply(win_lose, axis=1)

                columns = ['Player Name',"Prop",'Line','Score',player1_name,player2_name,]

                generated_dataframe = generated_dataframe[columns]

                for i, row in generated_dataframe.iterrows():
                    if float(row["Score"]) > float(row["Line"]):
                        winning = "Over"
                    elif float(row["Score"]) == float(row["Line"]):
                        winning = "Push"
                    else:
                        winning = "Under"

                    if winning in row[data.player1_name]:
                        player1_score = player1_score + 1
                        player1_tiebreak_score = player1_tiebreak_score + abs(float(row["Score"]) - float(row["Line"]))
                        if winning == "Over":
                            player1_locked_score = player1_locked_score + 1

                    if winning in row[data.player2_name]:
                        player2_score = player2_score + 1
                        player2_tiebreak_score = player2_tiebreak_score + abs(float(row["Score"]) - float(row["Line"]))
                        if winning == "Over":
                            player2_locked_score = player2_locked_score + 1

                if player1_score == player2_score:
                    if player1_tiebreak_score > player2_tiebreak_score:
                        player1_final_score = player1_score + 1
                        player2_final_score = player2_score
                    elif player1_tiebreak_score < player2_tiebreak_score:
                        player2_final_score = player2_score + 1
                        player1_final_score = player1_score
                    else:
                        player1_final_score = player1_score
                        player2_final_score = player2_score
                else:
                    player1_final_score = player1_score
                    player2_final_score = player2_score

                print("player1_score==",player1_score)
                print("player2_score==",player2_score)
                print("player1_final_score==",player1_final_score)
                print("player2_final_score==",player2_final_score)

                #save data in the database
                data.player1_score = player1_score
                data.player2_score = player2_score
                
                #get user obj
                player1 = User.objects.get(username=player1_name)
                player2 = User.objects.get(username=player2_name)

                if player1_final_score > player2_final_score:
                    data.winner = data.player1_name
                    #Notification send
                    notify = Notification(user=player1, sender=player2, Notification_type=7,prop_master_game=data,text_preview='you beat')
                    notify.save()
                elif player2_final_score > player1_final_score:
                    data.winner = data.player2_name
                    #Notification send
                    notify = Notification(user=player2, sender=player1, Notification_type=7,prop_master_game=data,text_preview='you beat')
                    notify.save()
                else:
                    data.winner = "Draw"
                    #Notification send
                    notify = Notification(user=player1, sender=player2, Notification_type=7,prop_master_game=data,text_preview='you tied')
                    notify.save()
                    notify = Notification(user=player2, sender=player1, Notification_type=7, prop_master_game=data,text_preview='you tied')
                    notify.save()
                data.game_setttled = True
                data.save()
                profile_obj = Profile.objects.filter(user__username__in=[player1_name,player2_name])
                for i in profile_obj:
                    i.prop_master_game_played.add(data)

        except Exception as e:
            print("Exception***=",e)
            pass
