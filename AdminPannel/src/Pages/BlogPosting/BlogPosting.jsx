import React, { useEffect, useState } from "react";
import "./BlogPosting.css";
import { Editor } from "@tinymce/tinymce-react";
import axiosInstance from "../../api/axiosInstance";

const BlogPosting = () => {
  const base = "bp";

  const initialFormState = {
    id: null,
    title: "",
    category: "",
    owner: "",
    ownerdesignation: "",
    date: "",
    content: "",
    tags: [],
    reviews: "",
    image: null,
    imagePreview: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [blogs, setBlogs] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const categories = ["Technology", "Travel", "Health", "Food", "Business"];

  const fetchBlogs = async () => {
    try {
      setTableLoading(true);
      const response = await axiosInstance.get("/api/blogs");
      setBlogs(response.data?.blogs || []);
    } catch (error) {
      console.error("Fetch blogs error:", error);
      alert(error.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const addTag = () => {
    const cleanTag = tagInput.trim();

    if (cleanTag && !form.tags.includes(cleanTag)) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, cleanTag],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const resetForm = () => {
    setForm(initialFormState);
    setTagInput("");
  };

  const validateForm = () => {
    if (!form.title.trim()) return "Blog title is required";
    if (!form.category.trim()) return "Category is required";
    if (!form.owner.trim()) return "Owner name is required";
    if (!form.ownerdesignation.trim()) return "Owner designation is required";
    if (!form.date) return "Date is required";
    if (!form.content.trim()) return "Blog content is required";
    if (!form.id && !form.image) return "Blog image is required";
    return null;
  };

  const buildFormData = () => {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("owner", form.owner);
    formData.append("ownerdesignation", form.ownerdesignation);
    formData.append("date", form.date);
    formData.append("content", form.content);
    formData.append("reviews", form.reviews);
    formData.append("tags", JSON.stringify(form.tags));

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      setLoading(true);

      const formData = buildFormData();

      if (form.id) {
        await axiosInstance.put(`/api/blogs/${form.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Blog updated successfully");
      } else {
        await axiosInstance.post("/api/blogs", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Blog created successfully");
      }

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error("Save blog error:", error);
      alert(error.response?.data?.message || "Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setForm({
      id: blog._id,
      title: blog.title || "",
      category: blog.category || "",
      owner: blog.owner || "",
      ownerdesignation: blog.ownerdesignation || "",
      date: blog.date || "",
      content: blog.content || "",
      tags: blog.tags || [],
      reviews: blog.reviews || "",
      image: null,
      imagePreview: blog.image || "",
    });

    setTagInput("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/api/blogs/${id}`);
      alert("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Delete blog error:", error);
      alert(error.response?.data?.message || "Failed to delete blog");
    }
  };

  return (
    <div className={base}>
      <div className={`${base}__card`}>
        <h2 className={`${base}__title`}>
          {form.id ? "Update Blog" : "Create Blog"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="bp__topRow">
            <div className="bp__fileInput">
              <input type="file" accept="image/*" onChange={handleImage} />
            </div>

            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          {form.imagePreview && (
            <div className="bp__previewWrap">
              <img src={form.imagePreview} className="bp__img" alt="Preview" />
            </div>
          )}

          <div className={`${base}__grid`}>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="owner"
              placeholder="Owner Name"
              value={form.owner}
              onChange={handleChange}
            />

            <input
              type="text"
              name="ownerdesignation"
              placeholder="Owner Designation"
              value={form.ownerdesignation}
              onChange={handleChange}
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>

          <div className={`${base}__editor`}>
            <label className="bp__label">Description of Blog</label>
            <Editor
              apiKey="jeq7g2k84sqpi9364o8x9ptqf09aoesaq8jxmp49dl4sh57z"
              value={form.content}
              onEditorChange={(content) =>
                setForm((prev) => ({ ...prev, content }))
              }
              init={{
                height: 300,
                menubar: false,
                plugins: ["link", "image", "lists", "code"],
                toolbar:
                  "undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | code",
              }}
            />
          </div>

          <div className="bp__bottomGrid">
            <div className="bp__box bp__box--left">
              <label className="bp__label">Tags</label>

              <div className="bp__tagInputWrap">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Enter tag..."
                />
                <button type="button" onClick={addTag}>
                  Add
                </button>
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

          <div className="bp__actionRow">
            <button
              className="bp__submitBtn"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : form.id
                ? "Update Blog"
                : "Submit Blog"}
            </button>

            {form.id && (
              <button
                type="button"
                className="bp__cancelBtn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bp__tableWrap">
        <h2 className="bp__title">All Blogs</h2>

        {tableLoading ? (
          <p className="bp__empty">Loading blogs...</p>
        ) : blogs.length > 0 ? (
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
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    <img src={blog.image} alt={blog.title} />
                  </td>
                  <td>{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>{blog.owner}</td>
                  <td>{blog.ownerdesignation}</td>
                  <td>{blog.date}</td>
                  <td>{blog.tags?.join(", ")}</td>
                  <td>
                    <button
                      type="button"
                      className="bp__edit"
                      onClick={() => handleEdit(blog)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="bp__delete"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="bp__empty">No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default BlogPosting;