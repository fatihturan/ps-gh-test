# djPine/storages.py
from storages.backends.s3boto3 import S3Boto3Storage
import os

class StaticStorage(S3Boto3Storage):
    bucket_name = os.environ.get('AWS_DJANGO_STATIC_BUCKET')