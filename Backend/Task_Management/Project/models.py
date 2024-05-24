from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    username = models.CharField(max_length=50)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return self.name
class ToDo(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE, related_name="project")
    name = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)
    date = models.DateTimeField()
