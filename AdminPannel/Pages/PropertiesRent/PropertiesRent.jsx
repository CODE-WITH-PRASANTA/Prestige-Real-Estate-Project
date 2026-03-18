import React, { useState } from "react";
import "./PropertiesRent.css";

const PropertiesRent = () => {

const base = "properties-rent-admin";

const [form,setForm] = useState({
title:"",
price:"",
address:"",
bedrooms:"",
bathrooms:"",
area:"",
category:"Apartment",
tag:"Featured",
rating:"",
reviews:"",
agent:"",
country:"",
bookBtn:"Book Now",
date:"",
image:"",
status:"Active"
});

const [preview,setPreview] = useState("");

const [list,setList] = useState([]);

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleImage=(e)=>{
const file=e.target.files[0];

if(file){
const url=URL.createObjectURL(file);
setPreview(url);
setForm({...form,image:url});
}
};

const handleSubmit=(e)=>{
e.preventDefault();

const newItem={
...form,
id:Date.now()
};

setList([newItem,...list]);

setForm({
title:"",
price:"",
address:"",
bedrooms:"",
bathrooms:"",
area:"",
category:"Apartment",
tag:"Featured",
rating:"",
reviews:"",
agent:"",
country:"",
bookBtn:"Book Now",
date:"",
image:"",
status:"Active"
});

setPreview("");
};

const handleDelete=(id)=>{
setList(list.filter(item=>item.id!==id));
};

return (

<section className={base}>

<div className={`${base}__container`}>

{/* FORM */}

<div className={`${base}__form`}>

<h2>Add Featured Rental Property</h2>

<form onSubmit={handleSubmit}>

<input name="title" placeholder="Property Title"
value={form.title} onChange={handleChange}/>

<input name="price" placeholder="Price Per Night"
value={form.price} onChange={handleChange}/>

<input name="address" placeholder="Address"
value={form.address} onChange={handleChange}/>

<div className={`${base}__grid`}>

<input name="bedrooms" placeholder="Bedrooms"
value={form.bedrooms} onChange={handleChange}/>

<input name="bathrooms" placeholder="Bathrooms"
value={form.bathrooms} onChange={handleChange}/>

<input name="area" placeholder="Area SqFt"
value={form.area} onChange={handleChange}/>

</div>

<select name="category"
value={form.category}
onChange={handleChange}>
<option>Apartment</option>
<option>Villa</option>
<option>Lodge</option>
<option>Residency</option>
</select>

<select name="tag"
value={form.tag}
onChange={handleChange}>
<option>Featured</option>
<option>New</option>
</select>

<div className={`${base}__grid`}>

<input name="rating" placeholder="Rating"
value={form.rating} onChange={handleChange}/>

<input name="reviews" placeholder="Review Count"
value={form.reviews} onChange={handleChange}/>

<input name="date" type="date"
value={form.date} onChange={handleChange}/>

</div>

<input name="agent" placeholder="Agent Name"
value={form.agent} onChange={handleChange}/>

<input name="country" placeholder="Agent Country"
value={form.country} onChange={handleChange}/>

<input name="bookBtn" placeholder="Button Text"
value={form.bookBtn} onChange={handleChange}/>

<input type="file" onChange={handleImage}/>

<button className={`${base}__btn`}>
Save Property
</button>

</form>

</div>

{/* LIVE PREVIEW */}

<div className={`${base}__preview`}>

<h2>Live Preview</h2>

<div className={`${base}__card`}>

<div
className={`${base}__img`}
style={{backgroundImage:`url(${preview})`}}
>

<span className="price">
${form.price || "0000"} / Night
</span>

</div>

<div className={`${base}__cardBody`}>

<p className="rating">
⭐ {form.rating || "0"} ({form.reviews || "0"})
</p>

<h3>{form.title || "Property Title"}</h3>

<p className="address">
📍 {form.address || "Property Address"}
</p>

<div className="details">

<span>{form.bedrooms || 0} Bedroom</span>
<span>{form.bathrooms || 0} Bath</span>
<span>{form.area || 0} SqFt</span>

</div>

<p className="agent">
Agent: {form.agent || "Agent Name"}
</p>

<button className="bookBtn">
{form.bookBtn}
</button>

<span className="badge">
{form.category}
</span>

</div>

</div>

</div>

</div>

{/* LIST TABLE */}

<div className={`${base}__table`}>

<h2>Rental Property List</h2>

<div className={`${base}__tableWrap`}>

<table>

<thead>

<tr>

<th>Image</th>
<th>Title</th>
<th>Price</th>
<th>Address</th>
<th>Beds</th>
<th>Bath</th>
<th>Area</th>
<th>Category</th>
<th>Rating</th>
<th>Agent</th>
<th>Status</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{list.map(item=>(
<tr key={item.id}>

<td>
<img src={item.image}/>
</td>

<td>{item.title}</td>
<td>${item.price}</td>
<td>{item.address}</td>
<td>{item.bedrooms}</td>
<td>{item.bathrooms}</td>
<td>{item.area}</td>
<td>{item.category}</td>
<td>{item.rating}</td>
<td>{item.agent}</td>
<td>
<span className="status">{item.status}</span>
</td>

<td>

<button className="edit">
Edit
</button>

<button
className="delete"
onClick={()=>handleDelete(item.id)}
>
Delete
</button>

</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

</section>
);
};

export default PropertiesRent;