// src/components/Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Navbar component to display the navigation bar
// It shows different links based on whether the user is logged in or not
const Navbar = ({ loggedInUser, userRole, handleLogout }) => {
  const [user, setUser] = useState(loggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, [loggedInUser]);

  // Handle logout button click action. It confirms the logout action 
  const handleLogoutClick = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      alert("Thank you for your time!");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      handleLogout();
      navigate("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Bird Finder Website 🐦</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">
                    {user.userType === "staff" ? "Welcome Staff," : "Welcome,"} {user.firstName}
                  </span>
                </li>
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/birds">Birds Filter page</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/object-detection"> Bird classification</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/view-predictions">View Predictions</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/view-blogs">Blogs</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/create-blog">Create Blog</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/user-profile-dashboard">Dashboard</Link></li>
                <li className="nav-item"><button className="btn btn-danger btn-sm" onClick={handleLogoutClick}>Logout</button></li>
              </>

            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/birds">Birds Filter page</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/object-detection"> Bird classification</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/view-blogs">Blogs</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


