from django.contrib import admin
from .models import Chat, Session

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    #list_display = ('created_at', 'user', 'question', 'temporary_answer', 'tools_requested', 'tools_used', 'question_with_research', 'answer', 'models_used', 'cost', 'thumbs_up', 'thumbs_down')
    list_display = ('id', 'created_at', 'user', 'question', 'temporary_answer', 'tools_requested', 'tools_used', 'answer', 'models_used', 'cost', 'thumbs_up', 'thumbs_down','feedback')
    ordering = ('-created_at',)
    search_fields = ('user__username', 'user__email', 'question', 'temporary_answer', 'tools_requested', 'tools_used', 'question_with_research', 'answer', 'models_used', 'cost')

@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ('session_id', 'summary', 'user', 'created_at', 'updated_at')
    ordering = ('-created_at',)
    search_fields = ('session_id', 'summary', 'user__username', 'user__email')