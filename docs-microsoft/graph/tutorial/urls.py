from django.contrib import admin
from django.urls import path, include
from tutorial import views

urlpatterns = [
    # /
    path('signin', views.sign_in, name='signin'),
    path('callback', views.callback, name='callback'),
]