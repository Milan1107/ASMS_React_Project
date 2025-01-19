import { useNavigate } from "react-router-dom";
import "./LoginPageRetail.css";
import logginSvg from '/src/assets/loggin.svg';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import {IconButton} from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/signup-retail");
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h3>Welcome to ASMS!</h3>
        <h1>New here?</h1><br></br>
        <button className="signup-btn" onClick={handleSignupClick}>SIGN UP</button>
        <img
          src={logginSvg}
          alt="Webinar Animation"
          style={{ width: "350px", height: "auto", marginTop: "20px" }}
        />
      </div>
      <div className="right-section">
        <h2>Sign in</h2>
        <form className="login-form">
          <div className="input-container">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Username" required />
          </div>
          <div className="input-container">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit" className="signin-btn">SIGN IN</button>
        </form>
        <p>Sign in with social platforms</p>
        <div className="social-icons">
          <IconButton sx={{ color: "black" }}>
            <GoogleIcon />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <FacebookIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
