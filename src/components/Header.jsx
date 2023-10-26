import "../styles/Header.css";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  const Logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };
  return (
    <header className="app-header">
      <div className="header-logo">
        <img src="/public/LOGO.png" alt="Logo" />
      </div>
      <nav className="main-nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <Link to="/contact_us" className="nav-link">
          Contact Us
        </Link>
        {isAuthenticated && (
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        )}
      </nav>
      <div className="auth-section">
        {!isAuthenticated && (
          <>
            <Link to="/login" className="auth-link auth-login">
              Login
            </Link>
            <Link to="/register" className="auth-link auth-register">
              Register
            </Link>
          </>
        )}
        {isAuthenticated && (
          <button onClick={Logout} className="auth-button auth-logout">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
