import React from "react";
import "./RentpropertiesStats.css";

const RentpropertiesStats = ({ property }) => {

  return (
    <div className="rent-stats-grid">

      <div className="stat-card">
        🛏 {property.bedrooms} Bedrooms
      </div>

      <div className="stat-card">
        🛁 {property.bathrooms} Bathrooms
      </div>

      <div className="stat-card">
        📐 {property.sqft} sqft
      </div>

      <div className="stat-card">
        🚗 {property.parking}
      </div>

      <div className="stat-card">
        🌇 {property.balcony}
      </div>

    </div>
  );
};

export default RentpropertiesStats;