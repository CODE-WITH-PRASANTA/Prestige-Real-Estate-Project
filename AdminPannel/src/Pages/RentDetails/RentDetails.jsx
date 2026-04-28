import React, { useState } from "react";
import "./rentDetails.css";

const RentDetails = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    propertyType: "",
    type: "Rent",
    bedrooms: "",
    bathrooms: "",
    balconies: "",
    address: "",
    city: "",
    state: "",
    carpetArea: "",
    furnishing: "",
    availableFor: "",
    availableFrom: "",
    images: [],
  });

  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images") {
      setForm({ ...form, images: Array.from(files) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const updated = list.map((item) =>
        item.id === editId ? { ...form, id: editId } : item
      );
      setList(updated);
      setEditId(null);
    } else {
      const newData = {
        ...form,
        id: Date.now(),
        postedDate: new Date().toLocaleDateString(),
      };
      setList([...list, newData]);
    }

    setForm({
      title: "",
      price: "",
      propertyType: "",
      type: "Rent",
      bedrooms: "",
      bathrooms: "",
      balconies: "",
      address: "",
      city: "",
      state: "",
      carpetArea: "",
      furnishing: "",
      availableFor: "",
      availableFrom: "",
      images: [],
    });
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setForm(item);
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <div className="rent-container">

      {/* ================= TOP ================= */}
      <div className="rent-top">

        {/* ===== FORM ===== */}
        <form className="rent-form" onSubmit={handleSubmit}>
          <h2>{editId ? "Edit Property" : "Property Form"}</h2>

          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
          <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />

          <select name="propertyType" value={form.propertyType} onChange={handleChange}>
            <option value="">Property Type</option>
            <option>House</option>
            <option>Flat</option>
          </select>

          <div className="rent-row">
            <input name="bedrooms" value={form.bedrooms} onChange={handleChange} placeholder="Bedrooms" />
            <input name="bathrooms" value={form.bathrooms} onChange={handleChange} placeholder="Bathrooms" />
            <input name="balconies" value={form.balconies} onChange={handleChange} placeholder="Balconies" />
          </div>

          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
          <input name="state" value={form.state} onChange={handleChange} placeholder="State" />

          <input name="carpetArea" value={form.carpetArea} onChange={handleChange} placeholder="Carpet Area" />

          <select name="furnishing" value={form.furnishing} onChange={handleChange}>
            <option value="">Furnishing</option>
            <option>Furnished</option>
            <option>Semi-Furnished</option>
            <option>Unfurnished</option>
          </select>

          <select name="availableFor" value={form.availableFor} onChange={handleChange}>
            <option value="">Available For</option>
            <option>Family</option>
            <option>Bachelor</option>
          </select>

          <input type="date" name="availableFrom" value={form.availableFrom} onChange={handleChange} />

          <input type="file" name="images" multiple onChange={handleChange} />

          <button className="rent-btn">
            {editId ? "Update Property" : "Save Property"}
          </button>
        </form>

        {/* ===== PREVIEW ===== */}
        <div className="rent-preview">
          <h2>Live Preview</h2>

          <div className="preview-card">
            <h3>₹{form.price || "0"} / Month</h3>
            <p>{form.bedrooms || 0} BHK • {form.bathrooms || 0} Bath</p>
            <p>{form.propertyType || "Property Type"}</p>
            <p>{form.address || "Address"}, {form.city}</p>

            <div className="preview-grid">
              <span>{form.carpetArea || 0} sq.ft</span>
              <span>{form.furnishing || "Furnishing"}</span>
              <span>{form.availableFor || "Available For"}</span>
            </div>

            <div className="preview-images">
              {form.images && form.images.length > 0 ? (
                form.images.map((img, i) => {
                  const src =
                    img instanceof File ? URL.createObjectURL(img) : img;
                  return <img key={i} src={src} alt="preview" />;
                })
              ) : (
                <p>No Images</p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div className="rent-table-section">
        <h2>Property List</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Location</th>
                <th>Type</th>
                <th>BHK</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {list.length === 0 ? (
                <tr><td colSpan="6">No Data</td></tr>
              ) : (
                list.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>₹{item.price}</td>
                    <td>{item.city}</td>
                    <td>{item.propertyType}</td>
                    <td>{item.bedrooms}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default RentDetails;