import React from 'react';
import '../css/OurStory.css'; // Create this for the styles below

const OurStory = () => {
  return (
    <div className="story-container">
      <header className="story-header">
        <span className="subtitle">Nairobi • Since 2026</span>
        <h1>Our Story</h1>
      </header>

      <section className="story-content">
        <div className="story-text">
          <p>
            <strong>Zuri Crafters</strong> was born out of a deep love for the 
            textures and colors of Kenya. In Swahili, <em>Zuri</em> means beautiful—and 
            that beauty is found in the calloused hands of our weavers and the 
            visionary minds of our designers.
          </p>
          
          <p>
            Our journey started with the iconic <strong>Kiondo</strong>. We saw these 
            totes not just as bags, but as masterpieces of patience and skill. 
            From there, we expanded into <strong>Artisan Jewelry</strong> and 
            <strong>Traditional Beadwork</strong>, partnering directly with creators 
            from across the country to bring their work to a global stage.
          </p>

          <blockquote>
            "We aren't just selling crafts; we are preserving the heartbeat of 
            Kenyan heritage."
          </blockquote>

          <p>
            Today, based in the bustling energy of <strong>Nairobi</strong>, 
            Zuri Crafters stands as a bridge between generations. Every purchase 
            you make supports a sustainable livelihood for our artisans and keeps 
            the flame of traditional craftsmanship burning bright.
          </p>
        </div>
        
        <div className="story-image-placeholder">
          {/* You can replace this with a real image of a weaver or jewelry */}
          <div className="craft-overlay">Artisan Heritage</div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;