# Generated by Django 3.1.1 on 2023-04-15 12:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0180_auto_20230415_1025'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='prop_master_game_played',
            field=models.ManyToManyField(blank=True, related_name='profile_propmaster_m2m', to='users.PropMaster'),
        ),
    ]
