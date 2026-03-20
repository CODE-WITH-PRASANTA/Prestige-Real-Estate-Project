import React, { useState } from "react";
import "./Location.css";

const Location = () => {

const base = "property-location";

const [form,setForm] = useState({
address:"221B Baker Street",
country:"India",
state:"Maharashtra",
city:"Mumbai",
landmark:"Near Gateway of India",
zipcode:"400001"
});

const handleChange = (e)=>{
const {name,value} = e.target;
setForm({...form,[name]:value});
};

const handleReset = ()=>{
setForm({
address:"",
country:"",
state:"",
city:"",
landmark:"",
zipcode:""
});
};

const handleSubmit = (e)=>{
e.preventDefault();
console.log("Property Location:",form);
alert("Property Added Successfully");
};

return (

<section className={base}>

<div className={`${base}__container`}>

{/* LEFT TEXT */}

<div className={`${base}__left`}>

<h2 className={`${base}__title`}>
Property Location
</h2>

<p className={`${base}__desc`}>
Centrally located near schools, shops, and transport—offering
everyday convenience and strong long-term property value.
</p>

</div>


{/* RIGHT FORM */}

<div className={`${base}__right`}>

<form 
className={`${base}__card`}
onSubmit={handleSubmit}
>

{/* ADDRESS */}

<div className={`${base}__field`}>

<label>Address</label>

<input
name="address"
value={form.address}
onChange={handleChange}
placeholder="Enter full address"
/>

</div>


{/* GRID */}

<div className={`${base}__grid`}>

{/* COUNTRY */}

<div className={`${base}__field`}>
<label>Country</label>

<select
name="country"
value={form.country}
onChange={handleChange}
>

<option value="" disabled>Select Country</option>
<option>India</option>
<option>United States</option>
<option>United Kingdom</option>
<option>Australia</option>

</select>

</div>


{/* STATE */}

<div className={`${base}__field`}>
<label>State</label>

<select
name="state"
value={form.state}
onChange={handleChange}
>

<option value="" disabled>Select State</option>
<option>Maharashtra</option>
<option>California</option>
<option>Texas</option>
<option>New York</option>

</select>

</div>


{/* CITY */}

<div className={`${base}__field`}>
<label>City</label>

<select
name="city"
value={form.city}
onChange={handleChange}
>

<option value="" disabled>Select City</option>
<option>Mumbai</option>
<option>Delhi</option>
<option>Los Angeles</option>
<option>New York</option>

</select>

</div>

</div>


{/* LANDMARK + ZIP */}

<div className={`${base}__grid-two`}>

<div className={`${base}__field`}>
<label>Landmark</label>

<input
name="landmark"
value={form.landmark}
onChange={handleChange}
placeholder="Nearby landmark"
/>

</div>

<div className={`${base}__field`}>
<label>Zipcode</label>

<input
name="zipcode"
value={form.zipcode}
onChange={handleChange}
placeholder="Enter zipcode"
/>

</div>

</div>


{/* GOOGLE MAP */}

<div className={`${base}__map`}>

<iframe
title="google-map"
src="https://maps.google.com/maps?q=mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
loading="lazy"
/>

</div>


{/* BUTTONS */}

<div className={`${base}__buttons`}>

<button
type="button"
className={`${base}__reset`}
onClick={handleReset}
>
Reset
</button>

<button
type="submit"
className={`${base}__submit`}
>
Add Property
</button>

</div>

</form>

</div>

</div>

</section>

);

};

export default Location;