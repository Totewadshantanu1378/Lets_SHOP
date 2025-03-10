import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Axios from "../../Axios";
import { CartContext } from "./CartContext";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const accessToken = localStorage.getItem("access_token");
  // the cartcontext is used to directly show the length of cart on logo 
  const {cart} = useContext(CartContext);

  useEffect(() => {
    if (accessToken) {
      Axios.get("auth/profile/")
        .then((response) => {
          console.log("User Data Response:", response.data); // Debugging
          setUser(response.data); // Store full user object
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          if (error.response) {
            console.log("Error Status:", error.response.status);
            console.log("Error Data:", error.response.data);
          }
          setUser(null);
        });
    }
  }, [accessToken]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null); // Update state instead of reloading page
  };

  return (
    <div>
      <nav className="bg-white flex">
        <div className="relative w-[1000px] mx-auto flex items-center justify-between text-black font-bold text-2xl">
          <a href="/" className="cursor-pointer py-7 pr-7">
            Let's SHOP
          </a>
        </div>
        <ul className="flex gap-6 mt-6 relative pr-20">
          {!accessToken ? (
            <>
              <li className="relative text-black cursor-pointer hover:underline">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li className="relative text-black cursor-pointer hover:underline">
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="relative text-black">
                <NavLink
                  to="/profile"
                  className="text-blue-600 hover:underline"
                >
                  Welcome, {user ? user.username : "Loading..."}
                </NavLink>
              </li>
              <li className="relative text-black cursor-pointer hover:underline">
                <button
                  className="relative text-black cursor-pointer hover:underline"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
          <li className="relative text-black cursor-pointer hover:underline">
            <NavLink to="/cart">
              <FaShoppingCart className="size-7 transition-transform hover:scale-130 hover:rotate-12" />({cart.length})
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
