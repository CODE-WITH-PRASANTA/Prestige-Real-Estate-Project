import React, { useEffect, useRef } from "react";
import "./Partners.css";

import memberstack from "../../assets/memberstack.png";
import payhere from "../../assets/payhere.png";
import headspace from "../../assets/headspace.png";
import livechat from "../../assets/livechat.png";

export default function Partners() {
  const sectionRef = useRef(null);

  const partners = [
    { id: 1, name: "Memberstack", img: memberstack },
    { id: 2, name: "Payhere", img: payhere },
    { id: 3, name: "Headspace", img: headspace },
    { id: 4, name: "LiveChat", img: livechat },
  ];

  const loop = [...partners, ...partners];

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".partners-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("partners-active");
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
    <section className="partners" ref={sectionRef}>
      <div className="partners-bg partners-bg-one"></div>
      <div className="partners-bg partners-bg-two"></div>

      <div className="partners-inner">
        <h2 className="partners-reveal">Hundreds of Partners Around the World</h2>
        <div className="partners-line partners-reveal partners-delay-1" />
        <p className="partners-reveal partners-delay-2">
          Every day, we build trust through communication, transparency, and results.
        </p>

        <div className="partners-slider partners-reveal partners-delay-3">
          <div className="partners-track">
            {loop.map((p, idx) => (
              <div
                className="partner-card"
                key={`${p.id}-${idx}`}
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <img src={p.img} alt={p.name} />
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}