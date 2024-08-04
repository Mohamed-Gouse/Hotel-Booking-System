import React, { useEffect, useState } from "react";
import Booking from "./components/Booking";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { reservationCheckInOut, reservationDetails } from "./services/api";

function ReservationDetail() {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const { access } = useSelector((state) => state.auth);

  const fetchReservation = async () => {
    try {
      const data = await reservationDetails(access, id);
      setBooking(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReservation();
  }, []);

  const updateCheckInOut = async (bookingId) => {
    try {
      const response = await reservationCheckInOut(access, bookingId);
      console.log(response);
      fetchReservation();
    } catch (error) {
      console.log(error);
    }
  };

  return <Booking booking={booking} updateCheckInOut={updateCheckInOut} />;
}

export default ReservationDetail;
