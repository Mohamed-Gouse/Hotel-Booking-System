import React, { useEffect, useState } from "react";
import CheckAvailable from "./components/CheckAvailable";
import AvailableRooms from "./components/AvailableRooms";
import { useSelector } from "react-redux";
import { createReservation, listHotels, listRooms } from "./services/api";
import HotelList from "./components/HotelList";
import Form from "./components/Form";
import {useNavigate} from 'react-router-dom'

function MakeReservation() {
  const navigate = useNavigate()
  const { access } = useSelector((state) => state.auth);
  const [hotels, setHotels] = useState([]);
  const [seletedHotel, setSelectedHotel] = useState(null);
  const [seletedRoom, setSelectedRoom] = useState(null);
  const [rooms_types, setRoom_types] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [checkData, setCheckData] = useState({
    check_in: "",
    check_out: "",
    guests: "",
    room_type_id: "",
  });
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const fetchHotels = async () => {
    try {
      const data = await listHotels(access);
      setHotels(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoom_type = async (slug) => {
    try {
      const data = await listRooms(access, slug);
      setRoom_types(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleHotelSelection = (hotel) => {
    setSelectedHotel(hotel.id);
    fetchRoom_type(hotel.slug);
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      hotel: seletedHotel,
      room: seletedRoom.id,
      full_name: full_name,
      email: email,
      phone: phone,
      total: seletedRoom.room_type.price,
      check_in_date: checkData.check_in,
      check_out_date: checkData.check_out,
      guests: checkData.guests,
    };
    console.log(formData);
    try {
      await createReservation(formData, access)
      navigate('/admin/bookings')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div className="row m-0 mt-3">
        <HotelList
          hotels={hotels}
          handleHotelSelection={handleHotelSelection}
          seletedHotel={seletedHotel}
        />

        {seletedHotel && (
          <>
            <CheckAvailable
              token={access}
              rooms={rooms_types}
              setRooms={setRooms}
              setCheckData={setCheckData}
            />
            <AvailableRooms
              rooms={rooms}
              seletedRoom={seletedRoom}
              setSeletedRoom={setSelectedRoom}
            />

            {seletedRoom && (
              <Form
                full_name={full_name}
                setFull_name={setFull_name}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                handleSubmit={handleSubmit}
              />
            )}
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default MakeReservation;
