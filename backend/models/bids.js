const pool = require("../config/db");

// Function to create a new bid in the database
const createBid = async (
  requirementId,
  userId,
  bidAmount
) => {
  const result = await pool.query(
    "INSERT INTO bids (requirement_id, user_id, bid_amount) VALUES ($1, $2, $3) RETURNING *",
    [
      requirementId,
      userId,
      bidAmount,
    ]
  );
  return result.rows[0];
};

// Function to find bids by user ID
const findBidsByUserId = async (userId) => {
  const result = await pool.query("SELECT * FROM bids WHERE user_id = $1", [
    userId,
  ]);
  return result.rows;
};

// Function to find a bid by its ID
const findBidById = async (bidId) => {
  const result = await pool.query("SELECT * FROM bids WHERE id = $1", [
    bidId,
  ]);
  return result.rows[0];
};

const findBidByReqId = async (bidId) => {
    const result = await pool.query("SELECT * FROM bids WHERE requirement_id = $1 ORDER BY bid_amount DESC LIMIT 1", [
      bidId,
    ]);
    return result.rows[0];
  };

// Function to update a bid's status
const updateBidStatus = async (bidId, bidStatus) => {
  const result = await pool.query(
    "UPDATE bids SET bid_status = $1 WHERE id = $2 RETURNING *",
    [bidStatus, bidId]
  );
  return result.rows[0];
};

module.exports = {
  createBid,
  findBidsByUserId,
  findBidById,
  findBidByReqId,
  updateBidStatus,
};
