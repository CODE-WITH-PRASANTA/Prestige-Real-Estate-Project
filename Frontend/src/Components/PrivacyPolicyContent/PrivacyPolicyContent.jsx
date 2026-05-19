// PrivacyPolicyContent.jsx

import React from "react";
import { Link } from "react-router-dom";

import "./PrivacyPolicyContent.css";

import {
  FaChevronRight,
  FaCheckSquare,
  FaArrowUp,
  FaHeadset,
} from "react-icons/fa";

import bannerImg from "../../assets/Apartment5.webp";

const PrivacyPolicyContent = () => {
  return (
    <section className="ppolicy">
      {/* =========================================
          TOP HERO
      ========================================= */}

      <div className="ppolicy__hero">
        {/* LEFT */}

        <div className="ppolicy__heroContent">
          <h1>Privacy Policy</h1>

<div className="ppolicy__breadcrumb">
  <Link
    to="/"
    className="ppolicy__breadcrumbLink"
  >
    Home
  </Link>

  <FaChevronRight />

  <strong>Privacy Policy</strong>
</div>
        </div>

        {/* RIGHT */}

        <div className="ppolicy__heroImage">
          <img
            src={bannerImg}
            alt="Privacy Banner"
          />
        </div>
      </div>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <div className="ppolicy__wrapper">
        {/* =========================================
            LEFT SIDEBAR
        ========================================= */}

        <aside className="ppolicy__sidebar">
          <h3>Categories</h3>

          <div className="ppolicy__menu">
            {[
              "Terms Of Use",
              "Limitations",
              "Revisions and Errata",
              "Site Terms of Use",
              "Modifications",
              "Risks",
            ].map((item, index) => (
              <button
                key={index}
                className="ppolicy__menuItem"
              >
                <span>{item}</span>

                <FaChevronRight />
              </button>
            ))}
          </div>

          {/* CONTACT */}

          <div className="ppolicy__contactCard">
            <h4>Contact Us</h4>

            <p>
              Let’s make your real estate
              journey smooth and successful.
              Contact us today!
            </p>

<Link to="/contact">
  <button className="ppolicy__helpBtn">
    <FaHeadset />

    Visit Help Centre
  </button>
</Link>
          </div>
        </aside>

        {/* =========================================
            RIGHT CONTENT
        ========================================= */}

        <div className="ppolicy__content">
          {/* SECTION */}

          <div className="ppolicy__section">
            <h2>Privacy & Policy</h2>

            <p>
              At Prestige Property, protecting your
              privacy is our top priority.
              This Privacy Policy outlines
              how we collect, use, and
              safeguard your personal
              information when you interact
              with our website and services.
            </p>

            <h4>
              Effective Date: 26 February
              2026
            </h4>

            <p>
              We value transparency and
              trust. This policy explains
              what data we collect, how we
              use it, and the choices you
              have regarding your
              information.
            </p>
          </div>

          {/* SECTION */}

          <div className="ppolicy__section">
            <h2>
              Information We Collect
            </h2>

            <p>
              We collect the following types
              of information to provide a
              seamless experience:
            </p>

            <div className="ppolicy__infoBlock">
              <h5>
                Personal Information:
              </h5>

              <p>
                Name, email address, phone
                number, mailing address,
                and payment details.
              </p>
            </div>

            <div className="ppolicy__infoBlock">
              <h5>
                Property Information
              </h5>

              <p>
                Details about properties
                you list or inquire about.
              </p>
            </div>

            <div className="ppolicy__infoBlock">
              <h5>Usage Data</h5>

              <p>
                IP address, browser type,
                pages visited, and analytics
                to improve our services.
              </p>
            </div>

            <div className="ppolicy__infoBlock">
              <h5>Cookies</h5>

              <p>
                Small data files stored on
                your device to improve
                website functionality.
              </p>
            </div>
          </div>

          {/* SECTION */}

          <div className="ppolicy__section">
            <h2>
              How We Use Your Information
            </h2>

            <p>
              We use the information we
              collect to:
            </p>

            <div className="ppolicy__list">
              {[
                "Provide and improve our real estate services.",
                "Process transactions and manage your inquiries.",
                "Communicate updates and recommendations.",
                "Ensure website security and fraud prevention.",
              ].map((item, index) => (
                <div
                  className="ppolicy__listItem"
                  key={index}
                >
                  <FaCheckSquare />

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION */}

          <div className="ppolicy__section">
            <h2>Information Sharing</h2>

            <p>
              We value your trust and do
              not sell or rent your
              personal information.
            </p>

            <div className="ppolicy__list">
              {[
                "Trusted partners and service providers for transactions.",
                "Law enforcement or government authorities when required.",
                "Potential buyers or tenants to complete transactions.",
              ].map((item, index) => (
                <div
                  className="ppolicy__listItem"
                  key={index}
                >
                  <FaCheckSquare />

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION */}

          <div className="ppolicy__section">
            <h2>Data Security</h2>

            <p>
              We implement industry-standard
              measures to protect your
              information from unauthorized
              access and misuse.
            </p>
          </div>

          {/* SECTION */}

          <div className="ppolicy__section">
            <h2>Third Party Links</h2>

            <p>
              Our website may contain links
              to third-party websites. We
              are not responsible for their
              privacy practices.
            </p>

            <p>
              At Housa, your privacy is our
              priority. We are committed to
              protecting your personal
              information and ensuring a
              secure user experience.
            </p>
          </div>
        </div>
      </div>


      {/* =========================================
    CTA SECTION
========================================= */}

<section className="ppolicy__cta">
  <div className="ppolicy__ctaContent">
    <span className="ppolicy__ctaTag">
      Start Your Journey
    </span>

    <h2>
      Let’s Make Your Property
      Dreams a Reality
    </h2>

    <p>
      Don’t wait to start your real estate
      journey. Whether you’re buying,
      selling, or renting, our expert team
      is here to guide you every step of
      the way.
    </p>

    <div className="ppolicy__ctaBtns">
<Link to="/contact">
  <button className="ppolicy__ctaBtn">
    Start Your Search Today
  </button>
</Link>

<Link to="/contact">
  <button className="ppolicy__ctaOutline">
    Contact Us
  </button>
</Link>
    </div>
  </div>
</section>


    </section>
  );
};

export default PrivacyPolicyContent;