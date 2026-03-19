import React, { useState } from "react";
import "./PropertyInformation.css";

const PropertyInformation = () => {

const base = "property-info";

const [form,setForm] = useState({
name:"",
type:"",
category:"",
currency:"",
salePrice:"",
offerPrice:""
});

const handleChange = (e)=>{
const {name,value} = e.target;
setForm({...form,[name]:value});
};

return (

<section className={base}>

<div className={`${base}__container`}>

{/* LEFT TEXT */}

<div className={`${base}__left`}>

<h2 className={`${base}__title`}>
Property Information
</h2>

<p className={`${base}__desc`}>
Explore essential details like size, type, pricing, and standout
features perfect for comfortable living or smart investment.
</p>

</div>


{/* RIGHT FORM */}

<div className={`${base}__form`}>

<div className={`${base}__grid`}>

{/* PROPERTY NAME */}

<div className={`${base}__field`}>
<label>Property Name</label>
<input
type="text"
name="name"
placeholder="Enter property name"
value={form.name}
onChange={handleChange}
/>
</div>


{/* PROPERTY TYPE */}

<div className={`${base}__field`}>
<label>Property Type</label>
<select
name="type"
value={form.type}
onChange={handleChange}
>
<option value="">Select</option>
<option value="buy">Buy</option>
<option value="sale">Sale</option>
</select>
</div>


{/* PROPERTY CATEGORY */}

<div className={`${base}__field`}>
<label>Property Category</label>
<select
name="category"
value={form.category}
onChange={handleChange}
>
<option value="">Select</option>
<option value="house">House</option>
<option value="home">Home</option>
<option value="apartment">Apartment</option>
<option value="villa">Villa</option>
</select>
</div>


{/* CURRENCY TYPE */}

<div className={`${base}__field`}>
<label>Currency Type</label>
<select
name="currency"
value={form.currency}
onChange={handleChange}
>
<option value="">Select</option>
<option value="cash">Cash</option>
<option value="bank">Bank Transfer</option>
</select>
</div>


{/* SALE PRICE */}

<div className={`${base}__field`}>
<label>Sale Price</label>
<input
type="number"
name="salePrice"
placeholder="Enter price"
value={form.salePrice}
onChange={handleChange}
/>
</div>


{/* OFFER PRICE */}

<div className={`${base}__field`}>
<label>Offer Price</label>
<input
type="number"
name="offerPrice"
placeholder="Enter offer price"
value={form.offerPrice}
onChange={handleChange}
/>
</div>

</div>

</div>

</div>

</section>

);

};

export default PropertyInformation;