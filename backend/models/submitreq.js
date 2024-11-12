const pool = require("../config/db");
const Bid = require("../models/bids");

// Function to create new delivery requirements in the database
const createRequirements = async (
  pickupLocation,
  deliveryLocation,
  deliveryDate,
  deliveryTime,
  itemCount,
  size,
  weight,
  specialHandling,
  userId
) => {
  const result = await pool.query(
    "INSERT INTO requirements (pickup_location, delivery_location, delivery_date, delivery_time, item_count, size, weight, special_handling, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
    [
      pickupLocation,
      deliveryLocation,
      deliveryDate,
      deliveryTime,
      itemCount,
      size,
      weight,
      specialHandling,
      userId
      ]
  );
  return result.rows[0];
};

// Function to find a user by their ID
const findUserById = async (userId) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);
  return result.rows[0];
};

module.exports = {
  createRequirements,
  findUserById,
};

