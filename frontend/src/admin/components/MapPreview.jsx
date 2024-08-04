import React, { useEffect, useRef } from "react";

function MapPreview({ latitude, longitude }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const mapOptions = {
      center: { lat: latitude, lng: longitude },
      zoom: 12,
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);

    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: "Hotel Location",
    });
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>;
}

export default MapPreview;
