import React, { useEffect, useRef } from "react";
import "./HomeBreadcrumb.css";
import heroImg from "../../assets/hero.jpg";

function HomeBreadcrumb() {
  const sectionRef = useRef();

  useEffect(() => {
    const el = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("hb-show");
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hb-hero"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="hb-overlay"></div>

      <div className="hb-container">

        <div className="hb-left">

          <h1 className="hb-title">
            Find Your Best Dream House
            for Rental, Buy & Sell...
          </h1>

          <p className="hb-sub">
            Properties for buy / rent in your location. We have more than
            3000+ listings for you to choose
          </p>

          <div className="hb-buttons">
            <button className="hb-btn hb-btn-primary">
              Buy Property
            </button>

            <button className="hb-btn">
              Rent Property
            </button>
          </div>

        </div>

      </div>

      {/* SEARCH */}
      <div className="hb-search-wrap">

        <div className="hb-search">

          <div className="hb-field">
            <label>Keyword</label>
            <select>
              <option>Select</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Plot</option>
            </select>
          </div>

          <div className="hb-field">
            <label>Property Type</label>
            <select>
              <option>Select</option>
              <option>Buy</option>
              <option>Rent</option>
            </select>
          </div>

          <div className="hb-field">
            <label>Address</label>
            <input type="text" />
          </div>

          <div className="hb-field">
            <label>Min Price</label>
            <input type="text" placeholder="$" />
          </div>

          <div className="hb-field">
            <label>Max Price</label>
            <input type="text" placeholder="$" />
          </div>

          <button className="hb-search-btn">
            🔍
          </button>

        </div>

      </div>

    </section>
  );
}

export default HomeBreadcrumb;