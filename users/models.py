from django.db import models
from django.contrib.auth.models import User
from PIL import Image

from blog.models import Post,Comment, BlogSports
from users.utils import auto_save_current_user
from pineproxy.models import Sports_name

#user login datasheet
from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver

#copy and mkdir
import os
import pathlib
import shutil

#dtale req files
from dtale.views import startup
from dtale.cli.loaders.csv_loader import loader_func as load_csv
import dtale.app as dtale_app
import dtale
import pandas as pd

from s3direct.fields import S3DirectField
from datetime import datetime, timedelta, timezone

#logger
import logging,traceback
logger = logging.getLogger('django')

import uuid
from urllib.parse import urlparse
from django.core.exceptions import ValidationError
from phonenumber_field.modelfields import PhoneNumberField
import stripe
import requests


'''This function is used for Profile model and Validate the url from Twitter'''
def validate_twitter_url(value):
    if not value:
        return None
    obj = urlparse(value)
    if not obj.hostname in ('twitter.com'):
        raise ValidationError('Only urls from Twitter allowed')


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name='profile')
    image = models.ImageField(default="defaultProfile.png?v=1", upload_to='profile_pics', verbose_name="Profile Image", blank=True,null=True)
    models_built_today = models.IntegerField(default=0)
    model_limit = models.IntegerField(default=10)
    prop_master_game_played = models.ManyToManyField('PropMaster',blank=True,related_name='profile_propmaster_m2m')
    
    bio = models.CharField(max_length=25,blank=True,null=True,verbose_name='Profile Bio')
    twitter_url = models.CharField(max_length=255, unique=True, blank=True,null=True, verbose_name="Twitter Handle")
    discord_Username = models.CharField(max_length=50,blank=True,null=True,verbose_name="discord_username")
    phone_number = PhoneNumberField(blank=True, null=True,help_text="eg: +12223334444x55")
    email_following_posts = models.BooleanField(default=False)
    email_comments_posts = models.BooleanField(default=False,help_text="received email when someone comments on the post")

    # New Stripe-related fields for subscription management
    stripe_customer_id = models.CharField(max_length=255, blank=True, null=True)
    stripe_subscription_id = models.CharField(max_length=255, blank=True, null=True)
    subscription_interval = models.CharField(max_length=50, blank=True, null=True)  # e.g., 'month' or 'year'
    subscription_current_period_start = models.IntegerField(blank=True, null=True)  # Unix timestamp
    subscription_current_period_end = models.IntegerField(blank=True, null=True)  # Unix timestamp
    plan_id = models.CharField(max_length=255, blank=True, null=True)
    plan_nickname = models.CharField(max_length=255, blank=True, null=True)
    subscription_canceled = models.BooleanField(default=False)  # Indicates whether the subscription has been canceled
    trial_start = models.IntegerField(blank=True, null=True)  # Unix timestamp



    def __str__(self):
        return f'{self.user.username} Profile'
    
    @property
    def subscription(self):
        try:
            # TO DO - FIX THIS
            return {"subscription": None, "product": None, "active": False}
        except:
            # TO DO - FIX THIS
            return {"subscription": None, "product": None, "active": False}

    @property
    def get_question_limit(self):
        print("GETTING QUESTION LIMIT")
        # TO DO - FIX THIS
        limit = 0

        return limit

    def models_left(self):
        #TO DO - Return to 10 after this weekend
        return (self.model_limit * 10) - self.models_built_today

    def recent_posts(self):
        return Post.objects.filter(author=self.user).order_by('-date_posted')[:10]

    def recent_comments(self):
        return Comment.objects.filter(author=self.user).order_by('-date_posted')[:10]

    def used_charts(self):
        all_posts = Post.objects.filter(author=self.user)
        used_charts = []
        for each_post in all_posts:
            if each_post.has_charts():
                post_charts = each_post.used_charts()
                for chart in post_charts:
                    used_charts.append(chart)
        return used_charts

    @property
    def image_url(self):
        if self.image and hasattr(self.image, 'url'):
            return self.image.url
        return "https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.amazonaws.com/static/images/profile.svg?v=2"

    def optimized_image_url(self):
        if self.image and hasattr(self.image, 'url'):
            optimized_image_url = str(self.image.url)
            response = requests.head(optimized_image_url)
            if response.status_code == 200:
                optimized_image_url = str(self.image.url).replace("pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.us-west-2.amazonaws.com/media/profile_pics/", "ik.imagekit.io/yqie9vdtbb4/")
                optimized_image_url = str(optimized_image_url).replace("pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.amazonaws.com/media/profile_pics/", "ik.imagekit.io/yqie9vdtbb4/")
                return optimized_image_url+"?v=2"
            else:
                return "https://player-headshots-sharpsports.s3.us-west-2.amazonaws.com/Default-Profile-Picture-PNG-Download-Image.png"

            
        else: 
            return "https://pinesports-prod-s3-storage-bucket-us-west-2-192279148113.s3.amazonaws.com/static/images/profile.svg?v=2"
        
    @property
    def follower_count(self):
        count = Follow.objects.filter(follow_user=self.user).count()
        return count

    @property
    def following_count(self):
        count = Follow.objects.filter(user=self.user).count()
        return count

    @property
    def followers(self):
        return Follow.objects.filter(follow_user=self.user)

    @property
    def following(self):
        # Get all follw_user id
        return Follow.objects.filter(user=self.user).values_list('follow_user__id', flat=True).distinct()

    @property
    def followers_users_email(self):
        user_ids = Follow.objects.filter(follow_user=self.user).values_list('user__id',flat=True)
        return Profile.objects.filter(user__id__in=user_ids,email_following_posts=True).values_list('user__email',flat=True).distinct()

    @property
    def propMasterResultCount(self):
        win_count=0
        lose_count=0
        draw_count=0
        for i in self.prop_master_game_played.all():
            if i.winner==self.user.username:
                win_count=win_count+1
            elif i.winner=='Draw':
                draw_count=draw_count+1
            else:
                lose_count=lose_count+1
        return {"win":win_count,"lose":lose_count,"tie":draw_count}


    # def save(self, force_insert=False, force_update=False, using=None,
    #          update_fields=None):
    #     super().save()
    #     print(self.image.path)
    #     img = Image.open(self.image.path)
    #     if img.height > 300 or img.width > 300:
    #         output_size = (300, 300)
    #         img.thumbnail(output_size)
    #         img.save(self.image.path)
            

