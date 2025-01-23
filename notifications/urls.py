from django.urls import path
from notifications.views import NotificationsView

app_name = 'notification'
urlpatterns = [
    path('', NotificationsView.as_view(), name='notifications'),
]
