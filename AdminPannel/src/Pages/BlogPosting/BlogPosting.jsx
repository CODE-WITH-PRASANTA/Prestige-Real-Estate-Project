import React, {
  useEffect,
  useState,
} from "react";

import "./BlogPosting.css";

import { Editor } from "@tinymce/tinymce-react";

import {
  API,
  IMG_URL,
} from "../../api/axios";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

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

  const navigate = useNavigate();

  const { id } = useParams();

  const [form, setForm] =
    useState(
      initialFormState
    );

  const [blogs, setBlogs] =
    useState([]);

  const [tagInput, setTagInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const categories = [
    "Technology",
    "Travel",
    "Health",
    "Food",
    "Business",
  ];

  // =========================================
  // FETCH BLOGS
  // =========================================

  const fetchBlogs =
    async () => {
      try {
        const res =
          await API.get(
            "/blogs"
          );

        if (
          Array.isArray(
            res.data.data
          )
        ) {
          setBlogs(
            res.data.data
          );
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error(err);
      }
    };

  // =========================================
  // FETCH SINGLE BLOG
  // =========================================

  const fetchSingleBlog =
    async () => {
      try {
        const res =
          await API.get(
            `/blogs/${id}`
          );

        const blog =
          res.data.data;

        if (blog) {
          setForm({
            _id: blog._id,
            title:
              blog.title || "",
            category:
              blog.category || "",
            owner:
              blog.owner || "",
            ownerdesignation:
              blog.ownerdesignation ||
              "",
            date:
              blog.date || "",
            content:
              blog.content || "",
            tags:
              Array.isArray(
                blog.tags
              )
                ? blog.tags
                : [],
            reviews:
              blog.reviews || "",
            image: null,
            preview:
              blog.image
                ? `${IMG_URL}${blog.image}`
                : "",
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

  // =========================================
  // USE EFFECT
  // =========================================

  useEffect(() => {
    fetchBlogs();

    if (id) {
      fetchSingleBlog();
    }
  }, [id]);

  // =========================================
  // HANDLE CHANGE
  // =========================================

  const handleChange = (
    e
  ) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // HANDLE IMAGE
  // =========================================

  const handleImage = (
    e
  ) => {
    const file =
      e.target.files[0];

    if (file) {
      setForm((prev) => ({
        ...prev,
        image: file,
        preview:
          URL.createObjectURL(
            file
          ),
      }));
    }
  };

  // =========================================
  // ADD TAG
  // =========================================

  const addTag = () => {
    const cleanTag =
      tagInput.trim();

    if (
      cleanTag &&
      !form.tags.includes(
        cleanTag
      )
    ) {
      setForm((prev) => ({
        ...prev,
        tags: [
          ...prev.tags,
          cleanTag,
        ],
      }));

      setTagInput("");
    }
  };

  // =========================================
  // REMOVE TAG
  // =========================================

  const removeTag = (
    removeTag
  ) => {
    setForm((prev) => ({
      ...prev,
      tags:
        prev.tags.filter(
          (tag) =>
            tag !== removeTag
        ),
    }));
  };

  // =========================================
  // VALIDATE
  // =========================================

  const validateForm = () => {
    if (!form.title.trim())
      return "Blog title is required";

    if (!form.category.trim())
      return "Category is required";

    if (!form.owner.trim())
      return "Owner name is required";

    if (
      !form.ownerdesignation.trim()
    )
      return "Owner designation is required";

    if (!form.date)
      return "Date is required";

    if (!form.content.trim())
      return "Blog content is required";

    if (
      !form._id &&
      !form.image
    )
      return "Blog image is required";

    return null;
  };

  // =========================================
  // BUILD FORM DATA
  // =========================================

  const buildFormData =
    () => {
      const formData =
        new FormData();

      formData.append(
        "title",
        form.title
      );

      formData.append(
        "category",
        form.category
      );

      formData.append(
        "owner",
        form.owner
      );

      formData.append(
        "ownerdesignation",
        form.ownerdesignation
      );

      formData.append(
        "date",
        form.date
      );

      formData.append(
        "content",
        form.content
      );

      formData.append(
        "reviews",
        form.reviews
      );

      formData.append(
        "tags",
        JSON.stringify(
          form.tags
        )
      );

      if (
        form.image instanceof
        File
      ) {
        formData.append(
          "image",
          form.image
        );
      }

      return formData;
    };

  // =========================================
  // SUBMIT
  // =========================================

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      const error =
        validateForm();

      if (error)
        return alert(error);

      try {
        setLoading(true);

        const formData =
          buildFormData();

        if (form._id) {
          await API.put(
            `/blogs/${form._id}`,
            formData
          );

          alert(
            "Blog updated successfully"
          );
        } else {
          await API.post(
            "/blogs",
            formData
          );

          alert(
            "Blog created successfully"
          );
        }

        resetForm();

        fetchBlogs();

        navigate(
          "/blog/manage"
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  // =========================================
  // RESET
  // =========================================

  const resetForm = () => {
    setForm(
      initialFormState
    );

    setTagInput("");
  };

  // =========================================
  // DELETE
  // =========================================

  const handleDelete =
    async (id) => {
      try {
        const confirmDelete =
          window.confirm(
            "Delete this blog?"
          );

        if (
          !confirmDelete
        )
          return;

        await API.delete(
          `/blogs/${id}`
        );

        fetchBlogs();
      } catch (err) {
        console.error(err);
      }
    };

  return (
    <div className={base}>
      {/* FORM */}

      <div
        className={`${base}__card`}
      >
        <h2
          className={`${base}__title`}
        >
          {form._id
            ? "Update Blog"
            : "Create Blog"}
        </h2>

        {/* TOP */}

        <div className="bp__topRow">
          <div className="bp__fileInput">
            <input
              type="file"
              onChange={
                handleImage
              }
            />
          </div>

          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={form.title}
            onChange={
              handleChange
            }
          />
        </div>

        {/* IMAGE */}

        {form.preview && (
          <div className="bp__previewWrap">
            <img
              src={form.preview}
              alt=""
              className="bp__img"
            />
          </div>
        )}

        {/* GRID */}

        <div
          className={`${base}__grid`}
        >
          <select
            name="category"
            value={
              form.category
            }
            onChange={
              handleChange
            }
          >
            <option value="">
              Select Category
            </option>

            {categories.map(
              (c, i) => (
                <option
                  key={i}
                  value={c}
                >
                  {c}
                </option>
              )
            )}
          </select>

          <input
            name="owner"
            placeholder="Owner Name"
            value={form.owner}
            onChange={
              handleChange
            }
          />

          <input
            name="ownerdesignation"
            placeholder="Owner Designation"
            value={
              form.ownerdesignation
            }
            onChange={
              handleChange
            }
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={
              handleChange
            }
          />
        </div>

        {/* EDITOR */}

        <div
          className={`${base}__editor`}
        >
          <label className="bp__label">
            Description of Blog
          </label>

          <Editor
            apiKey="jeq7g2k84sqpi9364o8x9ptqf09aoesaq8jxmp49dl4sh57z"
            value={
              form.content
            }
            init={{
              height: 450,

              menubar: false,

              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",

              toolbar:
                "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image media | removeformat",
            }}
            onEditorChange={(
              content
            ) =>
              setForm(
                (prev) => ({
                  ...prev,
                  content,
                })
              )
            }
          />
        </div>

        {/* TAGS */}

        <div className="bp__bottomGrid">
          <div className="bp__box">
            <label className="bp__label">
              Tags
            </label>

            <div className="bp__tagInputWrap">
              <input
                type="text"
                value={
                  tagInput
                }
                placeholder="Add tag"
                onChange={(
                  e
                ) =>
                  setTagInput(
                    e.target
                      .value
                  )
                }
              />

              <button
                type="button"
                onClick={
                  addTag
                }
              >
                Add
              </button>
            </div>

            <div className="bp__tagList">
              {form.tags.map(
                (
                  tag,
                  index
                ) => (
                  <span
                    key={
                      index
                    }
                  >
                    #{tag}

                    <button
                      type="button"
                      onClick={() =>
                        removeTag(
                          tag
                        )
                      }
                    >
                      ×
                    </button>
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* BUTTON */}

        <div className="bp__actionRow">
          <button
            className="bp__submitBtn"
            onClick={
              handleSubmit
            }
            disabled={
              loading
            }
          >
            {loading
              ? "Processing..."
              : form._id
              ? "Update Blog"
              : "Submit Blog"}
          </button>
        </div>
      </div>

      {/* TABLE */}

      <div className="bp__tableWrap">
        <h2 className="bp__title">
          All Blogs
        </h2>

        <table className="bp__table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Owner</th>
              <th>Date</th>
              <th>Description</th>
              <th>Tags</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((b) => (
              <tr key={b._id}>
                <td>
                  <img
                    src={
                      b.image
                        ? `${IMG_URL}${b.image}`
                        : "/no-user.png"
                    }
                    alt=""
                  />
                </td>

                <td>
                  {b.title}
                </td>

                <td>
                  {b.category}
                </td>

                <td>
                  {b.owner}
                </td>

                <td>
                  {b.date}
                </td>

                <td>
                  <div
                    className="bp__tableDescription"
                    dangerouslySetInnerHTML={{
                      __html:
                        b.content ||
                        "No Description",
                    }}
                  />
                </td>

                <td>
                  <div className="bp__tableTags">
                    {b.tags?.map(
                      (
                        tag,
                        index
                      ) => (
                        <span
                          key={
                            index
                          }
                        >
                          #{tag}
                        </span>
                      )
                    )}
                  </div>
                </td>

                <td>
                  <div className="bp__actionBtns">
                    <button
                      className="bp__edit"
                      onClick={() =>
                        navigate(
                          `/blog/post/${b._id}`
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="bp__delete"
                      onClick={() =>
                        handleDelete(
                          b._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
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