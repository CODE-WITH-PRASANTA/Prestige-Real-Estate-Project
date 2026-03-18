import React from "react";
import "./Contact.css";
import {
  FiHome,
  FiUser,
  FiMail,
  FiPhone,
  FiEdit3,
  FiChevronDown,
} from "react-icons/fi";

import emailIcon from "../../assets/email.webp";
import phoneIcon from "../../assets/phone.webp";
import locationIcon from "../../assets/adress.webp";


  
function ContactCards() {
  const cards = [
    {
      icon: emailIcon,
      title: "Email Address",
      line1: "info@webmail.com",
      line2: "jobs@webexample.com",
    },
    {
      icon: phoneIcon,
      title: "Phone Number",
      line1: "+0123-456789",
      line2: "+987-6543210",
    },
    {
      icon: locationIcon,
      title: "Office Address",
      line1: "18/A, New Born Town Hall",
      line2: "New York, US",
    },
  ];

  return (
    <section className="contact-cards-section">
      <div className="contact-container">
        <div className="contact-cards-grid">
          {cards.map((card, index) => (
            <div className="contact-card-box" key={index}>
              <div className="contact-card-icon">
                <img src={card.icon} alt={card.title} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.line1}</p>
              <p>{card.line2}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  return (
    <section className="contact-form-section">
      <div className="contact-container">
        <div className="contact-form-wrapper">
          <h3 className="contact-form-title">Get A Quote</h3>

          <form className="contact-form-grid">
            <div className="contact-form-row">
              <div className="contact-input-box">
                <input type="text" placeholder="Enter your name" />
                <FiUser className="contact-input-icon" />
              </div>

              <div className="contact-input-box">
                <input type="email" placeholder="Enter email address" />
                <FiMail className="contact-input-icon" />
              </div>
            </div>

            <div className="contact-form-row">
              <div className="contact-input-box contact-select-box">
                <select defaultValue="">
                  <option value="" disabled>
                    Select Service Type
                  </option>
                  <option>Buy Property</option>
                  <option>Sell Property</option>
                  <option>Rent Property</option>
                </select>
                <FiChevronDown className="contact-input-icon" />
              </div>

              <div className="contact-input-box">
                <input type="text" placeholder="Enter phone number" />
                <FiPhone className="contact-input-icon" />
              </div>
            </div>

            <div className="contact-input-box contact-textarea-box">
              <textarea placeholder="Enter message"></textarea>
              <FiEdit3 className="contact-input-icon" />
            </div>

            <label className="contact-checkbox">
              <input type="checkbox" />
              <span>
                Save my name, email, and website in this browser for the next
                time I comment.
              </span>
            </label>

            <button type="submit" className="contact-submit-btn">
              GET A FREE SERVICE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactMap() {
  return (
    <section className="contact-map-section">
      <iframe
        src="https://www.google.com/maps?q=Brooklyn+Botanic+Garden&output=embed"
        title="Brooklyn Map"
        loading="lazy"
        allowFullScreen
      ></iframe>
    </section>
  );
}

function ContactCTA() {
  return (
    <section className="contact-cta-section">
      <div className="contact-container">
        <div className="contact-cta-box">
          <div className="contact-cta-left">
            <h2>Looking for a dream home?</h2>
          </div>

          <div className="contact-cta-right">
            <button>Explore Properties</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <div className="contact-page">
     
      <ContactCards />
      <ContactForm />
      <ContactMap />
      <ContactCTA />
    </div>
  );
}