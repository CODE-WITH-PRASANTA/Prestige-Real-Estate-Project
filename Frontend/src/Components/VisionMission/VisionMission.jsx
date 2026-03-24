import React, { useEffect, useRef } from "react";
import "./VisionMission.css";
import { FiTarget, FiEye, FiPhoneCall } from "react-icons/fi";

const VisionMission = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll(".vm-reveal");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vm-active");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="propertyVisionMission" ref={sectionRef}>
      <div className="propertyVisionMission__bgGlow propertyVisionMission__bgGlow--one"></div>
      <div className="propertyVisionMission__bgGlow propertyVisionMission__bgGlow--two"></div>

      <div className="propertyVisionMission__container">
        {/* LEFT IMAGE SECTION */}
        <div className="propertyVisionMission__imageSide vm-reveal vm-delay-1">
          <div className="propertyVisionMission__imageShape"></div>

          <div className="propertyVisionMission__imageWrap vm-reveal vm-delay-2">
            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1000&q=80"
              alt="Luxury Property"
              className="propertyVisionMission__mainImage"
            />
          </div>

          <div className="propertyVisionMission__floatingBadge propertyVisionMission__floatingBadge--top vm-reveal vm-delay-3">
            Premium Properties
          </div>

          <div className="propertyVisionMission__floatingBadge propertyVisionMission__floatingBadge--bottom vm-reveal vm-delay-4">
            Trusted Real Estate
          </div>

          <div className="propertyVisionMission__curveLine propertyVisionMission__curveLine--one"></div>
          <div className="propertyVisionMission__curveLine propertyVisionMission__curveLine--two"></div>
        </div>

        {/* RIGHT CONTENT SECTION */}
        <div className="propertyVisionMission__contentSide">
          <span className="propertyVisionMission__label vm-reveal vm-delay-1">
            Property Vision & Mission
          </span>

          <h2 className="propertyVisionMission__title vm-reveal vm-delay-2">
            Welcome To <span>Prestige Real Estate</span>
          </h2>

          <p className="propertyVisionMission__description vm-reveal vm-delay-3">
            We are committed to helping clients discover premium properties with
            trust, transparency, and confidence. Our focus is to provide
            high-quality real estate solutions that combine comfort, value, and
            long-term investment potential for every buyer and renter.
          </p>

          <div className="propertyVisionMission__cards">
            <div className="propertyVisionMission__infoCard propertyVisionMission__infoCard--mission vm-reveal vm-delay-4">
              <div className="propertyVisionMission__iconBox">
                <FiTarget />
              </div>
              <div className="propertyVisionMission__cardContent">
                <h3>Our Mission</h3>
                <p>
                  To connect people with the right properties through reliable
                  service, modern solutions, and a customer-first real estate
                  experience.
                </p>
              </div>
            </div>

            <div className="propertyVisionMission__infoCard propertyVisionMission__infoCard--vision vm-reveal vm-delay-4">
              <div className="propertyVisionMission__iconBox">
                <FiEye />
              </div>
              <div className="propertyVisionMission__cardContent">
                <h3>Our Vision</h3>
                <p>
                  To become a trusted leader in the property market by offering
                  premium spaces, innovative service, and lasting value for
                  every client.
                </p>
              </div>
            </div>
          </div>

          <div className="propertyVisionMission__bottomRow vm-reveal vm-delay-4">
            <div className="propertyVisionMission__founderBox">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Founder"
                className="propertyVisionMission__founderImage"
              />
              <div>
                <h4>Mr. Vishnu Sharma</h4>
                <p>Founder & Managing Director</p>
              </div>
            </div>

            <a
              href="tel:+917014627894"
              className="propertyVisionMission__callBox"
            >
              <div className="propertyVisionMission__callIcon">
                <FiPhoneCall />
              </div>
              <div>
                <span>Call Us Now</span>
                <strong>+91 7014627894</strong>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;