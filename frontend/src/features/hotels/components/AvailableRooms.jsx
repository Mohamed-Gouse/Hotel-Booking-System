import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isTokenValid } from "../../../utils/TokenValidator";
import api from "../services/api";

function AvailableRooms({ availability, check_in, check_out, guest, hotel }) {
  const { isLogged, access } = useSelector((state) => state.auth);
  const isToken = isTokenValid(access);
  const [button, setButton] = useState("Add to Selection");

  const handleSelection = async (roomID) => {
    try {
      if (isLogged && isToken.isValid) {
        const formData = {
          user: isToken.user,
          hotel,
          room: roomID,
          check_in,
          check_out,
          guest,
        };
        await api.addSelection(formData, access);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {availability.rooms.map((room) => (
        <div className="col-md-4 col-12" key={room.id}>
          <div className="card m-2 p-1 bg-light shadow-sm">
            <h3> {room.room_type.type} </h3>
            <hr />
            <p className="font-weight-bold">${room.room_type.price}</p>
            <p className="font-weight-bold small">
              Beds Available - {room.room_type.no_of_beds}
            </p>
            <p className="font-weight-bold small">
              Room Capacity - {room.room_type.room_capacity}
            </p>
            <p className="small">{room.room_type.description}</p>
            <button
              onClick={() => {
                handleSelection(room.id);
              }}
              className="btn btn-block btn-primary"
            >
              {button}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default AvailableRooms;
