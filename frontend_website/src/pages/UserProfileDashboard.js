// src/pages/UserProfileDashboard.js
import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Container for the entire dashboard
const DashboardContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: black;
  font-weight: bold;
  text-align: center;
`;

const MainContainer = styled.div`
    background-color: lightgrey;
    padding: 20px;
    border-radius: 8px;
    margin-top: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f7f7f7;
`;

// Section header
const SectionTitle = styled.h2`
  margin-bottom: 15px;
  text-align: center;
`;

// Container for the link cards
const CardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
`;

// A card that acts as a link to another page
const Card = styled(Link)`
  flex: 1;
  min-width: 250px;
  max-width: 300px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  color: #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Styled button for deleting the account
const DeleteButton = styled.button`
  background-color: #d9534f;
  border: none;
  color: #fff;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #c9302c;
  }
`;

// UserProfileDashboard component
// This component serves as a dashboard for user profile settings and account management
// It includes links to user details and change password pages, as well as a delete account button
// The delete account button prompts the user for confirmation before deleting their account
const UserProfileDashboard = () => {
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      // Call the backend endpoint to delete the user account.
      // Ensure you have implemented this DELETE route in your backend.
      await axios.delete("http://localhost:5000/api/users/delete", {
        headers: { Authorization: `Bearer ${token}` }
      });
      // On success, clear local storage and redirect to login.
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert("Account deleted successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again later.");
    }
  };

  return (
    <DashboardContainer>
    <MainContainer>
    <Title>User Profile Dashboard</Title>
      {/* Section 1: Account Settings Links */}
      <Section>
        <SectionTitle>Account Settings</SectionTitle>
        <CardContainer>
          <Card to="/user-details">User Details</Card>
          <Card to="/change-password">Change Password</Card>
        </CardContainer>
      </Section>

      {/* Section 2: Delete Account */}
      <Section>
        <SectionTitle>Delete Account</SectionTitle>
        <DeleteButton onClick={handleDeleteAccount}>
          Delete My Account
        </DeleteButton>
      </Section>
      </MainContainer>
    </DashboardContainer>
  );
};

export default UserProfileDashboard;
