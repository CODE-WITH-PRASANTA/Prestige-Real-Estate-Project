import React, { useState } from "react";
import "./FloorPlanes.css";

const FloorPlanes = () => {

const base = "floor-plans";

const [forms,setForms] = useState([
{
name:"",
type:"",
category:"",
currency:"",
salePrice:"",
offerPrice:"",
description:"",
photos:[]
}
]);

const handleChange = (index,e)=>{
const {name,value} = e.target;
const updated = [...forms];
updated[index][name] = value;
setForms(updated);
};

const handlePhoto = (index,e)=>{
const files = Array.from(e.target.files);
const updated = [...forms];
updated[index].photos = files;
setForms(updated);
};

const addMore = ()=>{
setForms([
...forms,
{
name:"",
type:"",
category:"",
currency:"",
salePrice:"",
offerPrice:"",
description:"",
photos:[]
}
]);
};

const removeForm = (index)=>{
const updated = forms.filter((_,i)=>i!==index);
setForms(updated);
};

return (

<section className={base}>

<div className={`${base}__container`}>

{/* LEFT TEXT */}

<div className={`${base}__left`}>

<h2 className={`${base}__title`}>
Floor Plans
</h2>

<p className={`${base}__desc`}>
See detailed floor layouts showing room sizes, flow, and structure
to help visualize furniture or future changes.
</p>

</div>

{/* RIGHT FORM */}

<div className={`${base}__right`}>

{forms.map((form,index)=>(

<div key={index} className={`${base}__card`}>

{/* DELETE BUTTON */}

{index !== 0 && (
<button
className={`${base}__delete`}
onClick={()=>removeForm(index)}
>
Delete
</button>
)}

<div className={`${base}__grid`}>

{/* PROPERTY NAME */}
<div className={`${base}__field`}>
<label>Property Name</label>
<input
name="name"
value={form.name}
onChange={(e)=>handleChange(index,e)}
/>
</div>

{/* PROPERTY TYPE */}
<div className={`${base}__field`}>
<label>Property Type</label>
<select
name="type"
value={form.type}
onChange={(e)=>handleChange(index,e)}
>
<option>Select</option>
<option>Apartment</option>
<option>Villa</option>
<option>House</option>
</select>
</div>

{/* PROPERTY CATEGORY */}
<div className={`${base}__field`}>
<label>Property Category</label>
<select
name="category"
value={form.category}
onChange={(e)=>handleChange(index,e)}
>
<option>Select</option>
<option>Residential</option>
<option>Commercial</option>
<option>Luxury</option>
</select>
</div>

{/* CURRENCY TYPE */}
<div className={`${base}__field`}>
<label>Currency Type</label>
<select
name="currency"
value={form.currency}
onChange={(e)=>handleChange(index,e)}
>
<option>Select</option>
<option>USD</option>
<option>INR</option>
<option>EUR</option>
</select>
</div>

{/* SALE PRICE */}
<div className={`${base}__field`}>
<label>Sale Price</label>
<input
name="salePrice"
value={form.salePrice}
onChange={(e)=>handleChange(index,e)}
/>
</div>

{/* OFFER PRICE */}
<div className={`${base}__field`}>
<label>Offer Price</label>
<input
name="offerPrice"
value={form.offerPrice}
onChange={(e)=>handleChange(index,e)}
/>
</div>

</div>

{/* DESCRIPTION */}

<div className={`${base}__field`}>
<label>Description of Property</label>
<textarea
name="description"
value={form.description}
onChange={(e)=>handleChange(index,e)}
placeholder="Description"
/>
</div>

{/* PHOTO */}

<div className={`${base}__upload`}>

<label>Photo</label>

<div className={`${base}__upload-box`}>

<label className={`${base}__browse`}>

Browse Files

<input
type="file"
multiple
onChange={(e)=>handlePhoto(index,e)}
/>

</label>

<span className={`${base}__file`}>
{form.photos.length} Photos Selected
</span>

</div>

</div>

{/* ADD BUTTON ONLY UNDER FIRST FORM */}

{index === 0 && (
<button
className={`${base}__add`}
onClick={addMore}
>
+ Add More
</button>
)}

</div>

))}

</div>

</div>

</section>

);

};

export default FloorPlanes;