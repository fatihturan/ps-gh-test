from django.urls import path
from django.urls import include, re_path
from django.contrib.sitemaps.views import sitemap
from blog.sitemaps import PostSitemap

from .views import (
    PostListView,
    PostListViewNew,
    PostDetailView,
    PostCreateView,
    PostUpdateView,
    PostDeleteView,
    UserPostListView,
    UserDraftListView,
    FollowsListView,
    FollowersListView,
    postpreference,
    LikeView,
    SearchListView,
    postlikepreference,
    delete_comment,
    delete_comment_confirm,
    Like_comment,
    comment_postlikepreference,
    PostListViewFollowing,
    CommunityView,
    robots_txt,
    favicon_ico,
    last_post,
    generate_response,
    )

app_name = 'stories'

sitemaps = {
		"posts": PostSitemap,
}

urlpatterns = [
    path('', PostListView.as_view(), name='blog-home'),
    path('new/', PostListViewNew.as_view(), name='blog-home-new'),
    path('following/', PostListViewFollowing.as_view(), name='blog-home-following'),
    path('community/<community_name>', CommunityView.as_view(), name='blog-community'),
    path('community/<community_name>/', CommunityView.as_view(), name='blog-community'),
    path('post/new/', PostCreateView.as_view(), name='post-create'),
    path('post/<int:pk>/<slug>/', PostDetailView.as_view(), name='post-detail'),
    path('post/<int:pk>/', PostDetailView.as_view(), name='post-detail-noslug'),
    path('user/<str:username>', UserPostListView.as_view(), name='user-posts'),
    path('user/<str:username>/drafts/', UserDraftListView.as_view(), name='user-drafts'),
    path('post/<int:pk>/<slug>/update/', PostUpdateView.as_view(), name='post-update'),
    path('post/<int:pk>/<slug>/del/', PostDeleteView.as_view(), name='post-delete'),
    path('user/<str:username>/follows', FollowsListView.as_view(), name='user-follows'),
    path('user/<str:username>/followers', FollowersListView.as_view(), name='user-followers'),
    path('post/<int:postid>/preference/<int:userpreference>', postpreference, name='postpreference'),
    path('like/<int:pk>',LikeView,name='like_post'),
    path('post/', postlikepreference, name='postlikepreference'),
    path('comment-post-like/', comment_postlikepreference, name='comment_postlikepreference'),
    re_path(r'^comment-delete/(?P<id>\w+)/', delete_comment, name='comment-delete'),
    path('like_comment/<int:id>',Like_comment, name='like_comment'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    path("robots.txt", robots_txt),
    path("favicon.ico", favicon_ico),
    path("last_post.txt", last_post),
    path('generate_response/', generate_response, name='generate_response'),
]