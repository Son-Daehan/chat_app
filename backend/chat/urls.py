from django.urls import path, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path("chat/channels/", views.create_channel),
    path("chat/channels/add_user/", views.channel_add_user),
    path("chat/user_channels/", views.user_channels),
    path("chat/user_channels/organization/", views.user_organization_channels),
    path("organizations/", views.manage_organization),
    path(
        "organization/add_user/<int:organization_id>/", views.manage_organization_user
    ),
    path("organization/channel/", views.manage_organization_channel),
    path(
        "organization/channel/<int:organization_id>/", views.manage_organization_channel
    ),
    path(
        "organization/channel/users/<int:organization_channel_id>/",
        views.manage_organization_channel_users,
    ),
    path("chat/chat_log/", views.manage_chat_log, name="items"),
    path("chat/chat_log/<str:room_name>/", views.chat_log, name="chat_log"),
    path("accounts/", views.accounts),
    path("accounts/login/", views.accounts_login),
    path("accounts/logout/", views.accounts_logout),
    path("accounts/image_upload/", views.image_upload),
]

urlpatterns = format_suffix_patterns(urlpatterns)
