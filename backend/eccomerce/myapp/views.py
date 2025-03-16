from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from .serializers import RegisterSerializer,LoginSerializer,CartSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser,Cart
from rest_framework.decorators import api_view ,permission_classes
from rest_framework.permissions import IsAuthenticated
from django.core.cache import cache  
#cache is used to implement redis 
# api_view provides easier way to handle api 

@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data = request.data)
    print("recieved data" , request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data , status= status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    serializer = LoginSerializer(data = request.data)
    if serializer.is_valid():
        user_data = serializer.validated_data['user']
        user = CustomUser.objects.get(email = user_data['email'])
        
        # // getting refresh token from rest_jwt
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user' : user_data,
            'access': str(refresh.access_token),
            'refresh' : str(refresh),
        })
        
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# django allows frontend the get request , that the profile can be fetched by react js
@api_view(['GET'])
def profile_user(request):
    # providing permission class to profileuser 
    permission_classes = [IsAuthenticated]
    
    user = request.user
    return Response({"id" : user.id , 'email' : user.email ,"username" : user.username})

    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    user_id = request.user.id 
    # unique key for caching
    # cache_key = f"cart : {user_id}"
    # cached_cart = cache.get(cache_key)
    # if cached_cart : 
    #     print("cache hit : fetching from the cache...")
    #     return Response(cached_cart)
    
    # print("cache miss : fetching from the mysql database...")
    cart_items = Cart.objects.filter(user=request.user)
    serializer = CartSerializer(cart_items, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    try :       
       print("Received request data:", request.data)
       # 🔹 Debugging
       user = request.user
       product_title = request.data.get('product_title')
       product_price = request.data.get('product_price')
       quantity = request.data.get('quantity', 1)

       if not product_title or not product_price:    
           return Response({'error': 'Product name and price are required'}, status=400)
    
       try:
           product_price = float(product_price)
       except ValueError: 
           return Response({'error' : 'invalid product id'} , status= 400)
    
       quantity = max(1 , (int)(quantity))     
       cart_item, created = Cart.objects.get_or_create(
           user=user,
           product_name=product_title,
           product_price=product_price,
           defaults={'quantity': quantity}
       )

       if not created:
           cart_item.quantity += quantity  # Increase quantity if item exists
           cart_item.save()
       
    #    clear cache to get the new fresh entries
    #    cache.delete(f"cart : {user.id}")
       return Response(CartSerializer(cart_item).data)
    except Exception as e:
        print("Error adding to cart:", str(e))  # 🔹 Debugging
        return Response({'error': str(e)}, status=500)
        
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_to_cart(request):
    product_name = request.data.get('product_name')
    new_quantity = request.data.get('quantity')

    try:
        cart_item = Cart.objects.get(product_name = product_name, user=request.user)
        cart_item.quantity = new_quantity
        cart_item.save()
        
        # cache.delete(f"cart : {request.user.id}")
        return Response(CartSerializer(cart_item).data)
        
    except Cart.DoesNotExist:
        return Response({'error': 'Item not found'}, status=404)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    product_name = request.data.get('name')

    try:
        cart_item = Cart.objects.get(product_name = product_name, user=request.user)
        cart_item.delete()
        # cache.delete(f"cart:{request.user.id}")
        return Response({'message': 'Item removed successfully'})
    except Cart.DoesNotExist:
        return Response({'error': 'Item not found'}, status=404)
