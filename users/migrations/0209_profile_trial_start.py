# Generated by Django 4.2.13 on 2024-10-15 21:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0208_profile_plan_id_profile_plan_nickname_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='trial_start',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
