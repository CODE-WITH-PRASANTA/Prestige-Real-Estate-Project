import React from "react";
import "./RentDetailsAmenities.css";

const RentDetailsAmenities = ({ property }) => {

  return (
    <div className="rent-amenities-card">

      <h2>Amenities</h2>

      <div className="amenities-grid">

        {property?.amenities?.map((item, index) => (

          <div
            key={index}
            className="amenity-item"
          >
            ✓ {item}
          </div>

        ))}

      </div>

    </div>
  );
};

export default RentDetailsAmenities;