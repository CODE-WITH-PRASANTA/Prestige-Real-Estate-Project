import React, { useState } from 'react'

import PropertyHero from '../../Components/PropertyHero/PropertyHero'
import Switchbar from '../../Components/Switchbar/Switchbar'
import PropertyInformation from '../../Components/PropertyInformation/PropertyInformation'
import PropertyDetails from '../../Components/PropertyDetails/PropertyDetails'
import Amenities from '../../Components/Amenities/Amenities'
import PropertyDocument from '../../Components/PropertyDocument/PropertyDocument'
import PropertyGallery from '../../Components/PropertyGallery/PropertyGallery'
import PropertyVedio from '../../Components/PropertyVedio/PropertyVedio'
import Description from '../../Components/Description/Description'
import FloorPlanes from '../../Components/FloorPlanes/FloorPlanes'
import Location from '../../Components/Location/Location'

const Property = () => {

const [activeTab,setActiveTab] = useState("Property Information")

const renderComponent = () => {

switch(activeTab){

case "Property Information":
return <PropertyInformation/>

case "Property Details":
return <PropertyDetails/>

case "Amenities":
return <Amenities/>

case "Documents":
return <PropertyDocument/>

case "Gallery":
return <PropertyGallery/>

case "Videos":
return <PropertyVedio/>

case "Description":
return <Description/>

case "Floor Plans":
return <FloorPlanes/>

case "Location":
return <Location/>

default:
return <PropertyInformation/>

}

}

return (

<div>

<PropertyHero/>

<Switchbar
activeTab={activeTab}
setActiveTab={setActiveTab}
/>

{renderComponent()}

</div>

)

}

export default Property