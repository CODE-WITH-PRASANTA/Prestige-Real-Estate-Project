import React from "react";
import "./AboutExperience.css";
import person from "../../assets/Main-1.webp";

const AboutExperience = () => {
  return (
    <section className="AboutExperience">

      <div className="AboutExperience-container">

        {/* LEFT IMAGE */}
        <div className="AboutExperience-left">
          <img
            src={person}
            alt="Experienced real estate agent - Prestige Real Estate Project"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="AboutExperience-right">

          {/* ITEM 1 */}
          <div className="AboutExperience-item">
            <div className="AboutExperience-number">1</div>
            <div className="AboutExperience-text">
              <h3>25+ Years of Trusted Real Estate Experience</h3>
              <p>
                At <b>Prestige Real Estate Project</b>, our journey is built on
                years of hands-on experience in helping people find the right homes.
                We understand market trends, property values, and what truly matters
                to buyers and sellers in India.
              </p>
            </div>
          </div>

          {/* ITEM 2 */}
          <div className="AboutExperience-item">
            <div className="AboutExperience-number">2</div>
            <div className="AboutExperience-text">
              <h3>Experts in Buying, Selling & Renting Homes</h3>
              <p>
                From first-time home buyers to property investors, we offer simple
                and reliable solutions for buying, selling, and renting houses.
                Our verified listings and clear process help you make confident
                property decisions without confusion.
              </p>
            </div>
          </div>

          {/* ITEM 3 */}
          <div className="AboutExperience-item">
            <div className="AboutExperience-number">3</div>
            <div className="AboutExperience-text">
              <h3>Looking to Buy, Sell or Rent a Property?</h3>
              <p>
                Whether you want to own your dream home or find the right tenant,
                our team is ready to assist you at every step. We focus on honest
                guidance, transparent deals, and long-term relationships with our
                clients.
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default AboutExperience;