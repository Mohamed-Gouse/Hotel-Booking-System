import React, { useState } from "react";

function Amenities({ features }) {
  return (
    <div className="col-md-6">
      <div className="card p-4 mb-4 shadow-sm">
        <h5>Amenities</h5>
        <p className="p-0 m-0">
          {features.map((feature) => (
            <span key={feature.id} className="badge badge-secondary mr-2">
              {feature.name}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default Amenities;
