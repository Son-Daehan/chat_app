from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import authenticate, login, logout
from .models import User
import json
from django.http import HttpResponse, JsonResponse



@csrf_exempt
def signup(request):
    try:
        # print(request.params)
        body = json.loads(request.body)
        print(body)
        # username = body['username']
        data = {
            'username': body['email'],
            'email': body['email'],
            'password': body['password'],
            'first_name': body['first_name'],
            'last_name': body['last_name'],
        }

        User.objects.create_user(**data)
    except Exception as e:
        print('oops!')
        print(str(e))
    return HttpResponse('hi')

@csrf_exempt
def log_in(request):
    body = json.loads(request.body)
    username = body['username']
    password = body['password']
    print(body)
    
    # remember, we told django that our email field is serving as the 'username' 
    # this doesn't start a login session, it just tells us which user from the db belongs to these credentials
    user = authenticate(username=username, password=password)
    if user is not None:
        if user.is_active:
            try:
                login(request, user)
            except Exception as e:
                print('oops!')
                print(str(e))
            return HttpResponse('Authorized', status=201)
            # Redirect to a success page.
        else:
            return HttpResponse('not active!')
            # Return a 'disabled account' error message
    else:
        return HttpResponse('no user!')
        # Return an 'invalid login' error message.

@csrf_exempt
def log_out(request):
    logout(request)
    return HttpResponse('Logged you out!')

@csrf_exempt
def user_profile(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'email': request.user.email,
            'first_name': request.user.first_name
        })
    else:
        return JsonResponse({'user':None})

def check_session(request):
    if request.user.is_authenticated:
        return JsonResponse({
            'user': request.user.email
        })
        # return HttpResponse('Authorized', status=201)
    else:
        return HttpResponse('Unauthorized', status=401)