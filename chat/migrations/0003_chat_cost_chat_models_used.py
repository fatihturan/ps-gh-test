# Generated by Django 4.2.13 on 2024-08-07 22:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_chat_answer_chat_chat_history_chat_google_front_page_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='chat',
            name='cost',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='chat',
            name='models_used',
            field=models.TextField(blank=True, null=True),
        ),
    ]
