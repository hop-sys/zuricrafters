import React, { useState, useEffect } from "react";
import axios from "axios";

const Ratings = ({ productId, userEmail }) => {
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(0);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const res = await axios.get(`https://hope.alwaysdata.net/get_ratings/${productId}`);
      setRatings(res.data.ratings);
      setAverage(res.data.average_rating);
    } catch (err) {
      console.error(err);
    }
  };

  const submitRating = async () => {
    if (rating === 0) {
      alert("Please select a rating!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("product_id", productId);
      formData.append("user_email", userEmail);
      formData.append("rating", rating);
      formData.append("review", review);

      await axios.post("https://hope.alwaysdata.net/add_rating", formData);
      setReview("");
      setRating(0);
      setHover(0);
      fetchRatings();
      alert("Rating submitted!");
    } catch (err) {
      console.error(err);
      alert("Error submitting rating.");
    }
  };

  const renderStars = (num) => "★".repeat(num) + "☆".repeat(5 - num);

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "30px"
    }}>
      <div style={{
        border: "2px solid #A67B5B",    // brown border
        borderRadius: "12px",
        padding: "20px",
        width: "400px",
        backgroundColor: "#FDF6E3",      // cream background
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif"
      }}>
        <h2 style={{ textAlign: "center", color: "#A67B5B", marginBottom: "10px" }}>⭐ Ratings</h2>
        <p style={{ fontSize: "18px", fontWeight: "bold", textAlign: "center", color: "#8B5E3C" }}>
          {renderStars(Math.round(average))} ({average} / 5)
        </p>

        <div style={{ marginBottom: "15px" }}>
          <h4 style={{ margin: "10px 0", color: "#A67B5B" }}>Submit Your Rating:</h4>
          
          {/* Hover stars */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "5px" }}>
            {[1,2,3,4,5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: "26px",
                  color: (hover || rating) >= star ? "#FFD700" : "#ccc", // gold when selected/hover
                  cursor: "pointer",
                  transition: "color 0.2s"
                }}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write a review (optional)"
            rows={3}
            style={{
              width: "100%",
              marginTop: "5px",
              padding: "8px",
              fontSize: "14px",
              borderRadius: "6px",
              border: "1px solid #A67B5B",
              resize: "none",
              backgroundColor: "#FFF8E7",
            }}
          />
          <button
            onClick={submitRating}
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#A67B5B",      // brown button
              color: "#FFD700",                 // golden text
              border: "none",
              borderRadius: "6px",
              width: "100%",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Submit
          </button>
        </div>

        <h4 style={{ margin: "10px 0", color: "#A67B5B" }}>All Reviews:</h4>
        {ratings.length === 0 && <p style={{ color: "#8B5E3C" }}>No reviews yet.</p>}
        {ratings.map((r, index) => (
          <div key={index} style={{
            borderTop: "1px solid #E0C9A6",
            padding: "8px 0"
          }}>
            <strong style={{ color: "#8B5E3C" }}>{r.user_email}</strong>: {renderStars(r.rating)}
            <br/>
            <span style={{ fontStyle: "italic", color: "#6E4B3A" }}>{r.review}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ratings;