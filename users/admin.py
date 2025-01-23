from pyexpat import model
from django.contrib import admin
from .models import Profile,S3ZipUpload,ActiveDatafilesZip,BetaCode,Follow,BetacodeInvite, UserSportsChoices,PropMaster

class FollowModelAdmin(admin.ModelAdmin):
    model = Follow
    search_fields = ('user__username','user__email')
    list_display = ('user', 'follow_user', 'date')
    
class BetacodeInviteModelAdmin(admin.ModelAdmin):
    model = BetacodeInvite
    list_display = ('betacode', 'sended_date', 'user_sended','flag_betacode','user_sended_email','user_mail_send_date')


class S3ZipUploadAdmin(admin.ModelAdmin):
    model = S3ZipUpload
    list_display = ('filename_s3','sport','date_uploaded')
    list_filter =('sport',)

class ProfileAdmin(admin.ModelAdmin):
    search_fields = ('user__username',)
    autocomplete_fields = ('prop_master_game_played',)
    list_display = ('user','models_built_today','model_limit',"propMasterResultCount")

    class Meta:
        model = Profile

class BetaCodeAdmin(admin.ModelAdmin):
    list_display = ('code', 'user_connected')
    search_fields = ('code',)

class PropMasterAdmin(admin.ModelAdmin):
    search_fields = ('game_name','id')
    list_display = ('player1_name','player2_name','player1_email','player2_email','game_name','game_date','challenge_accepted','game_completed','game_setttled','winner')

    class Meta:
        model=PropMaster

admin.site.register(Profile,ProfileAdmin)
admin.site.register(S3ZipUpload,S3ZipUploadAdmin)
admin.site.register(ActiveDatafilesZip)
admin.site.register(BetaCode, BetaCodeAdmin)
admin.site.register(Follow, FollowModelAdmin)
admin.site.register(BetacodeInvite, BetacodeInviteModelAdmin)
admin.site.register(UserSportsChoices)
admin.site.register(PropMaster,PropMasterAdmin)
