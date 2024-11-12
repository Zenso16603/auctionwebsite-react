const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/auth");

const {
    submitBid,
    getUserBids
  } = require("../controllers/bidsController");


// Route for submitting a bid
router.post("/bidreq", submitBid);

// Route for getting user bids
router.get("/bidreq", getUserBids);

module.exports = router;
