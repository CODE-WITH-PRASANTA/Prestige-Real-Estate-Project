import React, { useState } from "react";
import "./PropetiesSale.css";

const PropetiesSale = () => {

const base = "properties-sale-admin";

const [form,setForm] = useState({
title:"",
price:"",
address:"",
bedrooms:"",
bathrooms:"",
area:"",
category:"Suite",
rating:"",
reviews:"",
date:"",
image:""
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
category:"Suite",
rating:"",
reviews:"",
date:"",
image:""
});

setPreview("");

};

const handleDelete=(id)=>{
setList(list.filter(item=>item.id!==id));
};

return (

<section className={base}>

<div className={`${base}__container`}>

{/* PROPERTY FORM */}

<div className={`${base}__form`}>

<h2 className={`${base}__heading`}>
Add Featured Property
</h2>

<form onSubmit={handleSubmit}>

<div className={`${base}__field`}>
<label>Property Title</label>
<input name="title" value={form.title} onChange={handleChange}/>
</div>

<div className={`${base}__field`}>
<label>Price</label>
<input name="price" value={form.price} onChange={handleChange}/>
</div>

<div className={`${base}__field`}>
<label>Address</label>
<input name="address" value={form.address} onChange={handleChange}/>
</div>

<div className={`${base}__grid`}>

<div className={`${base}__field`}>
<label>Bedrooms</label>
<input name="bedrooms" value={form.bedrooms} onChange={handleChange}/>
</div>

<div className={`${base}__field`}>
<label>Bathrooms</label>
<input name="bathrooms" value={form.bathrooms} onChange={handleChange}/>
</div>

<div className={`${base}__field`}>
<label>Area</label>
<input name="area" value={form.area} onChange={handleChange}/>
</div>

</div>

<div className={`${base}__field`}>
<label>Category</label>

<select name="category" value={form.category} onChange={handleChange}>
<option>Suite</option>
<option>Apartment</option>
<option>Villa</option>
<option>Bungalow</option>
</select>

</div>

<div className={`${base}__grid`}>

<div className={`${base}__field`}>
<label>Rating</label>
<input name="rating" value={form.rating} onChange={handleChange}/>
</div>

<div className={`${base}__field`}>
<label>Review Count</label>
<input name="reviews" value={form.reviews} onChange={handleChange}/>
</div>

<div className={`${base}__field`}>
<label>Listed Date</label>
<input type="date" name="date" value={form.date} onChange={handleChange}/>
</div>

</div>

<div className={`${base}__field`}>
<label>Property Image</label>
<input type="file" onChange={handleImage}/>
</div>

<button className={`${base}__btn`}>
Save Property
</button>

</form>

</div>


{/* LIVE PREVIEW */}

<div className={`${base}__preview`}>

<h2 className={`${base}__heading`}>
Live Preview
</h2>

<div className={`${base}__card`}>

<div
className={`${base}__card-img`}
style={{backgroundImage:`url(${preview})`}}
>

<span className={`${base}__price`}>
${form.price || "0000"}
</span>

</div>

<div className={`${base}__card-body`}>

<p className={`${base}__rating`}>
⭐ {form.rating || "0"} ({form.reviews || "0"})
</p>

<h3>{form.title || "Property Title"}</h3>

<p className={`${base}__address`}>
📍 {form.address || "Property Address"}
</p>

<div className={`${base}__details`}>

<span>{form.bedrooms || "0"} Bedroom</span>
<span>{form.bathrooms || "0"} Bath</span>
<span>{form.area || "0"} SqFt</span>

</div>

<p className={`${base}__meta`}>
Listed on: {form.date || "-"}
</p>

<p className={`${base}__meta`}>
Category: {form.category}
</p>

</div>

</div>

</div>

</div>


{/* PROPERTY LIST TABLE */}

<div className={`${base}__table`}>

<h2 className={`${base}__heading`}>
Property List
</h2>

<div className={`${base}__table-wrapper`}>

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
<th>Action</th>
</tr>

</thead>

<tbody>

{list.map(item=>(

<tr key={item.id}>

<td>
<img src={item.image} alt=""/>
</td>

<td>{item.title}</td>
<td>${item.price}</td>
<td>{item.address}</td>
<td>{item.bedrooms}</td>
<td>{item.bathrooms}</td>
<td>{item.area}</td>
<td>{item.category}</td>
<td>{item.rating}</td>

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

export default PropetiesSale;