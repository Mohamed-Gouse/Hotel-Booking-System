import { axiosIn } from "../../../../utils/axiosInstance"

export const usersList = async (token) => {
    try {
      const response = await axiosIn.get('messaged-users/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response);
      return response.data
    } catch (error) {
      throw error
    }
  }