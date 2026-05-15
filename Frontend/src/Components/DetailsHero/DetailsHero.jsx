import React, { useEffect, useState } from "react";
import "./DetailsHero.css";
import {
  FaStar,
  FaMapMarkerAlt,
  FaHeart,
  FaRegBookmark,
  FaExchangeAlt,
} from "react-icons/fa";

import { IMG_URL } from "../../api/axios";

const DetailsHero = ({ data }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!data) return null;

  // 🔥 Unique ID
  const propertyId = data._id;

  // ================= LOAD STATE =================
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const savedList = JSON.parse(localStorage.getItem("saved")) || [];

    setLiked(wishlist.includes(propertyId));
    setSaved(savedList.includes(propertyId));
  }, [propertyId]);

  // ================= ❤️ LIKE =================
  const handleLike = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.includes(propertyId)) {
      wishlist = wishlist.filter((id) => id !== propertyId);
      setLiked(false);
    } else {
      wishlist.push(propertyId);
      setLiked(true);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  // ================= 🔖 SAVE =================
  const handleSave = () => {
    let savedList = JSON.parse(localStorage.getItem("saved")) || [];

    if (savedList.includes(propertyId)) {
      savedList = savedList.filter((id) => id !== propertyId);
      setSaved(false);
    } else {
      savedList.push(propertyId);
      setSaved(true);
    }

    localStorage.setItem("saved", JSON.stringify(savedList));
  };

  // ================= 🔄 SHARE =================
  const handleShare = async () => {
    const shareData = {
      title: data.title,
      text: `Check out this property: ${data.title}`,
      url: window.location.href,
    };

    try {
      // ✅ Mobile share (WhatsApp, etc.)
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // ✅ Fallback (copy link)
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard ✅");
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <section
      className="detailsHero"
      style={{
        backgroundImage: `url(${IMG_URL}${data.banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="detailsHero-overlay"></div>

      <div className="detailsHero-container">
        <div className="detailsHero-content">
          {/* BADGES */}
          <div className="detailsHero-badges">
            <span className="detailsHero-badge detailsHero-badgePrimary">
              {data.category || "Property"}
            </span>

            <span className="detailsHero-badge detailsHero-badgeSecondary">
              For Sale
            </span>
          </div>

          {/* TITLE */}
          <h1 className="detailsHero-title">{data.title || "No Title"}</h1>

          {/* SEO DESCRIPTION */}
          <p className="detailsHero-description">
            Discover premium Prestige properties with modern amenities, luxury
            interiors, spacious layouts, excellent connectivity, and prime
            locations. Find your dream home with trusted real estate options
            designed for comfort, lifestyle, and long-term investment value.
          </p>

          {/* META */}
          <div className="detailsHero-meta">
            {/* ⭐ RATING */}
            <div className="detailsHero-rating">
              <span className="detailsHero-stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    color={i < (data.rating || 0) ? "#FFD700" : "#ccc"}
                  />
                ))}
              </span>
              <span className="detailsHero-ratingValue">
                {data.rating || 0}
              </span>
            </div>

            <span className="detailsHero-dot">•</span>

            {/* 📍 LOCATION */}
            <div className="detailsHero-location">
              <FaMapMarkerAlt />
              <span>{data.location || "No location"}</span>
            </div>

            <span className="detailsHero-dot">•</span>

            {/* 📅 UPDATED */}
            <div className="detailsHero-updated">
              Last Updated on :{" "}
              {data.lastUpdate
                ? data.lastUpdate
                : new Date(data.createdAt).toDateString()}
            </div>
          </div>

          {/* ACTIONS + PRICE */}
          <div className="detailsHero-actions">
            <div className="detailsHero-actionButtons">
              {/* ❤️ LIKE */}
              <button
                className="detailsHero-actionBtn"
                onClick={handleLike}
                style={{ color: liked ? "red" : "#333" }}
              >
                <FaHeart />
              </button>

              {/* 🔖 SAVE */}
              <button
                className="detailsHero-actionBtn"
                onClick={handleSave}
                style={{ color: saved ? "#007bff" : "#333" }}
              >
                <FaRegBookmark />
              </button>

              {/* 🔄 SHARE */}
              <button className="detailsHero-actionBtn" onClick={handleShare}>
                <FaExchangeAlt />
              </button>
            </div>

            {/* 💰 PRICE */}
            <div className="detailsHero-price">
              ₹ {data.price?.toLocaleString() || "0"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsHero;
