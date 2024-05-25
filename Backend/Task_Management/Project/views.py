from rest_framework import generics,status
from .models import *
from rest_framework.permissions import AllowAny
from .serializer import *
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

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

@api_view(['POST','GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def handle_project(request,id=None):
    if request.method == 'POST':
        try:
            project_data = request.data['project']
            todos_data = request.data['todos']
            print(request.user)
            project_serializer = ProjectSerializer(data=project_data, context={'request': request})
            if project_serializer.is_valid():
                project_instance = project_serializer.save()
            errors = []
            for todo in todos_data:
                todo['project'] = project_instance.id
                todo_serializer = ToDoSerializer(data=todo)
                if not todo_serializer.is_valid():
                        errors.append(todo_serializer.errors)
                else:
                        todo_serializer.save()
                if errors:
                    return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'message': 'Project and ToDo created Successfully.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method == 'GET':
        if id is not None:
            project_data = Project.objects.get(id=id)
            project_serializer = ProjectSerializer(project_data)
            todos_data = ToDo.objects.filter(project=project_data)
            todo_serializer = ToDoSerializer(todos_data, many=True)
            return Response({"project data":project_serializer.data, "Todo data":todo_serializer.data},status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        try:
            if id is not None:
                project_instance = Project.objects.get(id=id)
                project_data = request.data['project']
                todos_data = request.data['todos']
                project_serializer = ProjectSerializer(project_instance, data=project_data, partial=True, context={'request': request})
                if project_serializer.is_valid():
                    project_serializer.save()
                errors = []
                for todo in todos_data:
                    if todo.get('id'):
                        todo_instance = ToDo.objects.get(id=todo['id'], project=project_instance)
                        todo_serializer = ToDoSerializer(todo_instance, data=todo, partial=True)
                    else:
                        todo['project'] = project_instance.id
                        todo_serializer = ToDoSerializer(data=todo)
                    if not todo_serializer.is_valid():
                        errors.append(todo_serializer.errors)
                    else:
                        todo_serializer.save()
            if errors:
                return Response({'errors': errors}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'message': 'Project and ToDo updated Successfully.'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        try:
            todo_id = id
            todo_instance = ToDo.objects.get(id=todo_id)
            todo_instance.delete()
            return Response({'message': 'ToDo deleted successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])     
def user_projects(request):
    user = request.user
    projects = Project.objects.filter(user=user)
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)