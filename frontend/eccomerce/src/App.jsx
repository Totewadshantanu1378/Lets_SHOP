import React from 'react'
import './App.css'
import Product from './assets/components/Product'
import Home from './assets/components/Home'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './assets/components/Login'
import Signup from './assets/components/Signup'
import Navbar from './assets/components/Navbar'
import Footer from './assets/components/Footer'
import ProductDesc from './assets/components/ProductDesc'
import Profile from './assets/components/Profile'
import CartProvider from './assets/components/CartProvider'
import Cart from './assets/components/Cart'
import ProductProvider from './assets/components/ProductProvider'

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/" ,
      element:
      <div>
        <Navbar />
        <Home />
        <Footer />
      </div>
    },
    {
      path:"/login" ,
      element:
      <div>
        <Navbar />
        <Login />
        <Footer />
      </div>
    },
    {
      path:"/register" ,
      element:
      <div>
        <Navbar />
        <Signup />
        <Footer />
      </div>
    },
    {
      path:"/profile" ,
      element:
      <div>
        <Navbar />
        <Profile />
        <Footer />
      </div>
    },
    {
      path:"/" ,
      element:
      <div>
        <Navbar />
        <Home />
        <Footer />
      </div>
    },
    {
      path:"/product/:id",
      element:
      <div>
        <Navbar />
        <ProductDesc />
        <Footer />
      </div>
    },
    {
      path:"/cart",
      element:
      <div>
        <Navbar />
        <Cart />
        <Footer />
      </div>
    },
  ])
  return (
    <ProductProvider >
    <CartProvider>
    <div>
     <RouterProvider router={router} />
    </div>
    </CartProvider>
    // due to cartprovider all the pages inside the app can access the cart 
    
    </ProductProvider>
  )
}

export default App
