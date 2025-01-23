from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm, UserMultiSelectForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User,Group
from django.contrib.auth import logout as Logout, login
from blog.decorators import unauthenticated_user
from django.http import HttpResponse
from django.urls import reverse
from users.models import S3ZipUpload,ActiveDatafilesZip,BetacodeInvite,UserSportsChoices,Follow,PropMaster
from django.views.generic import View
from django.http import JsonResponse
from blog.views import check_user_groups,get_ip
from django.conf import settings as conf_settings
from notifications.models import UserNotification as Notification
from django.utils import timezone
from blog.models import Post, Comment, BlogSports
from pineproxy.models import Sports_name
#signup token
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_decode
#dtale req files
import dtale
import pandas as pd
import dtale.global_state as global_state
from pineproxy.scheduler import initialize_instances
#logger
import logging,traceback
logger = logging.getLogger('django')
from datetime import datetime, timedelta
from io import StringIO
#prop master game use
from django.core.mail import send_mail
import json
from pandas.api.types import CategoricalDtype
import pytz
import dateutil.parser as parser
from users.models import BetaCode
from django.conf import settings
from chat.views import get_jaxon_info

UserModel = get_user_model()

def save_changes(request,data_id):
    user = request.user
    user_id = request.user.id
    user = str(user)
    user_id = str(user_id)
    data_id_str = str(data_id)

    usr_and_id = user+'_'+user_id
    absolute_path = './datafiles/'+ usr_and_id

    df = dtale.get_instance(data_id).data
    csv_file = df.to_csv(absolute_path+'/'+user+'_'+data_id_str+'.csv',encoding='utf-8', index=False)
    return redirect("/")

def check_prop_master_user(user):
    if user:
        is_user_group = False
        is_user_group = user.groups.filter(name__in=['prop_master_user']).exists()
        if is_user_group:
            return True
        else:
            return False

@unauthenticated_user
def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        get_beta_code = request.POST.get('invite_code')
        if get_beta_code:
            obj = BetaCode.objects.filter(status="False")
            if obj:
                all_beta_code = [i.code for i in obj]
                matching_code = [s for s in all_beta_code if get_beta_code in s]
                if not matching_code:
                    messages.warning(request, 'Invalid invite code')
                    return redirect('register-users')
                else:
                    print("Found matching code")
                for beta_row in obj:
                    if beta_row.code==get_beta_code:
                        print("Found beta code")
                        if form.is_valid():
                            user = form.save(commit=False)
                            user.is_active = True
                            beta_row.status="True"
                            str_user = str(user)
                            beta_row.user_connected=str_user
                            beta_row.save()
                            user.save()
                            # User add to Beta User Group
                            my_group = Group.objects.get(name='beta_user')
                            user.groups.add(my_group)
                            my_group = Group.objects.get(name='data_access_user')
                            user.groups.add(my_group)
                            user.save()
                            login(request, user)
                            return redirect('/subscribe/')
            else:
                messages.warning(request, 'Invalid invite code')
                return redirect('register-users')
        else:
            if form.is_valid():
                user = form.save(commit=False)
                user.is_active = True
                user.save()
                login(request, user)
                return redirect('/subscribe/')
    else:
        form = UserRegisterForm()
    logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
    return render(request, 'users/register.html', {'form': form})

def activate(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = UserModel._default_manager.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and default_token_generator.check_token(user, token):
        str_user = str(user)
        
        #User add to Beta User Group
        beta_user_group_exist =  Group.objects.filter(name='beta_user').exists()
        if not beta_user_group_exist:
            Group.objects.create(name='beta_user')
        group = Group.objects.get(name='beta_user')
        user.groups.add(group)

        obj_betacode = BetaCode.objects.filter(user_connected=str_user)
        if obj_betacode:
            my_group = Group.objects.get(name='data_access_user')
            my_group.user_set.add(user)

        user.is_active = True
        user.save()
        logger.info("USER_REGISTRATION {} {} {}".format(request.get_full_path(), get_ip(request), request.user.id))
        logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
        messages.success(request, 'Thank you for your email confirmation. Now you can login to your account.')
        return redirect('/login/')
    else:
        messages.error(request, 'Activation link is invalid!')
        return redirect('/login/')


@login_required
def profile(request):
    context = {}
    if request.method == 'POST':
        uform = UserUpdateForm(request.POST, instance=request.user)
        pform = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        if uform.is_valid():
            uform.save()
        if pform.is_valid():
            pform.save()
        if uform.is_valid() or pform.is_valid():
            logger.info("SETTINGS_UPDATED {} {} {}".format(request.get_full_path(), get_ip(request),request.user.id))
            messages.success(request, f'Your settings have been updated.')
        return redirect('settings')
    else:
        uform = UserUpdateForm(instance=request.user)
        pform = ProfileUpdateForm(instance=request.user.profile)
    user_id = str(request.user.id)
    
    #S3 dir file list
    session = boto3.session.Session(aws_access_key_id=conf_settings.AWS_ACCESS_KEY_ID,aws_secret_access_key=conf_settings.AWS_SECRET_ACCESS_KEY)
    s3 = session.resource("s3")
    bucket = s3.Bucket(conf_settings.USER_CHARTS_BUCKET_S3)
    S3_file_path = 'charts/'+user_id+'/'
    usr_id = user_id+'/'
    new_s3_html = []
    for object_summary in bucket.objects.filter(Prefix=S3_file_path):
        path_file = object_summary.key
        html_file_name = path_file.split(usr_id)[-1]
        new_s3_html.append(html_file_name)

    if new_s3_html:
        context['charts_name']=new_s3_html
        context['used_charts_name'] = request.user.profile.used_charts()
        context['unused_charts_name'] = list(set(context['charts_name']) - set(context['used_charts_name']))
        #removes mobile chart
        context['unused_charts_name'] = [i for i in context['unused_charts_name'] if not "mobile" in i]
    else:
        context['charts_name']=['No Saved Charts']

    context['image_url'] = request.user.profile.image_url
    context['uform'] = uform
    context['pform'] = pform
    try:
        users_selected_sports =  UserSportsChoices.objects.get(user=request.user.id).sports.all()
    except:
        users_selected_sports = ['All Sports']
    context['UserSports'] = users_selected_sports
    is_user_group = check_user_groups(request.user)
    context['is_group']=is_user_group
    #context['is_prop_master_user'] = check_prop_master_user(request.user)
    context['is_ai_user'] = request.user.groups.filter(name__in=['ai_user']).exists()
    sports_name = Sports_name.objects.all().values_list('name',flat=True)
    context['sports_name']=sports_name
    blog_sports_name = BlogSports.objects.all()
    context['blog_sports_name']=blog_sports_name

    #get jaxon info
    is_jaxon_user, current_chat_count, max_chat_count, monthly_period_end_string, customer_portal_url = get_jaxon_info(request.user)

    remaining_chat_count = max_chat_count - current_chat_count
    if remaining_chat_count < 0:
        remaining_chat_count = 0

    context['is_jaxon_user'] = is_jaxon_user
    context['current_chat_count'] = current_chat_count
    context['max_chat_count'] = max_chat_count
    context['remaining_chat_count'] = remaining_chat_count
    context['monthly_period_end_string'] = monthly_period_end_string
    context['customer_portal_url'] = customer_portal_url

    logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))

    return render(request, 'users/settings.html', context)



