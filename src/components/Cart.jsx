import React, { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import apiAxios from "../services/apiAxios";
import { FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import History from "./History";

const Cart = ({
  cartItems,
  updateCart,
  token,
  onOrderSuccess,
}) => {
  const taxRate = 0.1;
  const [quantities, setQuantities] = useState({});
  const [isOrdering, setIsOrdering] = useState(false);
  const [error, setError] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showOrderHistory, setShowOrderHistory] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const newQuantities = {};
    cartItems.forEach((item) => {
      newQuantities[item.id] = item.quantity;
    });
    // Cập nhật trạng thái quantities
    setQuantities(newQuantities);
  }, [cartItems]);

  const handleIncreaseQuantity = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1,
    }));
  };

  const handleDecreaseQuantity = (id) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      if (updatedQuantities[id] > 0) {
        updatedQuantities[id]--;
      }
      return updatedQuantities;
    });
  };

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.id !== id
    );
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[id];
      return updatedQuantities;
    });
    updateCart(updatedCartItems);
  };

  const total = cartItems.reduce(
    (acc, { price, id }) =>
      acc + price * (quantities[id] || 1),
    0
  );
  const taxAmount = total * taxRate;
  const totalAfterTax = total + taxAmount;

  const handleOrder = async () => {
    setIsOrdering(true);
    const orderProductName = cartItems.reduce(
      (acc, item) => {
        return acc + item.name;
      },
      ""
    );

    const quantityProduct = cartItems.reduce(
      (acc, item) => {
        return acc + item.quantity;
      },
      0
    );

    const orderData = {
      productName: orderProductName,
      quantity: quantityProduct,
      amount: totalAfterTax,
    };
    try {
      apiAxios.setToken(token);
      const response = await apiAxios.postOrder(orderData);
      updateCart([]);
      onOrderSuccess();
    } catch (error) {
      console.error("Error placing orders", error);
      setError(error);
      throw error;
    } finally {
      setIsOrdering(false);
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        apiAxios.setToken(token);
        const orderData = await apiAxios.getOrder(token);
        setOrderHistory(orderData.orders);
      } catch (error) {
        setError(error);
      }
    };

    fetchOrder();
  }, [token]);

  const handleToggleOrderHistory = () => {
    setShowOrderHistory(!showOrderHistory);
    navigate("/orders");
  };

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-xl w-full rounded overflow-hidden shadow-lg m-4 items-center">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl mb-2">Cart</h2>
            {showOrderHistory && (
              <History orderHistory={orderHistory} />
            )}
            <button onClick={handleToggleOrderHistory}>
              <FaHistory />
            </button>
          </div>
          <ul>
            {cartItems.map(({ id, name, price }) => (
              <li
                key={id}
                className="flex justify-between py-2"
              >
                <div>{name}</div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() =>
                      handleDecreaseQuantity(id)
                    }
                    className="px-2 py-1 mr-1 border border-gray-300 bg-gray-100 rounded-md"
                  >
                    -
                  </button>
                  <p className="px-2 font-semibold">
                    {quantities[id] || 1}
                  </p>
                  <button
                    onClick={() =>
                      handleIncreaseQuantity(id)
                    }
                    className="px-2 py-1 ml-1 border border-gray-300 bg-gray-100 rounded-md mx-4"
                  >
                    +
                  </button>
                  <p className="px-2">
                    ${price * (quantities[id] || 1)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-6 py-4">
          <div className="flex justify-between">
            <span className="font-semibold">
              Tax ({taxRate * 100}%)
            </span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Total:</span>
            <span>${totalAfterTax.toFixed(2)}</span>
          </div>
        </div>
        <div className="justify-center flex">
          <button
            onClick={handleOrder}
            className={`font-bold bg-blue-400 p-2 m-2 rounded-md w-40 hover:opacity-90 hover:text-white ${
              isOrdering && "opacity-50 cursor-not-allowed"
            }`}
            disabled={isOrdering}
          >
            {isOrdering ? "Processing..." : "Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
