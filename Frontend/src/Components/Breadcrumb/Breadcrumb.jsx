import React from "react";
import "./Breadcrumb.css";
import heroImg from "../../assets/hero.jpg";

function Breadcrumb() {
  return (
    <div
      className="breadcrumb"
      style={{
        backgroundImage: `url(${heroImg})`,
      }}
    >
      {/* overlay */}
      <div className="overlay"></div>

      {/* content */}
      <div className="breadcrumb-content">
        <h1>
          Find Your Best Dream <br />
          House for Rental, Buy & Sell...
        </h1>

        <p>
          Properties for buy / rent in your location. We have more than 3000+
          listings for you to choose
        </p>

        {/* buttons */}
        <div className="buttons">
          <button className="btn primary">Buy Property</button>
          <button className="btn">Rent Property</button>
        </div>

        {/* search section */}
        <div className="search-bar">
          <div className="field">
            <label>Keyword</label>
            <select>
              <option>Select</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Plot</option>
            </select>
          </div>

          <div className="field">
            <label>Property Type</label>
            <select>
              <option>Select</option>
              <option>Buy</option>
              <option>Rent</option>
            </select>
          </div>

          <div className="field">
            <label>Address</label>
            <input type="text" />
          </div>

          <div className="field">
            <label>Min Price</label>
            <input type="text" placeholder="$" />
          </div>

          <div className="field">
            <label>Max Price</label>
            <input type="text" placeholder="$" />
          </div>

          <button className="search-btn">🔍</button>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb;