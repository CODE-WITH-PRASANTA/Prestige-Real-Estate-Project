import React, { useState } from "react";
import "./FaqPosting.css";

const FaqPosting = () => {

const base = "faq-admin";

const initialForm = {
image:"",
category:"General FAQ",
question:"",
answer:"",
order:"",
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

const handleSubmit = (e)=>{
e.preventDefault();

const newFaq={
...form,
id:Date.now()
};

setList([newFaq,...list]);
setForm(initialForm);
setPreview("");
};

const handleDelete = (id)=>{
setList(list.filter(item=>item.id !== id));
};

return(

<section className={base}>

<div className={`${base}__container`}>

{/* FORM + PREVIEW */}

<div className={`${base}__top`}>

{/* FORM */}

<div className={`${base}__formBox`}>

<div className={`${base}__header`}>
<h3>Add FAQ</h3>
<p>Create frequently asked questions</p>
</div>

<form onSubmit={handleSubmit}>

<label>Section Category</label>

<select
name="category"
value={form.category}
onChange={handleChange}
>
<option>General FAQ</option>
<option>Buying FAQ</option>
<option>Selling FAQ</option>
<option>Property FAQ</option>
</select>

<label>Question</label>

<input
name="question"
value={form.question}
onChange={handleChange}
placeholder="What is real estate?"
/>

<label>Answer</label>

<textarea
name="answer"
value={form.answer}
onChange={handleChange}
placeholder="Real estate refers to land and permanent structures..."
/>

<label>Display Order</label>

<input
type="number"
name="order"
value={form.order}
onChange={handleChange}
placeholder="1"
/>

<label>Status</label>

<select
name="status"
value={form.status}
onChange={handleChange}
>
<option>Active</option>
<option>Inactive</option>
</select>

<label>FAQ Image</label>

<input type="file" onChange={handleImage}/>

<button className={`${base}__btn`}>
Save FAQ
</button>

</form>

</div>

{/* PREVIEW */}

<div className={`${base}__preview`}>

<div className={`${base}__header`}>
<h3>Live Preview</h3>
<p>Preview how it appears</p>
</div>

<div className={`${base}__previewCard`}>

<h4>{form.category}</h4>

<div className={`${base}__accordion`}>

<div className={`${base}__question`}>
{form.question || "What is real estate?"}
<span>-</span>
</div>

<p className={`${base}__answer`}>
{form.answer || "Real estate refers to land and any permanent structures such as homes or buildings."}
</p>

</div>

</div>

</div>

</div>

{/* TABLE */}

<div className={`${base}__tableBox`}>

<div className={`${base}__header`}>
<h3>FAQ List</h3>
<p>Manage all FAQ items</p>
</div>

<div className={`${base}__tableWrap`}>

<table>

<thead>

<tr>
<th>Image</th>
<th>Category</th>
<th>Question</th>
<th>Answer</th>
<th>Status</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{list.map(item=>(
<tr key={item.id}>

<td>
{item.image && <img src={item.image} alt="faq"/>}
</td>

<td>{item.category}</td>

<td>{item.question}</td>

<td className={`${base}__answerText`}>
{item.answer.slice(0,60)}...
</td>

<td>
<span className={`status ${item.status==="Active" ? "active":"inactive"}`}>
{item.status}
</span>
</td>

<td className={`${base}__actions`}>

<button className="edit">Edit</button>

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

export default FaqPosting;