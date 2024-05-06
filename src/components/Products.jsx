import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import apiAxios from "../services/apiAxios";
import Cart from "./Cart";

const Products = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);

  const handleUpdateCart = (updatedCartItems) => {
    setCartItems(updatedCartItems);
  };

  const handleOrderSuccess = () => {
    setIsOrdered(true);
    setShowPopUp(true);
    setTimeout(() => {
      setShowPopUp(false);
    }, 5000);
    setCartItems([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        apiAxios.setToken(token);
        const data = await apiAxios.getProductsData(token);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleAddToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <div>
      {showPopUp && (
        <div className="fixed top-0 right-0 mt-4 mr-4 z-50">
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-md transform translate-x-50 transition-transform duration-500">
            Order successfully!
          </div>
        </div>
      )}

      <h2>Products List</h2>
      <ul className="flex justify-between">
        {products.map((product) => {
          return (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          );
        })}
      </ul>
      <Cart
        cartItems={cartItems}
        updateCart={handleUpdateCart}
        token={token}
        onOrderSuccess={handleOrderSuccess}
      />
    </div>
  );
};

export default Products;
