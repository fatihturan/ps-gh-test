from django.urls import re_path
from chat.consumers import ChatConsumer

websocket_urlpatterns = [
    re_path(r'chat/ws/chat/(?P<id>[0-9a-z\-]*)/$', ChatConsumer.as_asgi()),
    re_path(r'chat/ws/chat/(?P<id>[0-9a-z\-]*)/$', ChatConsumer.as_asgi()),
]
