import React, { useState } from "react";
import "./Pricing.css";

const Pricing = () => {

const base = "pricing-admin";

const [formData,setFormData] = useState({
plan:"Premium",
price:"49",
listings:"Unlimited",
users:"20",
api:"Yes",
status:"Active",
features:["Property Listing","Priority Support","Analytics Dashboard"]
});

const [plans,setPlans] = useState([
{plan:"Basic",price:"0",listings:"5",users:"1",api:"No",status:"Active"},
{plan:"Standard",price:"19",listings:"20",users:"5",api:"Yes",status:"Active"},
{plan:"Premium",price:"49",listings:"Unlimited",users:"20",api:"Yes",status:"Active"}
]);

const handleChange = (e)=>{
setFormData({...formData,[e.target.name]:e.target.value});
};

const handleFeature = (index,value)=>{
const updated=[...formData.features];
updated[index]=value;
setFormData({...formData,features:updated});
};

const handleSubmit = (e)=>{
e.preventDefault();

setPlans([...plans,{
plan:formData.plan,
price:formData.price,
listings:formData.listings,
users:formData.users,
api:formData.api,
status:formData.status
}]);
};

const handleDelete = (index)=>{
const updated = plans.filter((_,i)=>i!==index);
setPlans(updated);
};

return (

<section className={base}>

<div className={`${base}__container`}>

{/* TOP */}

<div className={`${base}__top`}>

{/* FORM */}

<div className={`${base}__form-box`}>

<h3 className={`${base}__title`}>Add Pricing Plan</h3>

<form className={`${base}__form`} onSubmit={handleSubmit}>

<label>Plan Name</label>
<input
name="plan"
value={formData.plan}
onChange={handleChange}
/>

<label>Price</label>
<input
name="price"
value={formData.price}
onChange={handleChange}
/>

<label>Listings Limit</label>
<input
name="listings"
value={formData.listings}
onChange={handleChange}
/>

<label>Users Limit</label>
<input
name="users"
value={formData.users}
onChange={handleChange}
/>

<label>API Access</label>
<select
name="api"
value={formData.api}
onChange={handleChange}
>
<option>Yes</option>
<option>No</option>
</select>

<label>Status</label>
<select
name="status"
value={formData.status}
onChange={handleChange}
>
<option>Active</option>
<option>Inactive</option>
</select>

<label>Features</label>

{formData.features.map((feature,index)=>(
<input
key={index}
value={feature}
onChange={(e)=>handleFeature(index,e.target.value)}
/>
))}

<button className={`${base}__btn`}>
Save Plan
</button>

</form>

</div>


{/* LIVE PREVIEW */}

<div className={`${base}__preview-box`}>

<h3 className={`${base}__title`}>Live Preview</h3>

<div className={`${base}__card`}>

<h4>{formData.plan} Plan</h4>

<div className={`${base}__price`}>
${formData.price} <span>/ Month</span>
</div>

<ul>

<li>✔ {formData.listings} Listings</li>
<li>✔ {formData.users} Users</li>
<li>✔ API Access</li>

{formData.features.map((f,i)=>(
<li key={i}>✔ {f}</li>
))}

</ul>

<button className={`${base}__subscribe`}>
Subscribe Now
</button>

</div>

</div>

</div>


{/* TABLE */}

<div className={`${base}__table-box`}>

<h3 className={`${base}__title`}>
Pricing Plans List
</h3>

<div className={`${base}__table-wrapper`}>

<table className={`${base}__table`}>

<thead>

<tr>
<th>Plan</th>
<th>Price</th>
<th>Listings</th>
<th>Users</th>
<th>API</th>
<th>Status</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{plans.map((plan,index)=>(

<tr key={index}>

<td>{plan.plan}</td>
<td>${plan.price}</td>
<td>{plan.listings}</td>
<td>{plan.users}</td>
<td>{plan.api}</td>
<td>{plan.status}</td>

<td className={`${base}__action`}>

<button>Edit</button>

<button
onClick={()=>handleDelete(index)}
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

export default Pricing;