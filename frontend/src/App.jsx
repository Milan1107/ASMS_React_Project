import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginRetail from "./pages/LoginRetail"; // Component for Retail login
import SignupRetail from "./pages/SignupRetail"; // Component for Retail signup

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-retail" element={<LoginRetail />} />
        <Route path="/signup-retail" element={<SignupRetail />} />
      </Routes>
    </Router>
  );
};

export default App;
