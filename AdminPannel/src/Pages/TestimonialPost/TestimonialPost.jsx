import React, { useState } from "react";
import "./TestimonialPost.css";

export default function TestimonialPost() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    location: "",
    feedback: "",
    rating: 0,
    image: null,
    preview: null,
  });

  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        image: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleRating = (num) => {
    setForm({ ...form, rating: num });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...data];
      updated[editIndex] = form;
      setData(updated);
      setEditIndex(null);
    } else {
      setData([...data, form]);
    }

    setForm({
      name: "",
      designation: "",
      location: "",
      feedback: "",
      rating: 0,
      image: null,
      preview: null,
    });
  };

  const handleEdit = (index) => {
    setForm(data[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = data.filter((_, i) => i !== index);
    setData(updated);
  };

  return (
    <div className="tp-container">
      {/* FORM */}
      <div className="tp-form">
        <h2>Post Testimonial</h2>

        <form onSubmit={handleSubmit}>
          {/* IMAGE */}
          <div className="tp-group">
            <label>Client Image</label>
            <input type="file" onChange={handleImage} />
            {form.preview && <img src={form.preview} alt="" />}
          </div>

          <div className="tp-group">
            <label>Client Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="tp-group">
            <label>Designation</label>
            <input
              type="text"
              name="designation"
              value={form.designation}
              onChange={handleChange}
            />
          </div>

          <div className="tp-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
            />
          </div>

          <div className="tp-group">
            <label>Feedback</label>
            <textarea
              name="feedback"
              value={form.feedback}
              onChange={handleChange}
            />
          </div>

          {/* STARS */}
          <div className="tp-group">
            <label>Rating</label>
            <div className="tp-stars">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={form.rating >= num ? "active" : ""}
                  onClick={() => handleRating(num)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <button type="submit">
            {editIndex !== null ? "Update" : "Submit"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="tp-table">
        <h2>All Testimonials</h2>

        {data.length === 0 ? (
          <div className="tp-empty">No testimonials yet</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Location</th>
                <th>Feedback</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.preview && <img src={item.preview} alt="" />}
                  </td>
                  <td>{item.name}</td>
                  <td>{item.designation}</td>
                  <td>{item.location}</td>
                  <td className="tp-feedback">{item.feedback}</td>
                  <td>{"★".repeat(item.rating)}</td>
                  <td>
                    <button
                      className="tp-edit"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="tp-delete"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}