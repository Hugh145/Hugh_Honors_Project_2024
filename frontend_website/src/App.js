// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Footer from "./pages/Footer.js";
import Home from "./pages/Home.js";
import Birds from "./pages/bird_Information_page_filter.js";
import BirdDetails from "./pages/BirdDetails.js";
import IdentifyBirdsPage from "./pages/ImagePrediction.js";
import Register from "./pages/Register.js";
import Login from "./pages/login.js";
import UserDetails from "./pages/UserDetails.js";
import UserProfileDashboard from "./pages/UserProfileDashboard.js";
import CreateBlog from "./pages/CreateBlog.js";
import ViewBlogs from "./pages/ViewAllBlogs.js";
import ViewPredictedResults from "./pages/viewPredictedResults";
import { ImageClassification } from "./components/ImageClassification/ImageClassification.js";
import ChangePassword from "./pages/ChangePassword.js";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setLoggedInUser(parsedUser);
      setUserRole(parsedUser.userType);
    }
  }, []);

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
          <Route path="/object-detection" element={<ImageClassification />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} setUserRole={setUserRole} />} />
          <Route path="/view-blogs" element={<ViewBlogs />} />
          {/* Protected Routes */}
          {loggedInUser && (
            <>
              <Route path="/view-predictions" element={<ViewPredictedResults />} />
              <Route path="/user-profile-dashboard" element={<UserProfileDashboard loggedInUser={loggedInUser} />} />
              <Route path="/user-details" element={<UserDetails loggedInUser={loggedInUser} />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              {userRole === "staff" ? (
                <Route path="/identify-bird" element={<IdentifyBirdsPage />} />
              ) : (
                <Route path="/identify-bird" element={<IdentifyBirdsPage />} />
              )}
            </>
          )}
        </Routes>
      </div>
      <Footer />

    </BrowserRouter>
  );
}

export default App;

