import React from "react";
import "./GetInTouch.css";
import { FiPhone, FiMail, FiMapPin, FiClock, FiArrowUpRight } from "react-icons/fi";

const GetInTouch = () => {
  return (
    <section className="GetInTouch">
      <div className="GetInTouch-blur GetInTouch-blurOne"></div>
      <div className="GetInTouch-blur GetInTouch-blurTwo"></div>

      <div className="GetInTouch-container">
        {/* LEFT */}
        <div className="GetInTouch-left">
          <span className="GetInTouch-badge">Contact Us</span>

          <h2>
            Get in Touch with <span>Prestige Real Estate</span> Properties
          </h2>

          <p className="GetInTouch-desc">
            Looking to buy your dream home or invest in a trusted property? At{" "}
            <b>Prestige Real Estate Properties</b>, we understand that finding
            the right space is an important decision. Whether you are exploring
            premium apartments, family homes, or smart investment options, our
            team is here to guide you at every step.
            <br />
            <br />
            Have questions about pricing, location, site visits, or
            availability? Feel free to connect with us. We believe in honest
            conversations, clear information, and helping you make the right
            choice without pressure.
          </p>

          {/* CONTACT INFO */}
          <div className="GetInTouch-info">
            <div className="GetInTouch-item">
              <div className="GetInTouch-icon">
                <FiPhone />
              </div>
              <div>
                <h4>Call Us</h4>
                <span>+91 98765 43210</span>
              </div>
            </div>

            <div className="GetInTouch-item">
              <div className="GetInTouch-icon">
                <FiMail />
              </div>
              <div>
                <h4>Email Us</h4>
                <span>info@prestigerealty.in</span>
              </div>
            </div>

            <div className="GetInTouch-item">
              <div className="GetInTouch-icon">
                <FiMapPin />
              </div>
              <div>
                <h4>Office Address</h4>
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

            <div className="GetInTouch-item">
              <div className="GetInTouch-icon">
                <FiClock />
              </div>
              <div>
                <h4>Working Hours</h4>
                <span>Mon - Sat: 10:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="GetInTouch-right">
          <form className="GetInTouch-form">
            <div className="GetInTouch-formTop">
              <h3>Send a Message</h3>
              <p>Let us know your property needs and our team will contact you soon.</p>
            </div>

            <div className="GetInTouch-grid">
              <div className="GetInTouch-field">
                <label>First Name</label>
                <input type="text" placeholder="Enter your first name" />
              </div>

              <div className="GetInTouch-field">
                <label>Last Name</label>
                <input type="text" placeholder="Enter your last name" />
              </div>

              <div className="GetInTouch-field">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" />
              </div>

              <div className="GetInTouch-field">
                <label>Subject</label>
                <input type="text" placeholder="Property inquiry / Site visit" />
              </div>
            </div>

            <div className="GetInTouch-field full">
              <label>Message</label>
              <textarea
                rows="6"
                placeholder="Tell us what you're looking for — budget, location, preferred property type, or any questions..."
              ></textarea>
            </div>

            <button type="submit" className="GetInTouch-btn">
              <span>Send Message</span>
              <FiArrowUpRight />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;