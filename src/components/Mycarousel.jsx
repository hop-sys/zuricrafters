import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const Mycarousel = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-11 mx-auto">
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
       
        {/* Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
        </div>

        {/* Slides */}
        <div className="carousel-inner">

          <div className="carousel-item active">
            <img
              src="/images/carousel3.png"
              className="d-block w-100"
              alt="First slide"
              height="450px"
            />
            <div className="carousel-caption d-none d-md-block bg-dark opacity-50">
              <h5>From traditional earth-dye techniques to your daily carry.</h5>
              <p>Every line tells a story. Our latest addition to the Zuri collection brings the ancient geometric art of Mudcloth into a modern silhouette..</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/images/carousel.png"
              className="d-block w-100"
              alt="Second slide"
              height="450px"
            />
            <div className="carousel-caption d-none d-md-block bg-dark opacity-50">
              <h5>Textures of the earth.</h5>
              <p>Bring the warmth of the Kenyan sun into your living space. Our woven collection isn't just about storage; it's about preserving a craft that has been passed down for generations.</p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/images/carousel2.png"
              className="d-block w-100"
              alt="Third slide"
              height="450px"
            />
            <div className="carousel-caption d-none d-md-block bg-dark opacity-50">
              <h5>We don't just sell art; we share stories.</h5>
              <p>At Zuri Crafters, we believe the process is just as beautiful as the product. Meet the talent bringing our vision to life in the heart of the workshop.</p>
            </div>
          </div>

        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>

      </div>
        </div>
      </div>
    </div>
  )
}

export default Mycarousel;