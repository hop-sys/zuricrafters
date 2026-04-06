import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Footer.css';

const Footer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);

      const response = await fetch('http://hope.alwaysdata.net/api/footer_form', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus(data.error || "Something went wrong.");
      }
    } catch (error) {
      setStatus("Server is offline. Try again later.");
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(""), 5000);
    }
  };

  return (
    <footer className="zuri-footer py-5 mt-5">
      <div className="container">
        <div className="row justify-content-between g-5">

          {/* Left side: logo + links */}
          <div className="col-lg-5 col-md-12 text-center text-lg-start">
            <div className="footer-brand mb-4">
              <h2 className="mb-2">Zuri Crafters</h2>
              <p className="text-cream small">Nairobi • Artisan Heritage • Since 2026</p>
            </div>

            <div className="row g-4 justify-content-center justify-content-lg-start">
              {/* Collections */}
              <div className="col-6 col-md-4">
                <h6 className="footer-heading">Collections</h6>
                <ul className="list-unstyled footer-links">
                  <li>
                    <NavLink to="/kiondo" className={({ isActive }) => isActive ? 'active-link' : ''}>
                      Kiondo Totes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/jewelry" className={({ isActive }) => isActive ? 'active-link' : ''}>
                      Artisan Jewelry
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/products" className={({ isActive }) => isActive ? 'active-link' : ''}>
                      Beadwork
                    </NavLink>
                  </li>
                </ul>
              </div>

              {/* Zuri Studio */}
              <div className="col-6 col-md-4">
                <h6 className="footer-heading">Zuri Studio</h6>
                <ul className="list-unstyled footer-links">
                  <li>
                    <NavLink to="/ourstory" className={({ isActive }) => isActive ? 'active-link' : ''}>
                      Our Story
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'active-link' : ''}>
                      Contact Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/aboutus" className={({ isActive }) => isActive ? 'active-link' : ''}>
                      About Us
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right side: newsletter form + social icons */}
          <div className="col-lg-6 col-md-12 text-center text-lg-start">
            <div className="footer-signup-box p-4 p-lg-5 rounded-4">
              <h4 className="mb-3 text-cream">Join The Inner Circle</h4>
              <p className="text-cream small mb-3">
                Be the first to know about exclusive new craft drops, artisan stories, and intimate pop-up events in Nairobi.
              </p>

              <form onSubmit={handleSubscribe} className="footer-signup-form">
                {status && <p className="text-cream small mb-2">{status}</p>}

                <input
                  type="text"
                  className="form-control zuri-input py-2 mb-2"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />

                <input
                  type="email"
                  className="form-control zuri-input py-2 mb-2"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />

                <textarea
                  className="form-control zuri-input py-2 mb-3"
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={loading}
                ></textarea>

                <button
                  type="submit"
                  className="btn btn-primary zuri-signup-btn py-2 px-4"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Subscribe"}
                </button>
              </form>

              <div className="d-flex mt-3 gap-3">
                <i className="bi bi-instagram"></i>
                <i className="bi bi-whatsapp"></i>
                <i className="bi bi-telegram"></i>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom line */}
        <div className="footer-bottom text-center mt-4 pt-4 border-top border-faded">
          <div className="d-flex justify-content-center gap-4 mb-2">
            <span className="brand-details detail-item">📍 Studio • Nairobi, Kenya</span>
            <span className="brand-details detail-item">✔ Artisan Certified</span>
          </div>
          <p className="text-cream small mb-0">&copy; 2026 Zuri Crafters. All rights reserved. Designed in Nairobi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;