import React from "react";
import "./Switchbar.css";

const Switchbar = ({activeTab,setActiveTab}) => {

const base = "switchbar";

const tabs = [
"Property Information",
"Property Details",
"Amenities",
"Documents",
"Gallery",
"Videos",
"Description",
"Floor Plans",
"Location"
];

return (

<section className={base}>

<div className={`${base}__container`}>

<div className={`${base}__tabs`}>

{tabs.map((tab,index)=>(
<button
key={index}
className={`${base}__tab ${activeTab===tab ? `${base}__tab--active` : ""}`}
onClick={()=>setActiveTab(tab)}
>
{tab}
</button>
))}

</div>

</div>

</section>

);

};

export default Switchbar;