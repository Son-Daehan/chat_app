from django.urls import path, re_path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [
    path('account/register/', views.signup),
    path('account/log_in/', views.log_in),
    path('account/log_out/', views.log_out),
    path('account/user_profile/', views.user_profile),

    path('chat/channels/', views.create_channel),
    path('chat/user_channels/', views.user_channels),
    
    path('chat/chat_log/', views.manage_chat_log, name="items"),
    path('chat/chat_log/<str:room_name>/', views.chat_log, name="chat_log"),
]

urlpatterns = format_suffix_patterns(urlpatterns)