import React, { useEffect, useRef, useState } from "react";
import "./HowItWorks.css";

function HowItWorks() {
  const sectionRef = useRef(null);

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll(".how-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("how-active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="how" ref={sectionRef}>
      <div className="how-bg-shape how-bg-shape-1"></div>
      <div className="how-bg-shape how-bg-shape-2"></div>

      <h2 className="how-title how-reveal">
        How It Works – Prestige Real Estate Project
      </h2>

      <div className="title-line how-reveal how-delay-1">
        <span></span>
      </div>

      <p className="subtitle how-reveal how-delay-2">
        Finding your dream home doesn’t have to be complicated. At Prestige Real Estate Project,
        we have designed a simple and transparent process to help you search, compare, and book
        properties across India with ease.
      </p>

      <div className="how-slider how-reveal how-delay-3">
        <div
          className="how-track"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {steps.map((item, index) => (
            <div
              className="card"
              key={index}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="card-glow"></div>
              <div className="card-number">0{index + 1}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="how-dots how-reveal how-delay-4">
        {steps.map((_, i) => (
          <button
            key={i}
            className={`how-dot ${page === i ? "active" : ""}`}
            onClick={() => setPage(i)}
            type="button"
            aria-label={`Go to step ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;