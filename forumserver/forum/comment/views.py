from .models import Comment
from .serializer import CommentSerializer
from rest_framework import serializers, viewsets, status
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from blog.models import Blog
# Create your views here.

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    ordering_fields = ('comment_time')

    def get_permissions(self):
        if self.action in ('create',):
            self.permission_classes = [IsAuthenticated]
        return [permission() for permission in self.permission_classes]
    #/api/comment/ (POST)
    def create(self, request, *args, **kwargs):
        blog = Blog.objects.get(id=request.data['blog_id'])
        text = request.data['text']
        user = request.user
        comment = Comment.objects.create(blog=blog, text=text, user=user)
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    #/api/comment/{pk}/comment/
    @action(detail=True, methods=['get'])
    def comment(self, request, pk=None):
        blog = Blog.objects.get(id=pk)
        comments = Comment.objects.filter(blog=blog)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)