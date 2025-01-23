from crum import get_current_user

import threading
from django.core.mail import send_mail
import time
from django.conf import settings as conf_settings


# to save currently logged in user by model itself
def auto_save_current_user(obj):
    user = get_current_user()
    if user and not user.pk:
        user = None
    if not obj.pk:
        obj.user = user

#send email for  following users
class SendEmailThreading(threading.Thread):
    def __init__(self,subject,message,recipient_list):
        self.subject = subject
        self.message = message
        self.recipient_list = recipient_list
        threading.Thread.__init__(self)

    def run(self):
        time.sleep(10)
        try:
            email_from = conf_settings.EMAIL_HOST_USER
            [send_mail(self.subject,self.message,email_from,[i]) for i in self.recipient_list]

        except Exception as e:
            print(e)