import React from "react";
import "./BlogDetails.css";

import author1 from "../../assets/agent6.webp";
import author2 from "../../assets/agemt5.webp";
import author3 from "../../assets/agent4.webp";

const BlogDetails = () => {

const base = "blog-details";

const blogs = [
{
id:1,
img:"https://images.unsplash.com/photo-1505691938895-1758d7feb511",
category:"Property",
author:"Susan Culli",
authorImg:author1,
date:"10 Apr 2025",
title:"Location is Everything",
desc:"The value of a property largely depends on where it’s located."
},
{
id:2,
img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
category:"Villa",
author:"Shelly Cox",
authorImg:author2,
date:"24 Apr 2025",
title:"Real Estate is a Investment",
desc:"Unlike stocks, real estate usually grows in value over time."
},
{
id:3,
img:"https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6",
category:"Godown",
author:"Eva Jones",
authorImg:author3,
date:"27 Sep 2025",
title:"Market Trends Matter",
desc:"Staying informed about housing market trends helps you make smarter."
},
{
id:4,
img:"https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
category:"Duplex",
author:"Jason Rosen",
authorImg:author1,
date:"28 Jun 2025",
title:"Legal Due Diligence is a Must",
desc:"Before buying a property, always check the legal title."
},
{
id:5,
img:"https://images.unsplash.com/photo-1568605114967-8130f3a36994",
category:"Property",
author:"Richard",
authorImg:author2,
date:"12 Jun 2025",
title:"Maintenance Affects ROI",
desc:"Regular upkeep preserves property value and attracts tenants."
},
{
id:6,
img:"https://images.unsplash.com/photo-1501183638710-841dd1904471",
category:"House",
author:"Sara Porter",
authorImg:author3,
date:"01 Jun 2025",
title:"Real Estate is Local",
desc:"Every market is different. What works in one city might not in another."
},
{
id:7,
img:"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
category:"Villa",
author:"Susan Culli",
authorImg:author1,
date:"15 May 2025",
title:"Luxury Living Trends",
desc:"Modern villas combine comfort with technology."
},
{
id:8,
img:"https://images.unsplash.com/photo-1484154218962-a197022b5858",
category:"Property",
author:"Richard",
authorImg:author2,
date:"11 May 2025",
title:"Smart Homes Future",
desc:"Smart automation increases property value."
},
{
id:9,
img:"https://images.unsplash.com/photo-1560448075-bb485b067938",
category:"House",
author:"Sara Porter",
authorImg:author3,
date:"04 May 2025",
title:"Investment Strategy",
desc:"Diversify your real estate portfolio for better returns."
}
];

return (

<section className={base}>

{/* floating background blobs */}
<div className={`${base}__blob ${base}__blob--1`} />
<div className={`${base}__blob ${base}__blob--2`} />

<div className={`${base}__container`}>

<div className={`${base}__grid`}>

{blogs.map((blog)=>(
<div key={blog.id} className={`${base}__card`}>

<div className={`${base}__image`}>
<img src={blog.img} alt="" />
</div>

<div className={`${base}__content`}>

<div className={`${base}__meta`}>

<span className={`${base}__badge`}>
{blog.category}
</span>

<div className={`${base}__author`}>
<img src={blog.authorImg} alt="" />
<span>{blog.author}</span>
</div>

<div className={`${base}__date`}>
<svg width="16" height="16" viewBox="0 0 24 24">
<path fill="currentColor" d="M7 2h2v2h6V2h2v2h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h3V2zm13 8H4v10h16V10z"/>
</svg>
<span>{blog.date}</span>
</div>

</div>

<h3 className={`${base}__title`}>
{blog.title}
</h3>

<p className={`${base}__desc`}>
{blog.desc}
</p>

</div>

</div>
))}

</div>

<div className={`${base}__load`}>
<button>
<svg width="18" height="18" viewBox="0 0 24 24">
<path fill="currentColor" d="M12 6V3L8 7l4 4V8c2.76 0 5 2.24 5 5a5 5 0 1 1-9.9-1H5.02A7 7 0 1 0 12 6z"/>
</svg>
Load More
</button>
</div>

</div>

</section>
);
};

export default BlogDetails;