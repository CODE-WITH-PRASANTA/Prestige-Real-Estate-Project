import React from "react";
import "./GetInTouch.css";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";

const GetInTouch = () => {
  return (
    <section className="GetInTouch">

      <div className="GetInTouch-container">

        {/* LEFT */}
        <div className="GetInTouch-left">

          <h2>Get in Touch</h2>

          <p className="GetInTouch-desc">
            Sed ut <b>perspiciatis unde omnis</b> iste natus error sit voluptatem accusantium doloremque laudantium,
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            <b> Nemo enim ipsam voluptatem quia voluptas</b> sit aspernatur aut odit aut fugit.
          </p>

          {/* CONTACT INFO */}
          <div className="GetInTouch-info">

            <div className="GetInTouch-item">
              <FiPhone />
              <span>(+04) 743 323 424</span>
            </div>

            <div className="GetInTouch-item">
              <FiMail />
              <span>contact@urban.com</span>
            </div>

            <div className="GetInTouch-item">
              <FiMapPin />
              <span>Collins Street West Victoria</span>
            </div>

            <div className="GetInTouch-item">
              <FiClock />
              <span>Mon-Sat: 9:00 - 18:00</span>
            </div>

          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="GetInTouch-right">

          <form className="GetInTouch-form">

            <div className="GetInTouch-grid">

              <div className="GetInTouch-field">
                <label>First Name</label>
                <input type="text" />
              </div>

              <div className="GetInTouch-field">
                <label>Subject</label>
                <input type="text" />
              </div>

              <div className="GetInTouch-field">
                <label>Email Address</label>
                <input type="email" />
              </div>

              <div className="GetInTouch-field">
                <label>Last Name</label>
                <input type="text" />
              </div>

            </div>

            <div className="GetInTouch-field full">
              <label>Message</label>
              <textarea rows="5"></textarea>
            </div>

            <button className="GetInTouch-btn">
              Send Message →
            </button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default GetInTouch;