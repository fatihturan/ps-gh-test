# Generated by Django 3.1.1 on 2022-09-25 00:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0034_auto_20220923_2009'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='prop_master_game_played',
            field=models.ManyToManyField(blank=True, related_name='profile_propmaster_m2m', to='users.PropMaster'),
        ),
    ]
