from django.contrib import admin
from .models import DataFrame,Sports_name,PredictMLBUserFormData,PredictNFLUserFormData,PredictNBAUserFormData,PredictNHLUserFormData,LineSpreadsheetUpload,Test_Schedule_Tasks
# Register your models here.

@admin.register(DataFrame)
class DataFrameAdmin(admin.ModelAdmin):
    pass

class Sport_nameAdmin(admin.ModelAdmin):
    model = Sports_name
    list_display = ('name','created','active_sheet_name','active_line_csv_dataset')

class PredictMLBUserFormDataAdmin(admin.ModelAdmin):
    model = PredictMLBUserFormData
    list_display = ('user','predict_type','model_name', 'model_score', 'last_game', 'created')
    search_fields = ('user__username',)

class PredictNFLUserFormDataAdmin(admin.ModelAdmin):
    model = PredictNFLUserFormData
    list_display = ('user','predict_type','model_name', 'model_score', 'last_game', 'created')
    search_fields = ('user__username',)

class PredictNBAUserFormDataAdmin(admin.ModelAdmin):
    model = PredictNBAUserFormData
    list_display = ('user','predict_type','model_name', 'model_score', 'last_game', 'created')
    search_fields = ('user__username',)

class PredictNHLUserFormDataAdmin(admin.ModelAdmin):
    model = PredictNHLUserFormData
    list_display = ('user','predict_type','model_name', 'model_score', 'last_game', 'created')
    search_fields = ('user__username',)

admin.site.register(Sports_name,Sport_nameAdmin)
admin.site.register(PredictMLBUserFormData,PredictMLBUserFormDataAdmin)
admin.site.register(PredictNFLUserFormData,PredictNFLUserFormDataAdmin)
admin.site.register(PredictNBAUserFormData,PredictNBAUserFormDataAdmin)
admin.site.register(PredictNHLUserFormData,PredictNHLUserFormDataAdmin)
admin.site.register(LineSpreadsheetUpload)
admin.site.register(Test_Schedule_Tasks)