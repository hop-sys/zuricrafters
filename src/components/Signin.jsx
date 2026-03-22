import React, { useState } from "react";
import axios from "axios";
import "../css/FlipCard.css";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  // Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Your request is being processed...");

    try {
      // create a formdata object
      const formdata = new FormData();

      // insert the email and the password on the FormData created
      formdata.append("email", email);
      formdata.append("password", password);

      // Interact with axios for the response
      const response = await axios.post("https://hope.alwaysdata.net/api/signin",formdata);

      // set the loading hook back to default
      setLoading("");

      // check whether the user exists
      if(response.data.user){
        // if user is there, definately the details entered during signin are correct
        setSuccess("Welcome back! Login successful.");

        // store user details in local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
        // const user = JSON.parse(localStorage.getItem("user"));
        // console.log(response.data.user);

        // Clear inputs
        setEmail("");
        setPassword("");

        setTimeout(() => {
        setSuccess("");
        }, 1000);
     } 
      else{
      // user is not found
      setError("Login failed, please try again")
     }
   }
    catch (error) {
      // set loading back to default
      setLoading("");

      // update the error hook with a message
      setError("Signin failed. Check your details!");
    }
  };

  return (
    <div className="wrapper">
      <div className="flip-card__inner signup-card">
        <div className="flip-card__front">
          <h1 className="title">Sign In</h1>

          <h5 className="text-info">{loading}</h5>
          <h3 className="text-success">{success}</h3>
          <h4 className="text-danger">{error}</h4>

          <form className="flip-card__form" onSubmit={handleSubmit}>
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
              placeholder="Enter password"
              className="flip-card__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="flip-card__btn">
              {loading ? "Loading..." : "Sign In"}
            </button> <br /><br />
            <p className="auth-footer">
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;