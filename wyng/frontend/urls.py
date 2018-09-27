from django.urls import path
from . import views
urlpatterns = [
    path('client/', views.index ),
    path('user/', views.index ),
    path('', views.index ),
]