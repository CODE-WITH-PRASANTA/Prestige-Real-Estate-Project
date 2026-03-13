import React, { useState } from "react";
import "./BlogPosting.css";

const BlogPosting = () => {

const base = "blog-posting-admin";

const initialForm = {
image:"",
category:"Property",
title:"",
author:"",
date:"",
description:"",
status:"Active"
};

const [form,setForm] = useState(initialForm);
const [preview,setPreview] = useState("");
const [blogs,setBlogs] = useState([]);
const [editIndex,setEditIndex] = useState(null);

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

if(editIndex !== null){

const updatedBlogs = [...blogs];
updatedBlogs[editIndex] = form;
setBlogs(updatedBlogs);
setEditIndex(null);

}else{

setBlogs([...blogs,form]);

}

setForm(initialForm);
setPreview("");

};

const deleteBlog = (index)=>{
const newBlogs = blogs.filter((_,i)=> i !== index);
setBlogs(newBlogs);
};

const editBlog = (index)=>{
setForm(blogs[index]);
setPreview(blogs[index].image);
setEditIndex(index);
};

return (

<section className={base}>

<div className={`${base}__container`}>

{/* HEADER */}

<div className={`${base}__header`}>
<h2>Blog / Article Management</h2>
</div>

{/* FORM + PREVIEW */}

<div className={`${base}__grid`}>

{/* FORM */}

<div className={`${base}__form`}>

<h3>Add Blog Form</h3>

<form onSubmit={handleSubmit}>

<label>Blog Image</label>
<input type="file" onChange={handleImage}/>

<label>Category</label>
<select name="category" value={form.category} onChange={handleChange}>
<option>Property</option>
<option>Villa</option>
<option>House</option>
<option>Guest House</option>
</select>

<label>Blog Title</label>
<input
type="text"
name="title"
placeholder="Enter blog title"
value={form.title}
onChange={handleChange}
/>

<label>Author Name</label>
<input
type="text"
name="author"
placeholder="Enter author name"
value={form.author}
onChange={handleChange}
/>

<label>Publish Date</label>
<input
type="date"
name="date"
value={form.date}
onChange={handleChange}
/>

<label>Short Description</label>
<textarea
name="description"
placeholder="Write short blog description"
value={form.description}
onChange={handleChange}
/>

<label>Status</label>
<select name="status" value={form.status} onChange={handleChange}>
<option>Active</option>
<option>Inactive</option>
</select>

<button type="submit">
{editIndex !== null ? "Update Blog" : "Add Blog"}
</button>

</form>

</div>

{/* LIVE PREVIEW */}

<div className={`${base}__preview`}>

<h3>Live Preview</h3>

<div className={`${base}__card`}>

{preview && <img src={preview} alt="preview"/>}

<span className={`${base}__badge`}>
{form.category}
</span>

<h4>{form.title || "Blog Title"}</h4>

<p>
{form.description || "Short description preview will appear here."}
</p>

<div className={`${base}__meta`}>
<span>{form.author || "Author"}</span>
<span>{form.date || "Publish Date"}</span>
</div>

</div>

</div>

</div>

{/* BLOG LIST */}

<div className={`${base}__list`}>

<h3>Blog List</h3>

<div className={`${base}__table-wrap`}>

<table>

<thead>
<tr>
<th>Image</th>
<th>Category</th>
<th>Title</th>
<th>Author</th>
<th>Date</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{blogs.map((blog,index)=>(

<tr key={index}>

<td>
<img src={blog.image} alt=""/>
</td>

<td>{blog.category}</td>
<td>{blog.title}</td>
<td>{blog.author}</td>
<td>{blog.date}</td>
<td>{blog.status}</td>

<td className={`${base}__actions`}>

<button
className={`${base}__edit`}
onClick={()=>editBlog(index)}
>
Edit
</button>

<button
className={`${base}__delete`}
onClick={()=>deleteBlog(index)}
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

export default BlogPosting;