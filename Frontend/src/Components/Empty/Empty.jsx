import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
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

import logo from "../../assets/Main-Logo.png"

const Empty = () => {
  const base = "emptyProperty";
  // const [activeTab, setActiveTab] = useState("request");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    createdAt: new Date().toLocaleDateString(),
  });

const [mortgage, setMortgage] = useState({
  totalAmount: "",
  downPayment: "",
  loanYears: "",
  interestRate: "",
  minSqft: "",
});

  const { id } = useParams();

  // const agentImage =
  //   "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80";

  // const ownerImage =
  //   "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80";

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

  // const handleMortgageChange = (e) => {
  //   const { name, value } = e.target;
  //   setMortgage((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.description,
      createdAt: formData.createdAt,
    };

    const res = await API.post(
      "/property-inquiries",
      payload
    );

    if (res.data.success) {

      alert("Enquiry Submitted Successfully ✅");

      // RESET FORM
      setFormData({
        name: "",
        email: "",
        phone: "",
        description: "",
        createdAt: new Date().toLocaleDateString(),
      });

    }

  } catch (error) {
    console.error("Enquiry Submit Error:", error);

    alert("Something went wrong ❌");
  }
};

  

  useEffect(() => {
  const fetchProperty = async () => {
    try {
      const res = await API.get(`/property/${id}`);

      const property = res.data.data;

      // ✅ FETCH DATA FROM BACKEND
      setMortgage({
        totalAmount: property?.price || "",
        downPayment: property?.downPayment || "",
        loanYears: property?.loanTerms || "",
        interestRate: property?.interestRate || "",
        minSqft: property?.sqft || "",
      });

    } catch (error) {
      console.error("Mortgage Fetch Error:", error);
    }
  };

  fetchProperty();
}, [id]);

  return (
    <div className={base}>
      <div className={`${base}__container`}>
        <div className={`${base}__stack`}>

          {/* ENQUIRY CARD */}
          
<div className={`${base}__card`}>

  <div className={`${base}__cardHeader`}>
    <h2>Request Information</h2>
  </div>

  {/* AGENT */}
  <div className={`${base}__agentCard`}>
    <img src={logo} alt="Agent" />

    <div>
      <h3>Dayanand Baburow Yadav</h3>
      <p>Company Agent</p>
    </div>
  </div>

  {/* FORM */}
  <form
    className={`${base}__form`}
    onSubmit={handleSubmit}
  >

    {/* NAME */}
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

    {/* EMAIL */}
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

    {/* PHONE */}
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

    {/* MESSAGE */}
    <div className={`${base}__field`}>
      <label>Message</label>

      <textarea
        name="description"
        placeholder="Write your message..."
        rows="5"
        value={formData.description}
        onChange={handleFormChange}
      />
    </div>

    {/* CREATED DATE */}
<div className={`${base}__field`}>
  <label>Created Date</label>

  <input
    type="text"
    name="createdAt"
    value={formData.createdAt}
    readOnly
  />
</div>

    {/* BUTTON */}
    <button
      type="submit"
      className={`${base}__submitBtn`}
    >
      Send Enquiry
    </button>

  </form>
</div>

          {/* OWNER DETAILS */}
          <div className={`${base}__card`}>
            <div className={`${base}__cardHeader`}>
              <h2>Listing Owner Details</h2>
            </div>

            <div className={`${base}__ownerTop`}>
              <img src={logo} alt="Owner" />
              <div>
                <h3>Dayanand Baburow Yadav</h3>
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
                <strong>Call Us : +91 9595422040</strong>
              </div>
              <div className={`${base}__detailsRow`}>
                <span>Email</span>
                <strong>Dayanand.prestige@gmail.com</strong>
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

  {/* WHATSAPP */}
  <a
    href="https://wa.me/919595422040?text=Hello%20I%20am%20interested%20in%20this%20property"
    target="_blank"
    rel="noopener noreferrer"
    className={`${base}__whatsappBtn`}
  >
    <FaWhatsapp />
    WhatsApp
  </a>

  {/* CALL BUTTON */}
  <a
    href="tel:+919595422040"
    className={`${base}__chatBtn`}
  >
    <FaComments />
    Call Now
  </a>

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
    <h2>Mortgage Calculator</h2>
  </div>

  <div className={`${base}__form`}>

    {/* TOTAL */}
    {/* TOTAL */}
<div className={`${base}__field`}>
  <label>Total Amount ($)</label>

  <input
    type="number"
    value={mortgage.totalAmount}
    readOnly
  />
</div>

{/* DOWN PAYMENT */}
<div className={`${base}__field`}>
  <label>Down Payment ($)</label>

  <input
    type="number"
    value={mortgage.downPayment}
    readOnly
  />
</div>

{/* LOAN YEARS */}
<div className={`${base}__field`}>
  <label>Loan Terms (Years)</label>

  <input
    type="number"
    value={mortgage.loanYears}
    readOnly
  />
</div>

{/* INTEREST */}
<div className={`${base}__field`}>
  <label>Interest Rate (%)</label>

  <input
    type="number"
    value={mortgage.interestRate}
    readOnly
  />
</div>

{/* SQFT */}
<div className={`${base}__field`}>
  <label>Min Sqft</label>

  <input
    type="text"
    value={mortgage.minSqft}
    readOnly
  />
</div>

  </div>

  {/* SUMMARY */}
  <div className={`${base}__mortgageSummary`}>

    <div className={`${base}__summaryBox`}>
      <span>Loan Amount</span>

      <strong>
        ₹ {mortgageSummary.principal.toFixed(2)}
      </strong>
    </div>

    <div className={`${base}__summaryBox`}>
      <span>Monthly EMI</span>

      <strong>
        ₹ {mortgageSummary.emi.toFixed(2)}
      </strong>
    </div>

    <div className={`${base}__summaryBox`}>
      <span>Total Payable</span>

      <strong>
        ₹ {mortgageSummary.totalPayable.toFixed(2)}
      </strong>
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
