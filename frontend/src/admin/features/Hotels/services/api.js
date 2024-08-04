import { axiosIn } from "../../../../utils/axiosInstance";

export const fetchAllHotels = async (access) => {
  try {
    const response = await axiosIn.get(
      "super/hotels/",
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

export const hotelDetails = async (access, id) => {
  try {
    const response = await axiosIn.get(
      `super/hotels/${id}/`,
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

export const fetchStatus = async () => {
  try {
    const response = await axiosIn.get(
      "status-choices/"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const statusUpdate = async (access, {status}, id) => {
  try {
    const response = await axiosIn.patch(
      `hotel/${id}/status/`,
      {status},
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
