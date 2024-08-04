import React from "react";

function Booking({ booking, updateCheckInOut }) {
  return (
    <div className="row m-0 my-3">
      {/* Customer Detail */}
      <div className="col-md-8 col-12 my-1">
        <div className="bg-white shadow-sm rounded p-3">
          <h3>Customer Detail</h3>
          <hr />
          <div className="d-flex justify-content-between align-items-center">
            <p className="h5 text-capitalize m-0">{booking.full_name}</p>
            <p className="bg-success px-3 py-1 font-weight-bold text-capitalize text-white rounded shadow-sm m-0">
              {booking.payment_status}
            </p>
          </div>
          <p className="mt-3 mb-1 text-capitalize">
            <span className="font-weight-bold">Booked Name: </span>
            {booking.full_name}
          </p>
          <p className="mb-1 text-lowercase">
            <span className="font-weight-bold text-capitalize">Email ID: </span>
            {booking.email}
          </p>
          <p className="mb-1 text-lowercase">
            <span className="font-weight-bold text-capitalize">
              Contact number:{" "}
            </span>
            {booking.phone}
          </p>
          <p className="mb-3 text-capitalize">
            <span className="font-weight-bold">Total Guests: </span>
            {booking.guests}
          </p>

          <p className="mb-1 text-capitalize">
            <span className="font-weight-bold">Booked Date: </span>
            {booking.date}
          </p>
          <p className="mb-1 text-capitalize">
            <span className="font-weight-bold">Check-In Date: </span>
            {booking.check_in_date}
          </p>
          <p className="mb-1 text-capitalize">
            <span className="font-weight-bold">Check-Out Date: </span>
            {booking.check_out_date}
          </p>
          <p className="mb-3 text-capitalize">
            <span className="font-weight-bold">Total Days: </span>
            {booking.total_days}
          </p>

          {booking.saved && booking.before_discount && (
            <>
              <p className="mb-1 text-capitalize">
                <span className="font-weight-bold">Before Discount: </span>$
                {booking.before_discount}
              </p>
              <p className="mb-1 text-capitalize">
                <span className="font-weight-bold">Total saved: </span>$
                {booking.saved}
              </p>
            </>
          )}
          <p className="mt-3 mb-1 text-capitalize h5">
            <span className="font-weight-bold">Grand Total: </span>$
            {booking.total}
          </p>
        </div>
      </div>

      {/* Room Detail */}
      <div className="col-md-4 col-12 my-1">
        <div className="bg-white shadow-sm rounded p-3">
          <h3>Room Detail</h3>
          <hr />
          <p className="h5">
            <span className="font-weight-bold">Room Type: </span>
            {booking.room?.room_type_details.type}
          </p>
          <p>
            <span className="font-weight-bold">Room number: </span>
            {booking.room?.room_number}
          </p>
          <p className="mt-3 mb-1 text-capitalize">
            <span className="font-weight-bold">Checked in: </span>
            {booking.checked_in ? "Checked In" : "Not yet"}
          </p>
          <p className="mb-3 text-capitalize">
            <span className="font-weight-bold">Checked out: </span>
            {booking.checked_out ? "Checked Out" : "Not yet"}
          </p>
          
          {!booking.checked_in && (
            <button
              className="btn btn-outline-secondary"
              onClick={() => updateCheckInOut(booking.id)}
            >
              Check in
            </button>
          )}

          {booking.checked_in && !booking.checked_out && (
            <button
              className="btn btn-outline-secondary"
              onClick={() => updateCheckInOut(booking.id)}
            >
              Check out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Booking;
