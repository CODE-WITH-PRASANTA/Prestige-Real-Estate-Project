import React, { useState } from "react";
import "./RentProperty.css";
import { Editor } from "@tinymce/tinymce-react";
import API from "../../api/axios"; // ✅ your axios instance

const RentProperty = () => {
  const [active, setActive] = useState("basic");

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    shortDesc: "",
    rent: "",
    deposit: "",
    sqft: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    balcony: "",
    amenities: [],
    rating: "",
  });

  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const toggleSection = (section) => {
    setActive(active === section ? "" : section);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ✅ Amenities */
  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, value],
      });
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((item) => item !== value),
      });
    }
  };

  /* ✅ Image Upload */
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const preview = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...preview]);
  };

  const removeImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  /* ✅ Strip HTML */
  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  /* ✅ SUBMIT (CONNECTED TO BACKEND) */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripHtml(description).trim()) {
      alert("Please add property description");
      return;
    }

    try {
      const form = new FormData();

      // append fields
      Object.keys(formData).forEach((key) => {
        if (key === "amenities") {
          form.append("amenities", JSON.stringify(formData.amenities));
        } else {
          form.append(key, formData[key]);
        }
      });

      form.append("description", description);

      // append images
      images.forEach((img) => {
        form.append("images", img.file);
      });

      // API call
      const res = await API.post("/rent", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", res.data);
      alert("Property Published Successfully ✅");

      // reset
      setFormData({
        title: "",
        location: "",
        shortDesc: "",
        rent: "",
        deposit: "",
        sqft: "",
        bedrooms: "",
        bathrooms: "",
        parking: "",
        balcony: "",
        amenities: [],
        rating: "",
      });

      setImages([]);
      setDescription("");

    } catch (error) {
      console.error("Upload Error:", error.response?.data || error.message);
      alert("Upload Failed ❌");
    }
  };

  return (
    <form className="rent-container" onSubmit={handleSubmit}>
      <div className="rent-inner">
        <h2 className="rent-title">Create Rental Listing</h2>

        {/* PROPERTY OVERVIEW */}
        <div className="rent-accordion">
          <div
            className="rent-accordion-header"
            onClick={() => toggleSection("basic")}
          >
            Property Overview
            <span>{active === "basic" ? "▲" : "▼"}</span>
          </div>

          {active === "basic" && (
            <div className="rent-accordion-body">
              <div className="rent-grid">
                <input name="title" placeholder="Property Title" onChange={handleChange} />
                <input name="location" placeholder="Location" onChange={handleChange} />
                <textarea name="shortDesc" placeholder="Short Description" onChange={handleChange} />
                <input name="rent" placeholder="Monthly Rent ₹" onChange={handleChange} />
                <input name="deposit" placeholder="Security Deposit ₹" onChange={handleChange} />
                <input type="date" />
                <input name="sqft" placeholder="Carpet Area (sqft)" onChange={handleChange} />
                <input name="rating" placeholder="Rating (1-5)" onChange={handleChange} />
              </div>
            </div>
          )}
        </div>

        {/* FEATURES */}
        <div className="rent-accordion">
          <div
            className="rent-accordion-header"
            onClick={() => toggleSection("features")}
          >
            Configuration & Amenities
            <span>{active === "features" ? "▲" : "▼"}</span>
          </div>

          {active === "features" && (
            <div className="rent-accordion-body">
              <div className="rent-grid">
                <select name="bedrooms" onChange={handleChange}>
                  <option value="">BHK</option>
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n} BHK</option>
                  ))}
                </select>

                <select name="bathrooms" onChange={handleChange}>
                  <option value="">Bathrooms</option>
                  {[1, 2, 3].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>

                <select name="parking" onChange={handleChange}>
                  <option value="">Parking</option>
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </select>

                <select name="balcony" onChange={handleChange}>
                  <option value="">Balcony</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="rent-amenities">
                {["Gym", "Pool", "Lift", "Security", "CCTV"].map((item, i) => (
                  <label key={i}>
                    <input type="checkbox" value={item} onChange={handleAmenityChange} /> {item}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* MEDIA */}
        <div className="rent-accordion">
          <div
            className="rent-accordion-header"
            onClick={() => toggleSection("upload")}
          >
            Media & Description
            <span>{active === "upload" ? "▲" : "▼"}</span>
          </div>

          {active === "upload" && (
            <div className="rent-accordion-body">

              <label className="rent-upload-box">
                <input type="file" multiple onChange={handleImageUpload} hidden />
                <span>＋</span>
                <p>Upload Images</p>
              </label>

              <div className="rent-image-preview">
                {images.map((img, i) => (
                  <div key={i} className="rent-image-item">
                    <img src={img.url} alt="preview" />
                    <button type="button" onClick={() => removeImage(i)}>×</button>
                  </div>
                ))}
              </div>

              <Editor
                apiKey="jeq7g2k84sqpi9364o8x9ptqf09aoesaq8jxmp49dl4sh57z"
                value={description}
                onEditorChange={(content) => setDescription(content)}
                init={{
                  height: 300,
                  menubar: false,
                  placeholder: "Write full property details...",
                }}
              />
            </div>
          )}
        </div>

        <button type="submit" className="rent-submit-btn">
          Publish Property
        </button>
      </div>
    </form>
  );
};

export default RentProperty;