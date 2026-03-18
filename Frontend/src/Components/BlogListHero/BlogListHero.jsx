import React from "react";
import "./BlogListHero.css";

const BlogListHero = () => {

  const base = "blog-list-hero";

  return (
    <section className={base}>

      {/* Background layer */}
      <div className={`${base}__bg`} />

      {/* Decorative shapes */}
      <div className={`${base}__shape ${base}__shape--left`} />
      <div className={`${base}__shape ${base}__shape--right`} />

      {/* Content */}
      <div className={`${base}__container`}>

        <h1 className={`${base}__title`}>
          Blog Grid
        </h1>

        <div className={`${base}__breadcrumb`}>

          <span className={`${base}__home`}>
            🏠
          </span>

          <span>Home</span>

          <span className={`${base}__divider`}>
            ›
          </span>

          <span className={`${base}__current`}>
            Blog Grid
          </span>

        </div>

      </div>

    </section>
  );
};

export default BlogListHero;