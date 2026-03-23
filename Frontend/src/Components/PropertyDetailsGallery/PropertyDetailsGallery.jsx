import React, { useState } from "react";
import "./PropertyDetailsGallery.css";
import {
  FaChevronLeft,
  FaChevronRight,
  FaBed,
  FaMapMarkerAlt,
  FaCouch,
  FaUsers,
  FaCalendarAlt,
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
  const [activeTab, setActiveTab] = useState("photos");

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  return (
    <div className="pgd-wrapper">
      {/* LEFT */}
      <div className="pgd-left">
        <div className="pgd-tabs">
          <span
            className={activeTab === "videos" ? "active" : ""}
            onClick={() => setActiveTab("videos")}
          >
            Videos (1)
          </span>

          <span
            className={activeTab === "photos" ? "active" : ""}
            onClick={() => setActiveTab("photos")}
          >
            Property ({images.length})
          </span>
        </div>

        {/* VIDEO */}
        {activeTab === "videos" ? (
          <div className="pgd-videoBox">
            <iframe
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
              title="Property Video"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="pgd-imageBox">
            <img src={images[index]} alt="" />

            <button className="pgd-arrow left" onClick={prev}>
              <FaChevronLeft />
            </button>

            <button className="pgd-arrow right" onClick={next}>
              <FaChevronRight />
            </button>

            <div className="pgd-overlay">
              🔥 4 people already contacted this week
            </div>

            {/* DOT PAGINATION */}
            <div className="pgd-dots">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={i === index ? "active" : ""}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="pgd-right">
        <div className="pgd-card">
          <div className="pgd-grid">
            <div className="pgd-item">
              <FaBed />
              <div>
                <p>Configuration</p>
                <h4>3 Bedrooms, 2 Bathrooms, 3 Balconies</h4>
              </div>
            </div>

            <div className="pgd-item">
              <MdOutlineSquareFoot />
              <div>
                <p>Rent</p>
                <h4>
                  ₹ 30,000 <span>View Details</span>
                </h4>
              </div>
            </div>

            <div className="pgd-item">
              <MdOutlineSquareFoot />
              <div>
                <p>Area</p>
                <h4>Carpet: 1260 sq.ft.</h4>
                <span className="pgd-sub">(117.06 sq.m.)</span>
              </div>
            </div>

            <div className="pgd-item">
              <FaMapMarkerAlt />
              <div>
                <p>Address</p>
                <h4>Ratna Arcade, Pokhariput</h4>
              </div>
            </div>

            <div className="pgd-item">
              <FaCouch />
              <div>
                <p>Furnishing</p>
                <h4>Furnished</h4>
              </div>
            </div>

            <div className="pgd-item">
              <FaUsers />
              <div>
                <p>Available For</p>
                <h4>Family Only</h4>
              </div>
            </div>

            <div className="pgd-item">
              <FaCalendarAlt />
              <div>
                <p>Available From</p>
                <h4>01 May 2026</h4>
              </div>
            </div>

            <div className="pgd-item">
              <FaCalendarAlt />
              <div>
                <p>Posted</p>
                <h4>Owner on Feb 27, 2026</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsGallery;