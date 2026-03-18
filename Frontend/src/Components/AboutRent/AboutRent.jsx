import React, { useEffect, useState } from "react";
import "./AboutRent.css";
import mainImg from "../../assets/interior1.webp"; // 🔁 replace with your image

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

  return <h2>{count}</h2>;
};

const AboutRent = () => {
  const [openVideo, setOpenVideo] = useState(false);

  return (
    <section className="AboutRent">

      <div className="AboutRent-container">

        {/* LEFT */}
        <div className="AboutRent-left">

          <h1>
            We are the leaders in <br />
            sell and rent houses.
          </h1>

          <p className="AboutRent-desc">
            Sed ut <b>perspiciatis unde omnis</b> iste natus error sit voluptatem accusantium doloremque laudan explicabo.
            <b> Nemo enim ipsam</b> voluptatem quia voluptas sit aspernatur aut <b>odit aut fugit</b>.
          </p>

          <p className="AboutRent-sub">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>

        </div>

        {/* RIGHT IMAGE */}
        <div className="AboutRent-right">

          <img src={mainImg} alt="house" />

          <div
            className="AboutRent-play"
            onClick={() => setOpenVideo(true)}
          >
            ▶
          </div>

        </div>

      </div>

      {/* COUNTERS */}
      <div className="AboutRent-stats">

        <div className="AboutRent-card">
          <Counter end={820} />
          <p>Modern Properties</p>
        </div>

        <div className="AboutRent-card">
          <Counter end={145} />
          <p>Experience Agents</p>
        </div>

        <div className="AboutRent-card">
          <Counter end={535} />
          <p>Happy Clients</p>
        </div>

        <div className="AboutRent-card">
          <Counter end={35} />
          <p>Years Of Experience</p>
        </div>

      </div>

      {/* VIDEO MODAL */}
      {openVideo && (
        <div className="AboutRent-modal" onClick={() => setOpenVideo(false)}>
          <div className="AboutRent-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/ysz5S6PUM-U"
              title="YouTube video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </section>
  );
};

export default AboutRent;