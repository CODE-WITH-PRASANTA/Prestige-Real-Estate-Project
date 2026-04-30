import React, { useMemo, useState, useEffect } from "react";
import "./RentProperty.css";
import { Link } from "react-router-dom";
import {
  FiChevronDown,
  FiHeart,
  FiMapPin,
  FiFilter,
  FiPhone,
  FiCamera,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
} from "react-icons/fi";

import API, { IMG_URL } from "../../api/axios";
import locationIcon from "../../assets/location2.webp";

// ================= PROPERTY CARD =================
function PropertyCard({ item, savedItems, toggleSave }) {
  const [activeImage, setActiveImage] = useState(0);
  const [direction, setDirection] = useState("next");

  const isSaved = savedItems.includes(item.id);

  const prevImage = () => {
    setDirection("prev");
    setActiveImage((prev) =>
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setDirection("next");
    setActiveImage((prev) =>
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const jumpToImage = (index) => {
    setDirection(index > activeImage ? "next" : "prev");
    setActiveImage(index);
  };

  return (
    <div className="rent-card ultra-card">
      <div className="rent-card-image-wrap premium-gallery">
        {item.tag && <span className="rent-badge">{item.tag}</span>}

        <button
          className={`rent-heart-btn ${isSaved ? "saved" : ""}`}
          onClick={() => toggleSave(item.id)}
          type="button"
        >
          <FiHeart />
        </button>

        <div className="gallery-main">
          <div className={`gallery-image-stage slide-${direction}`} key={activeImage}>
            <img
              src={item.images[activeImage]}
              alt={item.title}
              className="rent-card-image"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/400x300?text=Image+Error")
              }
            />
          </div>

          <button className="gallery-arrow gallery-arrow-left" onClick={prevImage}>
            <FiChevronLeft />
          </button>

          <button className="gallery-arrow gallery-arrow-right" onClick={nextImage}>
            <FiChevronRight />
          </button>

          <div className="rent-image-slider-dots">
            {item.images.map((_, index) => (
              <button
                key={index}
                className={activeImage === index ? "active-dot" : ""}
                onClick={() => jumpToImage(index)}
              />
            ))}
          </div>

          <div className="rent-image-count">
            <FiCamera />
            <span>
              {activeImage + 1}/{item.images.length}
            </span>
          </div>
        </div>
      </div>

      <div className="rent-card-content">
        <div className="rent-card-top">
          <div>
            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
          </div>
          {item.tag && <span className="rent-top-tag">{item.tag}</span>}
        </div>

        <div className="rent-card-stats">
          <div>
            <h4>{item.price}</h4>
            <p>{item.deposit}</p>
          </div>

          <div>
            <h4>{item.area}</h4>
            <p>{item.areaType}</p>
          </div>

          <div>
            <h4>{item.bhk}</h4>
            <p>{item.baths}</p>
          </div>
        </div>

        <div className="rent-highlights">
          <strong>Highlights :</strong>
          {item.highlights.map((hl, index) => (
            <span key={index}>{hl}</span>
          ))}
        </div>

        <p className="rent-desc">{item.desc}</p>

        <div className="rent-card-bottom">
          <div className="rent-time">
            <span>{item.time}</span>
            <p>{item.postedBy}</p>
          </div>

          <div className="rent-actions">
            <Link to={`/rent/details`} className="rent-view-details-btn">
              <FiEye /> View Details
            </Link>

            <button className="rent-view-btn" type="button">
              View Number
            </button>

            <button className="rent-contact-btn" type="button">
              <FiPhone /> Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= MAIN =================
export default function RentProperty() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savedItems, setSavedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 10;

  // ================= API =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/rent");

        const formatted = res.data.map((item, index) => ({
          id: item._id || index,

          title: item.title,
          subtitle: `${item.bedrooms} BHK Flat in ${item.location}`,

          price: `₹${item.rent}`,
          deposit: item.deposit || "+ Deposit not specified",

          area: `${item.sqft} sqft`,
          areaType: "Built-up Area",

          bhk: `${item.bedrooms} BHK`,
          baths: `${item.bathrooms} Baths`,

          highlights: ["Premium", "Good Location"],

          desc: item.description || "No description",

          time: "Recently added",
          postedBy: "Owner",

          tag: item.tag || "",
          verified: item.verified || false,

          withPhotos: item.images?.length > 0,
          withVideos: false,

          images:
            item.images && item.images.length > 0
              ? item.images.map((img) =>
                  img.startsWith("http")
                    ? img
                    : `${IMG_URL}/${img.replace(/^\/+/, "")}`
                )
              : ["https://via.placeholder.com/400x300?text=No+Image"],
        }));

        setProperties(formatted);
      } catch (err) {
        console.error(err);
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSave = (id) => {
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const totalPages = Math.ceil(properties.length / cardsPerPage);

  const currentCards = useMemo(() => {
    const start = (currentPage - 1) * cardsPerPage;
    return properties.slice(start, start + cardsPerPage);
  }, [properties, currentPage]);

  if (loading) return <h2>Loading properties...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <section className="rent-page">
      <div className="rent-card-list">
        {currentCards.map((item) => (
          <PropertyCard
            key={item.id}
            item={item}
            savedItems={savedItems}
            toggleSave={toggleSave}
          />
        ))}
      </div>

      <div className="rent-pagination">
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        <span>
          Page {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </section>
  );
}