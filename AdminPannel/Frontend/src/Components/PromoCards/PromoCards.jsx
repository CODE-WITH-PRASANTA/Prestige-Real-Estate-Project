import { useMemo, useState, useEffect } from "react";
import "./PromoCards.css";

import img1 from "../../assets/promo1.jpg";
import img2 from "../../assets/promo2.jpg";
import img3 from "../../assets/promo3.jpg";

export default function PromoCards() {

  const items = [
    { id: 1, img: img1, title: "Buy a Property", color: "red" },
    { id: 2, img: img2, title: "Sell a Property", color: "orange" },
    { id: 3, img: img3, title: "Rent a Property", color: "blue" },
    { id: 4, img: img1, title: "Buy a Property", color: "red" },
    { id: 5, img: img2, title: "Sell a Property", color: "orange" },
    { id: 6, img: img3, title: "Rent a Property", color: "blue" },
  ];

  /* ✅ RESPONSIVE */
  const getPerPage = () => {
    const w = window.innerWidth;
    if (w <= 768) return 1;
    if (w <= 1024) return 2;
    return 3;
  };

  const [perPage, setPerPage] = useState(getPerPage());
  const [page, setPage] = useState(0);

  useEffect(() => {
    const resize = () => {
      setPerPage(getPerPage());
      setPage(0);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ✅ GROUP INTO PAGES */
  const pages = useMemo(() => {
    const arr = [];
    for (let i = 0; i < items.length; i += perPage) {
      arr.push(items.slice(i, i + perPage));
    }
    return arr;
  }, [perPage]);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(pages.length - 1, p + 1));

  return (
    <section className="pc">

      <div className="pc-slider">

        <button className="pc-nav left" onClick={prev}>‹</button>

        <div
          className="pc-track"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >

          {pages.map((group, i) => (
            <div className="pc-page" key={i}>

              {group.map((x) => (
                <div className="pc-card" key={x.id}>

                  <img className="pc-img" src={x.img} alt={x.title} />

                  <div className="pc-action">
                    <h3>{x.title}</h3>
                    <button className={`pc-btn ${x.color}`}>→</button>
                  </div>

                </div>
              ))}

            </div>
          ))}

        </div>

        <button className="pc-nav right" onClick={next}>›</button>

      </div>

      {/* ✅ PAGINATION */}
      <div className="pc-pagination">

        <button onClick={prev} disabled={page === 0}>
          &lt;
        </button>

        {pages.map((_, i) => (
          <button
            key={i}
            className={page === i ? "active" : ""}
            onClick={() => setPage(i)}
          >
            {i + 1}
          </button>
        ))}

        <button onClick={next} disabled={page === pages.length - 1}>
          &gt;
        </button>

      </div>

    </section>
  );
}