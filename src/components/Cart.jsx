import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const Cart = ({ cartItems, updateCart }) => {
  const taxRate = 0.1;
  const [quantities, setQuantities] = useState({});

  const handleIncreaseQuantity = (index) => {
    const updatedQuantities = { ...quantities };
    updatedQuantities[index] = (updatedQuantities[index] || 0) + 1;
    setQuantities(updatedQuantities);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedQuantities = { ...quantities };
    if (updatedQuantities[index] > 0) {
      updatedQuantities[index]--;
      setQuantities(updatedQuantities);
    }
  };

  const handleRemoveItem = (index) => {
    const updatedCartItem = [...cartItems];
    updatedCartItem.splice(index, 1);
    updateCart(updatedCartItem);
  };

  const total = cartItems.reduce(
    (acc, { price }, index) => acc + price * (quantities[index] || 0),
    0
  );
  const taxAmount = total * taxRate;
  const totalAfterTax = total + taxAmount;

  return (
    <div className="flex justify-center">
      <div className="max-w-xl w-full rounded overflow-hidden shadow-lg m-4 items-center">
        <div className="px-6 py-4">
          <h2 className="font-bold text-xl mb-2">Cart</h2>
          <ul>
            {cartItems.map(({ name, price }, index) => (
              <li key={index} className="flex justify-between py-2">
                <div>{name}</div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleDecreaseQuantity(index)}
                    className="px-2 py-1 mr-1 border border-gray-300 bg-gray-100 rounded-md"
                  >
                    -
                  </button>
                  <p className="px-2 font-semibold">{quantities[index] || 1}</p>
                  <button
                    onClick={() => handleIncreaseQuantity(index)}
                    className="px-2 py-1 ml-1 border border-gray-300 bg-gray-100 rounded-md mx-4"
                  >
                    +
                  </button>
                  <p className="px-2">
                    ${(price * (quantities[index] || 0)).toLocaleString()}
                  </p>
                  <button onClick={() => handleRemoveItem(index)}>
                    <FaRegTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-6 py-4">
          <div className="flex justify-between">
            <span className="font-semibold">Tax ({taxRate * 100}%) </span>
            <span>${taxAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total:</span>
            <span>${totalAfterTax.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
