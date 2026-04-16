import React, { useEffect, useState } from "react";
import "./BlogPosting.css";
import { Editor } from "@tinymce/tinymce-react";
import { API, IMG_URL } from "../../api/axios"; // ✅ IMPORT ADDED

const initialFormState = {
  _id: null,
  title: "",
  category: "",
  owner: "",
  ownerdesignation: "",
  date: "",
  content: "",
  tags: [],
  reviews: "",
  image: null,
  preview: "",
};

const BlogPosting = () => {
  const base = "bp";

  const [form, setForm] = useState(initialFormState);
  const [blogs, setBlogs] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const categories = ["Technology", "Travel", "Health", "Food", "Business"];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get("/blogs");
      setBlogs(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
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

  const validateForm = () => {
    if (!form.title.trim()) return "Blog title is required";
    if (!form.category.trim()) return "Category is required";
    if (!form.owner.trim()) return "Owner name is required";
    if (!form.ownerdesignation.trim()) return "Owner designation is required";
    if (!form.date) return "Date is required";
    if (!form.content.trim()) return "Blog content is required";
    if (!form._id && !form.image) return "Blog image is required";
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

    const error = validateForm();
    if (error) return alert(error);

    try {
      setLoading(true);
      const formData = buildFormData();

      if (form._id) {
        await API.put(`/blogs/${form._id}`, formData);
        alert("Blog updated successfully");
      } else {
        await API.post("/blogs", formData);
        alert("Blog created successfully");
      }

      resetForm();
      fetchBlogs();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialFormState);
    setTagInput("");
  };

  // ✅ FIXED EDIT IMAGE PREVIEW
  const handleEdit = (blog) => {
    setForm({
      ...blog,
      _id: blog._id,
      image: null,
      preview: blog.image ? IMG_URL + blog.image : "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={base}>
      <div className={`${base}__card`}>
        <h2 className={`${base}__title`}>
          {form._id ? "Update Blog" : "Create Blog"}
        </h2>

        <div className="bp__topRow">
          <div className="bp__fileInput">
            <input
              type="file"
              onChange={handleImage}
              key={form.preview || ""}
            />
          </div>

          <input
            name="title"
            placeholder="Blog Title"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        {(form.preview || form.image) && (
          <div className="bp__previewWrap">
            <img
              src={
                form.preview || (form.image && URL.createObjectURL(form.image))
              }
              className="bp__img"
              alt=""
              onError={(e) => (e.target.src = "/no-user.png")}
            />
          </div>
        )}

        <div className={`${base}__grid`}>
          <select name="category" value={form.category} onChange={handleChange}>
            <option>Select Category</option>
            {categories.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>

          <input
            name="owner"
            placeholder="Owner Name"
            value={form.owner}
            onChange={handleChange}
          />

          <input
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
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
            }}
            value={form.content}
            onEditorChange={(content) =>
              setForm((prev) => ({ ...prev, content }))
            }
          />
        </div>

        <div className="bp__bottomGrid">
          <div className="bp__box bp__box--left">
            <label className="bp__label">Tags</label>

            <div className="bp__tagInputWrap">
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <button onClick={addTag}>Add</button>
            </div>

            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              value={form.title}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="bp__actionRow">
          <button className="bp__submitBtn" onClick={handleSubmit}>
            {form._id ? "Update Blog" : "Submit Blog"}
          </button>
        </div>
      </div>

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
              <tr key={b._id}>
                <td>
                  <img
                    src={b.image ? IMG_URL + b.image : "/no-user.png"}
                    alt=""
                    onError={(e) => (e.target.src = "/no-user.png")}
                  />
                </td>
                <td>{b.title}</td>
                <td>{b.category}</td>
                <td>{b.owner}</td>
                <td>{b.ownerdesignation}</td>
                <td>{b.date}</td>
                <td>{b.tags?.join(", ")}</td>
                <td>
                  <button className="bp__edit" onClick={() => handleEdit(b)}>
                    Edit
                  </button>
                  <button
                    className="bp__delete"
                    onClick={() => handleDelete(b._id)}
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
  );
};

export default BlogPosting;
