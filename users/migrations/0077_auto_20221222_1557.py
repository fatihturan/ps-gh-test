# Generated by Django 3.1.1 on 2022-12-22 15:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0076_auto_20221222_1554'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='prop_master_game_played',
            field=models.ManyToManyField(blank=True, related_name='profile_propmaster_m2m', to='users.PropMaster'),
        ),
    ]