@login_required
def SearchView(request):
    if request.method == 'POST':
        kerko = request.POST.get('search')
        results = User.objects.filter(username__contains=kerko)
        context = {
            'results':results
        }
        is_user_group = check_user_groups(request.user)
        context['is_group']=is_user_group
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        context['is_ai_user'] = request.user.groups.filter(name__in=['ai_user']).exists()
        logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
        return render(request, 'users/search_result.html', context)

def logout(request):
    logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
    Logout(request)
    return redirect('login')


@login_required
def access_denied(request):
    return render(request, 'users/access_denied.html')

def terms(request):
    context = {}
    logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
    is_user_group = check_user_groups(request.user)
    context['is_group']=is_user_group
    #context['is_prop_master_user'] = check_prop_master_user(request.user)
    context['is_ai_user'] = request.user.groups.filter(name__in=['ai_user']).exists()
    return render(request,'terms.html', context)

def privacy(request):
    context = {}
    logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
    is_user_group = check_user_groups(request.user)
    context['is_group']=is_user_group
    #context['is_prop_master_user'] = check_prop_master_user(request.user)
    context['is_ai_user'] = request.user.groups.filter(name__in=['ai_user']).exists()
    return render(request,'privacy.html', context)

@login_required
def activate_dataset(request):
    context = {}
    is_admin_group = request.user.groups.filter(name__in=['admin_user']).exists()
    if is_admin_group:
        obj_s3_files = S3ZipUpload.objects.all().order_by('-date_uploaded')
        all_zip_files = []
        if obj_s3_files:
            for files in obj_s3_files:
                raw_file_name = files.file
                file_id = str(files.id)
                file_name =raw_file_name.split("datafiles/")[-1].strip()
                if '.zip' in file_name:
                    all_zip_files.append(file_name)

        activate_zip = ActiveDatafilesZip.objects.filter(status="True").values_list('data_zip_name',flat=True)

        is_user_group = check_user_groups(request.user)
        #Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name',flat=True)
        context['sports_name']=sports_name
        #Get Active zip sheet names and sport
        active_sports_and_sheets = Sports_name.objects.values('name','active_sheet_name')
        
        context['is_group']=is_user_group
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        context['is_ai_user'] = request.user.groups.filter(name__in=['ai_user']).exists()
        context['all_zip_files']=all_zip_files
        context['active_sports_and_sheets']=active_sports_and_sheets
        context['activate_zip']=activate_zip

        logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
        return render(request, "users/active_dataset.html", context)
    return redirect("/")

def change_active_zip_status(request):
    logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
    if request.method == "POST":
        selected = request.POST.get('optradio')
        selected_sport = request.POST.get('select_sport_name')
        # obj_activate_zip = ActiveDatafilesZip.objects.filter(status="True")
        try:
            obj_sport_name = Sports_name.objects.get(name__iexact=selected_sport)
        except:
            obj_sport_name = None
        if obj_sport_name:
            # for active_file in obj_activate_zip:
                # active_file.data_zip_name=selected
                # active_file.status = "False"
            obj_sport_name.active_sheet_name=selected
            # active_file.save()
            obj_sport_name.save()                
            for data_id in global_state.get_data():
                # name = (global_state.get_metadata(data_id) or {}).get('name')
                global_state.cleanup(data_id)

            initialize_instances()

            logger.info("ACTIVE_ZIP_CHANGE {} {} {}".format(request.get_full_path(), get_ip(request),request.user.id))
            messages.success(request, 'Zip status changed successfully and killed all instances')
        else:
            messages.warning(request, 'Something  Wrong.. Please try again!')
        #     obj = ActiveDatafilesZip.objects.create(data_zip_name=selected,status="True")
        #     #obj.data_zip_name = selected
        #     obj.save()
        #     for data_id in global_state.get_data():
        #         # name = (global_state.get_metadata(data_id) or {}).get('name')
        #         global_state.cleanup(data_id)
        #         logger.info("ACTIVE_ZIP_CHANGE {} {} {}".format(request.get_full_path(), get_ip(request),request.user.id))
        #         messages.success(request, 'Zip status changed successfully and killed all instances')
        return redirect(reverse('activate_dataset'))
    return redirect(reverse('activate_dataset'))

import boto3
@login_required
def delete_charts(request,name=None):
    client = boto3.client('s3',aws_access_key_id=conf_settings.AWS_ACCESS_KEY_ID,aws_secret_access_key=conf_settings.AWS_SECRET_ACCESS_KEY)
    if name:
        try:
            user_id = str(request.user.id)
            file_path = 'charts/'+user_id+'/'+name
            client.delete_object(Bucket=conf_settings.USER_CHARTS_BUCKET_S3,Key=file_path)
            logger.info("DELETE_CHART {} {} {}".format(request.get_full_path(), get_ip(request),request.user.id))
            messages.warning(request,"Chart Deleted Successfully!")
            msg="file deleted"
        except Exception as e:
            logger.error(e)
        return JsonResponse({"msg":msg})
    return redirect(reverse('settings'))


from django.utils.crypto import get_random_string
from users.models import BetaCode
@login_required
def beta_user_random_str(request):
    context = {}
    logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
    is_admin_group = request.user.groups.filter(name__in=['admin_user']).exists()
    if is_admin_group:
        if request.method=="POST":
            get_number = int(request.POST.get('number_of_code'))
            for i in range(get_number):
                #random_str = get_random_string(length=6).upper()
                random_str = "Moonshot"
                obj = BetaCode.objects.create(code=random_str)
                obj.save()
            logger.info("BETA_CODE_GENERATED {} {} {} Beta Code Generated".format(request.get_full_path(), get_ip(request),request.user.id))
            messages.success(request,"{} codes generated successfully".format(get_number))
        return render(request,"users/beta_code_generate.html")
    return redirect("/")

@login_required
def beta_user(request):
    logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
    is_admin_group = request.user.groups.filter(name__in=['admin_user']).exists()
    if is_admin_group:
        context = {}
        beta_users = []
        obj_beta_user = BetaCode.objects.filter(status="True")
        for i in obj_beta_user:
            obj_dict = {}
            obj_dict["user"]=i.user_connected
            obj_dict["beta_code"]=i.code
            beta_users.append(obj_dict)

        get_codes = BetaCode.objects.filter(status="False",flag=None)
        if get_codes:
            codes=[]
            for i in get_codes:
                codes.append(i.code)
            context["beta_codes"]=codes

        context["beta_users"]=beta_users
        return render(request,'users/beta_users.html',context)
    return redirect("/")

