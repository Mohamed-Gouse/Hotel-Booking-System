import React, { useState } from "react";
import "bootstrap/js/dist/carousel.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { axiosIn } from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function Carousel({ gallery }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchQuery.trim() === "") return;

    try {
      const response = await axiosIn.get("search/", {
        params: {
          query: searchQuery,
          latitude: latitude,
          longitude: longitude,
        },
      });
      console.log(response);
      navigate("/search", { state: { searchQuery, results: response.data } });
    } catch (error) {
      console.error("Error searching hotels:", error);
    }
  };

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  };

  // Call getUserLocation on component mount
  React.useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <>
      {gallery && gallery.length > 0 ? (
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
          style={{ height: "400px" }}
        >
          <ol className="carousel-indicators">
            {gallery.map((_, index) => (
              <li
                key={index}
                data-target="#carouselExampleIndicators"
                data-slide-to={index}
                className={index === 0 ? "active" : ""}
              ></li>
            ))}
          </ol>
          <div className="carousel-inner">
            {gallery.map((item, index) => (
              <div
                className={`carousel-item ${index === 0 ? "active" : ""}`}
                key={item.id}
              >
                <img
                  className="d-block w-100"
                  src={item.image}
                  style={{ height: "400px" }}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      ) : (
        <React.Fragment>
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
            style={{ height: "550px", position: "relative" }} // Added relative positioning
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="1"
              ></li>
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="2"
              ></li>
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100 shadow-sm"
                  src="https://media.cnn.com/api/v1/images/stellar/prod/160502155618-terranea-vista-pool.jpg?q=w_1600,h_900,x_0,y_0,c_fill"
                  style={{ height: "550px" }}
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100 shadow-sm"
                  src="https://media.cntraveler.com/photos/5d827bb077061d0008731f5f/16:9/w_4000,h_2250,c_limit/1-Hotel-West-Hollywood_2019_Pool_157.jpg"
                  style={{ height: "550px" }}
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100 shadow-sm"
                  src="https://media.architecturaldigest.com/photos/6076e0de751fb0468bd1b1a6/16:9/w_1280,c_limit/Fairmont%20Scottsdale%20Princess%20-%20Princess%20Pool%20-%201418711.jpg"
                  alt="Third slide"
                  style={{ height: "550px" }}
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>

            {/* Centered Search Bar */}
            <div
              className="position-absolute row w-100 d-flex justify-content-center align-items-center"
              style={{
                top: "50%",
                left: "50%",
                right: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}
            >
              <div className="col-md-6">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for Places or Hotels..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn bg-white"
                    onClick={handleSearch}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </>
  );
}

export default Carousel;
