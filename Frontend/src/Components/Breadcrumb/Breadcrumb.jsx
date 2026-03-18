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
          Prestige Real Estate properties <br />
          Find Your Perfect Home to Buy or Rent
        </h1>

        <p>
          Discover thoughtfully designed homes, apartments, and villas with 
          Prestige. Whether you are looking to buy your dream home or find a 
          comfortable rental, explore verified properties in prime locations 
          at the right price.
        </p>

        {/* buttons */}
        <div className="buttons">
          <button className="btn primary">Explore Properties</button>
          <button className="btn">View Rentals</button>
        </div>

        {/* search section */}
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

          <button className="search-btn">Search Property</button>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb;