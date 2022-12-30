# REDIS SETUP
from django.conf import settings
import redis
from rest_framework import status
from rest_framework.response import Response
import json
from rest_framework.decorators import api_view
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from .models import User
from .models import Channel
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .serializers.serializers import UserSerializer
import json
from .serializers.channel_serializer import ChannelSerializer
redis_instance = redis.StrictRedis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0)

@api_view(['POST'])
def signup(request):
    try:
        body = request.data
        print(body)
        data = {
            'username': body['email'],
            'email': body['email'],
            'password': body['password'],
            'first_name': body['firstName'],
            'last_name': body['lastName'],
        }

        try: 
            User.objects.create_user(**data)

        except:
            return JsonResponse({'status':'false', 'message': 'there is def something wrong'}, status=403)


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

                    serializedUser = UserSerializer(user)
                    return JsonResponse({'user_info': serializedUser.data})
                except Exception as e:
                    # print('oops!')
                    # print(str(e))
                    return JsonResponse({'login':False}, status=401)
                # Redirect to a success page.
            else:
                return JsonResponse({'active':False}, status=401)
                # Return a 'disabled account' error message
        else:
            return JsonResponse({'user':False}, status=401)
            # Return an 'invalid login' error message.
    except Exception as e:
        print(e)
        return JsonResponse({'success':False}, status=401)
        

@api_view(['POST'])
def log_out(request):
    print(request)
    logout(request)
    return JsonResponse({'success':True})


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


@api_view(['GET'])
def user_channels(request):
    if request.method == 'GET':
        channels = Channel.objects.filter(user=request.user)
        serialized_channels = ChannelSerializer(channels, many=True)

        # print(serialized_channels.data)

        return JsonResponse({'channels':serialized_channels.data})

@api_view(['POST'])
def create_channel(request):
    if request.method == 'POST':

        data = request.data

        channel_name = data['channelName']
        username = data['username']

        user = User.objects.get(email=username)
        print(user)

        new_channel_info = {
            'channel_name':channel_name,
            'user':user,
        }

        new_channel = Channel(**new_channel_info)
        
        new_channel.save()

        return JsonResponse({'success':True})


@api_view(['GET', 'POST'])
def manage_chat_log(request):
    if request.method == 'GET':
        print(request.data)
        response = redis_instance.lrange('cat_log_2', 0, -1)

        data = []

        for dict in response:
            data.append(json.loads(dict))

        # print(data[::-1])

        return JsonResponse({'data':data[::-1]},status=200)
        
    elif request.method == 'POST':

        response = request.data
        print(response)
        room_name = response['room_name']
        user = response['user']
        message = response['message']
        print(response)

        redis_instance.lpush(room_name, json.dumps({'user':user, 'msg':message}))

        return Response(201)


@api_view(['GET'])
def chat_log(request, room_name):
    if request.method == 'GET':
        # print(room_name)
        response = redis_instance.lrange(room_name, 0, -1)

        data = []

        for dict in response:
            data.append(json.loads(dict))

        # print(data[::-1])

        return JsonResponse({'data':data[::-1]},status=200)