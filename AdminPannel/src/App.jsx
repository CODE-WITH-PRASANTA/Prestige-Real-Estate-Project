import { BrowserRouter, Routes, Route } from "react-router-dom";




import Pricing from "./Pages/Pricing/Pricing";
import Testimonial from "./Pages/Testimonial/Testimonial";
import FaqPosting from "./Pages/FaqPosting/FaqPosting";
import BlogPosting from "./Pages/BlogPosting/BlogPosting";
import DashBoard from "./Pages/DashBoard/DashBoard";
import AdminLayout from "./Layout/AdminLayout";
import Propertyposting from "./Component/Propertyposting/Propertyposting";
import PropertyView from "./Component/PropertyView/PropertyView";






export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Layout Wrapper */}
        <Route element={<AdminLayout />}>
       <Route path="/"element={<DashBoard/>}/>
        
       
        <Route path="/admin/pricing" element={<Pricing/>}/>
        <Route path="/admin/testimonial" element={<Testimonial/>}/>
        <Route path="/admin/faqposting" element={<FaqPosting/>}/>
        <Route path="/admin/blogposting" element={<BlogPosting/>}/>
        <Route path="/admin/saleproperty" element={<Propertyposting />} />
        <Route path="/admin-property-view" element={<PropertyView />} />
         

         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}