import React, { useEffect, useState } from "react";
import API from "../../api/axios"; // ✅ use existing API
import "./FloatingForm.css";

const FloatingForm = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    propertyType: "",
    budget: "",
    city: "",
    message: "",
  });

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsMounted(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 30);
    }, 500);

    return () => clearTimeout(openTimer);
  }, []);

  const FloatingFormHandleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsMounted(false);
    }, 350);
  };

  const FloatingFormHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ CONNECTED SUBMIT
  const FloatingFormHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post("/enquiries", {
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        type: formData.propertyType,
        budget: formData.budget,
        city: formData.city,
        message: formData.message,
      });

      alert("✅ Enquiry submitted successfully!");

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        propertyType: "",
        budget: "",
        city: "",
        message: "",
      });

      FloatingFormHandleClose();
    } catch (err) {
      console.log("Submit Error:", err);
      alert("❌ Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null;

  return (
    <div
      className={`FloatingForm ${
        isVisible ? "FloatingForm--show" : "FloatingForm--hide"
      }`}
    >
      <div
        className="FloatingForm__overlay"
        onClick={FloatingFormHandleClose}
      ></div>

      <div className="FloatingForm__card">
        <button
          className="FloatingForm__closeButton"
          onClick={FloatingFormHandleClose}
          type="button"
          aria-label="Close form"
        >
          ×
        </button>

        <div className="FloatingForm__left">
          <span className="FloatingForm__badge">Prestige Real Estate</span>
          <h2 className="FloatingForm__title">
            Find Your Dream Property Today
          </h2>
          <p className="FloatingForm__subtitle">
            Tell us what you are looking for and our expert team will help you
            discover the best property options for your budget and location.
          </p>

          <div className="FloatingForm__points">
            <div className="FloatingForm__point">
              <span className="FloatingForm__pointIcon">✓</span>
              <span>Verified property suggestions</span>
            </div>

            <div className="FloatingForm__point">
              <span className="FloatingForm__pointIcon">✓</span>
              <span>Quick callback from our team</span>
            </div>

            <div className="FloatingForm__point">
              <span className="FloatingForm__pointIcon">✓</span>
              <span>Buy, sell, or rent with confidence</span>
            </div>
          </div>
        </div>

        <div className="FloatingForm__right">
          <form
            className="FloatingForm__form"
            onSubmit={FloatingFormHandleSubmit}
          >
            <h3 className="FloatingForm__formTitle">
              Request a Free Consultation
            </h3>

            <div className="FloatingForm__formGrid">
              <div className="FloatingForm__field">
                <label className="FloatingForm__label">Full Name</label>
                <input
                  className="FloatingForm__input"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={FloatingFormHandleChange}
                  required
                />
              </div>

              <div className="FloatingForm__field">
                <label className="FloatingForm__label">Phone Number</label>
                <input
                  className="FloatingForm__input"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={FloatingFormHandleChange}
                  required
                />
              </div>

              <div className="FloatingForm__field">
                <label className="FloatingForm__label">Email Address</label>
                <input
                  className="FloatingForm__input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={FloatingFormHandleChange}
                  required
                />
              </div>

              <div className="FloatingForm__field">
                <label className="FloatingForm__label">Property Type</label>
                <select
                  className="FloatingForm__input"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={FloatingFormHandleChange}
                  required
                >
                  <option value="">Select property type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="House">House</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Plot">Plot</option>
                  <option value="Rental">Rental Property</option>
                </select>
              </div>

              <div className="FloatingForm__field">
                <label className="FloatingForm__label">Budget</label>
                <select
                  className="FloatingForm__input"
                  name="budget"
                  value={formData.budget}
                  onChange={FloatingFormHandleChange}
                  required
                >
                  <option value="">Select budget</option>
                  <option value="Under 25 Lakhs">Under 25 Lakhs</option>
                  <option value="25 - 50 Lakhs">25 - 50 Lakhs</option>
                  <option value="50 Lakhs - 1 Cr">50 Lakhs - 1 Cr</option>
                  <option value="1 Cr - 2 Cr">1 Cr - 2 Cr</option>
                  <option value="Above 2 Cr">Above 2 Cr</option>
                </select>
              </div>

              <div className="FloatingForm__field">
                <label className="FloatingForm__label">Preferred City</label>
                <input
                  className="FloatingForm__input"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={FloatingFormHandleChange}
                  required
                />
              </div>
            </div>

            <div className="FloatingForm__field FloatingForm__field--full">
              <label className="FloatingForm__label">Message</label>
              <textarea
                className="FloatingForm__textarea"
                name="message"
                value={formData.message}
                onChange={FloatingFormHandleChange}
              ></textarea>
            </div>

            <button
              className="FloatingForm__submitButton"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Enquiry"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FloatingForm;