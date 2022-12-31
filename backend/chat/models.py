from django.db import models
from django.contrib.auth.models import (AbstractUser)



class User(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)

    # notice the absence of a "Password field", that is built in.

    # django uses the 'username' to identify users by default, but many modern applications use 'email' instead
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] # Email & Password are required by default.

class Channel(models.Model):
    channel_name = models.CharField(max_length=100)
    channel_owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='channels')
    user = models.ManyToManyField(User, through='UserChannel')

class UserChannel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_channels')
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE, related_name='user_channels')

class Organization(models.Model):
    organization_name = models.CharField(max_length=100)
    organization_owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='organizations')

class UserOrganization(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='user_organizations')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_organizations')

class OrganizationChannel(models.Model):
    channel_name = models.CharField(max_length=100)
    is_private = models.BooleanField(default=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='organization_channels')