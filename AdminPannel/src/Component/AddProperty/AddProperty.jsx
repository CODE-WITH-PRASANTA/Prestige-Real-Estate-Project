import React, { useState } from "react";
import "./AddProperty.css";

const AddProperty = () => {
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const facilities = [
    "Pool",
    "Gym",
    "Fireplace",
    "Garage",
    "Balcony",
    "Garden",
    "Swimming Pool",
    "Sauna",
    "Spa",
    "Terrace",
    "View",
    "Elevator",
    "24/7 Security",
    "Parking",
    "Playground",
    "Storage",
    "Air Conditioning",
    "CCTV",
  ];

  return (
    <div className="AddProperty">
      <div className="AddProperty__topBar">
        <h2 className="AddProperty__pageTitle">Property Add</h2>

        <div className="AddProperty__breadcrumb">
          <span>Property</span>
          <span className="AddProperty__breadcrumbArrow">›</span>
          <span className="AddProperty__breadcrumbActive">Property Add</span>
        </div>
      </div>

      <div className="AddProperty__layout">
        {/* LEFT SIDE */}
        <div className="AddProperty__left">
          <div className="AddProperty__card">
            <h3 className="AddProperty__cardTitle">Property Details</h3>

            <div className="AddProperty__field AddProperty__field--full">
              <label className="AddProperty__label">Property Title</label>
              <input
                type="text"
                className="AddProperty__input"
                placeholder="Enter property title"
              />
            </div>

            <div className="AddProperty__grid AddProperty__grid--2">
              <div className="AddProperty__field">
                <label className="AddProperty__label">Property Type</label>
                <select className="AddProperty__input AddProperty__select">
                  <option>Select</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>House</option>
                  <option>Commercial</option>
                  <option>Office</option>
                  <option>Plot</option>
                </select>
              </div>

              <div className="AddProperty__field">
                <label className="AddProperty__label">Price ($)</label>
                <input
                  type="text"
                  className="AddProperty__input"
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div className="AddProperty__grid AddProperty__grid--3">
              <div className="AddProperty__field">
                <label className="AddProperty__label">Area (sq ft)</label>
                <input
                  type="text"
                  className="AddProperty__input"
                  placeholder="Enter area"
                />
              </div>

              <div className="AddProperty__field">
                <label className="AddProperty__label">Status</label>
                <select className="AddProperty__input AddProperty__select">
                  <option>Select</option>
                  <option>For Sale</option>
                  <option>For Rent</option>
                  <option>Sold</option>
                  <option>Booked</option>
                </select>
              </div>

              <div className="AddProperty__field">
                <label className="AddProperty__label">Bedrooms</label>
                <input
                  type="text"
                  className="AddProperty__input"
                  placeholder="Enter number of bedrooms"
                />
              </div>
            </div>

            <div className="AddProperty__grid AddProperty__grid--2">
              <div className="AddProperty__field">
                <label className="AddProperty__label">Bathrooms</label>
                <input
                  type="text"
                  className="AddProperty__input"
                  placeholder="Enter number of bathrooms"
                />
              </div>

              <div className="AddProperty__field">
                <label className="AddProperty__label">Garage</label>
                <input
                  type="text"
                  className="AddProperty__input"
                  placeholder="Enter number of garages"
                />
              </div>
            </div>

            <div className="AddProperty__field AddProperty__field--full">
              <label className="AddProperty__label">Property Description</label>
              <textarea
                className="AddProperty__textarea"
                placeholder="Enter property description"
              ></textarea>
            </div>
          </div>

          <div className="AddProperty__card">
            <h3 className="AddProperty__cardTitle">Location Details</h3>

            <div className="AddProperty__grid AddProperty__grid--3">
              <div className="AddProperty__field">
                <label className="AddProperty__label">City</label>
                <input
                  type="text"
                  className="AddProperty__input"
                  placeholder="Enter city"
                />
              </div>

              <div className="AddProperty__field">
                <label className="AddProperty__label">State</label>
                <input
                  type="text"
                  className="AddProperty__input"
                  placeholder="Enter state"
                />
              </div>

              <div className="AddProperty__field">
                <label className="AddProperty__label">Zip Code</label>
                <input
                  type="text"
                  className="AddProperty__input"
                  placeholder="Enter zip code"
                />
              </div>
            </div>

            <div className="AddProperty__grid AddProperty__grid--2">
              <div className="AddProperty__field">
                <label className="AddProperty__label">Country</label>
                <select className="AddProperty__input AddProperty__select">
                  <option>Select</option>
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>Canada</option>
                  <option>Singapore</option>
                </select>
              </div>

              <div className="AddProperty__field">
                <label className="AddProperty__label">Address</label>
                <input
                  type="text"
                  className="AddProperty__input"
                  placeholder="Enter full address"
                />
              </div>
            </div>

            <div className="AddProperty__buttonRow">
              <button type="button" className="AddProperty__cancelButton">
                Cancel
              </button>
              <button type="button" className="AddProperty__submitButton">
                Add Property
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="AddProperty__right">
          <div className="AddProperty__card AddProperty__card--sticky">
            <h3 className="AddProperty__cardTitle">Upload Image</h3>

            <label className="AddProperty__uploadBox">
              {image ? (
                <img
                  src={image}
                  alt="Property Preview"
                  className="AddProperty__previewImage"
                />
              ) : (
                <div className="AddProperty__uploadContent">
                  <span className="AddProperty__uploadText">Property Image</span>
                </div>
              )}
              <input
                type="file"
                className="AddProperty__fileInput"
                onChange={handleImage}
              />
            </label>

            <h4 className="AddProperty__facilityTitle">Facilities</h4>

            <div className="AddProperty__facilityGrid">
              {facilities.map((facility, index) => (
                <label className="AddProperty__checkboxItem" key={index}>
                  <input
                    type="checkbox"
                    className="AddProperty__checkbox"
                    defaultChecked={index < 3}
                  />
                  <span className="AddProperty__checkboxText">{facility}</span>
                </label>
              ))}
            </div>

            <button type="button" className="AddProperty__facilityButton">
              Add Facility
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;