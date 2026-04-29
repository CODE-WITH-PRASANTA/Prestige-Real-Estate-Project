// ============================================
// PopularCities.jsx
// CLICK BLOG → BLOG DETAILS
// ============================================

import React, {
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import "./PopularCities.css";

import {
  IMG_URL,
} from "../../api/axios";

const PopularCities = ({
  blogs,
  loading,
}) => {
  const base =
    "popular-cities";

  const [visible, setVisible] =
    useState(3);

  const showBlogs =
    blogs.slice(
      0,
      visible
    );

  return (
    <section className={base}>
      <div
        className={`${base}__container`}
      >
        {loading ? (
          <h2>
            Loading...
          </h2>
        ) : showBlogs.length >
          0 ? (
          showBlogs.map(
            (blog) => (
              <Link
                key={
                  blog._id
                }
                to={`/blog/${blog._id}`}
                className={`${base}__card`}
              >
                {/* IMAGE */}
                <div
                  className={`${base}__image`}
                >
                  <img
                    src={
                      blog.image
                        ? `${IMG_URL}${blog.image}`
                        : "/no-user.png"
                    }
                    alt=""
                  />
                </div>

                {/* CONTENT */}
                <div
                  className={`${base}__content`}
                >
                  <div
                    className={`${base}__meta`}
                  >
                    <span
                      className={`${base}__tag`}
                    >
                      {
                        blog.category
                      }
                    </span>

                    <div
                      className={`${base}__author`}
                    >
                      👤{" "}
                      {blog.owner ||
                        "Admin"}

                      <span
                        className={`${base}__date`}
                      >
                        📅{" "}
                        {blog.date}
                      </span>
                    </div>
                  </div>

                  <h3
                    className={`${base}__title`}
                  >
                    {
                      blog.title
                    }
                  </h3>

                  <div
                    className={`${base}__desc`}
                    dangerouslySetInnerHTML={{
                      __html:
                        blog.content,
                    }}
                  />
                </div>
              </Link>
            )
          )
        ) : (
          <h2>
            No Blogs
          </h2>
        )}

        {visible <
          blogs.length && (
          <div
            className={`${base}__loadmore`}
          >
            <button
              className={`${base}__btn`}
              onClick={() =>
                setVisible(
                  visible +
                    3
                )
              }
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularCities;