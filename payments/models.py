from django.db import models
from django.contrib.auth.models import User


class StripeCustomer(models.Model):
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, related_name="subuser")
    stripeCustomerId = models.CharField(max_length=255)
    stripeSubscriptionId = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username