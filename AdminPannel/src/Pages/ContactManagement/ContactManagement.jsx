import React, { useState } from "react";
import "./ContactManagement.css";

const ContactManagement = () => {
  const [data, setData] = useState({
    email1: "info@webmail.com",
    email2: "jobs@webexample.com",
    phone1: "+0123-456789",
    phone2: "+987-654321",
    address: "18/A, New Born Town Hall",
    city: "New York",
    country: "US",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log(data);
    alert("Contact info updated successfully!");
  };

  return (
    <div className="ca__container">
      <h2 className="ca__title">Contact Management</h2>

      {/* 🔥 PREVIEW */}
      <div className="ca__cards">
        <div className="ca__card">
          <div className="ca__icon">📧</div>
          <h3>Email Address</h3>
          <p>{data.email1}</p>
          <p>{data.email2}</p>
        </div>

        <div className="ca__card">
          <div className="ca__icon">📞</div>
          <h3>Phone Number</h3>
          <p>{data.phone1}</p>
          <p>{data.phone2}</p>
        </div>

        <div className="ca__card">
          <div className="ca__icon">📍</div>
          <h3>Office Address</h3>
          <p>{data.address}</p>
          <p>{data.city}, {data.country}</p>
        </div>
      </div>

      {/* ✏️ FORM */}
      <div className="ca__form">
        <h3>Edit Contact Details</h3>

        <div className="ca__grid">
          <input name="email1" value={data.email1} onChange={handleChange} placeholder="Primary Email" />
          <input name="email2" value={data.email2} onChange={handleChange} placeholder="Secondary Email" />

          <input name="phone1" value={data.phone1} onChange={handleChange} placeholder="Primary Phone" />
          <input name="phone2" value={data.phone2} onChange={handleChange} placeholder="Secondary Phone" />

          <input name="address" value={data.address} onChange={handleChange} placeholder="Address" />
          <input name="city" value={data.city} onChange={handleChange} placeholder="City" />

          <input name="country" value={data.country} onChange={handleChange} placeholder="Country" />
        </div>

        <button className="ca__btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ContactManagement;