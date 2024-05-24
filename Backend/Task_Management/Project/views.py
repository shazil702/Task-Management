from rest_framework import generics,status
from .models import *
from rest_framework.permissions import AllowAny
from .serializer import *
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.views import TokenObtainPairView

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    
    def post(self, request, *args, **kwargs):
        print(request.data)
        email = request.data['email']
        if User.objects.filter(email=email).exists():
            return Response('Email already exists ', status=status.HTTP_400_BAD_REQUEST)
        try:
            response = super().post(request, *args, **kwargs)
            return response
        except ValidationError as error:
            return Response(error.detail, status=status.HTTP_400_BAD_REQUEST)
class UserToken(TokenObtainPairView):
    serializer_class = UserToken

    def post(self, request, *args, **kwargs):
        data = request.data
        print("Data from Login ",data)
        response = super().post(request,*args,**kwargs)
        if response.status_code == status.HTTP_200_OK:
            if 'access' in response.data:
                return response
            else:
                message = "Invalid Credentials. Please cheeck mail and password"
                return Response(message,status=status.HTTP_400_BAD_REQUEST)
        return response
    def get_serializer_context(self):
        return super().get_serializer_context()