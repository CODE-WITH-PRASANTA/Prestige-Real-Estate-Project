import React, { useEffect, useState } from "react";
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
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await API.get("/property");

        let data = res.data;

        if (Array.isArray(data)) {
          setProperties(data);
        } else if (Array.isArray(data.data)) {
          setProperties(data.data);
        } else if (Array.isArray(data.properties)) {
          setProperties(data.properties);
        } else {
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

  if (loading)
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  if (error)
    return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;

  return (
    <section className="gridProperty">
      <div className="gridProperty-container">

        {/* TOOLBAR */}
        <div className="gridProperty-toolbar">
          <div className="gridProperty-result">
            Showing result <span>{properties.length}</span>
          </div>

          <div className="gridProperty-toolbarRight">
            <div className="gridProperty-selectWrap">
              <label>Sort By</label>
              <div className="gridProperty-select">
                <span>Default</span>
                <FaChevronDown />
              </div>
            </div>

            <div className="gridProperty-viewBtns">
              <button className="gridProperty-viewBtn">
                <FaListUl />
              </button>

              <button className="gridProperty-viewBtn active">
                <FaThLarge />
              </button>

              <button className="gridProperty-viewBtn">
                <FaMapMarkedAlt />
              </button>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="gridProperty-grid">
          {properties.map((item) => (
            <Link
              to={`/property/${item._id}`}
              key={item._id}
              className="gridProperty-card"
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
                  {item.isNew && (
                    <span className="gridProperty-badge gridProperty-badgeNew">
                      New
                    </span>
                  )}

                  {item.featured && (
                    <span className="gridProperty-badge gridProperty-badgeFeatured">
                      <FaTag /> Featured
                    </span>
                  )}
                </div>

                <button className="gridProperty-heartBtn">
                  <FaRegHeart />
                </button>

                <div className="gridProperty-price">
                  ₹{item.price}
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

                <div className="gridProperty-rating">
                  <span className="gridProperty-stars">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </span>
                  <span className="gridProperty-ratingText">
                    {item.rating || "4.5"}
                  </span>
                </div>

                <h3 className="gridProperty-title">
                  {item.title}
                </h3>

                <div className="gridProperty-location">
                  <FaMapMarkerAlt />
                  <span>{item.location}</span>
                </div>

                {/* FEATURES */}
                <div className="gridProperty-features">
                  <div className="gridProperty-featureItem">
                    <FaBed />
                    <span>{item.bedroom} Bedroom</span>
                  </div>

                  <div className="gridProperty-featureItem">
                    <FaBath />
                    <span>{item.bath} Bath</span>
                  </div>

                  <div className="gridProperty-featureItem">
                    <FaRulerCombined />
                    <span>{item.area} Sq Ft</span>
                  </div>
                </div>

                {/* META */}
                <div className="gridProperty-meta">
                  <div>
                    <strong>Listed on:</strong>{" "}
                    {new Date(item.createdAt).toDateString()}
                  </div>

                  <div>
                    <strong>Category:</strong> {item.category}
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* LOAD MORE */}
        <div className="gridProperty-loadMoreWrap">
          <button className="gridProperty-loadMore">
            <FaSyncAlt /> Load More
          </button>
        </div>
      </div>
    </section>
  );
};

export default GridProperty;