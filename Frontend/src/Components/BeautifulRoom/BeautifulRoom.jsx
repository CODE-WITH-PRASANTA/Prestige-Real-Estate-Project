import React, { useEffect, useMemo, useState } from "react";
import "./BeautifulRoom.css";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaStar,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCamera,
  FaTag,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import API, { IMG_URL } from "../../api/axios";

const BeautifulRoom = () => {
  const base = "beautifulRoom";

  /* ================= STATES ================= */
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        // ✅ BACKEND API
        const res = await API.get("/property");

        // ✅ STORE DATA
        setRooms(res.data.data || []);
      } catch (error) {
        console.error("Property Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  /* ================= PAGINATION ================= */
  const itemsPerPage = 4;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(rooms.length / itemsPerPage);

  const currentRooms = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    return rooms.slice(startIndex, startIndex + itemsPerPage);
  }, [rooms, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className={`${base}__loading`}>
        <h2>Loading Properties...</h2>
      </div>
    );
  }

  return (
    <section className={base}>
      <div className={`${base}__container`}>

        {/* ================= GRID ================= */}
        <div className={`${base}__grid`}>

          {currentRooms.map((room) => {

            // ✅ MAIN IMAGE
const propertyImage =
  room?.images?.length > 0
    ? `${IMG_URL}${room.images[0].replace(/\\/g, "/")}`
    : "https://via.placeholder.com/600x400";

            // ✅ OWNER IMAGE
const ownerImage =
  room?.ownerImage
    ? `${IMG_URL}${room.ownerImage.replace(/\\/g, "/")}`
    : "https://via.placeholder.com/100";

            return (
              <article
                className={`${base}__card`}
                key={room._id}
              >

                {/* IMAGE */}
                <div className={`${base}__imageWrap`}>

                  <img
                    src={propertyImage}
                    alt={room?.title}
                    className={`${base}__image`}
                  />

                  {/* TOP BUTTONS */}
                  <div className={`${base}__topBadges`}>

                    <button
                      className={`${base}__iconBtn} ${base}__iconBtn--pink`}
                    >
                      <FaCamera />
                    </button>

                    <button
                      className={`${base}__iconBtn} ${base}__iconBtn--orange`}
                    >
                      <FaTag />
                    </button>

                  </div>

                  {/* WISHLIST */}
                  <button className={`${base}__wishlistBtn`}>
                    <FaHeart />
                  </button>

                  {/* OWNER */}
                  <div className={`${base}__agentThumb`}>
                    <img src={ownerImage} alt="Owner" />
                  </div>

                  <div className={`${base}__imageOverlay`}></div>
                </div>

                {/* CONTENT */}
                <div className={`${base}__content`}>

                  {/* CATEGORY */}
                  <div className={`${base}__metaRow`}>

                    <span
                      className={`${base}__category ${base}__category--purple`}
                    >
                      {room?.propertyType || "Property"}
                    </span>

                    <span className={`${base}__listedOn`}>
                      Listed Property
                    </span>

                  </div>

                  {/* TITLE */}
                  <h3 className={`${base}__title`}>
                    {room?.title}
                  </h3>

                  {/* LOCATION */}
                  <div className={`${base}__location`}>
                    <FaMapMarkerAlt />

                    <span>
                      {room?.location || "No Location"}
                    </span>
                  </div>

                  {/* PRICE */}
                  <div className={`${base}__priceRating`}>

                    <div className={`${base}__priceWrap`}>

                      <span className={`${base}__price`}>
                        ₹ {room?.price || 0}
                      </span>

                      <span className={`${base}__duration`}>
                        / Sale
                      </span>

                    </div>

                    {/* RATING */}
                    <div className={`${base}__rating`}>

                      <div className={`${base}__stars`}>
                        {[...Array(5)].map((_, index) => (
                          <FaStar key={index} />
                        ))}
                      </div>

                      <span>5.0</span>

                    </div>

                  </div>

                  <div className={`${base}__divider`}></div>

                  {/* FEATURES */}
                  <div className={`${base}__features`}>

                    <div className={`${base}__featureItem`}>
                      <span className={`${base}__featureIcon`}>
                        <FaBed />
                      </span>

                      <span>
                        {room?.features?.bedroom || 0} Bedroom
                      </span>
                    </div>

                    <div className={`${base}__featureItem`}>
                      <span className={`${base}__featureIcon`}>
                        <FaBath />
                      </span>

                      <span>
                        {room?.features?.bathroom || 0} Bath
                      </span>
                    </div>

                    <div className={`${base}__featureItem`}>
                      <span className={`${base}__featureIcon`}>
                        <FaRulerCombined />
                      </span>

                      <span>
                        {room?.area || 0} Sq Ft
                      </span>
                    </div>

                  </div>

                </div>
              </article>
            );
          })}
        </div>

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className={`${base}__pagination`}>

            {/* PREV */}
            <button
              className={`${base}__pageBtn`}
              disabled={currentPage === 1}
              onClick={() =>
                handlePageChange(currentPage - 1)
              }
            >
              <FaChevronLeft />
            </button>

            {/* PAGE NUMBERS */}
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`${base}__pageBtn ${
                    currentPage === page
                      ? `${base}__pageBtn--active`
                      : ""
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* NEXT */}
            <button
              className={`${base}__pageBtn`}
              disabled={currentPage === totalPages}
              onClick={() =>
                handlePageChange(currentPage + 1)
              }
            >
              <FaChevronRight />
            </button>

          </div>
        )}
      </div>
    </section>
  );
};

export default BeautifulRoom;