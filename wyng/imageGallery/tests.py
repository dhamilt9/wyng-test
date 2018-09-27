from django.test import TestCase
from .models import Image
from django.core.files import File
from django.core.files.uploadedfile import SimpleUploadedFile
import os
import random

class ImageModelTest(TestCase):
    def setUp(self):
        testimage=os.path.join(os.path.dirname(__file__), 'testimage/testimage.jpg')
        Image.objects.create(file=SimpleUploadedFile(name='test_image.jpg', content=open(testimage, 'rb').read(), content_type='image/jpeg'))
        Image.objects.create(file=SimpleUploadedFile(name='test_image.jpg', content=open(testimage, 'rb').read(), content_type='image/jpeg'))
        Image.objects.create(file=SimpleUploadedFile(name='test_image.jpg', content=open(testimage, 'rb').read(), content_type='image/jpeg'))
        Image.objects.create(file=SimpleUploadedFile(name='test_image.jpg', content=open(testimage, 'rb').read(), content_type='image/jpeg'))
        Image.objects.create(file=SimpleUploadedFile(name='test_image.jpg', content=open(testimage, 'rb').read(), content_type='image/jpeg'))
    
    def test_image(self):
        images=Image.objects.all()
        self.assertEqual(len(images), 5)
        for i in images:
            self.assertEqual(i.votes, 0)
            file=os.path.join('/home/ubuntu/wyng/wyng/media', i.file.name)
            self.assertEqual(os.path.isfile(file), True)
            votecount=random.randint(1,5)
            for j in range(votecount):
                i.vote()
            self.assertEqual(i.votes, votecount)
        for i in images:
            file=os.path.join('/home/ubuntu/wyng/wyng/media', i.file.name)
            i.delete()
            self.assertEqual(os.path.isfile(file), False)
            