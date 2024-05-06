import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4 flex flex-col">
        <div className="font-bold text-xl mb-2 truncate">
          {product.name}
        </div>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          ${product.price}
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
