import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Notfound.css'; // create this CSS file for styling

const NotFound = () => {
  return (
    <div className="notfound-wrapper d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="notfound-code mb-3">404</h1>
      <h2 className="notfound-title mb-3">Page Not Found</h2>
      <p className="notfound-message mb-4">
        Oops! The page you’re looking for doesn’t exist.  
        Explore our crafts or go back home.
      </p>
      <Link to="/" className="btn btn-primary notfound-btn px-4 py-2">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;