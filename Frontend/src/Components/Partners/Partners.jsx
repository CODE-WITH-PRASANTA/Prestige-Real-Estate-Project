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
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll(".partners-reveal");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("partners-active");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="partners" ref={sectionRef}>
      <div className="partners-bg partners-bg-one"></div>
      <div className="partners-bg partners-bg-two"></div>

      <div className="partners-inner">
        <h2 className="partners-reveal partners-delay-1">
          Hundreds of Partners Around the World
        </h2>

        <div className="partners-line partners-reveal partners-delay-2"></div>

        <p className="partners-reveal partners-delay-3">
          Every day, we build trust through communication, transparency, and
          results.
        </p>

        <div className="partners-slider partners-reveal partners-delay-4">
          <div className="partners-track">
            {loop.map((p, idx) => (
              <div
                className="partner-card"
                key={`${p.id}-${idx}`}
                style={{
                  animationDelay: `${0.12 + idx * 0.08}s, ${1.2 + idx * 0.12}s`,
                }}
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