import React, { useState } from "react";
import axios from "axios";

const WishlistButton = ({ productId, userEmail }) => {
  const [added, setAdded] = useState(false);

  const handleWishlist = async () => {
    try {
      const formData = new FormData();
      formData.append("product_id", productId);
      formData.append("user_email", userEmail);

      await axios.post("https://hope.alwaysdata.net/api/add_wishlist", formData);

      setAdded(true);
      alert("Added to wishlist!");
    } catch (error) {
      console.error(error);
      alert("Error adding to wishlist");
    }
  };

  return (
    <button
      onClick={handleWishlist}
      style={{
        backgroundColor: added ? "#FFD700" : "#FDF6E3",
        border: "1px solid #A67B5B",
        color: added ? "#8B5E3C" : "#A67B5B",
        borderRadius: "25px",
        padding: "8px 16px",
        cursor: "pointer",
        fontSize: "15px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "0.3s ease",
        boxShadow: "0 3px 8px rgba(0,0,0,0.1)"
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = "scale(1.05)";
        e.target.style.boxShadow = "0 5px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "scale(1)";
        e.target.style.boxShadow = "0 3px 8px rgba(0,0,0,0.1)";
      }}
    >
      {added ? "❤️ Saved" : "🤍 Save"}
    </button>
  );
};

export default WishlistButton;