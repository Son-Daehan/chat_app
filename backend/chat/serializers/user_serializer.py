from rest_framework import serializers
from ..models import User


class UserSerializer(serializers.ModelSerializer):
    organizations = serializers.StringRelatedField(many=True)
    profile_img = serializers.ImageField(
        max_length=None,
        allow_empty_file=False,
        allow_null=False,
        use_url=True,
        required=False,
    )

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
            "username",
            "profile_img",
            "organizations",
        ]
