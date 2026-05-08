import React from "react";
import "./RentLocationMap.css";

import {
  FiMapPin,
  FiNavigation,
  FiHome,
} from "react-icons/fi";

const RentLocationMap = ({ property }) => {

  const location =
    property?.location ||
    "Mumbai, Maharashtra";

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    location
  )}&output=embed`;

  return (
    <div className="rent-map-card">

      {/* HEADER */}

      <div className="rent-map-top">

        <div>

          <h2>
            Location & Nearby
          </h2>

          <p>
            Explore the property location
            and nearby landmarks
          </p>

        </div>

        <div className="rent-map-badge">

          <FiMapPin />

          Prime Area

        </div>

      </div>

      {/* LOCATION INFO */}

      <div className="rent-location-info">

        <div className="rent-location-item">

          <div className="rent-location-icon">
            <FiMapPin />
          </div>

          <div>
            <h4>Property Address</h4>
            <p>{location}</p>
          </div>

        </div>

        <div className="rent-location-item">

          <div className="rent-location-icon">
            <FiNavigation />
          </div>

          <div>
            <h4>Connectivity</h4>
            <p>
              Metro • Schools • Hospitals
            </p>
          </div>

        </div>

        <div className="rent-location-item">

          <div className="rent-location-icon">
            <FiHome />
          </div>

          <div>
            <h4>Neighborhood</h4>
            <p>
              Premium Residential Area
            </p>
          </div>

        </div>

      </div>

      {/* MAP */}

      <div className="rent-map-wrapper">

        <iframe
          src={mapSrc}
          title="Property Location"
          loading="lazy"
          allowFullScreen
        />

      </div>

    </div>
  );
};

export default RentLocationMap;