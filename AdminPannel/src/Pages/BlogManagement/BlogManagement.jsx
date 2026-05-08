import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import "./BlogManagement.css";

import {
  FaEllipsisV,
  FaEye,
  FaEdit,
  FaCalendarAlt,
  FaTimes,
  FaUserTie,
} from "react-icons/fa";

import {
  RiDeleteBin6Line,
  RiDraftLine,
} from "react-icons/ri";

import {
  API,
  IMG_URL,
} from "../../api/axios";

import { useNavigate } from "react-router-dom";

const BlogManagement = () => {
  const [blogs, setBlogs] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [openMenu, setOpenMenu] =
    useState(null);

  const [viewBlog, setViewBlog] =
    useState(null);

  const menuRef = useRef();

  const navigate =
    useNavigate();

  // =========================================
  // FETCH BLOGS
  // =========================================

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs =
    async () => {
      try {
        setLoading(true);

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
      } catch (error) {
        console.log(error);

        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

  // =========================================
  // OUTSIDE CLICK
  // =========================================

  useEffect(() => {
    const handleOutside = (
      e
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target
        )
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutside
      );
    };
  }, []);

  // =========================================
  // MENU
  // =========================================

  const toggleMenu = (
    id
  ) => {
    setOpenMenu((prev) =>
      prev === id
        ? null
        : id
    );
  };

  // =========================================
  // VIEW
  // =========================================

  const handleView = (
    blog,
    e
  ) => {
    e.stopPropagation();

    setViewBlog(blog);

    setOpenMenu(null);
  };

  // =========================================
  // EDIT
  // =========================================

  const handleEdit = (
    blog,
    e
  ) => {
    e.stopPropagation();

    setOpenMenu(null);

    navigate(
      `/blog/post/${blog._id}`
    );
  };

  // =========================================
  // PUBLISH
  // =========================================

  const handlePublish =
    async (blog, e) => {
      e.stopPropagation();

      try {
        const newStatus =
          blog.status ===
          "Published"
            ? "Draft"
            : "Published";

        await API.put(
          `/blogs/${blog._id}`,
          {
            status:
              newStatus,
          }
        );

        setBlogs((prev) =>
          prev.map((item) =>
            item._id ===
            blog._id
              ? {
                  ...item,
                  status:
                    newStatus,
                }
              : item
          )
        );
      } catch (error) {
        console.log(error);
      }

      setOpenMenu(null);
    };

  // =========================================
  // DELETE
  // =========================================

  const handleDelete =
    async (id, e) => {
      e.stopPropagation();

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

        setBlogs((prev) =>
          prev.filter(
            (item) =>
              item._id !==
              id
          )
        );
      } catch (error) {
        console.log(error);
      }

      setOpenMenu(null);
    };

  return (
    <>
      <div className="bm-wrapper">
        {/* HEADER */}

        <div className="bm-header">
          <div>
            <h2>
              Blog Management
            </h2>

            <p>
              Manage all blogs,
              categories,
              tags,
              publishing and
              article content
              from one
              dashboard.
            </p>
          </div>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="bm-loading">
            Loading Blogs...
          </div>
        ) : blogs.length ===
          0 ? (
          <div className="bm-loading">
            No Blogs Found
          </div>
        ) : (
          <div className="bm-blog-grid">
            {blogs.map(
              (blog) => (
                <div
                  className="bm-blog-card"
                  key={
                    blog._id
                  }
                >
                  {/* IMAGE */}

                  <div className="bm-blog-image">
                    <img
                      src={
                        blog.image
                          ? blog.image.startsWith(
                              "http"
                            )
                            ? blog.image
                            : `${IMG_URL}${blog.image}`
                          : "/no-image.png"
                      }
                      alt={
                        blog.title
                      }
                    />

                    {/* STATUS */}

                    <span
                      className={`bm-badge ${
                        blog.status ===
                        "Published"
                          ? "published"
                          : "draft"
                      }`}
                    >
                      {blog.status}
                    </span>

                    {/* MENU */}

                    <button
                      className="bm-menu-btn"
                      onClick={(
                        e
                      ) => {
                        e.stopPropagation();

                        toggleMenu(
                          blog._id
                        );
                      }}
                    >
                      <FaEllipsisV />
                    </button>

                    {/* DROPDOWN */}

                    {openMenu ===
                      blog._id && (
                      <div
                        className="bm-dropdown"
                        ref={
                          menuRef
                        }
                      >
                        <button
                          onClick={(
                            e
                          ) =>
                            handleView(
                              blog,
                              e
                            )
                          }
                        >
                          <FaEye />
                          View
                        </button>

                        <button
                          onClick={(
                            e
                          ) =>
                            handleEdit(
                              blog,
                              e
                            )
                          }
                        >
                          <FaEdit />
                          Edit
                        </button>

                        <button
                          onClick={(
                            e
                          ) =>
                            handlePublish(
                              blog,
                              e
                            )
                          }
                        >
                          <RiDraftLine />

                          {blog.status ===
                          "Published"
                            ? "Unpublish"
                            : "Publish"}
                        </button>

                        <button
                          className="delete"
                          onClick={(
                            e
                          ) =>
                            handleDelete(
                              blog._id,
                              e
                            )
                          }
                        >
                          <RiDeleteBin6Line />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}

                  <div className="bm-blog-content">
                    <p className="bm-category">
                      {
                        blog.category
                      }
                    </p>

                    <h3>
                      {blog.title}
                    </h3>

                    {/* OWNER */}

                    <div className="bm-owner">
                      <FaUserTie />

                      <div>
                        <h4>
                          {
                            blog.owner
                          }
                        </h4>

                        <span>
                          {
                            blog.ownerdesignation
                          }
                        </span>
                      </div>
                    </div>

                    {/* DATE */}

                    <div className="bm-date">
                      <FaCalendarAlt />

                      {blog.date}
                    </div>

                    {/* DESCRIPTION */}

                    <div
                      className="bm-description"
                      dangerouslySetInnerHTML={{
                        __html:
                          blog.content ||
                          "No Description Available",
                      }}
                    ></div>

                    {/* TAGS */}

                    <div className="bm-tags">
                      {Array.isArray(
                        blog.tags
                      ) &&
                      blog.tags
                        .length >
                        0 ? (
                        blog.tags.map(
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
                        )
                      ) : (
                        <span>
                          No Tags
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      {/* VIEW MODAL */}

      {viewBlog && (
        <div
          className="bm-view-overlay"
          onClick={() =>
            setViewBlog(null)
          }
        >
          <div
            className="bm-view-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* CLOSE */}

            <button
              className="bm-close-btn"
              onClick={() =>
                setViewBlog(null)
              }
            >
              <FaTimes />
            </button>

            {/* TOP IMAGE */}

            <div className="bm-view-top">
              <img
                src={
                  viewBlog.image
                    ? viewBlog.image.startsWith(
                        "http"
                      )
                      ? viewBlog.image
                      : `${IMG_URL}${viewBlog.image}`
                    : "/no-image.png"
                }
                alt={
                  viewBlog.title
                }
                className="bm-view-image"
              />
            </div>

            {/* CONTENT */}

            <div className="bm-view-content">
              {/* CATEGORY */}

              <div className="bm-view-category">
                {
                  viewBlog.category
                }
              </div>

              {/* TITLE */}

              <h2 className="bm-view-title">
                {viewBlog.title}
              </h2>

              {/* META */}

              <div className="bm-view-meta">
                <div className="bm-owner">
                  <FaUserTie />

                  <div>
                    <h4>
                      {
                        viewBlog.owner
                      }
                    </h4>

                    <span>
                      {
                        viewBlog.ownerdesignation
                      }
                    </span>
                  </div>
                </div>

                <div className="bm-date">
                  <FaCalendarAlt />

                  {viewBlog.date}
                </div>
              </div>

              {/* DESCRIPTION */}

              <div
                className="bm-view-description"
                dangerouslySetInnerHTML={{
                  __html:
                    viewBlog.content ||
                    "No Description Available",
                }}
              ></div>

              {/* TAGS */}

              <div className="bm-tags">
                {Array.isArray(
                  viewBlog.tags
                ) &&
                viewBlog.tags
                  .length > 0 ? (
                  viewBlog.tags.map(
                    (
                      tag,
                      index
                    ) => (
                      <span
                        key={index}
                      >
                        #{tag}
                      </span>
                    )
                  )
                ) : (
                  <span>
                    No Tags
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogManagement;