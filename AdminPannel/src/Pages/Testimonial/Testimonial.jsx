import React, { useState } from "react";
import "./Testimonial.css";

const Testimonial = () => {
  const base = "testimonial";

  const initialForm = {
    image: "",
    name: "",
    designation: "",
    review: "",
    rating: 5,
    status: "Active",
  };

  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // IMAGE
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // SUBMIT / UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      // UPDATE
      const updatedList = list.map((item) =>
        item.id === editId
          ? { ...form, id: editId, image: preview || item.image }
          : item
      );
      setList(updatedList);
      setEditId(null);
    } else {
      // CREATE
      const newItem = {
        ...form,
        id: Date.now(),
        image: preview,
      };
      setList([newItem, ...list]);
    }

    setForm(initialForm);
    setPreview("");
  };

  // EDIT
  const handleEdit = (item) => {
    setForm(item);
    setPreview(item.image);
    setEditId(item.id);
  };

  // DELETE
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this testimonial?");
    if (confirmDelete) {
      setList(list.filter((item) => item.id !== id));
    }
  };

  return (
    <div className={`${base}-container`}>
      
      {/* FORM */}
      <div className={`${base}-form`}>
        <h2>{editId ? "Edit Testimonial" : "Add Testimonial"}</h2>

        <form onSubmit={handleSubmit}>
          
          <div className={`${base}-group`}>
            <label>Client Image</label>
            <input type="file" onChange={handleImage} />
            {preview && (
              <img src={preview} className={`${base}-preview`} alt="" />
            )}
          </div>

          <div className={`${base}-group`}>
            <label>Client Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter client name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`${base}-group`}>
            <label>Designation</label>
            <input
              type="text"
              name="designation"
              placeholder="Enter designation"
              value={form.designation}
              onChange={handleChange}
            />
          </div>

          <div className={`${base}-group`}>
            <label>Review</label>
            <textarea
              name="review"
              placeholder="Write review..."
              value={form.review}
              onChange={handleChange}
              required
            />
          </div>

          {/* STARS */}
          <div className={`${base}-group`}>
            <label>Rating</label>
            <div className={`${base}-stars`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={form.rating >= star ? "active" : ""}
                  onClick={() => setForm({ ...form, rating: star })}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className={`${base}-group`}>
            <label>Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <button type="submit" className={`${base}-btn`}>
            {editId ? "Update Testimonial" : "Submit"}
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className={`${base}-list`}>
        <h2>Testimonials List</h2>

        <div className={`${base}-table-wrapper`}>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan="7">No Data Found</td>
                </tr>
              ) : (
                list.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image} alt="" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.designation}</td>
                    <td>{item.review}</td>
                    <td>{"★".repeat(item.rating)}</td>
                    <td>
                      <span
                        className={
                          item.status === "Active"
                            ? "status-active"
                            : "status-inactive"
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* ACTION BUTTONS */}
                    <td>
                      <div className="testimonial-actions">
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
                      </div>
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

export default Testimonial;