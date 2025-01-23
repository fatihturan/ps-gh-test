from django.db import models
from django.contrib.auth.models import User

class UserNotification(models.Model):
    NOTIFICATION_TYPES = ((1,'Like'),(2,'Comment'),(3,'UserPostComment'),(4,'UserPostCommentLike'),(5,'InviteUserBetaNotification'),(6,'PropMasterInvite'),(7,'PropMasterResult'))

    liked_comment_id = models.IntegerField(null=True,blank=True)
    post = models.ForeignKey('blog.Post', on_delete=models.CASCADE, related_name='noti_post',blank=True,null=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='noti_from_user')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='noti_to_user')
    Notification_type = models.IntegerField(choices=NOTIFICATION_TYPES,default=1)
    text_preview = models.CharField(max_length=90,blank=True)
    prop_master_game= models.ForeignKey('users.PropMaster', on_delete=models.CASCADE, related_name="notification_prop_master",null=True, blank=True,help_text="only for prop-master game model use")
    date = models.DateTimeField(auto_now_add=True)
    is_seen = models.BooleanField(default=False)