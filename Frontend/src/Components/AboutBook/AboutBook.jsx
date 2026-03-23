import React from "react";
import "./AboutBook.css";

import bgImage from "../../assets/about-us-04.webp";
import cardImage from "../../assets/c1.webp";

const AboutBook = () => {
  return (
    <section
      className="aboutBook-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="aboutBook-overlay">
        <div className="aboutBook-container">
          {/* LEFT SIDE */}
          <div className="aboutBook-left">
            <span className="aboutBook-badge">Book Your Dream Space</span>

            <h2 className="aboutBook-title">
              Ready to <span>Book a Place?</span>
            </h2>

            <p className="aboutBook-subtext">
              Find premium spaces that match your lifestyle, budget, and future
              plans with a smooth and trusted booking experience.
            </p>

            <div className="aboutBook-card">
              <img src={cardImage} alt="Property" />
              <div className="aboutBook-cardOverlay">
                <h4>Premium Verified Listings</h4>
                <p>Safe, modern, and trusted property booking solutions</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="aboutBook-right">
            <h3>
              Discover your dream property and secure your ideal space
              effortlessly with our seamless, fast, and hassle-free booking
              process today.
            </h3>

            <p>
              Explore a wide range of verified property listings tailored to
              match your lifestyle and budget. Whether you're seeking a
              luxurious apartment in the city or a cozy family home in the
              suburbs, our platform provides a seamless and reliable booking
              experience.
            </p>

            <p>
              Benefit from secure transactions, instant booking confirmations,
              and real-time updates. With user-friendly features and
              trustworthy listings, Prestige Real Estate makes it easy to find
              and secure your perfect space.
            </p>

            <p>
              With Prestige Real Estate, you gain access to premium properties
              and a user-friendly platform designed for convenience. Filter
              options help narrow your search by location, price, and amenities
              while staying informed with real-time updates.
            </p>

            <button className="aboutBook-btn" type="button">
              Explore Properties
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBook;