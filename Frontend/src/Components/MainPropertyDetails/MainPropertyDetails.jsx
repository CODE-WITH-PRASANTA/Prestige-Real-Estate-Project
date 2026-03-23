import React from "react";
import "./MainPropertyDetails.css";

const MainPropertyDetails = () => {
  return (
    <div className="ph-wrapper">
      {/* TOP BAR */}
      <div className="ph-top">
        <div className="ph-breadcrumb">
          Home › Property for rent in Bhubaneswar › House for rent in
          Bhubaneswar › House for rent in Baramunda › House for rent in
          Satabdi Nagar › <span>3 BHK House</span>
        </div>

        <div className="ph-update">
          Updated 8hrs ago by owner | <span>Ready to move</span>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="ph-main">
        {/* LEFT */}
        <div className="ph-left">
          <div className="ph-tags">
            <span className="ph-verified">✔ Verified</span>
            <span className="ph-premium">Platinum</span>
          </div>

          <div className="ph-price-row">
            <h1 className="ph-price">₹23,000</h1>
            <span className="ph-price-type">Per Month</span>
          </div>

          <h2 className="ph-title">3 Bedrooms 2 Baths</h2>

          <p className="ph-subtitle">
            Independent House/Villa for Rent
          </p>

          <p className="ph-location">
            in Achyuta Bhawan, Lane 4, Satabdi Nagar, Bhubaneswar, Orissa
          </p>

          <div className="ph-rera">
            <span className="ph-rera-label">RERA STATUS</span>
            <span className="ph-rera-status">NOT AVAILABLE</span>
            <span className="ph-rera-link">
              Website: http://rera.odisha.gov.in/
            </span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="ph-right">
          <button className="ph-contact-btn">
            Contact Owner <span>FREE</span>
          </button>

          <button className="ph-shortlist-btn">
            ❤ Shortlist
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="ph-tabs">
        <span className="ph-tab active">Overview</span>
        <span className="ph-tab">Owner Details</span>
        <span className="ph-tab">Recommendations</span>
      </div>
    </div>
  );
};

export default MainPropertyDetails;