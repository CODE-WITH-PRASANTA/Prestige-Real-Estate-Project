import React from "react";
import "./BreadcrumbMain.css";

import bg from "../../assets/breadcumb-bg.webp"; // 🔁 your main background


const BreadcrumbMain = ({ title = "Team Details" }) => {
  return (
    <section
      className="BreadcrumbMain"
      style={{ backgroundImage: `url(${bg})` }}
    >

      {/* OVERLAY */}
      <div className="BreadcrumbMain-overlay"></div>

      {/* SHAPES */}
      <div className="BreadcrumbMain-shape top-left"></div>
      <div className="BreadcrumbMain-shape bottom-right"></div>

      <div className="BreadcrumbMain-container">

        <h1>Home</h1>

        <div className="BreadcrumbMain-path">
          <span>Home</span>
          <span className="arrow">→</span>
          <span className="active">About</span>
        </div>

      </div>

    </section>
  );
};

export default BreadcrumbMain;