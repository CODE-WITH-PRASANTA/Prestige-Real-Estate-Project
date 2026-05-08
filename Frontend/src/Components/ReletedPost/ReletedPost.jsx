import React, { useEffect, useState } from "react";
import "./ReletedPost.css";
import { Link } from "react-router-dom";
import API from "../../api/axios";

const ReletedPost = () => {
  const base = "related-post";

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const cardsPerPage = 3;

  const BACKEND_URL = "http://localhost:5000";

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await API.get("/blogs");

      console.log("BLOG DATA:", res.data);

      if (res.data.success) {
        setPosts(res.data.data);
      }
    } catch (error) {
      console.log("BLOG FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(
    posts.length / cardsPerPage
  );

  const startIndex = (page - 1) * cardsPerPage;

  const currentPosts = posts.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  return (
    <section className={base}>
      <div className={`${base}__container`}>

        {/* HEADER */}
        <div className={`${base}__header`}>

          <div>

            <span className={`${base}__subtitle`}>
              Latest Blogs
            </span>

            <h2>Related Post</h2>

            <p className={`${base}__section-desc`}>
              Discover the latest real estate insights,
              property updates, investment tips and
              trending housing news from our expert team.
            </p>

          </div>

          {/* NAVIGATION */}
          <div className={`${base}__nav`}>

            <button
              disabled={page === 1}
              onClick={() =>
                setPage((prev) => prev - 1)
              }
            >
              ❮
            </button>

            <button
              disabled={page === totalPages}
              onClick={() =>
                setPage((prev) => prev + 1)
              }
            >
              ❯
            </button>

          </div>

        </div>

        {/* LOADING */}
        {loading ? (
          <div className={`${base}__loading`}>
            Loading...
          </div>
        ) : (
          <>
            {/* BLOG GRID */}
            <div className={`${base}__grid`}>

              {currentPosts.map((post) => {

                console.log(post);

                return (

                  <Link
                    to={`/blog/${post._id}`}
                    key={post._id}
                    className={`${base}__card`}
                  >

                    {/* IMAGE */}
                    <div className={`${base}__image-wrapper`}>

                      <img
                        src={
                          post.image
                            ? `${BACKEND_URL}${post.image}`
                            : "https://via.placeholder.com/600x400"
                        }
                        alt={post.title}
                      />

                      {/* STATUS */}
                      <span className={`${base}__status`}>
                        {post.status || "Published"}
                      </span>

                    </div>

                    {/* CONTENT */}
                    <div className={`${base}__content`}>

                      {/* CATEGORY */}
                      <span className={`${base}__category`}>
                        {post.category || "Property"}
                      </span>

                      {/* TITLE */}
                      <h3>
                        {post.title || "No Title"}
                      </h3>

                      {/* META */}
                      <div className={`${base}__meta`}>

                        <div className={`${base}__meta-item`}>
                          <span>👤</span>

                          <span>
                            {post.author || "Admin"}
                          </span>
                        </div>

                        <div className={`${base}__meta-item`}>
                          <span>📅</span>

                          <span>
                            {post.createdAt
                              ? new Date(
                                  post.createdAt
                                ).toLocaleDateString()
                              : "No Date"}
                          </span>
                        </div>

                      </div>

                      {/* DESCRIPTION */}
                      <p className={`${base}__description`}>

                        {(
                          post.description ||
                          post.desc ||
                          post.content ||
                          post.blogDescription ||
                          post.shortDescription ||
                          ""
                        )
                          .replace(/<[^>]*>?/gm, "")
                          .slice(0, 140) ||
                          "No Description"}

                      </p>

                      {/* TAG */}
                      <div className={`${base}__tag`}>
                        #{post.tags || "RealEstate"}
                      </div>

                    </div>

                  </Link>

                );
              })}

            </div>

            {/* EMPTY */}
            {posts.length === 0 && (
              <div className={`${base}__empty`}>
                No Blogs Found
              </div>
            )}

          </>
        )}
      </div>
    </section>
  );
};

export default ReletedPost;