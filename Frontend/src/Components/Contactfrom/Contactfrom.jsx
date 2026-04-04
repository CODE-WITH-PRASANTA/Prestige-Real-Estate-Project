import React, { useEffect } from "react";
import "./Contactfrom.css";
import { FaCheckCircle } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";

import child1 from "../../assets/Apartment2.webp";
import child2 from "../../assets/Apartment1.webp";

const Contactfrom = () => {

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          entry.target.classList.add("active");
        }
      });
    },{threshold:0.2});

    elements.forEach(el => observer.observe(el));
  },[]);

  return (
    <section className="admission-section">
      <div className="admission-container">

        {/* LEFT IMAGES */}
        <div className="admission-images reveal">
          <img src={child1} alt="property" className="admission-img admission-img-top" />
          <img src={child2} alt="property" className="admission-img admission-img-bottom" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="admission-content">

          <h2 className="admission-title reveal">
            Book Your Dream Property
          </h2>

          <p className="reveal admission-subtitle">
            Discover premium living spaces with Prestige Real Estate Properties.
            Fill in your details and our experts will connect with you shortly.
          </p>

          <div className="admission-features">

            <div className="reveal" style={{transitionDelay:"0.1s"}}>
              <p><FaCheckCircle /> Premium apartments & villas</p>
              <p><FaCheckCircle /> Prime locations with modern amenities</p>
            </div>

            <div className="reveal" style={{transitionDelay:"0.2s"}}>
              <p><FaCheckCircle /> Easy booking & site visit</p>
              <p><FaCheckCircle /> Trusted by thousands of homeowners</p>
            </div>

          </div>

          {/* FORM */}
          <form className="admission-form reveal" style={{transitionDelay:"0.3s"}}>

            <div className="admission-form-grid">

              <div className="admission-field">
                <label>Full Name <span>(Required)</span></label>
                <input type="text" placeholder="Enter your name" />
              </div>

              <div className="admission-field">
                <label>Preferred Visit Date <span>(Required)</span></label>
                <div className="admission-date">
                  <input type="text" placeholder="dd-mm-yyyy"/>
                  <FiCalendar />
                </div>
              </div>

              <div className="admission-field">
                <label>Email Address <span>(Required)</span></label>
                <input type="email" placeholder="Enter your email"/>
              </div>

              <div className="admission-field">
                <label>Phone Number <span>(Required)</span></label>
                <input type="text" placeholder="Enter your phone number"/>
              </div>

              <div className="admission-field">
                <label>Property Type</label>
                <input type="text" placeholder="Apartment / Villa / Plot"/>
              </div>

              <div className="admission-field">
                <label>Budget Range</label>
                <input type="text" placeholder="e.g. ₹50L - ₹1Cr"/>
              </div>

            </div>

            <div className="admission-bottom">
              <label className="admission-checkbox">
                <input type="checkbox" /> Notify me about new property offers
              </label>

              <button className="admission-btn">
                Book Site Visit
              </button>
            </div>

          </form>

        </div>
      </div>
    </section>
  );
};

export default Contactfrom;