// import "./signupRetail.css";
// import logginSvg from "/src/assets/loggin.svg";
// import { useNavigate } from "react-router-dom";
// import GoogleIcon from '@mui/icons-material/Google';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import { IconButton } from "@mui/material";
// import { useState } from "react";
// import { handleError, handleSuccess } from "../utils";

// const SignupRetail = () => {
//   const navigate = useNavigate();

//   const handleSignInRetail = () => {
//     navigate("/login-retail");
//   };

//   const [signupInfo, setsignupInfo] = useState({
//     name: '',
//     username: '',
//     email: '',
//     contactNumber: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setsignupInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     const { name, username, email, contactNumber, password, confirmPassword } = signupInfo;

//     if (!name || !username || !email || !contactNumber || !password || !confirmPassword) {
//       handleError('All fields are required!');
//       return;
//     }

//     if (password !== confirmPassword) {
//       handleError('Passwords do not match!');
//       return;
//     }

//     // handleSuccess('Sign-up successful!');
//     // Add your sign-up API logic here

//     try {
//       const url = "http://localhost:8080/auth/signup";
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(signupInfo),
//       });
    
//       const result = await response.json();
//       const { success, message, errors } = result;
    
//       if (response.ok && success) {
//         handleSuccess(message || 'Sign-up successful!');
//         setTimeout(() => {
//           navigate("/login-retail");
//         }, 2500);
//       } else {
//         // If errors array exists, format and display all messages
//         const errorMessages = errors 
//           ? errors.map(err => `${err.field}: ${err.message}`).join('\n') 
//           : message || 'An error occurred.';
//         handleError(errorMessages);
//       }
    
//       console.log(result);
//     } catch (err) {
//       handleError('Something went wrong. Please try again later.');
//       console.error(err);
//     }
    
//   };

//   return (
//     <div className="login-container">
//       <div className="left-section">
//         <h3>Welcome to ASMS!</h3>
//         <h1>Already have an account?</h1>
//         <br />
//         <button className="signup-btn" onClick={handleSignInRetail}>
//           SIGN IN
//         </button>
//         <img
//           src={logginSvg}
//           alt="Webinar Animation"
//           style={{ width: "350px", height: "auto", marginTop: "20px" }}
//         />
//       </div>
//       <div className="right-section">
//         <h2>Sign Up</h2>
//         <form className="signup-form" onSubmit={handleSignup}>
//           <div className="input-container">
//             <i className="fas fa-user"></i>
//             <input onChange={handleChange} type="text" name="name" placeholder="Name" value={signupInfo.name} />
//           </div>
//           <div className="input-container">
//             <i className="fas fa-user"></i>
//             <input onChange={handleChange} type="text" name="username" placeholder="Username" value={signupInfo.username} />
//           </div>
//           <div className="input-container">
//             <i className="fas fa-envelope"></i>
//             <input onChange={handleChange} type="email" name="email" placeholder="Email" value={signupInfo.email} />
//           </div>
//           <div className="input-container">
//             <i className="fas fa-envelope"></i>
//             <input onChange={handleChange} type="text" name="contactNumber" placeholder="contactNumber No." value={signupInfo.contactNumber} />
//           </div>
//           <div className="input-container">
//             <i className="fas fa-lock"></i>
//             <input onChange={handleChange} type="password" name="password" placeholder="Password" value={signupInfo.password} />
//           </div>
//           <div className="input-container">
//             <i className="fas fa-lock"></i>
//             <input onChange={handleChange} type="password" name="confirmPassword" placeholder="Confirm Password" value={signupInfo.confirmPassword} />
//           </div>
//           <button type="submit" className="signin-btn">
//             SIGN UP
//           </button>
//         </form>
//         <p>Sign up with social platforms</p>
//         <div className="social-icons">
//           <IconButton sx={{ color: "black" }}>
//             <GoogleIcon />
//           </IconButton>
//           <IconButton sx={{ color: "black" }}>
//             <FacebookIcon />
//           </IconButton>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupRetail;








import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupRetail = () => {
  const [formData, setFormData] = useState({ name: '', username: '', email: '', contactNumber: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/signup', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); // 🔄 Redirect after successful signup
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed!');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {['name', 'username', 'email', 'contactNumber', 'password', 'confirmPassword'].map((field) => (
          <input
            key={field}
            type={field.includes('password') ? 'password' : 'text'}
            name={field}
            placeholder={field.replace(/([A-Z])/g, ' $1')}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupRetail;
