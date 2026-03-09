import React, { useState } from "react";
import "./HowItWorks.css";

function HowItWorks() {

  const steps = [
    {
      title: "01. Search for Location",
      text: "Find properties by location quickly, matching your lifestyle and preferences easily."
    },
    {
      title: "02. Select Property Type",
      text: "Choose your ideal property type easily, from apartments to villas."
    },
    {
      title: "03. Book your Property",
      text: "Secure your dream property quickly with a simple, hassle-free booking process."
    }
  ];

  const [page, setPage] = useState(0);

  return (
    <section className="how">

      <h2 className="how-title">How It Works</h2>

      <div className="title-line">
        <span></span>
      </div>

      <p className="subtitle">
        Follow these simple steps to find your dream property
      </p>

      {/* SLIDER WRAPPER */}
      <div className="how-slider">

        <div
          className="how-track"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >

          {steps.map((item, index) => (
            <div className="card" key={index}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}

        </div>

      </div>

      {/* PAGINATION DOTS */}

      <div className="how-dots">
        {steps.map((_, i) => (
          <button
            key={i}
            className={`how-dot ${page === i ? "active" : ""}`}
            onClick={() => setPage(i)}
          />
        ))}
      </div>

    </section>
  );
}

export default HowItWorks;