from django.contrib import admin

from payments.models import StripeCustomer


@admin.register(StripeCustomer)
class AdminStripeCustomer(admin.ModelAdmin):
    list_select_related = ('user', )
    list_display = ('user', 'stripeCustomerId', 'stripeSubscriptionId')
    search_fields = ('user', 'user__username', 'user__id')
    autocomplete_fields = ('user', )
