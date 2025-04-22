import React, { useState } from 'react';
import axios from 'axios';

// This component allows users to change their password
const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Function to handle form submission and change password
  // It checks if the new password and confirm password match
  // If they do, it sends a POST request to the server with the current and new passwords
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setMessage('New passwords do not match');
      setMessageType('danger');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/users/change-password',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      setMessageType('success');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error changing password');
      setMessageType('danger');
    }
  };

  // Function to clear the form fields and message
  // It resets the state variables to their initial values
  // This is useful for clearing the form after submission or when the user wants to reset the form
  const handleClear = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setMessage('');
    setMessageType('');
  };

  return (
    <div className='container mt-4 p-4 border rounded'>
      <h2>Change Password</h2>
      {message && (
        <div className={`alert alert-${messageType}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className='form-group mb-3'>
          <label>Current Password:</label>
          <input
            type='password'
            className='form-control'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className='form-group mb-3'>
          <label>New Password:</label>
          <input
            type='password'
            className='form-control'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className='form-group mb-3'>
          <label>Confirm New Password:</label>
          <input
            type='password'
            className='form-control'
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <div className='d-flex gap-2'>
          <button type='submit' className='btn btn-primary'>
            Change Password
          </button>
          <button type='button' className='btn btn-secondary' onClick={handleClear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;

