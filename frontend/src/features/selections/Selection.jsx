import React, { useEffect, useState } from "react";
import BookedRoom from "./components/BookedRoom";
import BillingInfo from "./components/BillingInfo";
import { useSelector } from "react-redux";
import api from "./services/Api";
import { isTokenValid } from "../../utils/TokenValidator";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Api from "./services/Api";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51PZB3hHUq15j5kNHFP1X7eruKcwg9PC41lvrkjurPfDtCtwP70bEu7d8h5ols1PihXWYSZ7od0ur4t23wzZ0eiku00E1elvKzF");

const CheckoutForm = ({ billInfo, handleBooking }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await handleBooking();
    } catch (error) {
      setError("Failed to process the payment");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <button disabled={loading} className="btn btn-primary">
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

function Selection() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { isLogged, access } = useSelector((state) => state.auth);
  const [selections, setSelections] = useState([]);
  const [coupon, setCoupon] = useState(false);
  const isToken = isTokenValid(access);
  const [billInfo, setBillInfo] = useState({
    user: isToken.user,
    hotel: "",
    rooms: [], // Changed from single room to array of rooms
    full_name: "",
    email: "",
    phone: "",
    before_discount: 0,
    total: 0,
    saved: 0,
    total_days: 0,
    check_in_date: "",
    check_out_date: "",
    guests: 0,
    use_dummy_gateway: false,
  });

  const fetchSelections = async () => {
    try {
      if (isLogged && isToken.isValid) {
        const response = await api.listSelection(access);
        console.log(response);
        setSelections(response);
      } else {
        Swal.fire({
          title: "Token expired",
          text: "Please login again to get a new token",
          icon: "warning",
          toast: true,
          timer: 2000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSelections();
  }, []);
  

  useEffect(() => {
    if (selections.length > 0) {
      const hotel = selections[0].hotel;
      const roomIds = selections.map(selection => selection.room.id);
      const total = selections.reduce((sum, selection) => sum + parseFloat(selection.room.room_type.price), 0);
      console.log(total);
      setBillInfo({
        user: isToken.user,
        hotel,
        rooms: roomIds,
        full_name: "",
        email: "",
        phone: "",
        before_discount: total,
        total,
        saved: 0.0,
        total_days: selections[0].total_days,
        check_in_date: selections[0].check_in,
        check_out_date: selections[0].check_out,
        guests: selections[0].guest,
        use_dummy_gateway: false,
      });
    }
  }, [selections]);

  const handleBooking = async () => {
    try {
      if (isLogged && isToken.isValid) {
        const response = await Api.bookSelection(billInfo, access);
        const sessionId = response.session_id;
        
        const stripe = await stripePromise;
        const data = await stripe.redirectToCheckout({ sessionId });
        console.log(data);
        if (data.error) {
          console.error("Stripe Checkout error:", error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row mt-5 py-5 container mx-auto">
      <div className="col-md-8 row my-1">
        <BookedRoom
          selections={selections}
          token={access}
          fetchSelections={fetchSelections}
        />
        {step === 1 && (
          <BillingInfo
            setStep={setStep}
            billInfo={billInfo}
            setBillInfo={setBillInfo}
          />
        )}
        {step === 2 && (
          <div className="col-12 card p-3 shadow-sm my-1">
            <h4 className="font-weight-bold">Billing Information</h4>
            <hr />
            <div className="">
              <p>Full Name: {billInfo.full_name}</p>
              <p>Email: {billInfo.email}</p>
              <p>Phone: {billInfo.phone}</p>
            </div>
            <div className="text-right my-2">
              <button className="btn btn-secondary" onClick={() => setStep(1)}>
                Edit Info
              </button>
            </div>
            <CheckoutForm billInfo={billInfo} handleBooking={handleBooking} />
          </div>
        )}
      </div>

      <div className="col-md-4">
        <div className="card p-3 shadow-sm">
          <h4 className="font-weight-bold">Booking Summary</h4>
          <hr />
          <div className="d-flex justify-content-between my-1">
            <p className="font-weight-bold small text-secondary">Total Days</p>
            <p className="font-weight-bold small">{billInfo.total_days}</p>
          </div>
          <div className="d-flex justify-content-between my-1">
            <p className="font-weight-bold small text-secondary">
              Total Amount
            </p>
            <p className="font-weight-bold small">${billInfo.before_discount}</p>
          </div>
          <div className="d-flex justify-content-between my-1">
            <p className="font-weight-bold small text-secondary">Discount</p>
            <p className="font-weight-bold small">${billInfo.saved}</p>
          </div>
          {coupon && (
            <form>
              <div className="form-group">
                <label htmlFor="coupon-code">Enter Your Coupon Code</label>
                <input type="text" required className="form-control" />
              </div>
              <div className="text-right">
                <button className="btn btn-primary">Apply</button>
              </div>
            </form>
          )}
          <p
            className="small text-right my-1"
            onClick={() => setCoupon(!coupon)}
          >
            {coupon ? "Discard coupon" : "Apply coupon!"}
          </p>
          <hr />
          <div className="d-flex justify-content-between my-1">
            <p className="font-weight-bold small text-secondary">Total Cost</p>
            <p className="font-weight-bold small">${billInfo.total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Selection;
