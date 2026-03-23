import React, { useState, useEffect, useRef } from "react";
import "./FAQ.css";
import faqImg from "../../assets/faq.jpg";

const FAQ = () => {
  const sectionRef = useRef(null);
  const [openId, setOpenId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const faqs = [
    {
      id: "f1",
      q: "What is Prestige Real Estate Properties?",
      a: "Prestige Real Estate Properties is a modern platform designed to help users explore homes easily. It focuses on simple navigation, clear property details, and a smooth experience for buyers and renters."
    },
    {
      id: "f2",
      q: "What types of properties are available?",
      a: "You can find a wide range of properties including flats, villas, residential plots, and commercial spaces. Each listing is designed to give you a clear idea of pricing, features, and location benefits."
    },
    {
      id: "f3",
      q: "Is this platform beginner-friendly?",
      a: "Yes, the platform is built keeping first-time buyers in mind. Everything is explained in simple terms so that even beginners can understand property details without confusion."
    },
    {
      id: "f4",
      q: "How do I choose the right property?",
      a: "Start by setting your budget and preferred location. Then compare amenities, connectivity, and long-term value to make a smart and practical decision."
    },
    {
      id: "f5",
      q: "Why is location important?",
      a: "Location plays a major role in property value and daily convenience. A good location ensures better resale value, easy travel, and access to schools, hospitals, and markets."
    },
    {
      id: "f6",
      q: "Are prices realistic?",
      a: "Yes, all prices are shown in ₹ based on general market trends in India. This helps users get a practical idea of property costs before making decisions."
    },
    {
      id: "f7",
      q: "What documents are required?",
      a: "Basic documents include ID proof, address proof, income proof, and property papers. Proper documentation ensures a safe and legally secure transaction."
    },
    {
      id: "f8",
      q: "Can I get a home loan?",
      a: "Yes, most buyers prefer home loans from banks or financial institutions. Loan eligibility depends on income, credit score, and property type."
    },
    {
      id: "f9",
      q: "What is a down payment?",
      a: "A down payment is the initial amount you pay upfront while buying a property. The remaining amount is usually financed through a home loan."
    },
    {
      id: "f10",
      q: "Is verification necessary?",
      a: "Yes, property verification is very important before buying. Always check legal documents, ownership details, and approvals to avoid future issues."
    },
    {
      id: "f11",
      q: "Carpet vs built-up area?",
      a: "Carpet area is the usable space inside your home, while built-up area includes walls and additional spaces. Understanding this helps you compare properties correctly."
    },
    {
      id: "f12",
      q: "Can students invest?",
      a: "Students can learn about real estate through this platform, but actual investment requires proper financial planning. It's always better to consult experts before investing."
    },
    {
      id: "f13",
      q: "Why invest in real estate?",
      a: "Real estate offers long-term value and potential rental income. It is considered a stable investment compared to many other options."
    },
    {
      id: "f14",
      q: "What is RERA?",
      a: "RERA (Real Estate Regulatory Authority) protects buyers and ensures transparency in property transactions. It helps reduce fraud and improves trust in the market."
    },
    {
      id: "f15",
      q: "How to compare properties?",
      a: "Compare properties based on price, location, amenities, and future value. Taking time to compare helps you make a better and informed decision."
    },
    {
      id: "f16",
      q: "What are amenities?",
      a: "Amenities include facilities like parking, security, lift, gym, and parks. These features improve comfort and overall lifestyle."
    },
    {
      id: "f17",
      q: "Buying vs renting?",
      a: "Buying gives long-term ownership and investment benefits, while renting offers flexibility. The choice depends on your financial goals and lifestyle needs."
    },
    {
      id: "f18",
      q: "How to check property value?",
      a: "Check nearby property prices, market trends, and location demand. This gives you a better understanding of whether a property is fairly priced."
    },
    {
      id: "f19",
      q: "Common mistakes?",
      a: "Avoid skipping legal checks or rushing decisions. Always verify documents and understand all costs before finalizing a property."
    },
    {
      id: "f20",
      q: "Project goal?",
      a: "The goal of Prestige Real Estate Project is to make property understanding simple. It helps users learn and explore real estate in an easy and practical way."
    }
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(faqs.length / itemsPerPage);

  const currentFaqs = faqs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentFaqs.length > 0) {
      setOpenId(currentFaqs[0].id);
    }
  }, [currentPage]);

  useEffect(() => {
    const elements = sectionRef.current.querySelectorAll(".faq-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("faq-active");
          }
        });
      },
      { threshold: 0.18 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="faq" ref={sectionRef}>
      <div className="faq-bg faq-bg-one"></div>
      <div className="faq-bg faq-bg-two"></div>

      <div className="faq-wrap">
        <div className="faq-head">
          <h2 className="faq-reveal">
            Prestige Real Estate Properties – Frequently Asked Questions
          </h2>

          <div className="faq-underline faq-reveal faq-delay-1">
            <span></span>
            <span></span>
          </div>

          <p className="faq-reveal faq-delay-2">
            Get clear answers to common property questions and make confident real estate decisions.
          </p>
        </div>

        <div className="faq-grid">
          <div className="faq-imgBox faq-reveal faq-delay-3">
            <img src={faqImg} alt="Real estate FAQ - Prestige Real Estate Project" />
          </div>

          <div className="faq-right faq-reveal faq-delay-4">
            <div className="faq-list">
              {currentFaqs.map((item, index) => (
                <div
                  key={item.id}
                  className={`faq-card ${openId === item.id ? "open" : ""}`}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <button className="faq-q" onClick={() => toggle(item.id)} type="button">
                    <span>{item.q}</span>
                    <span className="faq-icon">
                      {openId === item.id ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className="faq-aWrap"
                    style={{ maxHeight: openId === item.id ? "300px" : "0px" }}
                  >
                    <div className="faq-a">{item.a}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="faq-pagination">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                  type="button"
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;