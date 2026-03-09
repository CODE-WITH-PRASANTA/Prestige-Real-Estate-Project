import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import BlogList from "./Pages/BlogList/BlogList";
import Pricing from "./Components/Pricing/Pricing";
import FAQ from "./Components/FAQ/FAQ";


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
        <Route path="/news" element={<BlogList />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;