import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Loader from "./Components/Loader/Loader"; // ✅ ADD LOADER

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

import ContactSection from "./Pages/ContactSection/ContactSection";
import Rentdetails from "./Pages/Rentdetails/Rentdetails";
import BuyGrid from "./Pages/Properties/Properties";
import BuyDetails from "./Pages/BuyDetails/BuyDetails";

import RentDetails from "./Components/RentProperty/RentProperty"; // (kept as you had)

import FloatingForm from "./Components/FloatingForm/FloatingForm";
import FloatingIcons from "./Components/FloatingIcons/FloatingIcons";

import RentProperty from "./Components/RentProperty/RentProperty";
import Topbar from "./Components/Topbar/Topbar";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  /* 🔥 INITIAL LOAD */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // adjust if needed

    return () => clearTimeout(timer);
  }, []);

  /* 🔥 ROUTE CHANGE LOADER */
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400); // smooth transition

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {/* ✅ GLOBAL LOADER */}
      {loading && <Loader />}

      <Topbar />
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

        {/* RENT ROUTES */}
        <Route path="/rent/details" element={<Rentdetails />} />
        <Route path="/rent/property" element={<RentProperty />} />

        {/* BUY ROUTES */}
        <Route path="/buyproperties" element={<BuyGrid />} />
        <Route path="/buydetails" element={<BuyDetails />} />
      </Routes>

      <FloatingIcons />
      <FloatingForm />
      <Footer />
    </>
  );
}

export default App;