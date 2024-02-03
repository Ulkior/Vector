from django.shortcuts import render, get_object_or_404, redirect
from rest_framework import generics, viewsets
from django.views import View
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Q
from .models import *
from django.http import JsonResponse
from .serializers.serializer import *
from .forms import *


nav = [
    {
        'title': 'Главная',
        'link': '/'
    },
    {
        'title': 'Наши продукты',
        'link': '/product_decision/'
    },
    {
        'title': 'Свяжитесь с нами',
        'link': '/contact/'
    }
]


def get_subcategories(request):
    cat_id = request.GET.get('cat')

    if cat_id:
        try:
            cat_id = int(cat_id)
        except ValueError:
            return JsonResponse({'error': 'Invalid cat_id provided'}, status=400)

        cat = get_object_or_404(Cat, id=cat_id)
        subcategories = cat.subcat.all()
        data = [{'id': subcat.id, 'title': subcat.title} for subcat in subcategories]
    else:
        data = []

    return JsonResponse(data, safe=False)


def index(request):
    context = {
        'nav': nav,
        'active': 'Главная'
    }
    return render(request, 'website/index.html',context)


def product_decision(request):
    context = {
        'nav': nav,
        'active': 'Наши продукты'
    }
    return render(request, 'website/product_decision.html',context)


def gmt_product_catalog(request):
    context = {
        'nav': nav,
    }
    return render(request, 'website/product_catalog.html', context)


class CatList(viewsets.ReadOnlyModelViewSet):
    queryset = Cat.objects.all()
    serializer_class = CatSerializer


class SubcatList(viewsets.ReadOnlyModelViewSet):
    queryset = Subcat.objects.all()
    serializer_class = SubcatSerializer


class ProductList(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class PhotoList(viewsets.ReadOnlyModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer


class PhotoAPIView(APIView):
    def get(self, request, *args, **kwargs):
        product_id = request.query_params.get('product')
        if product_id is not None:
            photos = Photo.objects.filter(product=product_id)
            serializer = PhotoSerializer(photos, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "Missing 'product' parameter"}, status=400)


class ProductRetrieveView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'id'


def search_results(request):
    word = request.GET.get('q')
    products = Product.objects.filter(
        Q(title__iregex=word)
    )
    context = {
        'title': 'Результаты поиска',
        'products': products,
        'no_products': False,
    }
    if len(context['products']) == 0:
        context['no_products'] = True

    return render(request, 'website/search_page.html', context)


def contact(request):
    context = {
        'nav': nav,
        'active': 'Свяжитесь с нами'
    }
    return render(request, 'website/contact.html',context)





def connecting_form(request):
    print("Hello there1")
    if request.method == 'POST':
        print("Hello there2")
        form = ContactForm(data=request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')

        else:
            print(f"error here \n {request}")
    else:
        form = ContactForm()

    return render(request, 'website/contact.html', {'form': form})




def cumark(request):
    print(request)
    products = Product.objects.filter(cat='18')
    # print(products, products.id)
    context = {
        'products': products,
        'nav': nav
    }

    return render(request, 'website/cumark.html', context)
