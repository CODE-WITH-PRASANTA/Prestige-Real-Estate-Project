import React, { useEffect, useRef } from "react";
import "./Stats.css";

export default function Stats() {
  const sectionRef = useRef(null);

  const data = [
    { id: 1, num: "50K", text: "Listings Added", icon: "📋" },
    { id: 2, num: "3000+", text: "Agents Listed", icon: "👥" },
    { id: 3, num: "2000+", text: "Sales Completed", icon: "📈" },
    { id: 4, num: "5000+", text: "Users", icon: "⭐" }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll(".stats-reveal");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("stats-active");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" ref={sectionRef}>
      <div className="stats-bg stats-bg-one"></div>
      <div className="stats-bg stats-bg-two"></div>

      <div className="stats-container">
        {data.map((item, index) => (
          <div
            className={`stats-card stats-reveal stats-delay-${index + 1}`}
            key={item.id}
          >
            <div className="stats-icon">{item.icon}</div>

            <div className="stats-content">
              <h2>{item.num}</h2>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}