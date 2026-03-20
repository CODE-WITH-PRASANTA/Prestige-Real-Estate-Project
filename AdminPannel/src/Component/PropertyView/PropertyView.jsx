import React, { useState } from "react";
import "./PropertyView.css";
import { FaThLarge, FaList, FaEllipsisV } from "react-icons/fa";

const PropertyView = () => {
  const [view, setView] = useState("grid");
  const [activeMenu, setActiveMenu] = useState(null);

  const properties = [
    {
      id: 1,
      name: "Luxury Villa",
      price: "₹2.5 Cr",
      city: "Mumbai",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      id: 2,
      name: "Modern Apartment",
      price: "₹90 Lakh",
      city: "Delhi",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    },
    {
      id: 3,
      name: "Beach House",
      price: "₹3.2 Cr",
      city: "Goa",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
      {
      id: 1,
      name: "Luxury Villa",
      price: "₹2.5 Cr",
      city: "Mumbai",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      id: 2,
      name: "Modern Apartment",
      price: "₹90 Lakh",
      city: "Delhi",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    },
    {
      id: 3,
      name: "Beach House",
      price: "₹3.2 Cr",
      city: "Goa",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
  ];

  return (
    <div className="PropertyView">

      {/* HEADER */}
      <div className="PropertyView-header">
        <h2>Property View</h2>

        <div className="PropertyView-toggle">
          <button
            className={view === "list" ? "active" : ""}
            onClick={() => setView("list")}
          >
            <FaList />
          </button>

          <button
            className={view === "grid" ? "active" : ""}
            onClick={() => setView("grid")}
          >
            <FaThLarge />
          </button>
        </div>
      </div>

      {/* GRID VIEW */}
      {view === "grid" && (
        <div className="PropertyView-grid">
          {properties.map((item, i) => (
            <div key={item.id} className="PropertyView-card">

              {/* 3 DOT */}
              <div className="PropertyView-menu">
                <FaEllipsisV
                  onClick={() =>
                    setActiveMenu(activeMenu === i ? null : i)
                  }
                />

                {activeMenu === i && (
                  <div className="PropertyView-dropdown">
                    <button>Edit</button>
                    <button className="delete">Delete</button>
                  </div>
                )}
              </div>

              <img src={item.image} alt="" />

              <div className="PropertyView-card-content">
                <h3>{item.name}</h3>
                <p>{item.city}</p>
                <span>{item.price}</span>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* LIST VIEW */}
      {view === "list" && (
        <div className="PropertyView-list">
          {properties.map((item, i) => (
            <div key={item.id} className="PropertyView-list-item">

              <img src={item.image} alt="" />

              <div className="PropertyView-list-content">
                <h3>{item.name}</h3>
                <p>{item.city}</p>
                <span>{item.price}</span>
              </div>

              {/* 3 DOT */}
              <div className="PropertyView-menu">
                <FaEllipsisV
                  onClick={() =>
                    setActiveMenu(activeMenu === i ? null : i)
                  }
                />

                {activeMenu === i && (
                  <div className="PropertyView-dropdown">
                    <button>Edit</button>
                    <button className="delete">Delete</button>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyView;