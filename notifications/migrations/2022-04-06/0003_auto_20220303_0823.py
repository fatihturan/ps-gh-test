# Generated by Django 3.1.1 on 2022-03-03 08:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_auto_20220228_1555'),
        ('notifications', '0002_auto_20220302_0941'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usernotification',
            name='prop_master_game',
            field=models.ForeignKey(blank=True, help_text='only for prop-master game model use', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notification_prop_master', to='users.propmaster'),
        ),
    ]
