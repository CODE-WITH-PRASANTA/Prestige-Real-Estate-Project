import React from "react";
import "./BlogBreadcrum.css";

const BlogBreadcrum = () => {

  const base = "blog-breadcrumb"; // ✅ MUST match CSS

  return (
    <section className={base}>

      {/* background pattern */}
      <div className={`${base}__bg`} />

      {/* gradient shapes */}
      <div className={`${base}__shape ${base}__shape--left`} />
      <div className={`${base}__shape ${base}__shape--right`} />

      {/* content */}
      <div className={`${base}__container`}>

        <h1 className={`${base}__title`}>
          Blog Details
        </h1>

        <div className={`${base}__breadcrumb`}>

          <span className={`${base}__home`}>
            <i className="fa-solid fa-house"></i>
          </span>

          <span>Home</span>

          <span className={`${base}__divider`}>
            ›
          </span>

          <span className={`${base}__current`}>
            Blog Details
          </span>

        </div>

      </div>

    </section>
  );
};

export default BlogBreadcrum;