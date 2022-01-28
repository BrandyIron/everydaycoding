from django.contrib import admin
from django.urls import path, include
from tutorial import views

urlpatterns = [
    # /
    path('signin', views.sign_in, name='signin'),
    path('callback', views.callback, name='callback'),
    path('signout', views.sign_out, name='signout'),
    path('calendar', views.calendar, name='calendar'),
    path('calendar/new', views.newevent, name='newevent'),
]