import React from 'react'
import AboutBreadcrum from '../../Components/AboutBreadcrum/AboutBreadcrum'
import AboutPeople from '../../Components/AboutPeople/AboutPeople'
import AboutStats from "../../Components/AboutStats/AboutStats";
import AboutBook from "../../Components/AboutBook/AboutBook";
import AboutPartner from "../../Components/AboutPartner/AboutPartner"
import AboutRent from '../../Components/AboutRent/AboutRent';
import AboutExperience from '../../Components/AboutExperience/AboutExperience';
import GetInTouch from '../../Components/GetInTouch/GetInTouch';
import Breadcrumbmain from '../../Components/BreadcrumbMain/BreadcrumbMain';



const About = () => {
  return (
    <div>
     
      <Breadcrumbmain />
       <AboutRent />
       <AboutExperience />
       <GetInTouch />
      <AboutPeople/>
      <AboutStats/>
      <AboutBook/>
      <AboutPartner/>
      
      
    </div>
  )
}

export default About