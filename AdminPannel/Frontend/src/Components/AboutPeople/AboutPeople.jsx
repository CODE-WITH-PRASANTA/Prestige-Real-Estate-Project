import React from "react";
import "./AboutPeople.css";

import img1 from "../../assets/about-us-01.webp";
import img2 from "../../assets/about-us-02.webp";
import img3 from "../../assets/about-us-03.webp";

const AboutPeople = () => {
  return (
    <section className="aboutPeople-section">
      <div className="aboutPeople-container">

        <h2 className="aboutPeople-title">
          Connecting People with Spaces That Feel Like Home
        </h2>

        <p className="aboutPeople-text">
          At Prestige Real Estate Properties, we understand that buying a property is not just a transaction—it's an emotional journey. Whether you're looking for your first home, upgrading to a better lifestyle, or investing in a promising real estate opportunity in India, we are here to guide you every step of the way.
          <br /><br />
          Our goal is simple: to help you find a space that matches your lifestyle, your dreams, and your future plans. With carefully selected residential and commercial properties, verified listings, and expert support, we make property buying and selling transparent and hassle-free.
          <br /><br />
          From modern apartments to premium villas and commercial spaces, Prestige Real Estate Properties brings you options that combine comfort, quality, and long-term value. We don’t just deal in properties—we help you find a place you can truly call your own.
        </p>

        <div className="aboutPeople-gallery">

          <div className="aboutPeople-card">
            <img src={img1} alt="Modern apartment interior - Prestige Real Estate Properties" />
          </div>

          <div className="aboutPeople-card">
            <img src={img2} alt="Luxury villa living space - Prestige Real Estate India" />
          </div>

          <div className="aboutPeople-card">
            <img src={img3} alt="Premium office space design - Real estate investment India" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutPeople;