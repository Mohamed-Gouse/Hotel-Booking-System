import React, { useEffect, useState } from "react";
import Carousel from "../../components/common/Carousel";
import Card from "../../components/common/Card";
import api from "./services/Api";

function Home() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await api.getHotels();
        setHotels(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchHotels();
  }, []);

  return (
    <React.Fragment>
      <Carousel />
      <div className="container-fluid p-5">
        <div className="bg-white p-3 shadow-sm rounded">
          <h1 className="text-center text-capitalize">Our popular tour</h1>
          <hr />
          <div className="row d-flex justify-content-center">
            {hotels.map((hotel) => (
              <Card key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
