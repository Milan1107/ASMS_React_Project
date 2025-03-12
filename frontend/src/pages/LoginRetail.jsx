import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPageRetail.css";
import logginSvg from '/src/assets/loggin.svg';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { IconButton, Button } from "@mui/material";
// import { handleError, handleSuccess } from "../utils";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setsigninInfo((prev) => ({ ...prev, [name]: value }));
  // };

  const handleSignin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = `http://localhost:8080/auth/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
                const data = await response.json();
                localStorage.setItem("user", JSON.stringify({ username, token: data.token }));
                navigate("/dashboard");
              } else {
                setError("Invalid username or password!");
              }
            } catch (error) {
              console.error("Login Error:", error);
              setError("Failed to connect to server!");
            }
    };

  return (
    <div className="login-container">
      <div className="left-section">
        <h3>Welcome to ASMS!</h3>
        <h1>New here?</h1><br />
        <button className="signup-btn" onClick={() => navigate("/signup-retail")}>SIGN UP</button>
        <img src={logginSvg} alt="Webinar Animation" style={{ width: "350px", height: "auto", marginTop: "20px" }} />
      </div>

      <div className="right-section">
        <h2>Sign in</h2>
        <form className="login-form" onSubmit={handleSignin}>
          <div className="input-container">
            <input
              name="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              required
            />
          </div>
          <div className="input-container">
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <Button className="signin-btn" variant="contained" type="submit">
            SIGN IN
          </Button>
        </form>

        <p>Sign in with social platforms</p>
        <div className="social-icons">
          <IconButton sx={{ color: "black" }}><GoogleIcon /></IconButton>
          <IconButton sx={{ color: "black" }}><FacebookIcon /></IconButton>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginPageRetail.css";

// const Login = () => {
  // const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch("http://localhost:8080/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem("user", JSON.stringify({ username, token: data.token }));
//         navigate("/dashboard");
//       } else {
//         setError("Invalid username or password!");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//       setError("Failed to connect to server!");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login to Retail Dashboard</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//         {error && <p className="error">{error}</p>}
//       </form>
//     </div>
//   );
// };

// export default Login;

















// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginPageRetail.css";
// import logginSvg from '/src/assets/loggin.svg';
// import GoogleIcon from '@mui/icons-material/Google';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import { IconButton, Button } from "@mui/material";
// import { handleError, handleSuccess } from "../utils";

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [signinInfo, setsigninInfo] = useState({ Email: '', password: '' });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setsigninInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSignin = async (e) => {
//     e.preventDefault();
//     const { Email, password } = signinInfo;
//     if (!Email || !password) return handleError("Both fields are required!");

//     try {
//       const url = `http://localhost:8080/auth/login`;
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: Email, password }),
//       });

//       const result = await response.json().catch(() => null);
//       if (!result) return handleError("Unexpected server response. Please try again later.");

//       const { success, message } = result;
//       if (response.ok && success) {
//         handleSuccess(message || "Sign-in successful!");
//         setTimeout(() => navigate("/dashboard"), 1500); // Redirect after successful login
//       } else handleError(message || "Invalid credentials.");
//     } catch (err) {
//       handleError("Something went wrong. Please try again later.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="left-section">
//         <h3>Welcome to ASMS!</h3>
//         <h1>New here?</h1><br />
//         <button className="signup-btn" onClick={() => navigate("/signup-retail")}>SIGN UP</button>
//         <img src={logginSvg} alt="Webinar Animation" style={{ width: "350px", height: "auto", marginTop: "20px" }} />
//       </div>

//       <div className="right-section">
//         <h2>Sign in</h2>
//         <form className="login-form" onSubmit={handleSignin}>
//           <div className="input-container">
//             <input
//               name="Email"
//               value={signinInfo.Email}
//               onChange={handleChange}
//               type="email"
//               placeholder="Email"
//               required
//             />
//           </div>
//           <div className="input-container">
//             <input
//               name="password"
//               value={signinInfo.password}
//               onChange={handleChange}
//               type="password"
//               placeholder="Password"
//               required
//             />
//           </div>

//           <Button className="signin-btn" variant="contained" type="submit">
//             SIGN IN
//           </Button>
//         </form>

//         <p>Sign in with social platforms</p>
//         <div className="social-icons">
//           <IconButton sx={{ color: "black" }}><GoogleIcon /></IconButton>
//           <IconButton sx={{ color: "black" }}><FacebookIcon /></IconButton>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
