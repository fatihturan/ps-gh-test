# Generated by Django 3.1.1 on 2022-03-04 06:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0003_auto_20220303_0823'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usernotification',
            name='Notification_type',
            field=models.IntegerField(choices=[(1, 'Like'), (2, 'Comment'), (3, 'UserPostComment'), (4, 'UserPostCommentLike'), (5, 'InviteUserBetaNotification'), (6, 'PropKingInvite'), (7, 'PropKingResult')], default=1),
        ),
    ]
