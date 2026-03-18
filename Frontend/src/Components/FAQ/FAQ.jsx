import { useState, useEffect } from "react";
import "./FAQ.css";
import faqImg from "../../assets/faq.jpg";

const FAQ = () => {
  const [openId, setOpenId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const faqs = [
    { id: "f1", q: "What is Prestige Real Estate Properties?", a: "Prestige Real Estate Properties is a student project created to showcase modern property listings in a simple and user-friendly way." },
    { id: "f2", q: "What types of properties are available?", a: "You can explore flats, villas, plots, and commercial spaces." },
    { id: "f3", q: "Is this platform beginner-friendly?", a: "Yes, it is designed for easy understanding even for first-time buyers." },
    { id: "f4", q: "How do I choose the right property?", a: "Check budget, location, amenities, and long-term value." },
    { id: "f5", q: "Why is location important?", a: "Location affects price, resale value, and daily convenience." },
    { id: "f6", q: "Are prices realistic?", a: "Yes, prices are shown in ₹ based on market understanding." },
    { id: "f7", q: "What documents are required?", a: "ID proof, address proof, income proof, and property documents." },
    { id: "f8", q: "Can I get a home loan?", a: "Yes, most buyers use home loans from banks." },
    { id: "f9", q: "What is a down payment?", a: "Initial payment while remaining is financed." },
    { id: "f10", q: "Is verification necessary?", a: "Yes, always verify documents before buying." },
    { id: "f11", q: "Carpet vs built-up area?", a: "Carpet is usable area, built-up includes walls." },
    { id: "f12", q: "Can students invest?", a: "This project is educational, real investment needs planning." },
    { id: "f13", q: "Why invest in real estate?", a: "It offers long-term value and rental income." },
    { id: "f14", q: "What is RERA?", a: "RERA protects buyers and ensures transparency." },
    { id: "f15", q: "How to compare properties?", a: "Compare price, location, and amenities." },
    { id: "f16", q: "What are amenities?", a: "Facilities like parking, gym, and security." },
    { id: "f17", q: "Buying vs renting?", a: "Buying is investment, renting gives flexibility." },
    { id: "f18", q: "How to check property value?", a: "Check nearby market trends." },
    { id: "f19", q: "Common mistakes?", a: "Avoid skipping legal checks." },
    { id: "f20", q: "Project goal?", a: "To provide simple real estate learning." }
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

  const toggle = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="faq">
      <div className="faq-wrap">

        <div className="faq-head">
          <h2>Prestige Real Estate Properties – FAQs</h2>

          <div className="faq-underline">
            <span></span>
            <span></span>
          </div>

          <p>
            Find answers to common real estate questions and make better decisions.
          </p>
        </div>

        <div className="faq-grid">

          {/* LEFT */}
          <div className="faq-imgBox">
            <img src={faqImg} alt="FAQ" />
          </div>

          {/* RIGHT */}
          <div className="faq-right">

            <div className="faq-list">
              {currentFaqs.map((item) => (
                <div key={item.id} className={`faq-card ${openId === item.id ? "open" : ""}`}>
                  
                  <button className="faq-q" onClick={() => toggle(item.id)}>
                    <span>{item.q}</span>
                    <span className="faq-icon">
                      {openId === item.id ? "−" : "+"}
                    </span>
                  </button>

                  <div className="faq-aWrap" style={{ maxHeight: openId === item.id ? "300px" : "0px" }}>
                    <div className="faq-a">{item.a}</div>
                  </div>

                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="faq-pagination">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
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