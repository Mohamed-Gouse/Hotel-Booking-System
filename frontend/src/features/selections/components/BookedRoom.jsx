import React from "react";
import api from "../services/Api";

function BookedRoom({ selections, token, fetchSelections }) {
    
  const handleDeleteRoom = async (selectionID) => {
    try {
      await api.removeSelection(token, selectionID);
      fetchSelections();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-12 card p-3 shadow-sm">
      <h4 className="font-weight-bold">Selected Room</h4>
      <hr />
      { selections && selections.length > 0 ? selections.map((rooms) => (
        <div className="shadow-sm border p-2 my-1" key={rooms.id}>
          <div className="row">
            <div className="col-8">
              <div className="d-flex justify-content-between">
                <p className="font-weight-bold small text-secondary">Room</p>
                <p className="font-weight-bold small">
                  {rooms.room.room_type.type}
                </p>
              </div>

              <div className="d-flex justify-content-between">
                <p className="font-weight-bold small text-secondary">Bed</p>
                <p className="font-weight-bold small">
                  {rooms.room.room_type.no_of_beds}
                </p>
              </div>

              <div className="d-flex justify-content-between">
                <p className="font-weight-bold small text-secondary">
                  Check-in
                </p>
                <p className="font-weight-bold small">{rooms.check_in}</p>
              </div>

              <div className="d-flex justify-content-between">
                <p className="font-weight-bold small text-secondary">
                  Check-out
                </p>
                <p className="font-weight-bold small">{rooms.check_out}</p>
              </div>
              <div className="d-flex justify-content-between">
                <p className="font-weight-bold small text-secondary">
                  Total Days
                </p>
                <p className="font-weight-bold small">{rooms.total_days}</p>
              </div>
            </div>

            <div className="col-4 text-right">
              <p className="rounded font-weight-bold text-secondary">
                ${rooms.room.room_type.price}
              </p>
              <button
                className="btn btn-danger font-weight-bold"
                onClick={() => handleDeleteRoom(rooms.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )) : (
        <div className="p-3 alert alert-warning">
          <p className="text-center m-0">
            No selection
          </p>
        </div>
      )}
    </div>
  );
}

export default BookedRoom;
