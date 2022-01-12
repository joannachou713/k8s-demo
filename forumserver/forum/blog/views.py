from django.db.models.query_utils import select_related_descend
from django.shortcuts import render
from django.core.paginator import Paginator
from django.conf import settings
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from comment.models import Comment
from comment.serializer import CommentSerializer
from .models import Blog, BlogType
from .serializer import BlogSerializer, BlogTypeSerializer
from rest_framework import serializers, viewsets, status

from blog import serializer

# Create your views here.
#/api/blog/
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def get_permissions(self):
        if self.action in ('create','delete',):
            self.permission_classes = [IsAuthenticated]
        return [permission() for permission in self.permission_classes]
    #/api/blog/ (POST)
    def create(self, request, **kwargs):
        title = request.data.get('title')
        content = request.data.get('content')
        blog_type = BlogType.objects.get(id=request.data.get('blog_type'))
        author = request.user
        blog = Blog.objects.create(title=title, content=content, blog_type=blog_type, author=author)
        serializer = BlogSerializer(blog)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    #/api/blog/{pk}/comment/
    @action(detail=True, methods=['get'])
    def comment(self, request, pk=None):
        blog = Blog.objects.get(id=pk)
        comments = Comment.objects.filter(blog=blog)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

#/api/blogtype/
class BlogTypeViewSet(viewsets.ModelViewSet):
    queryset = BlogType.objects.all()
    serializer_class = BlogTypeSerializer

    #/api/blogtype/{pk}/blog
    @action(detail=True, methods=['get'])
    def blog(self, request, pk=None):
        blogs = Blog.objects.filter(blog_type=pk)
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

