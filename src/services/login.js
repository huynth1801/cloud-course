import axios from "axios";
const baseUrl = "http://localhost:3000";

const login = async (creadentials) => {
  const response = await axios.post(
    `${baseUrl}/login`,
    creadentials
  );
  return response.data;
};

const refreshToken = async (request, response) => {
  try {
    const response = await axios.post(
      "/refresh",
      {},
      {
        withCredentials: true, // Include cookies in the request
      }
    );
    const data = response.data;
    const accessToken = data.accessToken;
    console.log(accessToken);
  } catch (error) {
    console.error(
      "Error refreshing access token:",
      error.message
    );
  }
};

export default { login };
