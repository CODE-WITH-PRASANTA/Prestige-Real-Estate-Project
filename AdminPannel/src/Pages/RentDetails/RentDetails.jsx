import React, { useEffect, useState } from "react";
import "./RentDetails.css";
import API, { IMG_URL } from "../../api/axios";

import {
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiMapPin,
  FiHome,
} from "react-icons/fi";

const RentDetails = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ MENU STATE
  const [openMenu, setOpenMenu] = useState(null);

  // ================= CLOSE MENU =================
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenu(null);
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // ================= FETCH =================
  useEffect(() => {
    const fetchRent = async () => {
      try {
        const res = await API.get("/rent");

        const updated = res.data.map((item) => ({
          ...item,
          published:
            item.published !== undefined
              ? item.published
              : true,
        }));

        setProperties(updated);
      } catch (err) {
        console.error(err);
        setError("Failed to load properties");
      } finally {
        setLoading(false);
      }
    };

    fetchRent();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/rent/${id}`);

      setProperties((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ================= PUBLISH =================
  const togglePublish = (id) => {
    setProperties((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              published: !item.published,
            }
          : item
      )
    );
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    console.log("Edit Property:", item);

    // later you can navigate edit page
    // navigate(`/admin/rent/edit/${item._id}`)
  };

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div className="rent-container">
      {/* ================= HEADER ================= */}
      <div className="rent-header">
        <h2 className="rent-heading">
          Rental Properties
        </h2>

        <span className="rent-count">
          {properties.length} Properties
        </span>
      </div>

      {/* ================= GRID ================= */}
      <div className="rent-grid">
        {properties.map((item) => {
          // ================= IMAGE =================
          let imageUrl =
            "https://via.placeholder.com/400x300?text=No+Image";

          if (item.images && item.images.length > 0) {
            const img = item.images[0];

            imageUrl = img.startsWith("http")
              ? img
              : `${IMG_URL}/${img.replace(/^\/+/, "")}`;
          }

          return (
            <div
              key={item._id}
              className="rent-card"
            >
              {/* ================= IMAGE ================= */}
              <div className="rent-image-wrapper">
                <img
                  src={imageUrl}
                  alt={item.title}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=Image+Error";
                  }}
                />

                {/* TAG */}
                <span className="rent-tag">
                  {item.published
                    ? "Published"
                    : "Unpublished"}
                </span>

                {/* PRICE */}
                <div className="rent-price">
                  ₹{item.rent}
                </div>

                {/* ================= 3 DOT MENU ================= */}
                <div className="rent-menu-wrapper">
                  <button
                    className="rent-menu-btn"
                    onClick={(e) => {
                      e.stopPropagation();

                      setOpenMenu(
                        openMenu === item._id
                          ? null
                          : item._id
                      );
                    }}
                  >
                    <FiMoreVertical />
                  </button>

                  {openMenu === item._id && (
                    <div
                      className="rent-dropdown"
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >
                      {/* EDIT */}
                      <button
                        onClick={() =>
                          handleEdit(item)
                        }
                      >
                        <FiEdit2 />
                        Edit
                      </button>

                      {/* PUBLISH */}
                      <button
                        onClick={() =>
                          togglePublish(item._id)
                        }
                      >
                        {item.published ? (
                          <>
                            <FiXCircle />
                            Unpublish
                          </>
                        ) : (
                          <>
                            <FiCheckCircle />
                            Publish
                          </>
                        )}
                      </button>

                      {/* DELETE */}
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(item._id)
                        }
                      >
                        <FiTrash2 />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* ================= CONTENT ================= */}
              <div className="rent-content">
                <h3>{item.title}</h3>

                {/* LOCATION */}
                <p className="rent-location">
                  <FiMapPin />
                  {item.location}
                </p>

                {/* FEATURES */}
                <div className="rent-features">
                  <span>
                    <FiHome />
                    {item.bedrooms || 0} Beds
                  </span>

                  <span>
                    🛁 {item.bathrooms || 0} Baths
                  </span>

                  <span>
                    📐 {item.sqft || 0} sqft
                  </span>
                </div>

                {/* DESCRIPTION */}
                <p className="rent-description">
                  {item.description
                    ?.replace(/<[^>]+>/g, "")
                    ?.slice(0, 90) ||
                    "No description available"}
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