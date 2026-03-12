import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import Dashboard from "../Pages/Dashboard";
import PropetiesSale from "../Pages/PropetiesSale/PropetiesSale";
import PropertiesRent from "../Pages/PropertiesRent/PropertiesRent";





export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Layout Wrapper */}
        <Route element={<AdminLayout/>}>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/admin/saleproperty" element={<PropetiesSale/>}/>
        <Route path="/admin/rentproperty" element={<PropertiesRent/>}/>
         

         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}