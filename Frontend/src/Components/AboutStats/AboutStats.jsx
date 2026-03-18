import React from "react";
import "./AboutStats.css";

import { FiFileText } from "react-icons/fi";
import { FaUserTie, FaUsers } from "react-icons/fa";
import { GiProfit } from "react-icons/gi";

const AboutStats = () => {
  return (
    <section className="aboutStats-section">

      <div className="aboutStats-container">

        <div className="aboutStats-card">
          <div className="aboutStats-icon">
            <FiFileText />
          </div>

          <div>
            <h3>50K</h3>
            <p>Listings Added</p>
          </div>
        </div>


        <div className="aboutStats-card">
          <div className="aboutStats-icon">
            <FaUserTie />
          </div>

          <div>
            <h3>3000+</h3>
            <p>Agents Listed</p>
          </div>
        </div>


        <div className="aboutStats-card">
          <div className="aboutStats-icon">
            <GiProfit />
          </div>

          <div>
            <h3>2000+</h3>
            <p>Sales Completed</p>
          </div>
        </div>


        <div className="aboutStats-card">
          <div className="aboutStats-icon">
            <FaUsers />
          </div>

          <div>
            <h3>5000+</h3>
            <p>Users Joined</p>
          </div>
        </div>

      </div>

    </section>
  );
};

export default AboutStats;