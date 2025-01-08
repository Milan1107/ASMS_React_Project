import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">ASMS</div>
      <div className="location">
        <i className="fas fa-map-marker-alt"></i> Location
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button>🔍</button>
      </div>
      <div className="icons">
        <i className="fas fa-shopping-cart"></i>
        <span>Login</span>
      </div>
    </header>
  );
};

export default Header;
