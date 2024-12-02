import React, { useState } from "react";
import { Notyf } from "notyf";
import { useNavigate, Link } from "react-router-dom";
import "notyf/notyf.min.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false); // State for loading

  const notyf = new Notyf();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Check password match
    if (name === "password" || name === "confirmPassword") {
      setPasswordMatch(
        name === "confirmPassword"
          ? value === formData.password
          : formData.confirmPassword === value
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      notyf.error("Passwords do not match!");
      return;
    }

    const { email, password } = formData;

    try {
      setLoading(true); // Set loading state
      const response = await fetch(
        "https://moviecatalogapi-bardahi.onrender.com/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, isAdmin: false }),
        }
      );

      if (response.ok) {
        notyf.success("Registration successful!");
        setFormData({ email: "", password: "", confirmPassword: "" });

        // Redirect to login page after 1 second
        setTimeout(() => navigate("/login"), 1000);
      } else {
        const errorData = await response.json();
        notyf.error(`Error: ${errorData.message || "Registration failed."}`);
      }
    } catch (error) {
      notyf.error(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <p className="error-text">Passwords do not match!</p>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="login-prompt">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;