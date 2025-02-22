# Generated by Django 3.1.1 on 2022-09-06 11:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0027_auto_20220829_1921'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='bio',
            field=models.TextField(blank=True, max_length=160, null=True, verbose_name='Profile Bio'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='image',
            field=models.ImageField(blank=True, default='defaultProfile.png?v=1', null=True, upload_to='profile_pics', verbose_name='Profile Image'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='prop_master_game_played',
            field=models.ManyToManyField(blank=True, related_name='profile_propmaster_m2m', to='users.PropMaster'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='twitter_url',
            field=models.URLField(blank=True, max_length=255, null=True, unique=True, verbose_name='Twitter Handle'),
        ),
    ]
