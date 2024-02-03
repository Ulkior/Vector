from django.urls import path
from .views import *

urlpatterns = [
    path('get_subcategories/', get_subcategories, name='get_subcategories'),
    path('', index, name='index'),
    path('product_decision/', product_decision, name='product_decision'),
    path('product_catalog/', gmt_product_catalog, name='gmt_product_catalog'),
    path('api/products/', ProductList.as_view({'get': 'list'}), name='products'),
    path('api/cats/', CatList.as_view({'get': 'list'}), name='cats'),
    path('api/subcats/', SubcatList.as_view({'get': 'list'}), name='subcats'),
    path('api/photo/', PhotoAPIView.as_view(), name='photo_api'),
    path('products/<int:id>/', ProductRetrieveView.as_view(), name='product-retrieve'),
    path('search_page/', search_results, name='search_results'),
    path('contact/', contact, name='contact'),
    path('cumark/', cumark, name='cumark_page'),
    path('contact_form/', connecting_form, name='form'),

]