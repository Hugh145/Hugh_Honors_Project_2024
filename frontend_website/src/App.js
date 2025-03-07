import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import Birds from "./pages/bird_Information_page_filter.js";
import BirdDetails from "./pages/BirdDetails.js";
import IdentifyBirdsPage from "./pages/ImagePrediction.js";
import Register from "./pages/Register.js";
import Login from "./pages/login.js";
import UserDetails from "./pages/UserDetails.js";
import {ObjectDetector} from "./components/objectDetector"
import StaffDashboard from "./pages/StaffDashboard.js";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Ensure the app remembers logged-in state on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setLoggedInUser(parsedUser);
      setUserRole(parsedUser.userType);
    }
  }, []);

  // Function to handle the logout of the user
  const handleLogout = () => {
    setLoggedInUser(null);
    setUserRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <BrowserRouter>
      <Navbar loggedInUser={loggedInUser} userRole={userRole} handleLogout={handleLogout} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/birds" element={<Birds />} />
          <Route path="/birds/:id" element={<BirdDetails />} />
          <Route path="/object-detection" element={<ObjectDetector />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} setUserRole={setUserRole} />} />

          {/* Protected Routes */}
          {loggedInUser && (
            <>
            <Route path="/user-details" element={<UserDetails loggedInUser={loggedInUser} />} />
              {userRole === "staff" ? (
                <Route path="/staff-dashboard" element={<StaffDashboard />} />
              ) : (
                <>
                  <Route path="/identify-bird" element={<IdentifyBirdsPage />} />
                </>
              )}
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
