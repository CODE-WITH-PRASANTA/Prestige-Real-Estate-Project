import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";


import Pricing from "./Components/Pricing/Pricing";
import FAQ from "./Components/FAQ/FAQ";
import Blog from "./Pages/Blog/Blog";
import BlogList from "./Pages/BlogList/BlogList";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import Property from "./Pages/Property/Property";
import Testimonial from "./Pages/Testimonial/Testimonial";


function App() {
  const location = useLocation();

  const authRoutes = ["/login", "/register"];
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/bloglist" element={<BlogList/>}/>
        <Route path="/blog-details" element={<BlogDetails/>}/>
        <Route path="/property" element={<Property/>}/>
        <Route path="/testimonial" element={<Testimonial/>}/>
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;