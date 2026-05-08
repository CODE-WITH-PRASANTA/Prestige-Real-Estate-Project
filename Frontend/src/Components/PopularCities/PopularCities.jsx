import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import "./PopularCities.css";

import API, {
  IMG_URL,
} from "../../api/axios";

import {
  FaCalendarAlt,
  FaUserTie,
  FaArrowRight,
} from "react-icons/fa";

const PopularCities = () => {
  const base =
    "popular-cities";

  const navigate =
    useNavigate();

  const [blogs, setBlogs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // FETCH BLOGS
  // =========================

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

        console.log(
          "BLOG API:",
          res.data
        );

        const data =
          res.data?.data ||
          res.data ||
          [];

        if (
          Array.isArray(
            data
          )
        ) {
          setBlogs(data);
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

  // =========================
  // IMAGE URL
  // =========================

  const getImageUrl = (
    image
  ) => {
    if (!image)
      return "/no-image.png";

    if (
      image.startsWith(
        "http"
      )
    ) {
      return image;
    }

    return `${IMG_URL}${image}`;
  };

  // =========================
  // OPEN BLOG DETAILS
  // =========================

  const openBlogDetails =
    (blogId) => {
      navigate(
        `/blog/${blogId}`
      );
    };

  // =========================
  // REMOVE HTML TAGS
  // =========================

  const stripHtml = (
    html
  ) => {
    const div =
      document.createElement(
        "div"
      );

    div.innerHTML =
      html || "";

    return (
      div.textContent ||
      div.innerText ||
      ""
    );
  };

  // =========================
  // GET TAGS
  // =========================

  const getTags = (
    tags
  ) => {
    // ARRAY TAGS

    if (
      Array.isArray(
        tags
      )
    ) {
      return tags.filter(
        Boolean
      );
    }

    // STRING TAGS

    if (
      typeof tags ===
        "string" &&
      tags.trim()
    ) {
      try {
        const parsed =
          JSON.parse(
            tags
          );

        if (
          Array.isArray(
            parsed
          )
        ) {
          return parsed.filter(
            Boolean
          );
        }
      } catch {
        return tags
          .split(",")
          .map((tag) =>
            tag.trim()
          )
          .filter(
            Boolean
          );
      }
    }

    return [];
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section
        className={base}
      >
        <div
          className={`${base}__container`}
        >
          <div
            className={`${base}__loading`}
          >
            Loading Blogs...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={base}
    >
      <div
        className={`${base}__container`}
      >
        {/* HEADER */}

        <div
          className={`${base}__header`}
        >
          <span
            className={`${base}__subtitle`}
          >
            Latest Blogs
          </span>

          <h2>
            Explore Premium
            Articles &
            Stories
          </h2>

          <p>
            Discover modern
            blogs, trending
            stories and
            premium articles
            from our latest
            collection.
          </p>
        </div>

        {/* EMPTY */}

        {blogs.length ===
        0 ? (
          <div
            className={`${base}__empty`}
          >
            No Blogs Found
          </div>
        ) : (
          <div
            className={`${base}__grid`}
          >
            {blogs.map(
              (blog) => {
                // TAGS

                const tags =
                  getTags(
                    blog.tags
                  );

                return (
                  <div
                    className={`${base}__card`}
                    key={
                      blog._id
                    }
                    onClick={() =>
                      openBlogDetails(
                        blog._id
                      )
                    }
                  >
                    {/* IMAGE */}

                    <div
                      className={`${base}__image`}
                    >
                      <img
                        src={getImageUrl(
                          blog.image
                        )}
                        alt={
                          blog.title
                        }
                        onError={(
                          e
                        ) =>
                          (e.target.src =
                            "/no-image.png")
                        }
                      />

                      {/* OVERLAY */}

                      <div
                        className={`${base}__overlay`}
                      ></div>

                      {/* STATUS */}

                      <span
                        className={`${base}__status ${
                          blog.status ===
                          "Published"
                            ? "published"
                            : "draft"
                        }`}
                      >
                        {blog.status ||
                          "Published"}
                      </span>

                      {/* CATEGORY */}

                      <span
                        className={`${base}__floatingCategory`}
                      >
                        {blog.category ||
                          "Blog"}
                      </span>
                    </div>

                    {/* CONTENT */}

                    <div
                      className={`${base}__content`}
                    >
                      {/* TITLE */}

                      <h3
                        className={`${base}__title`}
                      >
                        {
                          blog.title
                        }
                      </h3>

                      {/* META */}

                      <div
                        className={`${base}__meta`}
                      >
                        {/* OWNER */}

                        <div
                          className={`${base}__author`}
                        >
                          <FaUserTie />

                          <div>
                            <h5>
                              {blog.owner ||
                                "Admin"}
                            </h5>

                            <span>
                              {blog.ownerdesignation ||
                                "Author"}
                            </span>
                          </div>
                        </div>

                        {/* DATE */}

                        <div
                          className={`${base}__date`}
                        >
                          <FaCalendarAlt />

                          {blog.date
                            ? new Date(
                                blog.date
                              ).toLocaleDateString()
                            : "No Date"}
                        </div>
                      </div>

                      {/* DESCRIPTION */}

                      <p
                        className={`${base}__desc`}
                      >
                        {stripHtml(
                          blog.content
                        ).slice(
                          0,
                          170
                        ) ||
                          "No Description Available"}
                        ...
                      </p>

                      {/* TAGS */}

                      <div
                        className={`${base}__tags`}
                      >
                        {tags &&
                        tags.length >
                          0 ? (
                          tags.map(
                            (
                              tag,
                              index
                            ) => (
                              <span
                                key={
                                  index
                                }
                              >
                                #
                                {
                                  tag
                                }
                              </span>
                            )
                          )
                        ) : (
                          <span>
                            #
                            {
                              blog.category
                            }
                          </span>
                        )}
                      </div>

                      {/* BUTTON */}

                      <button
                        className={`${base}__btn`}
                      >
                        Read More

                        <FaArrowRight />
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularCities;