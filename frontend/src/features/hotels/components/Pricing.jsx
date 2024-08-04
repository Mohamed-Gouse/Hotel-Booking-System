import React from "react";

function Pricing({ rooms }) {
  return (
    <div className="col-md-6">
      <div className="pricing-table p-4 mb-4 shadow rounded bg-white">
        <h5>Room Pricing</h5>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Room Type</th>
              <th>No of Beds</th>
              <th>Capacity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.type}</td>
              <td>{room.no_of_beds}</td>
              <td>{room.room_capacity}</td>
              <td>${room.price}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pricing;
