import { axiosIn } from "../../../utils/axiosInstance";

export const bookingDetail = async (token, id) => {
  try {
    const response = await axiosIn.get(`users/bookings/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
