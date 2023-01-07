from rest_framework import serializers
from ..models import (
    UserOrganization,
    Organization,
    OrganizationChannel,
    OrganizationChannelUser,
)
from .user_serializer import UserSerializer


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = "__all__"

    # def create(self, data):
    #     new_organization = Organization.objects.create(**data)

    #     return new_organization


class UserOrganizationSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer("organization")
    user = UserSerializer("user")

    class Meta:
        model = UserOrganization
        fields = "__all__"


class OrganizationChannelSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer("organization")

    class Meta:
        model = OrganizationChannel
        fields = "__all__"


class OrganizationChannelUserSerializer(serializers.ModelSerializer):
    user = UserSerializer("user")

    class Meta:
        model = OrganizationChannelUser
        fields = ["user"]
