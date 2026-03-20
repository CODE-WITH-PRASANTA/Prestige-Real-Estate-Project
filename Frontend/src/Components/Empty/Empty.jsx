import React, { useMemo, useState } from "react";
import "./Empty.css";
import {
  FaInfoCircle,
  FaRegCalendarAlt,
  FaFacebookF,
  FaInstagram,
  FaBehance,
  FaTwitter,
  FaPinterestP,
  FaLinkedinIn,
  FaStar,
  FaWhatsapp,
  FaComments,
  FaCheckCircle,
  FaExternalLinkAlt,
} from "react-icons/fa";

const Empty = () => {
  const base = "emptyProperty";
  const [activeTab, setActiveTab] = useState("request");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
  });

  const [mortgage, setMortgage] = useState({
    totalAmount: 15000,
    downPayment: 10000,
    loanYears: 3,
    interestRate: 15,
    minSqft: "",
  });

  const agentImage =
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80";

  const ownerImage =
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80";

  const mapImage =
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";

  const mortgageSummary = useMemo(() => {
    const principal =
      Number(mortgage.totalAmount || 0) - Number(mortgage.downPayment || 0);

    const months = Number(mortgage.loanYears || 0) * 12;
    const monthlyRate = Number(mortgage.interestRate || 0) / 100 / 12;

    if (!principal || !months || !monthlyRate) {
      return {
        principal: principal || 0,
        emi: 0,
        totalPayable: 0,
      };
    }

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayable = emi * months;

    return {
      principal,
      emi,
      totalPayable,
    };
  }, [mortgage]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMortgageChange = (e) => {
    const { name, value } = e.target;
    setMortgage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <div className={base}>
      <div className={`${base}__container`}>
        <div className={`${base}__stack`}>
          {/* ENQUIRY CARD */}
          <div className={`${base}__card`}>
            <div className={`${base}__cardHeader`}>
              <h2>Enquiry</h2>
            </div>

            <div className={`${base}__tabWrap`}>
              <button
                type="button"
                className={`${base}__tabBtn ${
                  activeTab === "request" ? `${base}__tabBtn--active` : ""
                }`}
                onClick={() => setActiveTab("request")}
              >
                <FaInfoCircle />
                Request Info
              </button>

              <button
                type="button"
                className={`${base}__tabBtn ${
                  activeTab === "visit" ? `${base}__tabBtn--dark` : ""
                }`}
                onClick={() => setActiveTab("visit")}
              >
                <FaRegCalendarAlt />
                Schedule a Visit
              </button>
            </div>

            <div className={`${base}__agentCard`}>
              <img src={agentImage} alt="Agent" />
              <div>
                <h3>Adrian Hendriques</h3>
                <p>Company Agent</p>
              </div>
            </div>

            <form className={`${base}__form`} onSubmit={handleSubmit}>
              <div className={`${base}__field`}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleFormChange}
                />
              </div>

              <div className={`${base}__field`}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>

              <div className={`${base}__field`}>
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={handleFormChange}
                />
              </div>

              <div className={`${base}__field`}>
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Write your message..."
                  rows="5"
                  value={formData.description}
                  onChange={handleFormChange}
                />
              </div>

              <button type="submit" className={`${base}__submitBtn`}>
                Submit
              </button>
            </form>
          </div>

          {/* OWNER DETAILS */}
          <div className={`${base}__card`}>
            <div className={`${base}__cardHeader`}>
              <h2>Listing Owner Details</h2>
            </div>

            <div className={`${base}__ownerTop`}>
              <img src={ownerImage} alt="Owner" />
              <div>
                <h3>John Carter</h3>
                <div className={`${base}__rating`}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                  <span>5.0 (12 Reviews)</span>
                </div>
              </div>
            </div>

            <div className={`${base}__detailsTable`}>
              <div className={`${base}__detailsRow`}>
                <span>Phone</span>
                <strong>Call Us : +1 12545 45548</strong>
              </div>
              <div className={`${base}__detailsRow`}>
                <span>Email</span>
                <strong>info@example.com</strong>
              </div>
              <div className={`${base}__detailsRow`}>
                <span>No of Listings</span>
                <strong>05</strong>
              </div>
              <div className={`${base}__detailsRow`}>
                <span>No of Bookings</span>
                <strong>225</strong>
              </div>
              <div className={`${base}__detailsRow`}>
                <span>Member on</span>
                <strong>15 Jan 2014</strong>
              </div>
              <div className={`${base}__detailsRow`}>
                <span>Verification</span>
                <strong className={`${base}__verified`}>Verified</strong>
              </div>
            </div>

            <div className={`${base}__actionButtons`}>
              <button type="button" className={`${base}__whatsappBtn`}>
                <FaWhatsapp />
                Whatsapp
              </button>
              <button type="button" className={`${base}__chatBtn`}>
                <FaComments />
                Chat Now
              </button>
            </div>
          </div>

          {/* SHARE PROPERTY */}
          <div className={`${base}__card`}>
            <div className={`${base}__cardHeader`}>
              <h2>Share Property</h2>
            </div>

            <div className={`${base}__socialWrap`}>
              <a href="/" onClick={(e) => e.preventDefault()}>
                <FaFacebookF />
              </a>
              <a href="/" onClick={(e) => e.preventDefault()}>
                <FaInstagram />
              </a>
              <a href="/" onClick={(e) => e.preventDefault()}>
                <FaBehance />
              </a>
              <a href="/" onClick={(e) => e.preventDefault()}>
                <FaTwitter />
              </a>
              <a href="/" onClick={(e) => e.preventDefault()}>
                <FaPinterestP />
              </a>
              <a href="/" onClick={(e) => e.preventDefault()}>
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* MORTGAGE */}
          <div className={`${base}__card`}>
            <div className={`${base}__cardHeader`}>
              <h2>Mortarage Calculator</h2>
            </div>

            <div className={`${base}__form`}>
              <div className={`${base}__field`}>
                <label>Total Amount ($)</label>
                <input
                  type="number"
                  name="totalAmount"
                  value={mortgage.totalAmount}
                  onChange={handleMortgageChange}
                />
              </div>

              <div className={`${base}__field`}>
                <label>Down Payment ($)</label>
                <input
                  type="number"
                  name="downPayment"
                  value={mortgage.downPayment}
                  onChange={handleMortgageChange}
                />
              </div>

              <div className={`${base}__field`}>
                <label>Loan Terms (Years)</label>
                <input
                  type="number"
                  name="loanYears"
                  value={mortgage.loanYears}
                  onChange={handleMortgageChange}
                />
              </div>

              <div className={`${base}__field`}>
                <label>Interest Rate (%)</label>
                <input
                  type="number"
                  name="interestRate"
                  value={mortgage.interestRate}
                  onChange={handleMortgageChange}
                />
              </div>

              <div className={`${base}__field`}>
                <label>Min Sqft</label>
                <input
                  type="text"
                  name="minSqft"
                  placeholder="Enter minimum sqft"
                  value={mortgage.minSqft}
                  onChange={handleMortgageChange}
                />
              </div>
            </div>

            <div className={`${base}__mortgageSummary`}>
              <div className={`${base}__summaryBox`}>
                <span>Loan Amount</span>
                <strong>${mortgageSummary.principal.toFixed(2)}</strong>
              </div>
              <div className={`${base}__summaryBox`}>
                <span>Monthly EMI</span>
                <strong>${mortgageSummary.emi.toFixed(2)}</strong>
              </div>
              <div className={`${base}__summaryBox`}>
                <span>Total Payable</span>
                <strong>${mortgageSummary.totalPayable.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          {/* MAP */}
          <div className={`${base}__card`}>
            <div className={`${base}__mapBox`}>
              <img src={mapImage} alt="Map" />
              <button type="button" className={`${base}__mapBtn`}>
                Maps <FaExternalLinkAlt />
              </button>
            </div>

            <div className={`${base}__landmarkWrap`}>
              <h2>Nearby Landmarks & Visits</h2>

              <ul className={`${base}__landmarkList`}>
                <li>
                  <FaCheckCircle />
                  Near By Statue of Liberty
                </li>
                <li>
                  <FaCheckCircle />
                  The Metropolitan Museum of Art
                </li>
                <li>
                  <FaCheckCircle />
                  Yellowstone National Park
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Empty;