// ============================================
// Filter.jsx
// ============================================

import React, {
  useMemo,
  useState,
} from "react";

import "./Filter.css";

import { IMG_URL } from "../../api/axios";

const Filter = ({ blogs }) => {
  const base = "blog-filter";

  const [search, setSearch] =
    useState("");

  /* CATEGORY COUNTS */
  const categories = useMemo(() => {
    const map = {};

    blogs.forEach((blog) => {
      const cat =
        blog.category ||
        "General";

      map[cat] =
        (map[cat] || 0) + 1;
    });

    return Object.entries(map);
  }, [blogs]);

  /* SEARCHED BLOGS */
  const filtered = blogs.filter(
    (item) =>
      item.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  /* TOP ARTICLES */
  const topArticles =
    filtered.slice(0, 4);

  return (
    <div className={base}>
      {/* SEARCH */}
      <div className={`${base}__card`}>
        <h3
          className={`${base}__title`}
        >
          Filter
        </h3>

        <input
          type="text"
          placeholder="Search"
          className={`${base}__search`}
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </div>

      {/* CATEGORY */}
      <div className={`${base}__card`}>
        <h3
          className={`${base}__title`}
        >
          Categories
        </h3>

        <ul
          className={`${base}__categories`}
        >
          {categories.map(
            ([name, count], i) => (
              <li
                key={i}
                className={`${base}__cat-item`}
              >
                <span>
                  {name}
                </span>

                <span
                  className={`${base}__count`}
                >
                  {count}
                </span>
              </li>
            )
          )}
        </ul>
      </div>

      {/* TOP ARTICLE */}
      <div className={`${base}__card`}>
        <h3
          className={`${base}__title`}
        >
          Top Article
        </h3>

        <div
          className={`${base}__articles`}
        >
          {topArticles.map(
            (item) => (
              <div
                key={item._id}
                className={`${base}__article`}
              >
                <img
                  src={
                    item.image
                      ? `${IMG_URL}${item.image}`
                      : "/no-user.png"
                  }
                  alt=""
                />

                <div
                  className={`${base}__overlay`}
                >
                  <h4>
                    {item.title}
                  </h4>

                  <p>
                    {item.date}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;