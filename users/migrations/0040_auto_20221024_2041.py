# Generated by Django 3.1.1 on 2022-10-24 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0039_auto_20221003_2003'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='prop_master_game_played',
            field=models.ManyToManyField(blank=True, related_name='profile_propmaster_m2m', to='users.PropMaster'),
        ),
    ]