@receiver(user_logged_in)
def post_login(sender, user, request, **kwargs):
    ip = request.META.get('REMOTE_ADDR')
    request.session['ip']=ip
    logger.info("LOGIN / {} {}".format(ip, user.id))


class Topic(models.Model):
    tags = models.CharField(max_length=200, blank=True, unique=True)

    def __str__(self):
        return self.tags

sport_choices=(('a','a'),)

class S3ZipUpload(models.Model):
    # sport_choices=[(option.lower(),option) for option in Sports_name.objects.all().values_list('name',flat=True)]
    sport = models.CharField(choices=set(sport_choices),max_length = 20,null=True, blank=True)
    file = S3DirectField(dest='zip_store_destination')
    date_uploaded = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Upload Dataset(Zipfile)"
        verbose_name_plural = "Upload Dataset(Zipfile)"

    def filename_s3(self):
        filename = self.file.split("datafiles/")[-1]
        return filename

    def __str__(self):
        cal_uploaded_time = datetime.now(timezone.utc) - self.date_uploaded
        filename = self.file.split("datafiles/")[-1]
        return filename+" | "+str(cal_uploaded_time)

class ActiveDatafilesZip(models.Model):
    data_zip_name = models.CharField(max_length=200, blank=True, unique=True)
    status = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Activate Dataset"
        verbose_name_plural = "Activate Dataset"

    def __str__(self):
        return str(self.data_zip_name)

