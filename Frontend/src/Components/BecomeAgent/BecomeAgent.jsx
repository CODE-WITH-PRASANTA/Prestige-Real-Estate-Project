import React, { useEffect, useRef } from "react";
import "./BecomeAgent.css";
import building from "../../assets/cta-building.png";

export default function BecomeAgent() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".ba-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ba-active");
          }
        });
      },
      { threshold: 0.18 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="ba" ref={sectionRef}>
      <div className="ba-wrap">
        <span className="ba-slab ba-slab1" aria-hidden="true" />
        <span className="ba-slab ba-slab2" aria-hidden="true" />

        <span className="ba-dot ba-dot1" aria-hidden="true" />
        <span className="ba-dot ba-dot2" aria-hidden="true" />

        <div className="ba-content">
          <h2 className="ba-reveal">
            Become a Real Estate Agent
          </h2>

          <p className="ba-reveal ba-delay-1">
            At Dream Estate, we provide the tools, training, and support you
            need to succeed in the competitive real estate market.
          </p>
        </div>

        <div className="ba-right">
          <a className="ba-btn ba-reveal ba-delay-2" href="#register">
            Register Now
          </a>

          <div className="ba-building ba-reveal ba-delay-3" aria-hidden="true">
            <img src={building} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}