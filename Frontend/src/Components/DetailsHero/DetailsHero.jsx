import React from "react";
import "./DetailsHero.css";
import {
  FaStar,
  FaMapMarkerAlt,
  FaHeart,
  FaRegBookmark,
  FaExchangeAlt,
} from "react-icons/fa";

const DetailsHero = () => {
  return (
    <section className="detailsHero">
      <div className="detailsHero-overlay"></div>

      <div className="detailsHero-container">
        <div className="detailsHero-content">
          <div className="detailsHero-badges">
            <span className="detailsHero-badge detailsHero-badgePrimary">
              Condo
            </span>
            <span className="detailsHero-badge detailsHero-badgeSecondary">
              For Rent
            </span>
          </div>

          <h1 className="detailsHero-title">Beautiful Condo Room</h1>

          <div className="detailsHero-meta">
            <div className="detailsHero-rating">
              <span className="detailsHero-stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </span>
              <span className="detailsHero-ratingValue">5.0</span>
            </div>

            <span className="detailsHero-dot">•</span>

            <div className="detailsHero-location">
              <FaMapMarkerAlt />
              <span>318-330 S Oakley Blvd, Chicago, IL 60612, USA</span>
            </div>

            <a href="/" className="detailsHero-link">
              View Location
            </a>

            <span className="detailsHero-dot">•</span>

            <div className="detailsHero-updated">
              Last Updated on : 24 Feb 2025
            </div>
          </div>

          <div className="detailsHero-actions">
            <div className="detailsHero-actionButtons">
              <button className="detailsHero-actionBtn" type="button">
                <FaHeart />
              </button>

              <button className="detailsHero-actionBtn" type="button">
                <FaRegBookmark />
              </button>

              <button className="detailsHero-actionBtn" type="button">
                <FaExchangeAlt />
              </button>
            </div>

            <div className="detailsHero-price">$400</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsHero;