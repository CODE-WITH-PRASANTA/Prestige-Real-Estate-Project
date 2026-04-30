import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BackBlog.css";

import API, { IMG_URL } from "../../api/axios";
import author from "../../assets/BackBlog.webp";

const BackBlog = () => {
  const base = "back-blog";
  const navigate = useNavigate();
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        const data = res.data?.data || res.data;
        setBlog(data);
      } catch (error) {
        console.error("Blog fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleBlog();
  }, [id]);

  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/1200x600";

    if (image.startsWith("http")) return image;

    if (image.startsWith("/uploads")) {
      return `${IMG_URL}${image}`;
    }

    if (image.startsWith("uploads/")) {
      return `${IMG_URL}/${image}`;
    }

    return `${IMG_URL}/uploads/${image}`;
  };

  if (loading) return <h2 style={{ padding: "40px" }}>Loading...</h2>;

  if (!blog) return <h2 style={{ padding: "40px" }}>Blog Not Found</h2>;

  return (
    <section className={base}>
      <div className={`${base}__container`}>
        {/* BACK */}
        <div
          className={`${base}__back`}
          onClick={() => navigate("/blog")}
          style={{ cursor: "pointer" }}
        >
          <svg viewBox="0 0 24 24" width="20">
            <path fill="currentColor" d="M15 18l-6-6 6-6" />
          </svg>
          <span>Back to Blog</span>
        </div>

        {/* HERO */}
        <div className={`${base}__hero`}>
          <img
            src={getImageUrl(blog.image)}
            alt={blog.title}
            onError={(e) =>
              (e.target.src = "https://via.placeholder.com/1200x600")
            }
          />

          <div className={`${base}__hero-card`}>
            <span className={`${base}__badge`}>
              {blog.tag || "Blog"}
            </span>

            <h1 className={`${base}__title`}>
              {blog.title}
            </h1>

            <div className={`${base}__meta`}>
              <img src={author} alt="author" />

              <span>{blog.author || "Admin"}</span>

              <div className={`${base}__date`}>
                <svg width="16" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2
                    2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V2zm13 8H4v10h16V10z"
                  />
                </svg>

                <span>
                  {new Date(
                    blog.createdAt || blog.date
                  ).toDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ARTICLE */}
        <div className={`${base}__article`}>
          <p>{blog.desc}</p>

          <p>{blog.content}</p>
        </div>

        {/* AUTHOR */}
        <div className={`${base}__author`}>
          <img src={author} alt="author" />

          <div>
            <span className={`${base}__author-role`}>
              Author
            </span>

            <h3>{blog.author || "Admin"}</h3>

            <p>
              Thank you for reading this article.
            </p>
          </div>
        </div>

        {/* HELPFUL */}
        <div className={`${base}__helpful`}>
          <h4>Was this article helpful?</h4>

          <span>18 out of 93 found this helpful</span>

          <div className={`${base}__actions`}>
            <button>👍 Yes</button>
            <button>👎 No</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackBlog;