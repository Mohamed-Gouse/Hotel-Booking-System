import React, { useEffect, useState } from "react";
import Booking from "./components/Booking";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { bookingDetail, CheckInOut } from "./services/api";

function BookingDetail() {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const { access } = useSelector((state) => state.auth);

  const fetchBooking = async () => {
    try {
      const data = await bookingDetail(access, id);
      setBooking(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const updateCheckInOut = async (bookingId) => {
    try {
      const response = await CheckInOut(access, bookingId);
      console.log(response);
      fetchBooking();
    } catch (error) {
      console.log(error);
    }
  };

  return <Booking booking={booking} updateCheckInOut={updateCheckInOut} />;
}

export default BookingDetail;
