import React from "react";
import { Link } from "react-router-dom";
import "./ServiceReq.css";
import image from "../Images/img.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ServiceReq = () => {
  return (
    <>
     

    <div className="services-page">
      <div className="logistics">
        <h1>Our Logistics Services</h1>
        <p>Discover how we can help you</p>
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
            
          </div>
        </nav>

      <div className="mainbody">
        <section className="services">
          <div className="service-card">
            <div className="image1">
              <img className="iamge1" src={image} alt="Submitting Request" />
            </div>
            <div className="service-card-content">
              <h3>Submitting Request!</h3>
              <br />
              <br />
              <br />
            </div>
          </div>
          <div className="learn">
            <Link className="learnmore" to="/submitrequirements">
              Learn More
            </Link>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default ServiceReq;
