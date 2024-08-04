import React, { useEffect, useState } from "react";
import HotelDetail from "../features/hotels/HotelDetail";
import FullLayout from "../layout/FullLayout";
import { useParams } from "react-router-dom";
import api from "../features/hotels/services/api";
import Chat from "../components/chat/Chat";

function HotelDetailPage() {
  const [hotel, setHotel] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [room_type, setRoom_type] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [review, setReview] = useState([]);
  const [isChat, setIsChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { slug } = useParams();

  const fetchHotels = async () => {
    try {
      const data = await api.getHotelDetail(slug);
      setHotel(data);
      setGallery(data.gallery)
      setRoom_type(data.room_type)
      setRooms(data.rooms)
      setFeatures(data.features)
      setSelectedUser(data.user)
      setReview(data.review)
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <FullLayout>
      {!isChat && <HotelDetail hotel={hotel} gallery={gallery} room_type={room_type} rooms={rooms} features={features} review={review} />}
      <button
        type="button"
        className="btn p-3 btn-primary position-fixed shadow-sm font-weight-bold"
        style={{ bottom: "10px", right: "10px", zIndex: "2" }}
        onClick={() => setIsChat(!isChat)}
      >
        {isChat ? "Close Chat" : "Chat with Hotel"}
      </button>

      {isChat && <Chat selectedUser={selectedUser} />}
    </FullLayout>
  );
}

export default HotelDetailPage;
