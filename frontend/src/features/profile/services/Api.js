import { axiosIn } from "../../../utils/axiosInstance";

const userProfile = async (token) => {
  try {
    const response = await axiosIn.get(`users/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const editProfile = async (token, formData) => {
  try {
    const response = await axiosIn.put(
      `users/profile/edit/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

const changeProfilePic = async (token, formData) => {
  try {
    const response = await axiosIn.patch(
      `users/profile/edit/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const allBookings = async (token) => {
  try {
    const response = await axiosIn.get(`users/bookings/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const listWishlists = async (token) => {
  try {
    const response = await axiosIn.get(`users/wishlists/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    throw error
  }
}

const deleteWishlist = async (token, id) => {
  try {
    const response = await axiosIn.delete(`users/wishlists/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response
  } catch (error) {
    throw error
  }
}

export default {
  userProfile,
  editProfile,
  changeProfilePic,
  allBookings,
  listWishlists,
  deleteWishlist,
};
