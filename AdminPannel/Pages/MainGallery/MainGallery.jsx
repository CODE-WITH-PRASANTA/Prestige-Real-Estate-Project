import React, { useState } from "react";
import "./MainGallery.css";

export default function MainGallery() {
  const [form, setForm] = useState({
    image: "",
    location: "",
    category: "Apartment",
    date: "",
  });

  const [preview, setPreview] = useState("");
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    setForm({
      ...form,
      image: url,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...list];
      updated[editIndex] = form;
      setList(updated);
      setEditIndex(null);
    } else {
      setList([...list, form]);
    }

    setForm({
      image: "",
      location: "",
      category: "Apartment",
      date: "",
    });

    setPreview("");
  };

  const handleDelete = (i) => {
    const updated = list.filter((_, index) => index !== i);
    setList(updated);
  };

  const handleEdit = (i) => {
    setForm(list[i]);
    setPreview(list[i].image);
    setEditIndex(i);
  };

  return (
    <div className="mg-container">

      {/* TOP */}
      <div className="mg-top">

        {/* FORM */}
        <form className="mg-form" onSubmit={handleSubmit}>
          <h3>Add Gallery Post</h3>

          <input
            type="file"
            onChange={handleImage}
            className="mg-input"
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="mg-input"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mg-input"
          >
            <option>Apartment</option>
            <option>Villa</option>
            <option>Office</option>
            <option>Shop</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="mg-input"
            required
          />

          <button className="mg-btn">
            {editIndex !== null ? "Update Gallery" : "Add Gallery"}
          </button>
        </form>


        {/* PREVIEW */}
        <div className="mg-preview">
          <h3>Live Preview</h3>

          <div className="mg-card">

            {preview && (
              <img
                src={preview}
                alt=""
                className="mg-preview-img"
              />
            )}

            <div className="mg-preview-info">
              <h4>{form.location || "Location"}</h4>
              <span className="mg-badge">
                {form.category}
              </span>
              <p>{form.date}</p>
            </div>

          </div>
        </div>

      </div>


      {/* TABLE */}
      <div className="mg-table-box">

        <div className="mg-table-head">
          <h3>Gallery Posts</h3>
          <span>Total : {list.length}</span>
        </div>

        <div className="mg-table-wrap">
          <table className="mg-table">

            <thead>
              <tr>
                <th>Image</th>
                <th>Location</th>
                <th>Category</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {list.length === 0 && (
                <tr>
                  <td colSpan="5">No Data</td>
                </tr>
              )}

              {list.map((item, i) => (
                <tr key={i}>

                  <td>
                    <img
                      src={item.image}
                      alt=""
                      className="mg-table-img"
                    />
                  </td>

                  <td>{item.location}</td>
                  <td>{item.category}</td>
                  <td>{item.date}</td>

                  <td>
                    <button
                      onClick={() => handleEdit(i)}
                      className="mg-edit"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(i)}
                      className="mg-delete"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>

      </div>

    </div>
  );
}