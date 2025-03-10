import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";

const Profile = () => {
  const [user , setuser] = useState(null);
  const accesstoken = localStorage.getItem("access_token");

  useEffect(() => {
     if(accesstoken){
        Axios.get("auth/profile/", {
          headers:{Authorization : `Bearer ${accesstoken}`},
        }).then((response) => {
           console.log("User Data Response:", response.data); // Debugging
           setuser(response.data);
        }).catch((error) => {
           console.error("fetching error" ,error);
           if(error.response){
               console.log("error status : " ,error.response.status);
               console.log("Error data : " ,error.response.data);
           }
           setuser(null);
        })
     }
  }, [accesstoken])
  
  if (!user) {
    return <p className="text-center text-lg text-red-500 mt-10">Error loading profile...</p>;
  }

  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Profile Section */}
      <div className="max-w-5xl mx-auto p-6 mt-10 mb-10">
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl p-8">
          {/* Profile Image & Edit Button */}
          <div className="flex flex-col items-center w-full md:w-1/3 border-r p-6">
            <img
              src="https://img.freepik.com/premium-psd/smiling-3d-cartoon-man-avatar_975163-755.jpg?w=900"
              alt="Profile"
              className="w-40 h-40 rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold">{user.username}</h2>
            <button className="mt-5 bg-[rgb(96,80,220)] text-white py-2 px-6 rounded-lg text-lg cursor-pointer hover:scale-110 transition">
              Edit Profile
            </button>
          </div>

          {/* Account Overview */}
          <div className="w-full md:w-2/3 p-6">
            <h3 className="text-lg font-semibold bg-[rgb(96,80,220)] text-white p-3 rounded-md mb-5">
              Account Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-lg">
              <p><strong>Full Name:</strong> {user.username}</p>
              <p><strong>Username:</strong> tom</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>City:</strong> Pune</p>
              <p><strong>Phone:</strong> 9373472348</p>
              <p><strong>Country:</strong> India</p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="mt-8 bg-[rgb(96,80,220)] text-white p-4 rounded-lg text-lg font-semibold text-center">
          Order History
        </div>
      </div>
    </div>
  );
};

export default Profile;
