import React, { useState } from "react";
import { checkAvailable } from "../services/api";

function CheckAvailable({token, rooms, setRooms, setCheckData}) {

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      check_in: checkIn,
      check_out: checkOut,
      guests: guest,
      room_type_id: e.target.room_type.value,
    };
    try {
      const data = await checkAvailable(formData, token)
      setRooms(data.rooms)
      setCheckData(formData)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-md-4 col-12 my-2">
      <div className="bg-white p-3 shadow-sm rounded">
        <h5>Check Available Room</h5>
        <hr />
        <form onSubmit={handleSubmit}>
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
              {rooms && rooms.map((room) => (
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
  );
}

export default CheckAvailable;
