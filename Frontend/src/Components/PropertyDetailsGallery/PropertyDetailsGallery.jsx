import React, { useState } from "react";
import "./PropertyDetailsGallery.css";
import {
  FaChevronLeft,
  FaChevronRight,
  FaBed,
  FaMapMarkerAlt,
  FaCouch,
  FaUsers,
  FaCalendarAlt
} from "react-icons/fa";
import { MdOutlineSquareFoot } from "react-icons/md";

import img1 from "../../assets/room-1.webp";
import img2 from "../../assets/room-2.webp";
import img3 from "../../assets/room-3.webp";
import img4 from "../../assets/room-4.webp";
import img5 from "../../assets/room-5.webp";

const images = [img1, img2, img3, img4, img5];

const PropertyDetailsGallery = () => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  return (
    <div className="pdx-wrapper">
      {/* LEFT IMAGE */}
      <div className="pdx-left">
        <div className="pdx-tabs">
          <span>Videos (1)</span>
          <span className="active">Property (9)</span>
        </div>

        <div className="pdx-image-box">
          <img src={images[index]} alt="" />

          <button className="pdx-arrow left" onClick={prev}>
            <FaChevronLeft />
          </button>

          <button className="pdx-arrow right" onClick={next}>
            <FaChevronRight />
          </button>

          <div className="pdx-overlay">
            🔥 4 people already contacted this week
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="pdx-right">
        <div className="pdx-card">
          <div className="pdx-grid">
            <div className="pdx-item">
              <FaBed />
              <div>
                <p>Configuration</p>
                <h4>3 Bedrooms , 2 Bathrooms, No Balcony</h4>
              </div>
            </div>

            <div className="pdx-item">
              <MdOutlineSquareFoot />
              <div>
                <p>Rent</p>
                <h4>₹ 23,000 <span>View Rent Details</span></h4>
              </div>
            </div>

            <div className="pdx-item">
              <MdOutlineSquareFoot />
              <div>
                <p>Area</p>
                <h4>Plot area 1500 sq.ft.</h4>
                <span className="pdx-sub">Carpet area: 1350 sq.ft.</span>
              </div>
            </div>

            <div className="pdx-item">
              <FaMapMarkerAlt />
              <div>
                <p>Address</p>
                <h4>Achyuta Bhawan, Lane 4<br />Satabdi Nagar</h4>
              </div>
            </div>

            <div className="pdx-item">
              <FaCouch />
              <div>
                <p>Furnishing</p>
                <h4>Unfurnished</h4>
              </div>
            </div>

            <div className="pdx-item">
              <FaUsers />
              <div>
                <p>Available For</p>
                <h4>All</h4>
              </div>
            </div>

            <div className="pdx-item">
              <FaCalendarAlt />
              <div>
                <p>Available From</p>
                <h4>Immediate</h4>
              </div>
            </div>

            <div className="pdx-item">
              <FaCalendarAlt />
              <div>
                <p>Posted By</p>
                <h4>Owner on Feb 24, 2026</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsGallery;