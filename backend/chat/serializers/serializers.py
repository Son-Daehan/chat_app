from rest_framework import serializers
from ..models import (
    User,
    Organization,
    UserOrganization,
    OrganizationChannel,
    OrganizationChannelUser,
)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    profile_img = serializers.ImageField(use_url=True)

    class Meta:
        model = User
        fields = [
            "url",
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_active",
            "profile_img",
        ]


class OrganizationSerializer(serializers.HyperlinkedModelSerializer):
    members = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    class Meta:
        model = Organization
        fields = ["url", "id", "organization_name", "organization_owner", "members"]


class OrganizationChannelSerializer(serializers.HyperlinkedModelSerializer):
    members = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    class Meta:
        model = OrganizationChannel
        fields = ["url", "id", "channel_name", "is_private", "organization", "members"]


class UserOrganizationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserOrganization
        fields = ["url", "id", "organization", "user"]


class OrganizationChannelUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = OrganizationChannelUser
        fields = ["url", "id", "organization_channel", "user"]
