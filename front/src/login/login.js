import React, { useState } from "react";
import axios from '../components/axiosConfig';
import "./login.css";
import { NavLink } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      if (res && res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location = "/home";
      } else {
        setError("Login failed. Please try again.");
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
    <div className="loginform">
      <div className="login-box">
        <h1 className="loginhead">Log In</h1>
        {error && <p className="error">{error}</p>}

        <form>
          <input
            type="email"
            className="input-box"
            placeholder="Your email"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="input-box"
            placeholder="Your password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="login"
            type="button"
            value="Log In"
            onClick={handleSubmit}
          />
        </form>
        <p className="account">
          Don't have an account?
          <NavLink className="gotosignup" to="/register">
            Sign Up Here
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
