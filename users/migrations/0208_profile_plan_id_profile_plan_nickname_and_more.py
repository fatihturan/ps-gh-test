# Generated by Django 4.2.13 on 2024-09-20 20:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0207_profile_stripe_customer_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='plan_id',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='plan_nickname',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='subscription_canceled',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='profile',
            name='subscription_current_period_end',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='subscription_current_period_start',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='subscription_interval',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
