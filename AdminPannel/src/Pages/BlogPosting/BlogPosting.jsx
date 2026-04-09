import React, { useState } from "react";
import "./BlogPosting.css";
import { FaBold, FaItalic, FaUnderline, FaList, FaImage } from "react-icons/fa";

const BlogPosting = () => {
  const base = "blogposting";

  const [form, setForm] = useState({
    id: null,
    title: "",
    category: "",
    author: "",
    owner: "",
    email: "",
    date: "",
    time: "",
    tags: [],
    content: "",
    course: "",
    type: "Free",
    image: "",
  });

  const [tagInput, setTagInput] = useState("");
  const [blogs, setBlogs] = useState([]);

  const categories = ["Animals", "Travel", "Interior", "Nature", "Health", "Food"];

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // TAG ADD
  const handleAddTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput)) {
      setForm({ ...form, tags: [...form.tags, tagInput] });
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setForm({ ...form, tags: form.tags.filter((t) => t !== tag) });
  };

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: URL.createObjectURL(file) });
    }
  };

  // CREATE / UPDATE
  const handlePost = (status) => {
    if (!form.title) return alert("Title required");

    if (form.id) {
      setBlogs(
        blogs.map((b) =>
          b.id === form.id ? { ...form, status } : b
        )
      );
    } else {
      const newBlog = {
        ...form,
        status,
        id: Date.now(),
      };
      setBlogs([newBlog, ...blogs]);
    }

    resetForm();
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      category: "",
      author: "",
      owner: "",
      email: "",
      date: "",
      time: "",
      tags: [],
      content: "",
      course: "",
      type: "Free",
      image: "",
    });
  };

  // DELETE
  const handleDelete = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };

  // EDIT
  const handleEdit = (blog) => {
    setForm(blog);
  };

  // TOGGLE STATUS
  const toggleStatus = (id) => {
    setBlogs(
      blogs.map((b) =>
        b.id === id
          ? {
              ...b,
              status: b.status === "Published" ? "Unpublished" : "Published",
            }
          : b
      )
    );
  };

  return (
    <div className={base}>
      {/* LEFT */}
      <div className={`${base}__left`}>
        <h2 className={`${base}__title`}>Create Blog</h2>

        <div className={`${base}__card`}>
          <h3>New Blog</h3>

          {/* TITLE */}
          <div className={`${base}__field`}>
            <label>Blog Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              placeholder="Blog Title"
              onChange={handleChange}
            />
          </div>

          {/* CATEGORY */}
          <div className={`${base}__field`}>
            <label>Blog Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="">Select Category</option>
              {categories.map((cat, i) => (
                <option key={i}>{cat}</option>
              ))}
            </select>
          </div>

          {/* AUTHOR + EMAIL */}
          <div className={`${base}__row`}>
            <div className={`${base}__field`}>
              <label>Blog Author</label>
              <input
                type="text"
                name="author"
                value={form.author}
                placeholder="Enter Name"
                onChange={handleChange}
              />
            </div>

            <div className={`${base}__field`}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="Enter Email"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* OWNER */}
          <div className={`${base}__field`}>
            <label>Owner Name</label>
            <input
              type="text"
              name="owner"
              value={form.owner}
              placeholder="Enter Owner Name"
              onChange={handleChange}
            />
          </div>

          {/* DATE + TIME */}
          <div className={`${base}__row`}>
            <div className={`${base}__field`}>
              <label>Publish Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} />
            </div>

            <div className={`${base}__field`}>
              <label>Publish Time</label>
              <input type="time" name="time" value={form.time} onChange={handleChange} />
            </div>
          </div>

          {/* TAGS */}
          <div className={`${base}__field`}>
            <label>Blog Tags</label>

            <div className={`${base}__tagInputBox`}>
              <input
                type="text"
                placeholder="Enter tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <button onClick={handleAddTag}>Add</button>
            </div>

            <div className={`${base}__tagList`}>
              {form.tags.map((tag, i) => (
                <span key={i} onClick={() => removeTag(tag)}>
                  {tag} ✕
                </span>
              ))}
            </div>
          </div>

          {/* CONTENT */}
          <div className={`${base}__field`}>
            <label>Blog Content</label>

            <div className={`${base}__editorToolbar`}>
              <FaBold />
              <FaItalic />
              <FaUnderline />
              <FaList />
              <FaImage />
            </div>

            <textarea
              name="content"
              value={form.content}
              placeholder="Write blog content..."
              onChange={handleChange}
            ></textarea>
          </div>

          {/* COURSE */}
          <div className={`${base}__field`}>
            <label>Course Content</label>

            <textarea
              name="course"
              value={form.course}
              placeholder="Write course content..."
              onChange={handleChange}
            ></textarea>
          </div>

          {/* IMAGE */}
          <div className={`${base}__field`}>
            <label>Blog Image</label>

            <input type="file" onChange={handleImageUpload} />

            {form.image && (
              <img className={`${base}__previewImage`} src={form.image} alt="" />
            )}
          </div>

          {/* BUTTONS */}
          <div className={`${base}__actions`}>
            <button
              className="blogposting__draft"
              onClick={() => handlePost("Draft")}
            >
              Save Draft
            </button>

            <button
              className="blogposting__publish"
              onClick={() => handlePost("Published")}
            >
              Post Blog
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className={`${base}__right`}>
        <h3>Recent Blogs</h3>

        {blogs.map((blog) => (
          <div key={blog.id} className={`${base}__previewCard`}>
            <img src={blog.image || "https://via.placeholder.com/70"} alt="" />

            <div>
              <h4>{blog.title}</h4>
              <p>{blog.content.slice(0, 50)}...</p>

              <span>
                {blog.date || "No Date"} • {blog.status}
              </span>

              <div className={`${base}__actionsRow`}>
                <button
                  className="blogposting__btnPublish"
                  onClick={() => toggleStatus(blog.id)}
                >
                  {blog.status === "Published" ? "Unpublish" : "Publish"}
                </button>

                <button
                  className="blogposting__btnEdit"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </button>

                <button
                  className="blogposting__btnDelete"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {blogs.length === 0 && <p>No blogs yet</p>}
      </div>
    </div>
  );
};

export default BlogPosting;