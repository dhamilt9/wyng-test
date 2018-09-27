from rest_framework import serializers
from imageGallery.models import Image

class ImageSerializer(serializers.ModelSerializer):
	class Meta:
		model = Image
		fields = '__all__'