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
    localStorage.removeItem("token"); // Remove the token from localStorage
    e.preventDefault();
    navigate("/login"); // Redirect to login page
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
              {/* <button id="view-profile-btn" onClick={handleViewProfile}>
                View Profile
              </button> */}
              <NavLink to="#" id="logout-btn" onClick={handleLogout}>
                Logout
              </NavLink>
            </div>
          </div>
        </nav>

        <main className="home-content">
          <section className="company-intro">
            <h2>Welcome to BlockChain Logistics</h2>
            <p>Revolutionizing supply chain management through blockchain technology</p>
            <div className="features-grid">
              <div className="feature-card">
                <i className="fas fa-shield-alt"></i>
                <h3>Secure</h3>
                <p>End-to-end encryption and immutable records</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-clock"></i>
                <h3>Real-time Tracking</h3>
                <p>Monitor your shipments 24/7</p>
              </div>
              <div className="feature-card">
                <i className="fas fa-chart-line"></i>
                <h3>Transparent</h3>
                <p>Complete visibility of supply chain</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>About Us</h2>
            <p>Founded in 2023, BlockChain Logistics is pioneering the integration of blockchain technology in supply chain management. Our platform ensures transparency, security, and efficiency in logistics operations.</p>
            <div className="stats-container">
              <div className="stat-item">
                <h3>500+</h3>
                <p>Clients Served</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Countries</p>
              </div>
              <div className="stat-item">
                <h3>99.9%</h3>
                <p>Success Rate</p>
              </div>
            </div>
          </section>

          <section className="contact-section">
            <h2>Contact Us</h2>
            <div className="contact-grid">
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <p>123 Blockchain Street, Tech City, TC 12345</p>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <p>+1 (555) 123-4567</p>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <p>contact@blockchainlogistics.com</p>
                </div>
              </div>
              <form className="contact-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" required></textarea>
                <button type="submit">Send Message</button>
              </form>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/service">Services</NavLink></li>
                <li><NavLink to="/submitrequirements">Submit Requirements</NavLink></li>
                <li><NavLink to="/auctiondetails">Auction Details</NavLink></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Connect With Us</h3>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 BlockChain Logistics. All rights reserved.</p>
          </div>
        </footer>

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
                <button id="change-password-btn" type="submit">
                  Change Password
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

