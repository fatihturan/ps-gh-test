from django.urls import path
from .views import *

urlpatterns = [
    path('sports-news/bulk-create', SportsNewsBulkCreateView.as_view()),
    path('sports-tweet/bulk-create', SportsTweetBulkCreateView.as_view()),
]