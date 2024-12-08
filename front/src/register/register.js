import React, { useState } from "react";
import axios from '../components/axiosConfig';
import "./register.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCalendar, FaWallet, FaEye, FaEyeSlash } from 'react-icons/fa';

function Register() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    walletAddress: "",
    email: "",
    password: "",
    Cpassword: "",
    phone: "",
    gender: "",
    bdata: "",
    userType: "customer"
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.Cpassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        ...formData
      });

      if (res && res.data && res.data.message) {
        alert(res.data.message);
        navigate("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="signup-form">
        <h1 className="signup">Create Account</h1>
        {error && <div className="error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-box"
            placeholder="First Name"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            style={{"--index": 1}}
            required
          />
          <input
            type="text"
            className="input-box"
            placeholder="Last Name"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            style={{"--index": 2}}
            required
          />
          <input
            type="text"
            className="input-box"
            placeholder="Metamask Wallet Address"
            name="walletAddress"
            value={formData.walletAddress}
            onChange={handleChange}
            style={{"--index": 3}}
            required
          />
          <input
            type="email"
            className="input-box"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{"--index": 4}}
            required
          />
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              className="input-box"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{"--index": 5}}
              required
            />
            <span 
              className="password-toggle"
              onClick={() => togglePasswordVisibility('password')}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="input-box"
              placeholder="Confirm Password"
              name="Cpassword"
              value={formData.Cpassword}
              onChange={handleChange}
              style={{"--index": 6}}
              required
            />
            <span 
              className="password-toggle"
              onClick={() => togglePasswordVisibility('confirm')}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <input
            type="tel"
            className="input-box"
            placeholder="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{"--index": 7}}
            required
          />
          <input
            type="date"
            className="input-box"
            name="bdata"
            value={formData.bdata}
            onChange={handleChange}
            style={{"--index": 8}}
            required
          />
          <select
            className="input-box"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{"--index": 9}}
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <div className="radio-group" style={{"--index": 10}}>
            <h4>You are applying as:</h4>
            <label className="radio-label">
              <input
                className="radio-box"
                type="radio"
                name="userType"
                value="customer"
                checked={formData.userType === "customer"}
                onChange={handleChange}
              />
              Customer
            </label>

            <label className="radio-label">
              <input
                className="radio-box"
                type="radio"
                name="userType"
                value="serviceProvider"
                checked={formData.userType === "serviceProvider"}
                onChange={handleChange}
              />
              Service Provider
            </label>
          </div>

          <button 
            className="signup-btn" 
            type="submit"
            disabled={isLoading}
            style={{"--index": 11}}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="click">
          By clicking Create Account, you agree to our<br />
          <NavLink className="link" to="#">Terms and Conditions</NavLink> and{" "}
          <NavLink className="link" to="#">Privacy Policy</NavLink>
        </p>
        
        <p className="gotologin">
          Already have an account?{" "}
          <NavLink className="link" to="/login">Login here</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
