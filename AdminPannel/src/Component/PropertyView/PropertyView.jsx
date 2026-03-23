import React, { useState } from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaStar,
  FaTimes,
} from "react-icons/fa";

import "./PropertyView.css";

const properties = [
  {
    id: 1,
    title: "Whitepace Vintage Villa",
    price: "$375,000",
    status: "sale",
    img: "https://picsum.photos/500/350?1",
    address: "929 Hart St, Brooklyn, NY",
    beds: 3,
    baths: 2,
    sqft: 1025,
    rating: 4.8,
  },
  {
    id: 2,
    title: "Sunset Studio Apartment",
    price: "$1,250 / month",
    status: "rent",
    img: "https://picsum.photos/500/350?2",
    address: "3811 Ditmars Blvd, Astoria, NY",
    beds: 2,
    baths: 1,
    sqft: 850,
    rating: 4.6,
  },
  {
    id: 3,
    title: "Oakwood Family Home",
    price: "$490,000",
    status: "sold",
    img: "https://picsum.photos/500/350?3",
    address: "221 Main St, Queens, NY",
    beds: 4,
    baths: 3,
    sqft: 1450,
    rating: 4.9,
  },
  {
    id: 4,
    title: "Lakeview Modern Villa",
    price: "$420,000",
    status: "sale",
    img: "https://picsum.photos/500/350?4",
    address: "112 Lake St, Seattle, WA",
    beds: 3,
    baths: 2,
    sqft: 1050,
    rating: 4.7,
  },
];

export default function PropertyView() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="pv-page">
      {/* header */}

      <div className="pv-header">
        <h2>Property Grid</h2>
        <div className="pv-actions">
          <button
  className="pv-filterBtn"
  onClick={() => setFilterOpen(true)}
>
            <FaFilter className="pv-btnIcon" />
            Filter
          </button>

          <button className="pv-addBtn">
            <FaPlus className="pv-btnIcon" />
            Add Property
          </button>
        </div>
      </div>

      {/* grid */}

      <div className="pv-grid">
        {properties.map((p) => (
          <div key={p.id} className="pv-card">
            {/* image */}

            <div className="pv-imgBox">
              <img src={p.img} alt="" />

              <span className={`pv-badge ${p.status}`}>
                {p.status === "sale"
                  ? "For Sale"
                  : p.status === "rent"
                    ? "For Rent"
                    : "Sold"}
              </span>

              {/* hover icons */}

              <div className="pv-imgIcons">
                <FaBookmark />
                <FaHeart />
              </div>
            </div>

            {/* body */}

            <div className="pv-body">
              <div className="pv-priceRow">
                <span className="pv-price">{p.price}</span>

                <span className="pv-rating">
                  <FaStar /> {p.rating}
                </span>
              </div>

              <h3 className="pv-title">{p.title}</h3>

              <p className="pv-address">📍 {p.address}</p>

              <div className="pv-info">
                <span>
                  <FaBed /> {p.beds} Beds
                </span>

                <span>
                  <FaBath /> {p.baths} Baths
                </span>

                <span>
                  <FaRulerCombined /> {p.sqft} sqft
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>


{/* overlay blur */}

<div
  className={`pv-overlay ${filterOpen ? "show" : ""}`}
  onClick={() => setFilterOpen(false)}
/>


{/* filter */}

<div className={`pv-filterBar ${filterOpen ? "open" : ""}`}>

  {/* header */}

  <div className="pv-filterHeader">

    <h3>Filter Properties</h3>

<button
  className="pv-closeBtn"
  onClick={() => setFilterOpen(false)}
>
  <FaTimes />
</button>

  </div>



  {/* content */}

  <div className="pv-filterContent">


    {/* status */}

    <div className="pv-filterSection">

      <h4>Property Status</h4>

      <div className="pv-checkGrid">

        <label><input type="checkbox" /> For Sale</label>
        <label><input type="checkbox" /> For Rent</label>
        <label><input type="checkbox" /> Sold</label>

      </div>

    </div>



    {/* type */}

    <div className="pv-filterSection">

      <h4>Property Type</h4>

      <div className="pv-checkGrid">

        <label><input type="checkbox" /> House</label>
        <label><input type="checkbox" /> Apartment</label>
        <label><input type="checkbox" /> Villa</label>

      </div>

    </div>



    {/* price */}

    <div className="pv-filterSection">

      <h4>Price Range</h4>

      <input type="range" className="pv-range" />

      <div className="pv-rangeRow">

        <input placeholder="Min $" />
        <input placeholder="Max $" />

      </div>

    </div>



    {/* bedrooms */}

    <div className="pv-filterSection">

      <h4>Bedrooms</h4>

      <div className="pv-checkGrid">

        <label><input type="checkbox" /> 1+ Beds</label>
        <label><input type="checkbox" /> 2+ Beds</label>
        <label><input type="checkbox" /> 3+ Beds</label>

      </div>

    </div>



    {/* year */}

    <div className="pv-filterSection">

      <h4>Year Built</h4>

      <div className="pv-rangeRow">

        <input placeholder="From" />
        <input placeholder="To" />

      </div>

    </div>



    {/* features */}

    <div className="pv-filterSection">

      <h4>Additional Features</h4>

      <div className="pv-checkGrid">

        <label><input type="checkbox" /> Balcony</label>
        <label><input type="checkbox" /> Fireplace</label>
        <label><input type="checkbox" /> Gym</label>
        <label><input type="checkbox" /> Security</label>
        <label><input type="checkbox" /> Swimming Pool</label>

      </div>

    </div>

  </div>



  {/* footer */}

  <div className="pv-filterFooter">

    <button className="pv-applyBtn">
      Apply Filters
    </button>

  </div>

</div>
    </div>
  );
}
