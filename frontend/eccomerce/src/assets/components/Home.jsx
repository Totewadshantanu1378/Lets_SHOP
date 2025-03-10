import React from 'react'
// import './App.css'
import Product from './Product'
const Home = () => {
  return (
      <div>
      <section className='bg-[rgb(96,80,220)] flex justify-center items-center'>
        <div className='w-full text-center pt-20 pb-20'>
             <h1 className='text-6xl justify-center items-center text-white  font-bold'>Welcome to your favourite Store</h1>
             <p className='text-2xl text-white pt-5 pb-8'>Discover the latest trends with our modern collection</p>
             <button className='text-black bg-white rounded-4xl px-5 py-3 text-2xl cursor-pointer'><a href="">Shop Now</a></button>
        </div>
      </section>
      <section>
        <h1 className='font-semibold text-2xl text-center pt-10 pb-10'>Our Products</h1>
        <Product />
      </section>
    </div>
  )
}

export default Home
