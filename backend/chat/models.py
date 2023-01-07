from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class MyUserManager(BaseUserManager):
    def create_user(self, email, username, first_name, last_name, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    # def create_superuser(self, email, date_of_birth, password=None):
    #     """
    #     Creates and saves a superuser with the given email, date of
    #     birth and password.
    #     """
    #     user = self.create_user(
    #         email,
    #         password=password,
    #     )
    #     user.is_admin = True
    #     user.save(using=self._db)
    #     return user


class User(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)
    profile_img = models.ImageField(upload_to="images/", blank=True, null=True)

    objects = MyUserManager()

    # notice the absence of a "Password field", that is built in.
    USERNAME_FIELD = "username"
    # django uses the 'username' to identify users by default, but many modern applications use 'email' instead
    REQUIRED_FIELDS = []  # Email & Password are required by default.


class Channel(models.Model):
    channel_name = models.CharField(max_length=100)
    channel_owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="channels"
    )
    user = models.ManyToManyField(User, through="UserChannel")


class UserChannel(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_channels"
    )
    channel = models.ForeignKey(
        Channel, on_delete=models.CASCADE, related_name="user_channels"
    )


class Organization(models.Model):
    organization_name = models.CharField(max_length=100)
    organization_owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="organizations"
    )


class UserOrganization(models.Model):
    organization = models.ForeignKey(
        Organization, on_delete=models.CASCADE, related_name="user_organizations"
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_organizations"
    )


class OrganizationChannel(models.Model):
    channel_name = models.CharField(max_length=100)
    is_private = models.BooleanField(default=False)
    organization = models.ForeignKey(
        Organization, on_delete=models.CASCADE, related_name="organization_channels"
    )


class OrganizationChannelUser(models.Model):
    organization_channel = models.ForeignKey(
        OrganizationChannel,
        on_delete=models.CASCADE,
        related_name="organization_channel_users",
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="organization_channel_users"
    )
