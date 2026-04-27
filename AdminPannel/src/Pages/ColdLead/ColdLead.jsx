import React, { useState } from "react";
import "./ColdLead.css";
import { createColdLead } from "../../services/coldLeadService";

const ColdLeadForm = () => {
  const base = "coldlead";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    property: "",
    budget: "",
    city: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!form.name.trim()) {
        return alert("Name is required");
      }

      if (!form.phone.trim()) {
        return alert("Phone number is required");
      }

      setLoading(true);

      await createColdLead(form);

      alert("Cold lead submitted successfully");

      setForm({
        name: "",
        phone: "",
        email: "",
        property: "",
        budget: "",
        city: "",
        message: "",
      });
    } catch (error) {
      console.error("Submit error:", error);
      alert(
        error?.response?.data?.message || "Failed to submit cold lead"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={base}>
      <div className={`${base}__left`}>
        <div className={`${base}__card`}>
          <h2>Request a Free Consultation</h2>

          <div className={`${base}__row`}>
            <div className={`${base}__field`}>
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className={`${base}__field`}>
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={`${base}__row`}>
            <div className={`${base}__field`}>
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className={`${base}__field`}>
              <label>Property Type</label>
              <select
                name="property"
                value={form.property}
                onChange={handleChange}
              >
                <option value="">Select property type</option>
                <option value="Flat">Flat</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Plot">Plot</option>
              </select>
            </div>
          </div>

          <div className={`${base}__row`}>
            <div className={`${base}__field`}>
              <label>Budget</label>
              <select
                name="budget"
                value={form.budget}
                onChange={handleChange}
              >
                <option value="">Select budget</option>
                <option value="5L - 10L">5L - 10L</option>
                <option value="10L - 20L">10L - 20L</option>
                <option value="20L - 40L">20L - 40L</option>
                <option value="40L+">40L+</option>
              </select>
            </div>

            <div className={`${base}__field`}>
              <label>Preferred City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter preferred city"
                value={form.city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={`${base}__field`}>
            <label>Message</label>
            <textarea
              name="message"
              placeholder="Tell us your requirements..."
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <button
            className={`${base}__submit`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColdLeadForm;