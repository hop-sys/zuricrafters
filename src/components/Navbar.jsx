import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/Navbar.css';

const Navbar = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [cartCount, setCartCount] = useState(0);

 useEffect(() => {
  const loadUserAndCart = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (storedUser) {
      const cartKey = `cart_${storedUser.email}`;
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

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
}, [user]); // 🔥 important fix []);

  const handleLogout = () => {
  localStorage.removeItem("user");
  navigate('/signin');
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-white border-bottom shadow-sm">
      <div className="container">
        
        {/* BRAND / LOGO */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="brand-text" style={{ color: '#5c3d2e', fontWeight: 'bold' }}>
            Zuri Crafters
          </span>
        </Link>

        {/* THE TOGGLER (Mobile Only) */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#zuriNavContent" 
          aria-controls="zuriNavContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          {/* This is the 3-bar hamburger icon */}
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* COLLAPSIBLE LINKS */}
        <div className="collapse navbar-collapse" id="zuriNavContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/addproducts">Add craft</Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link" to="/checkout">Checkout</Link>
              </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign up</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/ratings">Rate us</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to="/chatbot">Help</Link>
            </li>
          </ul>

          {/* SIGN IN BUTTON */}
          <div className="d-flex justify-content-center align-items-center gap-2 mt-3 mt-lg-0">

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
      <span 
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      >
        {cartCount}
      </span>
    )}
  </button>

  {user ? (
    <>
      <span style={{ fontWeight: "500" }}>
        Welcome, {user?.name ||user.username}
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
      onClick={() => navigate('/signin')}
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