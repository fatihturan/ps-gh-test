from apscheduler.schedulers.background import BackgroundScheduler
from .jobs import ResetModelsBuiltTodayAsync, Add_Sheet, Get_Leaderboards, Get_Last_Week_Trophies, Reset_Instances, Get_Users

def start_jobs():
    scheduler = BackgroundScheduler(timezone='America/New_York')

    #Add our task to scheduler.

    scheduler.add_job(ResetModelsBuiltTodayAsync, 'cron', hour='02', minute='00')
    scheduler.add_job(Get_Leaderboards, 'interval', minutes=60)
    scheduler.add_job(Get_Last_Week_Trophies, 'interval', minutes=60)
    scheduler.add_job(Reset_Instances, 'cron', hour='08', minute='00')
    scheduler.add_job(Get_Users, 'interval', hours=2)
    #scheduler.add_job(prop_game_complete_tag, 'interval', minutes=15)
    #scheduler.add_job(prop_master_score_update, 'interval', minutes=15)

    #And finally start.
    scheduler.start()

def initialize_instances():
    scheduler = BackgroundScheduler(timezone='America/New_York')
    scheduler.add_job(Reset_Instances, id="Initialize")
    scheduler.start()

def start_sheet(data_type, proper_name, id):
    scheduler = BackgroundScheduler(timezone='America/New_York')
    scheduler.add_job(Add_Sheet, args=(data_type, proper_name, id))
    scheduler.start()