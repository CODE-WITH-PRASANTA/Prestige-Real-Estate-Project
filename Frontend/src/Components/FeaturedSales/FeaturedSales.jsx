import { useMemo, useRef, useState, useEffect } from "react";
import "./FeaturedSales.css";

import p1 from "../../assets/p1.jpg";
import p2 from "../../assets/p2.jpg";
import p3 from "../../assets/p3.jpg";
import p4 from "../../assets/p4.jpg";
import p5 from "../../assets/p5.jpg";
import p6 from "../../assets/p6.jpg";
import p7 from "../../assets/p7.jpg";
import p8 from "../../assets/p8.jpg";
import p9 from "../../assets/p9.jpg";
import p10 from "../../assets/p10.jpg";
import p11 from "../../assets/p11.jpg";
import p12 from "../../assets/p12.jpg";

const listings = [
  {
    id: 1,
    img: p1,
    price: "$2470",
    rating: 4.4,
    reviews: 79,
    title: "Elite Suite Room",
    address: "42, Maple Grove Residences, USA",
    bed: "2 Bedroom",
    bath: "1 Bath",
    sqft: "480 Sq Ft",
    date: "14 Apr 2025",
    category: "Suite",
  },
  {
    id: 2,
    img: p2,
    price: "$21000",
    rating: 5.0,
    reviews: 20,
    title: "Serenity Condo Suite",
    address: "17, Grove Towers, New York, USA",
    bed: "4 Bedroom",
    bath: "4 Bath",
    sqft: "350 Sq Ft",
    date: "16 Jan 2023",
    category: "Apartment",
  },
  {
    id: 3,
    img: p3,
    price: "$1900",
    rating: 4.6,
    reviews: 47,
    title: "Celestial Residency",
    address: "28, Hilltop Gardens, San Francisco, USA",
    bed: "2 Bedroom",
    bath: "2 Bath",
    sqft: "354 Sq Ft",
    date: "06 Apr 2025",
    category: "Villa",
  },
  {
    id: 4,
    img: p4,
    price: "$1370",
    rating: 4.8,
    reviews: 26,
    title: "Palm Cove Bungalows",
    address: "42, Pine Residency, Miami, USA",
    bed: "5 Bedroom",
    bath: "3 Bath",
    sqft: "700 Sq Ft",
    date: "16 Mar 2025",
    category: "Bungalow",
  },
  {
    id: 5,
    img: p5,
    price: "$4100",
    rating: 4.7,
    reviews: 44,
    title: "Luxury Villa",
    address: "Ocean Drive, Miami, USA",
    bed: "4 Bedroom",
    bath: "3 Bath",
    sqft: "900 Sq Ft",
    date: "19 Jun 2024",
    category: "Villa",
  },
  {
    id: 6,
    img: p6,
    price: "$1800",
    rating: 4.3,
    reviews: 18,
    title: "Minimal Studio",
    address: "Lake Road, Chicago, USA",
    bed: "1 Bedroom",
    bath: "1 Bath",
    sqft: "300 Sq Ft",
    date: "05 Mar 2024",
    category: "Studio",
  },
  {
    id: 7,
    img: p7,
    price: "$6800",
    rating: 4.9,
    reviews: 72,
    title: "Penthouse Premium",
    address: "5th Avenue, New York, USA",
    bed: "5 Bedroom",
    bath: "4 Bath",
    sqft: "1200 Sq Ft",
    date: "11 Dec 2024",
    category: "Penthouse",
  },
  {
    id: 8,
    img: p8,
    price: "$2400",
    rating: 4.5,
    reviews: 29,
    title: "Apartment Modern",
    address: "Green Street, Seattle, USA",
    bed: "2 Bedroom",
    bath: "2 Bath",
    sqft: "500 Sq Ft",
    date: "28 Apr 2024",
    category: "Apartment",
  },
  {
    id: 9,
    img: p9,
    price: "$3600",
    rating: 4.6,
    reviews: 37,
    title: "Family House",
    address: "Austin Downtown, USA",
    bed: "3 Bedroom",
    bath: "2 Bath",
    sqft: "750 Sq Ft",
    date: "08 May 2024",
    category: "House",
  },
  {
    id: 10,
    img: p10,
    price: "$7500",
    rating: 4.9,
    reviews: 88,
    title: "Luxury Penthouse",
    address: "Manhattan, New York, USA",
    bed: "4 Bedroom",
    bath: "4 Bath",
    sqft: "1100 Sq Ft",
    date: "03 Jan 2025",
    category: "Penthouse",
  },
  {
    id: 11,
    img: p11,
    price: "$6200",
    rating: 4.8,
    reviews: 49,
    title: "Smart Villa",
    address: "Palm Beach, Miami, USA",
    bed: "4 Bedroom",
    bath: "3 Bath",
    sqft: "980 Sq Ft",
    date: "16 Nov 2024",
    category: "Villa",
  },
  {
    id: 12,
    img: p12,
    price: "$1700",
    rating: 4.2,
    reviews: 15,
    title: "Classic Apartment",
    address: "Boston Center, USA",
    bed: "2 Bedroom",
    bath: "1 Bath",
    sqft: "420 Sq Ft",
    date: "20 Feb 2024",
    category: "Apartment",
  },
];

