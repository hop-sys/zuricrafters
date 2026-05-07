import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../css/Navbar.css";

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadUserAndCart = () => {
      const storedUser = JSON.parse(localStorage.getItem("user")) || null;
      setUser(storedUser);

      if (storedUser?.email) {
        const cartKey = `cart_${storedUser.email}`;
        const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        const count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };

    loadUserAndCart();
    window.addEventListener("storage", loadUserAndCart);
    return () => window.removeEventListener("storage", loadUserAndCart);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setCartCount(0);
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm">
      <div className="container">
        
        {/* BRAND - Fixed: Removed inline brown color to use CSS cream/gold */}
        <Link className="navbar-brand brand-text" to="/">
          Zuri Crafters
        </Link>

        {/* MOBILE TOGGLER - Keep this for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#zuriNavContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV LINKS & ACTIONS */}
        <div className="collapse navbar-collapse" id="zuriNavContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addproducts">Add Craft</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/checkout">Checkout</Link>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
            )}
          </ul>

          {/* RIGHT SIDE ICONS & AUTH - Fixed: Ensured icons are visible */}
          <div className="d-flex align-items-center gap-3">
            
            {/* DARK/LIGHT TOGGLE */}
            <button className="btn navbar-btn d-flex align-items-center gap-1" onClick={toggleDarkMode}>
              <i className={darkMode ? "bi bi-sun-fill" : "bi bi-moon-fill"}></i>
              <span>{darkMode ? "Light" : "Dark"}</span>
            </button>

            {/* CART ICON */}
            <button
              className="btn position-relative p-0 border-0"
              style={{ background: "transparent" }}
              onClick={() => user ? navigate("/checkout") : navigate("/signin")}
            >
              <i className="bi bi-cart3" style={{ fontSize: "1.5rem" }}></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.7rem" }}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* AUTH SECTION */}
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span className="brand-text d-none d-xl-inline" style={{ fontSize: "1rem" }}>
                  Welcome, {user.username}
                </span>
                <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="btn navbar-btn" onClick={() => navigate("/signin")}>
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