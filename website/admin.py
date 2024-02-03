from django.contrib import admin

# Register your models here.
from django.utils.html import format_html

from .models import *
from django import forms


class PhotoInline(admin.TabularInline):
    model = Photo
    extra = 3


class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'cat', 'get_subcat_display', 'get_first_photo')
    search_fields = ('title', 'documentation')
    list_filter = ('cat', 'subcat')

    inlines = [ PhotoInline]

    def get_subcat_display(self, obj):
        return ', '.join([subcat.title for subcat in obj.subcat.all()])

    get_subcat_display.short_description = 'Подкатегории'

    def get_first_photo(self, obj):
        first_photo = obj.images.first()
        if first_photo:
            return format_html('<img src="{}" width="50" height="50" />', first_photo.images.url)
        return '-'

    get_first_photo.short_description = 'First Photo'
    get_first_photo.allow_tags = True

    # list_display = ('title', 'cat', 'description', 'get_first_photo')
    # inlines = [PhotoInline]
    #
    #
    # search_fields = ('title', 'documentation')
    # list_filter = ('cat', 'subcat')

    # def get_first_photo(self, obj):
    #     if obj.images:
    #         try:
    #             return mark_safe(f"<img src='{obj.images.all()[0].images.url}' width='50'>")
    #         except:
    #             return '-'
    #     else:
    #         return '-'
    #
    # get_first_photo.short_description = 'Миниатюра'
    # def get_first_photo(self, obj):
    #     first_photo = obj.photos.first()
    #     return '<img src="{}" width="50" height="50" />'.format(first_photo.images.url) if first_photo else '-'
    #
    # get_first_photo.short_description = 'First Photo'
    # get_first_photo.allow_tags = True

    class Media:
        js = ('website/js/jquery-3.7.1.min.js','website/js/product_admin.js',)


class CatAdmin(admin.ModelAdmin):
    list_display = ['title', 'display_subcat']

    def display_subcat(self, obj):
        return ", ".join([subcat.title for subcat in obj.subcat.all()])

    display_subcat.short_description = 'Subcategories'


class SubcatAdmin(admin.ModelAdmin):
    list_display = ('title',)

class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'tick',)
    list_editable = ('tick',)
    list_filter = ('name', 'tick',)
    list_display_links = ('name',)

admin.site.register(Contact, ContactAdmin)

admin.site.register(Product, ProductAdmin)
admin.site.register(Subcat, SubcatAdmin)
admin.site.register(Cat, CatAdmin)
