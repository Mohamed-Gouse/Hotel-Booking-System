import React, { useEffect } from "react";
import FullLayout from "../layout/FullLayout";
import "../assets/styles/success.css";
import { Link, useSearchParams } from "react-router-dom";
import { axiosIn } from "../utils/axiosInstance";
import { useSelector } from "react-redux";

function SuccessPage() {
  const [searchParams] = useSearchParams();
  const booking_id = searchParams.get("booking_id");
  const session_id = searchParams.get("session_id");
  const { access } = useSelector((state) => state.auth);

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const response = await axiosIn.post("user/bookings/confirm_payment/", {
          session_id,
          booking_id,
        }, {
          headers: {
            Authorization: `Bearer ${access}`
          }
        });
        if (response.data.status === "Payment confirmed and booking updated") {
          console.log("Payment confirmed and booking updated");
        } else {
          console.log("Payment failed or could not update booking");
        }
      } catch (error) {
        console.log("Error confirming payment:", error);
      }
    };

    if (session_id && booking_id) {
      confirmPayment();
    }
  }, [session_id, booking_id]);

  return (
    <FullLayout>
      <main className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="text-center">
          <i
            className="bi bi-check2-circle text-success m-0 p-0"
            style={{ fontSize: "7rem" }}
          />
          <p className="h3 m-0 p-0">Checkout & Payment Successful!</p>
          <small>
            We have sent your booking summary to your e-mail. Kindly verify it.
          </small>
          <p className="font-weight-bold">Thank you!</p>
          <Link to={"/profile"} className="btn btn-purple">
            Go to Profile
          </Link>
        </div>
      </main>
    </FullLayout>
  );
}

export default SuccessPage;
