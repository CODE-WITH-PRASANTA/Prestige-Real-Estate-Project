import React from "react";
import "./FaqBreadcrumb.css";

import bg from "../../assets/breadcumb-bg.webp"; // 🔁 your main background


const FaqBreadcrumb = ({ title = "Team Details" }) => {
  return (
    <section
      className="Faq-Breadcrumb"
      style={{ backgroundImage: `url(${bg})` }}
    >

      {/* OVERLAY */}
      <div className="Faq-Breadcrumb-overlay"></div>

      {/* SHAPES */}
      <div className="Faq-Breadcrumb-shape top-left"></div>
      <div className="Faq-Breadcrumb-shape bottom-right"></div>

      <div className="Faq-Breadcrumb-container">

        <h1>FAQ</h1>

        <div className="Faq-Breadcrumb-path">
          <span>Home</span>
          <span className="arrow">→</span>
          <span className="active">FAQ</span>
        </div>

      </div>

    </section>
  );
};

export default FaqBreadcrumb;