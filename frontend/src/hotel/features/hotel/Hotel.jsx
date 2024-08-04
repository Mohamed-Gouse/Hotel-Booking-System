import React from "react";
import { useNavigate } from "react-router-dom";

function Hotel({ hotels }) {
  const navigation = useNavigate();

  const handleHotelView = (slug) => {
    navigation(`/admin/hotel/${slug}`);
  };

  return (
    <React.Fragment>
      <div className="mt-3 bg-white p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="h2">Hotels</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigation("/admin/add-hotel");
            }}
          >
            Add Hotel
          </button>
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
            {hotels && hotels.length > 0 ? (
              hotels.map((hotel) => (
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
                        handleHotelView(hotel.slug);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="alert alert-warning text-center">
                    No Hotels
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default Hotel;
