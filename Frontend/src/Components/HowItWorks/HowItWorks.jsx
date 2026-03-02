import React from "react";
import "./HowItWorks.css";

function HowItWorks() {
  return (
    <section className="how">

      {/* ===== TITLE ===== */}
      <h2 className="how-title">How It Works</h2>

      <div className="title-line">
        <span></span>
      </div>

      <p className="subtitle">
        Follow these simple steps to find your dream property
      </p>

      {/* ===== CARDS ===== */}
      <div className="how-grid">

        <div className="card">
          <h3>01. Search for Location</h3>
          <p>
            Find properties by location quickly, matching your lifestyle and
            preferences easily.
          </p>
        </div>

        <div className="card">
          <h3>02. Select Property Type</h3>
          <p>
            Choose your ideal property type easily, from apartments to villas.
          </p>
        </div>

        <div className="card">
          <h3>03. Book your Property</h3>
          <p>
            Secure your dream property quickly with a simple, hassle-free
            booking process.
          </p>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;  