import React, { useState } from "react";
import "./RegionMapDashboard.css";
import { FaChevronDown, FaPlus, FaMinus } from "react-icons/fa";

import { MapContainer, TileLayer } from "react-leaflet";

const RegionMapDashboard = () => {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(4);

  const regions = [
    { name: "Houston", value: 312 },
    { name: "Phoenix", value: 189 },
    { name: "Seattle", value: 276 },
    { name: "Atlanta", value: 205 },
    { name: "Denver", value: 128 },
    { name: "Boston", value: 241 },
  ];

  const maxValue = Math.max(...regions.map(r => r.value));

  return (
    <div className="RegionMapDashboard">

      {/* LEFT */}
      <div className="RegionMapDashboard-left">
        <div className="RegionMapDashboard-header">
          <h3>Customers by Region</h3>

          <div
            className="RegionMapDashboard-dropdown"
            onClick={() => setOpen(!open)}
          >
            Weekly <FaChevronDown />

            {open && (
              <div className="RegionMapDashboard-menu">
                <p>Recent</p>
                <p>Weekly</p>
                <p>Monthly</p>
                <p>Yearly</p>
              </div>
            )}
          </div>
        </div>

        {/* LIST */}
        <div className="RegionMapDashboard-list">
          {regions.map((r, i) => (
            <div key={i} className="RegionMapDashboard-item">
              <p>{r.name} <span>({r.value})</span></p>

              <div className="RegionMapDashboard-bar">
                <div
                  className="RegionMapDashboard-fill"
                  style={{
                    width: `${(r.value / maxValue) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT MAP */}
      <div className="RegionMapDashboard-right">

        <MapContainer
          center={[37.8, -96]}
          zoom={zoom}
          scrollWheelZoom={false}
          className="RegionMapDashboard-map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>

        {/* ZOOM BUTTONS */}
        <div className="RegionMapDashboard-zoom">
          <button onClick={() => setZoom(zoom + 1)}>
            <FaPlus />
          </button>
          <button onClick={() => setZoom(zoom - 1)}>
            <FaMinus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegionMapDashboard;