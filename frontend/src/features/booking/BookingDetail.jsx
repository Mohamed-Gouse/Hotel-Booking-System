import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { bookingDetail } from "./services/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function BookingDetail() {
  const [booking, setBooking] = useState({});
  const [rooms, setRooms] = useState([]);
  const { id } = useParams();
  const { access } = useSelector((state) => state.auth);

  const fetchBooking = async () => {
    try {
      const data = await bookingDetail(access, id);
      console.log(data.rooms);
      setBooking(data);
      setRooms(data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const downloadInvoice = async () => {
    const elementsToHide = document.querySelectorAll('.exclude');
    elementsToHide.forEach(el => el.style.display = 'none');

    const input = document.getElementById('invoice-content');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice.pdf');

    elementsToHide.forEach(el => el.style.display = 'block');
  };

  return (
    <React.Fragment>
      {booking ? (
        <div className="row m-0 mt-5 pt-5" id="invoice-content">
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
                <span className="font-weight-bold text-capitalize">
                  Email ID:{" "}
                </span>
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

              <p className="mb-1 text-capitalize">
                <span className="font-weight-bold">Before Discount: </span>₹
                {booking.before_discount}
              </p>
              <p className="mb-1 text-capitalize">
                <span className="font-weight-bold">Total saved: </span>₹
                {booking.saved}
              </p>
              <div className="d-flex justify-content-between">
                <p className="mt-3 mb-1 text-capitalize h5">
                  <span className="font-weight-bold">Grand Total: </span>₹
                  {booking.total}
                </p>
                <button className="btn btn-primary exclude" onClick={downloadInvoice}>
                  Download Invoice
                </button>
              </div>
            </div>
          </div>

          {/* Room Detail */}
          <div className="col-md-4 col-12 my-1">
            <div className="bg-white shadow-sm rounded p-3">
              <h3>Room Detail</h3>
              <hr />
              {rooms.length > 0 &&
                rooms.map((room) => (
                  <div className="p-2 bg-light shadow-sm rounded my-2" key={room.id}>
                    <p className="h5">
                      <span className="font-weight-bold">Room Type: </span>
                      {room?.room_type.type}
                    </p>
                    <p>
                      <span className="font-weight-bold">Room number: </span>
                      {room?.room_number}
                    </p>
                  </div>
                ))}
              <p className="mt-3 mb-1 text-capitalize exclude">
                <span className="font-weight-bold">Checked in: </span>
                {booking.checked_in ? "Checked In" : "Not yet"}
              </p>
              <p className="mb-3 text-capitalize exclude">
                <span className="font-weight-bold">Checked out: </span>
                {booking.checked_out ? "Checked Out" : "Not yet"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">Something went wrong</div>
      )}
    </React.Fragment>
  );
}

export default BookingDetail;
