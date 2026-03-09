import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Home/Login/Login";
import Register from "./Pages/Home/Register/Register";
import BlogList from "./Pages/Home/BlogList/BlogList";

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
        <Route path="/blog-list" element={<BlogList />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;