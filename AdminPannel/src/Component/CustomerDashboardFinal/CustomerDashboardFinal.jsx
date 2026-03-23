import React, { useState } from "react";
import "./CustomerDashboardFinal.css";
import {
  FaChevronDown,
  FaEllipsisV,
  FaStar,
} from "react-icons/fa";

import {
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

import reviewImg from "../../assets/review.webp";

const CustomerDashboardFinal = () => {
  const [dropdown, setDropdown] = useState(false);
  const [menu, setMenu] = useState(false);

  const customers = [
    { name: "Sarah Johnson", sub: "5 property purchases", amt: "$2.8M", img: 1 },
    { name: "Michael Brown", sub: "3 rental agreements", amt: "$1.5M", img: 2 },
    { name: "Amit Sharma", sub: "7 property inquiries", amt: "$1.1M", img: 3 },
    { name: "Emily Davis", sub: "2 premium listings", amt: "$940K", img: 4 },
    { name: "Robert Wilson", sub: "1 villa purchase", amt: "$810K", img: 5 },
    { name: "Olivia Martinez", sub: "4 investments", amt: "$760K", img: 6 },
    { name: "Daniel Lee", sub: "2 upgrades", amt: "$540K", img: 7 },
  ];

  const chartData = [
    { v: 20 }, { v: 10 }, { v: 25 }, { v: 18 },
    { v: 22 }, { v: 8 }, { v: 19 }
  ];

  return (
    <div className="CustomerDashboardFinal">

      {/* LEFT */}
      <div className="CustomerDashboardFinal-left">
        <div className="CustomerDashboardFinal-header">
          <h3>Top Customers</h3>

          <div
            className="CustomerDashboardFinal-dropdown"
            onClick={() => setDropdown(!dropdown)}
          >
            Weekly <FaChevronDown />

            {dropdown && (
              <div className="CustomerDashboardFinal-dropdownMenu">
                <p>Recent</p>
                <p>Weekly</p>
                <p>Monthly</p>
                <p>Yearly</p>
              </div>
            )}
          </div>
        </div>

        <div className="CustomerDashboardFinal-list">
          {customers.map((c, i) => (
            <div key={i} className="CustomerDashboardFinal-item">
              <img src={`https://i.pravatar.cc/100?img=${c.img}`} alt="" />

              <div>
                <h4>{c.name}</h4>
                <p>{c.sub}</p>
              </div>

              <span>{c.amt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="CustomerDashboardFinal-right">

        {/* FEEDBACK */}
        <div className="CustomerDashboardFinal-feedback">
          <h3>Feedback Summary</h3>

          <div className="CustomerDashboardFinal-feedbackContent">
            <img src="https://i.pravatar.cc/100?img=8" alt="" />

            <div className="CustomerDashboardFinal-feedbackText">
              <h4>Amit Sharma</h4>
              <span className="CustomerDashboardFinal-rating">
                <FaStar /> (4.6)
              </span>
              <p>
                "I was very impressed with the professionalism and professionalism."
              </p>
            </div>

            <div className="CustomerDashboardFinal-illustration">
              <img src={reviewImg} alt="illustration" />
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="CustomerDashboardFinal-bottom">

          {/* NEW CUSTOMERS */}
          <div className="CustomerDashboardFinal-card">
            <div className="CustomerDashboardFinal-cardHeader">
              <h3>1,481</h3>

              <FaEllipsisV onClick={() => setMenu(!menu)} />

              {menu && (
                <div className="CustomerDashboardFinal-menu">
                  <p>Weekly</p>
                  <p>Monthly</p>
                  <p>Yearly</p>
                </div>
              )}
            </div>

            <p>New Customers</p>

            {/* GRAPH */}
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* ✅ DAYS ADDED */}
            <div className="CustomerDashboardFinal-days">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                <span key={i}>{day}</span>
              ))}
            </div>
          </div>

          {/* DONUT */}
          <div className="CustomerDashboardFinal-card">
            <h3>Total Active Customers</h3>
            <p className="green">2.87% This month</p>

            <div className="CustomerDashboardFinal-donut"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CustomerDashboardFinal;