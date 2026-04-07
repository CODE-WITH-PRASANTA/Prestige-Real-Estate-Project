import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import DashBoard from "./Pages/DashBoard/DashBoard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent Layout */}
        <Route element={<AdminLayout />}>
          <Route path="/" element={<DashBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
