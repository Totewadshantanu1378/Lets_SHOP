import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
// import { useState } from 'react';
import { useEffect } from 'react';
import toast , {Toaster} from 'react-hot-toast';
import { ProductContext } from './ProductContext';
const ProductDesc = () => {

    // get product id from url , dont forgot use the curly braket

    const {id} = useParams();
    const {products} = useContext(ProductContext);
    
    const [loading , setLoading] = useState(true);
    

    // it can directly use the product context for product details fetching thruogh api 

    const product = products.find((item) => item.id === parseInt(id));
  
   if(!product) {
       return <div className='text-red-700'></div>
   }
   
   function handleclick(){
      toast.success("Product added to Cart" ,{duration : 4000});
   }

   return (
    <div>
        <Toaster position='top-right'/>
      <section className='flex justify-between p-15 px-[245px] shadow-2xl h-[1000px] gap-20 '>
        <div className='h-full'>
            <img src = {product.image} alt={product.title} referrerPolicy="no-referrer" className=' max-w-sm object-cover'/>
            
        </div>
        <div className='p-5'>
            <h1 className='text-4xl font-bold pb-8'>{product.title}</h1>
            <p className='font-semibold text-2xl'>{Math.floor(product.price*70)} Rs</p>
            <p className='text-2xl pt-8 pb-20'>{product.description}</p>
            <button onClick = {handleclick} className='bg-blue-400 p-4 px-10 cursor-pointer rounded-4xl transition-transform hover:scale-110 hover:underline'>Add to Cart</button>
        </div>
        
      </section>
    </div>
  )
}

export default ProductDesc


