import React, { useState } from "react";
import "./CustomerInsights.css";
import {
  FaCalendarAlt,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

const CustomerInsights = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selected, setSelected] = useState("Weekly");

  const dropdownOptions = ["Recent", "Weekly", "Monthly", "Yearly"];

  const handleSelect = (option) => {
    setSelected(option);
    setDropdownOpen(false);
  };

  return (
    <div className="CustomerInsights">

      {/* LEFT - CUSTOMER ACTIVITY */}
      <div className="CustomerInsights-activity">

        <h3 className="CustomerInsights-heading">Customer Activity</h3>

        <div className="CustomerInsights-activityList">

          {/* ITEM */}
          <div className="CustomerInsights-item">
            <div className="CustomerInsights-icon blue">
              <FaCalendarAlt />
            </div>

            <div className="CustomerInsights-content">
              <h4>Scheduled Visit</h4>

              <span className="CustomerInsights-badge upcoming">
                • Upcoming
              </span>

              <p className="CustomerInsights-date">25 Oct, 2025</p>

              <ul>
                <li>Emily Davis booked a visit for Skyline Towers, Chicago</li>
                <li>Visit Date: 2 Nov, 2025</li>
              </ul>
            </div>
          </div>

          {/* ITEM */}
          <div className="CustomerInsights-item">
            <div className="CustomerInsights-icon red">
              <FaTimes />
            </div>

            <div className="CustomerInsights-content">
              <h4>Booking Cancelled</h4>

              <span className="CustomerInsights-badge cancelled">
                • Cancelled
              </span>

              <p className="CustomerInsights-date">23 Oct, 2025</p>

              <ul>
                <li>Daniel Lee cancelled booking for Maple Residency</li>
                <li>Reason: Schedule conflict</li>
              </ul>
            </div>
          </div>

          {/* EXTRA ITEMS (for scroll) */}
          <div className="CustomerInsights-item">
            <div className="CustomerInsights-icon blue">
              <FaCalendarAlt />
            </div>
            <div className="CustomerInsights-content">
              <h4>Scheduled Visit</h4>
              <span className="CustomerInsights-badge upcoming">• Upcoming</span>
              <p className="CustomerInsights-date">20 Oct, 2025</p>
              <ul>
                <li>John booked visit for Palm Heights</li>
                <li>Visit Date: 28 Oct, 2025</li>
              </ul>
            </div>
          </div>

          <div className="CustomerInsights-item">
            <div className="CustomerInsights-icon red">
              <FaTimes />
            </div>
            <div className="CustomerInsights-content">
              <h4>Booking Cancelled</h4>
              <span className="CustomerInsights-badge cancelled">• Cancelled</span>
              <p className="CustomerInsights-date">18 Oct, 2025</p>
              <ul>
                <li>Client cancelled Riverside booking</li>
                <li>Reason: Budget issue</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT - GRAPH */}
      <div className="CustomerInsights-chart">

        <div className="CustomerInsights-chartHeader">
          <h3>Total Inquiries</h3>

          <div
            className="CustomerInsights-dropdown"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {selected} <FaChevronDown />

            {dropdownOpen && (
              <div className="CustomerInsights-dropdownMenu">
                {dropdownOptions.map((item, i) => (
                  <p key={i} onClick={() => handleSelect(item)}>
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SVG GRAPH */}
        <div className="CustomerInsights-graph">
          <svg viewBox="0 0 600 300">
            <path
              d="M0,180 
                 C50,120 100,140 150,170 
                 C200,200 250,220 300,150 
                 C350,120 400,80 450,170 
                 C500,200 550,140 600,160"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
            />

            <path
              d="M0,180 
                 C50,120 100,140 150,170 
                 C200,200 250,220 300,150 
                 C350,120 400,80 450,170 
                 C500,200 550,140 600,160 
                 L600,300 L0,300 Z"
              fill="rgba(16,185,129,0.1)"
            />
          </svg>

          <div className="CustomerInsights-months">
            {[
              "Jan","Feb","Mar","Apr","May","Jun",
              "Jul","Aug","Sep","Oct","Nov","Dec"
            ].map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerInsights;