# Generated by Django 3.1.1 on 2022-02-08 05:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('users', '0003_auto_20220204_0756'),
    ]

    operations = [
        migrations.AddField(
            model_name='propking',
            name='user',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='propking_user', to='auth.user'),
            preserve_default=False,
        ),
    ]
