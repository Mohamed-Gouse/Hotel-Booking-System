import React from "react";

function AvailableRooms({ rooms, seletedRoom, setSeletedRoom }) {
  return (
    <div className="col-md-8 col-12 my-2">
      <div className="bg-white p-3 shadow-sm rounded">
        <h5>Available Rooms</h5>
        <hr />
        <div className="row m-0">
          {rooms &&
            rooms.map((room) => (
              <div className="col-md-4 col-12" key={room.id}>
                <div className="card m-2 p-1 bg-light shadow-sm">
                  <h3> {room.room_type.type} </h3>
                  <hr />
                  <p className="font-weight-bold">₹{room.room_type.price}</p>
                  <p className="font-weight-bold small m-0">
                    Beds Available - {room.room_type.no_of_beds}
                  </p>
                  <p className="font-weight-bold small m-0">
                    Room Capacity - {room.room_type.room_capacity}
                  </p>
                  <p className="font-weight-bold small m-0">
                    Room Number - {room.room_number}
                  </p>
                  {seletedRoom?.id === room.id ? (
                    <button className="btn btn-primary mt-3" disabled>
                      Select Room
                    </button>
                  ) : (
                    <button className="btn btn-primary mt-3" onClick={() => setSeletedRoom(room)}>
                      Select Room
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AvailableRooms;
