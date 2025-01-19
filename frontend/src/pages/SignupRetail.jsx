import "./signupRetail.css";
import logginSvg from "/src/assets/loggin.svg";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import {IconButton} from "@mui/material";


const SignupRetail = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleSignInRetail = () => {
    navigate("/login-retail"); // Navigate to the login-retail page
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h3>Welcome to ASMS!</h3>
        <h1>Already have an account?</h1>
        <br />
        <button className="signup-btn" onClick={handleSignInRetail}>
          SIGN IN
        </button>
        <img
          src={logginSvg}
          alt="Webinar Animation"
          style={{ width: "350px", height: "auto", marginTop: "20px" }}
        />
      </div>
      <div className="right-section">
        <h2>Sign Up</h2>
        <form className="login-form">
          <div className="input-container">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Name" required />
          </div>
          <div className="input-container">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Username" required />
          </div>
          <div className="input-container">
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-container">
            <i className="fas fa-envelope"></i>
            <input type="text" placeholder="Contact No." required />
          </div>
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" required />
          </div>
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Confirm Password" required />
          </div>
          <button type="submit" className="signin-btn">
            SIGN UP
          </button>
        </form>
        <p>Sign up with social platforms</p>
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

export default SignupRetail;
