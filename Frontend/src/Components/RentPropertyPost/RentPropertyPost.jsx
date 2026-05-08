import React, { useMemo, useState, useEffect } from "react";
import "./RentPropertyPost.css";
import { Link } from "react-router-dom";

import {
  FiChevronDown,
  FiHeart,
  FiMapPin,
  FiPhone,
  FiCamera,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiGrid,
  FiList,
} from "react-icons/fi";

import API, { IMG_URL } from "../../api/axios";

// ================= PROPERTY CARD =================
function PropertyCard({ item, savedItems, toggleSave }) {
  const [activeImage, setActiveImage] = useState(0);
  const [direction, setDirection] = useState("next");
  const [showNumber, setShowNumber] = useState(false);

  const isSaved = savedItems.includes(item.id);

  const phoneNumber = "9595422040";

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

  const openWhatsapp = () => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  return (
    <div className="rent-card ultra-card">
      {/* IMAGE */}
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
          <div
            className={`gallery-image-stage slide-${direction}`}
            key={activeImage}
          >
            <img
              src={item.images[activeImage]}
              alt={item.title}
              className="rent-card-image"
            />
          </div>

          <button
            className="gallery-arrow gallery-arrow-left"
            onClick={prevImage}
            type="button"
          >
            <FiChevronLeft />
          </button>

          <button
            className="gallery-arrow gallery-arrow-right"
            onClick={nextImage}
            type="button"
          >
            <FiChevronRight />
          </button>

          <div className="rent-image-slider-dots">
            {item.images.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${
                  activeImage === index ? "active-dot" : ""
                }`}
                onClick={() => jumpToImage(index)}
                type="button"
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

      {/* CONTENT */}
      <div className="rent-card-content">
        <div className="rent-card-top">
          <div>
            <h3>{item.title}</h3>

            <p>{item.subtitle}</p>
          </div>
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

        <p className="rent-desc">
          {item.desc.replace(/<[^>]+>/g, "")}
        </p>

        <div className="rent-card-bottom">
          <div className="rent-time">
            <span>{item.time}</span>

            <p>{item.postedBy}</p>
          </div>

          <div className="rent-actions">
            <Link
              to={`/rent/details/${item.id}`}
              className="rent-view-details-btn"
            >
              <FiEye />
              View Details
            </Link>

            <button
              className="rent-view-btn"
              type="button"
              onClick={() => setShowNumber(!showNumber)}
            >
              {showNumber ? phoneNumber : "View Number"}
            </button>

            <button
              className="rent-contact-btn"
              type="button"
              onClick={openWhatsapp}
            >
              <FiPhone />
              Contact
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

  // SORT
  const [sortOption, setSortOption] = useState("Default");

  // VIEW
  const [viewType, setViewType] = useState("grid");

  const cardsPerPage = 10;

  // ================= FETCH API =================
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

  // ================= SAVE =================
  const toggleSave = (id) => {
    setSavedItems((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  // ================= SORT =================
  const sortedProperties = useMemo(() => {
    let sorted = [...properties];

    if (sortOption === "Price: Low to High") {
      sorted.sort(
        (a, b) =>
          Number(a.price.replace(/[^\d]/g, "")) -
          Number(b.price.replace(/[^\d]/g, ""))
      );
    }

    if (sortOption === "Price: High to Low") {
      sorted.sort(
        (a, b) =>
          Number(b.price.replace(/[^\d]/g, "")) -
          Number(a.price.replace(/[^\d]/g, ""))
      );
    }

    if (sortOption === "Latest Property") {
      sorted.reverse();
    }

    return sorted;
  }, [properties, sortOption]);

  // ================= PAGINATION =================
  const totalPages = Math.ceil(
    sortedProperties.length / cardsPerPage
  );

  const currentCards = useMemo(() => {
    const start = (currentPage - 1) * cardsPerPage;

    return sortedProperties.slice(
      start,
      start + cardsPerPage
    );
  }, [sortedProperties, currentPage]);

  // ================= LOADING =================
  if (loading)
    return (
      <div className="rent-loading">
        Loading properties...
      </div>
    );

  if (error)
    return (
      <div className="rent-error">
        {error}
      </div>
    );

  // ================= RETURN =================
  return (
    <section className="rent-page">

      {/* ================= TOP BAR ================= */}

      <div className="rent-topbar">
        <div className="rent-topbar-left">
          <h4>
            Showing result{" "}
            <span>{sortedProperties.length}</span>
          </h4>
        </div>

        <div className="rent-topbar-right">

          {/* SORT */}

          <div className="rent-sort-wrap">
            <span className="sort-label">
              Sort By
            </span>

            <div className="custom-select">
              <select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);

                  setCurrentPage(1);
                }}
              >
                <option value="Default">
                  Default
                </option>

                <option value="Latest Property">
                  Latest Property
                </option>

                <option value="Price: Low to High">
                  Price: Low to High
                </option>

                <option value="Price: High to Low">
                  Price: High to Low
                </option>
              </select>

              <FiChevronDown className="select-icon" />
            </div>
          </div>

          {/* LIST VIEW */}

          <button
            className={`layout-btn ${
              viewType === "list"
                ? "active-layout"
                : ""
            }`}
            onClick={() => setViewType("list")}
            type="button"
          >
            <FiList />
          </button>

          {/* GRID VIEW */}

          <button
            className={`layout-btn ${
              viewType === "grid"
                ? "active-layout"
                : ""
            }`}
            onClick={() => setViewType("grid")}
            type="button"
          >
            <FiGrid />
          </button>

          {/* MAP VIEW */}

          <button
            className={`layout-btn ${
              viewType === "map"
                ? "active-layout"
                : ""
            }`}
            onClick={() => setViewType("map")}
            type="button"
          >
            <FiMapPin />
          </button>
        </div>
      </div>

      {/* ================= PROPERTY LIST ================= */}

      <div
        className={`rent-card-list ${
          viewType === "grid"
            ? "grid-view"
            : viewType === "map"
            ? "map-view"
            : "list-view"
        }`}
      >
        {currentCards.map((item) => (
          <PropertyCard
            key={item.id}
            item={item}
            savedItems={savedItems}
            toggleSave={toggleSave}
          />
        ))}
      </div>

      {/* ================= PAGINATION ================= */}

      {totalPages > 1 && (
        <div className="rent-pagination">

          <button
            onClick={() =>
              setCurrentPage((p) => p - 1)
            }
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span>
            Page {currentPage} / {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((p) => p + 1)
            }
            disabled={
              currentPage === totalPages
            }
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}