from datetime import datetime, timedelta
from pytz import timezone
import time
import pytz
import pandas as pd
import requests
import asyncio
from collections import defaultdict

import traceback
import logging
log = logging.getLogger('json')

team_full_names = {
    'ARI Cardinals': 'Arizona Cardinals',
    'ATL Falcons': 'Atlanta Falcons',
    'BAL Ravens': 'Baltimore Ravens',
    'BUF Bills': 'Buffalo Bills',
    'CAR Panthers': 'Carolina Panthers',
    'CHI Bears': 'Chicago Bears',
    'CIN Bengals': 'Cincinnati Bengals',
    'CLE Browns': 'Cleveland Browns',
    'DAL Cowboys': 'Dallas Cowboys',
    'DEN Broncos': 'Denver Broncos',
    'DET Lions': 'Detroit Lions',
    'GB Packers': 'Green Bay Packers',
    'HOU Texans': 'Houston Texans',
    'IND Colts': 'Indianapolis Colts',
    'JAX Jaguars': 'Jacksonville Jaguars',
    'KC Chiefs': 'Kansas City Chiefs',
    'LA Chargers': 'Los Angeles Chargers',
    'LA Rams': 'Los Angeles Rams',
    'LV Raiders': 'Las Vegas Raiders',
    'MIA Dolphins': 'Miami Dolphins',
    'MIN Vikings': 'Minnesota Vikings',
    'NE Patriots': 'New England Patriots',
    'NO Saints': 'New Orleans Saints',
    'NY Giants': 'New York Giants',
    'NY Jets': 'New York Jets',
    'PHI Eagles': 'Philadelphia Eagles',
    'PIT Steelers': 'Pittsburgh Steelers',
    'SEA Seahawks': 'Seattle Seahawks',
    'SF 49ers': 'San Francisco 49ers',
    'TB Buccaneers': 'Tampa Bay Buccaneers',
    'TEN Titans': 'Tennessee Titans',
    'WAS Commanders': 'Washington Commanders'
}

