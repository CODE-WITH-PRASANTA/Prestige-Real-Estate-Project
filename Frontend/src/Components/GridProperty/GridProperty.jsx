import React, { useEffect, useState } from "react";
import "./GridProperty.css";
import { Link } from "react-router-dom";
import {
  FaBed,
  FaBath,
  FaRegHeart,
  FaMapMarkerAlt,
  FaStar,
  FaThLarge,
  FaListUl,
  FaMapMarkedAlt,
  FaChevronDown,
  FaTag,
  FaSyncAlt,
  FaRulerCombined,
} from "react-icons/fa";

import API, { IMG_URL } from "../../api/axios";

const GridProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ FETCH DATA FROM BACKEND
useEffect(() => {
  const fetchProperties = async () => {
    try {
      const res = await API.get("/property");

      console.log("API RESPONSE:", res.data);

      let data = res.data;

      // 🔥 HANDLE ALL CASES
      if (Array.isArray(data)) {
        setProperties(data);
      } else if (Array.isArray(data.data)) {
        setProperties(data.data);
      } else if (Array.isArray(data.properties)) {
        setProperties(data.properties);
      } else {
        setProperties([]); // fallback
      }

    } catch (err) {
      console.error(err);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  fetchProperties();
}, []);

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center" }}>{error}</h2>;

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
              <Link to="/buydetails" className="gridProperty-viewBtn">
                <FaListUl />
              </Link>

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
            <div className="gridProperty-card" key={item._id}>
              
              {/* IMAGE */}
              <div className="gridProperty-imageWrap">
                <img
                  src={
                    item.banner
                      ? IMG_URL + item.banner
                      : "https://via.placeholder.com/400"
                  }
                  alt={item.title}
                  className="gridProperty-image"
                />

                <div className="gridProperty-overlay"></div>

                {/* BADGES */}
                <div className="gridProperty-topBadges">
                  {item.isNew && (
                    <span className="gridProperty-badge gridProperty-badgeNew">
                      <FaSyncAlt /> New
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

                {/* OWNER IMAGE */}
                <div className="gridProperty-agent">
                  <img
                    src={
                      item.ownerImage
                        ? IMG_URL + item.ownerImage
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
                  <span>{item.address}</span>
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
            </div>
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