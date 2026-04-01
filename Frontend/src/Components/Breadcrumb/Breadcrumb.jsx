import React from "react";
import "./Breadcrumb.css";
import heroImg from "../../assets/hero.jpg";

function Breadcrumb() {
  return (
    <section
      className="breadcrumb"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="overlay"></div>

      <div className="breadcrumb-content">

        <span className="breadcrumb-badge">
          Prestige Real Estate
        </span>

        <h1>
          Find Your Dream Property <br />
          with Prestige Real Estate
        </h1>

        <p>
          Explore premium apartments, villas, and plots in prime locations.
          Whether you're buying or renting, Prestige brings you verified
          properties designed for modern living and long-term value.
        </p>

        <div className="buttons">
          <button className="btn primary">Explore Properties</button>
          <button className="btn secondary">View Rentals</button>
        </div>

        <div className="search-section">
          <div className="search-bar">

            <div className="field">
              <label>Property</label>
              <select>
                <option>Select Property</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Plot</option>
              </select>
            </div>

            <div className="field">
              <label>Type</label>
              <select>
                <option>Select Type</option>
                <option>Buy</option>
                <option>Rent</option>
              </select>
            </div>

            <div className="field">
              <label>Location</label>
              <input type="text" placeholder="Enter location" />
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