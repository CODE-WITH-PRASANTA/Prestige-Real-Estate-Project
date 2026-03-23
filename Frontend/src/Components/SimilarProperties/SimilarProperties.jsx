import React, { useState } from "react";
import "./SimilarProperties.css";

import img1 from "../../assets/house-1.webp";
import img2 from "../../assets/house-2.webp";
import img3 from "../../assets/house-3.webp";
import img4 from "../../assets/house-4.webp";
import img5 from "../../assets/home1.webp";

const data = [
  { id: 1, img: img1, price: "₹ 23,000, 3 BHK", title: "Opp Road Firstcry Preschool", location: "Gajapati Nagar, Bhubaneswar" },
  { id: 2, img: img2, price: "₹ 22,000, 3 BHK", title: "Bhaktamadhu Nagar", location: "Jagamara, Bhubaneswar" },
  { id: 3, img: img3, price: "₹ 24,000, 3 BHK", title: "Front Home 17", location: "Panchasakha Nagar, Bhubaneswar" },
  { id: 4, img: img4, price: "₹ 25,000, 3 BHK", title: "Sriram Vihar Apartments", location: "Nayapalli, Bhubaneswar" },
  { id: 5, img: img5, price: "₹ 20,000, 3 BHK", title: "Apartment", location: "Jagmohan Nagar, Bhubaneswar" },
  { id: 6, img: img1, price: "₹ 27,000, 3 BHK", title: "Gymkhana Palace", location: "Khandagiri, Bhubaneswar" },
  { id: 7, img: img2, price: "₹ 21,000, 2 BHK", title: "Green Residency", location: "Patia, Bhubaneswar" },
  { id: 8, img: img3, price: "₹ 19,000, 2 BHK", title: "Lake View Homes", location: "Chandrasekharpur" },
];

// duplicate for infinite loop
const loopData = [...data, ...data];

const SimilarProperties = () => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="similarProperties">

      <h2 className="similarProperties-title">Similar Properties</h2>

      {/* SLIDER */}
      <div className="similarProperties-slider">
        <div className="similarProperties-track">

          {loopData.map((item, index) => (
            <div className="similarProperties-card" key={index}>

              <div className="similarProperties-imageWrap">
                <img src={item.img} alt="" />
              </div>

              <div className="similarProperties-content">
                <h4>{item.price}</h4>
                <p className="title">{item.title}</p>
                <p className="location">{item.location}</p>

                <span
                  className="enquire"
                  onClick={() => setOpenPopup(true)}
                >
                  Enquire Now
                </span>
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* POPUP */}
      <div className={`similarProperties-modal ${openPopup ? "show" : ""}`}>

        <div
          className="similarProperties-overlay"
          onClick={() => setOpenPopup(false)}
        />

        <div className="similarProperties-modalContent">

          {/* HEADER */}
          <div className="sp-header">
            <h4>You are requesting to view advertiser details.</h4>
            <span onClick={() => setOpenPopup(false)}>✕</span>
          </div>

          {/* TOP INFO */}
          <div className="sp-top">
            <div>
              <p className="label">POSTED BY OWNER:</p>
              <h4>+91 98****543**</h4>
              <span>DEBA PRASAD PANDA</span>
            </div>

            <div>
              <p className="label">POSTED ON 11TH MAR, 2026:</p>
              <h4>₹22,000 | Bhaktamadhu Nagar</h4>
              <span>2400 SQ.FT. | 3 BHK RESIDENTIAL APARTMENT</span>
            </div>
          </div>

          {/* BODY */}
          <div className="sp-body">

            <h4>Please verify your phone number.</h4>

            <p className="sp-desc">
              Enter the 4-digit code sent to your mobile no.+91-8249914241
              <span> Change Number</span>
            </p>

            <div className="sp-row">
              <input placeholder="Enter OTP received" />
              <button>Verify</button>
              <span className="resend">Resend Code</span>
            </div>

            <div className="sp-divider"></div>

            <p className="sp-help">Having trouble receiving SMS?</p>
            <p className="sp-sub">
              You can verify via a missed call from your number(+91-8249914241)
            </p>

            <button className="sp-call">Give missed call</button>

          </div>

        </div>
      </div>

    </div>
  );
};

export default SimilarProperties;