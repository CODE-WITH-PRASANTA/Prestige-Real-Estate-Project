import React, { useState } from "react";
import "./Testimonial.css";

const Testimonial = () => {

const base = "testimonial-admin";

const initialForm = {
image:"",
name:"",
designation:"",
review:"",
rating:5,
status:"Active"
};

const [form,setForm] = useState(initialForm);
const [preview,setPreview] = useState("");
const [list,setList] = useState([]);

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleImage = (e)=>{
const file = e.target.files[0];
if(file){
const url = URL.createObjectURL(file);
setPreview(url);
setForm({...form,image:url});
}
};

const handleRating = (value)=>{
setForm({...form,rating:value});
};

const handleSubmit = (e)=>{
e.preventDefault();

const newItem={
...form,
id:Date.now()
};

setList([newItem,...list]);
setForm(initialForm);
setPreview("");
};

const handleDelete = (id)=>{
setList(list.filter(item=>item.id!==id));
};

return(

<section className={base}>

<div className={`${base}__container`}>

{/* FORM + PREVIEW */}

<div className={`${base}__top`}>

{/* FORM */}

<div className={`${base}__formBox`}>

<div className={`${base}__boxHeader`}>
<h3>Add Testimonial</h3>
<p>Add customer feedback for your website</p>
</div>

<form onSubmit={handleSubmit}>

<label>Client Image</label>
<input type="file" onChange={handleImage}/>

<label>Client Name</label>
<input
name="name"
value={form.name}
onChange={handleChange}
placeholder="John Robert"
/>

<label>Designation</label>

<select
name="designation"
value={form.designation}
onChange={handleChange}
>
<option value="">Select Designation</option>
<option>Customer</option>
<option>Home Buyer</option>
<option>Property Investor</option>
<option>Tenant</option>
<option>Seller</option>
</select>

<label>Review Message</label>

<textarea
name="review"
value={form.review}
onChange={handleChange}
placeholder="Write testimonial..."
/>

<label>Rating</label>

<div className={`${base}__rating`}>

{[1,2,3,4,5].map(star=>(
<span
key={star}
onClick={()=>handleRating(star)}
className={form.rating >= star ? "active" : ""}
>
★
</span>
))}

</div>

<label>Status</label>

<select
name="status"
value={form.status}
onChange={handleChange}
>
<option>Active</option>
<option>Inactive</option>
</select>

<button className={`${base}__btn`}>
Save Testimonial
</button>

</form>

</div>


{/* LIVE PREVIEW */}

<div className={`${base}__preview`}>

<div className={`${base}__boxHeader`}>
<h3>Live Preview</h3>
<p>Preview how testimonial appears</p>
</div>

<div className={`${base}__card`}>

<div className={`${base}__avatar`}>
{preview && <img src={preview} alt=""/>}
</div>

<p className={`${base}__review`}>
"{form.review || "Client review message"}"
</p>

<h4>
{form.name || "Client Name"}
</h4>

<p className={`${base}__designation`}>
{form.designation || "Customer"}
</p>

<div className={`${base}__stars`}>
{"★".repeat(form.rating)}
</div>

</div>

</div>

</div>


{/* TABLE */}

<div className={`${base}__tableBox`}>

<div className={`${base}__tableHeader`}>
<h3>Testimonials List</h3>
<p>Manage testimonials added to your website</p>
</div>

<div className={`${base}__tableWrap`}>

<table>

<thead>

<tr>
<th>Image</th>
<th>Name</th>
<th>Designation</th>
<th>Review</th>
<th>Rating</th>
<th>Status</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{list.map(item=>(

<tr key={item.id}>

<td className={`${base}__user`}>
<img src={item.image} alt=""/>
</td>

<td className={`${base}__nameBlock`}>

<div className={`${base}__userName`}>
{item.name}
</div>

<div className={`${base}__userRole`}>
{item.designation}
</div>

</td>

<td>{item.designation}</td>

<td className={`${base}__reviewText`}>
{item.review}
</td>

<td className={`${base}__ratingStars`}>
{"★".repeat(item.rating)}
</td>

<td>
<span className={`status ${item.status === "Active" ? "active" : "inactive"}`}>
{item.status}
</span>
</td>

<td className={`${base}__actions`}>

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

</div>

</section>

);

};

export default Testimonial;