import React, { useState } from "react";
import "./ReletedPost.css";

import img1 from "../../assets/RelatedPost.webp";
import img2 from "../../assets/post2.webp";
import img3 from "../../assets/post3.webp";
import img4 from "../../assets/post4.webp";
import img5 from "../../assets/post2.webp";
import img6 from "../../assets/post3.webp";
import img7 from "../../assets/post4.webp";
import img8 from "../../assets/post2.webp";
import img9 from "../../assets/post3.webp";

import author1 from "../../assets/agent1.webp";
import author2 from "../../assets/agent2.webp";
import author3 from "../../assets/agent3.webp";

const ReletedPost = () => {

const base = "related-post";

const posts = [
{
id:1,
img:img1,
category:"Duplex",
author:"Jason Rose",
date:"28 Jun 2025",
title:"Legal Due Diligence is a Must",
desc:"Before buying, always check the legal title, land use approvals and documentation.",
avatar:author1
},
{
id:2,
img:img2,
category:"Property",
author:"Susan Cul",
date:"10 Apr 2025",
title:"Location is Everything",
desc:"The value of a property largely depends on where it's located.",
avatar:author2
},
{
id:3,
img:img3,
category:"Villa",
author:"Shelly Cox",
date:"24 Apr 2025",
title:"Real Estate is a Long-Term Asset",
desc:"Unlike stocks, real estate usually grows in value over time.",
avatar:author3
},
{
id:4,
img:img4,
category:"Property",
author:"Richard",
date:"12 Jun 2025",
title:"Maintenance Affects ROI",
desc:"Regular upkeep not only preserves property value but attracts buyers.",
avatar:author1
},
{
id:5,
img:img5,
category:"Villa",
author:"Shelly Cox",
date:"24 Apr 2025",
title:"Luxury Living Trends",
desc:"Modern villas now combine smart homes with eco friendly design.",
avatar:author2
},
{
id:6,
img:img6,
category:"Duplex",
author:"Jason Rose",
date:"20 May 2025",
title:"Investment Smart Buying",
desc:"Smart buyers evaluate long-term value before purchasing.",
avatar:author3
},
{
id:7,
img:img7,
category:"Property",
author:"Susan Cul",
date:"10 Apr 2025",
title:"Property Market Insights",
desc:"Understanding market cycles can improve real estate investment.",
avatar:author1
},
{
id:8,
img:img8,
category:"Villa",
author:"Shelly Cox",
date:"24 Apr 2025",
title:"Designing Modern Homes",
desc:"Contemporary houses combine minimalism and functionality.",
avatar:author2
},
{
id:9,
img:img9,
category:"Property",
author:"Richard",
date:"12 Jun 2025",
title:"Future of Real Estate",
desc:"Technology and AI are shaping the future property market.",
avatar:author3
}
];

const cardsPerPage = 3;

const [page,setPage] = useState(1);

const totalPages = Math.ceil(posts.length / cardsPerPage);

const start = (page-1)*cardsPerPage;

const currentPosts = posts.slice(start,start+cardsPerPage);

return (

<section className={base}>

<div className={`${base}__container`}>

<div className={`${base}__header`}>

<h2>Related Post</h2>

<div className={`${base}__nav`}>

<button
disabled={page===1}
onClick={()=>setPage(page-1)}
>

<svg viewBox="0 0 24 24">
<path d="M15 18l-6-6 6-6"/>
</svg>

</button>

<button
disabled={page===totalPages}
onClick={()=>setPage(page+1)}
>

<svg viewBox="0 0 24 24">
<path d="M9 6l6 6-6 6"/>
</svg>

</button>

</div>

</div>


<div className={`${base}__grid`}>

{currentPosts.map((post)=>(
<div key={post.id} className={`${base}__card`}>

<img src={post.img} alt="" />

<div className={`${base}__content`}>

<span className={`${base}__badge`}>
{post.category}
</span>

<div className={`${base}__meta`}>

<img src={post.avatar} alt="" />

<span>{post.author}</span>

<div className={`${base}__date`}>

<svg viewBox="0 0 24 24">

<path
d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V2zm13 8H4v10h16V10z"
/>

</svg>

<span>{post.date}</span>

</div>

</div>

<h3>{post.title}</h3>

<p>{post.desc}</p>

</div>

</div>
))}

</div>

</div>

</section>

)

}

export default ReletedPost