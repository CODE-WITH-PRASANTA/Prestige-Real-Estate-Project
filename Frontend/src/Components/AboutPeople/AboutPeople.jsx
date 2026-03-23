import React, { useMemo, useState } from "react";
import "./AboutPeople.css";

import img1 from "../../assets/about-us-01.webp";
import img2 from "../../assets/about-us-02.webp";
import img3 from "../../assets/about-us-03.webp";

const AboutPeople = () => {
  const images = useMemo(
    () => [
      {
        id: 1,
        src: img1,
        alt: "Modern apartment interior - Prestige Real Estate Properties",
        title: "Modern Apartments",
      },
      {
        id: 2,
        src: img2,
        alt: "Luxury villa living space - Prestige Real Estate India",
        title: "Luxury Villas",
      },
      {
        id: 3,
        src: img3,
        alt: "Premium office space design - Real estate investment India",
        title: "Commercial Spaces",
      },
    ],
    []
  );

  const [current, setCurrent] = useState(0);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="aboutPeople-section">
      <div className="aboutPeople-blur aboutPeople-blurOne"></div>
      <div className="aboutPeople-blur aboutPeople-blurTwo"></div>

      <div className="aboutPeople-container">
        <div className="aboutPeople-top">
          <span className="aboutPeople-badge">About Our Spaces</span>

          <h2 className="aboutPeople-title">
            Connecting People with Spaces That <span>Feel Like Home</span>
          </h2>

          <p className="aboutPeople-text">
            At Prestige Real Estate Properties, we understand that buying a
            property is not just a transaction—it's an emotional journey.
            Whether you're looking for your first home, upgrading to a better
            lifestyle, or investing in a promising real estate opportunity in
            India, we are here to guide you every step of the way.
            <br />
            <br />
            Our goal is simple: to help you find a space that matches your
            lifestyle, your dreams, and your future plans. With carefully
            selected residential and commercial properties, verified listings,
            and expert support, we make property buying and selling transparent
            and hassle-free.
            <br />
            <br />
            From modern apartments to premium villas and commercial spaces,
            Prestige Real Estate Properties brings you options that combine
            comfort, quality, and long-term value. We don’t just deal in
            properties—we help you find a place you can truly call your own.
          </p>
        </div>

        {/* Desktop Gallery */}
        <div className="aboutPeople-gallery">
          {images.map((item) => (
            <div className="aboutPeople-card" key={item.id}>
              <img src={item.src} alt={item.alt} />
              <div className="aboutPeople-overlay">
                <h4>{item.title}</h4>
                <p>Premium property solutions for modern living</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile / Tablet Slider */}
        <div className="aboutPeople-slider">
          <div className="aboutPeople-sliderCard">
            <img src={images[current].src} alt={images[current].alt} />
            <div className="aboutPeople-overlay">
              <h4>{images[current].title}</h4>
              <p>Premium property solutions for modern living</p>
            </div>
          </div>

          <div className="aboutPeople-controls">
            <button
              className="aboutPeople-navBtn"
              onClick={prevSlide}
              aria-label="Previous image"
              type="button"
            >
              ←
            </button>

            <div className="aboutPeople-pagination">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`aboutPeople-dot ${
                    current === index ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  type="button"
                ></button>
              ))}
            </div>

            <button
              className="aboutPeople-navBtn"
              onClick={nextSlide}
              aria-label="Next image"
              type="button"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPeople;