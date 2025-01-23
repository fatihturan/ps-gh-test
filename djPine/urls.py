"""djPine URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path,include
from pineproxy.views import TestProxyView,index, project, project_bot, stats_generating, help_index, help_iframe, home, getting_started, get_data_access,predict,predict_mlb_form_data,predict_nfl_form_data,predict_nfl_cbs_form_data,predict_nba_form_data, predict_nhl_form_data, activate_line_dataset,change_active_line_csv_status,predict_generating, predict_results, leaderboard, check_instance, analyze, prop_sheet, hr_sheet, anytime_td_sheet, thrive_sheet, pp_sheet, underdog_sheet, joke_sheet_tb, joke_sheet_nba, one_hundred_sheet, full_consistency_sheet, consistency_sheet, ps_sheet, discord_bot, prop_bet, bet_builder, get_book, model_score,ListDatafilesS3,health_check
from django.contrib.auth import views as auth_views

from django.views.static import serve

from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from users import views as users_views
from users.views import (
    logout,access_denied, save_changes,terms,privacy,activate_dataset,change_active_zip_status,
    activate,delete_charts,beta_user_random_str,beta_user,refresh_datasheets,set_access_beta_user,
    admin_sites,log_file_fetch, beta_code_admin_notification,user_invite_beta_user,invite_beta_status,
    no_data_access
    )

from users.views import FollowDoneView, UnFollowDoneView, user_sport_choice_add
from django.contrib.auth.decorators import login_required

#custom auth
from pineproxy.middlewares.auth import custom_auth_middleware
from blog.views import SearchListView
#Froala
from froala_editor import views
from blog.decorators import unauthenticated_user

urlpatterns = [
    #REST Data Endpoints
    path('data/', include('data.urls')),

    re_path(r'admin/?', admin.site.urls),
    re_path(r'notifications/?',include('notifications.urls')),
    path('', include('blog.urls',namespace='stories')),
    path('stats/<sport_name>/', index, name='stats'),
    path('stats/<sport_name>/Generating', stats_generating, name='stats_generating'),
    path('stats/project/<sport_name>/<player_name>/<stat>/<prop>/<games_back>/<split>/<games_without_player>/', project, name='project'),
    path('stats/project/<sport_name>/<player_name>/<stat>/<prop>/<games_back>/<split>/', project, name='project'),
    path('stats/project/<sport_name>/<player_name>/<stat>/<prop>/<games_back>/', project, name='project'),

    path('stats/bot/project/<sport_name>/<player_name>/<stat>/<prop>/<games_back>/<split>/<games_without_player>/', project_bot, name='project_bot'),
    path('stats/bot/project/<sport_name>/<player_name>/<stat>/<prop>/<games_back>/<split>/', project_bot, name='project_bot'),
    path('stats/bot/project/<sport_name>/<player_name>/<stat>/<prop>/<games_back>/', project_bot, name='project_bot'),

    path('stats/props/<sport_name>/', prop_sheet, name='props'),
    path('stats/props/<sport_name>/<sort>/', prop_sheet, name='props'),
    path('stats/NFL/TDs/', anytime_td_sheet, name='anytime_tds'),
    path('stats/NFL/TDs/<sort>/', anytime_td_sheet, name='anytime_tds'),
    path('stats/MLB/HRs/', hr_sheet, name='hrs'),
    path('stats/MLB/HRs/<sort>/', hr_sheet, name='hrs'),
    path('Thrive/<sport_name>/', thrive_sheet, name='thrive_props'),
    path('PrizePicks/<sport_name>/', pp_sheet, name='pp_props'),
    path('PrizePicks/<sport_name>/<sort>/', pp_sheet, name='pp_props'),
    path('Underdog/<sport_name>/', underdog_sheet, name='underdog_props'),
    path('Underdog/<sport_name>/<sort>/', underdog_sheet, name='underdog_props'),
    path('stats/analyze/<user_id>/<random_number>/', analyze, name='analyze'),
    path('check_instance/<instance_id>', check_instance, name='check_instance'),
    path('predict/<sport_name>/', predict, name='predict'),
    re_path(r'help/?', help_index, name='help'),
    path('predict/<sport_name>/<pt>/Generating', predict_generating, name='predict_generating'),
    path('predict/<sport_name>/<pt>', predict_results, name='predict_results'),
    path('predict/MLB/Building/Model', predict_mlb_form_data, name='predict_MLB'),
    path('predict/NFL/Building/Model', predict_nfl_form_data, name='predict_NFL'),
    path('predict/NFL-CBS/Building/Model', predict_nfl_cbs_form_data, name='predict_NFL_CBS'),
    path('predict/NBA/Building/Model', predict_nba_form_data, name='predict_NBA'),
    path('predict/NHL/Building/Model', predict_nhl_form_data, name='predict_NHL'),
    path('predict/<sport_name>/<pt>/Leaderboard', leaderboard, name='leaderboard'),
    path('predict/Model_Score/<sport_name>/<model_type>/', model_score, name='model_score'),
    path('predict/Model_Score/<sport_name>/<model_type>/<confidence_score>/', model_score, name='model_score'),
    path('help-iframe/', help_iframe, name='help-iframe'),
    re_path(r'home/?', home, name='home'),
    path('save-changes/<data_id>/', save_changes, name='save_as'),
    re_path(r'login/?', unauthenticated_user(auth_views.LoginView.as_view(template_name='users/login.html')), name='login'),
    path('activate/<uidb64>/<token>/',activate, name='activate'),
    re_path(r'logout/?', logout, name='logout'),
    path('terms/', terms, name='terms'),
    path('privacy/', privacy, name='privacy'),
    path('generate_beta_code/', beta_user_random_str, name='beta_code'),
    path('beta_user/', beta_user, name='beta_user'),
    path('activate_dataset/', activate_dataset, name='activate_dataset'),
    path('settings/set_access_beta_user/', set_access_beta_user, name='set_access_beta_user'),
    path('settings/refresh_datasheets/', refresh_datasheets, name='refresh_datasheets'),
    path('change_active_zip_status/', change_active_zip_status, name='change_active_zip_status'),
    path('admin_sites/', admin_sites, name='admin_sites'),
    path('log_file/', log_file_fetch, name='log_file_fetch'),
    path('Joke/<prop>/', joke_sheet_nba, name='joke_sheet'),
    path('ParlayScience/<league>/', ps_sheet, name='ps_sheet'),
    path('ParlayScience/<league>/<game>/', ps_sheet, name='ps_sheet'),
    path('ParlayScience/<league>/<game>/<games_back>/', ps_sheet, name='ps_sheet'),
    path('ConsistencySheets/<league>/',  consistency_sheet, name='consistency_sheet'),
    path('ConsistencySheets/<league>/<game>/',  consistency_sheet, name='consistency_sheet'),
    path('ConsistencySheets/<league>/<game>/<games_back>/',  consistency_sheet, name='consistency_sheet'),
    path('ConsistencySheets/<league>/<game>/<games_back>/<percent>/', consistency_sheet, name='consistency_sheet'),
    path('ConsistencySheets/<league>/<game>/<games_back>/<percent>/<ou>/', consistency_sheet, name='consistency_sheet'),
    path('FullConsistencySheets/<league>/', full_consistency_sheet, name='full_consistency_sheet'),
    path('FullConsistencySheets/<league>/<games_back>/', full_consistency_sheet, name='full_consistency_sheet'),
    path('FullConsistencySheets/<league>/<games_back>/<percent>/', full_consistency_sheet, name='full_consistency_sheet'),
    path('FullConsistencySheets/<league>/<games_back>/<percent>/<ou>/', full_consistency_sheet, name='full_consistency_sheet'),
    path('100Sheet/<league>/', one_hundred_sheet, name='one_hundred_sheet'),
    path('100Sheet/<league>/<ou>/', one_hundred_sheet, name='one_hundred_sheet'),
    path('Books/<book>', get_book, name="get_book"),
    path("DiscordBot/", discord_bot, name="discord_bot"),
    path("bet/<bet_id>", bet_builder, name="bet_builder"),
    path("prop-bet/<bet_id>", prop_bet, name="bet_builder"),
    path('reset_password/',
     auth_views.PasswordResetView.as_view(template_name='users/password_reset.html'),
     name="reset_password"),

    path('reset_password_sent/',
        auth_views.PasswordResetDoneView.as_view(template_name='users/password_reset_sent.html'),
        name="password_reset_done"),

    path('reset/<uidb64>/<token>/',
     auth_views.PasswordResetConfirmView.as_view(template_name='users/password_reset_form.html'),
     name="password_reset_confirm"),

    path('reset_password_complete/',
        auth_views.PasswordResetCompleteView.as_view(template_name='users/password_reset_done.html'),
        name="password_reset_complete"),

    re_path(r'register/?', users_views.register, name='register-users'),
    re_path(r'settings/?', users_views.profile, name='settings'),
    path('search-user/', users_views.SearchView, name='search_user'),
    path('search/', SearchListView.as_view(), name='search'),
    path('access_denied/', access_denied, name='access_denied'),
    path('settings/delete-chart-file/<name>/',delete_charts, name='delete_chart'),
    path('getting-started/',getting_started, name='getting_started'),
    path('get-data-access/',get_data_access, name='get_data_access'),
    #path('send-notification/', beta_code_admin_notification, name='admin_beta_notification'),
    path('send-invite-email/', user_invite_beta_user, name='user_beta_notification'),
    path('beta-user-status/', invite_beta_status, name='invite_beta_status'),
    path('activate_line_dataset/', activate_line_dataset, name='activate_line_dataset'),
    path('change_active_line_csv_status/', change_active_line_csv_status, name='change_active_line_csv_status'),
    # Follow and unfollow view
    path('follow/done/', login_required(FollowDoneView.as_view()), name='follow_done_view'),
    path('unfollow/done/', login_required(UnFollowDoneView.as_view()), name='unfollow_done_view'),
    path('delete_datafiles_s3/',ListDatafilesS3, name='delete_datafiles_s3'),
    #finds people who no data access
    path('no_data_access/', no_data_access, name='no_data_access'),

    path('prop-master/new/', users_views.prop_master_new, name='prop_master_new'), #screen1
    path('prop-master/invite/<str:uid>/', users_views.prop_master_invite, name='prop_master_invite'),
    path('prop-master/props/<str:uid>/', users_views.PropMaster_player2, name='prop_master_player2'),#screen2 player2 select props
    path('prop-master/game/<str:uid>/', users_views.game_score, name='game_score'), #screen3
    path('prop-master/home/', users_views.games_home, name='prop_master_home'), #screen4
    path('prop-master/user/<str:username>/', users_views.prop_master_profile, name='prop_master_profile'), #user profile

    path('add_prop_data/', users_views.add_prop_data, name='add_prop_data'),#Ajax call
    path('prop-master/p2_data_save/<str:uid>/', users_views.PropMaster_player2_data_save, name='prop_master_p2_data_save'), #Ajax call
    

    path('user-sports-set/', user_sport_choice_add, name='user_sports_add'),

    re_path(r'subscribe/?', include('payments.urls')),

    re_path(r'chat/?', include('chat.urls')),

    path('api/', include('api.urls')),  # Include API app URLs

    path('health/', health_check, name='health_check'),

    re_path(r'^s3direct/', include('s3direct.urls')),
    re_path(r'^media/(?P<path>.*)$', serve, {
            'document_root': settings.MEDIA_ROOT,
        }),
    re_path(r'^static/(?P<path>.*)$', serve, {
            'document_root': settings.STATIC_ROOT,
        }),

    re_path(r'^froala_editor/', include('froala_editor.urls')),
    re_path(r'^(?P<path>.*)$', custom_auth_middleware(TestProxyView.as_view())),

]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


#Django-ApSchedule
from pineproxy.scheduler import start_jobs

start_jobs()
#End of Django-ApSchedule