import React, { useState } from "react";
import Api from "../services/Api";

function AddDocument({ access, hotel, updateDocumentState }) {
  const [documents, setDocuments] = useState({
    hotel: hotel,
    license: null,
    permit: null,
    insurance: null,
    certificate: null,
  });

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setDocuments({ ...documents, [fieldName]: file });
  };

  const handleFormSubmition = async (e, updateDocumentState) => {
    e.preventDefault();
    const response = await Api.addDocuments(access, documents)
    updateDocumentState(response.data);

  };

  return (
    <React.Fragment>
      <div>
        <div className=""></div>
        <h3 className="text-center font-weight-bold">Hotel Documents</h3>
        <hr />
        <form
          className="px-3"
          onSubmit={(e) => handleFormSubmition(e, updateDocumentState)}
        >
          <div className="form-group">
            <label htmlFor="license">Hotel License:</label>
            <input
              type="file"
              name="license"
              id="license"
              className="form-control"
              onChange={(e) => handleFileChange(e, "license")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="permit">Hotel Permit:</label>
            <input
              type="file"
              name="permit"
              id="permit"
              className="form-control"
              onChange={(e) => handleFileChange(e, "permit")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="insurance">Hotel Insurance:</label>
            <input
              type="file"
              name="insurance"
              id="insurance"
              className="form-control"
              onChange={(e) => handleFileChange(e, "insurance")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="certificate">Hotel Certificate:</label>
            <input
              type="file"
              name="certificate"
              id="certificate"
              className="form-control"
              onChange={(e) => handleFileChange(e, "certificate")}
            />
          </div>
          <button className="btn btn-primary btn-block">
            Upload Documents
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default AddDocument;
