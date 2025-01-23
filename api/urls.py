from django.urls import path
from .views import *

urlpatterns = [
    path('ask/', AskView.as_view(), name='ask'),  # Class-Based View
]