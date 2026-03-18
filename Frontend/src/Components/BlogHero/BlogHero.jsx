import React from "react";
import "./BlogHero.css";

import bg from "../../assets/breadcumb-bg.webp"; // 🔁 your main background


const BlogHero = ({ title = "Team Details" }) => {
  return (
    <section
      className="Blog-hero"
      style={{ backgroundImage: `url(${bg})` }}
    >

      {/* OVERLAY */}
      <div className="Blog-hero-overlay"></div>

      {/* SHAPES */}
      <div className="Blog-hero-shape top-left"></div>
      <div className="Blog-hero-shape bottom-right"></div>

      <div className="Blog-hero-container">

        <h1>Home</h1>

        <div className="Blog-hero-path">
          <span>Home</span>
          <span className="arrow">→</span>
          <span className="active">Blog</span>
        </div>

      </div>

    </section>
  );
};

export default BlogHero;