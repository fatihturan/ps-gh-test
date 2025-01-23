from django.urls import path, re_path
from django.views.generic.base import RedirectView
from payments import views

app_name = 'payments'

urlpatterns = [
    path('', views.HomeView.as_view(), name='subscriptions_home'),
    path('create-checkout-session/', views.CreateCheckoutSessionView.as_view(), name='create_checkout_session'),
    path('modify/confirm/<str:subscription_id>/create-checkout-session/', views.CreateCheckoutSessionView.as_view(), name='create_checkout_session'),
    path('create-portal-session/', views.CreatePortalSessionView.as_view(), name='create_portal_session'),
    path('modify/confirm/<str:subscription_id>/create-portal-session/', views.CreatePortalSessionView.as_view(), name='create_portal_session'),
    path('discord/create-checkout-session/', views.CreateCheckoutSessionView.as_view(), name='create_checkout_session'),
    path('success/', views.SuccessView.as_view(), name='subscriptions_success'),
    path('cancel/', views.CancelView.as_view(), name='subscriptions_cancel'),
    path('config/', views.stripe_config),
    path('webhook/', views.stripe_webhook, name='stripe_webhook'),
    path('cancel-subscriptions/', views.cancel_subscription, name='cancel_subscription'),
    path('discordoauth', views.discord_oauth_callback, name='discord_oauth_callback'),
    path('discord/', views.DiscordSubscribeView.as_view(), name='discord_subscribe'),
    path('modify/confirm/<str:subscription_id>/', views.ModifyConfirmView.as_view(), name='modify_confirm'),
]
