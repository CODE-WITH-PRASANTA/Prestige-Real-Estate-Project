import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo-1.png"; // ✅ import your logo

export default function Footer() {
  return (
    <footer className="ft">

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
            <a href="#" className="ft-soc">f</a>
            <a href="#" className="ft-soc">x</a>
            <a href="#" className="ft-soc">in</a>
            <a href="#" className="ft-soc">ig</a>
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
          <p>© 2026 Dreams Estate. All Rights Reserved.</p>
          <p>
            Developed by <span className="ft-brand">Dreams Technologies</span>
          </p>
        </div>
      </div>

    </footer>
  );
}