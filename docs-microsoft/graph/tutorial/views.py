from http.client import HTTPResponse
from django,shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from datetime import datetime, timedelta
from dateutil import tz, parser
from tutorial.auth_helper import get_sign_in_flow, get_token_from_code, store_user, remove_user_and_token, get_token


def home(request):
    context = initialize_context(request)

    return render(request, 'tutorial/home.html', context)

def initialize_context(request):
    context = {}

    # Check for any errors in the session
    error = request.session.pop('flash_error', None)

    if error != None:
        context['errors'] = []
        context['errors'].append(error)
    
    # Check for user in the session
    context['user'] = request.session.get('user', {'is_authenticated': False})
    return context

def sign_in(request):
    # Get the sign-in flow
    flow = get_sign_in_flow()
    # Save the expected flow so we can use it in the callback
    try:
        request.session['auth_flow'] = flow
    except Exception as e:
        print(e)
    # Redirect to the Azure sign-in page
    return HttpResponseRedirect(flow['auth_url'])

def callback(request):
    # Make the token request
    result = get_token_from_code(request)

    # Get the user's profile
    user = get_user(result['access_token'])

    # Store user
    store_user(request, user)

    return HttpResponseRedirect(reverse('home'))

def sign_out(request):
    # Clear out the user and token
    remove_user_and_token(request)

    return HttpResponseRedirect(reverse('home'))

def calendar(request):
    context = initialize_context(request)
    user = context['user']

    # Load the user's time zone
    # Microsoft Graph can return the user's time zone as either a Windows time zone name or an IANA time zone identifier
    # Python datetime requires IANA, so convert Windows to IANA
    time_zone = get_iana_from_windows(user['timeZone'])
    tz_info = tz.gettz(time_zone)

    # Get midnight today in user's time zone
    today = datetime.now(tz_info).replace(
        hour=0,
        minute=0,
        second=0,
        microsecond=0
    )

    # Based on today, get the start of the week (Sunday)
    if (today.weekday() != 6):
        start = today - timedelta(days=today.isoweekday())
    else:
        start = today
    
    end = start + timedelta(days=7)

    token = get_token(request)

    events = get_calendar_events(
        token,
        start.isoformat(timespec='seconds'),
        end.isoformat(timespec='seconds'),
        user['timeZone']
    )

    context['errors'] = [
        { 'message': 'Events', 'debug': format(events)}
    ]

    return render(request, 'tutorial/home.html', context)
