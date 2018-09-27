from django.db import models

class Image(models.Model):
    file=models.ImageField()
    votes=models.PositiveIntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    #Allows the delete method to also delete the file in the filesystem
    def delete(self, *args, **kwargs):
        storage, path = self.file.storage, self.file.path
        super(Image, self).delete(*args, **kwargs)
        storage.delete(path)
    
    #Increments the vote by one
    def vote(self):
        self.votes=self.votes+1

# Create your models here.
