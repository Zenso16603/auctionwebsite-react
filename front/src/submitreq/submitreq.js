import React, { useState } from "react";
import axios from '../components/axiosConfig';
import { useNavigate } from "react-router-dom";
import "./submitreq.css";
import { NavLink } from "react-router-dom";

const SubmitReq = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    pickupLocation: "",
    deliveryLocation: "",
    deliveryDate: "",
    deliveryTime: "",
    itemCount: "",
    size: "",
    weight: "",
    specialHandling: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to submit the form.");
        return;
      }
      
      // Rest of your code...
    // };
    

    const requiredFields = [
      "pickupLocation",
      "deliveryLocation",
      "deliveryDate",
      "deliveryTime",
      "itemCount",
      "size",
      "weight",
    ];
    const isFormValid = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );

    if (!isFormValid) {
      setError("Please fill in all required fields");
      return;
    }
    

    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.post(
        "http://localhost:5000/api/auth/submitreq",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Requirements submitted successfully:", response.data);
      setError("");
      setSuccessMessage("Requirements submitted successfully!");
      navigate("/auctiondetails");
    } catch (error) {
      console.error("Error:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError(
          "An error occurred while submitting the form. Please try again."
        );
      }
    }
  };

  return (
    <>
        <div className="auction">
          <h1>Submit Requirements</h1>
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
    <div className="requirements">
      <div className="requirements-form">
        <h1 className="submithead">Submit Requirements</h1>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <form className="submitform" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Location Details</h2>
            <input
              type="text"
              name="pickupLocation"
              className="submitinput"
              placeholder="Pick up Location"
              required
              value={formData.pickupLocation}
              onChange={handleChange}
            />
            <input
              type="text"
              name="deliveryLocation"
              className="submitinput"
              placeholder="Delivery Location"
              required
              value={formData.deliveryLocation}
              onChange={handleChange}
            />
            <input
              type="date"
              name="deliveryDate"
              className="submitinput"
              required
              value={formData.deliveryDate}
              onChange={handleChange}
            />
            <input
              type="time"
              name="deliveryTime"
              className="submitinput"
              required
              value={formData.deliveryTime}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <h2>Package Details</h2>
            <input
              type="number"
              name="itemCount"
              className="submitinput"
              placeholder="Number of items"
              required
              value={formData.itemCount}
              onChange={handleChange}
            />
            <input
              type="text"
              name="size"
              className="submitinput"
              placeholder="Size"
              required
              value={formData.size}
              onChange={handleChange}
            />
            <input
              type="number"
              name="weight"
              className="submitinput"
              placeholder="Weight (kg)"
              required
              value={formData.weight}
              onChange={handleChange}
            />
            <input
              type="text"
              name="specialHandling"
              className="submitinput"
              placeholder="Special handling requirements"
              value={formData.specialHandling}
              onChange={handleChange}
            />
          </div>

          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default SubmitReq;
