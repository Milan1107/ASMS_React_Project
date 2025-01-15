import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="left-section">
        <h1>New here?</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        <button className="signup-btn">SIGN UP</button>
        <img src="https://via.placeholder.com/300x200" alt="Illustration" className="illustration" />
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
          <button><i className="fab fa-google"></i></button>
          <button><i className="fab fa-linkedin"></i></button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
