// ============================================
// App.jsx (FIXED & CLEAN)
// ============================================

import React from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

/* COMMON COMPONENTS */
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Topbar from "./Components/Topbar/Topbar";
import FloatingForm from "./Components/FloatingForm/FloatingForm";
import FloatingIcons from "./Components/FloatingIcons/FloatingIcons";

/* PAGES */
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

import RentProperty from "./Pages/RentProperty/RentProperty";

function App() {
  const location = useLocation();

  /* HIDE NAVBAR/FOOTER ON LOGIN REGISTER */
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {/* TOPBAR */}
      {!hideLayout && <Topbar />}

      {/* NAVBAR */}
      {!hideLayout && <Navbar />}

      {/* ROUTES */}
      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ABOUT */}
        <Route path="/about" element={<About />} />

        {/* CONTACT */}
        <Route path="/contact" element={<ContactSection />} />

        {/* PRICING */}
        <Route path="/pricing" element={<PrisingSection />} />

        {/* FAQ */}
        <Route path="/faq" element={<FaqSection />} />

        {/* BLOG */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/bloglist" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogDetails />} />

        {/* PROPERTY */}
        <Route path="/property" element={<Property />} />

        {/* RENT */}
        <Route path="/rent/details" element={<Rentdetails />} />
        <Route path="/rent/property" element={<RentProperty />} />

        {/* BUY */}
        <Route path="/buyproperties" element={<BuyGrid />} />
        <Route path="/property/:id" element={<BuyDetails />} />

      </Routes>

      {/* FLOATING ICONS */}
      {!hideLayout && <FloatingIcons />}

      {/* FLOATING FORM */}
      {!hideLayout && <FloatingForm />}

      {/* FOOTER */}
      {!hideLayout && <Footer />}
    </>
  );
}

export default App;