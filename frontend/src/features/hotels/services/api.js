import axios from "axios";
import Swal from "sweetalert2";

const baseURL = import.meta.env.VITE_API_URL;

const getHotelDetail = async (slug) => {
  try {
    const response = await axios.get(`${baseURL}users/hotels/${slug}/`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
};

const checkAvailable = async (formData) => {
  try {
    const response = await axios.post(
      `${baseURL}check-availability/`,
      formData
    );
    return response.data;
  } catch (error) {
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: errorDetails,
      icon: "error",
      toast: true,
      timer: 2500,
      position: "center",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    console.log(error);
    throw error;
  }
};

const addWislist = async (formData, access) => {
  try {
    const response = await axios.post(`${baseURL}user/wishlist/`, formData, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    Swal.fire({
      title: "Hotel added to wishlist",
      icon: "success",
      toast: true,
      timer: 2500,
      position: "center",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  } catch (error) {
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: errorDetails,
      icon: "warning",
      toast: true,
      timer: 2500,
      position: "center",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    throw error;
  }
};

const addSelection = async (formData, access) => {
  try {
    const response = await axios.post(`${baseURL}user/selection/`, formData, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    }); 
    Swal.fire({
      title: "Hotel added to selection",
      icon: "success",
      toast: true,
      timer: 2500,
      position: "center",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    console.log(response);
  } catch (error) {
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: errorDetails,
      icon: "warning",
      toast: true,
      timer: 2500,
      position: "center",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    throw error;
  }
};

export default {
  getHotelDetail,
  checkAvailable,
  addWislist,
  addSelection,
};
