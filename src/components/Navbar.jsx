import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Ensure you have run: npm install bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

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
              <Link className="nav-link" to="/addproducts">Add products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/makepayment">Make payment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign up</Link>
            </li>
          </ul>

          {/* SIGN IN BUTTON */}
          <div className="d-flex justify-content-center mt-3 mt-lg-0">
            <button 
              className="btn btn-signin" 
              onClick={() => navigate('/signin')}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;