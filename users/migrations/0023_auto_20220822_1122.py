# Generated by Django 3.1.1 on 2022-08-22 11:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0022_auto_20220818_0604'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='email_following_posts',
            field=models.BooleanField(default=False),
        ),
    ]