@login_required
def refresh_datasheets(request):
    logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
    user_id = str(request.user.id)
    user_data_id = []
    if user_id:
        for data_id in global_state.get_data():
            user_sheet = user_id+"_"            
            if user_sheet in data_id:
                user_data_id.append(data_id)
            if user_data_id:
                for data_id in user_data_id:
                    global_state.cleanup(data_id)
        #[messages.success(request,"All Running Datasets killed") if user_data_id else messages.warning(request,"No Running any Datasets")]
        return redirect(reverse('settings'))
    return redirect(reverse('settings'))


@login_required
def set_access_beta_user(request):
    if request.method=="POST":
        get_beta_code = request.POST.get('beta_code')
        if get_beta_code:
            obj = BetaCode.objects.filter(status="False")
            if obj:
                all_beta_code = [i.code for i in obj]
                matching_code = [s for s in all_beta_code if get_beta_code in s]
                if not matching_code:
                    messages.warning(request, 'Invalid invite code')
                    return redirect('settings')
                for beta_row in obj:
                    if beta_row.code==get_beta_code:
                        str_user = str(request.user)
                        beta_row.status="True"
                        try:
                            is_invite_betacode=BetacodeInvite.objects.get(betacode=BetaCode.objects.get(code=get_beta_code))
                        except:
                            is_invite_betacode=None
                        if is_invite_betacode:
                            beta_row.flag=1
                            betacode_instance = BetaCode.objects.get(code=get_beta_code,status="False")
                            beta_invite_obj = BetacodeInvite.objects.filter(betacode=betacode_instance)[0]
                            beta_invite_obj.flag_betacode=1
                            beta_invite_obj.save()
                        beta_row.user_connected=str_user
                        beta_row.save()        
                        #User add to Beta User Group
                        group = Group.objects.get(name='beta_user')
                        request.user.groups.add(group)
                        #User add to data access User Group
                        my_group = Group.objects.get(name='data_access_user')
                        my_group.user_set.add(request.user)
                        logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
                        logger.info("BETA_CODE_USED {} {} {} data access using Beta Code".format(request.get_full_path(), get_ip(request), request.user.id))
                        logger.info("DATA_ACCESS_GRANTED {} {} {}".format(request.get_full_path(), get_ip(request),request.user.id))
                        messages.success(request, 'You now have data access.')
                        return redirect('settings')
    return redirect('settings')


@login_required
def admin_sites(request):
    context = {}
    logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
    is_admin_group = request.user.groups.filter(name__in=['admin_user']).exists()
    if is_admin_group:
        #Get All Sports Name
        sports_name = Sports_name.objects.all().values_list('name',flat=True)
        context['sports_name']=sports_name
        return render(request,'users/admin-sites.html',context)
    return redirect("/")

def no_data_access(request):
    context = {}
    logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
    is_admin_group = request.user.groups.filter(name__in=['admin_user']).exists()
    if is_admin_group:

        no_data_users = []
        User = get_user_model()
        users = User.objects.all().order_by('-date_joined')
        for user in users:
            if not check_user_groups(user):
                obj_dict = {}
                obj_dict["user"] = user.username
                obj_dict["date_joined"] = user.date_joined
                posts = Post.objects.active().filter(author=user.id).order_by('-publish')
                likes_count = 0
                for post in posts:
                    likes_count = likes_count + post.likes.count()

                comment_likes_count = 0
                comments = Comment.objects.filter(author=user.id).order_by('date_posted')
                for comment in comments:
                    comment_likes_count = comment_likes_count + comment.likes.count()

                all_likes = likes_count + comment_likes_count

                obj_dict["trophies"] = all_likes
                no_data_users.append(obj_dict)

        context["no_data_users"] = no_data_users

        return render(request,'users/no_data_access.html',context)
    return redirect("/")

@login_required
def log_file_fetch(request):
    context = {}
    logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
    is_admin_group = request.user.groups.filter(name__in=['admin_user']).exists()
    if is_admin_group:
        log_lines = []
        with open("logs/info.log") as logfile:
            logs = logfile.readlines()
            last_lines = logs[-25:]
            context['log_lines']=last_lines
        return render(request,'users/logs_file_read.html',context)
    return redirect("/")

class FollowDoneView(View):
    def post(self, request, *args, **kwargs):
        followed_user_id = request.POST.get('followed_user_id')
        followed_user_obj = User.objects.get(pk=followed_user_id)

        try:
            Follow.objects.get(user=request.user, follow_user=followed_user_obj)
        except Exception as e:
            follow_obj = Follow.objects.create(follow_user=followed_user_obj)

        return redirect(request.META.get('HTTP_REFERER'))

class UnFollowDoneView(View):
    def post(self, request, *args, **kwargs):
        unfollowed_user_id = request.POST.get('unfollowed_user_id')
        unfollowed_user_obj = User.objects.get(pk=unfollowed_user_id)

        try:
            follow_obj = Follow.objects.get(user=request.user, follow_user=unfollowed_user_obj)
            follow_obj.delete()
        except Exception as e:
            pass

        return redirect(request.META.get('HTTP_REFERER'))

@login_required
def beta_code_admin_notification(request):
    context = {}
    is_admin_group = request.user.groups.filter(name__in=['admin_user']).exists()
    if is_admin_group:
        form = UserMultiSelectForm(request.POST)        
        if request.method == 'POST':
            if form.is_valid():
                get_users = form.cleaned_data.get('options')
                for user_id in get_users:
                    user = User.objects.get(id=int(user_id)) #get user obj
                    get_codes = GENERATE_BETACODES(number=2) #Generate 2 code
                    for code in get_codes:
                        if BetaCode.objects.filter(code=code,status="False").exists():
                            notify = Notification(user=user, sender=request.user, Notification_type=5,text_preview=code)
                            notify.save()
                            betacode_obj = BetaCode.objects.filter(code=code).update(flag=2)
                            betacode_instance = BetaCode.objects.get(code=code,status="False")
                            beta_invite_obj = BetacodeInvite(betacode=betacode_instance,user_sended=user,flag_betacode=2)
                            beta_invite_obj.save()            
                messages.success(request, ' {} Users successfully sent Beta code'.format(len(get_users)))
                logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
                return redirect(reverse('admin_beta_notification'))
        else:
            context['form']=form
            form = UserMultiSelectForm()
            return render(request, 'users/admin_beta_invite.html',context)
    return redirect("/")

    
@login_required
def user_invite_beta_user(request):
    context = {}
    if request.method == "POST":
        get_email = request.POST.get('email')
        get_beta_code = request.POST.get('betacode')
        try:
            betacode_id_instance = BetaCode.objects.filter(code=get_beta_code).values_list('id', flat=True)[0]
            obj = BetacodeInvite.objects.filter(betacode=betacode_id_instance).update(user_sended_email=get_email,user_mail_send_date=timezone.now(),flag_betacode=3)
        except:
            messages.success(request, ' Invalid Betacode.')
        return redirect(reverse('user_beta_notification'))

    return render(request, 'users/user_beta_invite.html',context)


@login_required
def invite_beta_status(request):
    is_admin_group = request.user.groups.filter(name__in=['admin_user']).exists()
    if is_admin_group:
        obj = BetacodeInvite.objects.all()
        context = {"data":obj}
        return render(request, 'users/beta_invited_status.html',context)
    return redirect("/")
        

