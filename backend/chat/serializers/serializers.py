from rest_framework import serializers
from ..models import (
    User,
    Organization,
    UserOrganization,
    OrganizationChannel,
    OrganizationChannelUser,
)


class UserSerializer(serializers.ModelSerializer):
    profile_img = serializers.ImageField(use_url=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_active",
            "profile_img",
        ]


class OrganizationSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=User.objects.all(),
    )

    class Meta:
        model = Organization
        fields = ["id", "organization_name", "owner", "members"]


class OrganizationOwnerSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Organization
        fields = ["id", "user"]


class OrganizationChannelSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    class Meta:
        model = OrganizationChannel
        fields = ["id", "channel_name", "is_private", "organization", "members"]


class UserOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOrganization
        fields = ["id", "organization", "user"]


class OrganizationChannelUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationChannelUser
        fields = ["id", "organization_channel", "user"]
