import React from "react";
import "./AboutStats.css";

import { FiFileText } from "react-icons/fi";
import { FaUserTie, FaUsers } from "react-icons/fa";
import { GiProfit } from "react-icons/gi";

const statsData = [
  {
    id: 1,
    icon: <FiFileText />,
    value: "50K",
    label: "Listings Added",
  },
  {
    id: 2,
    icon: <FaUserTie />,
    value: "3000+",
    label: "Agents Listed",
  },
  {
    id: 3,
    icon: <GiProfit />,
    value: "2000+",
    label: "Sales Completed",
  },
  {
    id: 4,
    icon: <FaUsers />,
    value: "5000+",
    label: "Users Joined",
  },
];

const AboutStats = () => {
  return (
    <section className="aboutStats-section">
      <div className="aboutStats-blur aboutStats-blurOne"></div>
      <div className="aboutStats-blur aboutStats-blurTwo"></div>

      <div className="aboutStats-container">
        {statsData.map((item) => (
          <div className="aboutStats-card" key={item.id}>
            <div className="aboutStats-icon">{item.icon}</div>

            <div className="aboutStats-content">
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutStats;