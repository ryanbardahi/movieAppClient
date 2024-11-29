import React, { useState, useContext } from "react";
import { Notyf } from "notyf";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import "notyf/notyf.min.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { setIsLoggedIn } = useContext(UserContext); // Access context
  const notyf = new Notyf();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      setLoading(true);
      const response = await fetch(
        "https://moviecatalogapi-bardahi.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Store the token in local storage
        localStorage.setItem("userToken", data.token); // Adjust key as needed
        notyf.success("Login successful!");
        setIsLoggedIn(true); // Update login state
        setTimeout(() => navigate("/movies"), 1000); // Redirect to Movie List
      } else {
        const errorData = await response.json();
        notyf.error(`Error: ${errorData.message || "Login failed."}`);
      }
    } catch (error) {
      notyf.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="register-prompt">
        Don’t have an account yet? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
