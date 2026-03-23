import React, { useState } from "react";
import "./PropertyDeviceDashboard.css";
import { FaMapMarkerAlt, FaChevronDown } from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

const PropertyDeviceDashboard = () => {
  const [open, setOpen] = useState(false);

  const properties = [
    {
      name: "Sunset View Towers",
      by: "Laura Mitchell",
      price: "$450,000",
      img: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d"
    },
    {
      name: "Harbor Heights",
      by: "Olivia Brown",
      price: "$395,000",
      img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
    },
    {
      name: "Riverside Mansion",
      by: "James Parker",
      price: "$510,000",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    },
    {
      name: "Central City Lofts",
      by: "Emma Davis",
      price: "$360,000",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    },
    {
      name: "Lakeview Residences",
      by: "Daniel Lee",
      price: "$420,000",
      img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c"
    },
    {
      name: "Sunset View Towers",
      by: "Laura Mitchell",
      price: "$450,000",
      img: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d"
    },
    {
      name: "Harbor Heights",
      by: "Olivia Brown",
      price: "$395,000",
      img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
    },
    {
      name: "Riverside Mansion",
      by: "James Parker",
      price: "$510,000",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
    },
    {
      name: "Central City Lofts",
      by: "Emma Davis",
      price: "$360,000",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
    },
    {
      name: "Lakeview Residences",
      by: "Daniel Lee",
      price: "$420,000",
      img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c"
    }
  ];

  const data = [
    { name: "Mobile", value: 45, color: "#ef4444" },
    { name: "Desktop", value: 35, color: "#10b981" },
    { name: "Tablet", value: 20, color: "#3b82f6" }
  ];

  return (
    <div className="PropertyDeviceDashboard">

      {/* LEFT CARD */}
      <div className="PropertyDeviceDashboard-left">
        <div className="PropertyDeviceDashboard-header">
          <h3>Property Value Purchased</h3>
          <span>View All</span>
        </div>

        <div className="PropertyDeviceDashboard-list">
          {properties.map((p, i) => (
            <div key={i} className="PropertyDeviceDashboard-item">
              <img src={p.img} alt="" />

              <div className="PropertyDeviceDashboard-info">
                <h4>{p.name}</h4>
                <p>
                  <FaMapMarkerAlt /> by {p.by}
                </p>
              </div>

              <span>{p.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT CARD */}
      <div className="PropertyDeviceDashboard-right">

        <div className="PropertyDeviceDashboard-header">
          <h3>Device Usage</h3>

          <div
            className="PropertyDeviceDashboard-dropdown"
            onClick={() => setOpen(!open)}
          >
            Weekly <FaChevronDown />

            {open && (
              <div className="PropertyDeviceDashboard-menu">
                <p>Recent</p>
                <p>Weekly</p>
                <p>Monthly</p>
                <p>Yearly</p>
              </div>
            )}
          </div>
        </div>

        {/* CHART */}
        <div className="PropertyDeviceDashboard-chart">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={70}
                outerRadius={100}
                dataKey="value"
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="PropertyDeviceDashboard-center">
            <p>Total</p>
            <h2>99</h2>
          </div>
        </div>

        {/* LEGENDS */}
        <div className="PropertyDeviceDashboard-stats">
          {data.map((d, i) => (
            <div key={i} className="PropertyDeviceDashboard-stat">
              <span
                className="dot"
                style={{ background: d.color }}
              ></span>
              <p>{d.name}</p>
              <h4>{d.value}%</h4>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PropertyDeviceDashboard;