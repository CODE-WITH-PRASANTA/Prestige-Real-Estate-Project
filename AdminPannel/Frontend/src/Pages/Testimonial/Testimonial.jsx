import React, { useState, useEffect } from "react";
import "./Testimonial.css";

import user1 from "../../assets/user01.webp";
import user2 from "../../assets/user02.webp";
import user3 from "../../assets/user03.webp";
import user4 from "../../assets/user04.webp";

const Testimonial = () => {

const base = "testimonial-section";

const data = [
{
id:1,
img:user1,
text:"Dreams Estate made home booking a breeze. Super easy and stress-free! listing Portal of all time",
name:"Daniel Cooper"
},
{
id:2,
img:user2,
text:"From browsing to booking, everything felt effortless great design, clear information.",
name:"Karen Maria"
},
{
id:3,
img:user3,
text:"The platform helped me find my dream home quickly. Amazing experience overall.",
name:"John Robert"
},
{
id:4,
img:user4,
text:"Very user friendly and smooth process from start to finish.",
name:"Sophia Lee"
}
];

const [index,setIndex] = useState(0);

useEffect(()=>{
const auto = setInterval(()=>{
setIndex((prev)=>(prev+1)%data.length);
},4000);

return ()=>clearInterval(auto);

},[]);

const next = () =>{
setIndex((prev)=>(prev+1)%data.length);
};

const prev = () =>{
setIndex((prev)=>(prev-1+data.length)%data.length);
};

const visible = [
data[index],
data[(index+1)%data.length]
];

return (

<section className={base}>

<div className={`${base}__container`}>

<h2 className={`${base}__title`}>Testimonials</h2>

<div className={`${base}__line`}></div>

<p className={`${base}__subtitle`}>
What our happy client says
</p>

<div className={`${base}__slider`}>

{visible.map((item)=>(
<div key={item.id} className={`${base}__card`}>

<img
src={item.img}
alt="client"
className={`${base}__avatar`}
/>

<p className={`${base}__text`}>
{item.text}
</p>

<h4 className={`${base}__name`}>
{item.name}
</h4>

<div className={`${base}__stars`}>
★★★★★
</div>

</div>
))}

</div>

<div className={`${base}__controls`}>

<button onClick={prev} className={`${base}__arrow`}>
←
</button>

<button onClick={next} className={`${base}__arrow`}>
→
</button>

</div>

</div>

</section>

);

};

export default Testimonial;