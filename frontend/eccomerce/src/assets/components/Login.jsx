import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../Axios";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post("auth/login/", {
        email,
        password,
      });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response?.data);
      alert("User Does not exists");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Toaster position="top-center" />
      <div className="bg-white p-8 rounded-xl shadow-lg w-[24rem] h-auto">
        <h1 className="text-center text-3xl font-semibold mb-4">
          Login into Account
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handlesubmit}>
          {/* Username Field */}
          <div>
            <label htmlFor="email" className="font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your Email"
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Signup Button */}
          <button className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 cursor-pointer">
            Log in
          </button>
        </form>

        <p className="text-gray-600 text-center mt-4">
          Don't have an account?
          <a href="/register" className="text-blue-500 hover:underline ml-1">
            Signup
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
