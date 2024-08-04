import { axiosIn } from "../../../../utils/axiosInstance";

export const dashboardStats = async (token) => {
  try {
    const response = await axiosIn.get("admin/statistics/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
