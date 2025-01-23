from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from s3direct.fields import S3DirectField
from datetime import datetime, timedelta
import boto3
from io import StringIO

#ML Imports
import pandas as pd
pd.options.mode.chained_assignment = None  # default='warn'
import os

from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import ExtraTreesClassifier
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
#from sklearn_rvm import EMRVC

import joblib
import urllib
import tempfile

# Create your models here.
class DataFrame(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=256)
    file = models.FileField(upload_to="props_test/")
    created = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return self.name + "="+ str(self.id) + ","

class Sports_name(models.Model):
    name = models.CharField(max_length=200,unique=True)
    created = models.DateTimeField(default=timezone.now)
    active_sheet_name = models.CharField(max_length=255,null=True,blank=True)
    active_line_csv_dataset = models.CharField(max_length=255,blank=True,null=True)

    class Meta:
        ordering = ["-created"]

    def __str__(self):
        return self.name

#This class has all the modeling functions
class PredictionModel():

    def __init__(self, sport_name, user, model_name, model_score, active, model_type, predict_type, predict_year, predict_train, predict_stats, last_game):

        self.sport_name = sport_name
        self.user = user
        self.model_name = model_name
        self.model_score = model_score
        self.active = active
        self.model_type = model_type
        self.predict_type = predict_type
        self.predict_year = predict_year
        self.predict_predict_train = predict_train
        self.predict_stats = predict_stats
        self.last_game = last_game

    def get_moving_averages(self, team_data, prediction_stat, years_back, games_back, selected_game_stats, selected_historic_stats):

        print("GETTING MOVING AVERAGE DATA")
        print(years_back)

        if self.sport_name == "MLB" or self.sport_name == "NHL" or self.sport_name == "NBA":
            moving_average_year = 2021
        if self.sport_name == "NFL":
            moving_average_year = 2021

        if self.sport_name == "MLB":
            season_column = "Season"
        elif self.sport_name == "NFL" or self.sport_name == "NBA" or self.sport_name == "NHL":
            season_column = "Season Year"

        years_back = int(years_back)
        games_back = int(games_back)

        team_data = team_data.loc[team_data[season_column] >= moving_average_year-years_back-1]


        #Gets moving average and renames moving average columns to have ' - Moving Average' at the end and gets moving average
        selected_moving_average_stats = []
        for i in selected_historic_stats:
            column_string = i + " - Moving Average"
            selected_moving_average_stats.append(column_string)
            team_data[column_string] = team_data.groupby('Team')[i].transform(lambda x: x.rolling(games_back, 1).mean().shift(1))


        #Because we only have 5 years of data - remove next year
        if years_back != 4:
            team_data = team_data.loc[team_data[season_column] >= moving_average_year-years_back - 1]

        #Because we only have 5 years of data - remove next year
        if years_back == 4:
            team_data = team_data.loc[(team_data[season_column] > moving_average_year-years_back - 1) | (team_data["Team - Season Games Played"] >= games_back)]

        #This may not be necessary because I removed Home-Visitor from the selection choicelogistics
        if "Home-Visitor" in selected_game_stats:
            hv = True
            all_selected_stats = ["Game ID", "Game Name", "Team", "Opponent"] + selected_game_stats + [prediction_stat]+ selected_moving_average_stats
        else:
            hv = False
            all_selected_stats = ["Game ID", "Game Name",  "Team", "Opponent", "Home-Visitor"] + selected_game_stats + [prediction_stat]+ selected_moving_average_stats


        team_data = team_data.reset_index(drop=True)

        selected_data = team_data[all_selected_stats]


        return selected_data, team_data, hv

    def get_train_and_test_data(self, game_data, selected_data, prediction_stat, hv):

        if self.sport_name == "MLB":
            season_column = "Season"
        elif self.sport_name == "NFL" or self.sport_name == "NBA" or self.sport_name == "NHL":
            season_column = "Season Year"

        game_data = game_data[["Game ID", "Visitor", "Home"]]

        #Adds visitor moving average data
        selected_visitor_data = selected_data.loc[selected_data["Home-Visitor"] == "Visitor"].copy()

        selected_visitor_data = selected_visitor_data.add_prefix("Visitor - ")
        selected_visitor_data.rename(columns={
            "Visitor - Game ID": "Game ID",
            "Visitor - Game Name": "Game Name",
            "Visitor - {}".format(season_column): "{}".format(season_column),
            "Visitor - Date": "Date",
            "Visitor - Team": "Visitor",
            "Visitor - Winner": "Winner",
            "Visitor - Winner Against The Spread": "Winner Against The Spread",
            "Visitor - Over-Under Result": "Over-Under Result",
        }, inplace=True)


        try:
            selected_visitor_data.drop("Visitor - Opponent", axis=1, inplace=True)
        except:
            pass
        try:
            selected_visitor_data.drop("Visitor - Home-Visitor", axis=1, inplace=True)
        except:
            pass
        try:
            selected_visitor_data.drop("Visitor - Opponent - Starting Pitcher", axis=1, inplace=True)
        except:
            pass


        def visitor_winner(vh_winner):
            winner = "Push"
            if (vh_winner == "Win"):
                winner = "Visitor"
            if (vh_winner == "Loss"):
                winner = "Home"
            return winner

        if prediction_stat == "Winner":
            selected_visitor_data["Winner"] = selected_visitor_data["Winner"].apply(visitor_winner)


        if prediction_stat == "Winner Against The Spread":
            selected_visitor_data["Winner Against The Spread"] = selected_visitor_data["Winner Against The Spread"].apply(visitor_winner)

        #Adds home moving average data
        selected_home_data = selected_data.loc[selected_data["Home-Visitor"] == "Home"].copy()

        selected_home_data = selected_home_data.add_prefix("Home - ")
        selected_home_data.rename(columns={
            "Home - Game ID": "Game ID",
            "Home - Game Name": "Game Name",
            "Home - {}".format(season_column): "{}".format(season_column),
            "Home - Date": "Date",
            "Home - Team": "Home",
        }, inplace=True)

        try:
            selected_home_data.drop("Home - Opponent", axis=1, inplace=True)
        except:
            pass
        try:
            selected_home_data.drop("Home - Home-Visitor", axis=1, inplace=True)
        except:
            pass
        try:
            selected_home_data.drop("Home - Opponent - Starting Pitcher", axis=1, inplace=True)
        except:
            pass

        if prediction_stat == "Winner":
            selected_home_data.drop("Home - Winner", axis=1, inplace=True)
        if prediction_stat == "Winner Against The Spread":
            selected_home_data.drop("Home - Winner Against The Spread", axis=1, inplace=True)
        if prediction_stat == "Over-Under Result":
            selected_home_data.drop("Home - Over-Under Result", axis=1, inplace=True)

        game_data = game_data.loc[game_data["Game ID"] >= max(selected_visitor_data["Game ID"].min(), selected_home_data["Game ID"].min())]
        train_and_test_data = pd.merge(game_data, selected_visitor_data, on=["Game ID", "Visitor"], how="left")
        train_and_test_data = pd.merge(train_and_test_data, selected_home_data, on=["Game ID", "Home"], how="left")

        try:
            train_and_test_data.drop("Season_y", axis=1, inplace=True)
            train_and_test_data.rename(columns={"Season_x": "Season"}, inplace=True)
        except:
            pass
        try:
            train_and_test_data.drop("Season Year_y", axis=1, inplace=True)
            train_and_test_data.rename(columns={"Season Year_x": "Season Year"}, inplace=True)
        except:
            pass
        try:
            train_and_test_data.drop("Date_y", axis=1, inplace=True)
            train_and_test_data.rename(columns={"Date_x": "Date"}, inplace=True)
        except:
            pass

        train_and_test_data.dropna(subset=["Game Name_x"], inplace=True)
        train_and_test_data.dropna(subset=["Game Name_y"], inplace=True)
        train_and_test_data.drop("Game Name_x", axis=1, inplace=True)
        train_and_test_data.drop("Game Name_y", axis=1, inplace=True)

        if hv == False:
            try:
                train_and_test_data.drop("Home-Visitor", axis=1, inplace=True)
            except:
                pass

        return train_and_test_data

    def train_test_2021(self, train_and_test_data, prediction_stat):

        #gets train and test data and splits based on game ID starting 2021 season
        if self.sport_name == "MLB":
            X_train = train_and_test_data.loc[train_and_test_data["Game ID"] < 8404]
            X_test = train_and_test_data.loc[train_and_test_data["Game ID"] >= 8404]
        elif self.sport_name == "NFL":
            X_train = train_and_test_data.loc[train_and_test_data["Game ID"] < 1065]
            X_test = train_and_test_data.loc[train_and_test_data["Game ID"] >= 1065]
        elif self.sport_name == "NBA":
            X_train = train_and_test_data.loc[train_and_test_data["Game ID"] < 5077]
            X_test = train_and_test_data.loc[train_and_test_data["Game ID"] >= 5077]
        elif self.sport_name == "NHL":
            X_train = train_and_test_data.loc[train_and_test_data["Game ID"] < 3924]
            X_test = train_and_test_data.loc[train_and_test_data["Game ID"] >= 3924]
        y_train = X_train[prediction_stat]
        y_test = X_test[prediction_stat]
        X_train.drop(prediction_stat, axis=1, inplace=True)
        X_test.drop(prediction_stat, axis=1, inplace=True)

        return X_train, X_test, y_train, y_test

    def train_and_test(self, prediction_stat, game_data, selected_data, hv, user, model_name, created):

        train_and_test_data = self.get_train_and_test_data(game_data, selected_data, prediction_stat, hv)

        print("Now we're going to test your model to predict the 2021 Season.")
        print("Let's see how it does...")
        X_train, X_test, y_train, y_test = self.train_test_2021(train_and_test_data, prediction_stat)
        X_train.drop("Game ID", axis=1, inplace=True)
        X_test.drop("Game ID", axis=1, inplace=True)

        #For gradient boosting
        #lr = .1
        #if len(X_train.columns) > 10:
        #    print("Lots of columns ({}).  We will increase the GradientBoost learning rate to speed things up.".format(len(X_train.columns)))
        #    lr=.2

        # Transforms numberic data
        numeric_transformer = Pipeline(steps=[
            ('imputer', SimpleImputer(strategy='median')),
            ('scaler', StandardScaler())])

        # Transforms categorical (e.g., string) data
        categorical_transformer = Pipeline(steps=[
            ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
            ('onehot', OneHotEncoder(handle_unknown='ignore'))])

        numeric_features = X_train.select_dtypes(include=['int64', 'float64']).columns
        categorical_features = X_train.select_dtypes(include=['object']).columns

        preprocessor = ColumnTransformer(
            transformers=[
                ('num', numeric_transformer, numeric_features),
                ('cat', categorical_transformer, categorical_features)])

        classifiers = [
            ExtraTreesClassifier(n_estimators=100),
            LogisticRegression(C=0.1,
                               solver='saga',
                               penalty='elasticnet',
                               l1_ratio=0.5),
            LogisticRegression(C=0.01,
                               solver='saga',
                               penalty='elasticnet',
                               l1_ratio=0.5),
            LogisticRegression(C=0.05,
                              solver='saga',
                               penalty='elasticnet',
                               l1_ratio=0.5),
            LogisticRegression(C=0.005,
                               solver='saga',
                               penalty='elasticnet',
                               l1_ratio=0.5),
            LogisticRegression(C=0.001,
                               solver='saga',
                               penalty='elasticnet',
                               l1_ratio=0.5),
            LogisticRegression(C=0.02,
                               solver='saga',
                              penalty='elasticnet',
                               l1_ratio=0.5),
            LGBMClassifier(n_estimators=50,
                           learning_rate=0.1, ),
            LGBMClassifier(n_estimators=50,
                           learning_rate=0.05, ),
            LGBMClassifier(n_estimators=50,
                           learning_rate=0.01, ),
            XGBClassifier(booster = 'gbtree',
                          silent=False,
                          scale_pos_weight=1,
                          learning_rate=0.1,
                          colsample_bytree = 0.4,
                          subsample = 1,
                          objective='binary:logistic',
                          n_estimators=100,
                          reg_alpha = 0.3,
                          max_depth=5,
                          gamma=10,),
            #SVC(probability=True,
            #    C=0.2, tol=0.05),
        ]

        top_score = 0
        top_model = ""

        print("We will run a few models.  The model score is the percentage of games it predicts correctly.")

        for classifier in classifiers:
            pipe = Pipeline(steps=[('preprocessor', preprocessor), ('classifier', classifier)])
            pipe.fit(X_train, y_train)
            print(classifier)
            pred_score = pipe.score(X_test, y_test)
            print("model score: %.3f" % pred_score)

            if (pred_score > top_score):
                top_score = pred_score
                find_paren = str(classifier).find("(")
                top_model = str(classifier)[0:find_paren]
                top_pipe = pipe

        print("The top model is: {}".format(top_model))

        #Updates score to not include PUSHES
        print("The top score is: {}".format(top_score))
        total_games = len(y_test)
        print("Total games: {}".format(total_games))
        wins = top_score * total_games
        print("Wins: {}".format(wins))
        results = list(y_test)
        pushes = results.count("Push")
        print("Pushes: {}".format(pushes))
        top_score = wins / (total_games - pushes)
        print("Updated top score: {}".format(top_score))

        print("The top score is: {}".format(top_score))

        print("getting predictions")
        predictions = pd.DataFrame(top_pipe.predict(X_test))

        print("getting prediction probability")
        pred_proba =  pd.DataFrame(top_pipe.predict_proba(X_test))

        predictions.rename(columns={0: "{} - Prediction".format(prediction_stat)}, inplace=True)

        if self.sport_name == "MLB":
            season_game_data = game_data.loc[game_data["Game ID"] >= 8404]

            columns = [
                "Game ID",
                "Game Name",
                "Season",
                "Date",
                "Visitor",
                "Home",
                "Temperature",
                "Wind Speed",
                "Wind Direction",
                "Duration",
                "Attendance",
                "Visitor - Runs",
                "Visitor - Hits",
                "Visitor - Errors",
                "Home - Runs",
                "Home - Hits",
                "Home - Errors",
                "Final Score Spread",
                "Winner",
                "Point Spread",
                "Spread Difference",
                "Winner Against The Spread",
                "Total Score",
                "Over-Under",
                "Over-Under Difference",
                "Over-Under Result",
                "Visitor - Moneyline",
                "Visitor - Implied Odds",
                "Visitor - Point Spread Moneyline",
                "Visitor - Point Spread Implied Odds",
                "Home - Moneyline",
                "Home - Implied Odds",
                "Home - Point Spread Moneyline",
                "Home - Point Spread Implied Odds",
            ]

            last_game = 8403

        elif self.sport_name == "NFL":
            season_game_data = game_data.loc[game_data["Game ID"] >= 1065]

            columns = [
                "Game ID",
                "Game Name",
                "Season Year",
                "Date",
                "Week",
                "Game Type",
                "Visitor",
                "Home",
                "Visitor - Score",
                "Home - Score",
                "Final Score Spread",
                "Winner",
                "Closing Spread",
                "Spread Difference",
                "Winner Against The Spread",
                "Total Score",
                "Closing Over-Under",
                "Over-Under Difference",
                "Over-Under Result",
                "Visitor - Moneyline",
                "Visitor - Implied Odds",
                "Home - Moneyline",
                "Home - Implied Odds",
            ]

            last_game = 1064

        elif self.sport_name == "NBA":
            season_game_data = game_data.loc[game_data["Game ID"] >= 5077]

            columns = [
                "Game ID",
                "Game Name",
                "Season Year",
                "Date",
                "Game Type",
                "Visitor",
                "Home",
                "Visitor - Score",
                "Home - Score",
                "Final Score Spread",
                "Winner",
                "Point Spread",
                "Spread Difference",
                "Winner Against The Spread",
                "Total Score",
                "Over-Under",
                "Over-Under Difference",
                "Over-Under Result",
                "Visitor - Moneyline",
                "Visitor - Implied Odds",
                "Home - Moneyline",
                "Home - Implied Odds",
            ]

            last_game = 5077

        elif self.sport_name == "NHL":
            season_game_data = game_data.loc[game_data["Game ID"] >= 3924]

            columns = [
                "Game ID",
                "Game Name",
                "Season Year",
                "Date",
                "Game Type",
                "Visitor",
                "Home",
                "Visitor - Final Score",
                "Home - Final Score",
                "Final Score Spread",
                "Winner",
                "Closing Spread",
                "Spread Difference",
                "Winner Against The Spread",
                "Total Score",
                "Closing Over-Under",
                "Over-Under Difference",
                "Over-Under Result",
                "Visitor - Closing Moneyline",
                "Visitor - Closing Implied Odds",
                "Visitor - Closing Spread Moneyline",
                "Visitor - Closing Spread Implied Odds",
                "Home - Closing Moneyline",
                "Home - Closing Implied Odds",
                "Home - Closing Spread Moneyline",
                "Home - Closing Spread Implied Odds",
            ]

            last_game = 3924

        season_game_data = season_game_data[columns]



        season_game_data["{} - Prediction".format(prediction_stat)] = predictions["{} - Prediction".format(prediction_stat)].values

        #adds predictions and probabilities to prediction spreadsheet
        if "Winner" in prediction_stat:
            pred_proba.rename(columns={0: "Prediction - Probability of Home being {}".format(prediction_stat),1: "Prediction - 1 Probability of Visitor being {}".format(prediction_stat),2: "Prediction - 2 Probability of Visitor being {}".format(prediction_stat)}, inplace=True)
            try:
                def get_biggest(stats):
                    stat1 = stats[0]
                    stat2 = stats[1]

                    if (stat1 > stat2):
                        return stat1
                    else:
                        return stat2

                pred_proba["Prediction - Probability of Visitor being {}".format(prediction_stat)] = pred_proba[["Prediction - 1 Probability of Visitor being {}".format(prediction_stat), "Prediction - 2 Probability of Visitor being {}".format(prediction_stat)]].apply(get_biggest, axis=1)
            except:
                pred_proba.rename(columns={"Prediction - 1 Probability of Visitor being {}".format(prediction_stat): "Prediction - Probability of Visitor being {}".format(prediction_stat)}, inplace=True)

            season_game_data["Prediction - Probability of Visitor being {}".format(prediction_stat)] = pred_proba["Prediction - Probability of Visitor being {}".format(prediction_stat)].values
            season_game_data["Prediction - Probability of Home being {}".format(prediction_stat)] = pred_proba["Prediction - Probability of Home being {}".format(prediction_stat)].values
        else:
            pred_proba.rename(columns={0: "Prediction - Probability of Over", 2: "Prediction - Probability of Under"}, inplace=True)
            season_game_data["Prediction - Probability of Over"] = pred_proba["Prediction - Probability of Over"].values
            season_game_data["Prediction - Probability of Under"] = pred_proba["Prediction - Probability of Under"].values

        def normalize_stats(stats):
            one = stat1 = stats[0]
            two = stat2 = stats[1]

            if (stat1 + stat2 < .98):
                one = (stat1 / (stat1 + stat2)) * .98
                two = (stat2 / (stat1 + stat2)) * .98

            return pd.Series([one, two])

        if "Winner" in prediction_stat:
            season_game_data[["Prediction - Probability of Visitor being {}".format(prediction_stat), "Prediction - Probability of Home being {}".format(prediction_stat)]] = season_game_data[["Prediction - Probability of Visitor being {}".format(prediction_stat), "Prediction - Probability of Home being {}".format(prediction_stat)]].apply(normalize_stats, axis=1)
        else:
            season_game_data[["Prediction - Probability of Over", "Prediction - Probability of Under"]] = season_game_data[["Prediction - Probability of Over", "Prediction - Probability of Under"]].apply(normalize_stats, axis=1)

        try:
            season_game_data.rename(columns={"Prediction - Probability of Visitor being Winner Against The Spread": "Prediction - Probability of Visitor being Winner ATS", "Prediction - Probability of Home being Winner Against The Spread": "Prediction - Probability of Home being Winner ATS"}, inplace=True)
        except:
            pass

        def get_correct(data):
            if data[0] == data[1]:
                return "Yes"
            elif data[0]=="Push":
                return "Push"
            else:
                return "No"

        #checks if predictions are correct
        season_game_data["Correct"] = season_game_data[[prediction_stat, "{} - Prediction".format(prediction_stat)]].apply(get_correct, axis=1)
        print("Saving your model's predictions")

        csv_buffer = StringIO()
        season_game_data.to_csv(csv_buffer, index=False)
        s3_upload_path = "predictions/{}_{}_{}.csv".format(urllib.parse.quote(user), urllib.parse.quote(model_name), urllib.parse.quote(str(created)))
        client = boto3.client('s3', aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                              aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'])
        client.put_object(ACL='public-read', Bucket=os.environ['USER_CHARTS_BUCKET_S3'], Body=csv_buffer.getvalue(), Key=s3_upload_path, ContentType='text/html', )

        print("saving model")
        with tempfile.TemporaryFile() as fp:
            joblib.dump(top_pipe, fp)
            fp.seek(0)
            # File send to S3
            s3_upload_path = "predictions/{}_{}_{}.pkl".format(urllib.parse.quote(user), urllib.parse.quote(model_name), urllib.parse.quote(str(created)))
            client = boto3.client('s3', aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
                                  aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'])
            client.put_object(ACL='public-read', Bucket=os.environ['USER_CHARTS_BUCKET_S3'], Body=fp.read(), Key=s3_upload_path, ContentType='text/html', )

        return top_pipe, top_model, top_score, last_game

    def update_model(self, game_data, team_data, top_pipe, model_name, prediction_stat, games_back, years_back, last_game, selected_historic_stats, selected_game_stats):

        print("Updating model with newest games...")

        last_played_game = game_data["Game ID"].max()
        if (last_played_game > last_game):
            #if there are new games, get moving average spreadsheet
            selected_data, hv = self.get_ma_spreadsheet(team_data, model_name, prediction_stat, games_back, years_back, selected_historic_stats, selected_game_stats)

            train_and_test_data = self.get_train_and_test_data(game_data, selected_data, prediction_stat, hv)
            #train_and_test_data = train_and_test_data.loc[train_and_test_data["Game ID"] > last_game]

            y_train = train_and_test_data[prediction_stat]

            X_train = train_and_test_data.drop(prediction_stat, axis=1)
            X_train.drop("Game ID", axis=1, inplace=True)

            top_pipe = top_pipe.fit(X_train, y_train)

        return top_pipe, last_played_game

    def get_ma_spreadsheet(self, team_data, model_name, prediction_stat, games_back, years_back, selected_historic_stats, selected_game_stats):

        selected_data, winner_all_ma, hv = self.get_moving_averages(team_data, prediction_stat, years_back, games_back, selected_game_stats, selected_historic_stats)

        return selected_data, hv

    def build_prediction_spreadsheets(self, game_spreadsheet, team_spreadsheet, prediction_game_spreadsheet):
        season_year = 2021
        last_game = game_spreadsheet["Game ID"].max()
        game_spreadsheet = game_spreadsheet.loc[game_spreadsheet["Game ID"] >= last_game-200]
        team_spreadsheet = team_spreadsheet.loc[team_spreadsheet["Game ID"] >= last_game-200]

        #renames some columns from line spreadsheet to match stats spreadsheet
        if self.sport_name == "MLB":
            prediction_game_spreadsheet.rename(columns={
                "Time": "Date",
                "DraftKings Away Money Line": "Visitor - Moneyline",
                "DraftKings Home Money Line": "Home - Moneyline",
                "DraftKings Home Spread": "Point Spread",
                "DraftKings Away Spread Money Line": "Visitor - Point Spread Moneyline",
                "DraftKings Home Spread Money Line": "Home - Point Spread Moneyline",
                "DraftKings Over Line": "Over-Under"
            }, inplace=True)
        elif self.sport_name == "NFL":
            prediction_game_spreadsheet.rename(columns={
                "Time": "Date",
                "DraftKings Away Money Line": "Visitor - Moneyline",
                "DraftKings Home Money Line": "Home - Moneyline",
                "DraftKings Home Spread": "Closing Spread",
                "DraftKings Over Line": "Closing Over-Under"
            }, inplace=True)

        elif self.sport_name == "NBA":
            prediction_game_spreadsheet.rename(columns={
                "Time": "Date",
                "DraftKings Away Money Line": "Visitor - Moneyline",
                "DraftKings Home Money Line": "Home - Moneyline",
                "DraftKings Home Spread": "Point Spread",
                "DraftKings Over Line": "Over-Under"
            }, inplace=True)

        elif self.sport_name == "NHL":
            prediction_game_spreadsheet.rename(columns={
                "Time": "Date",
                "DraftKings Away Money Line": "Visitor - Closing Moneyline",
                "DraftKings Home Money Line": "Home - Closing Moneyline",
                "DraftKings Home Spread": "Closing Spread",
                "DraftKings Away Spread Money Line": "Visitor - Closing Spread Moneyline",
                "DraftKings Home Spread Money Line": "Home - Closing Spread Moneyline",
                "DraftKings Over Line": "Closing Over-Under"
            }, inplace=True)

        #Need to add implied odds
        def get_implied_odds(ml_str):
            try:
                ml = int(ml_str)
                if ml < 0:
                    ml = -ml
                    implied_odds = ml/(ml+100) * 100
                else:
                    implied_odds = 100/(ml+100) * 100
            except:
                implied_odds = ""
            return implied_odds

        if self.sport_name == "MLB":
            prediction_game_spreadsheet["Visitor - Implied Odds"] = prediction_game_spreadsheet["Visitor - Moneyline"].apply(get_implied_odds)
            prediction_game_spreadsheet["Home - Implied Odds"] = prediction_game_spreadsheet["Home - Moneyline"].apply(get_implied_odds)
            prediction_game_spreadsheet["Visitor - Point Spread Implied Odds"] = prediction_game_spreadsheet["Visitor - Point Spread Moneyline"].apply(get_implied_odds)
            prediction_game_spreadsheet["Home - Point Spread Implied Odds"] = prediction_game_spreadsheet["Home - Point Spread Moneyline"].apply(get_implied_odds)
            prediction_game_spreadsheet["Season"] = season_year
        elif self.sport_name == "NHL":
            prediction_game_spreadsheet["Visitor - Closing Implied Odds"] = prediction_game_spreadsheet["Visitor - Closing Moneyline"].apply(get_implied_odds)
            prediction_game_spreadsheet["Home - Closing Implied Odds"] = prediction_game_spreadsheet["Home - Closing Moneyline"].apply(get_implied_odds)
            prediction_game_spreadsheet["Visitor - Closing Spread Implied Odds"] = prediction_game_spreadsheet["Visitor - Closing Spread Moneyline"].apply(get_implied_odds)
            prediction_game_spreadsheet["Home - Closing Spread Implied Odds"] = prediction_game_spreadsheet["Home - Closing Spread Moneyline"].apply(get_implied_odds)
            prediction_game_spreadsheet["Season Year"] = season_year
        elif self.sport_name == "NFL" or self.sport_name == "NBA":
            prediction_game_spreadsheet["Visitor - Implied Odds"] = prediction_game_spreadsheet["Visitor - Moneyline"].apply(get_implied_odds)
            prediction_game_spreadsheet["Home - Implied Odds"] = prediction_game_spreadsheet["Home - Moneyline"].apply(get_implied_odds)
            prediction_game_spreadsheet["Season Year"] = season_year

        #gets basic columns
        if self.sport_name == "MLB":

            columns = [
                "Date",
                "Season",
                "Visitor",
                "Visitor - Starting Pitcher",
                "Home",
                "Venue",
                "Temperature",
                "Wind Speed",
                "Home - Starting Pitcher",
                'Park Factor',
                'Park Factor - wOBACon',
                'Park Factor - xwOBACon',
                'Park Factor - BACON',
                'Park Factor - xBACON',
                'Park Factor - Hard Hit',
                'Park Factor - Runs',
                'Park Factor - On Base Percentage',
                'Park Factor - Hits',
                'Park Factor - First Base',
                'Park Factor - Second Base',
                'Park Factor - Third Base',
                'Park Factor - Home Runs',
                'Park Factor - Bases on Balls',
                'Park Factor - Strikeouts',
                'Park Factor - Plate Appearances',
                "Visitor - Moneyline",
                "Visitor - Implied Odds",
                "Home - Moneyline",
                "Home - Implied Odds",
                "Point Spread",
                "Visitor - Point Spread Moneyline",
                "Visitor - Point Spread Implied Odds",
                "Home - Point Spread Moneyline",
                "Home - Point Spread Implied Odds",
                "Over-Under",
            ]

        elif self.sport_name == "NFL":
            columns = [
                "Date",
                "Season Year",
                "Visitor",
                "Home",
                "Visitor - Moneyline",
                "Visitor - Implied Odds",
                "Home - Moneyline",
                "Home - Implied Odds",
                "Closing Spread",
                "Closing Over-Under",
            ]

        elif self.sport_name == "NBA":
            columns = [
                "Date",
                "Season Year",
                "Visitor",
                "Home",
                "Visitor - Moneyline",
                "Visitor - Implied Odds",
                "Home - Moneyline",
                "Home - Implied Odds",
                "Point Spread",
                "Over-Under",
            ]

        elif self.sport_name == "NHL":

            columns = [
                "Date",
                "Season Year",
                "Visitor",
                "Home",
                "Visitor - Closing Moneyline",
                "Visitor - Closing Implied Odds",
                "Home - Closing Moneyline",
                "Home - Closing Implied Odds",
                "Closing Spread",
                "Visitor - Closing Spread Moneyline",
                "Visitor - Closing Spread Implied Odds",
                "Home - Closing Spread Moneyline",
                "Home - Closing Spread Implied Odds",
                "Closing Over-Under",
            ]

        prediction_game_spreadsheet = prediction_game_spreadsheet[columns]

        #Updates game names so line spreadsheet matches stats spreadsheet
        if self.sport_name == "MLB":
            tn = {'Full Name': ['NYM','KC','STL','PIT','TOR','TB','ATL','WSH','MIL','SFG','TEX','SEA','PHI','CIN','SD','LAD','ARI','COL','OAK','CWS','CHC','LAA','MIN','BAL','MIA','DET','CLE','BOS','HOU','NYY'],
                  'New Name': ['NY Mets','Kansas City','St. Louis','Pittsburgh','Toronto','Tampa Bay','Atlanta','Washington','Milwaukee','San Francisco','Texas','Seattle','Philadelphia','Cincinnati','San Diego','LA Dodgers','Arizona','Colorado','Oakland','Chicago White Sox','Chicago Cubs','LA Angels','Minnesota','Baltimore','Miami','Detroit','Cleveland','Boston','Houston','NY Yankees']}

        elif self.sport_name == "NFL":
            tn = {'Full Name': ['ARI','ATL','BAL','BUF','CAR','CHI','CIN','CLE','DAL','DEN','DET','GB','HOU','IND','JAC','KC','LV','ChargersLA','RamsLA','MIA','MIN','NE','NO','NYG','NYJ','LV','PHI','PIT','ChargersLA','SF','SEA','TB','TEN','WAS','WAS'],
                  'New Name': ['Arizona','Atlanta','Baltimore','Buffalo','Carolina','Chicago','Cincinnati','Cleveland','Dallas','Denver','Detroit','Green Bay','Houston','Indianapolis','Jacksonville','Kansas City','Las Vegas','LA Chargers','LA Rams','Miami','Minnesota','New England','New Orleans','NY Giants','NY Jets','Oakland','Philadelphia','Pittsburgh','San Diego','San Francisco','Seattle','Tampa Bay','Tennessee','Washington','Washington']}
        elif self.sport_name == "NBA":
            tn = {'Full Name': ['ATL', 'BOS', 'BKN', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW', 'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN', 'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHX', 'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS'],
                'New Name': ['Atlanta', 'Boston', 'Brooklyn', 'Charlotte', 'Chicago', 'Cleveland', 'Dallas', 'Denver', 'Detroit', 'Golden State', 'Houston', 'Indiana', 'LA Clippers', 'LA Lakers', 'Memphis', 'Miami', 'Milwaukee', 'Minnesota', 'New Orleans', 'New York', 'Oklahoma City', 'Orlando', 'Philadelphia', 'Phoenix', 'Portland', 'Sacramento', 'San Antonio', 'Toronto', 'Utah', 'Washington']}
        elif self.sport_name == "NHL":
            tn = {
                'Full Name': ['ANA','ARI','BOS','BUF','CGY','CAR','CHI','COL','CBJ','DAL','DET','EDM','FLA','LA','MIN','MTL','NSH','NJ','NYI','NYR','OTT','PHI','PIT','SJ','SEA','STL','TB','TOR','VAN','VGK','WSH','WPG', 'UTA'],
                'New Name': ['Anaheim','Arizona','Boston','Buffalo','Calgary','Carolina','Chicago','Colorado','Columbus','Dallas','Detroit','Edmonton','Florida','Los Angeles','Minnesota','Montreal','Nashville','New Jersey','NY Islanders','NY Rangers','Ottawa','Philadelphia','Pittsburgh','San Jose','Seattle','St. Louis','Tampa Bay','Toronto','Vancouver','Vegas','Washington','Winnipeg', 'Utah']}

        team_names = pd.DataFrame(data=tn)
        for row in team_names.iterrows():
            prediction_game_spreadsheet.replace(row[1][0], row[1][1], inplace=True)

        #Adds Game ID
        prediction_game_spreadsheet.insert(0, 'Game ID', range(int(last_game)+1, int(last_game) + 1 + len(prediction_game_spreadsheet)))

        prediction_game_spreadsheet = game_spreadsheet.append(prediction_game_spreadsheet)

        pgs_visitor = prediction_game_spreadsheet.copy()
        columns = pgs_visitor.columns.tolist()

        for i in columns:
            new_i = i.replace("Visitor - ", "Team - ")
            new_i = new_i.replace("Home - ", "Opponent - ")
            pgs_visitor.rename(columns={i: new_i}, inplace=True)

        pgs_visitor.rename(columns={"Visitor": "Team", "Home": "Opponent"}, inplace=True)
        pgs_visitor.insert(4, "Home-Visitor", "Visitor")

        pgs_home = prediction_game_spreadsheet.copy()
        columns = pgs_home.columns.tolist()
        for i in columns:
            new_i = i.replace("Home - ", "Team - ")
            new_i = new_i.replace("Visitor - ", "Opponent - ")
            pgs_home.rename(columns={i: new_i}, inplace=True)

        pgs_home.rename(columns={"Home": "Team", "Visitor": "Opponent"}, inplace=True)

        if self.sport_name == "MLB" or self.sport_name == "NBA":
            pgs_home["Point Spread"] = -pgs_home["Point Spread"]
        elif self.sport_name == "NFL" or self.sport_name == "NHL":
            pgs_home["Closing Spread"] = -pgs_home["Closing Spread"]

        pgs_home.insert(4, "Home-Visitor", "Home")

        prediction_team_spreadsheet = pgs_visitor.append(pgs_home)
        prediction_team_spreadsheet.sort_values(["Game ID"], ascending=[True], inplace=True)

        if self.sport_name == "MLB":
            prediction_team_spreadsheet.rename(columns={"Team - Moneyline": "Moneyline", "Team - Implied Odds": "Implied Odds", "Team - Point Spread": "Point Spread", "Team - Point Spread Moneyline": "Point Spread Moneyline", "Team - Point Spread Implied Odds": "Point Spread Implied Odds", "Team - Season": "Season"}, inplace=True)
        elif self.sport_name == "NFL":
            prediction_team_spreadsheet.rename(columns={"Team - Moneyline": "Moneyline", "Team - Implied Odds": "Implied Odds", "Team - Closing Spread": "Closing Spread", "Team - Season Year": "Season Year"}, inplace=True)
        elif self.sport_name == "NBA":
            prediction_team_spreadsheet.rename(columns={"Team - Moneyline": "Moneyline", "Team - Implied Odds": "Implied Odds", "Team - Point Spread": "Point Spread", "Team - Season Year": "Season Year"}, inplace=True)
        elif self.sport_name == "NHL":
            prediction_team_spreadsheet.rename(columns={"Team - Opening Moneyline": "Opening Moneyline", "Team - Opening Implied Odds": "Opening Implied Odds","Team - Closing Moneyline": "Closing Moneyline", "Team - Closing Implied Odds": "Closing Implied Odds", "Team - Closing Spread": "Closing Spread", "Team - Closing Spread Moneyline": "Closing Spread Moneyline", "Team - Closing Spread Implied Odds": "Closing Spread Implied Odds", "Team - Season Year": "Season Year"}, inplace=True)

        return prediction_game_spreadsheet, prediction_team_spreadsheet, last_game


    def get_prediction_moving_averages(self, game_data, team_data, prediction_stat, games_back, model_name, last_game, selected_historic_stats, selected_game_stats):
        if self.sport_name == "MLB":
            season_column = "Season"
        elif self.sport_name == "NFL" or self.sport_name == "NBA" or self.sport_name == "NHL":
            season_column = "Season Year"

        #Renames moving average columns to have ' - Moving Average' at the end and gets moving average
        selected_moving_average_stats = []

        for i in selected_historic_stats:
            column_string = i + " - Moving Average"
            selected_moving_average_stats.append(column_string)
            team_data[column_string] = team_data.groupby('Team')[i].transform(lambda x: x.rolling(games_back, 1).mean().shift(1))

        if "Home-Visitor" in selected_game_stats:
            hv = True
            all_selected_stats = ["Game ID", "Game Name", "Team", "Opponent"] + selected_game_stats + [prediction_stat] + selected_moving_average_stats
        else:
            hv=False
            all_selected_stats = ["Game ID", "Game Name", "Team", "Opponent", "Home-Visitor"] + selected_game_stats + [prediction_stat] + selected_moving_average_stats

        selected_data = team_data[all_selected_stats]

        game_data = game_data[["Game ID", "Visitor", "Home"]]
        game_data = game_data.loc[game_data["Game ID"] > last_game]

        #Adds visitor moving average data
        selected_visitor_data = selected_data.loc[selected_data["Home-Visitor"] == "Visitor"].copy()

        selected_visitor_data = selected_visitor_data.add_prefix("Visitor - ")
        selected_visitor_data.rename(columns={
            "Visitor - Game ID": "Game ID",
            "Visitor - Game Name": "Game Name",
            "Visitor - {}".format(season_column): "{}".format(season_column),
            "Visitor - Date": "Date",
            "Visitor - Team": "Visitor",
            "Visitor - Winner": "Winner",
            "Visitor - Winner Against The Spread": "Winner Against The Spread",
            "Visitor - Over-Under Result": "Over-Under Result",
        }, inplace=True)

        try:
            selected_visitor_data.drop("Visitor - Opponent", axis=1, inplace=True)
        except:
            pass
        try:
            selected_visitor_data.drop("Visitor - Home-Visitor", axis=1, inplace=True)
        except:
            pass
        try:
            selected_visitor_data.drop("Visitor - Opponent - Starting Pitcher", axis=1, inplace=True)
        except:
            pass

        def visitor_winner(vh_winner):
            winner = "Push"
            if (vh_winner == "Win"):
                winner = "Visitor"
            if (vh_winner == "Loss"):
                winner = "Home"
            return winner

        if prediction_stat == "Winner":
            selected_visitor_data["Winner"] = selected_visitor_data["Winner"].apply(visitor_winner)


        if prediction_stat == "Winner Against The Spread":
            selected_visitor_data["Winner Against The Spread"] = selected_visitor_data["Winner Against The Spread"].apply(visitor_winner)

        # Adds home moving average data
        selected_home_data = selected_data.loc[selected_data["Home-Visitor"] == "Home"].copy()

        selected_home_data = selected_home_data.add_prefix("Home - ")


        selected_home_data.rename(columns={
            "Home - Game ID": "Game ID",
            "Home - Game Name": "Game Name",
            "Home - {}".format(season_column): "{}".format(season_column),
            "Home - Date": "Date",
            "Home - Team": "Home",
        }, inplace=True)

        try:
            selected_home_data.drop("Home - Opponent", axis=1, inplace=True)
        except:
            pass
        try:
            selected_home_data.drop("Home - Home-Visitor", axis=1, inplace=True)
        except:
            pass
        try:
            selected_home_data.drop("Home - Opponent - Starting Pitcher", axis=1, inplace=True)
        except:
            pass

        if prediction_stat == "Winner":
            selected_home_data.drop("Home - Winner", axis=1, inplace=True)
        if prediction_stat == "Winner Against The Spread":
            selected_home_data.drop("Home - Winner Against The Spread", axis=1, inplace=True)
        if prediction_stat == "Over-Under Result":
            selected_home_data.drop("Home - Over-Under Result", axis=1, inplace=True)
        train_and_test_data = pd.merge(game_data, selected_visitor_data, on=["Game ID", "Visitor"], how="left")
        train_and_test_data = pd.merge(train_and_test_data, selected_home_data, on=["Game ID", "Home"], how="left")
        if hv == False:
            try:
                train_and_test_data.drop("Home-Visitor", axis=1, inplace=True)
            except:
                pass
        try:
            train_and_test_data.drop("Season_y", axis=1, inplace=True)
            train_and_test_data.rename(columns={"Season_x": "Season"}, inplace=True)
        except:
            pass
        try:
            train_and_test_data.drop("Season Year_y", axis=1, inplace=True)
            train_and_test_data.rename(columns={"Season Year_x": "Season Year"}, inplace=True)
        except:
            pass
        try:
            train_and_test_data.drop("Date_y", axis=1, inplace=True)
            train_and_test_data.rename(columns={"Date_x": "Date"}, inplace=True)
        except:
            pass

        train_and_test_data.drop("Game Name_x", axis=1, inplace=True)
        train_and_test_data.drop("Game Name_y", axis=1, inplace=True)

        if ("Season" in selected_historic_stats) or ("Season" in selected_game_stats):
            train_and_test_data[season_column] = 2021

        return train_and_test_data

    def predict_games(self, top_pipe, train_and_test_data, prediction_stat, prediction_game_spreadsheet, last_game, model_name):

        print("Predicting Today's Games...")

        train_and_test_data.drop("Game ID", axis=1, inplace=True)
        train_and_test_data.drop(prediction_stat, axis=1, inplace=True)
        predictions = pd.DataFrame(top_pipe.predict(train_and_test_data))
        pred_proba = pd.DataFrame(top_pipe.predict_proba(train_and_test_data))
        predictions.rename(columns={0: "{} - Prediction".format(prediction_stat)}, inplace=True)
        prediction_games = prediction_game_spreadsheet.loc[prediction_game_spreadsheet["Game ID"] > last_game]
        prediction_games["{} - Prediction".format(prediction_stat)] = predictions["{} - Prediction".format(prediction_stat)].values

        if "Winner" in prediction_stat:
            pred_proba.rename(
                columns={0: "Prediction - Probability of Home being {}".format(prediction_stat),
                         1: "Prediction - 1 Probability of Visitor being {}".format(prediction_stat),
                         2: "Prediction - 2 Probability of Visitor being {}".format(prediction_stat)}, inplace=True)

            try:
                def get_biggest(stats):
                    stat1 = stats[0]
                    stat2 = stats[1]

                    if (stat1 > stat2):
                        return stat1
                    else:
                        return stat2

                pred_proba["Prediction - Probability of Visitor being {}".format(prediction_stat)] = pred_proba[["Prediction - 1 Probability of Visitor being {}".format(prediction_stat), "Prediction - 2 Probability of Visitor being {}".format(prediction_stat)]].apply(get_biggest, axis=1)
            except:
                pred_proba.rename(columns={"Prediction - 1 Probability of Visitor being {}".format(prediction_stat): "Prediction - Probability of Visitor being {}".format(prediction_stat)}, inplace=True)

            prediction_games["Prediction - Probability of Visitor being {}".format(prediction_stat)] = pred_proba["Prediction - Probability of Visitor being {}".format(prediction_stat)].values
            prediction_games["Prediction - Probability of Home being {}".format(prediction_stat)] = pred_proba["Prediction - Probability of Home being {}".format(prediction_stat)].values
        else:

            pred_proba.rename(columns={0: "Prediction - Probability of Over", 2: "Prediction - Probability of Under"}, inplace=True)
            prediction_games["Prediction - Probability of Over"] = pred_proba["Prediction - Probability of Over"].values
            prediction_games["Prediction - Probability of Under"] = pred_proba["Prediction - Probability of Under"].values

        #Some models may be predicting more than 2% chance of push.  If so change to 2% chance of push.
        def normalize_stats(stats):
            one = stat1 = stats[0]
            two = stat2 = stats[1]

            if (stat1 + stat2 < .98):
                one = (stat1 / (stat1 + stat2)) * .98
                two = (stat2 / (stat1 + stat2)) * .98

            return pd.Series([one, two])

        if "Winner" in prediction_stat:
            prediction_games[["Prediction - Probability of Visitor being {}".format(prediction_stat), "Prediction - Probability of Home being {}".format(prediction_stat)]] = prediction_games[["Prediction - Probability of Visitor being {}".format(prediction_stat), "Prediction - Probability of Home being {}".format(prediction_stat)]].apply(normalize_stats, axis=1)
        else:
            prediction_games[["Prediction - Probability of Over", "Prediction - Probability of Under"]] = prediction_games[["Prediction - Probability of Over", "Prediction - Probability of Under"]].apply(normalize_stats, axis=1)

        prediction_games.dropna(axis="columns", how="all", inplace=True)
        try:
            prediction_games.rename(columns={"Prediction - Probability of Visitor being Winner Against The Spread": "Prediction - Probability of Visitor being Winner ATS", "Prediction - Probability of Home being Winner Against The Spread": "Prediction - Probability of Home being Winner ATS"}, inplace=True)
        except:
            pass

        return prediction_games


    def __str__(self):
        return str(self.user.username)

class PredictMLBUserFormData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="predict_mlb_data")
    model_name = models.CharField(max_length=250)
    model_score = models.FloatField(default=-1)
    active = models.BooleanField(default=False)
    model_type = models.CharField(max_length=255, default='None')
    predict_type = models.CharField(max_length=255)
    predict_year = models.CharField(max_length=255)
    predict_train = models.CharField(max_length=255)
    predict_stats = models.TextField()
    last_game = models.IntegerField(default=0, blank=True, null=True)  # Admin only

    created = models.DateTimeField(auto_now_add=True)

    model = PredictionModel("MLB", user, model_name, model_score, active, model_type, predict_type, predict_year, predict_train, predict_stats, last_game)

    def model_score_percentage(self):
        return round(self.model_score * 100, 2)

    def predict_stats_array(self):
        return self.predict_stats.split(",")

    def selected_stats(self):
        selected_stats = self.predict_stats.split(",")
        selected_game_stats = []
        selected_historic_stats = []

        # Converts selected stats to real column names
        for stat in selected_stats:
            if stat[:27] == "Game - Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[27:])
                selected_game_stats.append("Opponent - " + stat[27:])
            elif stat[:7] == "Game - ":
                selected_game_stats.append(stat[7:])
            elif stat[:20] == "Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[20:])
                selected_game_stats.append("Opponent - " + stat[20:])
            elif stat[:18] == "Historic - Game - ":
                selected_historic_stats.append(stat[18:])
            elif stat[:31] == "Historic - Team and Opponent - ":
                selected_historic_stats.append("Team - " + stat[31:])
                selected_historic_stats.append("Opponent - " + stat[31:])

        selected_game_stats = list(set(selected_game_stats))
        selected_historic_stats = list(set(selected_historic_stats))

        return selected_game_stats, selected_historic_stats

    def all_selected_stats(self):
        selected_stats = self.predict_stats.split(",")
        selected_game_stats = []
        selected_historic_stats = []

        # Converts selected stats to real column names
        for stat in selected_stats:
            if stat[:27] == "Game - Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[27:])
                selected_game_stats.append("Opponent - " + stat[27:])
            elif stat[:7] == "Game - ":
                selected_game_stats.append(stat[7:])
            elif stat[:20] == "Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[20:])
                selected_game_stats.append("Opponent - " + stat[20:])
            elif stat[:18] == "Historic - Game - ":
                selected_historic_stats.append(stat[18:])
            elif stat[:31] == "Historic - Team and Opponent - ":
                selected_historic_stats.append("Team - " + stat[31:])
                selected_historic_stats.append("Opponent - " + stat[31:])

        all_selected_stats = selected_game_stats + selected_historic_stats
        all_selected_stats = list(set(all_selected_stats))

        return all_selected_stats

class PredictNFLUserFormData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="predict_nfl_data")
    model_name = models.CharField(max_length=250)
    model_score = models.FloatField(default=-1)
    active = models.BooleanField(default=False)
    model_type = models.CharField(max_length=255, default='None')
    predict_type = models.CharField(max_length=255)
    predict_year = models.CharField(max_length=255)
    predict_train = models.CharField(max_length=255)
    predict_stats = models.TextField()
    last_game = models.IntegerField(default=0, blank=True, null=True)  # Admin only

    created = models.DateTimeField(auto_now_add=True)

    model = PredictionModel("NFL", user, model_name, model_score, active, model_type, predict_type, predict_year, predict_train, predict_stats, last_game)

    #TODO- these are both defined multiple times in this file - don't need to be
    def model_score_percentage(self):
        return round(self.model_score * 100, 2)

    def predict_stats_array(self):
        return self.predict_stats.split(",")

    def selected_stats(self):
        selected_stats = self.predict_stats.split(",")
        selected_game_stats = []
        selected_historic_stats = []

        # Converts selected stats to real column names
        for stat in selected_stats:
            if stat[:27] == "Game - Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[27:])
                selected_game_stats.append("Opponent - " + stat[27:])
            elif stat[:7] == "Game - ":
                selected_game_stats.append(stat[7:])
            elif stat[:20] == "Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[20:])
                selected_game_stats.append("Opponent - " + stat[20:])
            elif stat[:18] == "Historic - Game - ":
                selected_historic_stats.append(stat[18:])
            elif stat[:31] == "Historic - Team and Opponent - ":
                selected_historic_stats.append("Team - " + stat[31:])
                selected_historic_stats.append("Opponent - " + stat[31:])

        selected_game_stats = list(set(selected_game_stats))
        selected_historic_stats = list(set(selected_historic_stats))

        return selected_game_stats, selected_historic_stats

    def all_selected_stats(self):
        selected_stats = self.predict_stats.split(",")
        selected_game_stats = []
        selected_historic_stats = []

        # Converts selected stats to real column names
        for stat in selected_stats:
            if stat[:27] == "Game - Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[27:])
                selected_game_stats.append("Opponent - " + stat[27:])
            elif stat[:7] == "Game - ":
                selected_game_stats.append(stat[7:])
            elif stat[:20] == "Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[20:])
                selected_game_stats.append("Opponent - " + stat[20:])
            elif stat[:18] == "Historic - Game - ":
                selected_historic_stats.append(stat[18:])
            elif stat[:31] == "Historic - Team and Opponent - ":
                selected_historic_stats.append("Team - " + stat[31:])
                selected_historic_stats.append("Opponent - " + stat[31:])

        all_selected_stats = selected_game_stats + selected_historic_stats
        all_selected_stats = list(set(all_selected_stats))

        return all_selected_stats

class PredictNBAUserFormData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="predict_nba_data")
    model_name = models.CharField(max_length=250)
    model_score = models.FloatField(default=-1)
    active = models.BooleanField(default=False)
    model_type = models.CharField(max_length=255, default='None')
    predict_type = models.CharField(max_length=255)
    predict_year = models.CharField(max_length=255)
    predict_train = models.CharField(max_length=255)
    predict_stats = models.TextField()
    last_game = models.IntegerField(default=0, blank=True, null=True)  # Admin only

    created = models.DateTimeField(auto_now_add=True)

    model = PredictionModel("NBA", user, model_name, model_score, active, model_type, predict_type, predict_year, predict_train, predict_stats, last_game)

    def model_score_percentage(self):
        return round(self.model_score * 100, 2)

    def predict_stats_array(self):
        return self.predict_stats.split(",")

    def selected_stats(self):
        selected_stats = self.predict_stats.split(",")
        selected_game_stats = []
        selected_historic_stats = []

        # Converts selected stats to real column names
        for stat in selected_stats:
            if stat[:27] == "Game - Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[27:])
                selected_game_stats.append("Opponent - " + stat[27:])
            elif stat[:7] == "Game - ":
                selected_game_stats.append(stat[7:])
            elif stat[:20] == "Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[20:])
                selected_game_stats.append("Opponent - " + stat[20:])
            elif stat[:18] == "Historic - Game - ":
                selected_historic_stats.append(stat[18:])
            elif stat[:31] == "Historic - Team and Opponent - ":
                selected_historic_stats.append("Team - " + stat[31:])
                selected_historic_stats.append("Opponent - " + stat[31:])

        selected_game_stats = list(set(selected_game_stats))
        selected_historic_stats = list(set(selected_historic_stats))

        return selected_game_stats, selected_historic_stats

    def all_selected_stats(self):
        selected_stats = self.predict_stats.split(",")
        selected_game_stats = []
        selected_historic_stats = []

        # Converts selected stats to real column names
        for stat in selected_stats:
            if stat[:27] == "Game - Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[27:])
                selected_game_stats.append("Opponent - " + stat[27:])
            elif stat[:7] == "Game - ":
                selected_game_stats.append(stat[7:])
            elif stat[:20] == "Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[20:])
                selected_game_stats.append("Opponent - " + stat[20:])
            elif stat[:18] == "Historic - Game - ":
                selected_historic_stats.append(stat[18:])
            elif stat[:31] == "Historic - Team and Opponent - ":
                selected_historic_stats.append("Team - " + stat[31:])
                selected_historic_stats.append("Opponent - " + stat[31:])

        all_selected_stats = selected_game_stats + selected_historic_stats
        all_selected_stats = list(set(all_selected_stats))

        return all_selected_stats

