from django import template
from django.utils.safestring import mark_safe
import stripe
from django.conf import settings
import os


register = template.Library()

@register.simple_tag
def get_stripe_prod_price(value):
    """
    get the data from stripe
    data = {
        "active": true,
        "aggregate_usage": null,
        "amount": 3000,
        "amount_decimal": "3000",
        "billing_scheme": "per_unit",
        "created": 1709301407,
        "currency": "usd",
        "id": "price_xxxxx",
        "interval": "month",
        "interval_count": 1,
        "livemode": false,
        "metadata": {},
        "nickname": null,
        "object": "plan",
        "product": "prod_xxx",
        "tiers_mode": null,
        "transform_usage": null,
        "trial_period_days": null,
        "usage_type": "licensed"
        }
    """
    # Prod - stripe api kep
    stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')


    data = stripe.Plan.retrieve(value)
    return data

@register.filter()
def price_convert(value):
    return int(value) / 100