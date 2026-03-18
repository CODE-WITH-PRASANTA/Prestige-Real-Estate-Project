import React from "react";
import "./PropertyHero.css";

const PropertyHero = () => {

  const base = "property-hero";

  return (

    <section className={base}>

      {/* background decorative shapes */}
      <span className={`${base}__shape ${base}__shape--1`}></span>
      <span className={`${base}__shape ${base}__shape--2`}></span>
      <span className={`${base}__shape ${base}__shape--3`}></span>

      <div className={`${base}__container`}>

        {/* TITLE */}
        <h1 className={`${base}__title`}>
          Add New Property
        </h1>

        {/* BREADCRUMB */}
        <div className={`${base}__breadcrumb`}>

          <span className={`${base}__home`}>
            🏠 Home
          </span>

          <span className={`${base}__arrow`}>
            ›
          </span>

          <span className={`${base}__current`}>
            Add New Property
          </span>

        </div>

      </div>

    </section>

  );
};

export default PropertyHero;