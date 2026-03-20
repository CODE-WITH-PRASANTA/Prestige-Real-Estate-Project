import React, { useState } from "react";
import "./AboutUs.css";
import { FaHome, FaShieldAlt, FaLeaf, FaBuilding, FaPlay, FaTimes } from "react-icons/fa";

import mainImg from "../../assets/About2.webp";
import videoImg from "../../assets/About3.webp";

const AboutUs = () => {

const base = "about-us";
const [videoOpen, setVideoOpen] = useState(false);

return (

<section className={base}>

<div className={`${base}__container`}>

{/* LEFT IMAGE AREA */}

<div className={`${base}__image-area`}>

<div className={`${base}__main-image`}>
<img src={mainImg} alt="about"/>
</div>

{/* VIDEO OVERLAY */}

<div className={`${base}__video-box`}>
<img src={videoImg} alt="video"/>

<div
className={`${base}__play`}
onClick={() => setVideoOpen(true)}
>
<FaPlay/>
</div>

</div>

</div>


{/* RIGHT CONTENT */}

<div className={`${base}__content`}>

<span className={`${base}__label`}>
About Us
</span>

<h2 className={`${base}__title`}>
The Leading Real Estate Rental Marketplace<span>.</span>
</h2>

<p className={`${base}__desc`}>
Over 39,000 people work for us in more than 70 countries all over the world. 
This breadth of global coverage combined with specialist services.
</p>


{/* FEATURES */}

<div className={`${base}__features`}>

<div className={`${base}__feature`}>
<FaHome/>
<span>Smart Home Design</span>
</div>

<div className={`${base}__feature`}>
<FaLeaf/>
<span>Beautiful Scene Around</span>
</div>

<div className={`${base}__feature`}>
<FaBuilding/>
<span>Exceptional Lifestyle</span>
</div>

<div className={`${base}__feature`}>
<FaShieldAlt/>
<span>Complete 24/7 Security</span>
</div>

</div>


{/* QUOTE */}

<div className={`${base}__quote`}>
"Enimad minim veniam quis nostrud exercitation ullamco laboris."
</div>


<button className={`${base}__btn`}>
OUR SERVICES
</button>

</div>

</div>


{/* VIDEO MODAL */}

{videoOpen && (

<div className={`${base}__video-modal`}>

<div className={`${base}__video-wrapper`}>

<button
className={`${base}__close`}
onClick={() => setVideoOpen(false)}
>
<FaTimes/>
</button>

<iframe
width="100%"
height="400"
src="https://www.youtube.com/embed/ysz5S6PUM-U"
title="YouTube video"
allowFullScreen
></iframe>

</div>

</div>

)}

</section>

);

};

export default AboutUs;