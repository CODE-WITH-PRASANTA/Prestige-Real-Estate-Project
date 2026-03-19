import React from "react";
import "./GetInTouch.css";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";

const GetInTouch = () => {
  return (
    <section className="GetInTouch">

      <div className="GetInTouch-container">

        {/* LEFT */}
        <div className="GetInTouch-left">

          <h2>Get in Touch with Prestige Real Estate Properties</h2>

          <p className="GetInTouch-desc">
            Looking to buy your dream home or invest in a trusted property? At <b>Prestige Real Estate Properties</b>, 
            we understand that finding the right space is an important decision. Whether you are exploring premium 
            apartments, family homes, or smart investment options, our team is here to guide you at every step.
            <br /><br />
            Have questions about pricing, location, site visits, or availability? Feel free to connect with us. 
            We believe in honest conversations, clear information, and helping you make the right choice without pressure.
          </p>

          {/* CONTACT INFO */}
          <div className="GetInTouch-info">

            <div className="GetInTouch-item">
              <FiPhone />
              <span>+91 98765 43210</span>
            </div>

            <div className="GetInTouch-item">
              <FiMail />
              <span>info@prestigerealty.in</span>
            </div>

            <div className="GetInTouch-item">
              <FiMapPin />
              <span>Mumbai, Maharashtra, India</span>
            </div>

            <div className="GetInTouch-item">
              <FiClock />
              <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
            </div>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="GetInTouch-right">

          <form className="GetInTouch-form">

            <div className="GetInTouch-grid">

              <div className="GetInTouch-field">
                <label>First Name</label>
                <input type="text" placeholder="Enter your first name" />
              </div>

              <div className="GetInTouch-field">
                <label>Subject</label>
                <input type="text" placeholder="Property inquiry / Site visit" />
              </div>

              <div className="GetInTouch-field">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" />
              </div>

              <div className="GetInTouch-field">
                <label>Last Name</label>
                <input type="text" placeholder="Enter your last name" />
              </div>

            </div>

            <div className="GetInTouch-field full">
              <label>Message</label>
              <textarea 
                rows="5" 
                placeholder="Tell us what you're looking for — budget, location, or any questions..."
              ></textarea>
            </div>

            <button className="GetInTouch-btn">
              Send Message →
            </button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default GetInTouch;