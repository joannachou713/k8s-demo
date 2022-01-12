from django.http.response import JsonResponse
from rest_framework import permissions, serializers, status, viewsets
from rest_framework.generics import CreateAPIView
from django.contrib import auth
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.views import APIView # If used custom user model
from rest_framework import status
from rest_framework.decorators import action, api_view
from .serializer import UserSerializer
from .forms import LoginForm
from blog.models import Blog
from blog.serializer import BlogSerializer
from django.http.request import HttpRequest

from user import serializer

class UserViewSet(viewsets.ModelViewSet):
    """
    允許用戶查看或編輯的API路徑。
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    """
    回傳用戶的資料與發過的文章列表
    """
    #/api/users/{pk}/user_info/
    @action(detail=True, methods=['get'])
    def user_info(self, request, pk=None):
        user = User.objects.get(id=pk)
        blog_list = Blog.objects.filter(author=user)
        serializer1 = UserSerializer(user, context={'request': request})
        serializer2 = BlogSerializer(blog_list, many=True)
        Serializer_list = [serializer1.data, serializer2.data]
        return Response(Serializer_list, status=status.HTTP_200_OK)


class CreateUserView(CreateAPIView):

    model = get_user_model()
    permission_classes = [
        permissions.AllowAny # Or anon users can't register
    ]
    serializer_class = UserSerializer

@api_view(['POST'])
def login(request):
    data = {}
    if request.method == "POST":
        login_form = LoginForm(request.POST)
        if login_form.is_valid():
            user = login_form.cleaned_data['user']
            auth.login(request, user)
            data['status'] = status.HTTP_200_OK
            return JsonResponse(data)
    else:
        login_form = LoginForm()
    data['status'] = status.HTTP_400_BAD_REQUEST 
    return JsonResponse(data)

@api_view(['GET'])
def logout(request):
    auth.logout(request)
    return JsonResponse({'status': status.HTTP_200_OK})