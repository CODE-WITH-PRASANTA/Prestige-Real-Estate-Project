import React from "react";
import "./AboutHero.css";
import { FaHome } from "react-icons/fa";

const AboutHero = () => {

const base = "about-hero";

return (

<section className={base}>

{/* decorative shapes */}

<div className={`${base}__bg-left`}></div>
<div className={`${base}__bg-right`}></div>

<div className={`${base}__container`}>

<div className={`${base}__content`}>

<h1 className={`${base}__title`}>
About Us
</h1>

<div className={`${base}__breadcrumb`}>

<span className={`${base}__home`}>
<FaHome/>
Home
</span>

<span className={`${base}__arrow`}>
›
</span>

<span className={`${base}__current`}>
About Us
</span>

</div>

</div>

</div>

</section>

);

};

export default AboutHero;