# REDIS SETUP
from django.conf import settings
from django.shortcuts import get_object_or_404
import redis
from rest_framework.response import Response
import json
from rest_framework.decorators import api_view
from django.http import JsonResponse

from django.http import JsonResponse
from rest_framework.decorators import api_view
import json
from django.core.files.storage import default_storage
from rest_framework import viewsets
from django.http import JsonResponse
from .serializers.serializers import (
    UserSerializer,
    OrganizationSerializer,
    OrganizationChannelSerializer,
    OrganizationChannelUserSerializer,
    UserOrganizationSerializer,
    OrganizationOwnerSerializer,
)
from .models import (
    User,
    Organization,
    OrganizationChannel,
    OrganizationChannelUser,
    UserOrganization,
    OrganizationOwner,
)
from django.http import Http404
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt


redis_instance = redis.StrictRedis(
    host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=0
)


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


@api_view(["POST"])
def image_upload(request):
    if request.method == "POST":
        try:

            file = request.FILES["img"]

            file_name = default_storage.save(f"{request.data['username']}", file)

            user = User.objects.get(username=request.user)
            user.profile_img = file_name
            user.save(update_fields=["profile_img"])

            return JsonResponse({"img_url": f"/media/{file_name}/"})

        except Exception as e:

            return JsonResponse({"success": False}, status=422)


@api_view(["POST"])
def user_login(request):
    data = request.data

    username = data["username"]
    password = data["password"]
    print(password)
    user = authenticate(request, username=username, password=password)

    print(user)

    if user is not None:
        if user.is_active:
            login(request, user)
            user_serialized = UserSerializer(user)
            print(user_serialized.data)
            return JsonResponse({"user_info": user_serialized.data})
        else:
            return JsonResponse({"success": False}, status=401)
    else:
        return JsonResponse(
            {"status": "error", "error": "Invalid login credentials"}, status=401
        )


@api_view(["POST"])
def user_logout(request):
    logout(request)
    return JsonResponse({"status": "success"})


@api_view(["GET", "POST"])
def user_list_create_view(request):
    if request.method == "GET":
        # Return a list of users
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)

        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        # Create a new user
        try:
            data = request.data
            print(data)
            new_user = User.objects.create_user(**data)
            new_user.save()

            return JsonResponse({"success": True}, status=201, safe=False)

        except:
            return JsonResponse(data, status=400)


@api_view(["GET", "PUT", "DELETE"])
def user_retrieve_update_destroy_view(request, pk):
    try:
        user = User.objects.get(pk=pk)
    except User.DoesNotExist:
        raise Http404

    if request.method == "GET":
        # Return a single user
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "PUT":
        # Update an existing user
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == "DELETE":
        # Delete an existing user
        user.delete()
        return JsonResponse({"success": True}, status=204)


@api_view(["GET", "POST"])
def organization_list_create_view(request):
    if request.method == "GET":
        # Return a list of organizations
        organizations = Organization.objects.all()
        serializer = OrganizationSerializer(
            organizations, many=True, context={"request": request}
        )
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        # Create a new organization
        serializer = OrganizationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400)


@api_view(["GET", "PUT", "DELETE"])
def organization_retrieve_update_destroy_view(request, pk):
    try:
        organization = Organization.objects.get(pk=pk)
    except Organization.DoesNotExist:
        raise Http404

    if request.method == "GET":
        # Return a single organization
        serializer = OrganizationSerializer(organization)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "PUT":
        # Update an existing organization
        serializer = OrganizationSerializer(organization, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == "DELETE":
        # Delete an existing organization
        organization.delete()
        return JsonResponse({"success": True}, status=204)


@api_view(["GET", "POST"])
def organization_owner_list_create_view(request):
    if request.method == "GET":
        # Return a list of organizations
        organization_owner = OrganizationOwner.objects.all()
        serializer = OrganizationOwnerSerializer(organization_owner, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        # Create a new organization
        serializer = OrganizationOwnerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400)


@api_view(["GET", "PUT", "DELETE"])
def organization_owner_retrieve_update_destroy_view(request, pk):
    try:
        organization_owner = OrganizationOwner.objects.get(pk=pk)
    except Organization.DoesNotExist:
        raise Http404

    if request.method == "GET":
        # Return a single organization
        serializer = OrganizationOwnerSerializer(organization_owner)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "PUT":
        # Update an existing organization
        serializer = OrganizationOwnerSerializer(organization_owner, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == "DELETE":
        # Delete an existing organization
        organization_owner.delete()
        return JsonResponse({"success": True}, status=204)


@api_view(["GET", "POST"])
def organization_channel_list_create_view(request):
    if request.method == "GET":
        # Return a list of organization channels
        organization_channels = OrganizationChannel.objects.all()
        serializer = OrganizationChannelSerializer(organization_channels, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        # Create a new organization channel
        serializer = OrganizationChannelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400)


@api_view(["GET", "PUT", "DELETE"])
def organization_channel_retrieve_update_destroy_view(request, pk):
    try:
        organization_channel = OrganizationChannel.objects.get(pk=pk)
    except OrganizationChannel.DoesNotExist:
        raise Http404

    if request.method == "GET":
        # Return a single organization channel
        serializer = OrganizationChannelSerializer(organization_channel)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "PUT":
        # Update an existing organization channel
        serializer = OrganizationChannelSerializer(
            organization_channel, data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == "DELETE":
        # Delete an existing organization channel
        organization_channel.delete()
        return JsonResponse({"success": True}, status=204)


@api_view(["GET", "POST"])
def organization_channel_user_list_create_view(request):
    if request.method == "GET":
        # Return a list of organization channel users
        organization_channel_users = OrganizationChannelUser.objects.all()
        serializer = OrganizationChannelUserSerializer(
            organization_channel_users, many=True
        )
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        # Create a new organization channel user
        serializer = OrganizationChannelUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400)


@api_view(["GET", "PUT", "DELETE"])
def organization_channel_user_retrieve_update_destroy_view(request, pk):
    try:
        organization_channel_user = OrganizationChannelUser.objects.get(pk=pk)
    except OrganizationChannelUser.DoesNotExist:
        raise Http404

    if request.method == "GET":
        # Return a single organization channel user
        serializer = OrganizationChannelUserSerializer(organization_channel_user)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "PUT":
        # Update an existing organization channel user
        serializer = OrganizationChannelUserSerializer(
            organization_channel_user, data=request.data
        )
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == "DELETE":
        # Delete an existing organization channel user
        organization_channel_user.delete()
        return JsonResponse({"success": True}, status=204)


@api_view(["GET", "POST"])
def user_organization_list_create_view(request):
    if request.method == "GET":
        # Return a list of user organizations
        user_organizations = UserOrganization.objects.all()
        serializer = UserOrganizationSerializer(user_organizations, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        # Create a new user organization
        serializer = UserOrganizationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201, safe=False)
        return JsonResponse(serializer.errors, status=400)


@api_view(["GET", "PUT", "DELETE"])
def user_organization_retrieve_update_destroy_view(request, pk):
    try:
        user_organization = UserOrganization.objects.get(pk=pk)
    except UserOrganization.DoesNotExist:
        raise Http404

    if request.method == "GET":
        # Return a single user organization
        serializer = UserOrganizationSerializer(user_organization)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "PUT":
        # Update an existing user organization
        serializer = UserOrganizationSerializer(user_organization, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == "DELETE":
        # Delete an existing user organization
        user_organization.delete()
        return JsonResponse({"success": True}, status=204)
