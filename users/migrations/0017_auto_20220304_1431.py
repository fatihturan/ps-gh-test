# Generated by Django 3.1.1 on 2022-03-04 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0016_profile_prop_king_game_played'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='prop_king_game_played',
        ),
        migrations.AddField(
            model_name='profile',
            name='prop_king_game_played',
            field=models.ManyToManyField(blank=True, related_name='profile_propking_m2m', to='users.propmaster'),
        ),
    ]
