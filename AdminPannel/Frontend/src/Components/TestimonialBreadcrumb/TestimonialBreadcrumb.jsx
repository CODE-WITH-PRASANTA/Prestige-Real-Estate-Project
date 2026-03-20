import React from "react";
import "./TestimonialBreadcrumb.css";

import bg from "../../assets/breadcumb-bg.webp"; // 🔁 your main background


const TestimonialBreadcrumb = ({ title = "Team Details" }) => {
  return (
    <section
      className="testimonial-Breadcrumb"
      style={{ backgroundImage: `url(${bg})` }}
    >

      {/* OVERLAY */}
      <div className="testimonial-Breadcrumb-overlay"></div>

      {/* SHAPES */}
      <div className="testimonial-Breadcrumb-shape top-left"></div>
      <div className="testimonial-Breadcrumb-shape bottom-right"></div>

      <div className="testimonial-Breadcrumb-container">

        <h1>Testimonial</h1>

        <div className="testimonial-Breadcrumb-path">
          <span>Home</span>
          <span className="arrow">→</span>
          <span className="active">Testimonial</span>
        </div>

      </div>

    </section>
  );
};

export default TestimonialBreadcrumb;