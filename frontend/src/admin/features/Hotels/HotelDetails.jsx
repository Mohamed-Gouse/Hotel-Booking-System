import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchStatus, hotelDetails, statusUpdate } from "./services/api";
import MapPreview from "../../../components/map/MapPreview";

const HotelDetails = () => {
  const { id } = useParams();
  const { access } = useSelector((state) => state.auth);
  const [hotel, setHotel] = useState({});
  const [document, setDocument] = useState({});
  const [statusChoices, setStatusChoices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHotel();
    fetchStatusChoices();
  }, []);

  const fetchHotel = async () => {
    try {
      const data = await hotelDetails(access, id);
      setHotel(data);
      setDocument(data.documents);
    } catch (error) {
      console.error("Error fetching hotel:", error);
    }
  };

  const fetchStatusChoices = async () => {
    try {
      const data = await fetchStatus();
      setStatusChoices(data);
    } catch (error) {
      console.error("Error fetching status choices:", error);
    }
  };

  const updateStatus = async (event) => {
    try {
      setLoading(true);
      const status = event.target.value;
      const res = await statusUpdate(access, { status }, id);
      if (res) {
        await fetchHotel();
      }
      setLoading(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="row my-3">
      <div className="col-md-8 col-12 shadow-sm card p-3">
        <p className="h3 text-capitalize text-center font-weight-bold">
          {hotel.hotel_name}
        </p>
        <hr />
        <div className="d-flex justify-content-between">
          <div>
            <p className="font-weight-bold">
              Description:{" "}
              <span className="text-secondary font-weight-light text-capitalize">
                {hotel.description}
              </span>
            </p>
            <p className="font-weight-bold">
              Address:{" "}
              <span className="text-secondary font-weight-light text-capitalize">
                {hotel.address}
              </span>
            </p>
            <p className="font-weight-bold">
              City:{" "}
              <span className="text-secondary font-weight-light text-capitalize">
                {hotel.city}
              </span>
            </p>
            <p className="font-weight-bold">
              State:{" "}
              <span className="text-secondary font-weight-light text-capitalize">
                {hotel.state}
              </span>
            </p>
            <p className="font-weight-bold">
              Country:{" "}
              <span className="text-secondary font-weight-light text-capitalize">
                {hotel.country}
              </span>
            </p>
            <p className="font-weight-bold">
              Phone No:{" "}
              <span className="text-secondary font-weight-light text-capitalize">
                {hotel.phone_number}
              </span>
            </p>
            <p className="font-weight-bold">
              Email:{" "}
              <span className="text-secondary font-weight-light text-lowercase">
                {hotel.email}
              </span>
            </p>
            {document && (
              <form className="form-row">
                <div className="form-group">
                  <label htmlFor="status">Status: </label>
                  <select
                    disabled={loading}
                    name="status"
                    id="status"
                    className="form-control"
                    onChange={updateStatus}
                    value={hotel.status}
                  >
                    <option value="">Select Status</option>
                    {statusChoices.map((choice) => (
                      <option key={choice.value} value={choice.value}>
                        {choice.label}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            )}
          </div>
          <div>
            <img
              src={hotel.image}
              alt=""
              className="img-fluid"
              style={{ height: "250px" }}
            />
          </div>
        </div>
      </div>

      <div className="col-md-4 col-12">
        <div className="shadow-sm card p-3">
          <h5>Document Preview:</h5>
          {document ? (
            <>
              {document.license && (
                <div>
                  <h6>Hotel License:</h6>
                  {renderPreview(document.license)}
                </div>
              )}
              {document.permit && (
                <div>
                  <h6>Permit:</h6>
                  {renderPreview(document.permit)}
                </div>
              )}
              {document.insurance && (
                <div>
                  <h6>Insurance:</h6>
                  {renderPreview(document.insurance)}
                </div>
              )}
              {document.certificate && (
                <div>
                  <h6>Certificate:</h6>
                  {renderPreview(document.certificate)}
                </div>
              )}
            </>
          ) : (
            <div className="alert alert-danger font-weight-bold">
              No Document Submited
            </div>
          )}
        </div>
      </div>

      <div className="col-6 mx-auto my-2">
        <MapPreview
          latitude={parseFloat(hotel.latitude)}
          longitude={parseFloat(hotel.longitude)}
        />
      </div>
    </div>
  );
};

const renderPreview = (file) => {
  const fileType = file.split(".").pop().toLowerCase();

  if (
    fileType === "png" ||
    fileType === "jpg" ||
    fileType === "jpeg" ||
    fileType === "gif"
  ) {
    return (
      <img
        src={file}
        alt="Preview"
        style={{ maxWidth: "100%", maxHeight: "100px" }}
      />
    );
  } else {
    return (
      <a href={file} target="_blank" rel="noopener noreferrer">
        View Document
      </a>
    );
  }
};

export default HotelDetails;
