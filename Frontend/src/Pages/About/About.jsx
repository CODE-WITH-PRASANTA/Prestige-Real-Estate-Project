import React from 'react'
import AboutBreadcrum from '../../Components/AboutBreadcrum/AboutBreadcrum'
import AboutPeople from '../../Components/AboutPeople/AboutPeople'
import AboutStats from "../../Components/AboutStats/AboutStats";
import AboutBook from "../../Components/AboutBook/AboutBook";
import AboutPartner from "../../Components/AboutPartner/AboutPartner"



const About = () => {
  return (
    <div>
      <AboutBreadcrum />
      <AboutPeople/>
      <AboutStats/>
      <AboutBook/>
      <AboutPartner/>
      
      
    </div>
  )
}

export default About
