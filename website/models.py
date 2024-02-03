from django.db import models


class Subcat(models.Model):
    title = models.CharField(max_length=255, verbose_name='Класс категории')

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Подкатегория'
        verbose_name_plural = 'Подкатегории'


class Cat(models.Model):
    title = models.CharField(max_length=255, verbose_name='Категория')
    subcat = models.ManyToManyField(Subcat, verbose_name='Subcat', blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class Product(models.Model):
    title = models.CharField(max_length=255)
    cat = models.ForeignKey(Cat, on_delete=models.CASCADE)
    subcat = models.ManyToManyField(Subcat, verbose_name='Подкатегория', blank=True)
    documentation = models.CharField(max_length=255, verbose_name='Ссылка документа', default='', blank=True)
    description = models.TextField(default='Default description')

    def __str__(self):

        return self.title

    def get_first_photo(self):
        if self.images:
            try:
                return self.images.all()[0].images.url
            except:
                return '-'
        else:
            return '-'

    class Meta:
        verbose_name = 'Продукт'
        verbose_name_plural = 'Продукты'


class Photo(models.Model):
    images = models.ImageField(upload_to='products/')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name='Продукты', related_name='images')

    class Meta:
        verbose_name = 'Фотография'
        verbose_name_plural = 'Фотографии'


class Contact(models.Model):
    name = models.CharField(max_length=100, verbose_name='ФИО')
    email = models.EmailField()
    phone = models.CharField(max_length=16, verbose_name='номер телефона')
    message = models.TextField(verbose_name='Сообшение')
    tick = models.BooleanField(default=False, verbose_name='Ответили клиенту: ')

