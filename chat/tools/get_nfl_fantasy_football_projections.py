from datetime import datetime
import time
from pytz import timezone
import pandas as pd
import aioboto3
from io import StringIO
from .helpers import AWS_STORAGE_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

import traceback
import logging
log = logging.getLogger('json')

async def get_nfl_fantasy_football_projections(player_name=None, position=None, week=None, need_dl_lb_db=False, log_extras={}, **kwargs):
    start_time = time.time()
    async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
        if week: s3_fantasy_projections_file_path = f'nfl_fantasy_data/rotowire_full_projections.csv'
        else: s3_fantasy_projections_file_path = f'nfl_fantasy_data/rotowire_season_projections.csv'

        fantasy_projections_obj = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_fantasy_projections_file_path)
        fantasy_projections_body = await fantasy_projections_obj['Body'].read()
        csv_string = fantasy_projections_body.decode('utf-8')
        fantasy_projections = pd.read_csv(StringIO(csv_string))

    if week:
        fantasy_projections = fantasy_projections[fantasy_projections['week'] == week]
        week_information = f" FOR WEEK {week}"
    else:
        #round difference_from_next to 2 decimal
        fantasy_projections['difference_from_next'] = fantasy_projections['difference_from_next'].round(2)
        week_information = ""

    #drop where projection is 0
    fantasy_projections = fantasy_projections[fantasy_projections['projection'] != 0]
    if position:
        fantasy_projections = fantasy_projections[fantasy_projections['position'] == position]

    elif not need_dl_lb_db:
        #drop where position is following: LB, S, CB, DE, DT
        fantasy_projections = fantasy_projections[~fantasy_projections['position'].isin(['LB', 'S', 'CB', 'DE', 'DT'])]

    if player_name:
        fantasy_projections = fantasy_projections[fantasy_projections['player_name'].str.contains(player_name, case=False)]

    #sort by projection, highest to lowest
    fantasy_projections = fantasy_projections.sort_values('projection', ascending=False)
    fantasy_projections_string = fantasy_projections.to_string(index=False)

    results_df = pd.DataFrame(columns=['date', 'string', 'tool_used'])
    results_df = pd.concat([results_df, pd.DataFrame({"date": [datetime.now(timezone('US/Eastern'))], "string": [f"START FANTASY FOOTBALL PROJECTIONS{week_information}\n\n{fantasy_projections_string}\n\nEND FANTASY FOOTBALL PROJECTIONS{week_information}\n\n"], "tool_used": ["get_nfl_fantasy_football_projections"]})])

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'player_name': player_name,
        'position': position,
        'week': week,
        'need_dl_lb_db': need_dl_lb_db,
        'runtime': time.time() - start_time
    })
    return results_df, [] #no models used

# results_df, models_used_array = asyncio.run(get_nfl_fantasy_football_projections(player_name="Tee Higgins", position="WR", week=-1))
# print(results_df['string'][0])