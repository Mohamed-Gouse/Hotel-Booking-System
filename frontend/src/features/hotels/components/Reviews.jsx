import React from "react";

function Reviews({ reviews }) {
  return (
    <div className="col-md-6">
      <div className="p-3 shadow bg-white">
        <h5>Reviews</h5>
        <hr />
        <ul className="list-group">
          {reviews &&
            reviews.map((review) => (
              <li className="list-group-item m-0 py-2" key={review.id}>
                <strong>{review.user.username}</strong>
                 {/* - <span>3/5</span> */}
                <p className="mt-3 m-0">{review.review}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Reviews;
