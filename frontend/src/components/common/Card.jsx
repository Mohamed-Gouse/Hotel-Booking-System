import React from "react";
import { Link } from "react-router-dom";

function Card({ hotel }) {
  return (
    <div className="col-12 col-md-3 col-sm-4 p-1">
      <div
        className="rounded shadow-sm d-flex flex-column justify-content-end"
        style={{
          height: 300,
          backgroundImage: `url(${hotel.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: "10px",
          boxSizing: "border-box",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          className="p-2"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "5px" }}
        >
          <Link to={`/hotel/${hotel.slug}`} className="text-decoration-none text-white">
            <h5 className="text-capitalize">{hotel.name}</h5>
            <p className="text-muted mb-0">
              {hotel.city}, {hotel.country}
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