# This function returns betacodes for n number 
def GENERATE_BETACODES(number=0):
    beta_codes = []
    for i in range(number):
        random_str = get_random_string(length=6).upper()
        obj = BetaCode.objects.create(code=random_str)
        obj.save()
        beta_codes.append(random_str)
    return beta_codes


#Change user interested sports
def user_sport_choice_add(request):
    if request.method == 'POST':
        get_sport_choices = request.POST.getlist('checks')
        try:
            obj_user_sports = UserSportsChoices.objects.get(user=request.user.id)
        except:
            obj_user_sports = None
        if obj_user_sports:
            obj_user_sports.sports.clear()
            obj_all_sports = BlogSports.objects.filter(id__in=get_sport_choices)
            obj_user_sports.sports.add(*obj_all_sports)
            messages.success(request,"Sports Updated")
        else:
            obj_user_sports = UserSportsChoices.objects.create(user=request.user)
            obj_all_sports = BlogSports.objects.filter(id__in=get_sport_choices)
            obj_user_sports.sports.add(*obj_all_sports)
            messages.success(request,"Sports Updated")
        logger.info("{} {} {} {}".format(request.method,request.get_full_path(),get_ip(request),request.user.id))
        return redirect('settings')
    return redirect('settings')


""" Prop Master Game """

#screen1
@login_required
def prop_master_new(request):
    if request.method == 'GET':
        context={}
        today = datetime.now(pytz.timezone('EST')).strftime('%Y%m%d')
        filename = 'props/{}_nba_games.csv'.format(today)

        s3 = boto3.client('s3')
        try:
            tester = s3.get_object(Bucket=conf_settings.USER_CHARTS_BUCKET_S3, Key=filename)
        except Exception as e:
            tester=None #file not exists
        
        number_of_games = 0
        if tester:
            d=tester['Body'].read().decode('UTF-8')
            games=pd.read_csv(StringIO(d))
            games.columns = games.columns.str.replace(' ','_') #csv file column name space replace with _

            utcnow = datetime.now(pytz.timezone('UTC'))

            games["Date"] = pd.to_datetime(games["Date"])
            games = games[games["Date"] > utcnow]

            games = games.sort_values(by=['Date'])

            number_of_games = len(games.index)

            context["games"]=games

        
        if number_of_games > 0:
            filename = 'props/nba_prop_sheet.csv'
            #filename = 'props/2022-01-02_nba_player_props.csv' #test

            s3 = boto3.client('s3')
            try:
                tester = s3.get_object(Bucket=conf_settings.USER_CHARTS_BUCKET_S3, Key=filename)
            except Exception as e:
                return HttpResponse(e)

            d=tester['Body'].read().decode('UTF-8')
            props=pd.read_csv(StringIO(d))
            props.columns = props.columns.str.replace(' ','_') #csv file column name space replace with _
            props = props[props['Prop'].isin(['Points', 'Rebounds', 'Assists'])]
            prop_order = CategoricalDtype(
                ['Points', 'Rebounds', 'Assists'],
                ordered=True
            )

            props['Prop'] = props['Prop'].astype(prop_order)

            props['Time'] = pd.to_datetime(props['Time'])

            now = datetime.now(pytz.timezone('UTC')) - timedelta(hours=4)
            props = props[props["Time"] > now]

            props = props.sort_values(by=['Prop', 'Line'], ascending= (True, False))
            props["Time"] = props["Time"].apply(lambda x: x.strftime("%I:%M %p"))

            context["props"]=props

            users = User.objects.all()[:10]
            context["users"]=users

        context["number_of_games"] = number_of_games
        is_user_group = check_user_groups(request.user)
        context['is_group'] = is_user_group
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        context['is_ai_user'] = request.user.groups.filter(name__in=['ai_user']).exists()
        sports_name = Sports_name.objects.all().values_list('name', flat=True)
        context['sports_name'] = sports_name
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        try:
            context["new_notifications"] = (
                        Notification.objects.filter(user=request.user).exclude(sender=request.user).exclude(
                            is_seen=True).count() > 0)
            context["notification_count"] = Notification.objects.filter(user=request.user).exclude(
                sender=request.user).count()
            context["recent_notifications"] = Notification.objects.filter(user=request.user).exclude(
                sender=request.user).order_by('-date')[:4]
        except:
            context["new_notifications"] = False
            context["notification_count"] = 0
            context["recent_notifications"] = []
        return render(request,'users/prop_master_new.html',context)
    else:
        return HttpResponse("<h1>Email send successfully<h1>")

#Ajax call player 1 data save
@login_required
def add_prop_data(request):
    context={}
    if request.method == 'POST':
        user_email = request.user.email
        username = request.user.username
        str_data = request.POST.get('propsdata').replace("<b>", "").replace("</b>", "")
        data = json.loads(str_data)
        props_data={user_email:data}
        game = request.POST.get('game')
        game_time = request.POST.get('time')
        game_time = datetime.now(pytz.timezone('EST')).strftime('%Y%m%d') + " " + game_time
        game_time = parser.parse(game_time)

        player2_email = request.POST.get('player2_email','')

        obj=PropMaster.objects.create(player1_name=username,
                                    player1_email=user_email,
                                    props_data=props_data,
                                    player2_email=player2_email,
                                    game_name=game,
                                    game_date=game_time)
        obj.save()

        uid=str(obj.uid)
        return HttpResponse(json.dumps({'uid':uid}), content_type="application/json")
    return HttpResponse("Something went wrong")


