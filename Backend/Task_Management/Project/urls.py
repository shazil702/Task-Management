from django.urls import path
from . import views

urlpatterns = [
    path("register/", views.RegisterView.as_view()),
    path("token/", views.UserToken.as_view()),
]