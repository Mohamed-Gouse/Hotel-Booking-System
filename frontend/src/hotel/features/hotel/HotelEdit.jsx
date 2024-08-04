import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api, { editHotel } from "./services/Api";
import { useSelector } from "react-redux";

function HotelEdit() {
  const { slug } = useParams();
  const { access } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phone_number: "",
  });
  const [load, setLoad] = useState(false);
  const [hotel, setHotel] = useState({});

  const hotelData = async () => {
    try {
      const data = await Api.retriveHotel(access, slug);
      setHotel(data);
      setFormData({
        description: data.description,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        phone_number: data.phone_number,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    hotelData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      await editHotel(access, slug, formData);
      setLoad(false);
      navigate(`/admin/hotel/${slug}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="vh-100 container mx-auto row d-flex justify-content-center align-items-center ">
      <div className="col-12">
        <div className="bg-white p-3 rounded shadow">
          <h3 className="text-center">Edit Hotel Data</h3>
          <hr />
          <form className="form-row" onSubmit={handleSubmit}>
            <div className="form-group col-md-6">
              <label>Description</label>
              <textarea
                name="description"
                rows={1}
                className="form-control"
                onChange={handleChange}
                value={formData.description}
              ></textarea>
            </div>
            <div className="form-group col-md-6">
              <label>Address</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Country</label>
              <input
                type="text"
                name="country"
                className="form-control"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-md-6">
              <label>Phone No.</label>
              <input
                type="text"
                name="phone_number"
                className="form-control"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 text-right">
              <input
                disabled={load}
                type="submit"
                className="btn btn-primary"
                value={load? "updating details...": "update details"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HotelEdit;