class BetaCode(models.Model):

    BETACODE_FLAG_CHOICES = ((1,'UserUsed'),(2,'AdminBetaInvite'),(3,'UserBetaSendEmail'))

    code = models.CharField(max_length=20,unique=False)
    created_date = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False)
    user_connected = models.CharField(max_length=200,blank=True)
    flag = models.IntegerField(choices=BETACODE_FLAG_CHOICES,blank=True,null=True)

    def __str__(self):
        return self.code

class BetacodeInvite(models.Model):
    
    BETACODE_FLAG_CHOICES = ((1,'UserUsed'),(2,'AdminBetaInvite'),(3,'UserBetaSendEmail'))

    betacode = models.ForeignKey(BetaCode, related_name="betacode", on_delete=models.CASCADE)
    sended_date = models.DateTimeField(auto_now_add=True)
    user_sended = models.ForeignKey(User, related_name='user_sended', on_delete=models.CASCADE)
    flag_betacode = models.IntegerField(choices=BETACODE_FLAG_CHOICES,blank=True,null=True)
    user_sended_email = models.EmailField(max_length=255,blank=True,null=True)
    user_mail_send_date = models.DateTimeField(auto_now=False, auto_now_add=False,blank=True, null=True)

    def __str__(self):
        return str(self.user_sended)

class Follow(models.Model):
    user = models.ForeignKey(User, related_name='user', on_delete=models.CASCADE,editable=False)
    follow_user = models.ForeignKey(User, related_name='follow_user', on_delete=models.CASCADE,blank=True,null=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.follow_user)

    def save(self, *args, **kwargs):
        auto_save_current_user(self)
        super(Follow, self).save(*args, **kwargs)

class UserSportsChoices(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    sports = models.ManyToManyField(BlogSports)

    class Meta:
        verbose_name = "User Sport Choices"
        verbose_name_plural = "User Sport Choices"

    def __str__(self):
        get_sports = self.sports.filter().values_list('name',flat=True)
        sports = [s for s in get_sports]
        a = " "
        str_sports=a.join(sports)

        return "User - " + str(self.user.username)+" Sports: "+str_sports


from django.urls import reverse
class PropMaster(models.Model):
    uid = models.UUIDField(default=uuid.uuid4, unique=True)
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name="propmaster_user",blank=True,null=True)
    player1_name = models.CharField(max_length=100)
    player2_name = models.CharField(max_length=100,blank=True,null=True)
    sport = models.CharField(max_length=100, blank=True, null=True)

    player1_email = models.EmailField(max_length=255)
    player2_email = models.EmailField(max_length=255,blank=True,null=True)

    game_name = models.CharField(max_length=255)
    game_date = models.DateTimeField(blank=True,null=True)
    props_data = models.JSONField(blank=True,null=True)

    challenge_accepted = models.BooleanField(default=False)
    game_completed = models.BooleanField(default=False)
    game_setttled = models.BooleanField(default=False)

    player1_score = models.IntegerField(blank=True,null=True)
    player2_score = models.IntegerField(blank=True,null=True)
    winner = models.CharField(max_length=100,blank=True,null=True)

    created = models.DateTimeField(auto_now_add=True)

    # game_time = models.DateTimeField(blank=True,null=True)
    # player1_score = models.IntegerField(blank=True,null=True)
    # player2_score = models.IntegerField(blank=True,null=True)

    # player1_picks = models.CharField(max_length=255,blank=True,null=True)
    # player2_picks = models.CharField(max_length=255,blank=True,null=True)
    # player1_prop_type = models.CharField(max_length=20,blank=True,null=True)
    # player2_prop_type = models.CharField(max_length=20,blank=True,null=True)

    # props_player1_data = models.JSONField(blank=True,null=True)
    # props_player2_data = models.JSONField(blank=True,null=True)


    def __str__(self):
        return self.player1_name+">>"+self.game_name+">>"+str(self.id)

    def get_absolute_url(self):
        return reverse('prop_master_player2', args=[str(self.uid)])

    @property
    def game_date_only(self):
        if self.game_date:
            return self.game_date.strftime('%Y%m%d')
        return ''