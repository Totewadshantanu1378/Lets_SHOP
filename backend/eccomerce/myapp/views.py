from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from .serializers import RegisterSerializer,LoginSerializer,CartSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser,Cart
from rest_framework.decorators import api_view ,permission_classes
from rest_framework.permissions import IsAuthenticated

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
    cart_items = Cart.objects.filter(user=request.user)
    serializer = CartSerializer(cart_items, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_name = request.data.get('product_name')
    product_price = request.data.get('product_price')
    quantity = request.data.get('quantity', 1)

    if not product_name or not product_price:
        return Response({'error': 'Product name and price are required'}, status=400)

    cart_item, created = Cart.objects.get_or_create(
        user=request.user,
        product_name=product_name,
        product_price=product_price,
        defaults={'quantity': quantity}
    )

    if not created:
        cart_item.quantity += quantity  # Increase quantity if item exists
        cart_item.save()

    return Response(CartSerializer(cart_item).data)

    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_to_cart(request):
    product_id = request.data.get('id')
    new_quantity = request.data.get('quantity')

    try:
        cart_item = Cart.objects.get(id=product_id, user=request.user)
        cart_item.quantity = new_quantity
        cart_item.save()
        return Response(CartSerializer(cart_item).data)
    except Cart.DoesNotExist:
        return Response({'error': 'Item not found'}, status=404)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    product_id = request.data.get('id')

    try:
        cart_item = Cart.objects.get(id=product_id, user=request.user)
        cart_item.delete()
        return Response({'message': 'Item removed successfully'})
    except Cart.DoesNotExist:
        return Response({'error': 'Item not found'}, status=404)
