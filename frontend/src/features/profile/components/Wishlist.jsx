import React, { useState } from "react";

function Wishlist({ wishlists, handleDelete }) {
  
  return (
    <div className="col-md-7 col-12 my-1" id="wishlist">
      <div className="bg-white shadow-sm rounded p-3">
        <h3 className="font-weight-bold">Wishlist</h3>
        <hr />
        {wishlists && wishlists.length > 0 ?
          wishlists.map((wishlist) => (
            <div
              className="bg-light shadow-sm rounded d-flex justify-content-between align-items-center mb-2 p-2"
              key={wishlist.id}
            >
              <img
                src={wishlist.hotel.image}
                alt=""
                className="img-fluid"
                style={{ height: "50px" }}
              />
              <div className="pl-3 mr-auto">
                <p className="font-weight-bold m-0">
                  {wishlist.hotel.name}
                </p>
                <small>{wishlist.hotel.description}</small>
              </div>
              <button className="btn btn-danger" onClick={() => handleDelete(wishlist.id)}>Delete</button>
            </div>
          )) : (
            <div className="p-3 alert alert-warning">
              <p className="text-center m-0">No wishlist</p>
            </div>
          )}
      </div>
    </div>
  );
}

export default Wishlist;
