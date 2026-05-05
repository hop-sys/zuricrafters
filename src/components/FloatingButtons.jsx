import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FloatingButtons.css";

const FloatingButtons = () => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {/* 🛒 CART BUTTON */}
      <button
        className="fab cart-fab"
        onClick={() => {
          if (!user) {
            navigate("/signin");
            return;
          }
          navigate("/checkout");
        }}
      >
        🛒
      </button>
    </>
  );
};

export default FloatingButtons;