# Player1 data share
@login_required
def prop_master_invite(request,uid=None):
    if uid:
        obj=PropMaster.objects.filter(uid=uid)
        if not obj:
            return HttpResponse("Uid invalid")
        context={}
        if obj[0].challenge_accepted:
            return redirect('game_score', uid)

        email = obj[0].player1_email
        time = "{} EST".format(obj[0].game_date.strftime("%I:%M %p"))
        gen_df = []
        game = ""
        for i in obj[0].props_data[email]:
            d = {'Player<br>Name': i['Player_Name'], 'Prop': i['Prop'], 'Line': i['Line'], 'Your Pick': i['Selection']}
            game = i['Game']
            gen_df.append(d)
        generated_dataframe = pd.DataFrame(gen_df)
        context['generated_dataframe'] = generated_dataframe
        context['game'] = game
        context['time'] = time
        #context['is_prop_master_user'] = check_prop_master_user(request.user)

        if request.method == 'POST':
            uid = request.POST.get('uid')
            player2_email = request.POST.get('player_email')
            username_email = request.POST.get('username','')
            obj=PropMaster.objects.filter(uid=uid)
            #email send
            subject = f'{request.user.username} challenged you to a game of Prop Master on Pine Sports'
            current_site=get_current_site(request).domain

            absurl = 'http://'+current_site+obj[0].get_absolute_url()
            get_user = None
            if username_email:
                obj.update(player2_email=username_email)
                message = f"{request.user.username} challenged you to a game of Prop Master for tonight's {obj[0].game_name} game.  \n\nThink you have what it takes to win? Lock in your picks now: {absurl}.  \n\nBOL!"
                email_from = conf_settings.EMAIL_HOST_USER
                recipient_list = [username_email, ]
                send_mail( subject, message, email_from, recipient_list )
                get_user = User.objects.filter(email=username_email)

            else:
                obj.update(player2_email=player2_email)
                message = f"{request.user.username} challenged you to a game of Prop Master for tonight's {obj[0].game_name} game.  \n\nThink you have what it takes to win? Lock in your picks now: {absurl}.  \n\nBOL!"
                email_from = conf_settings.EMAIL_HOST_USER
                recipient_list = [player2_email, ]
                send_mail( subject, message, email_from, recipient_list )
                if not get_user:
                    get_user = User.objects.filter(email=player2_email)

            #send notification to 2nd player user   
            if get_user:         
                notify = Notification(user=get_user[0], sender=request.user, Notification_type=6,prop_master_game=obj[0])
                notify.save()

            messages.success(request, 'Challenge sent!')
            return redirect('game_score',uid)



        users = User.objects.exclude(username__contains="zzzuser")
        context['users']=users
        context['uid']=uid
        is_user_group = check_user_groups(request.user)
        context['is_group'] = is_user_group
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        context['is_ai_user'] = request.user.groups.filter(name__in=['ai_user']).exists()
        sports_name = Sports_name.objects.all().values_list('name', flat=True)
        context['sports_name'] = sports_name
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        try:
            context["new_notifications"] = (
                        Notification.objects.filter(user=request.user).exclude(sender=request.user).exclude(
                            is_seen=True).count() > 0)
            context["notification_count"] = Notification.objects.filter(user=request.user).exclude(
                sender=request.user).count()
            context["recent_notifications"] = Notification.objects.filter(user=request.user).exclude(
                sender=request.user).order_by('-date')[:4]
        except:
            context["new_notifications"] = False
            context["notification_count"] = 0
            context["recent_notifications"] = []
        # context['useremail']=obj[0].player1_email
        # context['game_name']=obj[0].game_name
        return render(request,'users/prop_master_invite.html',context)
    return HttpResponse("Uid not provided")


# 2nd player pick props
@login_required
def PropMaster_player2(request, uid=None):
    if uid:
        context = {}
        data = PropMaster.objects.filter(uid=uid)
        user_email = request.user.email
        username = request.user.username
        if data:
            data = data[0]
            if data.challenge_accepted:
                return redirect('game_score', uid)
        else:
            HttpResponse("Game not found")

        game_time = pd.to_datetime(data.game_date)
        now = datetime.now(pytz.timezone('UTC')) - timedelta(hours=4)

        expired = False

        if now > game_time:
            expired = True

        email = data.player1_email
        gen_df = []
        game = ""
        for i in data.props_data[email]:
            d = {'Game': i['Game'], 'Player Name': i['Player_Name'], 'Prop': i['Prop'], 'Line': i['Line']}
            game = i['Game']
            gen_df.append(d)
        generated_dataframe = pd.DataFrame(gen_df)

        #filename = 'props/2022-01-02_nba_player_props.csv'  # test
        filename = 'props/nba_prop_sheet.csv'
        s3 = boto3.client('s3')
        try:
            tester = s3.get_object(Bucket=conf_settings.USER_CHARTS_BUCKET_S3, Key=filename)
        except Exception as e:
            return HttpResponse(e)

        time = "{} EST".format(data.game_date.strftime("%I:%M %p"))

        d = tester['Body'].read().decode('UTF-8')
        props = pd.read_csv(StringIO(d))
        props = props[['Game', 'Player Name', 'Prop', 'Robot Likes']]
        props["Robot Likes"] = props["Robot Likes"].str.replace('Over', '<img src="https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/pk-robot.png" alt="prop-master" class="pk-robot">')
        props["Robot Likes"] = props["Robot Likes"].str.replace('Under', '<img src="https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/static/images/pk-robot.png" alt="prop-master" class="pk-robot">')
        generated_dataframe = pd.merge(generated_dataframe, props, on=['Game', 'Player Name', 'Prop'], how='left')
        generated_dataframe = generated_dataframe.drop("Game", 1)
        generated_dataframe = generated_dataframe.rename(columns={"Player Name": "Player<br>Name", "Robot Likes": "Ask<br>Robot"})

        context['generated_dataframe'] = generated_dataframe
        context['game'] = game
        context['p2_name'] = username
        context['p2_email'] = user_email
        context['uid'] = data.uid
        context['expired'] = expired
        context['time'] = time
        context['uid'] = uid
        is_user_group = check_user_groups(request.user)
        context['is_group'] = is_user_group
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        context['is_ai_user'] = request.user.groups.filter(name__in=['ai_user']).exists()
        sports_name = Sports_name.objects.all().values_list('name', flat=True)
        context['sports_name'] = sports_name
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        try:
            context["new_notifications"] = (
                        Notification.objects.filter(user=request.user).exclude(sender=request.user).exclude(
                            is_seen=True).count() > 0)
            context["notification_count"] = Notification.objects.filter(user=request.user).exclude(
                sender=request.user).count()
            context["recent_notifications"] = Notification.objects.filter(user=request.user).exclude(
                sender=request.user).order_by('-date')[:4]
        except:
            context["new_notifications"] = False
            context["notification_count"] = 0
            context["recent_notifications"] = []

        return render(request, 'users/prop_master_player2.html', context)
    else:
        return HttpResponse("Something went wrong")

