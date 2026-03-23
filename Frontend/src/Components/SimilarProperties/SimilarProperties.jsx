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
  { id: 9, img: img4, price: "₹ 30,000, 4 BHK", title: "Luxury Villa", location: "Saheed Nagar" },
  { id: 10, img: img5, price: "₹ 18,000, 2 BHK", title: "Budget Flat", location: "Baramunda" },
];

const SimilarProperties = () => {
  const [page, setPage] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);

  const cardsPerPage = 5;
  const totalPages = Math.ceil(data.length / cardsPerPage);

  const start = page * cardsPerPage;
  const visibleCards = data.slice(start, start + cardsPerPage);

  return (
    <div className="similarProperties">
      <h2 className="similarProperties-title">Similar Properties</h2>

      <div className="similarProperties-wrapper">
        <div className="similarProperties-grid">
          {visibleCards.map((item) => (
            <div className="similarProperties-card" key={item.id}>
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

      {/* PAGINATION */}
      <div className="similarProperties-pagination">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={page === i ? "active" : ""}
            onClick={() => setPage(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* POPUP */}
      <div className={`similarProperties-modal ${openPopup ? "show" : ""}`}>
        <div
          className="similarProperties-overlay"
          onClick={() => setOpenPopup(false)}
        />

        <div className="similarProperties-modalContent">
          <div className="similarProperties-header">
            <h4>You are requesting to view advertiser details.</h4>
            <span onClick={() => setOpenPopup(false)}>✕</span>
          </div>

          <div className="similarProperties-box">
            <p className="similarProperties-verifyTitle">
              Please verify your phone number.
            </p>

            <p className="similarProperties-desc">
              Enter the 4-digit code sent to your mobile no.+91-8249914241
              <span> Change Number</span>
            </p>

            <div className="similarProperties-row">
              <input placeholder="Enter OTP received" />
              <button>Verify</button>
              <span className="resend">Resend Code</span>
            </div>

            <div className="similarProperties-divider" />

            <p className="similarProperties-help">
              Having trouble receiving SMS?
            </p>

            <p className="similarProperties-sub">
              You can verify via a missed call from your number(+91-8249914241)
            </p>

            <button className="similarProperties-call">
              Give missed call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimilarProperties;