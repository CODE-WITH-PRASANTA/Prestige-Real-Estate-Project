import React from "react";
import "./Footer.css";
import Logo from "../../assets/Main-Logo.png";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="Footer-container">

      {/* TOP SECTION */}
      <div className="Footer-wrapper">

        {/* LEFT */}
        <div className="Footer-left">

          {/* LOGO */}
          <div className="Footer-logo-section">

            <Link to="/" className="Footer-logo">
              <img src={Logo} alt="Prestige Properties" />
            </Link>

            <p className="Footer-description">
              Discover premium properties with trusted real estate
              solutions. Prestige Properties helps you find your
              dream home, commercial space, and investment property
              with ease and confidence.
            </p>

          </div>

          {/* CONTACT */}
          <div className="Footer-contact">

            <div className="Footer-contact-card">
              <span className="Footer-contact-icon">
                <FaPhoneAlt />
              </span>

              <div>
                <p>Customer Support</p>

                <a href="tel:+919595422040">
                  +91 9595422040
                </a>
              </div>
            </div>

            <div className="Footer-contact-card">
              <span className="Footer-contact-icon">
                <FaEnvelope />
              </span>

              <div>
                <p>Email Address</p>

                <a href="mailto:Dayanand.prestige@gmail.com">
                  Dayanand.prestige@gmail.com
                </a>
              </div>
            </div>

            <div className="Footer-contact-card">
              <span className="Footer-contact-icon">
                <FaMapMarkerAlt />
              </span>

              <div>
                <p>Office Address</p>

                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

          </div>

          {/* SOCIAL */}
          <div className="Footer-social">

            <h4>Follow Us</h4>

            <div className="Footer-icons">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="Footer-right">

          {/* NEWSLETTER */}
          <div className="Footer-newsletter">

            <div className="Footer-newsletter-content">

              <span className="Footer-subtitle">
                NEWSLETTER
              </span>

              <h3>
                Keep Yourself Updated With Latest Properties
              </h3>

              <p>
                Subscribe and get updates about premium listings,
                offers, and real estate news.
              </p>

            </div>

            <div className="Footer-input-box">

              <input
                type="email"
                placeholder="Enter your email address"
              />

              <button>
                Subscribe
                <FaArrowRight />
              </button>

            </div>

          </div>

          {/* LINKS */}
          <div className="Footer-links">

            {/* COMPANY */}
            <div className="Footer-column">

              <h4 className="Footer-heading">
                Company
              </h4>

              <ul className="Footer-list">

                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/about">
                    About Us
                  </Link>
                </li>

                <li>
                  <Link to="/blog">
                    Blog
                  </Link>
                </li>

                <li>
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </li>

              </ul>

            </div>

            {/* PROPERTY */}
            <div className="Footer-column">

              <h4 className="Footer-heading">
                Properties
              </h4>

              <ul className="Footer-list">

                <li>
                  <Link to="/rent-property">
                    Rent Property
                  </Link>
                </li>

                <li>
                  <Link to="/buy-property">
                    Buy Property
                  </Link>
                </li>

                <li>
                  <Link to="/commercial-property">
                    Commercial
                  </Link>
                </li>

                <li>
                  <Link to="/residential-property">
                    Residential
                  </Link>
                </li>

              </ul>

            </div>

            {/* SUPPORT */}
            <div className="Footer-column">

              <h4 className="Footer-heading">
                Support
              </h4>

              <ul className="Footer-list">

                <li>
                  <Link to="/faq">
                    FAQ
                  </Link>
                </li>

                <li>
                  <Link to="/help-center">
                    Help Center
                  </Link>
                </li>

                <li>
                  <Link to="/privacy-policy">
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link to="/terms-condition">
                    Terms & Conditions
                  </Link>
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="Footer-bottom">

        <p className="Footer-copy">
          © {new Date().getFullYear()} Prestige Properties.
          All Rights Reserved.
        </p>

        <p className="Footer-developed">
          Developed with{" "}
          <span className="Footer-heart">
            ❤
          </span>{" "}
          by{" "}

          <a
            href="https://prwebstock.com"
            target="_blank"
            rel="noopener noreferrer"
            className="Footer-link-brand"
          >
            PR WEBSTOCK
          </a>

        </p>

        <div className="Footer-bottom-links">

          <Link to="/privacy-policy-terms">
            Privacy Policy | Terms Of Condition
          </Link>

        </div>

      </div>

    </footer>
  );
};

export default Footer;