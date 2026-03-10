import React from "react";
import "./PopularCities.css";

import Blog1 from "../../assets/Blog1.webp";
import Blog2 from "../../assets/Blog2.webp";
import Blog3 from "../../assets/Blog3.webp";

const PopularCities = () => {

const base = "popular-cities";

const blogs = [
{
id:1,
img:Blog1,
tag:"Property",
title:"The most popular cities for homebuyers",
desc:"The majority have, although there are many other lorem ipsum passages available.",
author:"Maria Ramirez",
date:"27 Sep 2025"
},
{
id:2,
img:Blog2,
tag:"Vila",
title:"How to become financially independent",
desc:"Quia omnis velit. Cupiditate et perspiciatis. Asperiores dolor magnam fuga voluptatum beatae.",
author:"Laura Mincey",
date:"20 Oct 2025"
},
{
id:3,
img:Blog3,
tag:"Guest House",
title:"Discover how our future is actually shaped by real estate.",
desc:"Although there are numerous types of lorem ipsum passages accessible, most of them contain...",
author:"Cecilia Newsome",
date:"15 Nov 2025"
}
];

return (

<section className={base}>

<div className={`${base}__container`}>

{blogs.map((blog)=>(
<div className={`${base}__card`} key={blog.id}>

<div className={`${base}__image`}>

<img src={blog.img} alt={blog.title}/>

</div>

<div className={`${base}__content`}>

<div className={`${base}__meta`}>

<span className={`${base}__tag`}>
{blog.tag}
</span>

<div className={`${base}__author`}>

<span className={`${base}__avatar`}>
👤
</span>

<span>
{blog.author}
</span>

<span className={`${base}__date`}>
📅 {blog.date}
</span>

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

<div className={`${base}__loadmore`}>

<button className={`${base}__btn`}>
↻ Load More
</button>

</div>

</div>

</section>

);

};

export default PopularCities;