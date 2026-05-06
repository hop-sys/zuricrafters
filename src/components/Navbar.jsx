import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadUserAndCart = () => {
      const storedUser =
        JSON.parse(localStorage.getItem("user")) || null;

      setUser(storedUser);

      if (storedUser?.email) {
        const cartKey = `cart_${storedUser.email}`;
        const cart =
          JSON.parse(localStorage.getItem(cartKey)) || [];

        const count = cart.reduce(
          (total, item) => total + (item.quantity || 1),
          0
        );

        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };

    loadUserAndCart();

    window.addEventListener("storage", loadUserAndCart);

    return () => {
      window.removeEventListener("storage", loadUserAndCart);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setCartCount(0);
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-white border-bottom shadow-sm">
      <div className="container">

        {/* BRAND */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span
            className="brand-text"
            style={{ color: "#5c3d2e", fontWeight: "bold" }}
          >
            Zuri Crafters
          </span>
        </Link>

        {/* MOBILE TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#zuriNavContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV LINKS */}
        <div className="collapse navbar-collapse" id="zuriNavContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">

            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/addproducts">
                Add Craft
              </Link>
            </li>

            {/* SHOW ONLY IF LOGGED IN */}
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/checkout">
                  Checkout
                </Link>
              </li>
            )}

            {/* SIGN UP ONLY IF NOT LOGGED IN */}
            {!user && (
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/chatbot">
                Help
              </Link>
            </li>
          </ul>

          {/* RIGHT SIDE BUTTONS */}
          <div className="d-flex justify-content-center align-items-center gap-2 mt-3 mt-lg-0">

            {/* CART */}
            <button
              className="btn btn-light position-relative"
              onClick={() => {
                if (!user) {
                  navigate("/signin");
                  return;
                }
                navigate("/checkout");
              }}
            >
              <i className="bi bi-cart" style={{ fontSize: "20px" }}></i>

              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </button>

            {/* AUTH BUTTONS */}
            {user ? (
              <>
                <span style={{ fontWeight: "500", color: "#5c3d2e", marginRight: "10px", fontSize: "18px"}}>
                  Welcome, {user.username}
                </span>

                <button
                  className="btn btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                className="btn btn-signin"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;