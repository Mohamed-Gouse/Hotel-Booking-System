import React, { useEffect, useState } from "react";
import BookingTable from "./components/BookingTable";
import { allBookings, allReservation } from "./services/api";
import { useSelector } from "react-redux";

function Bookings() {
  const { access } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [reservations, setReservations] = useState([]);

  const fetchBookings = async () => {
    try {
      const data = await allBookings(access);
      setBookings(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReservation = async () => {
    try {
      const data = await allReservation(access)
      setReservations(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBookings();
    fetchReservation()
  }, []);

  return (
    <React.Fragment>
      <BookingTable bookings={bookings} />
      <BookingTable bookings={reservations} reservation={true} />
    </React.Fragment>
  );
}

export default Bookings;
