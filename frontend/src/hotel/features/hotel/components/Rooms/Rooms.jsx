import React, { useEffect, useState } from "react";
import Api from "../../services/Api";

function Rooms({ slug, token }) {
  const [formData, setFormData] = useState({
    hotel: slug,
    room_type: "",
    room_number: "",
    is_available: true,
  });
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    listRoomTypes();
    listRooms();
  }, []);

  const listRoomTypes = async () => {
    const response = await Api.fetchRoomType(token, slug);
    setRoomTypes(response.data);
  };

  const listRooms = async () => {
    const response = await Api.fetchRoom(token, slug);
    setRooms(response.data);
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
    await Api.addRoom(token, formData);
    setFormData({
      hotel: slug,
      room_type: "",
      room_number: "",
      is_available: true,
    });
    listRooms();
  };

  const handleAvailable = async (roomId) => {
    const roomToUpdate = rooms.find((room) => room.id === roomId);

    const newFormData = {
      hotel: roomToUpdate.hotel,
      room_type: roomToUpdate.room_type,
      room_number: roomToUpdate.room_number,
      is_available: !roomToUpdate.is_available,
    };

    console.log(roomToUpdate[0], formData, "data---------");

    await Api.updateRoomAvailability(token, roomId, newFormData);
    listRooms();
  };

  const handleDelete = async (roomId) => {
    await Api.deleteRoom(token, roomId, slug);
    listRooms();
  };

  return (
    <React.Fragment>
      <div className="container-fluid row">
        <div className="col-12">
          <div className="card p-3 shadow-sm">
            <h4 className="text-center">Add Room</h4>
            <hr />
            <form
              onSubmit={handleSubmit}
              className="d-flex justify-content-around"
            >
              <div className="form-group">
                <select
                  name="room_type"
                  id="roomType"
                  className="form-control"
                  value={formData.room_type}
                  onChange={handleChange}
                >
                  <option value="">Select Room Type</option>
                  {roomTypes.map((roomType) => (
                    <option key={roomType.id} value={roomType.id}>
                      {roomType.type}
                    </option>
                  ))}
                </select>
                <label htmlFor="roomType">Room Type</label>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="room_number"
                  name="room_number"
                  className="form-control"
                  value={formData.room_number}
                  onChange={handleChange}
                />
                <label htmlFor="room_number">Room Number</label>
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
                <th>Room</th>
                <th>Room Number</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr key={room.id}>
                  <td>{index + 1}</td>
                  <td>{room.room_type_details.type}</td>
                  <td>{room.room_number}</td>
                  <td>
                    {room.is_available === true ? (
                      <button
                        className="btn btn-success"
                        onClick={() => handleAvailable(room.id)}
                      >
                        Available
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleAvailable(room.id)}
                      >
                        Unavailable
                      </button>
                    )}
                  </td>
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

export default Rooms;
