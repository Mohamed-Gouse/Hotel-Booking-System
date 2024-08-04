import { axiosIn } from "../../../../utils/axiosInstance";

export const allReviews = async (token) => {
  try {
    const response = await axiosIn.get("admin/reviews/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data
  } catch (error) {
    throw error;
  }
};
