import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Zuri Crafters</h2>
          <p>Celebrating African creativity, tradition and modern style.</p>
  <h3>Our Story</h3>
  <p>
    Every Zuri Crafters piece is handmade by skilled artisans,
    preserving African craftsmanship while blending tradition
    with modern style.
  </p>
  <h3>African Identity</h3>
  <p>
    Inspired by African culture, colors and heritage,
    our crafts celebrate creativity from across the continent.
  </p>
  <h3>Why Choose Us</h3>
  <p> Handmade with care</p>
  <p> Authentic African designs</p>
  <p> Secure payment options</p>
  </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/addproducts">Add Products</a>
          <a href="/makepayment">Make Payment</a>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: zuricrafters@gmail.com</p>
          <p>Phone: +254 700 000 000</p>
          <p>Nairobi, Kenya</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Zuri Crafters. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;