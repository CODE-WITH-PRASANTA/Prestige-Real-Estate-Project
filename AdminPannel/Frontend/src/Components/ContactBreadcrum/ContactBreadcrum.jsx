import React from "react";
import "./ContactBreadcrum.css";

import bg from "../../assets/breadcumb-bg.webp"; // 🔁 your main background


const ContactBreadcrum = ({ title = "Team Details" }) => {
  return (
    <section
      className="contact-Breadcrumb"
      style={{ backgroundImage: `url(${bg})` }}
    >

      {/* OVERLAY */}
      <div className="contact-Breadcrumb-overlay"></div>

      {/* SHAPES */}
      <div className="contact-Breadcrumb-shape top-left"></div>
      <div className="contact-Breadcrumb-shape bottom-right"></div>

      <div className="contact-Breadcrumb-container">

        <h1>Contact</h1>

        <div className="contact-Breadcrumb-path">
          <span>Home</span>
          <span className="arrow">→</span>
          <span className="active">Contact</span>
        </div>

      </div>

    </section>
  );
};

export default ContactBreadcrum;