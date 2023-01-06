from rest_framework import serializers
from ..models import User


class UserSerializer(serializers.ModelSerializer):
    organizations = serializers.StringRelatedField(many=True)

    class Meta:
        model = User
        fields = ["email", "first_name", "organizations"]

    def create(self, data):
        new_user = User.objects.create(**data)

        return new_user
