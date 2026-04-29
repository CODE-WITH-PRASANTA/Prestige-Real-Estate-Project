import React, { useEffect, useState } from "react";
import "./PopularCities.css";
import API, { IMG_URL } from "../../api/axios";

const PopularCities = () => {
  const base = "popular-cities";

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs");

        console.log("API RESPONSE:", res.data);

        const data = res.data?.data || res.data || [];

        setBlogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Fetch error:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // ✅ FIXED IMAGE HANDLER (handles all backend formats)
  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/300";

    // full URL already
    if (image.startsWith("http")) return image;

    // already correct backend format
    if (image.startsWith("/uploads")) {
      return `${IMG_URL}${image}`;
    }

    // uploads/filename.jpg format
    if (image.startsWith("uploads/")) {
      return `${IMG_URL}/${image}`;
    }

    // fallback (just filename)
    return `${IMG_URL}/uploads/${image}`;
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
            <div className={`${base}__card`} key={blog._id || blog.id}>

              <div className={`${base}__image`}>
                <img
                  src={getImageUrl(blog.image || blog.imageUrl || blog.photo)}
                  alt={blog.title || "blog"}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300";
                  }}
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
                      {blog.date
                        ? new Date(blog.date).toDateString()
                        : "No date"}
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

        <div className={`${base}__loadmore`}>
          <button className={`${base}__btn`}>
            ↻ Load More
          </button>
        </div>

      </div>
    </section>
  );
};

export default PopularCities;