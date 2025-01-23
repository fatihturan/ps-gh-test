import pandas as pd
from pineproxy.models import Sports_name
from django.views import generic
from notifications.models import UserNotification as Notification

import logging,traceback
logger = logging.getLogger('django')

def get_ip(request):
    try:
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get("REMOTE_ADDR")
    except:
        ip = ""
    return ip

def check_prop_master_user(user):
    if user:
        is_user_group = False
        is_user_group = user.groups.filter(name__in=['prop_master_user']).exists()
        if is_user_group:
            return True
        else:
            return False

class NotificationsView(generic.ListView):
    template_name = 'notifications/notifications.html'
    context_object_name = 'notifications'
    paginate_by = 15

    def get_queryset(self):
        notifications = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).order_by('-date')

        notifications_pd = pd.DataFrame.from_records(notifications.values())
        notifications_pd["is_old"] = notifications_pd["is_seen"]
        notifications.update(is_seen=True)

        notifications_pd["post"] = notifications.only('post')
        notifications_pd["sender"] = notifications.only('sender')
        notifications_pd["user"] = notifications.only('user')
        notifications_pd["prop_master_game"] = notifications.only('prop_master_game')

        #marks self-likes/comments as seen
        self_notifications = Notification.objects.filter(user=self.request.user).filter(sender=self.request.user).filter(is_seen=False).order_by('-date')
        self_notifications.update(is_seen=True)

        count_list = []
        id_list = []


        id_counter = 1
        for index, row in notifications_pd.iterrows():
            if int(row["Notification_type"]) == 1 or int(row["Notification_type"]) == 4:
                count = len(notifications_pd[(notifications_pd['post_id'] == row['post_id']) & (
                            notifications_pd['Notification_type'] == row['Notification_type'])])

                if count < 10:
                    id_list.append(id_counter)
                    id_counter = id_counter + 1
                else:
                    id_list.append(0)
            else:
                count = 0
                id_list.append(id_counter)
                id_counter = id_counter + 1

            count_list.append(count - 1)

        notifications_pd["count"] = count_list
        notifications_pd["id"] = id_list

        # once we get more notifications activate this
        notifications_pd = notifications_pd.drop_duplicates(subset=['post_id', 'Notification_type', 'count', 'id'], keep="first")

        # initial - once we get more notifications delete this
        #notifications_pd["count"] = 0

        queryset = notifications_pd

        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context["new_notifications"] = (Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).exclude(is_seen=True).count() > 0)
        context["notification_count"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).count()
        context["recent_notifications"] = Notification.objects.filter(user=self.request.user).exclude(sender=self.request.user).order_by('-date')[:4]
        context['is_group'] = self.request.user.groups.filter(name__in=['data_access_user', 'admin_user']).exists()
        context['sports_name'] = Sports_name.objects.all().values_list('name', flat=True)
        #context['is_prop_master_user'] = check_prop_master_user(self.request.user)
        logger.info("{} {} {} {}".format(self.request.method, self.request.get_full_path(), get_ip(self.request), self.request.user.id))

        return context