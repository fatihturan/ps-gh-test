from django.contrib import admin
from blog.models import Post, Comment, Preference, CommentLike,BlogSports

class PostAdmin(admin.ModelAdmin):
    model = Post
    list_display = ('title','author','related_sport','publish')
    search_fields = ('author__username',)

admin.site.register(Post,PostAdmin)
admin.site.register(Comment)
admin.site.register(Preference)
admin.site.register(CommentLike)
admin.site.register(BlogSports)
