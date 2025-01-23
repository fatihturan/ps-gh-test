from datetime import datetime
from pytz import timezone
import time
import pytz
import pandas as pd
import aiohttp
import aioboto3
import asyncio
from bs4 import BeautifulSoup
from io import StringIO

from .helpers import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_STORAGE_BUCKET_NAME



import traceback
import logging
log = logging.getLogger('json')

#This pulls the csv so we can filter by team
async def get_first_basket_info(team_one=None, team_two=None, log_extras={}, **kwargs):
    start_time = time.time()

    print("IN GETTING FIRST BASKET INFO")

    body_string = "No data found."
    first_basket_df = pd.DataFrame({"date": [datetime.now(timezone('US/Eastern'))], "string": [body_string], "tool_used": ["get_first_basket_info"]})

    try:
        todays_date = datetime.now().strftime('%Y-%m-%d')
        s3_file_path = f"first_basket/{todays_date}_first_basket.csv"

        async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,
                                                aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
            response = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_file_path)
            body = await response['Body'].read()
            body_string = body.decode('utf-8')

            first_basket_data = pd.read_csv(StringIO(body_string))

    except:
        log.error('get_first_basket_info', extra={**log_extras, 'try_again': 'True', 'error': traceback.format_exc()})
        try:
            # subtract a day from todays date
            yesterdays_date = (datetime.now() - pd.DateOffset(days=1)).strftime('%Y-%m-%d')
            s3_file_path = f"first_basket/{yesterdays_date}_first_basket.txt"

            async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
                response = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_file_path)
                body = await response['Body'].read()
                body_string = body.decode('utf-8')
                first_basket_data = pd.read_csv(StringIO(body_string))

        except:
            print(traceback.format_exc())
            #log error
            log.error('get_first_basket_info', extra={**log_extras, 'try_again': 'False', 'error': traceback.format_exc()})


            return first_basket_df, []

    if team_one:
        first_basket_data = first_basket_data.dropna(subset=['game'])

        # only keep where team_one is in game column
        first_basket_data = first_basket_data[first_basket_data['game'].str.contains(team_one)]
    if team_two:
        first_basket_data = first_basket_data.dropna(subset=['game'])

        # only keep where team_two is in game column
        first_basket_data = first_basket_data[first_basket_data['game'].str.contains(team_two)]

    # drop game column
    first_basket_data = first_basket_data.drop(columns=['game'])

    first_basket_string = ""
    word_count = 0
    for i, row in first_basket_data.iterrows():
        for column in first_basket_data.columns:
            # of row[column is not nan or nat, add it
            if not pd.isnull(row[column]):
                first_basket_string += f"{column}: {row[column]}\n"
                # add to word_count
                word_count += len(f"{column}: {row[column]}\n".split())

        first_basket_string += "\n"
        first_basket_string += "-" * 50
        first_basket_string += "\n\n"
    print(first_basket_string)
    print(f"Word count: {word_count}")

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'runtime': time.time() - start_time
    })


    # add to first_basket_df
    first_basket_df = pd.DataFrame({"date": [datetime.now(timezone('US/Eastern'))], "string": [first_basket_string], "tool_used": ["get_first_basket_info"]})

    return first_basket_df, []

#This just pulls the string from the s3 file
async def get_first_basket_info_old(log_extras={}, **kwargs):
    start_time = time.time()

    #print("IN GETTING FIRST BASKET INFO")

    body_string = "No data found."
    first_basket_df = pd.DataFrame({"date": [datetime.now(timezone('US/Eastern'))], "string": [body_string], "tool_used": ["get_first_basket_info"]})

    try:
        todays_date = datetime.now().strftime('%Y-%m-%d')
        s3_file_path = f"first_basket/{todays_date}_first_basket.txt"

        async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,
                                             aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
            response = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_file_path)
            body = await response['Body'].read()
            body_string = body.decode('utf-8')

        # add to first_basket_df
        first_basket_df = pd.DataFrame({"date": [datetime.now(timezone('US/Eastern'))], "string": [body_string], "tool_used": ["get_first_basket_info"]})

    except:
        #log error
        log.error('get_first_basket_info', extra={**log_extras, 'try_again': 'True', 'error': traceback.format_exc()})
        try:
            # subtract a day from todays date
            yesterdays_date = (datetime.now() - pd.DateOffset(days=1)).strftime('%Y-%m-%d')
            s3_file_path = f"first_basket/{yesterdays_date}_first_basket.txt"

            async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
                response = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_file_path)
                body = await response['Body'].read()
                body_string = body.decode('utf-8')
            first_basket_df = pd.DataFrame({"date": [datetime.now(timezone('US/Eastern'))], "string": [body_string], "tool_used": ["get_first_basket_info"]})
        except:
            print(traceback.format_exc())
            #log error
            log.error('get_first_basket_info', extra={**log_extras, 'try_again': 'False', 'error': traceback.format_exc()})
            pass

    if body_string == "No data found.":
        log.error('get_first_basket_info', extra={**log_extras, 'error': 'No data found.'})

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'runtime': time.time() - start_time
    })

    # print("GOT FIRST BASKET INFO")
    #
    # print(body_string)

    return first_basket_df, []

# first_basket_df, models_used_array = asyncio.run(get_first_basket_info(
#     team_one="New York Knicks",
#     team_two="Detroit Pistons"
# ))
# for i, row in first_basket_df.iterrows():
#     print(f"NEW ROW")
#     print()
#     print()
#     print(row['date'])
#     print(row['string'])

