import React, { useState } from "react";
import "./FAQPage.css";

import home1 from "../../assets/home1.webp";
import interior1 from "../../assets/interior1.webp";
import interior2 from "../../assets/interior2.webp";
import interior3 from "../../assets/interior3.webp";

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      question: "How to buy a property?",
      answer:
        "You can browse listings, compare features, shortlist properties, and contact our team for site visits, pricing, and closing support.",
    },
    {
      question: "How can I request a refund from your website?",
      answer:
        "Refund requests can be submitted through our support team with your booking details and payment reference for verification.",
    },
    {
      question: "I am a new user. How should I start?",
      answer:
        "Create an account, explore available properties, save your favorites, and reach out to our team if you need guidance.",
    },
    {
      question: "Returns and refunds",
      answer:
        "Returns and refunds depend on booking terms, cancellation policy, and the applicable property agreement conditions.",
    },
    {
      question: "Are my details secured?",
      answer:
        "Yes. Your details are protected using secure systems and safe payment-handling methods.",
    },
    {
      question: "Sale code is not working",
      answer:
        "Please verify the code validity, spelling, and expiry date. If the issue continues, contact support.",
    },
    {
      question: "How do I make payment by my credit card?",
      answer:
        "You can pay securely using supported debit or credit card gateways during checkout.",
    },
  ];

  const statsData = [
    { icon: "⌂", number: "560+", label: "Total Area Sq" },
    { icon: "▦", number: "197K+", label: "Apartments Sold" },
    { icon: "⚒", number: "268+", label: "Total Constructions" },
    { icon: "🪑", number: "340+", label: "Apartio Rooms" },
  ];

  const blogData = [
    {
      image: interior1,
      title: "10 Brilliant Ways To Decorate Your Home",
      date: "June 24, 2021",
      tags: "Interior • Decorate",
    },
    {
      image: interior2,
      title: "The Most Inspiring Interior Design Of 2021",
      date: "July 23, 2021",
      tags: "Interior • Design",
    },
    {
      image: interior3,
      title: "Recent Commercial Real Estate Transactions",
      date: "May 22, 2021",
      tags: "Interior • Estate",
    },
  ];

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="faq-container">
          <div className="faq-hero-content">
            <p className="faq-subtitle">Support Center</p>
            <h1>Frequently asked questions</h1>

            <div className="faq-breadcrumb">
              <span>Home</span>
              <span className="faq-separator">/</span>
              <span className="active">FAQ</span>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-main-section">
        <div className="faq-container">
          <div className="faq-main-grid">
            <div className="faq-left">
              <div className="section-head">
                <span>Need Help?</span>
                <h2>Answers for your common questions</h2>
              </div>

              <div className="faq-accordion">
                {faqData.map((item, index) => (
                  <div
                    className={`faq-item ${openIndex === index ? "active" : ""}`}
                    key={index}
                  >
                    <button
                      className="faq-question"
                      type="button"
                      onClick={() =>
                        setOpenIndex(openIndex === index ? -1 : index)
                      }
                    >
                      <span>{item.question}</span>
                      <span className="faq-icon-box">
                        {openIndex === index ? "−" : "+"}
                      </span>
                    </button>

                    {openIndex === index && (
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="faq-support-box">
                <h3>Still need help? Reach out to support 24/7</h3>
                <p>
                  Our support team is ready to help you with bookings, property
                  details, payments, and account assistance.
                </p>

                <div className="faq-support-row">
                  <button className="faq-contact-btn" type="button">
                    Contact Us
                  </button>
                  <div className="faq-phone">+0123-456-789</div>
                </div>
              </div>
            </div>

            <div className="faq-right">
              <div className="faq-newsletter-box">
                <span className="faq-newsletter-mini">Newsletter</span>
                <h3>Get real-estate updates in your inbox</h3>
                <p>
                  Subscribe for design ideas, investment updates, and property
                  news.
                </p>

                <div className="faq-search-box">
                  <input type="text" placeholder="Enter your email" />
                  <button type="button">Join</button>
                </div>
              </div>

              <div className="faq-side-image-card">
                <img src={home1} alt="home" />
                <div className="faq-image-badge">
                  <strong>Modern Living</strong>
                  <span>Luxury homes & curated spaces</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-stats-section">
        <div className="faq-container">
          <div className="faq-stats-grid">
            {statsData.map((item, index) => (
              <div className="faq-stat-card" key={index}>
                <div className="faq-stat-icon">{item.icon}</div>
                <h3>{item.number}</h3>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-blog-section">
        <div className="faq-container">
          <div className="faq-blog-heading">
            <span>News & Blogs</span>
            <h2>Latest News Feeds</h2>
          </div>

          <div className="faq-blog-grid">
            {blogData.map((blog, index) => (
              <div className="faq-blog-card" key={index}>
                <div className="faq-blog-image">
                  <img src={blog.image} alt={blog.title} />
                </div>

                <div className="faq-blog-content">
                  <div className="faq-blog-meta">
                    <span>By Admin</span>
                    <span>{blog.tags}</span>
                  </div>

                  <h3>{blog.title}</h3>

                  <div className="faq-blog-footer">
                    <span>{blog.date}</span>
                    <button type="button">Read More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQPage;