import React from 'react'
import MainPropertyDetails from '../../Components/MainPropertyDetails/MainPropertyDetails'
import PropertyDetailsGallery from '../../Components/PropertyDetailsGallery/PropertyDetailsGallery'
import PropertyDetailsStrip from '../../Components/PropertyDetailsStrip/PropertyDetailsStrip'
import OwnerEnquiry from '../../Components/OwnerEnquiry/OwnerEnquiry'
import SimilarProperties from '../../Components/SimilarProperties/SimilarProperties'
import RelatedSearch from '../../Components/RelatedSearch/RelatedSearch'
import AboutProperty from '../../Components/AboutProperty/AboutProperty'

const Rentdetails = () => {
  return (
    <div>
      <MainPropertyDetails/>
      <PropertyDetailsGallery/>
      <PropertyDetailsStrip/>
      <AboutProperty/>
      <OwnerEnquiry/>
      <SimilarProperties/>
      <RelatedSearch/>
    
    </div>
  )
}

export default Rentdetails
