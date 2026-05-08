import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PopularCities.css";
import API, { IMG_URL } from "../../api/axios";

const PopularCities = () => {
  const base = "popular-cities";
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs");
        const data = res.data?.data || res.data || [];
        setBlogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/300";

    if (image.startsWith("http")) return image;

    if (image.startsWith("/uploads")) return `${IMG_URL}${image}`;

    if (image.startsWith("uploads/")) return `${IMG_URL}/${image}`;

    return `${IMG_URL}/uploads/${image}`;
  };

  // ✅ OPEN DIFFERENT BLOG DETAILS PAGE
  const openBlogDetails = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  if (loading) {
    return (
      <section className={base}>
        <div className={`${base}__container`}>
          <p>Loading blogs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={base}>
      <div className={`${base}__container`}>
        {blogs.length === 0 ? (
          <p>No blogs found</p>
        ) : (
          blogs.map((blog) => (
            <div
              className={`${base}__card`}
              key={blog._id}
              onClick={() => openBlogDetails(blog._id)}
              style={{ cursor: "pointer" }}
            >
              <div className={`${base}__image`}>
                <img
                  src={getImageUrl(blog.image)}
                  alt={blog.title}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300")
                  }
                />
              </div>

              <div className={`${base}__content`}>
                <div className={`${base}__meta`}>
                  <span className={`${base}__tag`}>
                    {blog.tag || "Blog"}
                  </span>

                  <div className={`${base}__author`}>
                    <span>👤 {blog.author || "Admin"}</span>

                    <span className={`${base}__date`}>
                      📅{" "}
                      {new Date(
                        blog.createdAt || blog.date
                      ).toDateString()}
                    </span>
                  </div>
                </div>

                <h3 className={`${base}__title`}>
                  {blog.title}
                </h3>

                <p className={`${base}__desc`}>
                  {blog.desc}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default PopularCities;