import React, { useEffect, useRef, useState } from "react";
import "./PropertyPosting.css";

import {
  FaEllipsisV,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaStar,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import API, { IMG_URL } from "../../api/axios";

const PropertyPosting = () => {

  const base = "PropertyPostGrid";

  const navigate = useNavigate();

  const menuRef = useRef(null);

  /* ================= STATES ================= */
  const [properties, setProperties] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activeMenu, setActiveMenu] = useState(null);

  /* ================= FETCH ================= */
  const fetchProperties = async () => {

    try {

      setLoading(true);

      const res = await API.get("/property");

      setProperties(res.data.data || []);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  /* ================= CLOSE MENU ================= */
  useEffect(() => {

    const closeMenu = (e) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => {
      document.removeEventListener(
        "click",
        closeMenu
      );
    };

  }, []);

  /* ================= MENU ================= */
  const toggleMenu = (id) => {

    setActiveMenu((prev) =>
      prev === id ? null : id
    );
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {

    try {

      const confirmDelete = window.confirm(
        "Delete this property?"
      );

      if (!confirmDelete) return;

      await API.delete(`/property/${id}`);

      setProperties((prev) =>
        prev.filter((item) => item._id !== id)
      );

    } catch (error) {

      console.error(error);
    }
  };

  /* ================= PUBLISH ================= */
const handlePublishToggle = async (
  id
) => {

  try {

    const res = await API.patch(
      `/property/toggle-status/${id}`
    );

    const updatedProperty =
      res.data.data;

    setProperties((prev) =>
      prev.map((item) =>
        item._id === id
          ? updatedProperty
          : item
      )
    );

    setActiveMenu(null);

  } catch (error) {

    console.error(error);
  }
};

  /* ================= EDIT ================= */
  const handleEdit = (id) => {

    navigate(`/flat/post/${id}`);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className={`${base}__loading`}>
        Loading properties...
      </div>
    );
  }

  return (
    <section className={base}>

      {/* HEADER */}
      <div className={`${base}__top`}>

        <div>
          <h1 className={`${base}__title`}>
            Property Management
          </h1>

          <p className={`${base}__subtitle`}>
            Manage all listed property details
          </p>
        </div>

      </div>

      {/* EMPTY */}
      {properties.length === 0 ? (

        <div className={`${base}__empty`}>
          No Properties Found
        </div>

      ) : (

        <div className={`${base}__grid`}>

          {properties.map((item) => {

            const features =
              item.features || {};

            return (

              <article
                key={item._id}
                className={`${base}__card`}
              >

                {/* IMAGE */}
                <div className={`${base}__imageWrap`}>

                  <img
                    src={
                      item.banner
                        ? `${IMG_URL}${item.banner}`
                        : "https://via.placeholder.com/500x300"
                    }
                    alt={item.title}
                    className={`${base}__image`}
                  />

                  {/* STATUS */}
                  <span
                    className={`${base}__statusTag} ${
                      item.status ===
                      "published"
                        ? `${base}__statusTag--published`
                        : `${base}__statusTag--draft`
                    }`}
                  >
                    {item.status ===
                    "published"
                      ? "Published"
                      : "Draft"}
                  </span>

                  {/* PRICE */}
                  <div className={`${base}__price`}>
                    ₹
                    {Number(
                      item.price
                    ).toLocaleString()}
                  </div>

                  {/* OWNER */}
                  <div className={`${base}__owner`}>

                    <img
                      src={
                        item.ownerImage
                          ? `${IMG_URL}${item.ownerImage}`
                          : "https://via.placeholder.com/50"
                      }
                      alt="owner"
                    />

                  </div>

<div
  className={`${base}__menu`}
  onClick={(e) => e.stopPropagation()}
>

  {/* MENU BUTTON */}
  <button
    type="button"
    className={`${base}__menuBtn`}
    onClick={(e) => {

      e.stopPropagation();

      toggleMenu(item._id);
    }}
  >
    <FaEllipsisV />
  </button>

  {/* DROPDOWN */}
  {activeMenu === item._id && (

    <div className={`${base}__dropdown`}>

      {/* PUBLISH / UNPUBLISH */}
      <button
        type="button"
        onClick={() =>
          handlePublishToggle(
            item._id,
            item.status
          )
        }
      >

        {item.status === "published" ? (
          <>
            <FaEyeSlash />
            Unpublish
          </>
        ) : (
          <>
            <FaEye />
            Publish
          </>
        )}

      </button>

      {/* EDIT */}
      <button
        type="button"
        onClick={() =>
          handleEdit(item._id)
        }
      >
        <FaEdit />
        Edit
      </button>

      {/* DELETE */}
      <button
        type="button"
        className={`${base}__deleteBtn`}
        onClick={() =>
          handleDelete(item._id)
        }
      >
        <FaTrash />
        Delete
      </button>

    </div>

  )}

</div>

                </div>

                {/* CONTENT */}
                <div className={`${base}__content`}>

                  {/* RATING */}
                  <div className={`${base}__rating`}>

                    <FaStar />

                    <span>
                      {item.rating || 0}
                    </span>

                  </div>

                  {/* TITLE */}
                  <h2 className={`${base}__propertyTitle`}>
                    {item.title}
                  </h2>

                  {/* LOCATION */}
                  <div className={`${base}__location`}>

                    <FaMapMarkerAlt />

                    <span>
                      {item.location}
                    </span>

                  </div>

                  {/* DESC */}
                  <p className={`${base}__desc`}>
                    {item.description}
                  </p>

                  {/* FEATURES */}
                  <div className={`${base}__features`}>

                    <div
                      className={`${base}__feature`}
                    >
                      <FaBed />

                      <span>
                        {
                          features.bedroom
                        }{" "}
                        Bed
                      </span>
                    </div>

                    <div
                      className={`${base}__feature`}
                    >
                      <FaBath />

                      <span>
                        {
                          features.bathroom
                        }{" "}
                        Bath
                      </span>
                    </div>

                    <div
                      className={`${base}__feature`}
                    >
                      <FaRulerCombined />

                      <span>
                        {item.sqft} Sqft
                      </span>
                    </div>

                  </div>

                  {/* FOOTER */}
                  <div className={`${base}__footer`}>

                    <div>
                      <strong>
                        Category:
                      </strong>{" "}
                      {item.category}
                    </div>

                    <div>
                      <strong>
                        Listed:
                      </strong>{" "}
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </div>

                  </div>

                </div>

              </article>

            );
          })}

        </div>

      )}

    </section>
  );
};

export default PropertyPosting;