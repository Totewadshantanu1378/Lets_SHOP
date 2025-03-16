import React, { useContext, useState } from "react";
// Adjust the path based on your project structure
import { CartContext } from "./CartContext";
import { useEffect } from "react";
import { ProductContext } from "./ProductContext";

const Cart = () => {
  const { cart, removeFromCart, updateCart } = useContext(CartContext);
  const {products} = useContext(ProductContext);
  
  const handleQuantityChange = (productname, quantity) => {
    if (quantity > 0) {
      updateCart(productname, quantity);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + 70* item.price * item.quantity, 0);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen">
    <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Your Shopping Cart</h2>
    <div className="grid grid-cols-3 gap-10">
      {/* Cart Items Section */}
      <div className="col-span-2 bg-white p-6 shadow-xl rounded-2xl border border-gray-200">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-5 mb-6 bg-gray-50 rounded-xl p-4 hover:shadow-md transition"
            >
              <div className="flex items-center space-x-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl shadow-md border border-gray-300"
                />
                <div>
                  <h3 className="font-semibold text-xl text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <button
                    onClick={() => removeFromCart(item.title)}
                    className="text-red-500 text-sm mt-1 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(item.title, item.quantity - 1)}
                  className="px-3 py-1 border rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="px-4 text-lg font-bold">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.title, item.quantity + 1)}
                  className="px-3 py-1 border rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>
              <div className="font-semibold text-lg text-purple-700">
                Rs.{(70 * item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-5">Your cart is empty.</p>
        )}
        <a
          href="/"
          className="text-blue-500 text-sm mt-6 inline-block hover:underline"
        >
          ← Continue Shopping
        </a>
      </div>
  
      {/* Order Summary Section */}
      <div className="bg-white p-6 shadow-xl rounded-2xl border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-5">Order Summary</h3>
        <div className="flex justify-between mb-3 text-gray-700">
          <span>Items ({cart.length})</span>
          <span className="font-semibold">Rs.{getTotalPrice().toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-3 items-center text-gray-700">
          <span>Shipping</span>
          <select className="border p-2 rounded-md text-sm bg-white shadow-sm cursor-pointer">
            <option>Standard Delivery - Rs.5.00</option>
            <option>Express Delivery - Rs.10.00</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-700">Promo Code</label>
          <div className="flex mt-1">
            <input
              type="text"
              className="border flex-1 p-2 rounded-l-md shadow-sm"
              placeholder="Enter code"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition">
              Apply
            </button>
          </div>
        </div>
        <div className="flex justify-between text-lg font-bold border-t pt-4 text-gray-800">
          <span>Total Cost</span>
          <span>Rs.{(getTotalPrice() + 5).toFixed(2)}</span>
        </div>
        <button className="w-full mt-5 bg-purple-600 text-white py-3 rounded-md text-lg font-semibold shadow-md hover:bg-purple-700 transition-transform transform hover:scale-105">
          Checkout
        </button>
      </div>
    </div>
  </div>

  );
};

export default Cart;
