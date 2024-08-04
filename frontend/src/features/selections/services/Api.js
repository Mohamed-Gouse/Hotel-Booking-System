import Swal from "sweetalert2";
import { axiosIn } from "../../../utils/axiosInstance";

const listSelection = async (token) => {
  try {
    const response = await axiosIn.get(`users/selections/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data
  } catch (error) {
    console.log(error);
  }
};

const removeSelection = async (token, id) => {
  try {
    const response = await axiosIn.delete(`users/selections/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  } catch (error) {
    console.log(error);
  }
};

const bookSelection = async (formData, token) => {
  try {
    const response = await axiosIn.post(`user/bookings/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  } catch (error) {
    Swal.fire({
      title: "Room not booked!",
      text: "Something went wrong, please try again later...!",
      icon: "error",
      toast: true,
      timer: 2000,
      position: "center",
      timerProgressBar: true,
      showConfirmButton: false,
    })
    console.log(error);
    throw error
  }
};

export default {
    listSelection,
    removeSelection,
    bookSelection,
}