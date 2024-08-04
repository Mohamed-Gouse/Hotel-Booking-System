import React from "react";
import { Link } from "react-router-dom";

function BookingTable({ bookings }) {
  return (
    <div className="col-12">
      <div
        className="bg-white shadow-sm p-3 rounded-top"
        style={{
          height: 300,
          overflowX: "scroll",
          scrollbarWidth: "unset",
        }}
      >
        <h3>Booking Details</h3>
        <hr />
        <table className="table table-secondary rounded shadow-sm">
          <thead>
            <tr>
              <th>Hotel</th>
              <th>Booked name</th>
              <th>Booked on</th>
              <th>Check in</th>
              <th>Check out</th>
              <th>Payment status</th>
              <th>Paid amount</th>
              <th>More options</th>
            </tr>
          </thead>
          <tbody>
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td scope="row">{booking.hotel.name}</td>
                  <td>{booking.full_name}</td>
                  <td>{new Date(booking.date).toDateString()}</td>
                  <td>{booking.check_in_date}</td>
                  <td>{booking.check_out_date}</td>
                  <td>{booking.payment_status}</td>
                  <td>${booking.total}</td>
                  <td>
                    {booking.checked_out ? (
                      <>
                        <Link
                          to={`review/${booking.hotel.id}`}
                          className="btn btn-secondary shadow"
                        >
                          Write Review
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to={`booking/${booking.id}`}
                          className="btn btn-secondary shadow"
                        >
                          View
                        </Link>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="alert alert-warning" colSpan={8}>
                <p className="text-center m-0">No bookings</p>
              </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingTable;
