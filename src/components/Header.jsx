// import "../styles/Header.css";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const Logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };
  return (
    <header className="header">
      <div className="logo">
        <img src="/public/LOGO.png" alt="Logo" />
      </div>
      <nav className="navigation">
        <Link to="/">Home</Link>
        <Link to="/cars">Cars</Link>
        <Link to="/about">About</Link>
        <Link to="/contact_us">Contact Us</Link>
        {isAuthenticated && <Link to="/profile">Profile</Link>}
      </nav>
      <div className="auth-buttons">
        {!isAuthenticated && (
          <>
            <Link to="/login" className="login-btn">
              Login
            </Link>
            <Link to="/register" className="register-btn">
              Register
            </Link>
          </>
        )}
        {isAuthenticated && (
          <button onClick={Logout} className="Logout-btn">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
