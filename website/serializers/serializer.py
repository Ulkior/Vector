from rest_framework import serializers

from website.models import *


class CatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cat
        fields = '__all__'


class SubcatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcat
        fields = '__all__'


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ('id', 'images', 'product')


class ProductSerializer(serializers.ModelSerializer):
    images = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = '__all__'