class PredictNHLUserFormData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="predict_nhl_data")
    model_name = models.CharField(max_length=250)
    model_score = models.FloatField(default=-1)
    active = models.BooleanField(default=False)
    model_type = models.CharField(max_length=255, default='None')
    predict_type = models.CharField(max_length=255)
    predict_year = models.CharField(max_length=255)
    predict_train = models.CharField(max_length=255)
    predict_stats = models.TextField()
    last_game = models.IntegerField(default=0, blank=True, null=True)  # Admin only

    created = models.DateTimeField(auto_now_add=True)

    model = PredictionModel("NHL", user, model_name, model_score, active, model_type, predict_type, predict_year, predict_train, predict_stats, last_game)

    def model_score_percentage(self):
        return round(self.model_score * 100, 2)

    def predict_stats_array(self):
        return self.predict_stats.split(",")

    def selected_stats(self):
        selected_stats = self.predict_stats.split(",")
        selected_game_stats = []
        selected_historic_stats = []

        # Converts selected stats to real column names
        for stat in selected_stats:
            if stat[:27] == "Game - Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[27:])
                selected_game_stats.append("Opponent - " + stat[27:])
            elif stat[:7] == "Game - ":
                selected_game_stats.append(stat[7:])
            elif stat[:20] == "Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[20:])
                selected_game_stats.append("Opponent - " + stat[20:])
            elif stat[:18] == "Historic - Game - ":
                selected_historic_stats.append(stat[18:])
            elif stat[:31] == "Historic - Team and Opponent - ":
                selected_historic_stats.append("Team - " + stat[31:])
                selected_historic_stats.append("Opponent - " + stat[31:])

        #removes duplicates
        selected_game_stats = list(set(selected_game_stats))
        selected_historic_stats = list(set(selected_historic_stats))

        return selected_game_stats, selected_historic_stats

    def all_selected_stats(self):
        selected_stats = self.predict_stats.split(",")
        selected_game_stats = []
        selected_historic_stats = []

        # Converts selected stats to real column names
        for stat in selected_stats:
            if stat[:27] == "Game - Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[27:])
                selected_game_stats.append("Opponent - " + stat[27:])
            elif stat[:7] == "Game - ":
                selected_game_stats.append(stat[7:])
            elif stat[:20] == "Team and Opponent - ":
                selected_game_stats.append("Team - " + stat[20:])
                selected_game_stats.append("Opponent - " + stat[20:])
            elif stat[:18] == "Historic - Game - ":
                selected_historic_stats.append(stat[18:])
            elif stat[:31] == "Historic - Team and Opponent - ":
                selected_historic_stats.append("Team - " + stat[31:])
                selected_historic_stats.append("Opponent - " + stat[31:])

        all_selected_stats = selected_game_stats + selected_historic_stats
        all_selected_stats = list(set(all_selected_stats))
        all_selected_stats = list(set(all_selected_stats))

        return all_selected_stats

class LineSpreadsheetUpload(models.Model):
    file = S3DirectField(dest='line_file_store_destination')
    date_uploaded = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Line Spreadsheet upload"
        verbose_name_plural = "Line Spreadsheet upload"

    def filename_s3(self):
        filename = self.file.split("linefiles/")[-1]
        return filename

    def __str__(self):
        cal_uploaded_time = datetime.now(timezone.utc) - self.date_uploaded
        filename = self.file.split("linefiles/")[-1]
        return filename+" | "+str(cal_uploaded_time)

class ActiveLineDatafilesCsv(models.Model):
    data_csv_name = models.CharField(max_length=200, blank=True, unique=True)
    status = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Activate Line Dataset"
        verbose_name_plural = "Activate Line Dataset"

    def __str__(self):
        return str(self.data_csv_name)

class Test_Schedule_Tasks(models.Model):
    name = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name+" : "+str(self.created)