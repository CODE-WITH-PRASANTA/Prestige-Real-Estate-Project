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
} from "react-icons/fa";

const GridProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await API.get("/property");
        setProperties(res.data.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading)
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <section className="gridProperty">
      <div className="gridProperty-container">

        <div className="gridProperty-grid">
          {properties.map((item) => (
            <div className="gridProperty-card" key={item._id}>

              {/* 🔥 IMAGE SECTION */}
              <div className="gridProperty-imageWrap">
                  <img
                  className="gridProperty-image"
                  src={
                    item.banner
                      ? `${IMG_URL}${item.banner}`
                      : "https://via.placeholder.com/400x300"
                  }
                />

                <div className="gridProperty-overlay"></div>

                <button className="gridProperty-heartBtn">
                  <FaRegHeart />
                </button>

                <div className="gridProperty-price">
                  ₹ {item.price}
                </div>

                {/* 🔥 OWNER IMAGE */}
                <div className="gridProperty-agent">
                  <img
                  className="gridProperty-image"
                  src={
                    item.ownerImage
                      ? `${IMG_URL}${item.ownerImage}`
                      : "https://via.placeholder.com/400x300"
                  }
                />
                </div>
              </div>

              {/* 🔥 CONTENT */}
              <div className="gridProperty-content">

                <div className="gridProperty-rating">
                  <span className="gridProperty-stars">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </span>
                  <span>{item.rating || "4.5"}</span>
                </div>

                {/* ✅ TITLE CLICK → DETAILS */}
                <h3 className="gridProperty-title">
                  <Link to={`/property/${item._id}`}>
                    {item.title}
                  </Link>
                </h3>

                <div className="gridProperty-location">
                  <FaMapMarkerAlt />
                  <span>{item.location}</span>
                </div>

                <div className="gridProperty-features">
                  <div className="gridProperty-featureItem">
                    <FaBed />
                    <span>{item.features?.bedroom || 0} Beds</span>
                  </div>

                  <div className="gridProperty-featureItem">
                    <FaBath />
                    <span>{item.features?.bathroom || 0} Bath</span>
                  </div>

                  <div className="gridProperty-featureItem">
                    <FaRulerCombined />
                    <span>{item.sqft || 0} Sq Ft</span>
                  </div>
                </div>

                <div className="gridProperty-meta">
                  <div>
                    <strong>Category:</strong> {item.category}
                  </div>
                  <div>
                    <strong>Updated:</strong> {item.lastUpdate}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GridProperty;