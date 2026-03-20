import React, { useState } from "react";
import "./PropertyGallery.css";

import img1 from "../../assets/Grid1.webp";
import img2 from "../../assets/Grid2.webp";
import img3 from "../../assets/Grid3.webp";

const PropertyGallery = () => {

const base = "property-gallery";

const [images,setImages] = useState([img1,img2,img3]);
const [success,setSuccess] = useState(false);

const handleUpload = (e) => {

const files = Array.from(e.target.files);

if(files.length > 10){
alert("Maximum 10 images allowed");
return;
}

const newImages = files.map(file => URL.createObjectURL(file));

setImages([...images,...newImages]);
setSuccess(true);

};

const removeImage = (index) => {
const updated = images.filter((_,i)=>i!==index);
setImages(updated);
};

return (

<section className={base}>

<div className={`${base}__container`}>

{/* LEFT */}

<div className={`${base}__left`}>

<h2 className={`${base}__title`}>
Property Gallery
</h2>

<p className={`${base}__desc`}>
Browse high-resolution images of interiors and exteriors
to get a true feel of the design and atmosphere.
</p>

</div>


{/* RIGHT CARD */}

<div className={`${base}__card`}>

<div className={`${base}__preview`}>

{images.map((img,index)=>(
<div key={index} className={`${base}__thumb`}>

<img src={img} alt="property"/>

<button
className={`${base}__delete`}
onClick={()=>removeImage(index)}
>
🗑
</button>

</div>
))}

</div>

<label className={`${base}__label`}>
Photo
</label>

<div className={`${base}__upload`}>

<label className={`${base}__button`}>

Browse Files

<input
type="file"
multiple
accept="image/jpeg,image/jpg,image/png"
onChange={handleUpload}
/>

</label>

<span className={`${base}__count`}>
{images.length} Photos Selected
</span>

</div>

<ul className={`${base}__rules`}>

<li>
The maximum photo size is 8 MB. Formats: jpeg, jpg.
Put the main picture first
</li>

<li>
Maximum number of files upload will be 10 files.
</li>

</ul>

{success && (
<div className={`${base}__success`}>
✓ Photos Uploaded Successfully
</div>
)}

</div>

</div>

</section>

);

};

export default PropertyGallery;