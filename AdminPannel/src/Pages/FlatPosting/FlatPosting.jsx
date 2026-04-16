import React, { useState } from "react";
import "./FlatPosting.css";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2";

const FlatPosting = () => {
  const [activeSection, setActiveSection] = useState("basic");
  const [images, setImages] = useState([]);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...previews]);
  };

  const renderOptions = (max) => {
    return [...Array(max)].map((_, i) => <option key={i + 1}>{i + 1}</option>);
  };

  const [ownerPreview, setOwnerPreview] = useState(null);

  const handleOwnerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setOwnerPreview(URL.createObjectURL(file));
    }
  };

  const [bannerPreview, setBannerPreview] = useState(null);

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit this property?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Submit",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Submitted!",
          text: "Your property has been posted successfully 🎉",
          icon: "success",
          confirmButtonColor: "#6366f1",
        });
      }
    });
  };

  return (
    <div className="FlatPost">
      <h2 className="FlatPost__title">Flat Posting</h2>

      {/* ================= SECTION 1 ================= */}
      <div className="FlatPost__section">
        <div
          className="FlatPost__header"
          onClick={() => toggleSection("basic")}
        >
          <span>Basic Details</span>
          <FaChevronDown
            className={`FlatPost__icon ${
              activeSection === "basic" ? "rotate" : ""
            }`}
          />
        </div>

        <div
          className={`FlatPost__content ${
            activeSection === "basic" ? "open" : ""
          }`}
        >
          <div className="FlatPost__grid">
            <div className="FlatPost__field full">
              <label>Property Title</label>
              <input
                className="FlatPost__input"
                placeholder="Enter property title"
              />
            </div>

            <div className="FlatPost__field full">
              <label>Short Description</label>
              <textarea
                className="FlatPost__textarea"
                placeholder="Enter short description"
              />
            </div>

            <div className="FlatPost__field">
              <label>Location</label>
              <input className="FlatPost__input" placeholder="Enter location" />
            </div>

            <div className="FlatPost__field">
              <label>Last Update Date</label>
              <input className="FlatPost__input" type="date" />
            </div>

            <div className="FlatPost__field">
              <label>Rating (1-5)</label>
              <input
                className="FlatPost__input"
                type="number"
                min="1"
                max="5"
              />
            </div>

            <div className="FlatPost__field">
              <label>Total Amount</label>
              <input
                className="FlatPost__input"
                placeholder="₹ Enter total price"
              />
            </div>

            <div className="FlatPost__field">
              <label>Down Payment</label>
              <input
                className="FlatPost__input"
                placeholder="₹ Enter down payment"
              />
            </div>

            <div className="FlatPost__field">
              <label>Loan Terms</label>
              <input className="FlatPost__input" placeholder="e.g. 10 years" />
            </div>

            <div className="FlatPost__field">
              <label>Interest Rate (%)</label>
              <input className="FlatPost__input" placeholder="e.g. 7.5%" />
            </div>

            <div className="FlatPost__field">
              <label>Min Sqft</label>
              <input
                className="FlatPost__input"
                placeholder="Enter square feet"
              />
            </div>

            <div className="FlatPost__field">
              <label>Upload Banner</label>

              <input
                type="file"
                onChange={handleBannerUpload}
                className="FlatPost__input"
              />

              {bannerPreview && (
                <div className="FlatPost__bannerPreview">
                  <img src={bannerPreview} alt="banner preview" />
                </div>
              )}
            </div>

            <div className="FlatPost__field">
              <label>Owner Profile Picture</label>
              <input
                type="file"
                onChange={handleOwnerUpload}
                className="FlatPost__input"
              />

              {ownerPreview && (
                <div className="FlatPost__ownerPreview">
                  <img src={ownerPreview} alt="owner" />
                </div>
              )}
            </div>

            <div className="FlatPost__field">
              <label>Property Category</label>
              <select className="FlatPost__input">
                <option>Select Category</option>
                <option>Flat</option>
                <option>Apartment</option>
                <option>Villa</option>
              </select>
            </div>

            <div className="FlatPost__field">
              <label>Created Date</label>
              <input className="FlatPost__input" type="date" />
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 2 ================= */}
      <div className="FlatPost__section">
        <div
          className="FlatPost__header"
          onClick={() => toggleSection("features")}
        >
          <span>Property Features</span>
          <FaChevronDown
            className={`FlatPost__icon ${
              activeSection === "features" ? "rotate" : ""
            }`}
          />
        </div>

        <div
          className={`FlatPost__content ${
            activeSection === "features" ? "open" : ""
          }`}
        >
          {/* ===== FEATURE DROPDOWNS ===== */}
          <div className="FlatPost__grid">
            <div className="FlatPost__field">
              <label>Bedroom</label>
              <select className="FlatPost__input">{renderOptions(10)}</select>
            </div>

            <div className="FlatPost__field">
              <label>Bathroom</label>
              <select className="FlatPost__input">{renderOptions(5)}</select>
            </div>

            <div className="FlatPost__field">
              <label>Parking</label>
              <select className="FlatPost__input">{renderOptions(10)}</select>
            </div>

            <div className="FlatPost__field">
              <label>Balcony</label>
              <select className="FlatPost__input">{renderOptions(5)}</select>
            </div>

            <div className="FlatPost__field">
              <label>Floor</label>
              <select className="FlatPost__input">{renderOptions(10)}</select>
            </div>

            <div className="FlatPost__field">
              <label>Wardrobe</label>
              <select className="FlatPost__input">{renderOptions(10)}</select>
            </div>

            <div className="FlatPost__field">
              <label>TV</label>
              <select className="FlatPost__input">{renderOptions(5)}</select>
            </div>

            <div className="FlatPost__field">
              <label>Water Purifier</label>
              <select className="FlatPost__input">{renderOptions(10)}</select>
            </div>

            <div className="FlatPost__field">
              <label>Microwave</label>
              <select className="FlatPost__input">{renderOptions(5)}</select>
            </div>

            <div className="FlatPost__field">
              <label>AC</label>
              <select className="FlatPost__input">{renderOptions(10)}</select>
            </div>

            <div className="FlatPost__field">
              <label>Fridge</label>
              <select className="FlatPost__input">{renderOptions(10)}</select>
            </div>

            <div className="FlatPost__field">
              <label>Curtains</label>
              <select className="FlatPost__input">{renderOptions(10)}</select>
            </div>
          </div>

          {/* ===== AMENITIES ===== */}
          <div className="FlatPost__amenities">
            <h3 className="FlatPost__subTitle">Amenities</h3>

            <div className="FlatPost__amenitiesGrid">
              {[
                "Gym",
                "Swimming Pool",
                "Power Backup",
                "Lift",
                "Security",
                "Club House",
                "Garden",
                "Children Play Area",
                "Parking Area",
                "CCTV",
                "WiFi",
                "Fire Safety",
              ].map((item, i) => (
                <label key={i} className="FlatPost__amenityItem">
                  <input type="checkbox" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECTION 3 ================= */}
      <div className="FlatPost__section">
        <div
          className="FlatPost__header"
          onClick={() => toggleSection("upload")}
        >
          <span>Uploads & Description</span>
          <FaChevronDown
            className={`FlatPost__icon ${
              activeSection === "upload" ? "rotate" : ""
            }`}
          />
        </div>

        <div
          className={`FlatPost__content ${
            activeSection === "upload" ? "open" : ""
          }`}
        >
          <div className="FlatPost__uploadBox">
            <label className="FlatPost__uploadBtn">
              <FaPlus />
              <input type="file" multiple hidden onChange={handleImageUpload} />
            </label>

            <div className="FlatPost__preview">
              {images.map((img, i) => (
                <img key={i} src={img} alt="preview" />
              ))}
            </div>
          </div>

          <div className="FlatPost__editor">
            <Editor
              apiKey="jeq7g2k84sqpi9364o8x9ptqf09aoesaq8jxmp49dl4sh57z"
              init={{
                height: 300,
                menubar: false,
                plugins: ["link", "image", "lists"],
                toolbar:
                  "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist",
              }}
            />
          </div>
        </div>
      </div>

      <button className="FlatPost__submit" onClick={handleSubmit}>
        Submit Property
      </button>
    </div>
  );
};

export default FlatPosting;
