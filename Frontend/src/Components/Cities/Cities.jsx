import { useMemo, useRef, useState } from "react";
import "./Cities.css";

import c1 from "../../assets/c1.jpg";
import c2 from "../../assets/c2.jpg";
import c3 from "../../assets/c3.jpg";
import c4 from "../../assets/c4.jpg";
import c5 from "../../assets/c5.jpg";
import c6 from "../../assets/c6.jpg";
import c7 from "../../assets/c7.jpg";
import c8 from "../../assets/c8.jpg";

export default function Cities() {
  const cities = [
    { id: 1, name: "New York", count: "300 Properties", img: c1 },
    { id: 2, name: "Singapore", count: "400 Properties", img: c2 },
    { id: 3, name: "Argentina", count: "740 Properties", img: c3 },
    { id: 4, name: "United Kingdom", count: "1450 Properties", img: c4 },
    { id: 5, name: "Paris", count: "520 Properties", img: c5 },
    { id: 6, name: "Dubai", count: "610 Properties", img: c6 },
    { id: 7, name: "Sydney", count: "280 Properties", img: c7 },
    { id: 8, name: "Tokyo", count: "830 Properties", img: c8 }
  ];

  const perPage = 4;

  const pages = useMemo(() => {
    const arr = [];
    for (let i = 0; i < cities.length; i += perPage) {
      arr.push(cities.slice(i, i + perPage));
    }
    return arr;
  }, [cities]);

  const [page, setPage] = useState(0);
  const pageCount = pages.length;

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(pageCount - 1, p + 1));

  const drag = useRef({ down: false, x: 0 });

  const down = (e) => {
    drag.current.down = true;
    drag.current.x = e.clientX || e.touches?.[0].clientX;
  };

  const up = (e) => {
    if (!drag.current.down) return;
    drag.current.down = false;
    const end = e.clientX || e.changedTouches?.[0].clientX;

    if (drag.current.x - end > 60) next();
    if (drag.current.x - end < -60) prev();
  };

  return (
    <section className="cities">
      <h2>Cities With Listing</h2>
      <p className="sub">Destinations we love the most</p>

      <div
        className="cities-slider"
        onMouseDown={down}
        onMouseUp={up}
        onTouchStart={down}
        onTouchEnd={up}
      >
        <button className="nav left" onClick={prev}>‹</button>

        <div className="track" style={{ transform: `translateX(-${page * 100}%)` }}>
          {pages.map((group, i) => (
            <div className="page" key={i}>
              {group.map((city) => (
                <div className="city-card" key={city.id}>
                  <img className="city-img" src={city.img} alt={city.name} />
                  <div className="city-overlay">
                    <div className="city-text">
                      <h3>{city.name}</h3>
                      <p>{city.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <button className="nav right" onClick={next}>›</button>
      </div>

      <div className="dots">
        {pages.map((_, i) => (
          <span
            key={i}
            className={i === page ? "dot active" : "dot"}
            onClick={() => setPage(i)}
          />
        ))}
      </div>
    </section>
  );
}