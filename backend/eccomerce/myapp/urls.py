from django.urls import path
from .views import login_user , register_user , profile_user, get_cart ,add_to_cart,remove_from_cart , update_to_cart

urlpatterns = [
    path("register/" , register_user),
    path("login/" , login_user),
    path("profile/" , profile_user),
    path('cart/' , get_cart),
    path('cart/add/' , add_to_cart),
    path('cart/remove/' , remove_from_cart),
    path('cart/update/' , update_to_cart),
]
