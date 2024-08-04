import React, { useState } from "react";

function BillingInfo({ setStep, billInfo, setBillInfo }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillInfo({ ...billInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(billInfo);
    setStep(2);
  };

  return (
    <div className="col-12 card p-3 shadow-sm my-1">
      <h4 className="font-weight-bold">Billing Information</h4>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="full_name"
            id="name"
            className="form-control"
            value={billInfo.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Id</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={billInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile">Mobile No.</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="form-control"
            value={billInfo.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Continue to Checkout"
            className="btn btn-block btn-success"
          />
        </div>
      </form>
    </div>
  );
}

export default BillingInfo;
