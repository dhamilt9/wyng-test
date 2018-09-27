from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import ParseError
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status, generics
from imageGallery.serializers import ImageSerializer
from imageGallery.models import Image
import os
import imghdr


#Returns a json list of all image objects
class ImageList(generics.ListAPIView):
    queryset=Image.objects.all().order_by('-votes')
    serializer_class=ImageSerializer

#Allows upload of exactly 5 images
class ImageUploadView(APIView):
    parser_classes = (MultiPartParser,)
    def post(self, request):
        images=0
        for f in request.FILES.getlist('file'):
            if imghdr.what(f)!=None:
                images=images+1
        if images==5:
            #Deletes existing files in the filesystem
            if len(Image.objects.all())==5:
                for i in Image.objects.all():
                    i.delete()
            for f in request.FILES.getlist('file'):
                serializerinput={"file": f}
                image_serializer = ImageSerializer(data=serializerinput)
                if image_serializer.is_valid():
                    image_serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
#Increments the vote count of the image object with kwark pk by one
class VoteView(APIView):
    def post(self, request, **kwargs):
        image=Image.objects.get(pk=self.kwargs['pk'])
        image.vote()
        image.save()
        return Response(status=status.HTTP_200_OK)