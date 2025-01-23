from django.urls import path
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from chat.views import ChatView, ChatWithReactView, BetCardView, SuggestedQueriesView,EventsView,ChartDataView, SubmitSurveyView

urlpatterns = [
    path("", ChatWithReactView.as_view(template_name="chat/chat_with_react.html")),
    path("<uuid:sid>", ChatWithReactView.as_view(template_name="chat/chat_with_react.html")),
    path("betcard/<str:chatId>/", BetCardView.as_view(), name="betcard"),
    path("suggestedqueries/<str:id>/", SuggestedQueriesView.as_view(), name="suggestedqueries"),
    path("events/", EventsView.as_view(), name="events"),
    path("chartdata/<str:marketSelectionId>/<str:line>/<str:type>/", ChartDataView.as_view(), name="chartdata"),
    path("submitsurvey/<str:user>/<str:formid>/<str:responseid>/", SubmitSurveyView.as_view(), name="submitsurvey"),
]
