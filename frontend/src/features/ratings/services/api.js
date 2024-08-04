import { axiosIn } from "../../../utils/axiosInstance";

export const submitReview = async (formData, token) => {
  try {
    const response = await axiosIn.post(`user/review-add/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data
  } catch (error) {
    throw error.response.data;
  }
};
