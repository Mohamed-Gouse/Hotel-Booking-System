import React, { useEffect, useState } from "react";
import BookingTable from "./components/BookingTable";
import PersonalInfo from "./components/PersonalInfo";
import Wishlist from "./components/Wishlist";
import Row from "./components/Row";
import { useSelector } from "react-redux";
import api from "./services/Api";

function Profile() {
  const { access } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({});
  const [bookings, setBookings] = useState([]);
  const [wishlists, setWishlists] = useState([]);

  const fetchProfile = async () => {
    try {
      const response = await api.userProfile(access);
      setProfile(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBookings = async () => {
    try {
      const data = await api.allBookings(access);
      setBookings(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const data = await api.listWishlists(access);
      setWishlists(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.deleteWishlist(access, id);
      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchBookings();
    fetchWishlist();
  }, []);

  return (
    <div className="container-fluid mx-auto mt-5 pt-5">
      <Row>
        <BookingTable bookings={bookings} />
      </Row>

      <Row>
        <PersonalInfo
          profile={profile}
          token={access}
          fetchProfile={fetchProfile}
        />
        <Wishlist wishlists={wishlists} handleDelete={handleDelete} />
      </Row>
    </div>
  );
}

export default Profile;
