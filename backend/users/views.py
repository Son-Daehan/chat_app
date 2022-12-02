from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from .models import User
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view


def index(request):

    homepage = open('static/index.html').read()

    return HttpResponse(homepage)


@api_view(['POST'])
def signup(request):
    try:
        body = request.data
        print(body)
        data = {
            'username': body['email'],
            'email': body['email'],
            'password': body['password'],
            'first_name': body['first_name'],
            'last_name': body['last_name'],
        }

        User.objects.create_user(**data)

        return JsonResponse({'success':True})

    except Exception as e:

        return JsonResponse({'success':False})


@api_view(['POST'])
def log_in(request):
    try:
        body = request.data
        username = body['username']
        password = body['password']
        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                try:
                    login(request, user)
                    return JsonResponse({'login':True})
                except Exception as e:
                    print('oops!')
                    print(str(e))
                    return JsonResponse('login',False)
                # Redirect to a success page.
            else:
                return JsonResponse({'active':False})
                # Return a 'disabled account' error message
        else:
            return JsonResponse({'user':False})
            # Return an 'invalid login' error message.
    except Exception as e:
        print(e)
        return HttpResponse('No user by this email')
        

@api_view(['POST'])
def log_out(request):
    print(request)
    logout(request)
    return HttpResponse('Logged you out!')


@api_view(['GET'])
def user_profile(request):
    # return HttpResponse({request})
    try:
        if request.user:
            if request.user.is_authenticated:
                return JsonResponse({
                    'email': request.user.email,
                    'first_name': request.user.first_name
                })
            else:
                return JsonResponse({'user':None})
    except Exception as e:
        print(e)

        return JsonResponse({'authenticated':False})

# def check_session(request):
#     if request.user.is_authenticated:
#         return JsonResponse({
#             'user': request.user.email
#         })
#         # return HttpResponse('Authorized', status=201)
#     else:
#         return HttpResponse('Unauthorized', status=401)
