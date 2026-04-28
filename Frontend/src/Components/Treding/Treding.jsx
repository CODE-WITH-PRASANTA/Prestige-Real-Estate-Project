import React, { useMemo, useState } from "react";
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
  FaDumbbell,
  FaSwimmingPool,
  FaBolt,
  FaGlassMartiniAlt,
  FaParking,
  FaSun,
  FaDoorOpen,
  FaVectorSquare,
  FaDownload,
  FaEye,
  FaPlus,
  FaThumbsUp,
  FaThumbsDown,
  FaHeart,
  FaReply,
  FaListAlt,
  FaTag,
  FaStar,
} from "react-icons/fa";

import { MdMicrowave, MdBalcony, MdWaterDrop, MdKitchen } from "react-icons/md";
import { IMG_URL } from "../../api/axios";

const Treding = ({ data }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
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
    { icon: <FaVectorSquare />, label: `Wardrobe: ${f.wardrobe || 0}` },
    { icon: <FaTv />, label: `TV: ${f.tv || 0}` },
    { icon: <MdWaterDrop />, label: `Purifier: ${f.purifier || 0}` },
    { icon: <MdMicrowave />, label: `Microwave: ${f.microwave || 0}` },
    { icon: <FaSnowflake />, label: `AC: ${f.ac || 0}` },
    { icon: <FaBuilding />, label: `Fridge: ${f.fridge || 0}` },
    { icon: <FaTshirt />, label: `Curtains: ${f.curtains || 0}` },
  ];

  // ================= AMENITIES =================
  const amenities = data.amenities || [];

  return (
    <section className="treding">
      <div className="treding-container">

        {/* ================= IMAGE SLIDER ================= */}
        <div className="treding-top">
          <div className="treding-heroImageWrap">
            <img
              src={sliderImages[activeImage]}
              alt="property"
              className="treding-heroImage"
            />
          </div>

          <div className="treding-thumbRow">
            <button onClick={prevImage}><FaChevronLeft /></button>

            <div className="treding-thumbGrid">
              {sliderImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setActiveImage(index)}
                  style={{
                    border: activeImage === index ? "2px solid red" : "",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <button onClick={nextImage}><FaChevronRight /></button>
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div className="treding-box">
          <h2>Description</h2>
          <p>
            {descExpanded
              ? data.fullDescription
              : data.fullDescription?.slice(0, 150)}
          </p>

          <button onClick={() => setDescExpanded(!descExpanded)}>
            {descExpanded ? "Read Less" : "Read More"}
          </button>
        </div>

        {/* ================= FEATURES ================= */}
        <div className="treding-box">
          <h2>Property Features</h2>
          <div className="treding-featureGrid">
            {features.map((item, index) => (
              <div key={index}>
                {item.icon} {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* ================= AMENITIES ================= */}
        <div className="treding-box">
          <h2>Amenities</h2>
          <div className="treding-amenityGrid">
            {amenities.map((item, index) => (
              <div key={index}>
                <FaCheckCircle /> {item}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Treding;