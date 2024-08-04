import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const getHotels = async () => {
  try {
    const response = await axios.get(`${baseURL}users/hotels/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
};

export default {
    getHotels,
}