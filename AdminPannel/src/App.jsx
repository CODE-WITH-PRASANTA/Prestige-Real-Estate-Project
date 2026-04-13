import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import DashBoard from "./Pages/DashBoard/DashBoard";
import BlogPosting from "./Pages/BlogPosting/BlogPosting";
import PropertyPosting from "./Pages/PropertyPosting/PropertyPosting";
import ColdLeadForm from "./Pages/ColdLead/ColdLead";
import ColdLeadTable from "./Pages/ColdLeadTable/ColdLeadTable";
import FlatPosting from "./Pages/FlatPosting/FlatPosting";
import TestimonialPost from "./Pages/TestimonialPost/TestimonialPost";
import EnquiryAdmin from "./Pages/EnquiryAdmin/EnquiryAdmin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/" element={<DashBoard />} />
          <Route path="/blog/post"element={<BlogPosting/>}/>
          <Route path="/property/post"element={<PropertyPosting/>}/>
          <Route path="/admin/cold-lead" element={<ColdLeadForm />} />
          <Route path="/admin/cold-lead-table" element={<ColdLeadTable />} />
          <Route path="/flat/post" element={<FlatPosting/>}/>
          <Route path="/admin/testimonial" element={<TestimonialPost/>}/>
          <Route path="/admin/enquiry" element={<EnquiryAdmin/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
