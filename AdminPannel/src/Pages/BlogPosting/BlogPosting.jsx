import React, { useState } from "react";
import "./BlogPosting.css";

const BlogPosting = () => {
  const base = "blog";

  const initialForm = {
    image: "",
    category: "",
    title: "",
    author: "",
    date: "",
    description: "",
    status: "Active",
  };

  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);

  // HANDLE INPUT
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
      const updated = list.map((item) =>
        item.id === editId
          ? { ...form, id: editId, image: preview || item.image }
          : item
      );
      setList(updated);
      setEditId(null);
    } else {
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
    if (window.confirm("Delete this blog?")) {
      setList(list.filter((item) => item.id !== id));
    }
  };

  return (
    <div className={`${base}-container`}>
      
      {/* FORM */}
      <div className={`${base}-form`}>
        <h2>{editId ? "Edit Blog" : "Add Blog"}</h2>

        <form onSubmit={handleSubmit}>
          
          <div className={`${base}-group`}>
            <label>Blog Image</label>
            <input type="file" onChange={handleImage} />
            {preview && (
              <img src={preview} className={`${base}-preview`} alt="" />
            )}
          </div>

          <div className={`${base}-group`}>
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter category"
              value={form.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`${base}-group`}>
            <label>Blog Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`${base}-group`}>
            <label>Author Name</label>
            <input
              type="text"
              name="author"
              placeholder="Enter author name"
              value={form.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`${base}-group`}>
            <label>Publish Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`${base}-group`}>
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Write blog content..."
              value={form.description}
              onChange={handleChange}
              required
            />
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
            {editId ? "Update Blog" : "Submit"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className={`${base}-list`}>
        <h2>Blog List</h2>

        <div className={`${base}-table-wrapper`}>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Category</th>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan="8">No Data Found</td>
                </tr>
              ) : (
                list.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image} alt="" />
                    </td>
                    <td>{item.category}</td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.date}</td>
                    <td>{item.description}</td>
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

                    <td>
                      <div className="blog-actions">
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

export default BlogPosting;