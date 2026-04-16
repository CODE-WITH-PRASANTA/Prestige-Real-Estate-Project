import React, { useEffect, useMemo, useRef, useState } from "react";
import "./ClientReviews.css";
import { API, IMG_URL } from "../../api/axios";

function getPerViewFromCSS(el) {
  if (!el) return 4;
  const v = getComputedStyle(el).getPropertyValue("--perView").trim();
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : 4;
}

export default function ClientReviews() {
  // ================= STATE =================
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [perView, setPerView] = useState(4);
  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState(true);
  const [paused, setPaused] = useState(false);
  const [data, setData] = useState([]);

  // ================= FETCH =================
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await API.get("/testimonials");
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= RESPONSIVE =================
  useEffect(() => {
    const update = () => {
      const pv = getPerViewFromCSS(sliderRef.current);
      setPerView((prev) => (prev !== pv ? pv : prev));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ================= ANIMATION OBSERVER =================
  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll(".cr-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cr-active");
          }
        });
      },
      { threshold: 0.18 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // ================= CORE LOGIC =================
  const totalReal = data.length || 1;
  const safePerView = Math.min(perView, data.length || 1);

  // ================= EXTENDED =================
  const extended = useMemo(() => {
    const head = data.slice(0, safePerView);
    const tail = data.slice(-safePerView);
    return [...tail, ...data, ...head];
  }, [data, safePerView]);

  // ================= RESET INDEX =================
  useEffect(() => {
    setAnim(false);
    setIndex(safePerView);
    const t = setTimeout(() => setAnim(true), 0);
    return () => clearTimeout(t);
  }, [safePerView]);

  // ================= AUTO SLIDE =================
  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  useEffect(() => {
    if (paused || data.length <= safePerView) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [paused, data, safePerView]);

  // ================= LOOP FIX =================
  const onTransitionEnd = () => {
    if (index >= safePerView + totalReal) {
      setAnim(false);
      setIndex(safePerView);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    } else if (index < safePerView) {
      setAnim(false);
      setIndex(safePerView + totalReal - 1);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    }
  };

  // ================= DOTS =================
  const activeDot =
    (((index - safePerView) % totalReal) + totalReal) % totalReal;

  const goDot = (dotIdx) => setIndex(safePerView + dotIdx);

  // ================= DRAG =================
  const drag = useRef({ down: false, x: 0 });

  const down = (e) => {
    drag.current.down = true;
    drag.current.x = e.clientX || e.touches?.[0]?.clientX || 0;
    setPaused(true);
  };

  const up = (e) => {
    if (!drag.current.down) return;
    drag.current.down = false;

    const end = e.clientX || e.changedTouches?.[0]?.clientX || 0;
    const diff = drag.current.x - end;

    if (Math.abs(diff) < 60) {
      setPaused(false);
      return;
    }

    diff > 0 ? next() : prev();
    setPaused(false);
  };

  // ================= UI STATES =================
  if (loading) {
    return (
      <section className="cr">
        <p style={{ textAlign: "center" }}>Loading...</p>
      </section>
    );
  }

  if (data.length === 0) {
    return (
      <section className="cr">
        <p style={{ textAlign: "center" }}>No testimonials found</p>
      </section>
    );
  }
  return (
    <section className="cr" ref={sectionRef}>
      <div className="cr-bg cr-bg-one"></div>
      <div className="cr-bg cr-bg-two"></div>

      <div className="cr-head">
        <h2 className="cr-reveal">Client Reviews</h2>

        <div className="cr-line cr-reveal cr-delay-1" />
        <p className="cr-reveal cr-delay-2">What our happy clients say</p>
      </div>

      <div
        className="cr-slider cr-reveal cr-delay-3"
        ref={sliderRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onMouseDown={down}
        onMouseUp={up}
        onTouchStart={down}
        onTouchEnd={up}
      >
        <div className="cr-mask">
          <div
            className={`cr-track ${anim ? "anim" : ""}`}
            style={{
              transform: `translateX(-${index * (100 / safePerView)}%)`,
            }}
            onTransitionEnd={onTransitionEnd}
          >
            {extended.map((x, i) => (
              <div className="cr-slide" key={`${x._id || i}-${i}`}>
                <div
                  className="cr-card"
                  style={{ animationDelay: `${(i % perView) * 0.12}s` }}
                >
                  <div className="cr-avatar">
                    <img
                      src={x.image ? `${IMG_URL}${x.image}` : "/no-user.png"}
                      alt={x.name}
                      onError={(e) => (e.target.src = "/no-user.png")}
                    />
                  </div>

                  <p className="cr-text">{x.feedback}</p>
                  <h3 className="cr-name">{x.name}</h3>
                  <div className="cr-stars">{"★".repeat(x.rating)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="cr-nav left"
          onClick={prev}
          aria-label="Previous"
          type="button"
        >
          ‹
        </button>
        <button
          className="cr-nav right"
          onClick={next}
          aria-label="Next"
          type="button"
        >
          ›
        </button>

        <div className="cr-dots">
          {data.map((_, i) => (
            <span
              key={i}
              className={i === activeDot ? "cr-dot active" : "cr-dot"}
              onClick={() => goDot(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