# Win/Loose show
def game_score(request, uid=None):
    context = {}
    if request.user.is_authenticated:
        context["user"] = request.user

    game_qs = PropMaster.objects.filter(uid=uid)

    no_game = False
    if not game_qs:
        no_game = True

    if no_game == False:
        header = ""
        data = game_qs[0]
        accepted = data.challenge_accepted
        player1_score = 0
        player2_score = 0
        player1_locked_score = 0
        player2_locked_score = 0
        player1_tiebreak_score = 0
        player2_tiebreak_score = 0
        winner_size = 0
        complete = False
        in_progress = False

        game_time = pd.to_datetime(data.game_date)
        now = datetime.now(pytz.timezone('UTC')) - timedelta(hours=4)

        started = True
        if now < game_time:
            started=False
            header = "<span class='start-time'>{} EST</span><br><br>".format(game_time.strftime("%I:%M %p"))

        player1_email = data.player1_email
        player1_name = data.player1_name

        if accepted:
            player2_email = data.player2_email
            player2_name = data.player2_name

        game = data.game_name

        context["game"] = game

        game_date = game_time.strftime('%Y%m%d')
        game_date_formatted = game_time.strftime('%b %d, %Y')
        filename = 'props/{}_nba_games.csv'.format(game_date)

        s3 = boto3.client('s3')
        try:
            tester = s3.get_object(Bucket=conf_settings.USER_CHARTS_BUCKET_S3, Key=filename)
        except Exception as e:
            return HttpResponse(e)

        d = tester['Body'].read().decode('UTF-8')
        games = pd.read_csv(StringIO(d))
        games.columns = games.columns.str.replace(' ', '_')  # csv file column name space replace with _

        games = games[games["Game"] == game]

        status = games.iloc[0]['Status']


        p1_choices = []
        if accepted:
            p2_choices = []

        for i in data.props_data[player1_email]:
            d = {'Player Name': i['Player_Name'], 'Prop': i['Prop'], 'Line': i['Line'], player1_name: i['Selection']}
            p1_choices.append(d)

        player1_choices = pd.DataFrame(p1_choices)

        if accepted:
            for i in data.props_data[player2_email]:
                d = {'Player Name': i['Player_Name'], 'Prop': i['Prop'], 'Line': i['Line'], player2_name: i['Selection']}
                p2_choices.append(d)

            player2_choices = pd.DataFrame(p2_choices)

        if accepted:
            header = header + "<span class='game-select'><span style='color:#4EC48F;'><b><a href='/prop-master/user/{}/' style='color:#4EC48F;'>{}</a></b></span> vs. <span style='color:#274970'><b><a href='/prop-master/user/{}/' style='color:#274970'>{}</a></b></span></span>".format(player1_name, player1_name, player2_name, player2_name)
            generated_dataframe = pd.merge(player1_choices, player2_choices, on=['Player Name', 'Prop', 'Line'], how='left')
        else:
            header = header + "Waiting for your opponent to lock in picks..."
            generated_dataframe = player1_choices

        header = header + "<br><br>Check back here when the game starts for live updates."

        has_score = False
        if status != "Scheduled":

            if status == "Final":
                header = "<span class='start-time'>{}<br>{}</span><br><br>".format(game_date_formatted, status)
            else:
                header = "<span class='start-time'>{}</span><br><br>".format(status)

            s3 = boto3.client('s3')
            filename = 'props/{}_nba_prop_scores.csv'.format(game_date)

            try:
                tester = s3.get_object(Bucket=conf_settings.USER_CHARTS_BUCKET_S3, Key=filename)  # Testing
            except Exception as e:
                return HttpResponse("Sorry, we encountered an error")
            d = tester['Body'].read().decode('UTF-8')
            try:
                props = pd.read_csv(StringIO(d))
            except:
                props = pd.DataFrame()
            try:
                props = props[props["Game"] == game]
                props = props[["Player Name", "Prop", "Score"]]
            except:
                pass

            if status != "Final":
                in_progress = True
                period = games.iloc[0]["Period"]
                seconds_remaining = int(games.iloc[0]["Clock"])
                minutes = str(timedelta(seconds=seconds_remaining))[2:]

            home_team = games.iloc[0]["Home"]
            visitor_team = games.iloc[0]["Visitor"]
            home_score = games.iloc[0]["Home_Score"]
            visitor_score = games.iloc[0]["Visitor_Score"]

            try:
                generated_dataframe = pd.merge(generated_dataframe, props, on=['Player Name', 'Prop'], how='left')
                generated_dataframe = generated_dataframe.dropna()
            except:
                pass

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
                        if in_progress and choice == "Over":
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

            try:
                generated_dataframe[player1_name] = generated_dataframe[["Line", "Score", player1_name]].apply(win_lose, axis=1)
            except:
                pass

            if accepted:
                has_score = True
                try:
                    generated_dataframe[player2_name] = generated_dataframe[["Line", "Score", player2_name]].apply(win_lose, axis=1)
                except:
                    pass

                columns = [
                    'Player Name',
                    "Prop",
                    'Line',
                    'Score',
                    player1_name,
                    player2_name,
                ]
            else:
                columns = [
                    'Player Name',
                    "Prop",
                    'Line',
                    'Score',
                    player1_name,
                ]
            try:
                generated_dataframe = generated_dataframe[columns]
            except:
                pass

            if accepted:
                try:
                    for i, row in generated_dataframe.iterrows():
                        if float(row["Score"]) > float(row["Line"]):
                            winning = "Over"
                        elif float(row["Score"]) == float(row["Line"]):
                            winning = "Push"
                        else:
                            winning = "Under"

                        if winning in row[player1_name]:
                            player1_score = player1_score + 1
                            player1_tiebreak_score = player1_tiebreak_score + abs(float(row["Score"]) - float(row["Line"]))
                            if winning == "Over":
                                player1_locked_score = player1_locked_score + 1

                        if winning in row[player2_name]:
                            player2_score = player2_score + 1
                            player2_tiebreak_score = player2_tiebreak_score + abs(float(row["Score"]) - float(row["Line"]))
                            if winning == "Over":
                                player2_locked_score = player2_locked_score + 1

                    if status == "Final":
                        complete = True
                        if player1_score == player2_score:
                            if player1_tiebreak_score > player2_tiebreak_score:
                                player1_score = player1_score + 1
                            elif player1_tiebreak_score < player2_tiebreak_score:
                                player2_score = player2_score + 1

                        if player1_score > player2_score:
                            winner_text = "Congratulations <span style='color:#4EC48F;'><b>{}</b></span>!<br>You have been crowned the Prop Master.".format(player1_name)
                            winner = "<span style='color:#4EC48F;'><b>{}</b></span>".format(player1_name)
                            winner_size=len(player1_name)
                        elif player1_score < player2_score:
                            winner = "<span style='color:#274970;'><b>{}</b></span>".format(player2_name)
                            winner_text = "Congratulations <span style='color:#274970;'><b>{}</b></span>!<br>You have been crowned the Prop Master.".format(player2_name)
                            winner_size = len(player2_name)
                        else:
                            winner = "Draw"
                            winner_text = "This challenge ended in a draw.<br>Do you have what it takes for a <a href='/prop-master/new/'><b><u>rematch</b></u></a>?"
                            winner_size = 4
                except:
                    pass
        else:
            def over_under(data):
                try:
                    choice = data[0]

                    if choice == "Over":
                        choice_html = '<span style="color:#4EC48F">{}</span>'.format(choice)
                    else:
                        choice_html = '<span style="color:#274970">{}</span>'.format(choice)
                    return choice_html

                except Exception as e:
                    print("EXCEPTION")
                    print(e)
                    return data[0]
            try:
                generated_dataframe[player1_name] = generated_dataframe[[player1_name]].apply(over_under, axis=1)
                if accepted:
                    generated_dataframe[player2_name] = generated_dataframe[[player2_name]].apply(over_under, axis=1)

            except:
                pass

        #sorts dataframe so different picks & close picks are up on top
        try:
            def get_different(picks):
                if picks[0]==picks[1]:
                    return 0
                else:
                    return 1

            generated_dataframe["Different"] = generated_dataframe[[player1_name, player2_name]].apply(get_different, axis=1)
            generated_dataframe = generated_dataframe.sort_values(by=['Different'], ascending=False)

            if status != 'Scheduled':
                def get_score_difference(scores):
                    return abs(scores[0]-scores[1])

                generated_dataframe["Line"] = generated_dataframe["Line"].astype(float)
                generated_dataframe["Score Difference"] = generated_dataframe[["Score", "Line"]].apply(get_score_difference, axis=1)
                generated_dataframe = generated_dataframe.sort_values(by=['Different', 'Score Difference'], ascending=(False, True))
                generated_dataframe = generated_dataframe.drop("Score Difference", axis=1)

            generated_dataframe = generated_dataframe.drop("Different", axis=1)

        except Exception as e:
            print(e)
            pass

        try:
            generated_dataframe = generated_dataframe.rename(columns={"Player Name": "Player<br>Name"})
        except:
            pass
        try:
            generated_dataframe["Score"] = generated_dataframe["Score"].astype(int)
        except:
            pass

        context['uid'] = uid
        context['no_game'] = no_game
        context['acepted'] = accepted
        context['started'] = started
        context["game"] = game
        context['generated_dataframe'] = generated_dataframe
        context['status'] = status
        context['has_score'] = has_score
        context['player1_name'] = player1_name
        if accepted:
            context['player2_name'] = player2_name
        context['player1_score'] = player1_score
        context['player1_tiebreak_score'] = player1_tiebreak_score
        if in_progress:
            context['player1_score_range'] = range(player1_score  - player1_locked_score)
            context["player1_locked_score_range"] = range(player1_locked_score)
        else:
            context['player1_score_range'] = range(player1_score)
        if accepted:
            context['player2_score'] = player2_score
            context['player2_tiebreak_score'] = player2_tiebreak_score
            if in_progress:
                context['player2_score_range'] = range(player2_score - player2_locked_score)
                context["player2_locked_score_range"] = range(player2_locked_score)
            else:
                context['player2_score_range'] = range(player2_score)
        context['header'] = header
        context["complete"] = complete
        if complete:
            context["winner"] = winner
            context["winner_text"] = winner_text
            context["winner_size"] = winner_size
        context["in_progress"] = in_progress
        if in_progress:
            context["period"] = period
            context["minutes"] = minutes
        if in_progress or complete:
            context["home_team"] = home_team
            context["visitor_team"] = visitor_team
            context["home_score"] = home_score
            context["visitor_score"] = visitor_score
            context["game_date_formatted"] = game_date_formatted
        is_user_group = check_user_groups(request.user)
        context['is_group'] = is_user_group
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        context['is_ai_user'] = request.user.groups.filter(name__in=['ai_user']).exists()
        sports_name = Sports_name.objects.all().values_list('name', flat=True)
        context['sports_name'] = sports_name
        #context['is_prop_master_user'] = check_prop_master_user(request.user)
        try:
            context["new_notifications"] = (
                        Notification.objects.filter(user=request.user).exclude(sender=request.user).exclude(
                            is_seen=True).count() > 0)
            context["notification_count"] = Notification.objects.filter(user=request.user).exclude(
                sender=request.user).count()
            context["recent_notifications"] = Notification.objects.filter(user=request.user).exclude(
                sender=request.user).order_by('-date')[:4]
        except:
            context["new_notifications"] = False
            context["notification_count"] = 0
            context["recent_notifications"] = []
    return render(request, 'users/prop_master_game_score.html', context)


