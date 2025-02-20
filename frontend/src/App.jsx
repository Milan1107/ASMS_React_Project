import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginRetail from "./pages/LoginRetail"; // Component for Retail login
import SignupRetail from "./pages/SignupRetail"; // Component for Retail signup
import Agency from "./pages/Agency";
import PrivateRoute from './PrivateRoute';
import RetailDashboard from "./pages/RetailDashboard";
import SideBar from "../src/components/agencyComponents/SideBar"; // Import SideBar
import DashBoard from "./components/agencyComponents/Pages/DashBoard/DashBoard";
import Inventory from "./components/agencyComponents/Pages/Inventory/Inventory";
import Customers from "./components/agencyComponents/Pages/Customer/Customer";
import Orders from "./components/agencyComponents/Pages/Order/Order";



import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-retail" element={<LoginRetail />} />
        <Route path="/signup-retail" element={<SignupRetail />} />
        <Route path="/dashboard" element={<PrivateRoute><RetailDashboard/></PrivateRoute>} />
        <Route path="/agency" element={<Agency />} />
        
        {/* Wrap agency pages inside SideBar */}
        <Route path="/agency/*" element={<SideBar />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
