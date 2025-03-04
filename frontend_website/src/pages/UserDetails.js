import React, { useState, useEffect } from "react";
import axios from "axios";

const UserDetails = ({ loggedInUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    address1: "",
    address2: "",
  });
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (loggedInUser) {
      axios.get(`http://localhost:5000/api/users/${loggedInUser.email}`)
        .then((response) => {
          setFormData(response.data);
          setOriginalData(response.data);
          setLoading(false);
        })
        .catch(() => {
          setMessage({ type: "danger", text: "Failed to fetch user details." });
          setLoading(false);
        });
    }
  }, [loggedInUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (JSON.stringify(formData) === JSON.stringify(originalData)) {
      setMessage({ type: "info", text: "No changes made." });
      return;
    }

    try {
      const response = await axios.put("http://localhost:5000/api/users/update", {
        email: loggedInUser.email,
        updates: formData,
      });

      if (response.status === 200) {
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setOriginalData(formData);
      } else {
        setMessage({ type: "danger", text: response.data.message });
      }
    } catch (error) {
      setMessage({ type: "danger", text: "Error updating profile." });
    }
  };

  if (loading) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="container mt-4">
      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}
      
      {/* User Details Section */}
      <div className="card p-4 shadow mb-4">
        <h2>Profile Details</h2>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>First Name:</strong> {formData.firstName}</p>
        <p><strong>Last Name:</strong> {formData.lastName}</p>
        <p><strong>Date of Birth:</strong> {new Date(formData.dob).toLocaleDateString('en-GB')}</p>
        <p><strong>Address 1:</strong> {formData.address1}</p>
        {formData.address2 && <p><strong>Address 2:</strong> {formData.address2}</p>}
      </div>

      {/* Profile Update Form */}
      <div className="card p-4 shadow">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Address 1</label>
            <input type="text" name="address1" value={formData.address1} onChange={handleChange} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Address 2 (Optional)</label>
            <input type="text" name="address2" value={formData.address2} onChange={handleChange} className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;

