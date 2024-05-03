import axios from "axios";
const baseUrl = "http://localhost:3000";

const getProductsData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, userData)
    return response.data
  } catch (error) {
    console.error('Error registering user:', error)
    throw error;
  }
}

export default {getProductsData, registerUser};
