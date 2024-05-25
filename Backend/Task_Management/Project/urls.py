from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.RegisterView.as_view()),
    path("token/", views.UserToken.as_view()),
    path("handleProject/<int:id>/", views.handle_project),
    path("handleProject/", views.handle_project),
    path("getProjects/",views.user_projects),
]