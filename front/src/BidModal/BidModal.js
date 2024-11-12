// BidModal.js
import React, { useState } from "react";
import axios from '../components/axiosConfig';
import "./BidModal.css"; // Add styles for the modal here


const BidModal = ({ isOpen, onClose, onBidSubmitted, requirement}) => {
  const [loading, setLoading] = useState(false);
  console.log("test", requirement)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const bidAmount = e.target.elements.bidAmount.value;
    
    // Prepare the data to send to the backend
    const bidData = {
      bid_amount: Number(bidAmount),
      auction_id: requirement.id,
      
    };

    try {
      setLoading(true);
      // Send POST request to the backend
      const response = await axios.post("http://localhost:5000/api/bids/bidreq", bidData);
      alert(response.data.message);
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("Failed to place bid. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Place Your Bid</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="bidAmount"
            placeholder="Enter your bid amount"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Bid"}
          </button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default BidModal;
