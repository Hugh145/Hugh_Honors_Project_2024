import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// This component allows users to log in to the application
// It includes a form with fields for email and password
const Login = ({ setLoggedInUser, setUserRole }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission and log in the user
  // It sends a POST request to the server with the email and password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", formData);
      const userData = res.data.user;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      setLoggedInUser(userData);
      setUserRole(userData.userType);

      // Redirect to home page after login
      navigate("/");
    } catch (error) {
      setMessage({ type: "danger", text: error.response?.data?.message || "Login failed" });
    }
  };

  return (
    <div className="container mt-4 p-4 border rounded">
      <h2>Login</h2>
      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;


