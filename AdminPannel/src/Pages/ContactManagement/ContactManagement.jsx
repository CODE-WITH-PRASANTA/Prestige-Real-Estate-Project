import React, { useEffect, useState } from "react";
import "./ContactManagement.css";

import {
  API,
  IMG_URL,
} from "../../api/axios";

import {
  getContact,
  saveContact,
} from "../../services/contactService";

const ContactManagement = () => {

  const [data, setData] = useState({
    email1: "",
    email2: "",
    phone1: "",
    phone2: "",
    address: "",
    city: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ FETCH CONTACT
  const fetchContact = async () => {
    try {

      const res = await getContact();

      if (res.data) {
        setData(res.data);
      }

    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Failed to load contact data");
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  };

  // ✅ SAVE CONTACT
  const handleSave = async () => {

    try {

      setLoading(true);

      await saveContact(data);

      alert("Contact updated successfully!");

      fetchContact();

    } catch (err) {

      console.error("Save Error:", err);

      alert("Failed to save contact");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="ca__container">

      <h2 className="ca__title">
        Contact Management
      </h2>

      {/* ✅ PREVIEW */}
      <div className="ca__cards">

        <div className="ca__card">
          <div className="ca__icon">📧</div>

          <h3>Email Address</h3>

          <p>{data.email1 || "-"}</p>
          <p>{data.email2 || "-"}</p>
        </div>

        <div className="ca__card">
          <div className="ca__icon">📞</div>

          <h3>Phone Number</h3>

          <p>{data.phone1 || "-"}</p>
          <p>{data.phone2 || "-"}</p>
        </div>

        <div className="ca__card">
          <div className="ca__icon">📍</div>

          <h3>Office Address</h3>

          <p>{data.address || "-"}</p>

          <p>
            {data.city || "-"}, {data.country || "-"}
          </p>
        </div>

      </div>

      {/* ✅ FORM */}
      <div className="ca__form">

        <h3>Edit Contact Details</h3>

        <div className="ca__grid">

          {/* EMAIL */}

          <div className="ca__field">
            <label>Primary Email</label>

            <input
              type="email"
              name="email1"
              value={data.email1}
              onChange={handleChange}
              placeholder="Enter primary email"
            />
          </div>

          <div className="ca__field">
            <label>Secondary Email</label>

            <input
              type="email"
              name="email2"
              value={data.email2}
              onChange={handleChange}
              placeholder="Enter secondary email"
            />
          </div>

          {/* PHONE */}

          <div className="ca__field">
            <label>Primary Phone</label>

            <input
              type="text"
              name="phone1"
              value={data.phone1}
              onChange={handleChange}
              placeholder="Enter primary phone"
            />
          </div>

          <div className="ca__field">
            <label>Secondary Phone</label>

            <input
              type="text"
              name="phone2"
              value={data.phone2}
              onChange={handleChange}
              placeholder="Enter secondary phone"
            />
          </div>

          {/* ADDRESS */}

          <div className="ca__field">
            <label>Address</label>

            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </div>

          <div className="ca__field">
            <label>City</label>

            <input
              type="text"
              name="city"
              value={data.city}
              onChange={handleChange}
              placeholder="Enter city"
            />
          </div>

          <div className="ca__field">
            <label>Country</label>

            <input
              type="text"
              name="country"
              value={data.country}
              onChange={handleChange}
              placeholder="Enter country"
            />
          </div>

        </div>

        {/* SAVE BUTTON */}

        <button
          className="ca__btn"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>

    </div>
  );
};

export default ContactManagement;