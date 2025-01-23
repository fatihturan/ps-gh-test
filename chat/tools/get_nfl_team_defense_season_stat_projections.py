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

async def get_nfl_team_defense_season_stat_projections(log_extras, **kwargs):
    start_time = time.time()
    async with aioboto3.Session().client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID,aws_secret_access_key=AWS_SECRET_ACCESS_KEY) as client:

        s3_team_defense_season_stats_projections_file_path = f'nfl_fantasy_data/rotowire_stats_projections_full_season_DEF.csv'
        team_defense_season_stats_projections_obj = await client.get_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=s3_team_defense_season_stats_projections_file_path)
        team_defense_season_stats_projections_body = await team_defense_season_stats_projections_obj['Body'].read()
        csv_string = team_defense_season_stats_projections_body.decode('utf-8')
        stats_projections = pd.read_csv(StringIO(csv_string))

        results_df = pd.DataFrame({"date": [datetime.now(timezone('US/Eastern'))], "string": [f"START NFL PROJECTIONS{stats_projections.to_string()}END NFL PROJECTIONS\n\n"], "tool_used": ["get_nfl_team_defense_season_stat_projections"]})

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'runtime': time.time() - start_time
    })
    return results_df, [] #no models used

# results_df, models_used_array = asyncio.run(get_nfl_team_defense_season_stat_projections())
# print(results_df['string'][0])