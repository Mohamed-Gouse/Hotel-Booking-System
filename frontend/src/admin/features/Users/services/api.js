import { axiosIn } from "../../../../utils/axiosInstance";

export const userlist = async (access) => {
  try {
    const response = await axiosIn.get(`super/users/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const userStatus = async (access, id, data) => {
  try {
    const response = await axiosIn.patch(`super/users/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
