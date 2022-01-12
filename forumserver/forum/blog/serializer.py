from django.contrib.auth import models
from django.db.models import fields
from rest_framework import serializers
from .models import Blog, BlogType
class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'

class BlogTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogType
        fields = '__all__'