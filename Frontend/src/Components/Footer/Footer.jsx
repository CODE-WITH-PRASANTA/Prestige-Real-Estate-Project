import React from "react";
import "./Footer.css";
import Logo from "../../assets/Main-Logo.png";

const Footer = () => {
  return (
    <footer className="Footer-container">
      <div className="Footer-wrapper">
        
        {/* LEFT SECTION */}
        <div className="Footer-left">
          <div className="Footer-logo">
            <img src={Logo} alt="logo" />
          </div>

          <div className="Footer-contact">
            <div>
              <p>Total Free Customer Care</p>
              <h4>+91 9595422040</h4>
            </div>
            <div>
              <p>Need Live Support?</p>
              <h4>Dayanand.prestige@gmail.com</h4>
            </div>
          </div>

          <div className="Footer-social">
            <h4>Follow us on social media</h4>
            <div className="Footer-icons">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-linkedin-in"></i>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="Footer-right">
          <div className="Footer-newsletter">
            <h3>Keep Yourself Up to Date</h3>
            <div className="Footer-input-box">
              <input type="email" placeholder="Your Email" />
              <button>Subscribe</button>
            </div>
          </div>

          <div className="Footer-links">
            {/* COLUMN 1 */}
            <div className="Footer-column Footer-column-1">
              <h4 className="Footer-heading">Company</h4>
              <ul className="Footer-list">
                <li className="Footer-item">Home</li>
                <li className="Footer-item">About</li>
                <li className="Footer-item">Blog</li>
                <li className="Footer-item">Contact</li>
              </ul>
            </div>

            {/* COLUMN 2 */}
            <div className="Footer-column Footer-column-2">
              <h4 className="Footer-heading">Properties</h4>
              <ul className="Footer-list">
                <li className="Footer-item">Rent Property</li>
                <li className="Footer-item">Buy Property</li>
                <li className="Footer-item">Commercial</li>
                <li className="Footer-item">Residential</li>
              </ul>
            </div>

            {/* COLUMN 3 */}
            <div className="Footer-column Footer-column-3">
              <h4 className="Footer-heading">Support</h4>
              <ul className="Footer-list">
                <li className="Footer-item">FAQ</li>
                <li className="Footer-item">Help Center</li>
                <li className="Footer-item">Privacy Policy</li>
                <li className="Footer-item">Terms & Conditions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="Footer-bottom">
        <p className="Footer-copy">
          © {new Date().getFullYear()} Prestige Properties. All rights reserved.
        </p>

        <p className="Footer-developed">
          Developed with <span className="Footer-heart">❤</span> by{" "}
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
          <span>Privacy</span>
          <span>·</span>
          <span>Terms</span>
          <span>·</span>
          <span>Sitemap</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;