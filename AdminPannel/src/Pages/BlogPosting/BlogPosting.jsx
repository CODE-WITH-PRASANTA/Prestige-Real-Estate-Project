import React, { useState } from "react";
import "./BlogPosting.css";
import { Editor } from "@tinymce/tinymce-react";

const BlogPosting = () => {
  const base = "bp";

  const [form, setForm] = useState({
    id: null,
    title: "",
    category: "",
    owner: "",
    date: "",
    content: "",
    tags: [],
    reviews: "",
    image: "",
  });

  const [blogs, setBlogs] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const categories = ["Technology", "Travel", "Health", "Food", "Business"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: URL.createObjectURL(file) });
    }
  };

  const addTag = () => {
    if (tagInput && !form.tags.includes(tagInput)) {
      setForm({ ...form, tags: [...form.tags, tagInput] });
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  const handleSubmit = () => {
    if (!form.title) return alert("Title required");

    if (form.id) {
      setBlogs(blogs.map((b) => (b.id === form.id ? form : b)));
    } else {
      setBlogs([{ ...form, id: Date.now() }, ...blogs]);
    }

    resetForm();
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      category: "",
      owner: "",
      ownerdesignation: "",
      date: "",
      content: "",
      tags: [],
      reviews: "",
      image: "",
    });
  };

  const handleEdit = (blog) => setForm(blog);
  const handleDelete = (id) => setBlogs(blogs.filter((b) => b.id !== id));

  return (
    <div className={base}>
      {/* ================= FORM ================= */}
      <div className={`${base}__card`}>
        <h2 className={`${base}__title`}>Create Blog</h2>

        {/* TOP ROW */}
        <div className="bp__topRow">
          <div className="bp__fileInput">
            <input type="file" onChange={handleImage} />
          </div>

          <input
            name="title"
            placeholder="Blog Title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        {/* IMAGE PREVIEW */}
        {form.image && (
          <div className="bp__previewWrap">
            <img src={form.image} className="bp__img" alt="" />
          </div>
        )}

        {/* GRID */}
        <div className={`${base}__grid`}>
          <select name="category" value={form.category} onChange={handleChange}>
            <option>Select Category</option>
            {categories.map((c, i) => <option key={i}>{c}</option>)}
          </select>

          <input name="owner" placeholder="Owner Name" value={form.owner} onChange={handleChange} />
          <input name="ownerdesignation" placeholder="Owner Designation" value={form.ownerdesignation} onChange={handleChange} />

          <input type="date" name="date" value={form.date} onChange={handleChange} />
        </div>

        {/* EDITOR */}
        <div className={`${base}__editor`}>
          <label className="bp__label">Description of Blog</label>
          <Editor
            apiKey="jeq7g2k84sqpi9364o8x9ptqf09aoesaq8jxmp49dl4sh57z"
            value={form.content}
            onEditorChange={(content) => setForm({ ...form, content })}
            init={{
              height: 300,
              menubar: false,
              plugins: ["link", "image", "lists"],
              toolbar:
                "undo redo | bold italic | alignleft aligncenter alignright | bullist numlist | image",
            }}
          />
        </div>

        {/* TAG + REVIEWS */}
        <div className="bp__bottomGrid">
          <div className="bp__box bp__box--left">
            <label className="bp__label">Tags</label>

            <div className="bp__tagInputWrap">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Enter tag..."
              />
              <button onClick={addTag}>Add</button>
            </div>

            <div className="bp__tags">
              {form.tags.map((tag, i) => (
                <span key={i} onClick={() => removeTag(tag)}>
                  {tag} ✕
                </span>
              ))}
            </div>
          </div>

          <div className="bp__box bp__box--right">
            <label className="bp__label">Reviews</label>

            <textarea
              name="reviews"
              placeholder="Write reviews..."
              value={form.reviews}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* BUTTON */}
        <div className="bp__actionRow">
          <button className="bp__submitBtn" onClick={handleSubmit}>
            {form.id ? "Update Blog" : "Submit Blog"}
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bp__tableWrap">
        <h2 className="bp__title">All Blogs</h2>

        <table className="bp__table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Owner</th>
              <th>Designation</th>
              <th>Date</th>
              <th>Tags</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((b) => (
              <tr key={b.id}>
                <td><img src={b.image} alt="" /></td>
                <td>{b.title}</td>
                <td>{b.category}</td>
                <td>{b.owner}</td>
                <td>{b.ownerdesignation}</td>
                <td>{b.date}</td>
                <td>{b.tags.join(", ")}</td>
                <td>
                  <button className="bp__edit" onClick={() => handleEdit(b)}>Edit</button>
                  <button className="bp__delete" onClick={() => handleDelete(b.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {blogs.length === 0 && <p className="bp__empty">No blogs available</p>}
      </div>
    </div>
  );
};

export default BlogPosting;