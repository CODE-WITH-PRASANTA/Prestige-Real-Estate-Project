import React, {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import "./BackBlog.css";

import API, {
  IMG_URL,
} from "../../api/axios";

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaThumbsUp,
  FaThumbsDown,
  FaUserTie,
} from "react-icons/fa";

const BackBlog = () => {
  const base = "back-blog";

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [blog, setBlog] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // LIKE STATE

  const [reaction, setReaction] =
    useState(null);

  const [yesCount, setYesCount] =
    useState(0);

  const [noCount, setNoCount] =
    useState(0);

  // FETCH BLOG

  useEffect(() => {
    const fetchSingleBlog =
      async () => {
        try {
          const res =
            await API.get(
              `/blogs/${id}`
            );

          const data =
            res.data?.data ||
            res.data;

          setBlog(data);
        } catch (error) {
          console.error(
            "Blog fetch error:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    fetchSingleBlog();
  }, [id]);

  // IMAGE URL

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

  // REMOVE HTML

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

  // TAGS

  const getTags = (
    tags
  ) => {
    if (
      Array.isArray(
        tags
      )
    ) {
      return tags;
    }

    if (
      typeof tags ===
      "string"
    ) {
      try {
        const parsed =
          JSON.parse(
            tags
          );

        return Array.isArray(
          parsed
        )
          ? parsed
          : [];
      } catch {
        return tags
          .split(",")
          .map((tag) =>
            tag.trim()
          );
      }
    }

    return [];
  };

  // LIKE FUNCTION

  const handleReaction = (
    type
  ) => {
    // REMOVE OLD

    if (
      reaction === "yes"
    ) {
      setYesCount(
        (prev) =>
          prev > 0
            ? prev - 1
            : 0
      );
    }

    if (
      reaction === "no"
    ) {
      setNoCount(
        (prev) =>
          prev > 0
            ? prev - 1
            : 0
      );
    }

    // ADD NEW

    if (type === "yes") {
      setYesCount(
        (prev) => prev + 1
      );
    }

    if (type === "no") {
      setNoCount(
        (prev) => prev + 1
      );
    }

    setReaction(type);
  };

  // LOADING

  if (loading) {
    return (
      <div className="back-blog__loading">
        Loading Blog...
      </div>
    );
  }

  // NOT FOUND

  if (!blog) {
    return (
      <div className="back-blog__loading">
        Blog Not Found
      </div>
    );
  }

  const tags =
    getTags(blog.tags);

  return (
    <section
      className={base}
    >
      <div
        className={`${base}__container`}
      >
        {/* BACK */}

        <div
          className={`${base}__back`}
          onClick={() =>
            navigate("/blog")
          }
        >
          <FaArrowLeft />

          <span>
            Back to Blogs
          </span>
        </div>

        {/* HERO */}

        <div
          className={`${base}__hero`}
        >
          <img
            src={getImageUrl(
              blog.image
            )}
            alt={blog.title}
            onError={(e) =>
              (e.target.src =
                "/no-image.png")
            }
          />

          <div
            className={`${base}__overlay`}
          ></div>

          <div
            className={`${base}__heroCard`}
          >
            {/* CATEGORY */}

            <span
              className={`${base}__badge`}
            >
              {blog.category ||
                "Blog"}
            </span>

            {/* TITLE */}

            <h1
              className={`${base}__title`}
            >
              {blog.title}
            </h1>

            {/* META */}

            <div
              className={`${base}__meta`}
            >
              {/* AUTHOR */}

              <div
                className={`${base}__authorMeta`}
              >
                <div
                  className={`${base}__authorIcon`}
                >
                  <FaUserTie />
                </div>

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

                <span>
                  {blog.date
                    ? new Date(
                        blog.date
                      ).toLocaleDateString()
                    : "No Date"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ARTICLE */}

        <div
          className={`${base}__article`}
        >
          {/* CONTENT */}

          <div
            className={`${base}__content`}
          >
            {stripHtml(
              blog.content
            )}
          </div>

          {/* TAGS */}

          <div
            className={`${base}__tags`}
          >
            {tags.length >
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
                    #{tag}
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
        </div>

        {/* HELPFUL */}

        <div
          className={`${base}__helpful`}
        >
          {/* LEFT */}

          <div
            className={`${base}__helpfulLeft`}
          >
            <h4>
              Was this article
              helpful?
            </h4>

            <span>
              Give your
              feedback about
              this article
            </span>
          </div>

          {/* ACTIONS */}

          <div
            className={`${base}__actions`}
          >
            {/* YES */}

            <button
              className={
                reaction ===
                "yes"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleReaction(
                  "yes"
                )
              }
            >
              <FaThumbsUp />

              Yes

              <strong>
                {yesCount}
              </strong>
            </button>

            {/* NO */}

            <button
              className={
                reaction ===
                "no"
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleReaction(
                  "no"
                )
              }
            >
              <FaThumbsDown />

              No

              <strong>
                {noCount}
              </strong>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackBlog;