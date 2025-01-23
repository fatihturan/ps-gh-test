from django.db.models.signals import post_save
from django.dispatch import receiver
from blog.models import Post,Comment
from users.models import Profile
from users.utils import SendEmailThreading

from django.contrib.auth import get_user_model
User = get_user_model()


'''send email for following post only first time using post model sent_email tag'''
@receiver(post_save, sender=Post)
def send_email_following_posts_signal(sender, instance, created, **kwargs):
    if created:
        if instance.draft==False and instance.sent_email==False:
            post_created_user = instance.author
            followers_users_email = Profile.objects.get(user=post_created_user).followers_users_email
            if followers_users_email:
                post_url = "https://pine-sports.com"+instance.get_absolute_url()
                subject = f'{post_created_user.username} Created new blog on Pine-Sports'
                message = f'new post crated {post_url}'
                recipient_list = followers_users_email
                SendEmailThreading(subject, message, recipient_list).start()
                instance.sent_email=True
                instance.save()

    else:
        # if Author draft post is publish
        if instance.draft==False and instance.sent_email==False:
            post_created_user = instance.author
            followers_users_email = Profile.objects.get(user=post_created_user).followers_users_email
            if followers_users_email:
                post_url = "https://pine-sports.com"+instance.get_absolute_url()
                subject = f'{post_created_user.username} Created new blog on Pine-Sports'
                message = f'new post crated {post_url}'
                recipient_list = followers_users_email
                SendEmailThreading(subject, message, recipient_list).start()
                instance.sent_email=True
                instance.save()

'''send email to post created author when someone comments on the post'''
@receiver(post_save, sender=Comment)
def send_email_comments_on_post_signal(sender, instance, created, **kwargs):
    if created:
        post_author_obj = instance.post_connected.author

        #check is user profile has email_comments_posts is True
        is_email_comments_posts = Profile.objects.filter(id=post_author_obj.id,email_comments_posts=True)
        if is_email_comments_posts:
            commented_user = instance.author
            comment_content = instance.content
            post_url = "https://pine-sports.com"+instance.post_connected.get_absolute_url()
            subject = f'{commented_user.username} Comment on your post'
            message = f'{commented_user.username} comments on your post {post_url}'
            recipient_list = [post_author_obj.email]
            SendEmailThreading(subject, message, recipient_list).start()