import axios from "axios";
const baseUrl = "http://localhost:3000";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
  return token;
};

const getProductsData = async () => {
  if (!token) {
    throw new Error("Token has not been set");
  }
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.get(
      `${baseUrl}/products`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/register`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

const postOrder = async (orderData) => {
  if (!token) {
    throw new Error("Token has not been set");
  }
  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.post(
      `${baseUrl}/orders`,
      orderData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error post order", error.message);
    throw error;
  }
};

const getOrder = async () => {
  if (!token) {
    throw new Error("Token has not been set");
  }
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.get(
      `${baseUrl}/orders/:tenandId/:userId`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching orders data:", error);
    throw error;
  }
};

export default {
  getProductsData,
  registerUser,
  setToken,
  postOrder,
  getOrder,
};
