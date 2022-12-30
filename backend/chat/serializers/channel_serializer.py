from rest_framework import serializers
from ..models import Channel
from .user_serializer import UserSerializer

class ChannelSerializer(serializers.ModelSerializer):
    user = UserSerializer('user')

    class Meta:
        model = Channel
        fields = '__all__'