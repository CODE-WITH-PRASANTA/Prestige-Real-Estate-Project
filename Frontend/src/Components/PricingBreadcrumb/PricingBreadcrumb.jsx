import React from "react";
import "./PricingBreadcrumb.css";

import bg from "../../assets/breadcumb-bg.webp"; // 🔁 your main background


const PricingBreadcrumb = ({ title = "Team Details" }) => {
  return (
    <section
      className="pricing-Breadcrumb"
      style={{ backgroundImage: `url(${bg})` }}
    >

      {/* OVERLAY */}
      <div className="pricing-Breadcrumb-overlay"></div>

      {/* SHAPES */}
      <div className="pricing-Breadcrumb-shape top-left"></div>
      <div className="pricing-Breadcrumb-shape bottom-right"></div>

      <div className="pricing-Breadcrumb-container">

        <h1>Pricing</h1>

        <div className="pricing-Breadcrumb-path">
          <span>Home</span>
          <span className="arrow">→</span>
          <span className="active">Pricing</span>
        </div>

      </div>

    </section>
  );
};

export default PricingBreadcrumb;