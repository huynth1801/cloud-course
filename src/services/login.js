import axios from "axios";
const baseUrl = "http://localhost:3000/login";

const login = async (creadentials) => {
  const response = await axios.post(baseUrl, creadentials);
  return response.data;
};

export default { login };
