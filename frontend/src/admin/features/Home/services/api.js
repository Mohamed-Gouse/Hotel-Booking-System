import { axiosIn } from "../../../../utils/axiosInstance";

export const dashboardData = async (token) => {
  try {
    const response = await axiosIn.get("super/statitics/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
