import React, { useEffect, useState } from "react";
import API, { IMG_URL } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import "./PropertyList.css";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await API.get("/user-properties");
      setProperties(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="property-list">
      <h2 className="property-list__title">All Properties</h2>

      <div className="property-list__grid">
        {properties.map((item) => (
          <div
            key={item._id}
            className="property-list__card"
            onClick={() => navigate(`/property/${item._id}`)}
          >
            {/* IMAGE */}
            <img
              src={
                item.gallery?.[0]
                  ? IMG_URL + item.gallery[0]
                  : "https://via.placeholder.com/300x200"
              }
              alt=""
              className="property-list__image"
            />

            {/* CONTENT */}
            <div className="property-list__content">
              <h3>{item.basicInfo?.name || "Unnamed Property"}</h3>
              <p>{item.basicInfo?.category || "N/A"}</p>
              <h4>₹ {item.basicInfo?.salePrice || 0}</h4>
              <span>{item.location?.city || "Unknown Location"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