async def get_optimal_picks_for_nfl_survivor_pool(start_week=0, end_week=18, already_picked=None, must_pick=None, pruning_number=1000, log_extras={}, **kwargs):
    def get_all_games(already_picked, must_pick):
        def replace_team_names(df):
            df['home_name'] = df['home_name'].replace(team_full_names)
            df['away_name'] = df['away_name'].replace(team_full_names)
            return df

        def get_implied_odds(ml):
            try:
                ml = int(ml)
                try:
                    if ml < 0:
                        ml = -ml
                        implied_odds = ml / (ml + 100) * 100
                    else:
                        implied_odds = 100 / (ml + 100) * 100
                except Exception as e:
                    log.error('Error Getting Implied Odds', extra={'error': repr(e), **log_extras,})
                    implied_odds = 50
                return implied_odds
            except:
                return 0 #TODO- log here as well?

        def get_nfl_week_dates(year):
            # NFL season typically starts the week after Labor Day
            labor_day = datetime(year, 9, 1) + timedelta(days=(7 - datetime(year, 9, 1).weekday()))
            season_start = labor_day + timedelta(days=3)  # First game is on Thursday

            # Use UTC timezone
            season_start = pytz.UTC.localize(season_start)

            week_dates = []
            for i in range(18):  # 18 weeks in NFL season
                week_start = season_start + timedelta(weeks=i)
                week_end = week_start + timedelta(days=6)
                week_dates.append((week_start, week_end))

            return week_dates

        def assign_nfl_week(date, week_dates):
            # Special case for Christmas games Week 16
            if date.month == 12 and date.day == 25: return 16

            for i, (start, end) in enumerate(week_dates, 1):
                if start <= date.replace(tzinfo=pytz.UTC) <= end:
                    return i
            return None

        HEADERS = {
            "Host": "sportsbook.draftkings.com",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Referer": "https://sportsbook.draftkings.com/",
            "newrelic": "eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6IjU0NjgyNSIsImFwIjoiNjg0NDAxMzYiLCJpZCI6Ijc3YzNhOTQzMGUwZjM2YzgiLCJ0ciI6IjhkZjQxMDFjNDY1ZjFjY2Q1OWM1NjMzOWIzY2U1OTYwIiwidGkiOjE3MjI1MjMxMTU0Njd9fQ==",
            "Origin": "https://sportsbook.draftkings.com",
            "Connection": "keep-alive",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "TE": "trailers",
        }

        PROXIES = {
            'http': 'http://sp4556758d:LHA4nplgc7Stlgr+28@us.smartproxy.com:10000',
            'https': 'https://sp4556758d:LHA4nplgc7Stlgr+28@us.smartproxy.com:10000',
        }

        url = 'https://sportsbook.draftkings.com/sites/US-SB/api/v5/eventgroups/88808?format=json'

        data = None
        try:
            result = requests.get(url, headers=HEADERS, proxies=PROXIES)
            data = result.json()
        except:
            result = requests.get(url, headers=HEADERS, proxies=PROXIES)
            data = result.json()

        offers = data["eventGroup"]["offerCategories"][0]["offerSubcategoryDescriptors"][0]["offerSubcategory"]["offers"]
        offers_df = pd.DataFrame()

        for offer in offers:
            try:
                event_id = offer[2]["eventId"]
                away_name = offer[2]["outcomes"][0]["label"]
                away_odds_american = offer[2]["outcomes"][0]["oddsAmerican"]

                home_name = offer[2]["outcomes"][1]["label"]
                home_odds_american = offer[2]["outcomes"][1]["oddsAmerican"]

                # Data to append
                new_offer = {
                    "event_id": event_id,
                    "away_name": away_name,
                    "away_odds_american": away_odds_american,
                    "home_name": home_name,
                    "home_odds_american": home_odds_american
                }

                # Convert the dictionary to a DataFrame
                new_offer_df = pd.DataFrame([new_offer])

                # Use concat to append the new data
                offers_df = pd.concat([offers_df, new_offer_df], ignore_index=True)
            except:
                pass

        offers_df = replace_team_names(offers_df)
        offers_df['game_name'] = offers_df['away_name'] + " vs " + offers_df['home_name']

        events = data["eventGroup"]["events"]
        events_df = pd.DataFrame()

        for event in events:
            event_id = event["eventId"]
            event_name = event["name"]
            start_date = event["startDate"]

            # Data to append
            new_event = {
                "event_id": event_id,
                "event_name": event_name,
                "start_date": start_date
            }

            # Convert the dictionary to a DataFrame
            new_event_df = pd.DataFrame([new_event])

            # Append the DataFrame to events_df
            events_df = pd.concat([events_df, new_event_df], ignore_index=True)

        events_df.to_csv('events_df.csv', index=False)

        #merge two on event_id
        merged_df = pd.merge(offers_df, events_df, on="event_id")

        # Convert start_date to datetime
        merged_df['start_date'] = pd.to_datetime(merged_df['start_date'])

        merged_df['home_implied_odds'] = merged_df['home_odds_american'].apply(get_implied_odds)
        merged_df['away_implied_odds'] = merged_df['away_odds_american'].apply(get_implied_odds)

        merged_df['home_implied_odds'] = merged_df['home_implied_odds'] / (merged_df['home_implied_odds'] + merged_df['away_implied_odds']) * 100
        merged_df['away_implied_odds'] = 100 - merged_df['home_implied_odds']

        #subtract 5 hours from start_date to get EST
        #if date is before November 3rd, 2024 subtract 4 hours
        utc = pytz.UTC
        for i, row in merged_df.iterrows():
            if row['start_date'] < utc.localize(datetime(2024, 11, 3)):
                merged_df.at[i, 'start_date'] = row['start_date'] - timedelta(hours=4)
            else:
                merged_df.at[i, 'start_date'] = row['start_date'] - timedelta(hours=5)

        # get day of the week for each game
        merged_df['day_of_week'] = merged_df['start_date'].dt.day_name()

        # Get the year of the first game
        first_game_year = merged_df['start_date'].min().year

        # Generate week dates
        week_dates = get_nfl_week_dates(first_game_year)

        # Assign week numbers
        merged_df['week'] = merged_df['start_date'].apply(lambda x: assign_nfl_week(x, week_dates))

        # Sort the dataframe by week and start_date
        merged_df = merged_df.sort_values(['week', 'start_date'])
        merged_df.to_csv('merged_df.csv', index=False)

        home_games = merged_df.rename(columns={"home_name": "team_name", "away_name": "opponent_name", "home_odds_american": "odds_american", "home_implied_odds": "implied_odds"})

        #drop away_odds_american
        home_games = home_games.drop(columns=["away_odds_american", "away_implied_odds"])
        away_games = merged_df.rename(columns={"away_name": "team_name", "home_name": "opponent_name", "away_odds_american": "odds_american", "away_implied_odds": "implied_odds"})

        #drop home_odds_american
        away_games = away_games.drop(columns=["home_odds_american", "home_implied_odds"])

        #concatenate home_games and away_games
        all_games = pd.concat([home_games, away_games])
        all_games = all_games.sort_values(["week", "start_date"])

        columns = [
            'event_id',
            'event_name',
            'start_date',
            'day_of_week',
            'week',
            'game_name',
            'team_name',
            'opponent_name',
            'odds_american',
            'implied_odds'
        ]
        all_games = all_games[columns]

        if already_picked is None: already_picked = []
        if must_pick is None: must_pick = {}

        # Remove teams from must_pick if they're in already_picked
        new_must_pick = {}
        must_pick_error_string = ""
        for week, team in must_pick.items():
            if team in already_picked:
                must_pick_error_string += f"Warning: {team} was removed from must pick for week {week} because it's already been used.\n"
            else:
                new_must_pick[week] = team
        must_pick = new_must_pick

        # Remove already picked teams from all_games
        all_games = all_games[~all_games['team_name'].isin(already_picked)]

        # Filter games based on must_pick
        for week, team in must_pick.items():
            all_games = all_games[
                ((all_games['week'] == week) & (all_games['team_name'] == team)) |
                (all_games['week'] != week)
            ]

        all_games['implied_odds'] = all_games['implied_odds'].astype(float) / 100  # Convert to probability

        return all_games, must_pick_error_string

    start_time = time.time()
    all_games, must_pick_error_string = await asyncio.to_thread(get_all_games, already_picked, must_pick)

    # Create a dictionary of games by week
    games_by_week = defaultdict(list)
    for _, game in all_games.iterrows():
        games_by_week[game['week']].append((game['team_name'], game['implied_odds']))

    # Sort weeks and filter by start week and end_week
    weeks = sorted([week for week in games_by_week.keys() if (week >= start_week) and (week <= end_week)])

    def find_optimal_picks(weeks, games_by_week, pruning_number):
        # Initialize with first week
        current_states = {frozenset([team]): (odds, [{"week": weeks[0], "team": team}]) for team, odds in games_by_week[weeks[0]]}

        # Iterate through remaining weeks
        for week in weeks[1:]:
            new_states = {}
            for picked_teams, (current_odds, picks) in current_states.items():
                for team, odds in games_by_week[week]:
                    if team not in [pick["team"] for pick in picks]:
                        new_picked_teams = frozenset(picked_teams | {team})
                        new_odds = current_odds * odds
                        if new_picked_teams not in new_states or new_odds > new_states[new_picked_teams][0]:
                            new_states[new_picked_teams] = (new_odds, picks + [{"week": week, "team": team}])

            # Prune states to keep only the top N
            current_states = dict(sorted(new_states.items(), key=lambda x: x[1][0], reverse=True)[:pruning_number])

        # Find best final state
        best_odds, best_picks = max(current_states.values(), key=lambda x: x[0])

        return best_picks, best_odds

    # Run the algorithm
    optimal_picks, final_odds = await asyncio.to_thread(find_optimal_picks, weeks, games_by_week, pruning_number)

    optimal_picks_string = "Reviewing the current betting odds for NLF games, these are the current optimal picks for each week:\n"
    for pick in optimal_picks:
        game = all_games[(all_games['week'] == pick['week']) & (all_games['team_name'] == pick['team'])].iloc[0]
        opponent = game['opponent_name']
        optimal_picks_string += f"Week {pick['week']}: {pick['team']} (vs {opponent}) (Implied odds: {game['implied_odds']:.2%})\n"

    optimal_picks_string += f"\nFinal aggregate implied odds of winning: {final_odds:.2%}\n"

    # Calculate week-to-week aggregate odds
    optimal_picks_string += "\nWeek-to-week aggregate implied odds:\n"
    aggregate_odds = 1.0
    for pick in optimal_picks:
        game = all_games[(all_games['week'] == pick['week']) & (all_games['team_name'] == pick['team'])].iloc[0]
        aggregate_odds *= game['implied_odds']
        optimal_picks_string += f"After Week {pick['week']}: {aggregate_odds:.2%}\n"

    optimal_picks_string += f"\n{must_pick_error_string}"
    optimal_picks_string = optimal_picks_string.strip()

    result_df = pd.DataFrame({"date": [datetime.now(timezone('US/Eastern'))], "string": [optimal_picks_string], "tool_used": ["search_statmuse"]})

    log.info('toolCompleted', extra={
        **log_extras,
        'models_used_array': [],
        'start_week': start_week,
        'end_week': end_week,
        'alread_picked': already_picked,
        'must_pick': must_pick,
        'pruning_number': pruning_number,
        'runtime': time.time() - start_time
    })
    return result_df, [] #no models used

# answer, models_used_array = asyncio.run(get_optimal_picks_for_nfl_survivor_pool())
# print(answer['string'][0])