function Stars({ value }) {
  const full = Math.round(value);
  return (
    <span className="fs-stars">
      {"★".repeat(full)}
      <span className="fs-stars-dim">{"★".repeat(5 - full)}</span>
    </span>
  );
}

export default function FeaturedSales() {

  const getPerPage = () => {
    const width = window.innerWidth;

    if (width <= 768) return 2;
    if (width <= 1024) return 2;
    return 4;
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

  const pages = useMemo(() => {
    const arr = [];
    for (let i = 0; i < listings.length; i += perPage) {
      arr.push(listings.slice(i, i + perPage));
    }
    return arr;
  }, [perPage]);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(pages.length - 1, p + 1));

  const viewportRef = useRef(null);
  const drag = useRef({ dragging: false, startX: 0, dx: 0, startPage: 0 });

  const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const onDown = (e) => {
    drag.current.dragging = true;
    drag.current.startX = getX(e);
    drag.current.startPage = page;
  };

  const onMove = (e) => {
    if (!drag.current.dragging) return;

    const x = getX(e);
    const dx = x - drag.current.startX;
    drag.current.dx = dx;

    const percent = (dx / viewportRef.current.clientWidth) * 100;

    const track = viewportRef.current.querySelector(".fs-track");
    track.style.transition = "none";
    track.style.transform = `translateX(calc(-${drag.current.startPage * 100}% + ${percent}%))`;
  };

  const onUp = () => {
    if (!drag.current.dragging) return;

    drag.current.dragging = false;

    const threshold = viewportRef.current.clientWidth * 0.18;
    const dx = drag.current.dx;

    const track = viewportRef.current.querySelector(".fs-track");
    track.style.transition = "";

    if (dx < -threshold) next();
    else if (dx > threshold) prev();
  };

  return (
    <section className="fs">
      <div className="fs-wrap">

        <div className="fs-top">
          <h2>Featured Properties for Sales</h2>

          <div className="fs-arrows">
            <button onClick={prev} disabled={page === 0}>‹</button>
            <button onClick={next} disabled={page === pages.length - 1}>›</button>
          </div>
        </div>

        <div
          className="fs-viewport"
          ref={viewportRef}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          onTouchStart={onDown}
          onTouchMove={onMove}
          onTouchEnd={onUp}
        >

          <div
            className="fs-track"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >

            {pages.map((group, i) => (
              <div className="fs-page" key={i}>

                {group.map((x) => (
                  <article className="fs-card" key={x.id}>

                    <div className="fs-media">
                      <img src={x.img} alt={x.title} />
                      <div className="fs-price">{x.price}</div>
                      <div className="fs-avatar">👤</div>
                      <div className="fs-mediaShade"></div>
                    </div>

                    <div className="fs-body">

                      <div className="fs-rating">
                        <Stars value={x.rating} />
                        <span className="fs-ratingText">
                          {x.rating} ({x.reviews})
                        </span>
                      </div>

                      <h3 className="fs-title">{x.title}</h3>

                      <p className="fs-address">📍 {x.address}</p>

                      <div className="fs-features">
                        <div className="fs-chip">🛏️ {x.bed}</div>
                        <div className="fs-chip">🛁 {x.bath}</div>
                        <div className="fs-chip">📐 {x.sqft}</div>
                      </div>

                      <div className="fs-footer">
                        <span>Listed on : {x.date}</span>
                        <span>Category : {x.category}</span>
                      </div>

                    </div>

                  </article>
                ))}

              </div>
            ))}

          </div>
        </div>

        <div className="fs-dots">
          {pages.map((_, i) => (
            <button
              key={i}
              className={`fs-dot ${page === i ? "active" : ""}`}
              onClick={() => setPage(i)}
            />
          ))}
        </div>

        <div className="fs-explore">
          <button className="fs-exploreBtn">
            Explore All →
          </button>
        </div>

      </div>
    </section>
  );
}