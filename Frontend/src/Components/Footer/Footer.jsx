import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo-1.png";

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-glow ft-glow-1"></div>
      <div className="ft-glow ft-glow-2"></div>

      <div className="ft-wrap">
        {/* LEFT - LOGO */}
        <div className="ft-col ft-brand-col">
          <img src={logo} alt="logo" className="ft-logo" />

          <p className="ft-sub">
            We help you find the best properties for buying, selling,
            and renting with ease and trust.
          </p>

          {/* SOCIAL */}
          <div className="ft-social">
            <a href="#" className="ft-soc" aria-label="Facebook">f</a>
            <a href="#" className="ft-soc" aria-label="X">x</a>
            <a href="#" className="ft-soc" aria-label="LinkedIn">in</a>
            <a href="#" className="ft-soc" aria-label="Instagram">ig</a>
          </div>
        </div>

        {/* LINKS */}
        <div className="ft-col">
          <h3 className="ft-title">Quick Links</h3>

          <ul className="ft-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/property">Properties</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/testimonial">Testimonial</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="ft-col">
          <h3 className="ft-title">Contact</h3>

          <ul className="ft-contact">
            <li>(+04) 743 323 424</li>
            <li>contact@urban.com</li>
            <li>Collins Street West Victoria</li>
            <li>Mon-Sat: 9:00 - 18:00</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="ft-bottom">
        <div className="ft-bottom-wrap">
          <p>2026 © Copyright reserve Prestige Property.</p>
          <p>
            Developed by <span className="ft-brand">PR WebStock</span>
          </p>
        </div>
      </div>
    </footer>
  );
}