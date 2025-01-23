from datetime import datetime
import time
from pytz import timezone
import pandas as pd
import aioboto3
from io import StringIO
import difflib
from .helpers import AWS_STORAGE_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

import traceback
import logging
log = logging.getLogger('json')

async def get_nfl_player_season_stat_projections(position=None, player_name=None, full_season_or_rest_of_season="full_season", log_extras={}, **kwargs):
    start_time = time.time()
    async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:
        if full_season_or_rest_of_season == "full_season":
            s3_stats_projections_file_path = f'nfl_fantasy_data/rotowire_stats_projections_full_season.csv'
        else:
            s3_stats_projections_file_path = f'nfl_fantasy_data/rotowire_stats_projections_rest_of_season.csv'

        stats_projections_obj = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_stats_projections_file_path)
        stats_projections_body = await stats_projections_obj['Body'].read()
        csv_string = stats_projections_body.decode('utf-8')
        stats_projections = pd.read_csv(StringIO(csv_string))

    if position:
        positions = ['QB', 'RB', 'WR', 'TE', 'K', 'DT', 'CB', 'DE', 'LB', 'S', 'DB', 'FB']
        if position not in positions:
            #TODO- log? reformat?
            try:
                closest_match = difflib.get_close_matches(position, positions)
                position = closest_match[0]
            except:
                pass
        stats_projections = stats_projections[stats_projections['position'] == position]
    if player_name:
        stats_projections = stats_projections[stats_projections['player'].str.contains(player_name, case=False)]

    #drop columns that are blank
    stats_projections = stats_projections.dropna(axis=1, how='all')
    results_df = pd.DataFrame({"date": [datetime.now(timezone('US/Eastern'))], "string": [f"START NFL PROJECTIONS{stats_projections.to_string()}END NFL PROJECTIONS\n\n"], "tool_used": ["get_nfl_player_season_stat_projections"]})

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'position': position,
        'player_name': player_name,
        'season_type': full_season_or_rest_of_season,
        'runtime': time.time() - start_time
    })
    return results_df, [] #no models used

# results_df, models_used_array = asyncio.run(get_nfl_player_season_stat_projections(position="QB"))
# print(results_df['string'][0])