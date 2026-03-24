import React from 'react';
import '../css/Aboutus.css';

const Aboutus = () => {
  return (
    <section className="about-section py-5" id="about">
      <div className="container">
        <div className="row align-items-center">
          
          {/* Left Side: The Interactive Image */}
          <div className="col-lg-5 text-center mb-4 mb-lg-0">
            <div className="about-image-wrapper">
              <img 
                src="/images/potrait2.jpg" 
                alt="Zuri Crafters Artisan" 
                className="luxury-circle-about img-fluid"
              />
              <div className="experience-badge">
                <span>Est.</span>
                <strong>2026</strong>
              </div>
            </div>
          </div>

          {/* Right Side: The Story */}
          <div className="col-lg-7 ps-lg-5">
            <h6 className="text-uppercase ls-2 mb-2 brand-gold">Our Heritage</h6>
            <h2 className="display-5 mb-4 brand-brown">Crafting Elegance from Within</h2>
            <p className="lead text-muted mb-4">
              Zuri Crafters began with a simple vision: to bridge the gap between 
              traditional Kenyan artistry and modern luxury. 
            </p>
            <p className="about-text mb-4">
              From the intricate patterns of our hand-woven <strong>Kiondo Totes</strong> to 
              the curated notes of our upcoming <strong>Nukato</strong> perfume line, every 
              piece is a testament to the skill of our local artisans. We believe that 
              true luxury lies in the story behind the product—the hands that wove it, 
              and the culture that inspired it.
            </p>
            
            <div className="about-features d-flex gap-4">
              <div className="feature-item">
                <i className="bi bi-patch-check-fill mb-2"></i>
                <p>Authentic Heritage</p>
              </div>
              <div className="feature-item">
                <i className="bi bi-droplet-fill mb-2"></i>
                <p>Premium Essence</p>
              </div>
              <div className="feature-item">
                <i className="bi bi-people-fill mb-2"></i>
                <p>Community Led</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Aboutus;