import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { allReviews } from "./services/api";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { access } = useSelector((state) => state.auth);

  const fetchReviews = async () => {
    try {
      const data = await allReviews(access);
      setReviews(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="my-3 row">
      <div className="bg-white rounded p-3 col-md-6 mx-auto">
        <h4>Reviews</h4>
        <hr />
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>User</th>
              <th>Hotel</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {reviews && reviews.length > 0 ? (
              reviews.map((review, idx) => (
                <tr key={review.id}>
                    <td>{idx + 1}</td>
                  <td>{review.user?.username}</td>
                  <td>{review.hotel?.name}</td>
                  <td>{review.review}</td>
                </tr>
              ))
            ) : (
              <td colSpan={4}>
                <div className="alert alert-warning text-center">
                  No Data Found
                </div>
              </td>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reviews;
