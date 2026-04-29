import React, { useEffect, useState } from "react";
import "./RentDetails.css";
import API, { IMG_URL } from "../../api/axios";

const RentDetails = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRent = async () => {
      try {
        const res = await API.get("/rent");
        console.log("DATA:", res.data); // ✅ debug
        setProperties(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchRent();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="rent-container">
      <h2 className="rent-heading">Rental Properties</h2>

      <div className="rent-grid">
        {properties.map((item) => {
          // ✅ ROBUST IMAGE HANDLING
          let imageUrl = "https://via.placeholder.com/400x300?text=No+Image";

          if (item.images && item.images.length > 0) {
            const img = item.images[0];

            if (img.startsWith("http")) {
              // ✅ already full URL (cloud / external)
              imageUrl = img;
            } else {
              // ✅ local image from backend
              const cleanPath = img.replace(/^\/+/, ""); // remove leading /
              imageUrl = `${IMG_URL}/${cleanPath}`;
            }
          }

          return (
            <div key={item._id} className="rent-card">
              <div className="rent-image-wrapper">
                <img
                  src={imageUrl}
                  alt={item.title}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Image+Error";
                  }}
                />

                <span className="rent-tag">
                  {item.tag || "New"}
                </span>

                <div className="rent-price">
                  ₹{item.rent}
                </div>
              </div>

              <div className="rent-content">
                <h3>{item.title}</h3>

                <p className="rent-location">
                  {item.location}
                </p>

                <div className="rent-features">
                  <span>🛏 {item.bedrooms || 0} Beds</span>
                  <span>🛁 {item.bathrooms || 0} Baths</span>
                  <span>📐 {item.sqft || 0} sqft</span>
                </div>

                <p className="rent-description">
                  {item.description || "No description available"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RentDetails;