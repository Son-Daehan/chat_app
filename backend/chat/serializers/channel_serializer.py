from rest_framework import serializers
from ..models import Channel, UserChannel
from .user_serializer import UserSerializer

class ChannelSerializer(serializers.ModelSerializer):
    channel_owner = UserSerializer('user')

    class Meta:
        model = Channel
        fields = '__all__'


class UserOrganizationChannelSerializer(serializers.ModelSerializer):
    channel = ChannelSerializer('channel')
    user = UserSerializer('user')

    class Meta:
        model = UserChannel
        fields = '__all__'