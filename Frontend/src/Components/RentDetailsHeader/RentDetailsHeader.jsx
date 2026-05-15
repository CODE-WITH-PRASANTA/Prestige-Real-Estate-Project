import React from "react";
import "./RentDetailsHeader.css";

const RentDetailsHeader = ({ property }) => {

  return (
    <div className="rent-header-card">

      <h1>{property.title}</h1>

      <p>{property.location}</p>

      <div className="rent-header-bottom">

        <span className="rent-price">
          ₹{property.rent}/month
        </span>

        <span className="rent-rating">
          ⭐ {property.rating || "4.5"}
        </span>

      </div>

    </div>
  );
};

export default RentDetailsHeader;