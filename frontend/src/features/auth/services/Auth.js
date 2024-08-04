import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { login } from "../../../app/authSlice";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const signup = async (formData) => {
  try {
    const response = await axios.post(`${baseURL}signup/`, formData);
    Swal.fire({
      title: "User account created successfully",
      icon: "success",
      toast: true,
      timer: 2500,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

const signin = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseURL}signin/`, formData);
    dispatch(login(response.data));
    Swal.fire({
      title: "User logged successfully",
      icon: "success",
      toast: true,
      timer: 2000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    console.log(response.data);
    return response.data
  } catch (error) {
    Swal.fire({
      title: error.response.data.detail || "An error occured",
      icon: "warning",
      toast: true,
      timer: 5000,
      position: "center",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return error.response.data;
  }
};


export { signup, signin };
