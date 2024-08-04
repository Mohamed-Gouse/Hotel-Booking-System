import React from "react";

function Form({full_name, setFull_name, email, setEmail, phone, setPhone, handleSubmit}) {
  return (
    <div className="col-md-6 col-12 my-3">
      <div className="bg-white shadow-sm rounded p-3">
        <h4>Customer Details</h4>
        <hr />
        <form className="w-100" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="">Full Name:</label>
            <input type="text" name="full_name" className="form-control" value={full_name} onChange={(e) => setFull_name(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="">Email Id:</label>
            <input type="email" name="full_name" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="">Phone Number:</label>
            <input type="tel" name="full_name" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          </div>
          <div className="text-right">
            <input
              type="submit"
              value="Make reservation"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
