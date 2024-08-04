import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllHotels } from "./services/api";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const navigation = useNavigate();

  const { access } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const data = await fetchAllHotels(access);
      setHotels(data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const handleHotelView = (id) => {
    navigation(`/super/hotels/${id}`);
  };

  return (
    <React.Fragment>
      <div className="container-fluid mt-3 bg-white p-3">
        <div className="">
          <h1 className="h2">Hotels</h1>
        </div>
        <hr />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Hotel name</th>
              <th>Image</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>{hotel.name}</td>
                <td>
                  <img src={hotel.image} alt="" style={{ height: "70px" }} />
                </td>
                <td>{hotel.phone_number}</td>
                <td>{hotel.email}</td>
                <td>{hotel.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => {
                      handleHotelView(hotel.id);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default Hotels;
