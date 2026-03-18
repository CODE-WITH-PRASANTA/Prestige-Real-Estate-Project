import React, { useEffect, useState } from "react";
import "./AboutRent.css";
import mainImg from "../../assets/interior1.webp";

const Counter = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 20);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [end]);

  return <h2>{count}+</h2>;
};

const AboutRent = () => {
  const [openVideo, setOpenVideo] = useState(false);

  return (
    <section className="AboutRent">

      <div className="AboutRent-container">

        {/* LEFT */}
        <div className="AboutRent-left">

          <h1>
            Trusted Property Partner for Buying, Selling & Renting Homes
          </h1>

          <p className="AboutRent-desc">
            At <b>Prestige Real Estate Project</b>, we help families and individuals
            find the right property without stress. Whether you are looking to buy
            your dream home, sell your property at the right price, or find a rental
            that suits your lifestyle, our experienced team is here to guide you at
            every step.
          </p>

          <p className="AboutRent-sub">
            With deep knowledge of local markets across India, verified listings,
            and transparent dealings, we make property decisions simple, safe, and
            reliable. Our focus is not just on transactions, but on building long-term
            trust with every client we serve.
          </p>

        </div>

        {/* RIGHT IMAGE */}
        <div className="AboutRent-right">
          <img src={mainImg} alt="Modern home interior - Prestige Real Estate Project" />

          <div
            className="AboutRent-play"
            onClick={() => setOpenVideo(true)}
            aria-label="Play property video"
          >
            ▶
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
            <iframe
              width="100%"
              height="400"
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