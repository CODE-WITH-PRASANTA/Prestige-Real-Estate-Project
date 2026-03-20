import React from "react";
import "./AboutBreadcrum.css";
import { Link } from "react-router-dom";

import building from "../../assets/breadcrumb-bg-03.webp";
import shape1 from "../../assets/breadcrumb-bg-01.webp";
import shape2 from "../../assets/breadcrumb-bg-02.webp";

const AboutBreadcrum = ({ title }) => {
  return (
    <div className="aboutbreadcrum">

      {/* Decorative Shapes */}
      <img
        src={shape1}
        alt="shape"
        className="aboutbreadcrum-shape aboutbreadcrum-shape1"
      />

      <img
        src={shape2}
        alt="shape"
        className="aboutbreadcrum-shape aboutbreadcrum-shape2"
      />

      {/* Building Image */}
      <img
        src={building}
        alt="building"
        className="aboutbreadcrum-building"
      />

      <div className="aboutbreadcrum-container">

        <h1>AboutUs</h1>

        <div className="aboutbreadcrum-path">
          <Link to="/">Home</Link>
          <span className="arrow">›Aboutus</span>
          <p>{title}</p>
        </div>

      </div>

    </div>
  );
};

export default AboutBreadcrum;