import React from "react";
import axios from "axios";

// this component is used for automatically add the token to every request
// helps in handling authenticated api request easily
// creating the base url configuration
const Axios = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

//recreate the refresh token , because it has expired
const refreshAccessToken = async() => {
    try {
       const refreshtoken = localStorage.getItem("refresh_token");
       if(!refreshtoken){
        throw new Error("No refresh token available");
       }

       const response = await Axios.post("auth/token/refresh/" , {refresh : refreshtoken});
       const newtoken = response.data.access;
       localStorage.setItem("access_token" , newtoken);
       Axios.defaults.headers.common["Authorization"] = `Bearer ${newtoken}`;
    } 
    catch (error) {
        console.error("failed to refresh token" ,error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return null;
    }
}


// request interceptor is used to modify the request before it is sent to server
Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // if token exists it is added to the authorisation
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// it is used for response 
Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      const newToken = await refreshAccessToken();

      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return Axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;
