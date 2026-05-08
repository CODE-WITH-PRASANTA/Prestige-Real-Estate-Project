import {
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";

import "./FeaturedProperties.css";

import API, {
  IMG_URL,
} from "../../api/axios";

export default function FeaturedProperties() {

  /* ================= STATES ================= */

  const [properties, setProperties] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /* ================= FETCH ================= */

  useEffect(() => {

    const fetchProperties =
      async () => {

        try {

          const res =
            await API.get(
              "/property"
            );

          const data =
            res.data.data || [];

          /* ONLY PUBLISHED */

          const published =
            data.filter(
              (item) =>
                item.status ===
                "published"
            );

          setProperties(published);

        } catch (error) {

          console.error(
            "Property Fetch Error:",
            error
          );

        } finally {

          setLoading(false);
        }
      };

    fetchProperties();

  }, []);

  /* ================= RESPONSIVE ================= */

  const getPerPage = () => {

    const width =
      window.innerWidth;

    if (width <= 768)
      return 1;

    if (width <= 1024)
      return 2;

    return 4;
  };

  const [perPage, setPerPage] =
    useState(getPerPage());

  const [page, setPage] =
    useState(0);

  useEffect(() => {

    const resize = () => {

      setPerPage(
        getPerPage()
      );

      setPage(0);
    };

    window.addEventListener(
      "resize",
      resize
    );

    return () =>
      window.removeEventListener(
        "resize",
        resize
      );

  }, []);

  /* ================= PAGINATION ================= */

  const pages = useMemo(() => {

    const arr = [];

    for (
      let i = 0;
      i < properties.length;
      i += perPage
    ) {

      arr.push(
        properties.slice(
          i,
          i + perPage
        )
      );
    }

    return arr;

  }, [properties, perPage]);

  const pageCount =
    pages.length;

  const prev = () =>
    setPage((p) =>
      Math.max(0, p - 1)
    );

  const next = () =>
    setPage((p) =>
      Math.min(
        pageCount - 1,
        p + 1
      )
    );

  /* ================= SWIPE ================= */

  const drag = useRef({
    down: false,
    x: 0,
  });

  const onDown = (e) => {

    drag.current.down = true;

    drag.current.x =
      e.clientX ||
      e.touches?.[0].clientX;
  };

  const onUp = (e) => {

    if (!drag.current.down)
      return;

    drag.current.down = false;

    const end =
      e.clientX ||
      e.changedTouches?.[0]
        .clientX;

    const diff =
      drag.current.x - end;

    if (diff > 60) next();

    if (diff < -60) prev();
  };

  /* ================= LOADING ================= */

  if (loading) {

    return (
      <div className="fp-loading">
        Loading Properties...
      </div>
    );
  }

  return (
    <section className="fp">

      {/* ================= HEADER ================= */}

      <div className="fp-head">

        <div>

          <h2>
            Featured Properties for Sale
          </h2>

          <p>
            Hand-picked premium
            properties
          </p>

        </div>

        <div className="fp-arrows">

          <button
            onClick={prev}
            disabled={page === 0}
          >
            ‹
          </button>

          <button
            onClick={next}
            disabled={
              page ===
              pageCount - 1
            }
          >
            ›
          </button>

        </div>

      </div>

      {/* ================= SLIDER ================= */}

      <div
        className="fp-slider"
        onMouseDown={onDown}
        onMouseUp={onUp}
        onTouchStart={onDown}
        onTouchEnd={onUp}
      >

        <div
          className="fp-track"
          style={{
            transform:
              `translateX(-${page * 100}%)`,
          }}
        >

          {pages.map(
            (group, i) => (

            <div
              className="fp-page"
              key={i}
            >

              {group.map((x) => {

                const features =
                  x.features || {};

                return (

                  <div
                    className="fp-card"
                    key={x._id}
                  >

                    {/* IMAGE */}

                    <div className="fp-img">

                      <img
                        src={
                          x.banner
                            ? `${IMG_URL}${x.banner}`
                            : "https://via.placeholder.com/500x300"
                        }
                        alt={x.title}
                      />

                      {/* CATEGORY */}

                      <div className="fp-topTags">

                        <span className="tag orange">

                          {x.category ||
                            "Property"}

                        </span>

                      </div>

                      {/* PRICE */}

                      <div className="fp-price">

                        <strong>

                          ₹
                          {Number(
                            x.price || 0
                          ).toLocaleString()}

                        </strong>

                      </div>

                      {/* LIKE */}

                      <button className="fp-like">

                        ♡

                      </button>

                    </div>

                    {/* CONTENT */}

                    <div className="fp-body">

                      {/* RATING */}

                      <div className="fp-row1">

                        <div className="fp-stars">

                          ★★★★★

                          <span>

                            {x.rating || 4.5}

                          </span>

                        </div>

                        <span className="fp-type">

                          {x.category}

                        </span>

                      </div>

                      {/* TITLE */}

                      <h3 className="fp-title">

                        {x.title}

                      </h3>

                      {/* LOCATION */}

                      <p className="fp-addr">

                        📍 {x.location}

                      </p>

                      {/* FEATURES */}

                      <div className="fp-features">

                        <div>

                          🛏{" "}

                          {features.bedroom || 0}

                          {" "}Bedroom

                        </div>

                        <div>

                          🛁{" "}

                          {features.bathroom || 0}

                          {" "}Bath

                        </div>

                        <div>

                          📐 {x.sqft || 0}

                          {" "}Sq Ft

                        </div>

                      </div>

                      {/* FOOTER */}

                      <div className="fp-footer">

                        <div className="fp-owner">

                          <div className="fp-avatar">

                            {x.title
                              ?.charAt(0)}

                          </div>

                          <div>

                            <div className="fp-ownerName">

                              {x.ownerName ||
                                "Admin"}

                            </div>

                            <div className="fp-country">

                              {x.location}

                            </div>

                          </div>

                        </div>

                        <button className="fp-btn">

                          View Details

                        </button>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          ))}

        </div>

      </div>

      {/* ================= DOTS ================= */}

      <div className="fp-dots">

        {pages.map((_, i) => (

          <span
            key={i}
            className={
              i === page
                ? "fp-dot active"
                : "fp-dot"
            }
            onClick={() =>
              setPage(i)
            }
          />

        ))}

      </div>

      {/* ================= BUTTON ================= */}

      <button className="fp-explore">

        Explore All →

      </button>

    </section>
  );
}