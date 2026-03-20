import React, { useState } from "react";
import "./PropetiesSale.css";

const PropetiesSales = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    address: "",
    city: "",
    description: "",
  });

  const [list, setList] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = () => {
    setList([...list, formData]);
    setFormData({
      name: "",
      type: "",
      category: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      address: "",
      city: "",
      description: "",
    });
    setStep(1);
  };

  return (
    <div className="Properties-sale">

      {/* LEFT FORM */}
      <div className="Properties-sale-form">

        <div className="Properties-sale-steps">
          <span className={step === 1 ? "active" : ""}>Step 1</span>
          <span className={step === 2 ? "active" : ""}>Step 2</span>
          <span className={step === 3 ? "active" : ""}>Step 3</span>
          <span className={step === 4 ? "active" : ""}>Step 4</span>
        </div>

        <div className="Properties-sale-scroll">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="form-section">
              <h3>Property Information</h3>

              <label>Property Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter property name"
              />

              <label>Property Type</label>
              <input
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Enter type"
              />

              <label>Category</label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter category"
              />

              <label>Price</label>
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="form-section">
              <h3>Property Details</h3>

              <label>Bedrooms</label>
              <input
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="No of bedrooms"
              />

              <label>Bathrooms</label>
              <input
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="No of bathrooms"
              />
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="form-section">
              <h3>Location</h3>

              <label>Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
              />

              <label>City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="form-section">
              <h3>Description</h3>

              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write description..."
              />
            </div>
          )}
        </div>

        {/* BUTTONS */}
        <div className="form-buttons">
          {step > 1 && <button onClick={handlePrev}>Back</button>}
          {step < 4 && <button onClick={handleNext}>Next</button>}
          {step === 4 && (
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          )}
        </div>
      </div>

      {/* RIGHT TABLE */}
      <div className="Properties-sale-table">
        <h3>Property List</h3>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Category</th>
                <th>Price</th>
                <th>Bedrooms</th>
                <th>Bathrooms</th>
                <th>City</th>
              </tr>
            </thead>

            <tbody>
              {list.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.bedrooms}</td>
                  <td>{item.bathrooms}</td>
                  <td>{item.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default PropetiesSales ;