import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import "./GridProperty.css";

import API, {
  IMG_URL,
} from "../../api/axios";

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

  const [properties, setProperties] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [sortBy, setSortBy] =
    useState("default");

  const [viewType, setViewType] =
    useState("grid");

  const [visibleCount, setVisibleCount] =
    useState(6);

  const location = useLocation();

  /* ================= FILTER ================= */

  const filteredProperties =
    useMemo(() => {

      const params =
        new URLSearchParams(
          location.search
        );

      const category =
        params
          .get("category")
          ?.toLowerCase()
          .trim() || "";

      const type =
        params
          .get("type")
          ?.toLowerCase()
          .trim() || "";

      const searchLocation =
        params
          .get("location")
          ?.toLowerCase()
          .trim() || "";

      const minPrice = Number(
        params.get("minPrice") || 0
      );

      const maxPrice = Number(
        params.get("maxPrice") || 0
      );

      console.log({
        category,
        type,
        searchLocation,
        minPrice,
        maxPrice,
      });

      return properties.filter(
        (item) => {

          // CATEGORY
          if (category) {

            const categoryValue =
              (
                item.category || ""
              ).toLowerCase();

            if (
              !categoryValue.includes(
                category
              )
            ) {
              return false;
            }
          }

          // PROPERTY TYPE
          if (type) {

            const propertyType =
              (
                item.propertyType || ""
              ).toLowerCase();

            if (
              !propertyType.includes(
                type
              )
            ) {
              return false;
            }
          }

          // LOCATION
          if (searchLocation) {

            const locationValue =
              (
                item.location || ""
              ).toLowerCase();

            if (
              !locationValue.includes(
                searchLocation
              )
            ) {
              return false;
            }
          }

          // PRICE
          const priceValue =
            Number(
              item.priceValue || 0
            );

          if (
            minPrice &&
            priceValue < minPrice
          ) {
            return false;
          }

          if (
            maxPrice &&
            priceValue > maxPrice
          ) {
            return false;
          }

          return true;
        }
      );

    }, [
      properties,
      location.search,
    ]);

  /* ================= FETCH DATA ================= */

  useEffect(() => {

    const fetchProperties =
      async () => {

        try {

          const { data } =
            await API.get(
              "/property"
            );

          console.log(
            "✅ API RESPONSE:",
            data
          );

          const rawProperties =
            Array.isArray(data)
              ? data
              : Array.isArray(
                  data.data
                )
              ? data.data
              : Array.isArray(
                  data.properties
                )
              ? data.properties
              : [];

          const formatted =
            rawProperties.map(
              (
                item,
                index
              ) => {

                console.log(
                  "RAW ITEM:",
                  item
                );

                return {

                  id:
                    item._id ||
                    index,

                  _id:
                    item._id ||
                    index,

                  title:
                    item.title ||
                    "No Title",

                  // FILTER FIELDS
                  category:
                    (
                      item.category ||
                      ""
                    ).toLowerCase(),

                  // IMPORTANT
                  // CHANGE THIS FIELD
                  // ACCORDING TO YOUR
                  // BACKEND DATA
                  propertyType:
                    (
                      item.type ||
                      item.status ||
                      item.propertyStatus ||
                      item.propertyType ||
                      ""
                    ).toLowerCase(),

                  location:
                    (
                      item.location ||
                      ""
                    ).toLowerCase(),

                  priceValue:
                    Number(
                      item.price ||
                        0
                    ),

                  // DISPLAY FIELDS
                  banner:
                    item.banner ||
                    "",

                  ownerImage:
                    item.ownerImage ||
                    "",

                  featured:
                    item.featured ||
                    false,

                  rating:
                    item.rating ||
                    "4.5",

                  sqft:
                    item.sqft ||
                    0,

                  createdAt:
                    item.createdAt,

                  features:
                    item.features || {
                      bedroom: 0,
                      bathroom: 0,
                    },

                  fullDescription:
                    item.fullDescription ||
                    "",

                  price:
                    item.price ||
                    0,
                };
              }
            );

          console.log(
            "FORMATTED BUY DATA",
            formatted
          );

          setProperties(
            formatted
          );

        } catch (err) {

          console.error(
            "❌ FETCH ERROR:",
            err
          );

          setError(
            "Failed to load properties"
          );

        } finally {

          setLoading(false);

        }
      };

    fetchProperties();

  }, []);

  /* ================= SORT ================= */

  const sortedProperties =
    useMemo(() => {

      let sorted = [
        ...filteredProperties,
      ];

      switch (sortBy) {

        case "low":

          sorted.sort(
            (a, b) =>
              a.priceValue -
              b.priceValue
          );

          break;

        case "high":

          sorted.sort(
            (a, b) =>
              b.priceValue -
              a.priceValue
          );

          break;

        case "rating":

          sorted.sort(
            (a, b) =>
              Number(
                b.rating || 0
              ) -
              Number(
                a.rating || 0
              )
          );

          break;

        case "latest":

          sorted.sort(
            (a, b) =>
              new Date(
                b.createdAt
              ) -
              new Date(
                a.createdAt
              )
          );

          break;

        default:
          break;
      }

      return sorted;

    }, [
      filteredProperties,
      sortBy,
    ]);

  /* ================= LOAD MORE ================= */

  const visibleProperties =
    sortedProperties.slice(
      0,
      visibleCount
    );

  const handleLoadMore = () => {

    setVisibleCount(
      (prev) => prev + 6
    );
  };

  /* ================= LOADING ================= */

  if (loading) {

    return (
      <h2
        style={{
          textAlign: "center",
          padding: "40px",
        }}
      >
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
          padding: "40px",
        }}
      >
        {error}
      </h2>
    );
  }

  /* ================= RETURN ================= */

  return (
    <section className="gridProperty">

      <div className="gridProperty-container">

        {/* ================= TOOLBAR ================= */}

        <div className="gridProperty-toolbar">

          {/* RESULT */}

          <div className="gridProperty-result">

            Showing Result{" "}

            <span>
              {
                visibleProperties.length
              }
            </span>

          </div>

          <div className="gridProperty-toolbarRight">

            {/* SORT */}

            <div className="gridProperty-selectWrap">

              <label>
                Sort By
              </label>

              <div className="gridProperty-selectBox">

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value
                    )
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
                  viewType ===
                  "list"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setViewType(
                    "list"
                  )
                }
              >
                <FaListUl />
              </button>

              {/* GRID */}

              <button
                className={`gridProperty-viewBtn ${
                  viewType ===
                  "grid"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setViewType(
                    "grid"
                  )
                }
              >
                <FaThLarge />
              </button>

              {/* MAP */}

              <button
                className={`gridProperty-viewBtn ${
                  viewType ===
                  "map"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setViewType(
                    "map"
                  )
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
                viewType ===
                "list"
                  ? "gridProperty-gridList"
                  : ""
              }`}
            >

              {visibleProperties.map(
                (item) => (

                  <Link
                    to={`/property/${item._id}`}
                    key={item._id}
                    className={`gridProperty-card ${
                      viewType ===
                      "list"
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
                        alt={
                          item.title ||
                          "property"
                        }
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
                          item.price || 0
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

                        {item.title || "No Title"}

                      </h3>

                      {/* LOCATION */}

                      <div className="gridProperty-location">

                        <FaMapMarkerAlt />

                        <span>

                          {item.location ||
                            "Location not available"}

                        </span>

                      </div>

                      {/* FEATURES */}

                      <div className="gridProperty-features">

                        <div className="gridProperty-featureItem">

                          <FaBed />

                          <span>

                            {item.features
                              ?.bedroom ||
                              0} Bedroom

                          </span>

                        </div>

                        <div className="gridProperty-featureItem">

                          <FaBath />

                          <span>

                            {item.features
                              ?.bathroom ||
                              0} Bath

                          </span>

                        </div>

                        <div className="gridProperty-featureItem">

                          <FaRulerCombined />

                          <span>

                            {item.sqft || 0} Sq Ft

                          </span>

                        </div>

                      </div>

                      {/* META */}

                      <div className="gridProperty-meta">

                        <div>

                          <strong>
                            Listed on:
                          </strong>{" "}

                          {item.createdAt
                            ? new Date(
                                item.createdAt
                              ).toDateString()
                            : "N/A"}

                        </div>

                        <div>

                          <strong>
                            Category:
                          </strong>{" "}

                          {item.category ||
                            "Property"}

                        </div>

                      </div>

                    </div>

                  </Link>
                )
              )}

            </div>

            {/* ================= NO RESULT ================= */}

            {visibleProperties.length ===
              0 && (
              <div className="gridProperty-noResults">
                No properties match your search filters.
              </div>
            )}

            {/* ================= LOAD MORE ================= */}

            {visibleCount <
              sortedProperties.length && (

              <div className="gridProperty-loadMoreWrap">

                <button
                  className="gridProperty-loadMore"
                  onClick={
                    handleLoadMore
                  }
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