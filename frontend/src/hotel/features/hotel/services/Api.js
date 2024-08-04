import Swal from "sweetalert2";
import { axiosIn } from "../../../../utils/axiosInstance";

const fetchHotel = async (token) => {
  try {
    const response = await axiosIn.get(`admin/hotels/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 5000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    throw error;
  }
};

const addHotel = async (token, formData) => {
  try {
    const response = await axiosIn.post(`admin/hotels/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire({
      title: "Hotel added successfully",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return response;
  } catch (error) {
    console.error("Error adding hotel:", error);
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 6000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    throw error;
  }
};

const retriveHotel = async (token, slug) => {
  try {
    const response = await axiosIn.get(`admin/hotels/${slug}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 5000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    throw error;
  }
};

const addDocuments = async (access, documents) => {
  try {
    const response = await axiosIn.post(`admin/documents/`, documents, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${access}`,
      },
    });
    console.log("Documents uploaded successfully:", response.data);
    Swal.fire({
      title: "Document uploaded successfully",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return response;
  } catch (error) {
    console.error("Error uploading documents:", error);
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 6000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

const fetchGallery = async (token, slug) => {
  try {
    const response = await axiosIn.get(`admin/galleries/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { hotel_slug: slug },
    });
    return response;
  } catch (error) {
    console.log(error);
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 5000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

const addGallery = async (token, formData) => {
  try {
    const response = await axiosIn.post(`admin/galleries/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire({
      title: "Image uploaded successfully",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return response;
  } catch (error) {
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 5000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

const deleteGallery = async (token, Id, slug) => {
  try {
    const response = await axiosIn.delete(`admin/galleries/${Id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { hotel_slug: slug },
    });
    Swal.fire({
      title: "Image deleted successfully",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return response;
  } catch (error) {
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 5000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

const fetchFeature = async (token, slug) => {
  try {
    const response = await axiosIn.get(`admin/features/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { hotel_slug: slug },
    });
    return response;
  } catch (error) {
    console.log(error);
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 5000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

const addFeature = async (token, formData) => {
  try {
    const response = await axiosIn.post(`admin/features/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire({
      title: "Feature added successfully",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return response;
  } catch (error) {
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 5000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

const deleteFeature = async (token, Id, slug) => {
  try {
    const response = await axiosIn.delete(`admin/features/${Id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { hotel_slug: slug },
    });
    Swal.fire({
      title: "Feature deleted successfully",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return response;
  } catch (error) {
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 5000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

const fetchRoomType = async (token, slug) => {
  try {
    const response = await axiosIn.get(`admin/room_types/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { hotel_slug: slug },
    });
    return response;
  } catch (error) {
    console.log(error);
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 5000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

const addRoomType = async (token, formData) => {
  try {
    const response = await axiosIn.post(`admin/room_types/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire({
      title: "Room type added successfully",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return response;
  } catch (error) {
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 5000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

const deleteRoomType = async (token, Id, slug) => {
  try {
    const response = await axiosIn.delete(`admin/room_types/${Id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { hotel_slug: slug },
    });
    Swal.fire({
      title: "Room type deleted successfully",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return response;
  } catch (error) {
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 5000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

const fetchRoom = async (token, slug) => {
  try {
    const response = await axiosIn.get(`admin/rooms/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { hotel_slug: slug },
    });
    return response;
  } catch (error) {
    console.log(error);
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 5000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

const addRoom = async (token, formData) => {
  try {
    const response = await axiosIn.post(`admin/rooms/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire({
      title: "Room added successfully",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return response;
  } catch (error) {
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 5000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

const deleteRoom = async (token, Id, slug) => {
  try {
    const response = await axiosIn.delete(`admin/rooms/${Id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { hotel_slug: slug },
    });
    Swal.fire({
      title: "Room deleted successfully",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return response;
  } catch (error) {
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 5000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

const updateRoomAvailability = async (token, Id, formData) => {
  console.log(formData);
  try {
    const response = await axiosIn.patch(
      `admin/rooms/${Id}/update-availability/`,
      { is_available: formData.is_available },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    Swal.fire({
      title: `Room is now ${
        response.data.is_available ? "Available" : "Not Available"
      }`,
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
    let errorDetails = "";
    for (const key in error.response.data) {
      if (error.response.data.hasOwnProperty(key)) {
        errorDetails += `${key}: ${error.response.data[key]}\n`;
      }
    }
    Swal.fire({
      title: "Error",
      text: errorDetails,
      icon: "error",
      toast: true,
      timer: 5000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};

export const editHotel = async (access, slug, formData) => {
  try {
    console.log(formData);
    const response = await axiosIn.patch(`admin/hotels/${slug}/`, formData, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data
  } catch (error) {
    throw error;
  }
};

export default {
  fetchHotel,
  addHotel,
  retriveHotel,
  addDocuments,
  fetchGallery,
  addGallery,
  deleteGallery,
  fetchFeature,
  addFeature,
  deleteFeature,
  fetchRoomType,
  addRoomType,
  deleteRoomType,
  fetchRoom,
  addRoom,
  deleteRoom,
  updateRoomAvailability,
};
