from django.urls import include, path
from . import views
urlpatterns = [
    path('image', views.ImageList.as_view() ),
    path('vote/<int:pk>', views.VoteView.as_view() ),
    path('imageupload', views.ImageUploadView.as_view() ),
    path('', include('frontend.urls')),
]