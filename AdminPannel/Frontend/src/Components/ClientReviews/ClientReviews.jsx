import { useEffect, useMemo, useRef, useState } from "react";
import "./ClientReviews.css";

import t1 from "../../assets/t1.jpg";
import t2 from "../../assets/t2.jpg";

function getPerViewFromCSS(el) {
  if (!el) return 4;
  const v = getComputedStyle(el).getPropertyValue("--perView").trim();
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : 4;
}

export default function ClientReviews() {
  // 4 cards (using only 2 images)
  const data = useMemo(
    () => [
      {
        id: 1,
        name: "Lily Brooks",
        text:
          "Booking our dream home was incredibly easy with Dreams Estate. The interface was user-friendly.",
        img: t1,
        stars: 5,
      },
      {
        id: 2,
        name: "Daniel Cooper",
        text:
          "Dreams Estate made home booking a breeze. Super easy and stress-free! Best listing portal.",
        img: t2,
        stars: 5,
      },
      {
        id: 3,
        name: "Olivia Hayes",
        text:
          "Professional agents and smooth process. I found the perfect place quickly. Highly recommended.",
        img: t1,
        stars: 5,
      },
      {
        id: 4,
        name: "Ethan Brooks",
        text:
          "Fast listings, clean UI, and great support. This platform feels premium and reliable.",
        img: t2,
        stars: 5,
      },
    ],
    []
  );

  const sliderRef = useRef(null);

  const [perView, setPerView] = useState(4);
  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState(true); // ✅ IMPORTANT (fix your error)
  const [paused, setPaused] = useState(false);

  // Read --perView from CSS (responsive)
  useEffect(() => {
    const update = () => {
      const pv = getPerViewFromCSS(sliderRef.current);
      setPerView((prev) => (prev !== pv ? pv : prev));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  
  const totalReal = data.length;

  // infinite list: clone last perView + original + clone first perView
  const extended = useMemo(() => {
    const head = data.slice(0, perView);
    const tail = data.slice(-perView);
    return [...tail, ...data, ...head];
  }, [data, perView]);

  // start at first "real" item
  useEffect(() => {
    setAnim(false);
    setIndex(perView);
    const t = setTimeout(() => setAnim(true), 0);
    return () => clearTimeout(t);
  }, [perView]);

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  // auto-slide
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [paused]);

  // snap after animation for infinite loop
  const onTransitionEnd = () => {
    if (index >= perView + totalReal) {
      setAnim(false);
      setIndex(perView);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnim(true))
      );
    } else if (index < perView) {
      setAnim(false);
      setIndex(perView + totalReal - 1);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setAnim(true))
      );
    }
  };

  // dots
  const activeDot = ((index - perView) % totalReal + totalReal) % totalReal;
  const goDot = (dotIdx) => setIndex(perView + dotIdx);

  // drag/swipe (mouse + touch)
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

  return (
    <section className="cr">
      <div className="cr-head">
        <h2>Client Reviews</h2>
        <div className="cr-line" />
        <p>What our happy clients say</p>
      </div>

      <div
        className="cr-slider"
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
            style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
            onTransitionEnd={onTransitionEnd}
          >
            {extended.map((x, i) => (
              <div className="cr-slide" key={`${x.id}-${i}`}>
                <div className="cr-card">
                  <div className="cr-avatar">
                    <img src={x.img} alt={x.name} />
                  </div>

                  <p className="cr-text">{x.text}</p>
                  <h3 className="cr-name">{x.name}</h3>
                  <div className="cr-stars">{"★".repeat(x.stars)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="cr-nav left" onClick={prev} aria-label="Previous">
          ‹
        </button>
        <button className="cr-nav right" onClick={next} aria-label="Next">
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