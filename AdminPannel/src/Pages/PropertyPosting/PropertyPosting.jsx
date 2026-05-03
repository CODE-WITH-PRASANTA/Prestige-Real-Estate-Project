import React, { useState, useEffect } from "react";
import "./PropertyPosting.css";
import { FaEllipsisV } from "react-icons/fa";

export default function PropertyPost() {
  const [properties, setProperties] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);

  // ---------------- STATIC DATA ----------------
  useEffect(() => {
    const dummyData = [
      {
        _id: "1",
        title: "Luxury Villa",
        price: 2500000,
        location: "Bhubaneswar",
        status: "published",
        rating: 4.5,
        reviews: 20,
        images: ["https://via.placeholder.com/300"],
        ownerImage: "https://via.placeholder.com/50",
        features: { bedroom: 3, bathroom: 2 },
        sqft: "1500 sqft",
        category: "Villa",
        createdAt: new Date(),
      },
      {
        _id: "2",
        title: "Modern Apartment",
        price: 1500000,
        location: "Cuttack",
        status: "draft",
        rating: 4.2,
        reviews: 10,
        images: ["https://via.placeholder.com/300"],
        ownerImage: "https://via.placeholder.com/50",
        features: { bedroom: 2, bathroom: 1 },
        sqft: "900 sqft",
        category: "Apartment",
        createdAt: new Date(),
      },
    ];

    setProperties(dummyData);
  }, []);

  // ---------------- MENU ----------------
  const toggleMenu = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const close = () => setActiveMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const stopPropagation = (e) => e.stopPropagation();

  // ---------------- ACTIONS (FRONTEND ONLY) ----------------
  const handleDelete = (id) => {
    setProperties((prev) => prev.filter((item) => item._id !== id));
  };

  const handlePublish = (id) => {
    setProperties((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, status: "published" } : item
      )
    );
  };

  const handleUnpublish = (id) => {
    setProperties((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, status: "draft" } : item
      )
    );
  };

  const handleEdit = (item) => {
    const newTitle = prompt("Edit Title", item.title);
    if (!newTitle) return;

    setProperties((prev) =>
      prev.map((p) =>
        p._id === item._id ? { ...p, title: newTitle } : p
      )
    );
  };

  // ---------------- UI ----------------
  return (
    <div className="pp-container">
      {properties.length === 0 ? (
        <p className="pp-empty">No properties found</p>
      ) : (
        properties.map((item) => {
          const features = item.features || {};

          return (
            <div className="pp-card" key={item._id}>
              
              <div className="pp-imgBox">
                <img src={item.images[0]} alt="property" />

                <span className="pp-tag">
                  {item.status === "published" ? "Published" : "Draft"}
                </span>

                <span className="pp-price">₹{item.price}</span>

                <img
                  className="pp-user"
                  src={item.ownerImage}
                  alt="owner"
                />

                {/* MENU */}
                <div className="pp-menu" onClick={stopPropagation}>
                  <FaEllipsisV onClick={() => toggleMenu(item._id)} />

                  {activeMenu === item._id && (
                    <div className="pp-dropdown">
                      <p onClick={() => handlePublish(item._id)}>Publish</p>
                      <p onClick={() => handleUnpublish(item._id)}>Unpublish</p>
                      <p onClick={() => handleEdit(item)}>Edit</p>
                      <p className="danger" onClick={() => handleDelete(item._id)}>
                        Delete
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pp-content">
                <div className="pp-rating">
                  ⭐ {item.rating} ({item.reviews})
                </div>

                <h3>{item.title}</h3>

                <p className="pp-location">📍 {item.location}</p>

                <div className="pp-features">
                  <span>🛏 {features.bedroom} Bedroom</span>
                  <span>🛁 {features.bathroom} Bath</span>
                  <span>📐 {item.sqft}</span>
                </div>

                <div className="pp-footer">
                  <p>
                    <strong>Listed:</strong>{" "}
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>

                  <p>
                    <strong>Category:</strong> {item.category}
                  </p>
                </div>
              </div>

            </div>
          );
        })
      )}
    </div>
  );
}