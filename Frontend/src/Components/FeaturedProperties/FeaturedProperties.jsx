import { useMemo, useRef, useState } from "react";
import "./FeaturedProperties.css";

import p1 from "../../assets/p1.jpg";
import p2 from "../../assets/p2.jpg";
import p3 from "../../assets/p3.jpg";
import p4 from "../../assets/p4.jpg";
import p5 from "../../assets/p5.jpg";
import p6 from "../../assets/p6.jpg";
import p7 from "../../assets/p7.jpg";
import p8 from "../../assets/p8.jpg";

export default function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      title: "Serenity Condo Suite",
      address: "17, Grove Towers, New York, USA",
      price: "$21000",
      type: "Lodge",
      tags: ["New", "Featured"],
      ratingText: "Excellent",
      beds: 4,
      baths: 4,
      sqft: 350,
      owner: "Ethan Brooks",
      country: "United States",
      img: p1,
    },
    {
      id: 2,
      title: "Gateway Apartment",
      address: "54, Coral Sands Apartments, Australia",
      price: "$1130",
      type: "Apartment",
      tags: [],
      ratingText: "Excellent",
      beds: 2,
      baths: 4,
      sqft: 350,
      owner: "Olivia Hayes",
      country: "Australia",
      img: p2,
    },
    {
      id: 3,
      title: "Coral Bay Cabins",
      address: "7, Rosewood Court, Brighton, UK",
      price: "$1580",
      type: "Residency",
      tags: [],
      ratingText: "Excellent",
      beds: 5,
      baths: 3,
      sqft: 700,
      owner: "Sophia Mitchell",
      country: "United Kingdom",
      img: p3,
    },
    {
      id: 4,
      title: "Majestic Stay",
      address: "10, Bella Vista Villas, Rome, Italy",
      price: "$4500",
      type: "Residency",
      tags: [],
      ratingText: "Excellent",
      beds: 3,
      baths: 1,
      sqft: 400,
      owner: "Leo Ramirez",
      country: "Italy",
      img: p4,
    },
    {
      id: 5,
      title: "Ocean Breeze Villa",
      address: "Palm Bay Street, Dubai, UAE",
      price: "$3200",
      type: "Villa",
      tags: ["Featured"],
      ratingText: "Excellent",
      beds: 4,
      baths: 3,
      sqft: 560,
      owner: "Ayaan Khan",
      country: "UAE",
      img: p5,
    },
    {
      id: 6,
      title: "Skyline Luxury Home",
      address: "Downtown, Singapore",
      price: "$2500",
      type: "Apartment",
      tags: ["New"],
      ratingText: "Excellent",
      beds: 2,
      baths: 2,
      sqft: 420,
      owner: "Daniel Lee",
      country: "Singapore",
      img: p6,
    },
    {
      id: 7,
      title: "Green Valley House",
      address: "Hillside Road, Sydney, Australia",
      price: "$1800",
      type: "House",
      tags: [],
      ratingText: "Excellent",
      beds: 3,
      baths: 2,
      sqft: 480,
      owner: "Emma Wilson",
      country: "Australia",
      img: p7,
    },
    {
      id: 8,
      title: "Central City Studio",
      address: "Main Street, Tokyo, Japan",
      price: "$990",
      type: "Studio",
      tags: ["Featured"],
      ratingText: "Excellent",
      beds: 1,
      baths: 1,
      sqft: 260,
      owner: "Haruto Tanaka",
      country: "Japan",
      img: p8,
    },
  ];

  const perPage = 4;

  const pages = useMemo(() => {
    const arr = [];
    for (let i = 0; i < properties.length; i += perPage) {
      arr.push(properties.slice(i, i + perPage));
    }
    return arr;
  }, [properties]);

  const [page, setPage] = useState(0);
  const pageCount = pages.length;

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(pageCount - 1, p + 1));

  const drag = useRef({ down: false, x: 0 });

  const onDown = (e) => {
    drag.current.down = true;
    drag.current.x = e.clientX || e.touches?.[0].clientX;
  };

  const onUp = (e) => {
    if (!drag.current.down) return;
    drag.current.down = false;

    const end = e.clientX || e.changedTouches?.[0].clientX;
    const diff = drag.current.x - end;

    if (diff > 60) next();
    if (diff < -60) prev();
  };

  return (
    <section className="fp">
      <div className="fp-head">
        <div>
          <h2>Featured Properties for Rent</h2>
          <p>Hand-picked selection of quality places</p>
        </div>

        <div className="fp-arrows">
          <button onClick={prev} disabled={page === 0}>
            ‹
          </button>
          <button onClick={next} disabled={page === pageCount - 1}>
            ›
          </button>
        </div>
      </div>

      <div
        className="fp-slider"
        onMouseDown={onDown}
        onMouseUp={onUp}
        onTouchStart={onDown}
        onTouchEnd={onUp}
      >
        <div className="fp-track" style={{ transform: `translateX(-${page * 100}%)` }}>
          {pages.map((group, i) => (
            <div className="fp-page" key={i}>
              {group.map((x) => (
                <div className="fp-card" key={x.id}>
                  <div className="fp-img">
                    <img src={x.img} alt={x.title} />

                    <div className="fp-topTags">
                      {x.tags.includes("New") && <span className="tag red">New</span>}
                      {x.tags.includes("Featured") && (
                        <span className="tag orange">Featured</span>
                      )}
                    </div>

                    <div className="fp-price">
                      <strong>{x.price}</strong> <span>/ Night</span>
                    </div>

                    <button className="fp-like" type="button" aria-label="like">
                      ♡
                    </button>
                  </div>

                  <div className="fp-body">
                    <div className="fp-row1">
                      <div className="fp-stars">
                        ★★★★★ <span>{x.ratingText}</span>
                      </div>
                      <span className="fp-type">{x.type}</span>
                    </div>

                    <h3 className="fp-title">{x.title}</h3>
                    <p className="fp-addr">📍 {x.address}</p>

                    <div className="fp-features">
                      <div>🛏 {x.beds} Bedroom</div>
                      <div>🛁 {x.baths} Bath</div>
                      <div>📐 {x.sqft} Sq Ft</div>
                    </div>

                    <div className="fp-footer">
                      <div className="fp-owner">
                        <div className="fp-avatar">{x.owner[0]}</div>
                        <div>
                          <div className="fp-ownerName">{x.owner}</div>
                          <div className="fp-country">{x.country}</div>
                        </div>
                      </div>

                      <button className="fp-btn" type="button">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="fp-dots">
        {pages.map((_, i) => (
          <span
            key={i}
            className={i === page ? "fp-dot active" : "fp-dot"}
            onClick={() => setPage(i)}
          />
        ))}
      </div>

      <button className="fp-explore" type="button">
        Explore All →
      </button>
    </section>
  );
}