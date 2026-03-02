import { useState } from "react";
import "./FAQ.css";

// ✅ put your image in: src/assets/faq.jpg (or change the name here)
import faqImg from "../../assets/faq.jpg";

export default function FAQ() {
  const [openId, setOpenId] = useState("g1"); // default open first

  const general = [
    {
      id: "g1",
      q: "What is real estate?",
      a: "Real estate refers to land and any permanent structures on it, such as homes or buildings.",
    },
    {
      id: "g2",
      q: "What types of properties are included in real estate?",
      a: "Real estate can include residential homes, apartments, villas, commercial spaces, land plots, and industrial properties.",
    },
    {
      id: "g3",
      q: "What is the role of a real estate agent?",
      a: "A real estate agent helps you buy, sell, or rent properties, negotiates deals, and supports you through documentation and closing.",
    },
  ];

  const buying = [
    {
      id: "b1",
      q: "How do I start the home-buying process?",
      a: "Start by setting a budget, checking eligibility, selecting a preferred location, and shortlisting properties. Then schedule visits and verify documents.",
    },
    {
      id: "b2",
      q: "How much down payment do I need?",
      a: "Down payment depends on the property value and loan type. Many buyers pay a portion upfront and finance the rest through a home loan.",
    },
    {
      id: "b3",
      q: "What is a home inspection?",
      a: "A home inspection is a professional check of the property condition—structure, plumbing, wiring, and overall safety—before you finalize the deal.",
    },
  ];

  const toggle = (id) => setOpenId((prev) => (prev === id ? "" : id));

  return (
    <section className="faq">
      <div className="faq-wrap">
        {/* heading */}
        <div className="faq-head">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-underline" aria-hidden="true">
            <span />
            <span />
          </div>
          <p>Ready to buy your dream home? find it here.</p>
        </div>

        {/* content */}
        <div className="faq-grid">
          {/* LEFT IMAGE */}
          <div className="faq-left">
            <div className="faq-imgBox">
              <img src={faqImg} alt="Property" />
            </div>
          </div>

          {/* RIGHT ACCORDION */}
          <div className="faq-right">
            <h3 className="faq-groupTitle">General FAQ’s</h3>

            <div className="faq-list">
              {general.map((item) => (
                <FaqItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </div>

            <h3 className="faq-groupTitle buy">Buying FAQ’s</h3>

            <div className="faq-list">
              {buying.map((item) => (
                <FaqItem
                  key={item.id}
                  item={item}
                  isOpen={openId === item.id}
                  onToggle={() => toggle(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-card ${isOpen ? "open" : ""}`}>
      <button className="faq-q" onClick={onToggle} type="button">
        <span>{item.q}</span>
        <span className="faq-icon" aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div className="faq-aWrap" style={{ maxHeight: isOpen ? 220 : 0 }}>
        <div className="faq-a">{item.a}</div>
      </div>
    </div>
  );
}