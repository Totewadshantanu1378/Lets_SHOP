from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser,Cart

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id' , 'email' , 'username' ,'date_joined']
        
        
# register serializers
class RegisterSerializer(serializers.ModelSerializer):
    # this will make api to only write password not to send the password
    
    password = serializers.CharField(write_only = True)
    
    class Meta : 
        model = CustomUser
        fields = ['email' ,'username', 'password']
        
    def create(self , validated_data):
        user = CustomUser.objects.create_user(
            email = validated_data['email'],
            username = validated_data['username'],
            password = validated_data['password'],
        )
        return user
    
    
# login serializers 
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only = True)
    
    def validate(self , data):
        user = authenticate(email = data['email'] , password = data['password'])
        if not user :
            raise serializers.ValidationError("invalid creddentials")
        return{
            'user' : UserSerializer(user).data
        }
    


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'  # Includes all fields from Cart model
        read_only_fields = ['total_price', 'user']  # Prevent user from modifying these fields

    def create(self, validated_data):
        """ Ensure total_price is updated correctly when creating a new cart item """
        validated_data['total_price'] = validated_data['quantity'] * validated_data['product_price']
        return super().create(validated_data)
