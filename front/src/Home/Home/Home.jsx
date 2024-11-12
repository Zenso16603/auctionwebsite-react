import React, { useState } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const navigate = useNavigate();

  const userData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
  };

  const handleViewProfile = () => {
    setShowProfileModal(true);
    setShowPasswordModal(false);
  };

  const handleChangePassword = () => {
    setShowProfileModal(false);
    setShowPasswordModal(true);
  };

  const handleCloseModals = () => {
    setShowProfileModal(false);
    setShowPasswordModal(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    alert("Password change functionality will be implemented here.");
    setShowPasswordModal(false);
  };

  const handleEditProfile = () => {
    alert("Edit profile functionality will be implemented here.");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const stopPropagation = (e) => {
    e.stopPropagation(); // Prevents modal closing when clicking inside the modal content
  };

  return (
    <>
      <div className="homepage">
        <div className="blockchain">
          <h1>Logistics Services By BlockChain System</h1>
        </div>

        <nav className="navbar">
          <div className="nav-container">
            <ul className="centered-nav">
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/service">Services</NavLink>
              </li>
              <li>
                <NavLink to="/submitrequirements">Submit Requirments</NavLink>
              </li>
              <li>
                <NavLink to="/auctiondetails">Auction Details</NavLink>
              </li>
            </ul>
            <div className="user-actions">
              <button id="view-profile-btn" onClick={handleViewProfile}>
                View Profile
              </button>
              <NavLink to="#" id="logout-btn" onClick={handleLogout}>
                Logout
              </NavLink>
            </div>
          </div>
        </nav>

        {showProfileModal && (
          <div className="modal" onClick={handleCloseModals}>
            <div className="modal-content" onClick={stopPropagation}>
              <span className="close" onClick={handleCloseModals}>
                &times;
              </span>
              <h2>User Profile</h2>
              <div id="user-details">
                <p>
                  <strong>Name:</strong> {userData.name}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {userData.phone}
                </p>
              </div>
              <button id="edit-profile-btn" onClick={handleEditProfile}>
                Edit Profile
              </button>
              <button id="change-password-btn" onClick={handleChangePassword}>
                Change Password
              </button>
            </div>
          </div>
        )}

        {showPasswordModal && (
          <div className="modal" onClick={handleCloseModals}>
            <div className="modal-content" onClick={stopPropagation}>
              <span className="close" onClick={handleCloseModals}>
                &times;
              </span>
              <h2>Change Password</h2>
              <form id="change-password-form" onSubmit={handlePasswordSubmit}>
                <input
                  type="password"
                  id="current-password"
                  placeholder="Current Password"
                  required
                />
                <input
                  type="password"
                  id="new-password"
                  placeholder="New Password"
                  required
                />
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm New Password"
                  required
                />
                <button type="submit">Change Password</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
