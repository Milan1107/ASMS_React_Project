import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleLoginOption = (option) => {
    const route = option === "Retail" ? "/login-retail" : "/login-agency";
    navigate(route); // Navigate to the respective login page
    setShowOptions(false);
  };

  return (
    <header className="header">
      <div className="logo">ASMS</div>
      <img src="../assets/ass.jpg" alt="logo" />
      <div className="location">
        <i className="fas fa-map-marker-alt"></i> Location
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button>🔍</button>
      </div>
      <div className="icons">
        <i className="fas fa-shopping-cart"></i>
        <div className="login-container" onClick={toggleOptions}>
          <i className="fas fa-user"></i> Login
          {showOptions && (
            <div className="login-options">
              <button onClick={() => handleLoginOption("Retail")}>
                <i className="fas fa-store"></i> Login as Retail
              </button>
              <button onClick={() => handleLoginOption("Agency Manager")}>
                <i className="fas fa-briefcase"></i> Login as Agency
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
