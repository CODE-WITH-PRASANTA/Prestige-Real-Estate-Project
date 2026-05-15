import React, {
  useState,
} from "react";

import "./RentStickyInquirySidebar.css";

import API from "../../api/axios";

const RentStickyInquirySidebar = ({
  property,
}) => {

  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      email: "",
      message: "",
    });

  const [loading, setLoading] =
    useState(false);

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  // ================= SUBMIT =================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await API.post(
          "/rent-inquiries",
          {
            ...formData,

            propertyId:
              property?._id,

            propertyTitle:
              property?.title,

            location:
              property?.location,
          }
        );

        alert(
          "Inquiry Sent Successfully ✅"
        );

        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });

      } catch (err) {

        console.error(err);

        alert(
          "Failed To Send Inquiry ❌"
        );

      } finally {

        setLoading(false);

      }
    };

  // ================= WHATSAPP =================

  const openWhatsapp = () => {

    const phone =
      "919595422040";

    const text =
      `Hello, I am interested in ${property?.title}`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(
        text
      )}`,
      "_blank"
    );
  };

  return (

    <form
      className="rent-inquiry-card"
      onSubmit={handleSubmit}
    >

     <h2 className="rent-property-title">
        {property?.title}
      </h2>

      {/* NAME */}

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      {/* PHONE */}

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
      />

      {/* EMAIL */}

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* MESSAGE */}

      <textarea
        name="message"
        placeholder="Message"
        rows="5"
        value={formData.message}
        onChange={handleChange}
      />

      {/* SUBMIT */}

      <button
        type="submit"
        disabled={loading}
      >

        {loading
          ? "Sending..."
          : "Send Inquiry"}

      </button>

      {/* WHATSAPP */}

      <button
        type="button"
        className="whatsapp-btn"
        onClick={openWhatsapp}
      >
        WhatsApp
      </button>

    </form>
  );
};

export default
RentStickyInquirySidebar;