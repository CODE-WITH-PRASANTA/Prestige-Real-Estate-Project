import React from "react";
import "./Blog.css";

import BlogHero from "../../Components/BlogHero/BlogHero";
import PopularCities from "../../Components/PopularCities/PopularCities";
import Filter from "../../Components/Filter/Filter";

const Blog = () => {
  const base = "blog-page";

  return (
    <section className={base}>
      
      {/* HERO */}
      <BlogHero />

      {/* CONTENT AREA */}
      <div className={`${base}__container`}>

        {/* LEFT BLOGS */}
        <div className={`${base}__left`}>
          <PopularCities />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className={`${base}__right`}>
          <Filter />
        </div>

      </div>

    </section>
  );
};

export default Blog;