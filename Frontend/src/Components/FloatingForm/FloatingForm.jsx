import React, { useEffect, useState } from "react";
import API from "../../api/axios";
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

  /* ================= ANIMATION ================= */
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
    }, 300);
  };

  /* ================= INPUT ================= */
  const FloatingFormHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= SUBMIT ================= */
  const FloatingFormHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      /* VALIDATION */
      if (!formData.fullName.trim()) {
        alert("Full name is required");
        return;
      }

      if (!formData.phone.trim()) {
        alert("Phone number is required");
        return;
      }

      setLoading(true);

      const payload = {
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        type: formData.propertyType,
        budget: formData.budget,
        city: formData.city,
        message: formData.message,
      };

      /* ✅ SINGLE BACKEND API CALL */
      await API.post("/enquiries", payload);

      alert("✅ Enquiry submitted successfully!");

      /* RESET FORM */
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
    } catch (error) {
      console.error("Submit Error:", error);

      if (error.code === "ERR_NETWORK") {
        alert("❌ Backend not running on http://localhost:5000");
      } else {
        alert(
          error?.response?.data?.message ||
            "❌ Failed to submit enquiry"
        );
      }
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
        {/* CLOSE BUTTON */}
        <button
          className="FloatingForm__closeButton"
          onClick={FloatingFormHandleClose}
          type="button"
          disabled={loading}
        >
          ×
        </button>

        {/* LEFT SIDE */}
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
              <span>✓</span>
              <span>Verified property suggestions</span>
            </div>

            <div className="FloatingForm__point">
              <span>✓</span>
              <span>Quick callback from our team</span>
            </div>

            <div className="FloatingForm__point">
              <span>✓</span>
              <span>Buy, sell, or rent with confidence</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
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
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={FloatingFormHandleChange}
                  required
                />
              </div>

              <div className="FloatingForm__field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={FloatingFormHandleChange}
                  required
                />
              </div>

              <div className="FloatingForm__field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={FloatingFormHandleChange}
                />
              </div>

              <div className="FloatingForm__field">
                <label>Property Type</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={FloatingFormHandleChange}
                >
                  <option value="">Select</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="House">House</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Plot">Plot</option>
                  <option value="Rental">Rental</option>
                </select>
              </div>

              <div className="FloatingForm__field">
                <label>Budget</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={FloatingFormHandleChange}
                >
                  <option value="">Select</option>
                  <option value="Under 25 Lakhs">Under 25 Lakhs</option>
                  <option value="25 - 50 Lakhs">25 - 50 Lakhs</option>
                  <option value="50 Lakhs - 1 Cr">50 Lakhs - 1 Cr</option>
                  <option value="1 Cr - 2 Cr">1 Cr - 2 Cr</option>
                  <option value="Above 2 Cr">Above 2 Cr</option>
                </select>
              </div>

              <div className="FloatingForm__field">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={FloatingFormHandleChange}
                />
              </div>
            </div>

            <div className="FloatingForm__field">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={FloatingFormHandleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="FloatingForm__submitButton"
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