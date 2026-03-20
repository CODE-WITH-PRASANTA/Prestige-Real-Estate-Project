import React, { useState } from "react";
import "./PropertyDetails.css";

const PropertyDetails = () => {

const base = "property-details";

const [form,setForm] = useState({
propertyId:"",
pricePerSqft:"",
structureType:"",
bedrooms:"",
bathrooms:"",
sqft:"",
parking:"",
balcony:"",
floor:"",
wardrobe:"",
tv:"",
waterPurifier:"",
microwave:"",
ac:"",
fridge:"",
garageSize:"",
availableFrom:"",
curtains:"",
yearConstructed:""
});

const handleChange=(e)=>{
const {name,value}=e.target;
setForm({...form,[name]:value});
};

return (

<section className={base}>

<div className={`${base}__container`}>

{/* LEFT TEXT */}

<div className={`${base}__left`}>

<h2 className={`${base}__title`}>
Property Details
</h2>

<p className={`${base}__desc`}>
Get key specs including layout, dimensions, and materials that define
this property’s quality, structure, and overall design.
</p>

</div>


{/* RIGHT FORM */}

<div className={`${base}__form`}>

<div className={`${base}__grid`}>

{/* PROPERTY ID */}
<div className={`${base}__field`}>
<label>Property Id</label>
<input name="propertyId" value={form.propertyId} onChange={handleChange}/>
</div>

{/* PRICE PER SQFT */}
<div className={`${base}__field`}>
<label>Price Per Sqft</label>
<input name="pricePerSqft" value={form.pricePerSqft} onChange={handleChange}/>
</div>

{/* STRUCTURE TYPE */}
<div className={`${base}__field`}>
<label>Structure Type</label>
<select name="structureType" value={form.structureType} onChange={handleChange}>
<option value="">Select</option>
<option>Concrete</option>
<option>Wood</option>
<option>Steel</option>
</select>
</div>

{/* BEDROOMS */}
<div className={`${base}__field`}>
<label>No of Bedrooms</label>
<input name="bedrooms" onChange={handleChange}/>
</div>

{/* BATHROOMS */}
<div className={`${base}__field`}>
<label>No of Bathrooms</label>
<input name="bathrooms" onChange={handleChange}/>
</div>

{/* SQFT */}
<div className={`${base}__field`}>
<label>Sqft</label>
<input name="sqft" onChange={handleChange}/>
</div>

{/* PARKING */}
<div className={`${base}__field`}>
<label>Parking</label>
<input name="parking" onChange={handleChange}/>
</div>

{/* BALCONY */}
<div className={`${base}__field`}>
<label>Balcony</label>
<select name="balcony" onChange={handleChange}>
<option value="">Select</option>
<option>Yes</option>
<option>No</option>
</select>
</div>

{/* FLOOR */}
<div className={`${base}__field`}>
<label>Floor</label>
<input name="floor" onChange={handleChange}/>
</div>

{/* WARDROBE */}
<div className={`${base}__field`}>
<label>Wardrobe</label>
<input name="wardrobe" onChange={handleChange}/>
</div>

{/* TV */}
<div className={`${base}__field`}>
<label>TV</label>
<input name="tv" onChange={handleChange}/>
</div>

{/* WATER PURIFIER */}
<div className={`${base}__field`}>
<label>Water Purifier</label>
<input name="waterPurifier" onChange={handleChange}/>
</div>

{/* MICROWAVE */}
<div className={`${base}__field`}>
<label>Microwave</label>
<input name="microwave" onChange={handleChange}/>
</div>

{/* AC */}
<div className={`${base}__field`}>
<label>AC</label>
<input name="ac" onChange={handleChange}/>
</div>

{/* FRIDGE */}
<div className={`${base}__field`}>
<label>Fridge</label>
<input name="fridge" onChange={handleChange}/>
</div>

{/* GARAGE SIZE */}
<div className={`${base}__field`}>
<label>Garage Size</label>
<input name="garageSize" onChange={handleChange}/>
</div>

{/* AVAILABLE FROM */}
<div className={`${base}__field`}>
<label>Available From</label>
<input type="date" name="availableFrom" onChange={handleChange}/>
</div>

{/* CURTAINS */}
<div className={`${base}__field`}>
<label>Curtains</label>
<select name="curtains" onChange={handleChange}>
<option value="">Select</option>
<option>Yes</option>
<option>No</option>
</select>
</div>

{/* YEAR CONSTRUCTED */}
<div className={`${base}__field`}>
<label>Year Constructed</label>
<input type="date" name="yearConstructed" onChange={handleChange}/>
</div>

</div>

</div>

</div>

</section>

);

};

export default PropertyDetails;