import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import About from "./Pages/About/About";



import Blog from "./Pages/Blog/Blog";
import BlogList from "./Pages/BlogList/BlogList";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import Property from "./Pages/Property/Property";

import FaqSection from "./Pages/FaqSection/FaqSection";
import PrisingSection from "./Pages/PrisingSection/PrisingSection";
import TestimonialSection from "./Pages/TestimonialSection/TestimonialSection";
import ContactSection from "./Pages/ContactSection/ContactSection";
import Rentdetails from "./Pages/Rentdetails/Rentdetails";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/pricing" element={<PrisingSection />} />

        <Route path="/faq" element={<FaqSection />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/bloglist" element={<BlogList />} />
        <Route path="/blog-details" element={<BlogDetails />} />

        <Route path="/property" element={<Property />} />
        <Route path="/testimonial" element={<TestimonialSection />} />
        <Route path="/Rentdetails" element={<Rentdetails/>}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;