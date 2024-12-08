import React, { useState, useEffect } from "react";
import axios from '../components/axiosConfig';
import BidModal from "../BidModal/BidModal"; // Import the BidModal component
import "./Auction.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Auction = () => {
  const [activeTab, setActiveTab] = useState("Live");
  const [currentBid, setCurrentBid] = useState(500);
  const [requirements, setDeliveries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);

  // Fetch deliveries data from API
  const fetchDeliveries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/deliveries");
      setDeliveries(response.data);
    } catch (error) {
      console.error("Error fetching deliveries data:", error);
    }
  };

  // Fetch data every 5 seconds to simulate real-time updates
  useEffect(() => {
    fetchDeliveries();
    const interval = setInterval(fetchDeliveries, 5000); // Update every 5 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // Handle tab clicks
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Open bid modal for the selected auction
  const openBidModal = (requirement) => {
    setSelectedRequirement(requirement);
    setIsModalOpen(true);
  };

  // Handle bid submission
  const handleBidSubmit = (bidAmount) => {
    if (bidAmount < currentBid) {
      setCurrentBid(Number(bidAmount));
      alert(`Bid placed successfully: $${bidAmount}`);
    } else {
      alert("Your bid must be lower than the current bid.");
    }
  };

  const calculateTimeLeft = (deliveryDateTime) => {
    const now = new Date();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const timeLeft = deliveryDateTime - now - oneDayInMilliseconds; // Adjusting for 24 hours before delivery
    
    if (timeLeft > 0) {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
      return { timeLeft: `${days}d ${hours}h ${minutes}m`, expired: false };
    } else {
      return { timeLeft: "Expired", expired: true };
    }
  };

  return (
    <>
     
      <div className="auction-details-page">
        <div className="auction">
          <h1>Auction Details</h1>
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

        <div className="things">
          {requirements.length > 0 ? (
            // Filter out expired auctions before rendering
            requirements
              .filter((requirement) => {
                const deliveryDateTime = new Date(
                  `${new Date(requirement.delivery_date).toLocaleDateString()} ${requirement.delivery_time}`
                );
                return !calculateTimeLeft(deliveryDateTime).expired;
              })
              .map((requirement, index) => {
                const deliveryDateTime = new Date(
                  `${new Date(requirement.delivery_date).toLocaleDateString()} ${requirement.delivery_time}`
                );
                const { timeLeft } = calculateTimeLeft(deliveryDateTime);

                return (
                  <div className="live-auction-details" key={index}>
                    <div className="auction-content">
                      <h2>Auction: {requirement.id}</h2>
                      <p>Current Bid: ${requirement.max_bid_amount} </p>
                      <p>Time Left: {timeLeft}</p>
                      <p>
                        Pickup Location: {requirement.pickup_location}
                        <br />
                        Delivery Location: {requirement.delivery_location}
                        <br />
                        Delivery Time: {requirement.delivery_time}
                        <br />
                        Delivery Date: {new Date(requirement.delivery_date).toLocaleDateString()}
                        <br />
                        Item Count: {requirement.item_count}
                        <br />
                        Size: {requirement.size}
                        <br />
                        Weight: {requirement.weight}
                        <br />
                        Special Handling: {requirement.special_handling}
                      </p>
                      <div className="bid">
                        <button onClick={() => openBidModal(requirement)}>
                          Place Bid
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div>No data available</div>
          )}
        </div>
      </div>

      {/* Bid Modal */}
      <BidModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleBidSubmit}
        requirement={selectedRequirement}
      />
    </>
  );
};

export default Auction;