import secrets
#Ajax call data save
def PropMaster_player2_data_save(request,uid=None):
    if request.method == 'POST':
        if not uid:
            return HttpResponse("Invalid link")
        player2_name = request.POST.get("p2_name")
        player2_email=request.POST.get("p2_email")
        str_data = request.POST.get('propsdata').replace("<b>", "").replace("</b>", "")
        data = json.loads(str_data)
        props_data_p2={player2_email:data} 
        try:
            obj = PropMaster.objects.get(uid=uid)#.update(player2_email=player2_email,challenge_accepted=True)
            prop_data_obj = obj.props_data
            prop_data_obj[player2_email]=data
            obj.prop_data_obj=prop_data_obj
            obj.player2_name=player2_name
            obj.player2_email=player2_email
            obj.challenge_accepted=True
            obj.save()

            is_user = User.objects.filter(email=player2_email)
            #if user email not exists then create new account and send email to that account with generated password
            if not is_user:
                username = player2_email.split('@')[0]
                password_length = 13
                password = secrets.token_urlsafe(password_length)
                user = User.objects.create_user(
                                                username = username,
                                                password = password,
                                                email = player2_email,
                                            )
                user.save( )
                subject = 'Welcome to Pine-Sports'
                message = f'Congratulations, your account has been successfully created. Your username is {user.username} and password is {password}'
                email_from = conf_settings.EMAIL_HOST_USER
                recipient_list = [player2_email, ]
                send_mail( subject, message, email_from, recipient_list )
                


        except:
            return HttpResponse("Something went wrong in Uid")  

        return HttpResponse(json.dumps({'msg':'Your data has been registered'}), content_type="application/json")
    return HttpResponse("Method not valid")

from django.db.models import Q

@login_required
def games_home(request):
    context = {}
    s3 = boto3.client('s3')
    email=request.user.email

    in_progress_game,scheduled_games = {},{} # in this dict users propmaster data add

    obj_not_completed = PropMaster.objects.filter(Q(player1_email=email)|Q(player2_email=email),game_setttled=False,challenge_accepted=True)
    obj_sort = obj_not_completed.order_by('-game_date')
    game_date_list=list(set([i.game_date_only for i in obj_sort]))
    for game_date in game_date_list:
        filename = 'props/{}_nba_games.csv'.format(game_date)        
        try:
            tester = s3.get_object(Bucket=conf_settings.USER_CHARTS_BUCKET_S3, Key=filename)
        except Exception as e:
            print(e)
        if tester:
            d = tester['Body'].read().decode('UTF-8')
            games = pd.read_csv(StringIO(d))
            games.columns = games.columns.str.replace(' ', '_')

            #in_progress_gm=games['Status']=='In Progress'
            in_progress_gm = ~games['Status'].isin(["Scheduled", "Final"])
            scheduled_gm=games['Status']=='Scheduled'

            selected_col_in_progress_game = games[in_progress_gm][['Date','Game','Status']]
            in_progress_game[game_date]=selected_col_in_progress_game

            selected_col_scheduled_games = games[scheduled_gm][['Date','Game','Status']]
            scheduled_games[game_date]=selected_col_scheduled_games


    #build scheduled and in progress game list
    scheduled_game_qs=[]
    in_progress_game_qs=[]
    for obj in obj_not_completed:
        get_scheduled_dict = scheduled_games.get(obj.game_date_only,None)
        get_in_progress_dict = in_progress_game.get(obj.game_date_only,None)
        df_scheduled = pd.DataFrame(get_scheduled_dict) #convert other nonetype obj to pandas dataframe
        df_in_progress = pd.DataFrame(get_in_progress_dict) #convert other nonetype obj to pandas dataframe 

        if not df_scheduled.empty:
            for i, row in df_scheduled.iterrows():
                if row["Game"] == obj.game_name:
                    scheduled_game_qs.append(obj)
            #d=df_scheduled['Game']==obj.game_name
            #scheduled_game_qs.append(obj)
        if not df_in_progress.empty:
            for i,row in df_in_progress.iterrows():
                if row["Game"] == obj.game_name:
                    in_progress_game_qs.append(obj)
            #d=df_in_progress['Game']==obj.game_name
            #in_progress_game_qs.append(obj)

    has_scheduled_games = False
    if len(scheduled_game_qs) > 0:
        has_scheduled_games = True

    has_live_games = False
    if len(in_progress_game_qs) > 0:
        has_live_games = True

    context['scheduled_game_qs']=scheduled_game_qs
    context['in_progress_game_qs']=in_progress_game_qs

    completed_games = PropMaster.objects.filter(Q(player1_email=email)|Q(player2_email=email),game_setttled=True,challenge_accepted=True).order_by('-game_date')

    has_completed_games = False
    if len(completed_games) > 0:
        has_completed_games = True

    win_counter = 0
    loss_counter = 0
    tie_counter = 0

    for game in completed_games:
        if game.winner == request.user.username:
            win_counter = win_counter + 1
        elif game.winner == "Draw":
            tie_counter = tie_counter + 1
        else:
            loss_counter = loss_counter + 1

    total_games = win_counter + loss_counter + tie_counter

    context['completed_games']=completed_games

    context["has_live_games"] = has_live_games
    context["has_scheduled_games"] = has_scheduled_games
    context["has_completed_games"] = has_completed_games
    context["user_name"] = request.user.username
    context["wins"] = win_counter
    context["losses"] = loss_counter
    context["ties"] = tie_counter
    context["total_games"] = total_games
    is_user_group = check_user_groups(request.user)
    context['is_group'] = is_user_group
    #context['is_prop_master_user'] = check_prop_master_user(request.user)
    context['is_ai_user'] = request.user.groups.filter(name__in=['ai_user']).exists()
    sports_name = Sports_name.objects.all().values_list('name',flat=True)
    context['sports_name']=sports_name
    #context['is_prop_master_user'] = check_prop_master_user(request.user)
    try:
        context["new_notifications"] = (
                    Notification.objects.filter(user=request.user).exclude(sender=request.user).exclude(
                        is_seen=True).count() > 0)
        context["notification_count"] = Notification.objects.filter(user=request.user).exclude(
            sender=request.user).count()
        context["recent_notifications"] = Notification.objects.filter(user=request.user).exclude(
            sender=request.user).order_by('-date')[:4]
    except:
        context["new_notifications"] = False
        context["notification_count"] = 0
        context["recent_notifications"] = []
    return render(request,'users/prop_master_games_home.html',context)

