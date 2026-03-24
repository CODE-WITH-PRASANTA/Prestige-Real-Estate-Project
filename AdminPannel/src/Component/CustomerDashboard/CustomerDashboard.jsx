import React from "react";
import "./CustomerDashboard.css";
import {
  FaUsers,
  FaHome,
  FaCommentDots,
  FaHandshake,
  FaClock,
  FaQuestionCircle,
} from "react-icons/fa";

const CustomerDashboard = () => {
  const cards = [
    {
      title: "Total Customers",
      value: "8,725",
      icon: <FaUsers />,
      color: "green",
    },
    {
      title: "Listed Properties",
      value: "1,240",
      icon: <FaHome />,
      color: "purple",
    },
    {
      title: "Active Inquiries",
      value: "589",
      icon: <FaCommentDots />,
      color: "yellow",
    },
    {
      title: "Closed Deals",
      value: "312",
      icon: <FaHandshake />,
      color: "blue",
    },
    {
      title: "Pending Deals",
      value: "78",
      icon: <FaClock />,
      color: "red",
    },
    {
      title: "Customer Visits",
      value: "456",
      icon: <FaQuestionCircle />,
      color: "dark",
    },
  ];

  return (
    <div className="CustomerDashboard">
      <div className="CustomerDashboard-grid">
        {cards.map((card, index) => (
          <div key={index} className="CustomerDashboard-card">
            <div className={`CustomerDashboard-icon ${card.color}`}>
              {card.icon}
            </div>

            <p className="CustomerDashboard-title">{card.title}</p>
            <h2 className="CustomerDashboard-value">{card.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;