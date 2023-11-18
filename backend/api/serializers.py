from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'task_content', 'state', 'worklist']

class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50, read_only=True)
    
    class Meta:
        model = User
        fields = ['name', 'username', 'email']
        read_only_fields = ['name']