import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { ProductContext } from './ProductContext';

// sending children as a prop is necessary 
const ProductProvider = ({children}) => {
    const [products , setProduct] = useState(null);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products").then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((error) => console.log("Error fetching" ,error))
    },[]);


  return (
    <div>
        <ProductContext.Provider  value = {{products}}>
           {children}
        </ProductContext.Provider>

        {/* it provides the context to other components  */}

    </div>
  )
}

export default ProductProvider