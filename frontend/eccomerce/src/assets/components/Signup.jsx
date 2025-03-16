import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Axios from "../../Axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    // Ensure values are properly taken from state
    const userData = {
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
    };

    console.log("Sending data:", userData); // Debugging

    try {
      const response = await Axios.post("auth/register/", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Registration successful:", response.data);
      toast.success("User registered successfully");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error("Registration Error:", error.response.data);
        toast.error("Registration Error:");
        alert(JSON.stringify(error.response.data, null, 2));
      } else {
        console.error("Network or server error:", error);
        alert("Network error: Could not connect to server.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-xl shadow-lg w-[24rem] h-auto">
        <h1 className="text-center text-3xl font-semibold mb-4">
          Create a New Account
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-1 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 mt-1 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 mt-1 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Signup Button */}
          <button className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer">
            Sign Up
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Already have an account?
          <a href="/login" className="text-blue-500 hover:underline ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
