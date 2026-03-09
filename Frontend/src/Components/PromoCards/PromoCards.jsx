import { useState } from "react";
import "./PromoCards.css";

import img1 from "../../assets/promo1.jpg";
import img2 from "../../assets/promo2.jpg";
import img3 from "../../assets/promo3.jpg";

export default function PromoCards() {

  const items = [
    { id: 1, img: img1, title: "Buy a Property", color: "red" },
    { id: 2, img: img2, title: "Sell a Property", color: "orange" },
    { id: 3, img: img3, title: "Rent a Property", color: "blue" }
  ];

  const [page, setPage] = useState(0);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(items.length - 1, p + 1));

  return (
    <section className="pc">

      <div className="pc-slider">

        <button className="pc-nav left" onClick={prev}>‹</button>

        <div
          className="pc-track"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {items.map((x) => (
            <div className="pc-card" key={x.id}>

              <img className="pc-img" src={x.img} alt={x.title} />

              <div className="pc-action">
                <h3>{x.title}</h3>
                <button className={`pc-btn ${x.color}`}>→</button>
              </div>

            </div>
          ))}
        </div>

        <button className="pc-nav right" onClick={next}>›</button>

      </div>

      {/* Pagination Dots */}

      <div className="pc-dots">
        {items.map((_, i) => (
          <span
            key={i}
            className={i === page ? "pc-dot active" : "pc-dot"}
            onClick={() => setPage(i)}
          />
        ))}
      </div>

    </section>
  );
}