def prop_master_profile(request, username=None):
    context = {}
    s3 = boto3.client('s3')
    email=User.objects.filter(username=username)[0].email
    username = User.objects.filter(username=username)[0].username

    in_progress_game,scheduled_games = {},{} # in this dict users propmaster data add

    obj_not_completed = PropMaster.objects.filter(Q(player1_email=email)|Q(player2_email=email),game_setttled=False,challenge_accepted=True)
    obj_sort = obj_not_completed.order_by('-game_date')
    game_date_list=list(set([i.game_date_only for i in obj_sort]))

    for game_date in game_date_list:
        filename = 'props/{}_nba_games.csv'.format(game_date)
        try:
            tester = s3.get_object(Bucket=conf_settings.USER_CHARTS_BUCKET_S3, Key=filename)
        except Exception as e:
            print(e)
        if tester:
            d = tester['Body'].read().decode('UTF-8')
            games = pd.read_csv(StringIO(d))
            games.columns = games.columns.str.replace(' ', '_')

            in_progress_gm=games['Status']=='In Progress'
            scheduled_gm=games['Status']=='Scheduled'
            selected_col_in_progress_game = games[in_progress_gm][['Date','Game','Status']]
            in_progress_game[game_date]=selected_col_in_progress_game

            selected_col_scheduled_games = games[scheduled_gm][['Date','Game','Status']]
            scheduled_games[game_date]=selected_col_scheduled_games

    #build scheduled and in progress game list
    scheduled_game_qs=[]
    in_progress_game_qs=[]
    for obj in obj_not_completed:
        get_scheduled_dict = scheduled_games.get(obj.game_date_only,None)
        get_in_progress_dict = in_progress_game.get(obj.game_date_only,None)
        df_scheduled = pd.DataFrame(get_scheduled_dict) #convert other nonetype obj to pandas dataframe
        df_in_progress = pd.DataFrame(get_in_progress_dict) #convert other nonetype obj to pandas dataframe

        if not df_scheduled.empty:
            game_time = pd.to_datetime(obj.game_date)
            for i, row in df_scheduled.iterrows():
                if row["Game"] == obj.game_name:
                    scheduled_game_qs.append(obj)
            #d=df_scheduled['Game']==obj.game_name
            #scheduled_game_qs.append(obj)
        if not df_in_progress.empty:
            for i,row in df_in_progress.iterrows():
                if row["Game"] == obj.game_name:
                    in_progress_game_qs.append(obj)
            #d=df_in_progress['Game']==obj.game_name
            #in_progress_game_qs.append(obj)

    has_scheduled_games = False
    if len(scheduled_game_qs) > 0:
        has_scheduled_games = True

    has_live_games = False
    if len(in_progress_game_qs) > 0:
        has_live_games = True

    context['scheduled_game_qs']=scheduled_game_qs
    context['in_progress_game_qs']=in_progress_game_qs

    completed_games = PropMaster.objects.filter(Q(player1_email=email)|Q(player2_email=email),game_setttled=True,challenge_accepted=True).order_by('-game_date')

    has_completed_games = False
    if len(completed_games) > 0:
        has_completed_games = True

    win_counter = 0
    loss_counter = 0
    tie_counter = 0

    for game in completed_games:
        if game.winner == username:
            win_counter = win_counter + 1
        elif game.winner == "Draw":
            tie_counter = tie_counter + 1
        else:
            loss_counter = loss_counter + 1

    total_games = win_counter + loss_counter + tie_counter

    context['completed_games']=completed_games

    context["has_live_games"] = has_live_games
    context["has_scheduled_games"] = has_scheduled_games
    context["has_completed_games"] = has_completed_games
    context["user_name"] = username
    context["wins"] = win_counter
    context["losses"] = loss_counter
    context["ties"] = tie_counter
    context["total_games"] = total_games
    is_user_group = check_user_groups(request.user)
    context['is_group'] = is_user_group
    #context['is_prop_master_user'] = check_prop_master_user(request.user)
    context['is_ai_user'] = request.user.groups.filter(name__in=['ai_user']).exists()
    sports_name = Sports_name.objects.all().values_list('name',flat=True)
    context['sports_name']=sports_name
    #context['is_prop_master_user'] = check_prop_master_user(request.user)
    try:
        context["new_notifications"] = (
                    Notification.objects.filter(user=request.user).exclude(sender=request.user).exclude(
                        is_seen=True).count() > 0)
        context["notification_count"] = Notification.objects.filter(user=request.user).exclude(
            sender=request.user).count()
        context["recent_notifications"] = Notification.objects.filter(user=request.user).exclude(
            sender=request.user).order_by('-date')[:4]
    except:
        context["new_notifications"] = False
        context["notification_count"] = 0
        context["recent_notifications"] = []
    return render(request,'users/prop_master_games_profile.html',context)
  
