import React, { useState } from "react";
import "./Treding.css";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaBed,
  FaBath,
  FaCar,
  FaBuilding,
  FaTv,
  FaSnowflake,
  FaTshirt,
  FaCheckCircle,
  FaListAlt,
  FaTag,
} from "react-icons/fa";

import { MdMicrowave, MdBalcony, MdWaterDrop } from "react-icons/md";
import { IMG_URL } from "../../api/axios";

const Treding = ({ data }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [descExpanded, setDescExpanded] = useState(false);

  if (!data) return null;

  // ================= IMAGES =================
  const sliderImages = data.images?.map((img) => IMG_URL + img) || [];

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % sliderImages.length);
  };

  const prevImage = () => {
    setActiveImage((prev) =>
      (prev - 1 + sliderImages.length) % sliderImages.length
    );
  };

  // ================= FEATURES =================
  const f = data.features || {};

  const features = [
    { icon: <FaBed />, label: `Bedrooms: ${f.bedroom || 0}` },
    { icon: <FaBath />, label: `Bathrooms: ${f.bathroom || 0}` },
    { icon: <FaCar />, label: `Parking: ${f.parking || 0}` },
    { icon: <MdBalcony />, label: `Balcony: ${f.balcony || 0}` },
    { icon: <FaBuilding />, label: `Floor: ${f.floor || 0}` },
    { icon: <FaTv />, label: `TV: ${f.tv || 0}` },
    { icon: <MdWaterDrop />, label: `Purifier: ${f.purifier || 0}` },
    { icon: <MdMicrowave />, label: `Microwave: ${f.microwave || 0}` },
    { icon: <FaSnowflake />, label: `AC: ${f.ac || 0}` },
    { icon: <FaBuilding />, label: `Fridge: ${f.fridge || 0}` },
    { icon: <FaTshirt />, label: `Curtains: ${f.curtains || 0}` },
  ];

  const amenities = data.amenities || [];

  return (
    <section className="treding">
      <div className="treding-container">

        {/* ================= TOP BAR ================= */}
        <div className="treding-top">
          <div className="treding-topBar">
            <div className="treding-badges">
              <span className="treding-badge treding-badgeTrending">
                <FaListAlt /> Trending
              </span>
              <span className="treding-badge treding-badgeFeatured">
                <FaTag /> Featured
              </span>
            </div>

            <div className="treding-visits">
              Category: {data.category || "Property"}
            </div>
          </div>

          {/* ================= HERO IMAGE ================= */}
          <div className="treding-heroImageWrap">
            <img
              src={sliderImages[activeImage]}
              alt="property"
              className="treding-heroImage"
            />
          </div>

          {/* ================= THUMBNAILS ================= */}
          <div className="treding-thumbRow">
            <button className="treding-thumbArrow" onClick={prevImage}>
              <FaChevronLeft />
            </button>

            <div className="treding-thumbGrid">
              {sliderImages.map((img, index) => (
                <button
                  key={index}
                  className={`treding-thumbItem ${
                    activeImage === index ? "active" : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>

            <button className="treding-thumbArrow" onClick={nextImage}>
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div className="treding-box">
          <div className="treding-boxHeader">
            <h2>Description</h2>
            <FaChevronDown />
          </div>
          <div
            className="treding-paragraph"
            dangerouslySetInnerHTML={{
              __html: descExpanded
                ? data.fullDescription
                : data.fullDescription?.slice(0, 200),
            }}
          />
        </div>

        {/* ================= FEATURES ================= */}
        <div className="treding-box">
          <div className="treding-boxHeader">
            <h2>Property Features</h2>
            <FaChevronDown />
          </div>
          <div className="treding-boxBody">
            <div className="treding-featureGrid">
              {features.map((item, index) => (
                <div className="treding-featureItem" key={index}>
                  <span className="treding-featureIcon">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= AMENITIES ================= */}
        <div className="treding-box">
          <div className="treding-boxHeader">
            <h2>Amenities</h2>
            <FaChevronDown />
          </div>
          <div className="treding-boxBody">
            <div className="treding-amenityGrid">
              {amenities.map((item, index) => (
                <div className="treding-amenityItem" key={index}>
                  <span className="treding-featureIcon">
                    <FaCheckCircle />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= GALLERY ================= */}
        <div className="treding-box">
          <div className="treding-boxHeader">
            <h2>Gallery</h2>
            <FaChevronDown />
          </div>
          <div className="treding-boxBody">
            <div className="treding-galleryGrid">
              {sliderImages.map((img, index) => (
                <div className="treding-galleryItem" key={index}>
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Treding;