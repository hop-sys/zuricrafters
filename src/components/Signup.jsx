import React, { useState } from "react";
import axios from "axios";
import "../css/FlipCard.css";

const Signup = () => {
  // Your existing hooks
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    // prevent the site from refreshing when the form is submitted
    e.preventDefault();
    setLoading("Your request is being processed...");
    setError("");
    setSuccess("");

    try {
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("phone", phone);

      // Correct URL
      const response = await axios.post(
        "https://hope.alwaysdata.net/api/signup",
        formdata
      );

      setLoading("");
      setSuccess(response.data.message || "Signup successful!");

      // Clear inputs
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setLoading("");
      setError(
        err.response?.data?.message || "Signup failed. Check your details!"
      );
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="wrapper">
      <div className="flip-card__inner signup-card">
        <div className="flip-card__front">
          <h1 className="title">Sign Up</h1>

          <h5 className="text-info">{loading}</h5>
          <h3 className="text-success">{success}</h3>
          <h4 className="text-danger">{error}</h4>

          <form className="flip-card__form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter the username"
              className="flip-card__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter email address"
              className="flip-card__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter the password"
              className="flip-card__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Enter the mobile phone number"
              className="flip-card__input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="submit" className="flip-card__btn">
              {loading ? "Loading..." : "Signup"}
            </button><br /><br />
            <p className="auth-footer">
              Already have an account? <a href="/signin">Sign In</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;