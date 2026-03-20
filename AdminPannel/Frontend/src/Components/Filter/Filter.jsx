import React from "react";
import "./Filter.css";

import top1 from "../../assets/Top1.webp";
import top2 from "../../assets/Top2.webp";
import top3 from "../../assets/Top3.webp";
import top4 from "../../assets/Top4.webp";

const Filter = () => {

const base = "blog-filter";

const categories = [
{ name:"Property", count:15 },
{ name:"Vila", count:22 },
{ name:"House", count:14 },
{ name:"Guest House", count:14 },
{ name:"Factory", count:74 },
{ name:"Godown", count:75 }
];

const articles = [
{
img:top1,
title:"Great Business Tips in 2025",
date:"27 Sep 2025"
},
{
img:top2,
title:"8 Amazing Tricks About Build...",
date:"05 Oct 2025"
},
{
img:top3,
title:"Excited News About Buildings.",
date:"27 Sep 2025"
},
{
img:top4,
title:"City for homebuyers.",
date:"10 Dec 2025"
}
];

return (

<div className={base}>

{/* FILTER SEARCH */}

<div className={`${base}__card`}>

<h3 className={`${base}__title`}>
Filter
</h3>

<input
type="text"
placeholder="Search"
className={`${base}__search`}
/>

</div>

{/* CATEGORIES */}

<div className={`${base}__card`}>

<h3 className={`${base}__title`}>
Categories
</h3>

<ul className={`${base}__categories`}>

{categories.map((cat,i)=>(
<li key={i} className={`${base}__cat-item`}>

<span>{cat.name}</span>

<span className={`${base}__count`}>
{cat.count}
</span>

</li>
))}

</ul>

</div>

{/* TOP ARTICLES */}

<div className={`${base}__card`}>

<h3 className={`${base}__title`}>
Top Article
</h3>

<div className={`${base}__articles`}>

{articles.map((item,i)=>(

<div key={i} className={`${base}__article`}>

<img src={item.img} alt="article"/>

<div className={`${base}__overlay`}>

<h4>{item.title}</h4>

<p>{item.date}</p>

</div>

</div>

))}

</div>

</div>

</div>

);

};

export default Filter;