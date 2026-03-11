import React, { useState } from "react";
import "./Description.css";

const Description = () => {

const base = "property-description";

const [text,setText] = useState("");

return (

<section className={base}>

<div className={`${base}__container`}>

{/* LEFT TEXT */}

<div className={`${base}__left`}>

<h2 className={`${base}__title`}>
Description
</h2>

<p className={`${base}__desc`}>
A beautifully designed home combining style and function,
ideal for modern lifestyles and peaceful, long-term living.
</p>

</div>


{/* RIGHT CARD */}

<div className={`${base}__card`}>

<div className={`${base}__field`}>

<label>Description of Property</label>

<textarea
value={text}
onChange={(e)=>setText(e.target.value)}
placeholder="Write property description here..."
/>

</div>

</div>

</div>

</section>

);

};

export default Description;