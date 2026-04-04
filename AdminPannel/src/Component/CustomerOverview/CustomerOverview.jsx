import React, { useState } from "react";
import "./CustomerOverview.css";
import { FaMapMarkerAlt, FaEllipsisV } from "react-icons/fa";

const CustomerOverview = () => {
  const [activeTab, setActiveTab] = useState("Monthly");
  const [menuOpen, setMenuOpen] = useState(false);

  const customers = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      img: "https://i.pravatar.cc/100?img=1",
      color: "blue",
    },
    {
      name: "James Carter",
      location: "Los Angeles, USA",
      img: "https://i.pravatar.cc/100?img=2",
      color: "pink",
    },
    {
      name: "Olivia Brown",
      location: "Chicago, USA",
      img: "https://i.pravatar.cc/100?img=3",
      color: "yellow",
    },
    {
      name: "Michael Lee",
      location: "Houston, USA",
      img: "https://i.pravatar.cc/100?img=4",
      color: "green",
    },
  ];

  return (
    <div className="CustomerOverview">

      {/* LEFT */}
      <div className="CustomerOverview-left">
        <div className="CustomerOverview-header">
          <h3>Active Customers</h3>
          <span>View All</span>
        </div>

        <div className="CustomerOverview-list">
          {customers.map((c, i) => (
            <div key={i} className="CustomerOverview-card">
              <img src={c.img} alt="" />

              <div className="CustomerOverview-info">
                <h4>{c.name}</h4>
                <p>
                  <FaMapMarkerAlt /> {c.location}
                </p>
              </div>

              <div className={`CustomerOverview-ring ${c.color}`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="CustomerOverview-right">

        {/* HEADER */}
        <div className="CustomerOverview-top">
          <h3>Customer Growth</h3>

          <div className="CustomerOverview-tabs">
            {["All", "Weekly", "Monthly", "Yearly"].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}

            <div
              className="CustomerOverview-menuIcon"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaEllipsisV />

              {menuOpen && (
                <div className="CustomerOverview-menu">
                  <p>View</p>
                  <p>Edit</p>
                  <p>Delete</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MONTH LABELS */}
        <div className="CustomerOverview-months">
          {[
            "Jan","Feb","Mar","Apr","May","Jun",
            "Jul","Aug","Sep","Oct","Nov","Dec"
          ].map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </div>

        {/* GRAPH */}
        <div className="CustomerOverview-bars">
          {[40, 30, 55, 45, 60, 50, 30, 55, 25, 35, 50, 65].map(
            (val, i) => (
              <div key={i} className="CustomerOverview-bar">
                <div className="bg"></div>
                <div
                  className="fill"
                  style={{ height: `${val}%` }}
                ></div>
              </div>
            )
          )}
        </div>

        {/* FOOTER */}
        <div className="CustomerOverview-footer">
          <div>
            <p>This Month</p>
            <h2>2,248</h2>
          </div>

          <div>
            <p>Last Month</p>
            <h2>1,526</h2>
          </div>

          <div className="CustomerOverview-progress">
            <h2>92%</h2>
            <p>Customer Satisfaction</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerOverview;