# Generated by Django 3.1.1 on 2023-04-15 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0179_auto_20230412_1742'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='prop_master_game_played',
            field=models.ManyToManyField(blank=True, related_name='profile_propmaster_m2m', to='users.PropMaster'),
        ),
    ]
