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
    OrganizationMemberSerializer,
    OrganizationChannelMemberSerializer,
)
from .models import (
    User,
    Organization,
    OrganizationChannel,
    OrganizationMember,
    OrganizationChannelMember,
)
from django.http import Http404
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q


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


#######################################################################################
# USER SECTION
#######################################################################################


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
def users_manage(request):
    if request.method == "GET":
        # Return a list of users
        users = User.objects.all()
        users_serialized = UserSerializer(users, many=True)
        print(users_serialized.data)

        return JsonResponse({"data": users_serialized.data}, safe=False)

    elif request.method == "POST":
        # Create a new user
        try:
            data = request.data
            new_user = User.objects.create_user(**data)
            new_user.save()

            return JsonResponse({"success": True}, status=201, safe=False)

        except:
            return JsonResponse(data, status=400)


@api_view(["GET", "PUT", "DELETE"])
def user_manage(request, pk):
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


#######################################################################################
# USER'S ORGANIZATION SECTION
#######################################################################################


@api_view(["GET"])
def user_organizations_manage(request):
    user = User.objects.get(username=request.user)

    if request.method == "GET":
        organizations = Organization.objects.filter(members__id=user.id)
        organizations_serialized = OrganizationSerializer(organizations, many=True)

        return JsonResponse({"data": organizations_serialized.data})


#######################################################################################
# ORGANIZATION SECTION
#######################################################################################


