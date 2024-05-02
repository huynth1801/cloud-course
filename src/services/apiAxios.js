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

export default getProductsData;
