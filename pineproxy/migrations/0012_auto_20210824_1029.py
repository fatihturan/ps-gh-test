# Generated by Django 3.1.1 on 2021-08-24 10:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pineproxy', '0011_test_schedule_tasks'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='predictmlbuserformdata',
            name='model_limit',
        ),
        migrations.RemoveField(
            model_name='predictmlbuserformdata',
            name='models_built_today',
        ),
    ]
