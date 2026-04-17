import React, { useState } from "react";
import "./PropertyPosting.css";
import { FaEllipsisV } from "react-icons/fa";

const properties = [
  {
    id: 1,
    title: "Serenity Condo Suite",
    price: "$21000",
    location: "17, Grove Towers, New York, USA",
    rating: 5.0,
    reviews: 20,
    beds: 4,
    bath: 4,
    area: "350 Sq Ft",
    date: "16 Jan 2023",
    category: "Apartment",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    user: "https://randomuser.me/api/portraits/women/44.jpg",
    tag: "New",
  },
  {
    id: 2,
    title: "Loyal Apartment",
    price: "$1940",
    location: "25, Willow Crest Apartment, USA",
    rating: 4.6,
    reviews: 36,
    beds: 2,
    bath: 2,
    area: "350 Sq Ft",
    date: "02 May 2025",
    category: "Apartment",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    user: "https://randomuser.me/api/portraits/women/65.jpg",
    tag: "Featured",
  },
  {
    id: 3,
    title: "Grand Villa House",
    price: "$1370",
    location: "10, Oak Ridge Villa, USA",
    rating: 4.9,
    reviews: 25,
    beds: 4,
    bath: 3,
    area: "520 Sq Ft",
    date: "28 Apr 2025",
    category: "Villa",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    user: "https://randomuser.me/api/portraits/men/32.jpg",
    tag: "Featured",
  },
];

export default function PropertyPost() {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  return (
    <div className="pp-container">
      {properties.map((item) => (
        <div className="pp-card" key={item.id}>
          {/* IMAGE */}
          <div className="pp-imgBox">
            <img src={item.img} alt="property" />

            {/* TAG */}
            <span className={`pp-tag ${item.tag === "New" ? "new" : ""}`}>
              {item.tag}
            </span>

            {/* PRICE */}
            <span className="pp-price">{item.price}</span>

            {/* PROFILE */}
            <img className="pp-user" src={item.user} alt="user" />

            {/* 3 DOT MENU */}
            <div className="pp-menu">
              <FaEllipsisV onClick={() => toggleMenu(item.id)} />

              {activeMenu === item.id && (
                <div className="pp-dropdown">
                  <p>Publish</p>
                  <p>Unpublish</p>
                  <p>Edit</p>
                  <p className="danger">Delete</p>
                </div>
              )}
            </div>
          </div>

          {/* CONTENT */}
          <div className="pp-content">
            <div className="pp-rating">
              ⭐ {item.rating} ({item.reviews} Reviews)
            </div>

            <h3>{item.title}</h3>

            <p className="pp-location">📍 {item.location}</p>

            <div className="pp-features">
              <span>🛏 {item.beds} Bedroom</span>
              <span>🛁 {item.bath} Bath</span>
              <span>📐 {item.area}</span>
            </div>

            <div className="pp-footer">
              <p><strong>Listed on:</strong> {item.date}</p>
              <p><strong>Category:</strong> {item.category}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}