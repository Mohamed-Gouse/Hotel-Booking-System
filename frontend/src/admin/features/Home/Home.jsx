import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Block from "./components/Block";
import { dashboardData } from "./services/api";

function Home() {
  const { access } = useSelector((state) => state.auth);
  const [statitics, setStatitics] = useState(null)

  const stats = async () => {
    try {
      const data = await dashboardData(access);
      console.log(data);      
      setStatitics(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    stats();
  }, []);

  return (
    <div className="d-flex flex-column" style={{ minHeight: "90vh" }}>
      <div className="text-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>

      <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1">
        <h1 className="text-center">Hotel Booking System</h1>
        <p className="text-center mx-auto" style={{ width: "70%" }}>
          Hotel booking system is a user-friendly platform that streamlines the
          process of finding and reserving hotel rooms. Customers can search for
          hotels, check availability, make reservations, and leave reviews.
          Hotel administrators can manage listings, handle bookings, and respond
          to inquiries, ensuring a smooth and efficient experience for both
          guests and staff.
        </p>
      </div>

      <div className="row">
        <Block name={'Hotels'} stat={statitics?.hotels} />
        <Block name={'Hotel Users'} stat={statitics?.hotel_users} />
        <Block name={'Public Users'} stat={statitics?.public_users} />
        <Block name={'Hotels Accepted'} stat={statitics?.hotels_accepted} />
        <Block name={'Hotels Rejected'} stat={statitics?.hotels_rejected} />
        <Block name={'Active Users'} stat={statitics?.active_users} />
      </div>
    </div>
  );
}

export default Home;
