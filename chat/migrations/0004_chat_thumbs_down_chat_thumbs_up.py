# Generated by Django 4.2.13 on 2024-09-17 22:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_chat_cost_chat_models_used'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='thumbs_down',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='chat',
            name='thumbs_up',
            field=models.BooleanField(default=False),
        ),
    ]
