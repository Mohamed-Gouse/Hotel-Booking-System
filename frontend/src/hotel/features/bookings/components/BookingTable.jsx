import React from "react";
import { Link } from "react-router-dom";

function BookingTable({ bookings, reservation }) {
  return (
    <div className="my-2">
      <div
        className="bg-white shadow-sm p-3 rounded-top"
        style={{
          height: 400,
          overflowX: "scroll",
          scrollbarWidth: "unset",
        }}
      >
        <div className="d-flex justify-content-between">
          <h3>{reservation ? "Reservation List" : "Booking List"}</h3>
          {!reservation && (
            <Link
              to={"reservation"}
              className="btn btn-primary font-weight-bold"
            >
              Make Reservation
            </Link>
          )}
        </div>
        <hr />
        <table className="table table-secondary rounded shadow-sm">
          <thead>
            <tr>
              <th>Booked name</th>
              <th>Booked on</th>
              <th>Check in</th>
              <th>Check out</th>
              <th>Payment status</th>
              <th>Room status</th>
              <th>Paid amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.full_name}</td>
                  <td>{booking.date}</td>
                  <td>{booking.check_in_date}</td>
                  <td>{booking.check_out_date}</td>
                  <td>{booking.payment_status}</td>
                  <td>{booking.is_active && booking.checked_in ? "User cheked In" : !booking.is_active && booking.checked_out ? "User checked out" : "Not checked in"}</td>
                  <td>₹ {booking.total}</td>
                  <td>
                    {reservation ? (
                      <Link to={`reservation/${booking.id}`} className="btn btn-secondary">
                        View
                      </Link>
                    ) : (
                      <Link to={`${booking.id}`} className="btn btn-secondary">
                        View
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="alert alert-warning w-100">
                <th colSpan={8} className="text-center">
                  No Bookings
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingTable;
