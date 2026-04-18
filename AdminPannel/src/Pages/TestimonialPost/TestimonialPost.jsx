import React, { useState } from "react";
import "./TestimonialPost.css";
import { API, IMG_URL } from "../../api/axios"; // adjust path
import { useEffect } from "react";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await API.get("/testimonials");
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("designation", form.designation);
      formData.append("location", form.location);
      formData.append("feedback", form.feedback);
      formData.append("rating", form.rating);
      if (form.image) formData.append("image", form.image);

      if (editIndex !== null) {
        const id = data[editIndex]._id;

        await API.put(`/testimonials/${id}`, formData);

        setEditIndex(null);
      } else {
        await API.post("/testimonials", formData);
      }

      fetchTestimonials();

      setForm({
        name: "",
        designation: "",
        location: "",
        feedback: "",
        rating: 0,
        image: null,
        preview: null,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (index) => {
    const item = data[index];

    setForm({
      name: item.name,
      designation: item.designation,
      location: item.location,
      feedback: item.feedback,
      rating: item.rating,
      image: null,
      preview: item.image ? IMG_URL + item.image : null,
    });

    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      const id = data[index]._id;

      await API.delete(`/testimonials/${id}`);

      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
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
            {form.preview && (
              <img src={form.preview} alt="preview" className="tp-img" />
            )}
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

        {loading ? (
          <div className="tp-empty">Loading...</div>
        ) : data.length === 0 ? (
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
                    <img
                      src={
                        item.image ? `${IMG_URL}${item.image}` : "/no-user.png"
                      }
                      alt="testimonial"
                      className="tp-img"
                      onError={(e) => (e.target.src = "/no-user.png")}
                    />
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
