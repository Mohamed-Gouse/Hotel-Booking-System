import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import Map from "./components/Map";
import Api from "./services/Api";

function HotelAdd() {
  const navigation = useNavigate();
  const {access} = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    user: jwtDecode(access).user_id,
    name: "",
    description: "",
    image: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phone_number: "+91 ",
    email: "",
    latitude: "",
    longitude: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "latitude" || name === "longitude") && value) {
      const trimmedValue = parseFloat(value).toFixed(6);
      setFormData({ ...formData, [name]: trimmedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleMapChange = (lat, lng) => {
    setFormData({
      ...formData,
      latitude: lat.toFixed(6),
      longitude: lng.toFixed(6),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.addHotel(access, formData)
      navigation('/admin/hotels')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
      <div className="col-12 col-md-6 mx-auto card m-3">
        <h3 className="pt-3 text-center">Add Hotel</h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Hotel Name:</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label>Description:</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group mt-3">
            <label>Image:</label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="form-row">
            <div className="col-md-6">
              <label>Address:</label>
              <input
                className="form-control"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label>City:</label>
              <input
                className="form-control"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label>State:</label>
              <input
                className="form-control"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label>Country:</label>
              <input
                className="form-control"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row mb-3">
            <div className="col-md-6">
              <label>Phone No.:</label>
              <input
                className="form-control"
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label>Email ID:</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Map onChange={handleMapChange} />

          <div className="form-row mt-3">
            <div className="col-md-6">
              <label>Latitude:</label>
              <input
                className="form-control"
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <label>Longitude:</label>
              <input
                className="form-control"
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group mt-3">
            <label>Tags:</label>
            <input
              type="text"
              className="form-control"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          <div className="text-center p-3">
            <button className="btn btn-primary btn-block">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HotelAdd;
