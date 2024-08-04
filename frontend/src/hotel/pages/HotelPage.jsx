import React, { useEffect, useState } from "react";
import HotelLayout from "../layout/HotelLayout";
import { useNavigate } from "react-router-dom";
import Hotel from "../features/hotel/Hotel";
import { useSelector } from "react-redux";
import Api from "../features/hotel/services/Api";

function HotelPage() {
  const [hotels, setHotels] = useState([]);
  const {access} = useSelector((state) => state.auth);
  const navigation = useNavigate();

  useEffect(() => {
    hotelList();
  }, []);

  const hotelList = async () => {
    try {
      const response = await Api.fetchHotel(access);
      setHotels(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HotelLayout>
      {hotels ? (
        <Hotel hotels={hotels} />
      ) : (
        <div
          className="container-fluid d-flex justify-content-center align-items-center"
          style={{ minHeight: "90vh" }}
        >
          <div class="alert alert-warning text-center" role="alert">
            <h4 class="alert-heading mb-3">No hotel you registered</h4>
            <p className="m-0">
              Click the ADD HOTEL button to register your hotel.
            </p>
            <p class="m-0 small">
              Once you register your hotel, Admin will cross check the given
              details and update you registration status!
            </p>
            <button
              className="btn btn-primary my-3"
              onClick={() => {
                navigation("/admin/add-hotel");
              }}
            >
              Add Hotel
            </button>
          </div>
        </div>
      )}
    </HotelLayout>
  );
}

export default HotelPage;
