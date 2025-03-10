import React, { useContext, useState } from "react";
// Adjust the path based on your project structure
import { CartContext } from "./CartContext";
import { useEffect } from "react";
const Cart = () => {
  const { cart, removeFromCart, updateToCart } = useContext(CartContext);
  
  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateToCart(productId, quantity);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + 70* item.price * item.quantity, 0);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      <div className="grid grid-cols-3 gap-6">
        {/* Cart Items Section */}
        <div className="col-span-2 bg-white p-6 shadow-md rounded-lg">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4 mb-4">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-2 py-1 border rounded-md"
                  >
                    -
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-2 py-1 border rounded-md"
                  >
                    +
                  </button>
                </div>
                <div className="font-semibold">Rs.{(70 *item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
          <a href="/" className="text-blue-600 text-sm mt-4 inline-block">
            ← Continue Shopping
          </a>
        </div>

        {/* Order Summary Section */}
        <div className="bg-gray-100 p-6 shadow-md rounded-lg">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Items ({cart.length})</span>
            <span className="font-semibold">Rs.{getTotalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <select className="border p-1 rounded-md text-sm">
              <option>Standard Delivery - Rs.5.00</option>
              <option>Express Delivery - Rs.10.00</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm">Promo Code</label>
            <div className="flex mt-1">
              <input type="text" className="border flex-1 p-2 rounded-l-md" placeholder="Enter code" />
              <button className="bg-red-500 text-white px-3 py-2 rounded-r-md">Apply</button>
            </div>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-4">
            <span>Total Cost</span>
            <span>Rs.{(getTotalPrice() + 5).toFixed(2)}</span>
          </div>
          <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-md cursor-pointer hover:scale-110">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
