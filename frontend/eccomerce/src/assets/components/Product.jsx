import { useContext } from "react";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "./CartContext";
import { ProductContext } from "./ProductContext";

const Product = () => {
  const { addToCart } = useContext(CartContext);
  const { products } = useContext(ProductContext);

  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }

  return (
    <div>
      <Toaster position="top-right" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-2xl p-5 w-80 h-[450px] transition-transform hover:scale-105">
            {/* Product Image */}
            <NavLink to={`/product/${product.id}`}>
              <img src={product.image} alt={product.title} className="w-full h-40 object-cover rounded-lg" />
            </NavLink>
            {/* Product Info */}
            <div className="mt-4 text-center">
              <NavLink to={`/product/${product.id}`}>
                <h2 className="text-lg font-semibold text-gray-800">{product.title.slice(0, 20)}...</h2>
                <p className="text-gray-500 text-sm mt-1">{product.description.slice(0, 50)}...</p>
                <p className="text-lg font-bold text-blue-600 mt-2">Rs.{Math.floor(product.price * 70)}</p>
              </NavLink>
              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  addToCart(product); // ✅ Pass the clicked product
                  toast.success("Product added to Cart", { duration: 4000 });
                }}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
