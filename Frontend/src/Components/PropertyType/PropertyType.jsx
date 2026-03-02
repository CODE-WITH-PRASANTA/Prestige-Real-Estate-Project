import { useEffect, useMemo, useRef } from "react";
import "./PropertyType.css";

import office from "../../assets/icons/office.png";
import villa from "../../assets/icons/villa.png";
import apartment from "../../assets/icons/apartment.png"; // use your real filename
import house from "../../assets/icons/house.png";

export default function PropertyType() {
  const trackRef = useRef(null);
  const autoRef = useRef(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });

  const items = useMemo(
    () => [
      { id: 1, title: "Offices", count: "45 Properties", icon: office },
      { id: 2, title: "Villas", count: "28 Properties", icon: villa },
      { id: 3, title: "Apartment", count: "35 Properties", icon: apartment },
      { id: 4, title: "Houses", count: "30 Properties", icon: house },
      // ✅ repeat to ensure long scroll
      { id: 5, title: "Offices", count: "52 Properties", icon: office },
      { id: 6, title: "Villas", count: "19 Properties", icon: villa },
      { id: 7, title: "Apartment", count: "41 Properties", icon: apartment },
      { id: 8, title: "Houses", count: "26 Properties", icon: house },
    ],
    []
  );

  const slide = (dir) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector(".ptS-card");
    if (!card) return;

    const gap = 16;
    const cardW = card.getBoundingClientRect().width + gap;
    const visible = Math.max(1, Math.floor(track.clientWidth / cardW));
    const move = visible * cardW;

    track.scrollBy({ left: dir * move, behavior: "smooth" });
  };

  // ✅ auto-scroll (pause on hover)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const start = () => {
      stop();
      autoRef.current = setInterval(() => {
        const max = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= max - 10) track.scrollTo({ left: 0, behavior: "smooth" });
        else slide(1);
      }, 2800);
    };

    const stop = () => {
      if (autoRef.current) clearInterval(autoRef.current);
      autoRef.current = null;
    };

    start();
    track.addEventListener("mouseenter", stop);
    track.addEventListener("mouseleave", start);

    return () => {
      stop();
      track.removeEventListener("mouseenter", stop);
      track.removeEventListener("mouseleave", start);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ drag/swipe
  const onDown = (x) => {
    const track = trackRef.current;
    if (!track) return;
    drag.current.down = true;
    drag.current.startX = x;
    drag.current.startLeft = track.scrollLeft;
  };

  const onMove = (x) => {
    const track = trackRef.current;
    if (!track || !drag.current.down) return;
    const dx = x - drag.current.startX;
    track.scrollLeft = drag.current.startLeft - dx;
  };

  const onUp = () => {
    drag.current.down = false;
  };

  return (
    <section className="ptS">
      <div className="ptS-wrap">
        <div className="ptS-left">
          <h2>
            Explore by <br /> Property Type
          </h2>
          <p>
            Whether you're looking for a cozy apartment, a luxurious villa, or a commercial
            investment — we’ve got you covered.
          </p>

          <div className="ptS-arrows">
            <button onClick={() => slide(-1)} aria-label="Previous">←</button>
            <button onClick={() => slide(1)} aria-label="Next">→</button>
          </div>
        </div>

        <div className="ptS-right">
          <div
            className="ptS-track"
            ref={trackRef}
            onMouseDown={(e) => onDown(e.clientX)}
            onMouseMove={(e) => onMove(e.clientX)}
            onMouseUp={onUp}
            onMouseLeave={onUp}
            onTouchStart={(e) => onDown(e.touches[0].clientX)}
            onTouchMove={(e) => onMove(e.touches[0].clientX)}
            onTouchEnd={onUp}
          >
            {items.map((it) => (
              <div className="ptS-card" key={it.id}>
                <div className="ptS-icon">
                  <img src={it.icon} alt={it.title} draggable="false" />
                </div>
                <div className="ptS-meta">
                  <h3>{it.title}</h3>
                  <span>{it.count}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="ptS-fade left" />
          <div className="ptS-fade right" />
        </div>
      </div>
    </section>
  );
}