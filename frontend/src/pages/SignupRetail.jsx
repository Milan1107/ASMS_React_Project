import "./signupRetail.css";
import logginSvg from '/src/assets/loggin.svg';

const  SignupRetail =() => {
  return (
      <div className="login-container">
        <div className="left-section">
          <h1>Already have an account?</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <button className="signup-btn" >SIGN IN</button>
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
            <button type="submit" className="signin-btn">SIGN UP</button>
          </form>
          <p>Sign up with social platforms</p>
          <div className="social-icons">
            <button><i className="fab fa-google"></i></button>
            <button><i className="fab fa-linkedin"></i></button>
          </div>
        </div>
      </div>
    );
};
export default SignupRetail;