// ============================================
// FRONTEND
// BlogDetails.jsx
// FULL FINAL VERSION
// ============================================

import React, {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  Link,
} from "react-router-dom";

import "./BlogDetails.css";

import API, {
  IMG_URL,
} from "../../api/axios";

const BlogDetails = () => {
  const base =
    "blog-details";

  const { id } =
    useParams();

  const [blog, setBlog] =
    useState(null);

  const [recentBlogs,
    setRecentBlogs] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchBlog();
    fetchRecent();
  }, [id]);

  /* SINGLE BLOG */
  const fetchBlog =
    async () => {
      try {
        const res =
          await API.get(
            `/blogs/${id}`
          );

        setBlog(
          res.data.data
        );
      } catch (error) {
        console.error(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  /* RECENT BLOGS */
  const fetchRecent =
    async () => {
      try {
        const res =
          await API.get(
            "/blogs"
          );

        const others =
          res.data.data
            .filter(
              (
                item
              ) =>
                item._id !==
                id
            )
            .slice(
              0,
              3
            );

        setRecentBlogs(
          others
        );
      } catch (error) {
        console.error(
          error
        );
      }
    };

  if (loading)
    return (
      <h2>
        Loading...
      </h2>
    );

  if (!blog)
    return (
      <h2>
        Blog Not
        Found
      </h2>
    );

  return (
    <section
      className={
        base
      }
    >
      <div
        className={`${base}__container`}
      >
        {/* HERO IMAGE */}
        <img
          className={`${base}__hero`}
          src={`${IMG_URL}${blog.image}`}
          alt=""
        />

        {/* META */}
        <div
          className={`${base}__meta`}
        >
          <span>
            {
              blog.category
            }
          </span>

          <span>
            👤{" "}
            {
              blog.owner
            }
          </span>

          <span>
            📅{" "}
            {
              blog.date
            }
          </span>
        </div>

        {/* TITLE */}
        <h1
          className={`${base}__title`}
        >
          {
            blog.title
          }
        </h1>

        {/* CONTENT */}
        <div
          className={`${base}__desc`}
          dangerouslySetInnerHTML={{
            __html:
              blog.content,
          }}
        />

        {/* TAGS */}
        {blog.tags &&
          blog.tags
            .length >
            0 && (
            <div
              className={`${base}__tags`}
            >
              {blog.tags.map(
                (
                  tag,
                  i
                ) => (
                  <span
                    key={
                      i
                    }
                  >
                    #
                    {
                      tag
                    }
                  </span>
                )
              )}
            </div>
          )}

        {/* RECENT BLOGS */}
        <h2>
          Recent
          Blogs
        </h2>

        <div
          className={`${base}__grid`}
        >
          {recentBlogs.map(
            (
              item
            ) => (
              <Link
                key={
                  item._id
                }
                to={`/blog/${item._id}`}
                className={`${base}__card`}
              >
                <img
                  src={`${IMG_URL}${item.image}`}
                  alt=""
                />

                <h4>
                  {
                    item.title
                  }
                </h4>
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;