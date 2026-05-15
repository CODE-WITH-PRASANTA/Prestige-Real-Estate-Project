import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ClientReviews.css";
import { API, IMG_URL } from "../../api/axios";

function getPerViewFromCSS(el) {
  if (!el) return 4;

  const value = getComputedStyle(el)
    .getPropertyValue("--perView")
    .trim();

  const num = parseInt(value, 10);

  return Number.isFinite(num) && num > 0 ? num : 4;
}

export default function ClientReviews() {
  // ================= REFS =================
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  // ================= STATE =================
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [perView, setPerView] = useState(4);
  const [index, setIndex] = useState(0);

  const [anim, setAnim] = useState(true);
  const [paused, setPaused] = useState(false);

  // ================= FETCH TESTIMONIALS =================
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);

      const res = await API.get("/testimonials");

      console.log("FULL API RESPONSE 👉", res);
      console.log("TESTIMONIAL DATA 👉", res?.data?.data);

      // ================= SAFE ARRAY CHECK =================
      if (
        res?.data &&
        Array.isArray(res.data.data)
      ) {
        setData(res.data.data);
      } else {
        console.warn("Testimonials data is not array");
        setData([]);
      }
    } catch (error) {
      console.error("FETCH TESTIMONIAL ERROR 👉", error);

      setData([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= RESPONSIVE PER VIEW =================
  useEffect(() => {
    const updatePerView = () => {
      const pv = getPerViewFromCSS(sliderRef.current);

      setPerView((prev) => {
        return prev !== pv ? pv : prev;
      });
    };

    updatePerView();

    window.addEventListener("resize", updatePerView);

    return () => {
      window.removeEventListener("resize", updatePerView);
    };
  }, []);

  // ================= REVEAL ANIMATION =================
  useEffect(() => {
    if (!sectionRef.current) return;

    const elements =
      sectionRef.current.querySelectorAll(".cr-reveal");

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cr-active");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [data]);

  // ================= SAFE VALUES =================
  const totalReal = data.length;

  const safePerView =
    totalReal > 0
      ? Math.min(perView, totalReal)
      : 1;

  // ================= EXTENDED ARRAY FOR LOOP =================
  const extended = useMemo(() => {
    if (!data.length) return [];

    const head = data.slice(0, safePerView);
    const tail = data.slice(-safePerView);

    return [...tail, ...data, ...head];
  }, [data, safePerView]);

  // ================= RESET INDEX =================
  useEffect(() => {
    if (!data.length) return;

    setAnim(false);
    setIndex(safePerView);

    const timer = setTimeout(() => {
      setAnim(true);
    }, 20);

    return () => clearTimeout(timer);
  }, [safePerView, data]);

  // ================= NEXT / PREV =================
  const next = () => {
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    setIndex((prev) => prev - 1);
  };

  // ================= AUTO SLIDE =================
  useEffect(() => {
    if (
      paused ||
      data.length <= safePerView
    )
      return;

    const interval = setInterval(() => {
      next();
    }, 3000);

    return () => clearInterval(interval);
  }, [paused, data, safePerView]);

  // ================= INFINITE LOOP FIX =================
  const onTransitionEnd = () => {
    // RIGHT SIDE END
    if (index >= safePerView + totalReal) {
      setAnim(false);

      setIndex(safePerView);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnim(true);
        });
      });
    }

    // LEFT SIDE END
    else if (index < safePerView) {
      setAnim(false);

      setIndex(
        safePerView + totalReal - 1
      );

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnim(true);
        });
      });
    }
  };

  // ================= ACTIVE DOT =================
  const activeDot =
    (((index - safePerView) % totalReal) +
      totalReal) %
    totalReal;

  const goDot = (dotIndex) => {
    setIndex(safePerView + dotIndex);
  };

  // ================= DRAG SLIDE =================
  const drag = useRef({
    down: false,
    x: 0,
  });

  const handleDown = (e) => {
    drag.current.down = true;

    drag.current.x =
      e.clientX ||
      e.touches?.[0]?.clientX ||
      0;

    setPaused(true);
  };

  const handleUp = (e) => {
    if (!drag.current.down) return;

    drag.current.down = false;

    const endX =
      e.clientX ||
      e.changedTouches?.[0]?.clientX ||
      0;

    const diff = drag.current.x - endX;

    // MIN SWIPE DISTANCE
    if (Math.abs(diff) < 60) {
      setPaused(false);
      return;
    }

    if (diff > 0) {
      next();
    } else {
      prev();
    }

    setPaused(false);
  };

  // ================= LOADING UI =================
  if (loading) {
    return (
      <section className="cr">
        <div className="cr-loading">
          <h2>Loading Reviews...</h2>
        </div>
      </section>
    );
  }

  // ================= EMPTY UI =================
  if (!loading && data.length === 0) {
    return (
      <section className="cr">
        <div className="cr-empty">
          <h2>No Testimonials Found</h2>
        </div>
      </section>
    );
  }

  return (
    <section
      className="cr"
      ref={sectionRef}
    >
      {/* BACKGROUND */}
      <div className="cr-bg cr-bg-one"></div>
      <div className="cr-bg cr-bg-two"></div>

      {/* HEADER */}
      <div className="cr-head">
        <h2 className="cr-reveal">
          Client Reviews
        </h2>

        <div className="cr-line cr-reveal cr-delay-1"></div>

        <p className="cr-reveal cr-delay-2">
          What our happy clients say
        </p>
      </div>

      {/* SLIDER */}
      <div
        className="cr-slider cr-reveal cr-delay-3"
        ref={sliderRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onMouseDown={handleDown}
        onMouseUp={handleUp}
        onTouchStart={handleDown}
        onTouchEnd={handleUp}
      >
        <div className="cr-mask">
          <div
            className={`cr-track ${
              anim ? "anim" : ""
            }`}
            style={{
              transform: `translateX(-${
                index * (100 / safePerView)
              }%)`,
            }}
            onTransitionEnd={
              onTransitionEnd
            }
          >
            {extended.map((item, i) => (
              <div
                className="cr-slide"
                key={`${item._id || i}-${i}`}
              >
                <div
                  className="cr-card"
                  style={{
                    animationDelay: `${
                      (i % perView) * 0.1
                    }s`,
                  }}
                >
                  {/* IMAGE */}
                  <div className="cr-avatar">
                    <img
                      src={
                        item.image
                          ? `${IMG_URL}${item.image}`
                          : "/no-user.png"
                      }
                      alt={item.name || "user"}
                      onError={(e) => {
                        e.target.src =
                          "/no-user.png";
                      }}
                    />
                  </div>

                  {/* FEEDBACK */}
                  <p className="cr-text">
                    {item.feedback}
                  </p>

                  {/* NAME */}
                  <h3 className="cr-name">
                    {item.name}
                  </h3>

                  {/* STARS */}
                  <div className="cr-stars">
                    {"★".repeat(
                      item.rating || 5
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LEFT BUTTON */}
        <button
          className="cr-nav left"
          onClick={prev}
          type="button"
          aria-label="Previous"
        >
          ‹
        </button>

        {/* RIGHT BUTTON */}
        <button
          className="cr-nav right"
          onClick={next}
          type="button"
          aria-label="Next"
        >
          ›
        </button>

        {/* DOTS */}
        <div className="cr-dots">
          {data.map((_, i) => (
            <span
              key={i}
              className={
                i === activeDot
                  ? "cr-dot active"
                  : "cr-dot"
              }
              onClick={() => goDot(i)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}