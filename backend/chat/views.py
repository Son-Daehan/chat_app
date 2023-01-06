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
from .models import UserChannel, Organization, UserOrganization, OrganizationChannel
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .serializers.serializers import UserSerializer
import json
from .serializers.channel_serializer import (
    ChannelSerializer,
    UserOrganizationChannelSerializer,
)
from .serializers.organization_serializer import (
    OrganizationSerializer,
    UserOrganizationSerializer,
    OrganizationChannelSerializer,
)
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView

redis_instance = redis.StrictRedis(
    host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0
)


@api_view(["GET"])
def user_channels(request):
    if request.method == "GET":
        channels = Channel.objects.filter(channel_owner=request.user)
        serialized_channels = ChannelSerializer(channels, many=True)

        # print(serialized_channels.data)

        return JsonResponse({"channels": serialized_channels.data})


@api_view(["POST"])
def create_channel(request):
    if request.method == "POST":

        data = request.data

        channel_name = data["channelName"]
        username = data["username"]

        user = User.objects.get(email=username)

        new_channel_info = {
            "channel_name": channel_name,
            "channel_owner": user,
        }

        new_channel = Channel(**new_channel_info)

        new_channel.save()

        return JsonResponse({"success": True})


@api_view(["POST"])
def channel_add_user(request):
    if request.method == "POST":
        data = request.data

        channel_owner = request.user

        user = User.objects.get(email=data["username"])
        channel = Channel.objects.get(
            channel_owner=request.user, channel_name=data["channel"]
        )

        new_user_to_channel_info = {"user": user, "channel": channel}

        new_user_to_channel = UserChannel(**new_user_to_channel_info)
        new_user_to_channel.save()

        return JsonResponse({"success": True})


@api_view(["GET"])
def user_organization_channels(request):
    if request.method == "GET":
        channels = UserChannel.objects.filter(user=request.user)
        # serialized_channels = ChannelSerializer(channels, many=True)
        serialized_channels = UserOrganizationChannelSerializer(channels, many=True)

        # print(serialized_channels.data)
        return JsonResponse({"data": serialized_channels.data})
        # return JsonResponse({'channels':serialized_channels.data})


@api_view(["GET", "POST"])
def manage_chat_log(request):
    if request.method == "GET":
        response = redis_instance.lrange("cat_log_2", 0, -1)

        data = []

        for dict in response:
            data.append(json.loads(dict))

        # print(data[::-1])

        return JsonResponse({"data": data[::-1]}, status=200)

    elif request.method == "POST":
        response = request.data
        room_name = response["room_name"]
        user = response["user"]
        message = response["message"]

        redis_instance.lpush(room_name, json.dumps({"user": user, "msg": message}))

        return Response(201)


@api_view(["GET"])
def chat_log(request, room_name):
    if request.method == "GET":
        # print(room_name)
        response = redis_instance.lrange(room_name, 0, -1)

        data = []

        for dict in response:
            data.append(json.loads(dict))

        # print(data[::-1])

        return JsonResponse({"data": data[::-1]}, status=200)

    if request.method == "POST":
        try:
            data = request.data
            user = data["user"]
            message = data["message"]

            redis_instance.lpush(room_name, json.dumps({"user": user, "msg": message}))

            return JsonResponse({"success": True})
        except:
            return JsonResponse({"success": False})


@api_view(["GET", "POST"])
def manage_organization(request):
    if request.method == "POST":
        data = request.data
        user = User.objects.get(email=request.user)

        new_organization_info = {
            "organization_name": data["organizationName"],
            "organization_owner": user,
        }
        new_organization = Organization(**new_organization_info)
        new_organization.save()

        user_to_organization_info = {
            "organization": new_organization,
            "user": request.user,
        }

        user_to_organization = UserOrganization(**user_to_organization_info)
        user_to_organization.save()

        return JsonResponse({"success": True})

    if request.method == "GET":
        organizations = UserOrganization.objects.filter(user=request.user)

        serialized_organizations = UserOrganizationSerializer(organizations, many=True)

        print(serialized_organizations.data)

        return JsonResponse({"data": serialized_organizations.data})


@api_view(["POST"])
def manage_organization_user(request):
    if request.method == "POST":
        data = request.data

        organization = Organization.objects.get(id=data["organizationID"])
        user = User.objects.get(email=data["username"])

        new_organization_user_info = {"organization": organization, "user": user}

        new_organization_user = UserOrganization(**new_organization_user_info)

        new_organization_user.save()

        return JsonResponse({"data": True})


@api_view(["GET", "POST"])
def manage_organization_channel(request, organization_id):
    if request.method == "GET":
        organization = Organization.objects.get(id=organization_id)
        organization_channels = OrganizationChannel.objects.filter(
            organization=organization
        )

        serialized_organization_channels = OrganizationChannelSerializer(
            organization_channels, many=True
        )
        # print(serialized_organization_channels.data)

        return JsonResponse({"data": serialized_organization_channels.data})

    if request.method == "POST":
        data = request.data

        organization = Organization.objects.get(id=organization_id)

        new_organization_channel_info = {
            "channel_name": data["channelName"],
            "is_private": False,
            "organization": organization,
        }

        new_organization_channel = OrganizationChannel(**new_organization_channel_info)

        new_organization_channel.save()

        return JsonResponse({"success": True})


class AccountView(APIView):
    def get(self, request):
        users = User.objects.all()
        user_serialized = UserSerializer(users, many=True)
        return JsonResponse({"users": user_serialized.data})

    def post(self, request):
        new_user_info = request.data

        user_serializer = UserSerializer(data=new_user_info)
        if user_serializer.is_valid(raise_exception=True):
            user_saved = user_serializer.save()
            return JsonResponse(
                {"scuccess": f"User {user_saved.email} created successfully."}
            )

    # def put(self, request, pk):
    #     pass

    # def delete(self, request, pk):
    #     pass


class LoginView(APIView):
    def post(self, request):
        data = request.data
        username = data.get("username", None)
        password = data.get("password", None)

        user = authenticate(email=username, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)
                user_serialized = UserSerializer(user)
                return JsonResponse({"user_info": user_serialized.data})
            else:
                return JsonResponse(status=404)
        else:
            return JsonResponse(status=404)


class LogoutView(APIView):
    def post(self, request):
        logout(request)

        return JsonResponse({"success": True})


# class Organization(APIView):
#     def get(self, request):
#         pass

#     def post(self, request):
#         new_organization_info = request.data

#         organization_serializer = OrganizationSerializer(data=new_organization_info)
#         if organization_serializer.is_valid(raise_exception=True):
#             new_organization = organization_serializer.save()
#             return JsonResponse(
#                 {"scuccess": f"User {user_saved.email} created successfully."}
#             )
