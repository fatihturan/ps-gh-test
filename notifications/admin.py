from django.contrib import admin
from .models import UserNotification

class UserNotificationAdmin(admin.ModelAdmin):
    list_display = ('sender', 'user', 'post', 'Notification_type', 'date', 'is_seen')
    search_fields = ('sender',)

# Register your models here.
admin.site.register(UserNotification, UserNotificationAdmin)