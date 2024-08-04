import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import ViewHotel from "./components/General/ViewHotel";
import Gallery from "./components/Gallery/Gallery";
import Features from "./components/Features/Features";
import RoomType from "./components/RoomTypes/RoomType";
import Rooms from "./components/Rooms/Rooms";
import { useSelector } from "react-redux";

function HotelDetail() {
  const { slug } = useParams();
  const {access} = useSelector((state) => state.auth);

  const [page, setPage] = useState("general");
  const [status, setStatus] = useState(false);

  const handleMenuClick = (menu) => {
    setPage(menu);
  };

  const handleStatus = (hotelStatus) => {
    setStatus(hotelStatus);
  };
  return (
    <React.Fragment>
      {status && <Menu onMenuClick={handleMenuClick} activePage={page} />}
      {page === "general" && <ViewHotel slug={slug} status={handleStatus} token={access} />}
      {page === "gallery" && <Gallery slug={slug} token={access} />}
      {page === "features" && <Features slug={slug} token={access} />}
      {page === "room-types" && <RoomType slug={slug} token={access} />}
      {page === "rooms" && <Rooms slug={slug} token={access} />}
    </React.Fragment>
  );
}

export default HotelDetail;
