import React, { Children, createContext, useEffect, useState } from 'react'
import { CartContext } from './CartContext';


const CartProvider = ({children}) => {
    const [cart , setcart] = useState([]);

    // loads cart from the localStorage on first render 
    useEffect(() => {
      try {
          const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
          setcart(savedCart);
      } catch (error) {
          console.error("Error loading cart from localStorage:", error);
          setcart([]); // Set an empty cart in case of an error
      }
  }, []);
  

//    save cart to localStorage whenever it updates 
   useEffect(() => {
     localStorage.setItem("cart" , JSON.stringify(cart));
   }, [cart])
//    it has dependency on cart array so only run when the cart is updated 
   
   // function to add item in cart 
  
   const addToCart = (product) => {
    setcart((prevcart) => {
      if (!prevcart) return [];
        const existingitem = prevcart.find((item) => item.id === product.id);
        let updated_cart = [];
        if (existingitem) {
            updated_cart = prevcart.map((item) => 
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        }
        else{
            updated_cart = [...prevcart, { ...product, quantity: 1 }];
        } 
        
        // it will store the data on localStorage so that in the cart pages we can directly fetch the cart items 
        localStorage.setItem("cart" ,JSON.stringify(updated_cart));
        return updated_cart;
    });

    // Add a delay to ensure state updates before storing in localStorage
    setTimeout(() => {
        localStorage.setItem("cart", JSON.stringify(cart)); // Store updated cart
    }, 100);
};

   const updateCart = (id , quantity) => {
       setcart((prevcart) => 
         prevcart.map((item) => 
           item.id === id ? {...item , quantity : quantity} : item
        )   
    ) ;
   };

   const removeFromCart = (id) =>{
      setcart((prevcart) => 
        // prevcart only take other cart items 
       prevcart.filter((item) => item.id !== id)
    )
   }
  return (
    <CartContext.Provider value={{cart , addToCart , updateCart ,removeFromCart}}>
        {children}
        {/* here children is a prop which hold all child components  */}
    </CartContext.Provider>

    // this manages the cart state across all pages 
    // laods cart data from localStorage
    // provides functions like addtocart etc 
  )
}

export default CartProvider