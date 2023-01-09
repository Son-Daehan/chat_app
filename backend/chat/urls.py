from django.urls import path, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path("chat/chat_log/", views.manage_chat_log, name="items"),
    path("chat/chat_log/<str:room_name>/", views.chat_log, name="chat_log"),
    path("login/", views.user_login, name="login"),
    path("logout/", views.user_logout, name="logout"),
    # user
    path("users/", views.user_list_create_view, name="user_list_create"),
    path(
        "users/<int:pk>/",
        views.user_retrieve_update_destroy_view,
    ),
    # organization
    path(
        "organizations/",
        views.organization_list_create_view,
    ),
    path(
        "organizations/<int:pk>/",
        views.organization_retrieve_update_destroy_view,
    ),
    # organization owner
    path(
        "organization_owner/",
        views.organization_owner_list_create_view,
    ),
    path(
        "organization_owner/<int:pk>/",
        views.organization_owner_retrieve_update_destroy_view,
    ),
    # organization channel
    path(
        "organization_channels/",
        views.organization_channel_list_create_view,
    ),
    path(
        "organization_channels/<int:pk>/",
        views.organization_channel_retrieve_update_destroy_view,
    ),
    # organization channel user
    path(
        "organization_channel_users/",
        views.organization_channel_user_list_create_view,
    ),
    path(
        "organization_channel_users/<int:pk>/",
        views.organization_channel_user_retrieve_update_destroy_view,
    ),
    # user organization
    path(
        "user_organizations/",
        views.user_organization_list_create_view,
    ),
    path(
        "user_organizations/<int:pk>/",
        views.user_organization_retrieve_update_destroy_view,
    ),
]

urlpatterns = format_suffix_patterns(urlpatterns)
# urlpatterns = format_suffix_patterns(urlpatterns)
