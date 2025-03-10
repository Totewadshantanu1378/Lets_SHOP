from django.db import models

from django.contrib.auth.models import AbstractBaseUser ,BaseUserManager , PermissionsMixin
from django.utils import timezone

class CustomerUserManager(BaseUserManager):
    def create_user(self , email ,username , password = None):
        if not email:
            raise ValueError("Email is required")
        if not username:
            raise ValueError("Username is required")
        
        email = self.normalize_email(email)
        user  = self.model(email = email , username = username)
        user.set_password(password)
        # save the data of user in databse used in settings.py 
        user.save(using = self._db)
        return user
    
    def create_superuser(self , email , username , password):
        user = self.create_user(email,username , password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using = self._db)
        return user
    

class CustomUser(AbstractBaseUser , PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=100,unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    objects = CustomerUserManager()
    
    USERNAME_FIELD = 'email'
    # should type email in trhe place of username 
    REQUIRED_FIELDS = ['username']
    
    def __str__(self):
        return self.email
    

# creating the cart model 
class Cart(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=255)  # Store product name directly
    product_price = models.DecimalField(max_digits=10, decimal_places=2)  # Store product price directly
    quantity = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True )
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        """ Auto-calculate total price before saving """
        self.total_price = self.quantity * self.product_price
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username} - {self.product_name} ({self.quantity})"
