// ============================================
// Blog.jsx
// ============================================

import React, {
  useEffect,
  useState,
} from "react";

import "./Blog.css";

import BlogHero from "../../Components/BlogHero/BlogHero";
import PopularCities from "../../Components/PopularCities/PopularCities";
import Filter from "../../Components/Filter/Filter";

import API from "../../api/axios";

const Blog = () => {
  const base = "blog-page";

  const [blogs, setBlogs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res =
        await API.get("/blogs");

      setBlogs(
        res.data.data || []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={base}>
      <BlogHero />

      <div
        className={`${base}__container`}
      >
        <div
          className={`${base}__left`}
        >
          <PopularCities
            blogs={blogs}
            loading={loading}
          />
        </div>

        <div
          className={`${base}__right`}
        >
          <Filter
            blogs={blogs}
          />
        </div>
      </div>
    </section>
  );
};

export default Blog;