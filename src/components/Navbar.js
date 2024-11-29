import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand ms-5">
        <Link to="/">moo-veed.</Link>
      </div>
      <div className="navbar-links me-5">
        {isLoggedIn ? (
          <button className="btn btn-link nav-link" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
