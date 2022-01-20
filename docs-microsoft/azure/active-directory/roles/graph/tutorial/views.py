from django,shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from datetime import datetime, timedelta

def home(request):
    # Temporary!
    return HttpResponse("Welcome to the tutorial.")