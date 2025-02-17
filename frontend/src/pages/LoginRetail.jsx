import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./LoginPageRetail.css";
import logginSvg from '/src/assets/loggin.svg';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { IconButton } from "@mui/material";
import Cookies from "js-cookie";
import { handleError, handleSuccess } from "../utils";

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [signinInfo, setsigninInfo] = useState({
    Email: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setsigninInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch protected data
  const fetchProtectedData = async () => {
    const authToken = localStorage.getItem("authToken") || Cookies.get("authToken");
  
    if (!authToken) {
      handleError("You are not logged in. Please sign in.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, 
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Protected Data:", data);
      } else {
        // handleError("Unauthorized! Please log in again.");
      }
    } catch (error) {
      console.error("Error fetching protected data:", error);
    }
  };

  // Call fetchProtectedData when the component mounts (optional)
  useEffect(() => {
    fetchProtectedData();
  }, []);

  // Handle sign-in
  const handleSignin = async (e) => {
    e.preventDefault();
    const { Email, password } = signinInfo;
  
    if (!Email || !password) {
      handleError("Both fields are required!");
      return;
    }
  
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: Email, password }),
      });

      const result = await response.json().catch(() => null);
      if (!result) {
        handleError("Unexpected server response. Please try again later.");
        return;
      }
  
      const { success, message, token } = result;

      if (response.ok && success) {
        localStorage.setItem("authToken", token);
        Cookies.set("authToken", token, { expires: 1 });

        handleSuccess(message || "Sign-in successful!");
        fetchProtectedData();

        setTimeout(() => navigate("/"), 1500);
      } else {
        handleError(message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      handleError("Something went wrong. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <h3>Welcome to ASMS!</h3>
        <h1>New here?</h1><br />
        <button className="signup-btn" onClick={() => navigate("/signup-retail")}>SIGN UP</button>
        <img
          src={logginSvg}
          alt="Webinar Animation"
          style={{ width: "350px", height: "auto", marginTop: "20px" }}
        />
      </div>
      <div className="right-section">
        <h2>Sign in</h2>
        <form className="login-form" onSubmit={handleSignin}>
          <div className="input-container">
            <i className="fas fa-user"></i>
            <input
              name="Email"
              value={signinInfo.Email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input
              name="password"
              value={signinInfo.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              required
            />
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
