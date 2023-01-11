from django.urls import path, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path("chat/chat_log/", views.manage_chat_log, name="items"),
    path("chat/chat_log/<str:room_name>/", views.chat_log, name="chat_log"),
    path("login/", views.user_login, name="login"),
    path("logout/", views.user_logout, name="logout"),
    # user
    path("users/", views.users_manage, name="user_list_create"),
    path("users/<int:pk>/", views.user_manage),
    path("user/organizations/", views.user_organizations_manage),
    # organization
    path("organizations/", views.organizations_manage),
    path("organizations/<int:organization_id>/", views.organization_manage),
    # organization members
    path(
        "organization_members/<int:organization_id>/", views.organization_members_manage
    ),
    path(
        "organization_members/<int:organization_id>/<int:user_id>/",
        views.organization_member_manage,
    ),
    # organization channel
    path(
        "organization_channels/<int:organization_id>/",
        views.organization_channels_manage,
    ),
    path(
        "organization_channel/channels/<int:channel_id>/",
        views.organization_channel_manage,
    ),
    # organization channel members
    path(
        "organization_channel_members/<int:channel_id>/",
        views.organization_channel_members_manage,
    ),
    # path(
    #     "organization_channel_member/<int:pk>/",
    #     views.organization_channel_member_manage,
    # ),
]

# urlpatterns = format_suffix_patterns(urlpatterns)
