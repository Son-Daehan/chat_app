from django.urls import path 
from . import views


urlpatterns = [
    path('', views.index),
    path('register/', views.signup),
    path('log_in/', views.log_in),
    path('log_out/', views.log_out),
    path('user_profile/', views.user_profile),

    # path('check_session', views.check_session),
]