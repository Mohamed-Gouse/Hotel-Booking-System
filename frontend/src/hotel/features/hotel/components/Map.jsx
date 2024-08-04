import React, { useState, useEffect } from "react";

function Map({ onChange }) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!map) {
      const mapOptions = {
        center: { lat: 0, lng: 0 }, // Initial center (will be updated with user's location)
        zoom: 10,
      };
      const mapInstance = new window.google.maps.Map(
        document.getElementById("map"),
        mapOptions
      );

      setMap(mapInstance);

      // Ask for user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            mapInstance.setCenter(userLocation); // Set map center to user's location
            setMarker(new window.google.maps.Marker({ position: userLocation, map: mapInstance }));
            onChange(userLocation.lat, userLocation.lng); // Pass user's location to parent component
          },
          (error) => {
            console.error("Error getting user's location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
  }, [map, onChange]);

  useEffect(() => {
    if (map) {
      map.addListener("click", (event) => {
        const clickedLocation = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        if (marker) {
          marker.setMap(null); // Remove existing marker
        }
        const newMarker = new window.google.maps.Marker({ position: clickedLocation, map });
        setMarker(newMarker);
        onChange(clickedLocation.lat, clickedLocation.lng); // Pass clicked location to parent component
      });
    }
  }, [map, onChange, marker]);

  return <div id="map" style={{ width: "100%", height: "300px" }}></div>;
}

export default Map;
