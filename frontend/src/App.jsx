import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginRetail from "./pages/LoginRetail"; // Component for Retail login
import LoginAgency from "./pages/LoginAgency"; // Component for Agency login

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-retail" element={<LoginRetail />} />
        <Route path="/login-agency" element={<LoginAgency />} />
      </Routes>
    </Router>
  );
};

export default App;
