import React, { useState } from "react";
import axios from '../components/axiosConfig';
import "./register.css";
import { NavLink } from "react-router-dom";

function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [bdata, setBdate] = useState("");
  const [userType, setUserType] = useState("customer"); // Default user type
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== Cpassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        fname,
        lname,
        walletAddress,
        email,
        password,
        phone,
        gender,
        bdata,
        userType, // Include userType in the request
      });

      if (res && res.data && res.data.message) {
        alert(res.data.message);
        window.location = "/login";
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="register">
      <div className="signup-form">
        <h1 className="signup">Sign Up</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-box"
            placeholder="First Name"
            onChange={(e) => setFname(e.target.value)}
          />
          <input
            type="text"
            className="input-box"
            placeholder="Last Name"
            onChange={(e) => setLname(e.target.value)}
          />
          <input
            type="text"
            className="input-box"
            placeholder="Metamask Wallet Address"
            onChange={(e) => setWalletAddress(e.target.value)}
          />
          <input
            type="email"
            className="input-box"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="input-box"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="input-box"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type="tel"
            className="input-box"
            placeholder="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="date"
            className="input-box"
            placeholder="Birthday"
            onChange={(e) => setBdate(e.target.value)}
          />
          <select
            className="input-box"
            defaultValue=""
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled className="gender">
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <h4>You are applying as:</h4>
          {/* Radio buttons for selecting user type */}
          <div className="radio-group">
            <label className="radio-label">
              <input
                className="radio-box"
                type="radio"
                name="userType"
                value="customer"
                checked={userType === "customer"}
                onChange={(e) => setUserType(e.target.value)}
              />{" "}
              As a Customer
            </label>

            <label className="radio-label">
              <input
                className="radio-box"
                type="radio"
                name="userType"
                value="serviceProvider"
                checked={userType === "serviceProvider"}
                onChange={(e) => setUserType(e.target.value)}
              />
              As a Service Provider
            </label>
          </div>

          <button className="signup-btn" type="submit">
            Sign Up
          </button>
        </form>
        <br />
        <p className="click">
          By clicking the Sign Up button, you agree to <br />
          <NavLink className="link" to="#">
            Terms and Conditions
          </NavLink>{" "}
          and{" "}
          <NavLink className="link" to="#">
            Privacy Policy
          </NavLink>
        </p>
        <p className="gotologin">
          Already have an account?{" "}
          <NavLink className="link" to="/login">
            Login here
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
