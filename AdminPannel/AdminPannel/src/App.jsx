import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";

import PropetiesSale from "../Pages/PropetiesSale/PropetiesSale";
import PropertiesRent from "../Pages/PropertiesRent/PropertiesRent";
import Pricing from "../Pages/Pricing/Pricing";
import Testimonial from "../Pages/Testimonial/Testimonial";
import FaqPosting from "../Pages/FaqPosting/FaqPosting";
import BlogPosting from "../Pages/BlogPosting/BlogPosting";
import DashBoard from "../Pages/DashBoard/DashBoard";





export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Layout Wrapper */}
        <Route element={<AdminLayout/>}>
       <Route path="/"element={<DashBoard/>}/>
        <Route path="/admin/saleproperty" element={<PropetiesSale/>}/>
        <Route path="/admin/rentproperty" element={<PropertiesRent/>}/>
        <Route path="/admin/pricing" element={<Pricing/>}/>
        <Route path="/admin/testimonial" element={<Testimonial/>}/>
        <Route path="/admin/faqposting" element={<FaqPosting/>}/>
        <Route path="/admin/blogposting" element={<BlogPosting/>}/>
         

         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}