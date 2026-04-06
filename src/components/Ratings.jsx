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
    } catch (error) {
      console.error(error);
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

      setRating(0);
      setHover(0);
      setReview("");

      fetchRatings();

      alert("Rating submitted!");
    } catch (error) {
      console.error(error);
      alert("Error submitting rating");
    }
  };

  const renderStars = (num) => "★".repeat(num) + "☆".repeat(5 - num);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          width: "420px",
          backgroundColor: "#FDF6E3",
          border: "2px solid #A67B5B",
          borderRadius: "15px",
          padding: "25px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#8B5E3C",
            marginBottom: "10px",
          }}
        >
          Product Ratings ⭐
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            color: "#A67B5B",
            marginBottom: "20px",
          }}
        >
          {renderStars(Math.round(average))} ({average} / 5)
        </p>

        <h4 style={{ color: "#8B5E3C", marginBottom: "10px" }}>
          Submit Your Rating
        </h4>

        {/* Hover stars */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              style={{
                fontSize: "30px",
                cursor: "pointer",
                color: (hover || rating) >= star ? "#FFD700" : "#D3D3D3",
                transition: "all 0.3s ease",
                transform: (hover || rating) >= star ? "scale(1.15)" : "scale(1)",
                margin: "0 4px",
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Review box */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review..."
          rows={3}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #A67B5B",
            backgroundColor: "#FFF8E7",
            resize: "none",
            fontSize: "14px",
            marginBottom: "15px",
          }}
        />

        {/* Submit button */}
        <button
          onClick={submitRating}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#A67B5B",
            color: "#FFD700",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#8B5E3C")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "#A67B5B")
          }
        >
          Submit Rating
        </button>

        {/* Reviews */}
        <h4
          style={{
            marginTop: "25px",
            color: "#8B5E3C",
          }}
        >
          Customer Reviews
        </h4>

        {ratings.length === 0 ? (
          <p style={{ color: "#8B5E3C" }}>No reviews yet.</p>
        ) : (
          ratings.map((r, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#FFF8E7",
                border: "1px solid #E0C9A6",
                borderRadius: "10px",
                padding: "12px",
                marginTop: "10px",
              }}
            >
              <strong style={{ color: "#8B5E3C" }}>{r.user_email}</strong>
              <div style={{ color: "#FFD700", fontSize: "18px" }}>
                {renderStars(r.rating)}
              </div>
              <p
                style={{
                  color: "#6E4B3A",
                  marginTop: "5px",
                  fontStyle: "italic",
                }}
              >
                {r.review}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Ratings;