import React, { useState } from "react";
import "./OwnerEnquiry.css";
import ownerImg from "../../assets/agent2.webp";

const OwnerEnquiry = () => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="ownerEnquiry">
      <div className="ownerEnquiry-container">

        {/* LEFT SIDE */}
        <div className="ownerEnquiry-left">
          <h3 className="ownerEnquiry-title">Owner Details</h3>

          <div className="ownerEnquiry-profile">
            <img src={ownerImg} alt="owner" className="ownerEnquiry-img" />

            <div className="ownerEnquiry-info">
              <h4>Subahu Ramachandra Padhi</h4>
              <p className="ownerEnquiry-role">Owner</p>
              <p className="ownerEnquiry-sub">Subahu Ramachandra Padhi</p>
            </div>
          </div>

          <button
            className="ownerEnquiry-btn"
            onClick={() => setOpenPopup(true)}
          >
            View Phone Number
          </button>

          <div className="ownerEnquiry-stats">
            <span>Properties Listed: <b>1</b></span>
            <span>Verified Properties: <b>1</b></span>
          </div>

          <p className="ownerEnquiry-location">
            Localities : Satabdi Nagar
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="ownerEnquiry-right">

          <div className="ownerEnquiry-formBox">

            <h3 className="ownerEnquiry-title">Send enquiry to Owner</h3>

            <div className="ownerEnquiry-radio">
              <span>You are</span>
              <label><input type="radio" name="type" /> Individual</label>
              <label><input type="radio" name="type" /> Dealer</label>
            </div>

            <input type="text" placeholder="Name" className="ownerEnquiry-input" />

            <div className="ownerEnquiry-phone">
              <select className="ownerEnquiry-select">
                <option>IND (+91)</option>
              </select>
              <input type="text" placeholder="Phone Number" className="ownerEnquiry-input" />
            </div>

            <textarea
              placeholder="I am interested in this Property."
              className="ownerEnquiry-textarea"
            />

            <div className="ownerEnquiry-checkbox">
              <input type="checkbox" />
              <p>
                I agree to the <span>Terms & Conditions</span> and{" "}
                <span>Privacy Policy</span>
              </p>
            </div>

            <button className="ownerEnquiry-submit">
              Send Email & SMS
            </button>

          </div>

        </div>
      </div>

      {/* ================= OTP POPUP ================= */}
      <div className={`otpModal ${openPopup ? "show" : ""}`}>

        <div className="otpModal-overlay" onClick={() => setOpenPopup(false)} />

        <div className="otpModal-content">

          <p className="otpModal-title">Please verify your phone number.</p>

          <p className="otpModal-desc">
            Enter the 4-digit code sent to your mobile no.+91-8249914241
            <span> Change Number</span>
          </p>

          <div className="otpModal-row">
            <input
              type="text"
              placeholder="Enter OTP received"
              className="otpModal-input"
            />
            <button className="otpModal-verify">Verify</button>
            <span className="otpModal-resend">Resend Code</span>
          </div>

          <div className="otpModal-divider" />

          <p className="otpModal-help">
            Having trouble receiving SMS?
          </p>

          <p className="otpModal-sub">
            You can verify via a missed call from your number(+91-8249914241)
          </p>

          <button className="otpModal-call">
            Give missed call
          </button>

        </div>
      </div>
    </div>
  );
};

export default OwnerEnquiry;