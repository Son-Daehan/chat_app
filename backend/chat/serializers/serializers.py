from rest_framework import serializers
from ..models import (
    User,
    Organization,
    OrganizationChannel,
    OrganizationMember,
    OrganizationChannelMember,
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


class OrganizationMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = OrganizationMember
        fields = ["id", "user"]


class OrganizationChannelMemberSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = OrganizationChannelMember
        fields = ["id", "channel", "user"]


class OrganizationSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    members = UserSerializer(many=True, read_only=True)
    channels = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True, source="channels.all"
    )

    class Meta:
        model = Organization
        fields = ["id", "organization_name", "owner", "members", "channels"]


class OrganizationChannelSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer(read_only=True)
    owner = UserSerializer(read_only=True)
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = OrganizationChannel
        fields = ["id", "channel_name", "organization", "owner", "members"]
