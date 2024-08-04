import React, { useState } from "react";
import api from "../services/api";
import AvailableRooms from "./AvailableRooms";

function CheckAvailability({ id, rooms, room_type }) {
  const [availability, setAvailability] = useState(null);

  const formatDate = (date) => {
    const d = new Date(date);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return [year, month, day].join("-");
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [checkIn, setCheckIn] = useState(formatDate(today));
  const [checkOut, setCheckOut] = useState(formatDate(tomorrow));
  const [guest, setGuest] = useState(1);

  const handleAvailabilityCheck = async (e) => {
    e.preventDefault();
    const formData = {
      check_in: checkIn,
      check_out: checkOut,
      guests: guest,
      room_type_id: e.target.room_type.value,
    };
    try {
      const response = await api.checkAvailable(formData);
      if (response) {
        setAvailability(response);
      }
    } catch (error) {
      setAvailability(null);
    }
  };

  return (
    <React.Fragment>
      {/* Check Available */}
      <div className="col-md-4">
        <div className="card p-4 mb-4 shadow-sm">
          <h4 className="card-title">Booking</h4>
          <form onSubmit={handleAvailabilityCheck}>
            <div className="form-group">
              <label htmlFor="checkInDate">Check-in Date</label>
              <input
                type="date"
                className="form-control"
                id="checkInDate"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="checkOutDate">Check-out Date</label>
              <input
                type="date"
                className="form-control"
                id="checkOutDate"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="guests">Guests</label>
              <input
                type="number"
                className="form-control"
                id="guests"
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="room">Select Room Type</label>
              <select className="form-control" name="room_type" id="room">
                {room_type.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.type} - Bed: {room.no_of_beds} - Capacity:{" "}
                    {room.room_capacity}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Check Availability
            </button>
          </form>
        </div>
      </div>

      {/* List Available */}
      <div className="col-md-8">
        <div className="card shadow-sm">
          <h3 className="text-center py-3">All Available Rooms</h3>
          <hr />
          <div className="row">
            {availability ? (
              <AvailableRooms
                availability={availability}
                check_in={checkIn}
                check_out={checkOut}
                guest={guest}
                hotel={id}
              />
            ) : (
              <>
                {rooms.map((room) => (
                  <div className="col-md-4 col-12" key={room.id}>
                    <div className="card m-2 px-3 py-1 bg-light shadow-sm">
                      <h3> {room.room_type.type}</h3>
                      <hr />
                      <p className="font-weight-bold">
                        ${room.room_type.price}
                      </p>
                      <p className="font-weight-bold small">
                        Beds Available - {room.room_type.no_of_beds}
                      </p>
                      <p className="font-weight-bold small">
                        Room Capacity - {room.room_type.room_capacity}
                      </p>
                      <p className="small">{room.room_type.description}</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CheckAvailability;
