import { useState } from "react";
import { useSelector } from "react-redux";
import Pricing from "./Pricing";
import Amenities from "./Amenities";
import Faq from "./Faq";
import Reviews from "./Reviews";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import CheckAvailability from "./CheckAvailability";
import { isTokenValid } from "../../../utils/TokenValidator";
import MapPreview from "../../../components/map/MapPreview";

function Details({ hotel, room_type, features, rooms, review }) {
  const [checkAvailable, setCheckAvailable] = useState(false);
  const { isLogged, access } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleCheckAvailable = () => {
    setCheckAvailable(!checkAvailable);
  };

  const handleWishlist = async () => {
    try {
      const isToken = isTokenValid(access);
      console.log(isToken, "Reached here");
      if (isLogged && isToken.isValid) {
        const formData = {
          user: isToken.user,
          hotel: hotel.id,
        };
        const response = await api.addWislist(formData, access);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {hotel && (
        <div className="row my-5">
          <div className="col-12 hotel-info">
            <div className="border rounded p-4 bg-white shadow row">
              <div className="col-md-8">
                <h3 className="card-title text-capitalize">{hotel.name}</h3>
                <p>
                  <strong>Address:</strong>
                  {hotel.address}, {hotel.city}, {hotel.country}
                </p>
                <p>
                  <strong>Phone:</strong>
                  {hotel.phone_number}
                </p>
                <p>
                  <strong>Rating:</strong> 4.5/5 (123 Reviews)
                </p>
                <p>
                  <strong>Description:</strong>
                  {hotel.description}
                </p>
                <div className="social-buttons my-3">
                  <a href={hotel.facebook} className="btn btn-primary mr-2">
                    Facebook
                  </a>
                  <a href={hotel.instagram} className="btn btn-danger mr-2">
                    Instagram
                  </a>
                  <a href={hotel.email} className="btn btn-warning">
                    Gmail
                  </a>
                </div>
                <div className="tags my-3">
                  <span className="badge badge-secondary mr-2">luxury</span>
                  <span className="badge badge-secondary mr-2">rooms</span>
                  <span className="badge badge-secondary">hotel</span>
                </div>
              </div>
              <div className="col-md-4 text-center">
                <img
                  src={hotel.image}
                  alt="Hotel image"
                  style={{ height: "200px" }}
                  className="img-fluid"
                />
                <button
                  className="btn btn-block btn-primary my-2"
                  onClick={handleCheckAvailable}
                >
                  {checkAvailable
                    ? "Hide Check Availability"
                    : "Check Availability"}
                </button>
                <button
                  className="btn btn-block btn-secondary my-2"
                  onClick={handleWishlist}
                >
                  Add to wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {checkAvailable && (
        <div className="row my-2">
          <CheckAvailability
            id={hotel.id}
            rooms={rooms}
            room_type={room_type}
          />
        </div>
      )}

      <div className="row mt-3">
        <Pricing rooms={room_type} />
        <div className="col-md-6">
        <MapPreview
          latitude={parseFloat(hotel.latitude)}
          longitude={parseFloat(hotel.longitude)}
        />
        </div>
        <Reviews reviews={review} />
      </div>

      <div className="row mt-3">
        <Amenities features={features} />
        <Faq />
      </div>
    </div>
  );
}

export default Details;
