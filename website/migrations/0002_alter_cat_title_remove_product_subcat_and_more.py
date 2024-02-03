# Generated by Django 4.2.6 on 2023-11-19 06:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cat',
            name='title',
            field=models.CharField(max_length=255, verbose_name='Категория'),
        ),
        migrations.RemoveField(
            model_name='product',
            name='subcat',
        ),
        migrations.AlterField(
            model_name='subcat',
            name='title',
            field=models.CharField(max_length=255, verbose_name='Класс категории'),
        ),
        migrations.AddField(
            model_name='product',
            name='subcat',
            field=models.ManyToManyField(blank=True, null=True, to='website.subcat', verbose_name='Subcat'),
        ),
    ]