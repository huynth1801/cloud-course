import React from "react";

const History = ({ orderHistory }) => {
  return (
    <div>
      <h3 className="font-semibold">Order History</h3>
      {orderHistory.map((order, index) => (
        <div key={index} className="mb-2">
          <p>
            Username: <strong>{order.username}</strong>
          </p>
          <p>Product Name: {order.productName}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Amount: ${order.amount}</p>
        </div>
      ))}
    </div>
  );
};

export default History;
