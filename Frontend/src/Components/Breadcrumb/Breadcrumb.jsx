import React, { useEffect, useRef } from "react";
import "./Breadcrumb.css";
import heroImg from "../../assets/hero.jpg";

function Breadcrumb() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll(".reveal-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="breadcrumb"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="overlay"></div>

      <div className="breadcrumb-content">
        <span className="breadcrumb-badge reveal-item">Prestige Properties</span>

        <h1 className="reveal-item delay-1">
          Prestige Real Estate Properties <br />
          Find Your Perfect Home to Buy or Rent
        </h1>

        <p className="reveal-item delay-2">
          Discover thoughtfully designed homes, apartments, and villas with
          Prestige. Whether you are looking to buy your dream home or find a
          comfortable rental, explore verified properties in prime locations
          at the right price.
        </p>

        <div className="buttons reveal-item delay-3">
          <button className="btn primary">Explore Properties</button>
          <button className="btn">View Rentals</button>
        </div>

        <div className="search-section reveal-item delay-4">
          <div className="search-bar">
            <div className="field">
              <label>Keyword</label>
              <select>
                <option>Select Property</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Plot</option>
              </select>
            </div>

            <div className="field">
              <label>Property Type</label>
              <select>
                <option>Select Type</option>
                <option>Buy</option>
                <option>Rent</option>
              </select>
            </div>

            <div className="field">
              <label>Location</label>
              <input type="text" placeholder="Enter city or area" />
            </div>

            <div className="field">
              <label>Min Price</label>
              <input type="text" placeholder="₹ Min" />
            </div>

            <div className="field">
              <label>Max Price</label>
              <input type="text" placeholder="₹ Max" />
            </div>
          </div>

          <div className="search-btn-row">
            <button className="search-btn">Search Property</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Breadcrumb;