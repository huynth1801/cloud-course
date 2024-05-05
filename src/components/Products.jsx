import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import apiAxios from "../services/apiAxios";

const Products = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <div>
      <h2>Products List</h2>
      <ul className="flex justify-between">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </ul>
    </div>
  );
};

export default Products;