@api_view(["GET", "POST"])
def organizations_manage(request):
    print("why?")
    if request.method == "GET":
        # Return a list of organization
        organizations = Organization.objects.all()
        serializer = OrganizationSerializer(organizations, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == "POST":
        # Create a new organization
        try:
            data = request.data
            user = User.objects.get(username=request.user)

            new_organization_info = {
                "organization_name": data["organization_name"],
                "owner": user,
            }

            new_organization = Organization.objects.create(**new_organization_info)

            new_organization.members.add(user)
            new_organization.save()

            new_organization_serialized = OrganizationSerializer(new_organization)

            # if new_organization_serialized.is_valid():
            return JsonResponse({"data": new_organization_serialized.data})
            # else:
            # return JsonResponse({"success": False}, status=404)

        except:
            return JsonResponse({"success": False}, status=404)
        # print(serialized_data)
        # if serialized_data.is_valid():
        #     # Save the organization
        #     organization = serialized_data.save()
        #     # Get the user that is making the request
        #     user = request.user
        #     # Create an organization owner with the user and organization
        #     organization_owner = OrganizationOwner.objects.create(
        #         user=user, organization=organization
        #     )
        #     return JsonResponse(serialized_data.data, status=201, safe=False)
        # return JsonResponse(serialized_data.errors, status=400)


@api_view(["GET", "PUT", "DELETE"])
def organization_manage(request, organization_id):
    print("working")
    if request.method == "GET":
        organization = Organization.objects.get(pk=organization_id)
        organization_serialized = OrganizationSerializer(organization)
        print(organization_serialized.data)
        return JsonResponse({"data": organization_serialized.data})

    # if request.method == "GET":
    #     # Return a single organization
    #     serializer = OrganizationSerializer(organization)
    #     return JsonResponse(serializer.data, safe=False)

    # elif request.method == "PUT":
    #     # Update an existing organization
    #     serializer = OrganizationSerializer(organization, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse(serializer.data, safe=False)
    #     return JsonResponse(serializer.errors, status=400)

    # elif request.method == "DELETE":
    #     # Delete an existing organization
    #     organization.delete()
    #     return JsonResponse({"success": True}, status=204)


#######################################################################################
# ORGANIZATION MEMBER SECTION
#######################################################################################


@api_view(["GET", "POST"])
def organization_members_manage(request, organization_id):
    organization = Organization.objects.get(pk=organization_id)
    if request.method == "GET":
        # Return a list of organization channels
        organization_members = OrganizationMember.objects.all()
        organization_members_serialized = OrganizationMemberSerializer(
            organization_members, many=True
        )
        return JsonResponse({"data": organization_members_serialized.data}, safe=False)

    if request.method == "POST":
        data = request.data
        user = User.objects.get(username=data["username"])

        new_organization_member_info = {"organization": organization, "user": user}
        new_organization_member = OrganizationMember(**new_organization_member_info)
        new_organization_member.save()

        return JsonResponse({"success": True})


@api_view(["GET", "POST", "PUT", "DELETE"])
def organization_member_manage(request, organization_id):

    organization = Organization.objects.get(pk=organization_id)

    if request.method == "GET":
        # Return a single organization channel
        organization_members = OrganizationMember.objects.filter(
            organization=organization
        )
        organization_members_serialized = OrganizationMemberSerializer(
            organization_members, many=True
        )
        return JsonResponse({"data": organization_members_serialized.data}, safe=False)

    if request.method == "POST":
        print("working")
        data = request.data
        user = User.objects.get(username=data["username"])

        new_organization_member_info = {"organization": organization, "user": user}
        new_organization_member = OrganizationMember(**new_organization_member_info)
        new_organization_member.save()

        organization.members.add(new_organization_member)
        organization.save()

        return JsonResponse({"success": True})

    # elif request.method == "PUT":
    #     # Update an existing organization channel
    #     serializer = OrganizationChannelSerializer(
    #         organization_channel, data=request.data
    #     )
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse(serializer.data, safe=False)
    #     return JsonResponse(serializer.errors, status=400)

    # elif request.method == "DELETE":
    #     # Delete an existing organization channel
    #     organization_channel.delete()
    #     return JsonResponse({"success": True}, status=204)


#######################################################################################
# ORGANIZATION CHANNEL  SECTION
#######################################################################################


@api_view(["GET", "POST"])
def organization_channels_manage(request, organization_id):
    data = request.data
    organization = Organization.objects.get(pk=organization_id)

    if request.method == "GET":
        # Return a list of organization channel users
        organization_channels = OrganizationChannel.objects.filter(
            organization=organization
        )
        organization_channels_serialized = OrganizationChannelSerializer(
            organization_channels, many=True
        )
        return JsonResponse({"data": organization_channels_serialized.data}, safe=False)

    elif request.method == "POST":
        try:
            user = User.objects.get(username=request.user)

            new_organization_channel_info = {
                "channel_name": data["channel_name"],
                "is_private": data["is_private"],
                "organization": organization,
                "owner": user,
            }

            new_organization_channel = OrganizationChannel.objects.create(
                **new_organization_channel_info
            )

            new_organization_channel.members.add(user)
            new_organization_channel.save()

            new_organization_channel_serialized = OrganizationChannelSerializer(
                new_organization_channel
            )

            return JsonResponse({"data": new_organization_channel_serialized.data})
        except:
            return JsonResponse({"success": False})


@api_view(["GET", "PUT", "DELETE"])
def organization_channel_manage(request, channel_id):

    # organization = Organization.objects.get(pk=organization_id)

    if request.method == "GET":
        # Return a single organization channel user
        organization_channel = OrganizationChannel.objects.filter(pk=channel_id)

        organization_channels_serialized = OrganizationChannelSerializer(
            organization_channel
        )

        return JsonResponse({"data": organization_channels_serialized.data}, safe=False)

    # elif request.method == "PUT":
    #     # Update an existing organization channel user
    #     serializer = OrganizationChannelUserSerializer(
    #         organization_channel_user, data=request.data
    #     )
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse(serializer.data, safe=False)
    #     return JsonResponse(serializer.errors, status=400)

    # elif request.method == "DELETE":
    #     # Delete an existing organization channel user
    #     organization_channel_user.delete()
    #     return JsonResponse({"success": True}, status=204)


#######################################################################################
# ORGANIZATION CHANNEL MEMBER SECTION
#######################################################################################


@api_view(["GET", "POST"])
def organization_channel_members_manage(request, channel_id):
    organization_channel = OrganizationChannel.objects.get(pk=channel_id)

    if request.method == "GET":
        organization_channel_members = OrganizationChannelMember.objects.filter(
            channel=organization_channel
        )

        organization_channel_members_serialized = OrganizationChannelMemberSerializer(
            organization_channel_members, many=True
        )
        return JsonResponse(
            {"data": organization_channel_members_serialized.data}, safe=False
        )

    if request.method == "POST":
        data = request.data
        print(data)
        user = User.objects.get(username=data["username"])
        print(organization_channel)
        new_organization_channel_member_info = {
            "channel": organization_channel,
            "user": user,
        }

        print(user)

        new_organization_channel_member = OrganizationChannelMember(
            **new_organization_channel_member_info
        )

        new_organization_channel_member.save()
        print(new_organization_channel_member)

        return JsonResponse({"success": True})

    # elif request.method == "POST":
    #     # Create a new user organization
    #     serializer = UserOrganizationSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse(serializer.data, status=201, safe=False)
    #     return JsonResponse(serializer.errors, status=400)


@api_view(["GET", "POST", "PUT", "DELETE"])
def organization_channel_member_manage(request, pk):

    organization_channel = OrganizationChannel.objects.get(pk=pk)

    pass
    # if request.method == "GET":
    #     # Return a single user organization
    #     serializer = UserOrganizationSerializer(user_organization)
    #     return JsonResponse(serializer.data, safe=False)

    # elif request.method == "PUT":
    #     # Update an existing user organization
    #     serializer = UserOrganizationSerializer(user_organization, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse(serializer.data, safe=False)
    #     return JsonResponse(serializer.errors, status=400)

    # elif request.method == "DELETE":
    #     # Delete an existing user organization
    #     user_organization.delete()
    #     return JsonResponse({"success": True}, status=204)
