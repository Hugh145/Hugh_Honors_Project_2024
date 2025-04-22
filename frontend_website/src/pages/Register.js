// frontend/Register.js
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// This component allows users to register for an account
// It includes a form with fields for first name, last name, email, password, user type, address, and date of birth
// It handles form submission and displays success or error messages
// It uses axios to send a POST request to the server with the form data
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "user",
    address1: "",
    address2: "",
    dob: "",
    image: "",
    message: null,
  });

  // Function to handle form input changes
  // It updates the state with the new value of the input field
  // It uses the name attribute of the input field to determine which state variable to update
  // It uses the spread operator to copy the existing state and update only the changed field
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  // It prevents the default form submission behavior
// It sends a POST request to the server with the form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", formData);
      setFormData({ ...formData, message: { type: "success", text: "User registered successfully" } });
    } catch (error) {
      setFormData({ ...formData, message: { type: "danger", text: error.response.data.message } });
    }
  };

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      userType: "user",
      address1: "",
      address2: "",
      dob: "",
      image: "",
      message: null,
    });
  };

  return (
    <div className="container mt-4 p-4 border rounded">
      <h2>Register</h2>
      {formData.message && (
        <div className={`alert alert-${formData.message.type === "success" ? "success" : "danger"}`}>
          {formData.message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" id="inputPassword5" name="password" value={formData.password} onChange={handleChange} className="form-control" aria-describedby="passwordHelpBlock" required minLength="8" maxLength="50" />
          <div id="passwordHelpBlock" className="form-text">
            Your password must be 8-50 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="dob" className="form-label">Date of Birth</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="address1" className="form-label">Address 1</label>
          <input type="text" id="address1" name="address1" value={formData.address1} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="address2" className="form-label">Address 2 (Optional)</label>
          <input type="text" id="address2" name="address2" value={formData.address2} onChange={handleChange} className="form-control" />
        </div>
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">Register</button>
          <button type="button" className="btn btn-secondary" onClick={handleClear}>Clear</button>
        </div>
      </form>
    </div>
  );
};

export default Register;




