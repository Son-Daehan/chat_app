from django.urls import path, re_path
from . import views

urlpatterns = [
    path("", views.index),
    # the path below causes routes to media to defer to here
    # re_path(r'^(?:.*)/?$', views.index)
]
