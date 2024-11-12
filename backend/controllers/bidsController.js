const e = require("express");
const Bid = require("../models/bids");
const jwt = require("jsonwebtoken");

// Submit Bid Function
exports.submitBid = async (req, res) => {
  const { bid_amount, auction_id, submission_time } = req.body;

  // Check for required fields
  if (!bid_amount || !auction_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const token = req.headers.authorization?.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId; // Extract the userId from the token
  const userType = decoded.usertype; // Extract the userId from the token


  try {

    try {
      var lastBid = await Bid.findBidByReqId(auction_id);
      lastBid = Number(lastBid.bid_amount)
    }
    catch {
      lastBid = "NA";
    }


    if (userType !== "serviceProvider") {
       res
        .status(201)
        .json({ message: "Only serviceProvider can submit requirements." });
    }

    else if (String(lastBid)=="NA"||bid_amount < lastBid) {
      const bidId = await Bid.createBid(auction_id, userId, bid_amount);
      res.status(201).json({ message: "Bid submitted successfully"});
    }
    else  {
        
      res.status(201).json({ message: "Bid should be less than Current Bid."});

    }
    
  } catch (error) {
    console.error("Error inserting bid:", error);
    res.status(500).json({ message: "Error submitting bid" });
  }
};

// Get User Bids Function
exports.getUserBids = async (req, res) => {
  const userId = req.userId; // Assuming userId is set from token middleware

  try {
    const bids = await Bid.findByUserId(userId);

    if (bids.length === 0) {
      return res.status(404).json({ message: "No bids found for this user" });
    }

    res.status(200).json({ bids });
  } catch (error) {
    console.error("Error fetching bids:", error);
    res.status(500).json({ message: "Error fetching bids" });
  }
};
