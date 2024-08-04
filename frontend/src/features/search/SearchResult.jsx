import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchResult() {
  const location = useLocation();
  const navigate = useNavigate()
  const { searchQuery, results } = location.state || {
    searchQuery: "",
    results: [],
  };

  const handleNavigation = (slug) => {
    navigate(`/hotel/${slug}`)
  }

  return (
    <div className="min-vh-100">
      <div className="container mt-5 pt-5">
        <h3>Search Results for "{searchQuery}"</h3>
        {results.length > 0 ? (
          <div className="row">
            {results.map((hotel) => (
              <div key={hotel.id} className="col-md-4 mb-4">
                <div className="card">
                  <img
                    src={hotel.image}
                    className="card-img-top"
                    alt={hotel.name}
                  />
                  <div className="card-body" style={{cursor: "pointer"}} onClick={() => handleNavigation(hotel.slug)}>
                    <h5 className="card-title">{hotel.name}</h5>
                    <p className="card-text">{hotel.description}</p>
                    <p className="card-text">
                      <small className="text-muted">{hotel.address}</small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center mt-4">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResult;
