import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";

import PropetiesSale from "../Pages/PropetiesSale/PropetiesSale";
import PropertiesRent from "../Pages/PropertiesRent/PropertiesRent";
import Pricing from "../Pages/Pricing/Pricing";
import Testimonial from "../Pages/Testimonial/Testimonial";
import FaqPosting from "../Pages/FaqPosting/FaqPosting";
import BlogPosting from "../Pages/BlogPosting/BlogPosting";
import DashBoard from "../Pages/DashBoard/DashBoard";
import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import AddCustomer from "../Pages/AddCustomer/AddCustomer";
import NewCustomer from "../Pages/NewCustomer/NewCustomer";
import PropertyView from "./Component/PropertyView/PropertyView";
import AddProperty from "./Component/AddProperty/AddProperty";





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
         <Route path="/admin/profile" element={<AdminProfile/>}/>
         <Route path="/add/customer" element={<AddCustomer/>}/>
         <Route path="/new/customer" element={<NewCustomer/>} />
         <Route path="/admin/Property-view" element={<PropertyView/>} />
         <Route path="/admin/add-property" element={<AddProperty />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}