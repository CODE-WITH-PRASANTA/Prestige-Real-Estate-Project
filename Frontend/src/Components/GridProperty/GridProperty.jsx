import React, { useEffect, useMemo, useState } from "react";
import "./GridProperty.css";
import { Link } from "react-router-dom";
import API, { IMG_URL } from "../../api/axios";

import {
  FaBed,
  FaBath,
  FaRegHeart,
  FaMapMarkerAlt,
  FaStar,
  FaRulerCombined,
  FaChevronDown,
  FaListUl,
  FaThLarge,
  FaMapMarkedAlt,
  FaSyncAlt,
  FaTag,
} from "react-icons/fa";

const GridProperty = () => {

  /* ================= STATES ================= */
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [sortBy, setSortBy] = useState("default");

  const [viewType, setViewType] = useState("grid");

  const [visibleCount, setVisibleCount] = useState(6);

  /* ================= FETCH DATA ================= */
  useEffect(() => {

    const fetchProperties = async () => {

      try {

        const res = await API.get("/property");

        let data = res.data;

        if (Array.isArray(data)) {
          setProperties(data);
        }

        else if (Array.isArray(data.data)) {
          setProperties(data.data);
        }

        else if (Array.isArray(data.properties)) {
          setProperties(data.properties);
        }

        else {
          setProperties([]);
        }

      } catch (err) {

        console.error(err);

        setError("Failed to load properties");

      } finally {

        setLoading(false);

      }
    };

    fetchProperties();

  }, []);

  

  /* ================= SORT ================= */
  const sortedProperties = useMemo(() => {

    let sorted = [...properties];

    switch (sortBy) {

      case "low":
        sorted.sort((a, b) => a.price - b.price);
        break;

      case "high":
        sorted.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;

      case "latest":
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
        );
        break;

      default:
        break;
    }

    return sorted;

  }, [properties, sortBy]);

  /* ================= LOAD MORE ================= */
  const visibleProperties = sortedProperties.slice(
    0,
    visibleCount
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Loading...
      </h2>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <h2
        style={{
          textAlign: "center",
          color: "red",
        }}
      >
        {error}
      </h2>
    );
  }

  return (
    <section className="gridProperty">

      <div className="gridProperty-container">

        {/* ================= TOOLBAR ================= */}
        <div className="gridProperty-toolbar">

          {/* RESULT */}
          <div className="gridProperty-result">
            Showing result{" "}
            <span>
              {visibleProperties.length}
            </span>
          </div>

          <div className="gridProperty-toolbarRight">

            {/* SORT */}
            <div className="gridProperty-selectWrap">

              <label>Sort By</label>

<div className="gridProperty-selectBox">

  <select
    value={sortBy}
    onChange={(e) =>
      setSortBy(e.target.value)
    }
    className="gridProperty-selectInput"
  >

    <option value="default">
      Default
    </option>

    <option value="latest">
      Latest Property
    </option>

    <option value="low">
      Price: Low to High
    </option>

    <option value="high">
      Price: High to Low
    </option>

    <option value="rating">
      Top Rated
    </option>

  </select>

  <span className="gridProperty-selectArrow">
    <FaChevronDown />
  </span>

</div>

            </div>

            {/* VIEW BUTTONS */}
            <div className="gridProperty-viewBtns">

              {/* LIST */}
              <button
                className={`gridProperty-viewBtn ${
                  viewType === "list"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setViewType("list")
                }
              >
                <FaListUl />
              </button>

              {/* GRID */}
              <button
                className={`gridProperty-viewBtn ${
                  viewType === "grid"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setViewType("grid")
                }
              >
                <FaThLarge />
              </button>

              {/* MAP */}
              <button
                className={`gridProperty-viewBtn ${
                  viewType === "map"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setViewType("map")
                }
              >
                <FaMapMarkedAlt />
              </button>

            </div>

          </div>

        </div>

        {/* ================= MAP VIEW ================= */}
        {viewType === "map" ? (

          <div className="gridProperty-mapView">

            <iframe
              title="property-map"
              src="https://maps.google.com/maps?q=india&t=&z=5&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="600"
              style={{
                border: 0,
                borderRadius: "24px",
              }}
              loading="lazy"
            ></iframe>

          </div>

        ) : (

          <>
            {/* ================= GRID / LIST ================= */}
            <div
              className={`gridProperty-grid ${
                viewType === "list"
                  ? "gridProperty-gridList"
                  : ""
              }`}
            >

              {visibleProperties.map((item) => (

                <Link
                  to={`/property/${item._id}`}
                  key={item._id}
                  className={`gridProperty-card ${
                    viewType === "list"
                      ? "gridProperty-cardList"
                      : ""
                  }`}
                >

                  {/* IMAGE */}
                  <div className="gridProperty-imageWrap">

                    <img
                      src={
                        item.banner
                          ? `${IMG_URL}${item.banner}`
                          : "https://via.placeholder.com/400x300"
                      }
                      alt={item.title}
                      className="gridProperty-image"
                    />

                    <div className="gridProperty-overlay"></div>

                    {/* BADGES */}
                    <div className="gridProperty-topBadges">

                      {item.featured && (
                        <span className="gridProperty-badge gridProperty-badgeFeatured">
                          <FaTag /> Featured
                        </span>
                      )}

                    </div>

                    {/* HEART */}
                    <button className="gridProperty-heartBtn">
                      <FaRegHeart />
                    </button>

                    {/* PRICE */}
                    <div className="gridProperty-price">
                      ₹
                      {Number(
                        item.price
                      ).toLocaleString()}
                    </div>

                    {/* OWNER */}
                    <div className="gridProperty-agent">

                      <img
                        src={
                          item.ownerImage
                            ? `${IMG_URL}${item.ownerImage}`
                            : "https://via.placeholder.com/50"
                        }
                        alt="agent"
                      />

                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="gridProperty-content">

                    {/* RATING */}
                    <div className="gridProperty-rating">

                      <span className="gridProperty-stars">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </span>

                      <span className="gridProperty-ratingText">
                        {item.rating || "4.5"}
                      </span>

                    </div>

                    {/* TITLE */}
                    <h3 className="gridProperty-title">
                      {item.title}
                    </h3>

                    {/* LOCATION */}
                    <div className="gridProperty-location">

                      <FaMapMarkerAlt />

                      <span>
                        {item.location}
                      </span>

                    </div>

                    {/* FEATURES */}
                    <div className="gridProperty-features">

                      <div className="gridProperty-featureItem">
                        <FaBed />

                        <span>
                          {item.features?.bedroom || 0}
                          {" "}Bedroom
                        </span>
                      </div>

                      <div className="gridProperty-featureItem">
                        <FaBath />

                        <span>
                          {item.features?.bathroom || 0}
                          {" "}Bath
                        </span>
                      </div>

                      <div className="gridProperty-featureItem">
                        <FaRulerCombined />

                        <span>
                          {item.sqft || 0}
                          {" "}Sq Ft
                        </span>
                      </div>

                    </div>

                    {/* META */}
                    <div className="gridProperty-meta">

                      <div>
                        <strong>Listed on:</strong>{" "}

                        {new Date(
                          item.createdAt
                        ).toDateString()}
                      </div>

                      <div>
                        <strong>Category:</strong>{" "}
                        {item.category}
                      </div>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

            {/* ================= LOAD MORE ================= */}
            {visibleCount < sortedProperties.length && (

              <div className="gridProperty-loadMoreWrap">

                <button
                  className="gridProperty-loadMore"
                  onClick={handleLoadMore}
                >

                  <FaSyncAlt />

                  Load More

                </button>

              </div>

            )}

          </>
        )}

      </div>

    </section>
  );
};

export default GridProperty;