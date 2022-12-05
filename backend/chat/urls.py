from django.urls import path 
from . import views
from rest_framework.urlpatterns import format_suffix_patterns


urlpatterns = [

    path('chat_log/', views.manage_chat_log, name="items"),
    # path('chat_log/<slug:key>', views.manage_item, name="single_item")
    # path("", views.index, name="index"),
    # path("<str:room_name>/", views.room, name="room"),
]

urlpatterns = format_suffix_patterns(urlpatterns)