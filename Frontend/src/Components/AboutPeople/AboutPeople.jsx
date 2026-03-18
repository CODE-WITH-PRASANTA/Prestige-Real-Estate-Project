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
          We Connect Building With People
        </h2>

        <p className="aboutPeople-text">
          We believe in more than just property transactions—we believe in creating
          meaningful connections. "We Connect Building With People" represents our
          mission to bridge the gap between spaces and those who bring them to life.
          Whether you're searching for a dream home, an office space, or a real estate
          investment, our platform makes it easier to discover the right fit. With
          trusted listings, expert support, and seamless technology, we help you turn
          structures into stories, and buildings into belonging.
        </p>

        <div className="aboutPeople-gallery">

          <div className="aboutPeople-card">
            <img src={img1} alt="Interior 1" />
          </div>

          <div className="aboutPeople-card">
            <img src={img2} alt="Interior 2" />
          </div>

          <div className="aboutPeople-card">
            <img src={img3} alt="Interior 3" />
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutPeople;