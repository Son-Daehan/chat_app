from rest_framework import serializers
from ..models import User


class UserSerializer(serializers.ModelSerializer):
    organizations = serializers.StringRelatedField(many=True)

    class Meta:
        model = User
        fields = ["email", "first_name", "organizations"]
