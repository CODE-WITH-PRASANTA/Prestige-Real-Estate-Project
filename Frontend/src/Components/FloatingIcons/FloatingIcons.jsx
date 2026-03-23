import React, { useEffect, useState } from "react";
import "./FloatingIcons.css";
import { FaWhatsapp, FaPhoneAlt, FaArrowUp } from "react-icons/fa";

const FloatingIcons = () => {
  const [FloatingIconsShowTop, setFloatingIconsShowTop] = useState(false);

  useEffect(() => {
    const FloatingIconsHandleScroll = () => {
      if (window.scrollY > 250) {
        setFloatingIconsShowTop(true);
      } else {
        setFloatingIconsShowTop(false);
      }
    };

    window.addEventListener("scroll", FloatingIconsHandleScroll);
    return () => window.removeEventListener("scroll", FloatingIconsHandleScroll);
  }, []);

  const FloatingIconsScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="FloatingIcons">
      <div className="FloatingIcons__wrapper">
        <a
          href="https://wa.me/917014627894?text=Hello%20I%20am%20interested%20in%20your%20real%20estate%20properties."
          target="_blank"
          rel="noopener noreferrer"
          className="FloatingIcons__button FloatingIcons__button--whatsapp"
          aria-label="Chat on WhatsApp"
          title="WhatsApp"
        >
          <FaWhatsapp />
          <span className="FloatingIcons__tooltip">WhatsApp</span>
        </a>

        <a
          href="tel:+917014627894"
          className="FloatingIcons__button FloatingIcons__button--call"
          aria-label="Call now"
          title="Call"
        >
          <FaPhoneAlt />
          <span className="FloatingIcons__tooltip">Call</span>
        </a>

        <button
          type="button"
          onClick={FloatingIconsScrollTop}
          className={`FloatingIcons__button FloatingIcons__button--top ${
            FloatingIconsShowTop ? "FloatingIcons__button--topShow" : "FloatingIcons__button--topHide"
          }`}
          aria-label="Scroll to top"
          title="Top"
        >
          <FaArrowUp />
          <span className="FloatingIcons__tooltip">Top</span>
        </button>
      </div>
    </div>
  );
};

export default FloatingIcons;