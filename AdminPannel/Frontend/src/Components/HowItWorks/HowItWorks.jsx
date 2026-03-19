import React, { useState } from "react";
import "./HowItWorks.css";

function HowItWorks() {

  const steps = [
    {
      title: "01. Search by Location",
      text: "Start your journey with Prestige Real Estate Project by exploring properties in your preferred city or neighbourhood. Whether you are looking for a peaceful residential area or a prime city location, we make your search simple and quick."
    },
    {
      title: "02. Choose Your Property",
      text: "Browse a wide range of carefully selected homes including modern apartments, luxury villas, and budget-friendly options. Compare features, pricing, and amenities to find a property that fits your lifestyle and budget."
    },
    {
      title: "03. Book with Confidence",
      text: "Once you find the right property, secure it easily with our smooth booking process. Our team ensures transparency, proper guidance, and complete support from enquiry to final booking."
    }
  ];

  const [page, setPage] = useState(0);

  return (
    <section className="how">

      {/* SEO Heading */}
      <h2 className="how-title">
        How It Works – Prestige Real Estate Project
      </h2>

      <div className="title-line">
        <span></span>
      </div>

      {/* SEO Description */}
      <p className="subtitle">
        Finding your dream home doesn’t have to be complicated. At Prestige Real Estate Project, 
        we have designed a simple and transparent process to help you search, compare, and book 
        properties across India with ease.
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