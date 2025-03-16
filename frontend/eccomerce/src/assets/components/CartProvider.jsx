import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import Axios from "../../Axios";
import { ProductContext } from "./ProductContext";
const cartfromlocalstorage = JSON.parse(localStorage.getItem("cart") || []);
// it will persists the data of cart into react state after the reload

const CartProvider = ({ children }) => {
  const [cart, setcart] = useState([]);
  const token = localStorage.getItem("access_token");
  const {products} = useContext(ProductContext);

  //    save cart to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  //    it has dependency on cart array so only run when the cart is updated

  // fucntion to fetch data from mysql databse /
  const fetchCart = async() => {
       if(token){
          const response = await Axios.get("auth/cart/" , {
            // to load the data of perticular user into the cart form mysql
            headers : {Authorization : `Bearer ${token}`}
          } , 
        )
        if (!products || products.length === 0) {
          console.warn("Products data is not available yet.");
          return;  // Exit early to prevent errors
      }
          const cartitems = response.data;
          // updated cart is the cart fetched from api to show the images in ui 
          // beacuse the mysql database do not store the images 
          const updatedcart = cartitems.map((item) => {
            const productDetails = products.find((product) =>product.title === item.product_name);

            // debugging 
            if(productDetails){
                console.log("product title in api : " , productDetails.title);
            }   

            return productDetails ? { ...productDetails, quantity: item.quantity } : item;
          });
          
          setcart(updatedcart);

          localStorage.setItem("cart" , JSON.stringify(updatedcart));
       }
       else{
           setcart([]);
       }
  }
  useEffect(() => {
    // if(products.length > 0)
    fetchCart();
  }, [token , products]);
  // useeffect will only fetch teh data when both of the token and products are availaable
  // beacuse wihtout products availablity we cant fetch the required fields in cart 


  // function to add item in cart
  const addToCart = async (product) => {
    setcart((prevcart) => {
      if (!prevcart) return [];
      const existingitem = prevcart.find((item) => item.id === product.id);
      let updated_cart = [];
      if (existingitem) {
        updated_cart = prevcart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updated_cart = [...prevcart, { ...product, quantity: 1 }];
      }

      // it will store the data on localStorage so that in the cart pages we can directly fetch the cart items
      localStorage.setItem("cart", JSON.stringify(updated_cart));
      return updated_cart;
    });

    try {
      const response = await Axios.post(
        "/auth/cart/add/",
        {
          product_title: product.title,
          product_price: product.price,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        } // include token in request
      );
      setcart([...cart, response.data]);
    } catch (error) {
      // it will print which type of error is this
      console.error(
        "Error adding to MySQL cart:",
        error.response?.data || error.message
      );
    }
  };

  const updateCart = async(name, quantity) => {
    setcart((prevcart) =>
      prevcart.map((item) =>
        item.title === name ? { ...item, quantity: quantity } : item
      )
    );
    try {
       await Axios.post("/auth/cart/update/", {
        headers : {Authorization : `Bearer ${token}`},
        product_name : name,
        quantity : quantity,
      });
      console.log("product updation done on MYSQL")
    } catch (error) {
        console.error("error to update the cart in MYSQL " , error);
    }
  };

  const removeFromCart = async (name) => {
    try {
        await Axios.delete("auth/cart/remove/", {
            headers: { Authorization: `Bearer ${token}` },
            data: { name : name } // Pass the id inside data object
        });

        // Update cart state after deletion
        setcart((prevcart) => prevcart.filter((item) => item.title !== name));
        console.log("data removed from MYSQL");
        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
        console.error("Error removing item from MySQL:", error.response?.data || error.message);
    }
};


  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCart, removeFromCart }}
    >
      {children}
      {/* here children is a prop which hold all child components  */}
    </CartContext.Provider>

    // this manages the cart state across all pages
    // laods cart data from localStorage
    // provides functions like addtocart etc
  );
};

export default CartProvider;
