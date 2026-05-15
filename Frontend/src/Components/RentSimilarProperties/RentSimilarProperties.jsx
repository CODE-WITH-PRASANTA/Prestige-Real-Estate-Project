import React, {
  useEffect,
  useState,
  useMemo,
} from "react";

import "./RentSimilarProperties.css";

import { Link } from "react-router-dom";

import {
  FiMapPin,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import API, {
  IMG_URL,
} from "../../api/axios";

const RentSimilarProperties = ({
  currentId,
}) => {

  const [properties, setProperties] =
    useState([]);

  const [currentPage, setCurrentPage] =
    useState(1);

  const cardsPerPage = 4;

  // ================= FETCH =================

  useEffect(() => {

    const fetchProperties =
      async () => {

        try {

          const res =
            await API.get("/rent");

          const formatted =
            res.data
              .filter(
                (item) =>
                  item._id !== currentId
              )
              .map((item) => ({
                id: item._id,

                title: item.title,

                location:
                  item.location,

                price: `₹${item.rent}/month`,

                image:
                  item.images &&
                  item.images.length > 0
                    ? item.images[0].startsWith(
                        "http"
                      )
                      ? item.images[0]
                      : `${IMG_URL}/${item.images[0].replace(
                          /^\/+/,
                          ""
                        )}`
                    : "https://via.placeholder.com/400x300?text=No+Image",

                beds:
                  item.bedrooms,

                baths:
                  item.bathrooms,

                sqft:
                  item.sqft,
              }));

          setProperties(
            formatted
          );

        } catch (err) {

          console.error(err);

        }
      };

    fetchProperties();

  }, [currentId]);

  // ================= PAGINATION =================

  const totalPages =
    Math.ceil(
      properties.length /
        cardsPerPage
    );

  const currentCards =
    useMemo(() => {

      const start =
        (currentPage - 1) *
        cardsPerPage;

      return properties.slice(
        start,
        start + cardsPerPage
      );

    }, [
      properties,
      currentPage,
    ]);

  return (
    <div className="rent-similar-card">

      {/* TOP */}

      <div className="rent-similar-top">

        <div>

          <h2>
            Similar Properties
          </h2>

          <p>
            Explore more premium
            rental properties near
            this location
          </p>

        </div>

      </div>

      {/* GRID */}

      <div className="rent-similar-grid">

        {currentCards.map(
          (item) => (

            <div
              key={item.id}
              className="rent-similar-item"
            >

              {/* IMAGE */}

              <div className="rent-similar-image">

                <img
                  src={item.image}
                  alt={item.title}
                />

                <button className="rent-like-btn">

                  <FiHeart />

                </button>

              </div>

              {/* CONTENT */}

              <div className="rent-similar-content">

                <h3>
                  {item.title}
                </h3>

                <div className="rent-similar-location">

                  <FiMapPin />

                  <span>
                    {item.location}
                  </span>

                </div>

                <div className="rent-similar-stats">

                  <span>
                    🛏 {item.beds} Beds
                  </span>

                  <span>
                    🛁 {item.baths} Baths
                  </span>

                  <span>
                    📐 {item.sqft} sqft
                  </span>

                </div>

                <div className="rent-similar-bottom">

                  <h4>
                    {item.price}
                  </h4>

                  <Link
                    to={`/rent/details/${item.id}`}
                  >
                    View Details
                  </Link>

                </div>

              </div>

            </div>

          )
        )}

      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (

        <div className="rent-pagination">

          <button
            onClick={() =>
              setCurrentPage(
                (p) => p - 1
              )
            }
            disabled={
              currentPage === 1
            }
          >
            <FiChevronLeft />
          </button>

          <span>
            {currentPage} /{" "}
            {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage(
                (p) => p + 1
              )
            }
            disabled={
              currentPage ===
              totalPages
            }
          >
            <FiChevronRight />
          </button>

        </div>

      )}

    </div>
  );
};

export default RentSimilarProperties;