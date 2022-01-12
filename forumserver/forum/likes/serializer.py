from django.contrib.auth import models
from django.db.models import fields
from rest_framework import serializers
from .models import LikeCount, LikeRecord
class LikeCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeCount
        fields = '__all__'

class LikeRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeRecord
        fields = '__all__'