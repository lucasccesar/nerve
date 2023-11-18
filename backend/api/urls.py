from django.urls import path, include
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/task/', views.TaskView.as_view(), name="task"),
    path('api/signup/', views.Signup.as_view(), name="signup"),
    path('api/login/', views.Login.as_view(), name="login"),
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
