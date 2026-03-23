import React, { useEffect, useMemo, useRef, useState } from "react";
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
  const sectionRef = useRef(null);

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
  const [anim, setAnim] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () => {
      const pv = getPerViewFromCSS(sliderRef.current);
      setPerView((prev) => (prev !== pv ? pv : prev));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".cr-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cr-active");
          }
        });
      },
      { threshold: 0.18 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const totalReal = data.length;

  const extended = useMemo(() => {
    const head = data.slice(0, perView);
    const tail = data.slice(-perView);
    return [...tail, ...data, ...head];
  }, [data, perView]);

  useEffect(() => {
    setAnim(false);
    setIndex(perView);
    const t = setTimeout(() => setAnim(true), 0);
    return () => clearTimeout(t);
  }, [perView]);

  const next = () => setIndex((i) => i + 1);
  const prev = () => setIndex((i) => i - 1);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 3000);
    return () => clearInterval(id);
  }, [paused]);

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

  const activeDot = ((index - perView) % totalReal + totalReal) % totalReal;
  const goDot = (dotIdx) => setIndex(perView + dotIdx);

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
            style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
            onTransitionEnd={onTransitionEnd}
          >
            {extended.map((x, i) => (
              <div className="cr-slide" key={`${x.id}-${i}`}>
                <div
                  className="cr-card"
                  style={{ animationDelay: `${(i % perView) * 0.12}s` }}
                >
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

        <button className="cr-nav left" onClick={prev} aria-label="Previous" type="button">
          ‹
        </button>
        <button className="cr-nav right" onClick={next} aria-label="Next" type="button">
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