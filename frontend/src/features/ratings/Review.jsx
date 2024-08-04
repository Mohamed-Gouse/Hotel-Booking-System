import React, { useRef, useEffect, useState } from "react";
import { submitReview } from "./services/api";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Review() {
  const textareaRef = useRef(null);
  const [review, setReview] = useState("");
  const [error, setError] = useState(null);
  const {id} = useParams();

  const { access } = useSelector((state) => state.auth);
  const navigation = useNavigate()

  useEffect(() => {
    const textarea = textareaRef.current;

    textarea.focus();

    const autoExpand = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    textarea.addEventListener("input", autoExpand);

    autoExpand();

    return () => {
      textarea.removeEventListener("input", autoExpand);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (review === "") {
      setError("Write the review before submit");
    } else {
      try {
        await submitReview({ review, hotel: id }, access);
        navigation('/profile')
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
  };

  return (
    <div className="container vh-100 row d-flex justify-content-center align-items-center mx-auto">
      <div className="col-md-6">
        <div className="p-3 bg-white shadow rounded">
          <h4 className="text-center">Review</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Share your experience</label>
              <textarea
                name="review"
                className="form-control"
                ref={textareaRef}
                rows="4"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
              {error && <small className="text-danger">{error}</small>}
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Review;
