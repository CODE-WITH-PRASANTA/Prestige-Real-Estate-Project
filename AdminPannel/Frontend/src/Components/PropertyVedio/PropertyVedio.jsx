import React, { useState } from "react";
import "./PropertyVedio.css";

const PropertyVedio = () => {

const base = "property-video";

const [form,setForm] = useState({
embed:"",
videoLink:""
});

const handleChange = (e) => {
const {name,value} = e.target;
setForm({...form,[name]:value});
};

return (

<section className={base}>

<div className={`${base}__container`}>

{/* LEFT TEXT */}

<div className={`${base}__left`}>

<h2 className={`${base}__title`}>
Property Video
</h2>

<p className={`${base}__desc`}>
Watch immersive property videos offering a real-time view of space,
flow, lighting, and ambiance from every angle.
</p>

</div>


{/* RIGHT CARD */}

<div className={`${base}__card`}>

<div className={`${base}__grid`}>

{/* EMBED VIDEO */}

<div className={`${base}__field`}>
<label>Embed Video</label>

<select
name="embed"
value={form.embed}
onChange={handleChange}
>
<option value="">Select</option>
<option>YouTube</option>
<option>Vimeo</option>
<option>HTML5 Video</option>
</select>

</div>


{/* VIDEO LINK */}

<div className={`${base}__field`}>
<label>Video Link</label>

<input
type="text"
name="videoLink"
placeholder="Paste video link here"
value={form.videoLink}
onChange={handleChange}
/>

</div>

</div>

</div>

</div>

</section>

);

};

export default PropertyVedio;