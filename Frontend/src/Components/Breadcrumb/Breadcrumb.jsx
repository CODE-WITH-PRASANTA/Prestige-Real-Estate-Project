import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Breadcrumb.css";
import heroImg from "../../assets/hero.jpg";

function Breadcrumb() {
  const navigate = useNavigate();

  const [propertyMode, setPropertyMode] = useState("buy");
  const [propertyType, setPropertyType] = useState("");
  const [propertyCategory, setPropertyCategory] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("mode", propertyMode);

    if (propertyType) {
      params.set("category", propertyType);
    }
    if (propertyCategory) {
      params.set("type", propertyCategory);
    }
    if (locationValue.trim()) {
      params.set("location", locationValue.trim());
    }
    if (minPrice.trim()) {
      params.set("minPrice", minPrice.trim());
    }
    if (maxPrice.trim()) {
      params.set("maxPrice", maxPrice.trim());
    }

    const path = propertyMode === "rent" ? "/rent/property" : "/buyproperties";

    navigate({ pathname: path, search: params.toString() });
  };

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
          <button
            className={`btn primary ${propertyMode === "buy" ? "active" : ""}`}
            onClick={() => setPropertyMode("buy")}
          >
            Explore Properties
          </button>
          <button
            className={`btn secondary ${propertyMode === "rent" ? "active" : ""}`}
            onClick={() => setPropertyMode("rent")}
          >
            View Rentals
          </button>
        </div>

        <div className="search-section">
          <div className="search-bar">

            <div className="field">
              <label>
                {propertyMode === "buy" ? "Property" : "Rental Property"}
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">{propertyMode === "buy" ? "Select Property" : "Select Rental"}</option>

                {propertyMode === "buy" ? (
                  <>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Plot">Plot</option>
                  </>
                ) : (
                  <>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="PG">PG</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Office Space">Office Space</option>
                  </>
                )}
              </select>
            </div>

            <div className="field">
              <label>Type</label>
              <select
                value={propertyCategory}
                onChange={(e) => setPropertyCategory(e.target.value)}
              >
                <option value="">{propertyMode === "buy" ? "Select Type" : "Select Rental Type"}</option>

                {propertyMode === "buy" ? (
                  <>
                    <option value="Ready To Move">Ready To Move</option>
                    <option value="New Launch">New Launch</option>
                    <option value="Luxury">Luxury</option>
                  </>
                ) : (
                  <>
                    <option value="Monthly Rent">Monthly Rent</option>
                    <option value="Yearly Lease">Yearly Lease</option>
                    <option value="Short Stay">Short Stay</option>
                  </>
                )}
              </select>
            </div>

            <div className="field">
              <label>Location</label>
              <input
                type="text"
                value={locationValue}
                onChange={(e) => setLocationValue(e.target.value)}
                placeholder={propertyMode === "buy" ? "Enter location" : "Enter rental area"}
              />
            </div>

            <div className="field">
              <label>{propertyMode === "buy" ? "Min Price" : "Min Rent"}</label>
              <input
                type="text"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder={propertyMode === "buy" ? "₹ Min" : "₹ Monthly"}
              />
            </div>

            <div className="field">
              <label>{propertyMode === "buy" ? "Max Price" : "Max Rent"}</label>
              <input
                type="text"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder={propertyMode === "buy" ? "₹ Max" : "₹ Budget"}
              />
            </div>

          </div>

          <div className="search-btn-row">
            <button
              className="search-btn"
              type="button"
              onClick={handleSearch}
            >
              Search Property
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Breadcrumb;