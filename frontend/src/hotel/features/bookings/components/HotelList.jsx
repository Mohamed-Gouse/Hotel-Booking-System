import React from 'react'

function HotelList({hotels, handleHotelSelection, seletedHotel}) {
  return (
    <div className="col-12 row mb-3">
          {hotels.map((hotel) => (
            <div className="col-12 col-md-3 col-sm-4 p-1" key={hotel.id}>
              <div
                className="rounded shadow-sm d-flex flex-column justify-content-end"
                style={{
                  height: 150,
                  backgroundImage: `url(${hotel.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                  padding: "10px",
                  boxSizing: "border-box",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <div
                  className="p-2"
                  style={
                    seletedHotel === hotel.id
                      ? {
                          backgroundColor: "rgba(255, 255, 255)",
                          color: "black",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }
                      : {
                          backgroundColor: "rgba(0, 0, 0, 0.7)",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }
                  }
                  onClick={() => handleHotelSelection(hotel)}
                >
                  <h5 className="text-capitalize">{hotel.name}</h5>
                  <p className="text-muted mb-0">
                    {hotel.city}, {hotel.country}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
  )
}

export default HotelList