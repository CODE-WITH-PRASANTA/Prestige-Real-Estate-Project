import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";

import PropetiesSale from "../Pages/PropetiesSale/PropetiesSale";
import PropertiesRent from "../Pages/PropertiesRent/PropertiesRent";
import Testimonial from "../Pages/Testimonial/Testimonial";
import FaqPosting from "../Pages/FaqPosting/FaqPosting";
import BlogPosting from "../Pages/BlogPosting/BlogPosting";
import DashBoard from "../Pages/DashBoard/DashBoard";

import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import AddCustomer from "../Pages/AddCustomer/AddCustomer";
import NewCustomer from "../Pages/NewCustomer/NewCustomer";
import PropertyView from "./Component/PropertyView/PropertyView";
import AddProperty from "./Component/AddProperty/AddProperty";
import MainGallery from "../Pages/MainGallery/MainGallery";


import LoginPage from "./Pages/LoginPage";
import Settingspage from "./Pages/Settingspage/Settingspage";

// AUTH
import { AuthProvider } from "./Auth/AuthContext";
import ProtectedRoute from "./Auth/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* LOGIN */}
          <Route path="/login" element={<LoginPage />} />

          {/* PROTECTED */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            {/* default */}
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<DashBoard />} />

            <Route path="admin/saleproperty" element={<PropetiesSale />} />
            <Route path="admin/rentproperty" element={<PropertiesRent />} />
            <Route path="admin/testimonial" element={<Testimonial />} />
            <Route path="admin/faqposting" element={<FaqPosting />} />
            <Route path="admin/blogposting" element={<BlogPosting />} />
            <Route path="/admin/gallery" element={<MainGallery/>} />

            <Route path="add/customer" element={<AddCustomer />} />
            <Route path="new/customer" element={<NewCustomer />} />

            <Route path="admin/Property-view" element={<PropertyView />} />
            <Route path="admin/add-property" element={<AddProperty />} />

            <Route path="admin/profile" element={<AdminProfile />} />
            <Route path="admin/settings" element={<Settingspage />} />

          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}