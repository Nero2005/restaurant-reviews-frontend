import React, { useState } from "react";
import RestaurantDataService from "../services/restaurant.js";
import { Link, useParams, useLocation } from "react-router-dom";

const AddReview = (props) => {
  let location = useLocation();
  let params = useParams();
  let initialReviewState = "";
  let editing = false;

  if (location.state && location.state.currentReview) {
    editing = true;
    initialReviewState = location.state.currentReview.text;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    let data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: params.id,
    };

    if (editing) {
      data.id = location.state.currentReview.id;
      RestaurantDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div>
      {props.user ? (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Link
                to={"/restaurants/" + params.id}
                className="btn btn-primary"
              >
                Back to Restaurant
              </Link>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="description">
                  {editing ? "Edit" : "Create"}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="text"
                  required
                  value={review}
                  onChange={handleInputChange}
                  name="text"
                />
              </div>
              <button onClick={saveReview} className="btn btn-success">Submit</button>
            </div>
          )}
        </div>
      ) : (
        <div>Please log in</div>
      )}
    </div>
  );
};

export default AddReview;
