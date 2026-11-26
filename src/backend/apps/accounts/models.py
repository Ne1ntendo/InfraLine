from django.contrib.auth.models import AbstractUser
from django.db import models

class UserRole(models.TextChoices):
    REQUESTER = 'REQUESTER', 'Requester'
    TECHNICIAN = 'TECHNICIAN', 'Technician'
    ADMINISTRATOR = 'ADMINISTRATOR', 'Administrator'


class AccountStatus(models.TextChoices):
    ACTIVE = 'ACTIVE', 'Active'
    INACTIVE = 'INACTIVE', 'Inactive'
    SUSPENDED = 'SUSPENDED', 'Suspended'

# Create your models here.
class User(AbstractUser):
    # Id, first_name, last_name, username and password are predefined 
    email = models.EmailField(unique=True)
    status = models.CharField(
        max_length=20,
        choices=AccountStatus.choices,
        default=AccountStatus.INACTIVE
    )
    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.REQUESTER
    )

    def __str__(self):
        return f"{self.username}: {self.role}"