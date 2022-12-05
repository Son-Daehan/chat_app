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