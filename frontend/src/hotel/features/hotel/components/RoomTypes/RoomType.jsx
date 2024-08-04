import React, { useEffect, useState } from "react";
import Api from "../../services/Api";

function RoomType({ slug, token }) {
  const [formData, setFormData] = useState({
    hotel: slug,
    type: "",
    description: "",
    price: "",
    no_of_beds: "",
    room_capacity: "",
  });
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await Api.fetchRoomType(token, slug);
    setRoomTypes(response.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Api.addRoomType(token, formData);
    setFormData({
      hotel: slug,
      type: "",
      description: "",
      price: "",
      no_of_beds: "",
      room_capacity: "",
    });
    fetchData();
  };

  const handleDelete = async (roomTypeId) => {
    await Api.deleteRoomType(token, roomTypeId, slug);
    fetchData();
  };

  return (
    <React.Fragment>
      <div className="container-fluid row">
        <div className="col-12">
          <div className="card p-3 shadow-sm">
            <h4 className="text-center">Add Room Types</h4>
            <hr />
            <form
              onSubmit={handleSubmit}
              className="d-flex justify-content-around"
            >
              <div className="form-group">
                <input
                  type="text"
                  id="roomType"
                  name="type"
                  className="form-control"
                  value={formData.type}
                  onChange={handleChange}
                />
                <label htmlFor="roomType">Room Type</label>
              </div>
              <div className="form-group">
                <textarea
                  name="description"
                  id="description"
                  className="form-control"
                  style={{ height: "calc(1.5em + 0.75rem + 2px)" }}
                  value={formData.description}
                  onChange={handleChange}
                />
                <label htmlFor="description">Description</label>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="form-control"
                  value={formData.price}
                  onChange={handleChange}
                />
                <label htmlFor="price">Price</label>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  id="no_of_beds"
                  name="no_of_beds"
                  className="form-control"
                  value={formData.no_of_beds}
                  onChange={handleChange}
                />
                <label htmlFor="no_of_beds">Number of Rooms</label>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  id="room_capacity"
                  name="room_capacity"
                  className="form-control"
                  value={formData.room_capacity}
                  onChange={handleChange}
                />
                <label htmlFor="room_capacity">Room Capacity</label>
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary mx-1 btn-block"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12">
          <table className="table">
            <thead>
              <tr>
                <th>Sl No.</th>
                <th>Room Type</th>
                <th>Description</th>
                <th>Price</th>
                <th>Number of Rooms</th>
                <th>Room Capacity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {roomTypes.map((room, index) => (
                <tr key={room.id}>
                  <td>{index + 1}</td>
                  <td>{room.type}</td>
                  <td>{room.description}</td>
                  <td>{room.price}</td>
                  <td>{room.no_of_beds}</td>
                  <td>{room.room_capacity}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(room.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RoomType;
