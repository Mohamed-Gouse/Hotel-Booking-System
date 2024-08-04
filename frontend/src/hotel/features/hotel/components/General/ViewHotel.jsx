import React, { useEffect, useState } from "react";
import AddDocument from "../AddDocument";
import MapPreview from "../MapPreview";
import Api from "../../services/Api";
import { useNavigate } from "react-router-dom";

function ViewHotel({slug, status, token}) {

  const [hotel, setHotel] = useState({});
  const [document, setDocument] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    fetchHotel();
  }, []);

  const statusHandle = (sts) => {
    if (sts === 'approved'){
      status(true)
    }
    else {
      status(false)
    }
  }

  const fetchHotel = async () => {
      const response = await Api.retriveHotel(token, slug)
      setHotel(response);
      setDocument(response.documents);
      statusHandle(response.status)
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

  const editHotel = () => {
    navigate('edit')
  }

  return (
    <React.Fragment>
        <div className="row my-3">
          <div className="col-md-8 col-12 shadow-sm card p-3">
            <p className="h3 text-capitalize text-center font-weight-bold">
              {hotel.name}
            </p>
            <hr />
            <div className="d-flex justify-content-between">
              <div className="">
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
                <p className="font-weight-bold">
                  Status:{" "}
                  <span className="text-secondary font-weight-light text-lowercase">
                    {hotel.status}
                  </span>
                </p>
              </div>
              <div className="d-flex flex-column justify-content-right">
                <img
                  src={hotel.image}
                  alt=""
                  className="img-fluid"
                  style={{ height: "250px", objectFit: "contain" }}
                />
                <button className="btn btn-secondary mt-2" onClick={editHotel}>Edit</button>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-12">
            <div className="shadow-sm card p-3">
              {document ? (
                <div>
                  <h5>Document Preview:</h5>
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
                </div>
              ) : (
                <>
                  <AddDocument
                    access={token}
                    hotel={hotel.id}
                    updateDocumentState={setDocument}
                  />
                </>
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
    </React.Fragment>
  );
}

export default ViewHotel;
