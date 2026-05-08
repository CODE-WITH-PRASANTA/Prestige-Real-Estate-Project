import React, { useEffect, useState } from "react";
import "./Contact.css";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiEdit3,
  FiChevronDown,
} from "react-icons/fi";

import emailIcon from "../../assets/email.webp";
import phoneIcon from "../../assets/phone.webp";
import locationIcon from "../../assets/adress.webp";

import { getContact } from "../../services/contactService";

// 🔹 CARDS (NOW DYNAMIC)
function ContactCards({ data }) {
  const cards = [
    {
      icon: emailIcon,
      title: "Email Address",
      line1: data.email1 || "-",
      line2: data.email2 || "-",
    },
    {
      icon: phoneIcon,
      title: "Phone Number",
      line1: data.phone1 || "-",
      line2: data.phone2 || "-",
    },
    {
      icon: locationIcon,
      title: "Office Address",
      line1: data.address || "-",
      line2: `${data.city || "-"}, ${data.country || "-"}`,
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

// 🔹 FORM (unchanged UI)
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
                Save my name, email, and website for next time.
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

// 🔹 MAP (optional dynamic later)
function ContactMap() {
  return (
    <section className="contact-map-section">
      <iframe
        src="https://www.google.com/maps?q=Brooklyn+Botanic+Garden&output=embed"
        title="Map"
        loading="lazy"
        allowFullScreen
      ></iframe>
    </section>
  );
}

// 🔹 CTA
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

// 🔥 MAIN COMPONENT
export default function Contact() {
  const [data, setData] = useState({
    email1: "",
    email2: "",
    phone1: "",
    phone2: "",
    address: "",
    city: "",
    country: "",
  });

  const [loading, setLoading] = useState(true);

  // 🔹 FETCH FROM BACKEND
  const fetchContact = async () => {
    try {
      const res = await getContact();
      if (res.data) setData(res.data);
    } catch (err) {
      console.error("Contact fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  if (loading) {
    return <div style={{ padding: "40px" }}>Loading contact...</div>;
  }

  return (
    <div className="contact-page">
      <ContactCards data={data} />
      <ContactForm />
      <ContactMap />
      <ContactCTA />
    </div>
  );
}