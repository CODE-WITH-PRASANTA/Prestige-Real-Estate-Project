import React from "react";
import "./BackBlog.css";

import author from "../../assets/BackBlog.webp";
import hero from "../../assets/backblog1.webp";
import g1 from "../../assets/backblog2.webp";
import g2 from "../../assets/backblog3.webp";
import g3 from "../../assets/backblog4.webp";
import g4 from "../../assets/Backblog5.webp";

const BackBlog = () => {

const base="back-blog";

return (

<section className={base}>

<div className={`${base}__container`}>

{/* BACK */}

<div className={`${base}__back`}>
<svg viewBox="0 0 24 24" width="20">
<path fill="currentColor" d="M15 18l-6-6 6-6"/>
</svg>
<span>Back to Blog</span>
</div>


{/* HERO */}

<div className={`${base}__hero`}>

<img src={hero} alt="hero"/>

<div className={`${base}__hero-card`}>

<span className={`${base}__badge`}>Villa</span>

<h1 className={`${base}__title`}>
Top 10 Tips for First-Time Homebuyers
</h1>

<div className={`${base}__meta`}>

<img src={author} alt="author"/>

<span>Cecilia New</span>

<div className={`${base}__date`}>

<svg width="16" viewBox="0 0 24 24">
<path fill="currentColor"
d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 
2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V2zm13 8H4v10h16V10z"/>
</svg>

<span>15 Nov 2025</span>

</div>

</div>

</div>

</div>


{/* ARTICLE */}

<div className={`${base}__article`}>

<p>
If you’re living alone or mostly by yourself and seeking ways to enrich your daily life,
community living could be the answer. Especially for elderly people, residing among peers
offers the perfect balance of independence and support—close enough to friends and family
to feel connected, yet private enough to maintain personal space.
</p>

<p>
Let’s explore why community living is so important for seniors:
</p>

<h2>There’s no place like home:</h2>

</div>


{/* GALLERY */}

<div className={`${base}__gallery`}>

<img src={g1} alt="villa"/>
<img src={g2} alt="villa"/>
<img src={g3} alt="villa"/>
<img src={g4} alt="villa"/>

</div>


{/* TEXT */}

<div className={`${base}__article`}>

<p>
Home is where comfort and connection come together—a sanctuary filled with the laughter
of friends, warmth of family, and the peace of knowing you’re cared for.
</p>

<p>
For seniors, that sense of belonging is more than sentimental; it’s essential.
</p>

</div>


{/* AUTHOR */}

<div className={`${base}__author`}>

<img src={author} alt="author"/>

<div>

<span className={`${base}__author-role`}>
Author
</span>

<h3>Robert Hollenbeck</h3>

<p>
At Dreams Estate, we believe a true dream home goes beyond beautiful walls—
it nurtures your mind, heart, and spirit.
</p>

</div>

</div>


{/* HELPFUL */}

<div className={`${base}__helpful`}>

<h4>Was this article helpful?</h4>

<span>18 out of 93 found this helpful</span>

<div className={`${base}__actions`}>

<button>👍 Yes</button>
<button>👎 No</button>

</div>

</div>


</div>

</section>

);

};

export default BackBlog;