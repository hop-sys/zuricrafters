import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you use routing
import '../css/Footer.css';

const Footer = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if(email.includes('@')){
            setStatus("Karibu! You're in the Zuri Inner Circle.");
            setEmail("");
            // Add your AlwaysData API call here later
            setTimeout(() => setStatus(""), 4000);
        } else {
            setStatus("Please enter a valid email address.");
        }
    };

    return (
        <footer className="zuri-footer py-5 mt-5">
            <div className="container">
                <div className="row justify-content-between g-5">
                    
                    {/* Column 1: Brand & Modern Sitemap */}
                    <div className="col-lg-5 col-md-12 text-center text-lg-start">
                        <div className="footer-brand mb-4">
                            <h2 className="mb-2">Zuri Crafters</h2>
                            <p className="text-cream small">Nairobi • Artisan Heritage • Since 2026</p>
                        </div>
                        
                        <div className="row g-4 justify-content-center justify-content-lg-start">
                            <div className="col-6 col-md-4">
                                <h6 className="footer-heading">Collections</h6>
                                <ul className="list-unstyled footer-links">
                                    <li><Link to="/kiondo">Kiondo Totes</Link></li>
                                    <li><Link to="/jewelry">Artisan Jewelry</Link></li>
                                    <li><Link to="/beadwork">Maasai Beadwork</Link></li>
                                </ul>
                            </div>
                            <div className="col-6 col-md-4">
                                <h6 className="footer-heading">Zuri Studio</h6>
                                <ul className="list-unstyled footer-links">
                                    <li><Link to="#about">Our Story</Link></li>
                                    <li><Link to="#contact">Contact Us</Link></li>
                                    <li><Link to="/shipping">Shipping Policy</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: The Unique Form & Connect */}
                    <div className="col-lg-6 col-md-12 text-center text-lg-start">
                        <div className="footer-signup-box p-4 p-lg-5 rounded-4">
                            <h4 className="mb-3 text-cream">Join The Inner Circle</h4>
                            <p className="small text-faded-cream mb-4">
                                Be the first to know about exclusive new craft drops, 
                                artisan stories, and intimate pop-up events in Nairobi.
                            </p>
                            
                            <form onSubmit={handleSubscribe} className="footer-signup-form">
                                {status && <p className="text-cream small mb-2">{status}</p>}
                                <div className="d-flex flex-column flex-sm-row gap-2">
                                    <input 
                                        type="email" 
                                        className="form-control zuri-input py-2 text-center text-sm-start" 
                                        placeholder="Your email address..." 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <button type="submit" className="btn btn-primary zuri-signup-btn py-2 px-4 flex-shrink-0">
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Social Connectivity */}
<div className="footer-socials mt-4 d-flex justify-content-center justify-content-lg-start gap-3">
    <a href="https://instagram.com/zuricrafters" target="_blank" rel="noreferrer" className="social-icon-link">
        <i className="bi bi-instagram"></i>
    </a>
    <a href="https://wa.me/254XXXXXXXXX" target="_blank" rel="noreferrer" className="social-icon-link">
        <i className="bi bi-whatsapp"></i>
    </a>
    <a href="https://facebook.com/zuricrafters" target="_blank" rel="noreferrer" className="social-icon-link telegram-hover">
        <i className="bi bi-telegram"></i>
    </a>
</div>
                        
                        <div className="mt-4 text-center text-lg-start">
                            <div className="brand-details d-flex gap-4 justify-content-center justify-content-lg-start">
                                <div className="detail-item"><i className="bi bi-geo-alt-fill me-1"></i> Studio • Nairobi, Kenya</div>
                                <div className="detail-item"><i className="bi bi-patch-check-fill me-1"></i> Artisan Certified</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
            <div className="container-fluid border-top mt-5 pt-4 text-center border-faded">
                <p className="mb-0 small text-cream-faded">© 2026 Zuri Crafters. All rights reserved. Designed in Nairobi.</p>
            </div>
        </footer>
    );
};

export default Footer;