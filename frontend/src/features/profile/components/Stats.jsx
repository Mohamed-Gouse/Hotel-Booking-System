import React from "react";

function Stats() {
  return (
    <div className="col-md-5 col-12 row m-0" style={{ height: 300 }}>
      <div className="col-6 p-1">
        <div className="bg-light shadow p-3 rounded" style={{ height: "100%" }}>
          Total Spent
        </div>
      </div>
      <div className="col-6 p-1">
        <div className="bg-light shadow p-3 rounded" style={{ height: "100%" }}>
          Wallet Balance
        </div>
      </div>
      <div className="col-6 p-1">
        <div className="bg-light shadow p-3 rounded" style={{ height: "100%" }}>
          Total Booking
        </div>
      </div>
      <div className="col-6 p-1">
        <div className="bg-light shadow p-3 rounded" style={{ height: "100%" }}>
          Total Savings
        </div>
      </div>
    </div>
  );
}

export default Stats;
