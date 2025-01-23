# Generated by Django 4.2.13 on 2024-11-05 01:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0006_remove_chat_chat_session_id_session_chat_session'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chat',
            name='session',
        ),
        migrations.AddField(
            model_name='chat',
            name='chat_session_id',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
