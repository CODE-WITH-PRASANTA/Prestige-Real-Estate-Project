import React from "react";
import "./RentPropertyBreadcrumb.css";

import bg from "../../assets/breadcumb-bg.webp";

const RentPropertyBreadcrumb = ({ title = "Rent Property" }) => {
  return (
    <section
      className="RentPropertyBreadcrumb"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* OVERLAY */}
      <div className="RentPropertyBreadcrumb-overlay"></div>

      {/* SHAPES */}
      <div className="RentPropertyBreadcrumb-shape top-left"></div>
      <div className="RentPropertyBreadcrumb-shape bottom-right"></div>

      <div className="RentPropertyBreadcrumb-container">
        <h1>{title}</h1>

        <div className="RentPropertyBreadcrumb-path">
          <span>Home</span>
          <span className="arrow">→</span>
          <span className="active">{title}</span>
        </div>
      </div>
    </section>
  );
};

export default RentPropertyBreadcrumb;