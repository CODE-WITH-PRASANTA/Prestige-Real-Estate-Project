import React, { useEffect, useState } from "react";
import "./PropertyPosting.css";
import { FaEllipsisV } from "react-icons/fa";
import API, { IMG_URL } from "../../api/axios";

export default function PropertyPost() {
  const [properties, setProperties] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  // ---------------- MENU TOGGLE ----------------
  const toggleMenu = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  // close menu on outside click
  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // prevent menu click from closing instantly
  const stopPropagation = (e) => e.stopPropagation();

  // ---------------- IMAGE FIX ----------------
  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/300";
    if (img.startsWith("http")) return img;

    const clean = img.replace(/\\/g, "/");
    return clean.startsWith("/") ? `${IMG_URL}${clean}` : `${IMG_URL}/${clean}`;
  };

  // ---------------- FETCH ----------------
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const res = await API.get("/property");
      const data = res.data?.data || [];
      setProperties(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setError("Failed to load properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // ---------------- ACTION WRAPPER ----------------
  const runAction = async (callback) => {
    try {
      setActionLoading(true);
      await callback();
      await fetchProperties();
      setActiveMenu(null);
    } catch (err) {
      console.log(err);
      alert("Action failed. Try again.");
    } finally {
      setActionLoading(false);
    }
  };

  // ---------------- ACTIONS ----------------
  const handleDelete = (id) =>
    runAction(() => API.delete(`/property/${id}`));

  const handlePublish = (id) =>
    runAction(() => API.patch(`/property/${id}/publish`));

  const handleUnpublish = (id) =>
    runAction(() => API.patch(`/property/${id}/unpublish`));

  const handleEdit = (item) => {
    const newTitle = prompt("Edit Title", item.title);
    if (!newTitle) return;

    return runAction(() =>
      API.put(`/property/${item._id}`, { title: newTitle })
    );
  };

  // ---------------- LOADING ----------------
  if (loading)
    return <p style={{ textAlign: "center" }}>Loading...</p>;

  if (error)
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div className="pp-container">
      {properties.length === 0 ? (
        <p style={{ textAlign: "center" }}>No properties found</p>
      ) : (
        properties.map((item) => {
          const features = item.features || {};

          return (
            <div className="pp-card" key={item._id}>
              
              {/* IMAGE */}
              <div className="pp-imgBox">
                <img
                  src={
                    item.images?.length
                      ? getImageUrl(item.images[0])
                      : item.banner
                      ? getImageUrl(item.banner)
                      : "https://via.placeholder.com/300"
                  }
                  alt="property"
                />

                <span className="pp-tag">
                  {item.status === "published" ? "Published" : "Draft"}
                </span>

                <span className="pp-price">₹{item.price || 0}</span>

                {item.ownerImage && (
                  <img
                    className="pp-user"
                    src={getImageUrl(item.ownerImage)}
                    alt="owner"
                  />
                )}

                {/* MENU */}
                <div className="pp-menu" onClick={stopPropagation}>
                  <FaEllipsisV onClick={() => toggleMenu(item._id)} />

                  {activeMenu === item._id && (
                    <div className="pp-dropdown">

                      <p onClick={() => handlePublish(item._id)}>
                        {actionLoading ? "Processing..." : "Publish"}
                      </p>

                      <p onClick={() => handleUnpublish(item._id)}>
                        Unpublish
                      </p>

                      <p onClick={() => handleEdit(item)}>
                        Edit
                      </p>

                      <p
                        className="danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </p>

                    </div>
                  )}
                </div>
              </div>

              {/* CONTENT */}
              <div className="pp-content">
                <div className="pp-rating">
                  ⭐ {item.rating || 0} ({item.reviews || 0})
                </div>

                <h3>{item.title}</h3>

                <p className="pp-location">📍 {item.location}</p>

                <div className="pp-features">
                  <span>🛏 {features.bedroom || 0} Bedroom</span>
                  <span>🛁 {features.bathroom || 0} Bath</span>
                  <span>📐 {item.sqft || item.area || "N/A"}</span>
                </div>

                <div className="pp-footer">
                  <p>
                    <strong>Listed:</strong>{" "}
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>

                  <p>
                    <strong>Category:</strong>{" "}
                    {item.category || "Property"}
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