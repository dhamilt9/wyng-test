# Wyng Coding Test

## An app that allows a client to upload five images to a gallery and users to vote on images.

Hosted at at 54.173.137.49  
54.173.137.49/client  

## REQUIREMENTS

Python 3.5.2  
Pipenv (Python virtual environment)  
Node.js/npm  

## PACKAGES USED

Python:  
* django  
* django-rest-framework  
* pillow  
Node:  
* babel  
* webpack  
* react  
* react-cookie  
* react-router-dom  

## SETUP

```
pipenv install
npm install
```

## RUN DEV SERVER
```
pipenv shell
python wyng/wyng/manage.py migrate
npm run dev
python wyng/wyng/manage.py runserver
```

## USAGE

Upload images at /client
View and vote on images at the root

## TESTING

```
python manage.py test imageGallery
```
