import { axiosIn } from "../../../../utils/axiosInstance";

export const allBookings = async (token) => {
  try {
    const response = await axiosIn.get("admin/bookings/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const allReservation = async (token) => {
  try {
    const response = await axiosIn.get("admin/reservations/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const bookingDetail = async (token, id) => {
  try {
    const response = await axiosIn.get(`admin/bookings/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reservationDetails = async (token, id) => {
  try {
    const response = await axiosIn.get(`admin/reservations/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const CheckInOut = async (access, bookingId) => {
  try {
    const response = await axiosIn.patch(
      `admin/bookings/${bookingId}/check_in_out/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reservationCheckInOut = async (access, bookingId) => {
  try {
    const response = await axiosIn.patch(
      `admin/reservations/${bookingId}/check_in_out/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listHotels = async (token) => {
  try {
    const response = await axiosIn.get(`admin/hotels/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listRooms = async (token, slug) => {
  try {
    const response = await axiosIn.get(`admin/room_types/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { hotel_slug: slug },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkAvailable = async (formData, token) => {
  try {
    const response = await axiosIn.post(`check-availability/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("check", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReservation = async (formData, token) => {
  try {
    console.log(formData);
    const response = await axiosIn.post("admin/create-reservation/", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
