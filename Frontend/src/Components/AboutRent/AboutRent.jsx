import React, { useEffect, useState } from "react";
import "./AboutRent.css";
import mainImg from "../../assets/interior1.webp";

const Counter = ({ end, suffix = "+" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1800;
    const stepTime = 20;
    const increment = end / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <h2>
      {count}
      {suffix}
    </h2>
  );
};

const AboutRent = () => {
  const [openVideo, setOpenVideo] = useState(false);

  return (
    <section className="AboutRent">
      <div className="AboutRent-bg-shape shape-one"></div>
      <div className="AboutRent-bg-shape shape-two"></div>

      <div className="AboutRent-container">
        {/* LEFT */}
        <div className="AboutRent-left">
          <span className="AboutRent-tag">About Our Company</span>

          <h1>
            Trusted Property Partner for{" "}
            <span>Buying, Selling & Renting</span> Homes
          </h1>

          <p className="AboutRent-desc">
            At <b>Prestige Real Estate Project</b>, we help families and
            individuals find the right property without stress. Whether you are
            looking to buy your dream home, sell your property at the right
            price, or find a rental that suits your lifestyle, our experienced
            team is here to guide you at every step.
          </p>

          <p className="AboutRent-sub">
            With deep knowledge of local markets across India, verified
            listings, and transparent dealings, we make property decisions
            simple, safe, and reliable. Our focus is not just on transactions,
            but on building long-term trust with every client we serve.
          </p>

          <div className="AboutRent-featureWrap">
            <div className="AboutRent-feature">
              <div className="AboutRent-featureIcon">✓</div>
              <div>
                <h4>Verified Listings</h4>
                <p>Only trusted and carefully checked properties.</p>
              </div>
            </div>

            <div className="AboutRent-feature">
              <div className="AboutRent-featureIcon">★</div>
              <div>
                <h4>Premium Support</h4>
                <p>Professional guidance from search to final deal.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="AboutRent-right">
          <div className="AboutRent-imageBox">
            <img
              src={mainImg}
              alt="Modern home interior - Prestige Real Estate Project"
            />

            <div
              className="AboutRent-play"
              onClick={() => setOpenVideo(true)}
              aria-label="Play property video"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setOpenVideo(true);
                }
              }}
            >
              <span>▶</span>
            </div>

            <div className="AboutRent-floatingCard">
              <h3>25K+</h3>
              <p>Properties Viewed Monthly</p>
            </div>
          </div>
        </div>
      </div>

      {/* COUNTERS */}
      <div className="AboutRent-stats">
        <div className="AboutRent-card">
          <Counter end={820} />
          <p>Verified Properties Listed</p>
        </div>

        <div className="AboutRent-card">
          <Counter end={145} />
          <p>Professional Property Experts</p>
        </div>

        <div className="AboutRent-card">
          <Counter end={535} />
          <p>Happy Homeowners & Tenants</p>
        </div>

        <div className="AboutRent-card">
          <Counter end={35} />
          <p>Years of Industry Experience</p>
        </div>
      </div>

      {/* VIDEO MODAL */}
      {openVideo && (
        <div
          className="AboutRent-modal"
          onClick={() => setOpenVideo(false)}
        >
          <div
            className="AboutRent-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="AboutRent-close"
              onClick={() => setOpenVideo(false)}
              aria-label="Close video"
            >
              ✕
            </button>

            <iframe
              width="100%"
              height="430"
              src="https://www.youtube.com/embed/ysz5S6PUM-U"
              title="Prestige Real Estate Property Overview"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutRent;