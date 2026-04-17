import React, { useState } from "react";
import "./ColdLead.css";

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

  const [leads, setLeads] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterAddress, setFilterAddress] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name) return alert("Name required");

    setLeads([{ ...form, id: Date.now() }, ...leads]);

    setForm({
      name: "",
      phone: "",
      email: "",
      property: "",
      budget: "",
      city: "",
      message: "",
    });
  };

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(filterName.toLowerCase()) &&
      lead.city.toLowerCase().includes(filterAddress.toLowerCase())
  );
 
  return (
    <div className={base}>
      {/* LEFT FORM */}
      <div className={`${base}__left`}>
        <div className={`${base}__card`}>
          <h2>Request a Free Consultation</h2>

          <div className={`${base}__row`}>
            <div className={`${base}__field`}>
              <label>Full Name</label>
              <input
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className={`${base}__field`}>
              <label>Phone Number</label>
              <input
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
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className={`${base}__field`}>
              <label>Property Type</label>
              <select name="property" onChange={handleChange}>
                <option>Select property type</option>
                <option>Flat</option>
                <option>Villa</option>
              </select>
            </div>
          </div>

          <div className={`${base}__row`}>
            <div className={`${base}__field`}>
              <label>Budget</label>
              <select name="budget" onChange={handleChange}>
                <option>Select budget</option>
                <option>5L - 10L</option>
                <option>10L - 20L</option>
              </select>
            </div>

            <div className={`${base}__field`}>
              <label>Preferred City</label>
              <input
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

          <button className={`${base}__submit`} onClick={handleSubmit}>
            Submit Enquiry
          </button>
        </div>
      </div>

      {/* RIGHT TABLE */}
      <div className={`${base}__right`}>
        <div className={`${base}__card`}>
          <div className={`${base}__filterRow`}>
            <input
              placeholder="Filter by Name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />

            <input
              placeholder="Filter by Address"
              value={filterAddress}
              onChange={(e) => setFilterAddress(e.target.value)}
            />
          </div>

          <div className={`${base}__table`}>
            {filteredLeads.length === 0 ? (
              <p>No leads found.</p>
            ) : (
              filteredLeads.map((lead) => (
                <div key={lead.id} className={`${base}__rowItem`}>
                  <h4>{lead.name}</h4>
                  <p>{lead.city}</p>
                  <span>{lead.phone}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColdLeadForm;