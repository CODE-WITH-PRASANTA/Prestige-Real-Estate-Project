// PromoCards.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./PromoCards.css";

import img1 from "../../assets/promo1.jpg";
import img2 from "../../assets/promo2.jpg";
import img3 from "../../assets/promo3.jpg";

export default function PromoCards() {
  const items = [
    {
      id: 1,
      img: img1,
      title: "Buy Properties",
      subtitle:
        "Discover premium homes, apartments, and investment properties in top locations.",
      path: "/buyproperties",
      badge: "For Buyers",
    },

    {
      id: 2,
      img: img2,
      title: "Rent Property",
      subtitle:
        "Find modern rental spaces that match your lifestyle and budget perfectly.",
      path: "/rent/property",
      badge: "For Rent",
    },

    {
      id: 3,
      img: img3,
      title: "Post Property",
      subtitle:
        "List your property and connect with thousands of genuine buyers & tenants.",
      path: "/property",
      badge: "For Owners",
    },
  ];

  return (
    <section className="premiumPromo">
      {/* HEADER */}
      <div className="premiumPromo-header">
        <span className="premiumPromo-tag">REAL ESTATE SERVICES</span>

        <h2>
          Discover Smart Ways To <br />
          Buy, Rent & Sell Properties
        </h2>

        <p>
          Experience a modern property platform designed to help you explore,
          rent, buy, and post properties with complete confidence.
        </p>
      </div>

      {/* CARDS */}
      <div className="premiumPromo-grid">
        {items.map((item) => (
          <div className="premiumCard" key={item.id}>
            {/* IMAGE */}
            <div className="premiumCard-imageWrap">
              <img src={item.img} alt={item.title} className="premiumCard-img" />

              <div className="premiumCard-overlay"></div>

              <span className="premiumCard-badge">{item.badge}</span>
            </div>

            {/* CONTENT */}
            <div className="premiumCard-content">
              <h3>{item.title}</h3>

              <p>{item.subtitle}</p>

              <Link to={item.path} className="premiumCard-btn">
                Read More
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}