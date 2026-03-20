import React from "react";
import "./GridHome.css";
import { FaHome, FaChevronRight } from "react-icons/fa";

const GridHome = () => {
  return (
    <section className="gridHome">
      <div className="gridHome-overlay"></div>

      {/* decorative animated shapes */}
      <span className="gridHome-shape gridHome-shapeOne"></span>
      <span className="gridHome-shape gridHome-shapeTwo"></span>
      <span className="gridHome-shape gridHome-shapeThree"></span>
      <span className="gridHome-shape gridHome-shapeFour"></span>

      {/* line building effect */}
      <div className="gridHome-buildings">
        <span className="gridHome-building gridHome-buildingOne"></span>
        <span className="gridHome-building gridHome-buildingTwo"></span>
        <span className="gridHome-building gridHome-buildingThree"></span>
      </div>

      <div className="gridHome-container">
        <h1 className="gridHome-title">Buy Grid</h1>

        <div className="gridHome-breadcrumb">
          <a href="/" className="gridHome-breadcrumbLink">
            <FaHome className="gridHome-homeIcon" />
            <span>Home</span>
          </a>

          <FaChevronRight className="gridHome-arrow" />

          <span className="gridHome-current">Buy Grid</span>
        </div>
      </div>
    </section>
  );
};

export default GridHome;