import React from "react";
import { NavLink } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <>
      <div className="landingpage">
        <div className="landing">
          <div className="system">
            <h1>Logestics Service By Blockchain System</h1>
            <br />
            <p>Please choose an option to continue:</p>
          </div>
          <div className="buttons">
            <NavLink to="/login" className="btn btn-login">
              Log In
            </NavLink>
            <NavLink to="/register" className="btn btn-signup">
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
