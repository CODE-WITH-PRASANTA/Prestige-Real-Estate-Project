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

  return (
    <section className="pc">
      <div className="pc-grid">
        {items.map((x) => (
          <div className="pc-card" key={x.id}>
            <img className="pc-img" src={x.img} alt={x.title} />

            <div className="pc-action">
              <h3>{x.title}</h3>
              <button className={`pc-btn ${x.color}`} aria-label="go">
                →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}