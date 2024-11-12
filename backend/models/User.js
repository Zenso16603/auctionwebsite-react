const pool = require("../config/db");

// Updated createUser function to insert all fields into the database
const createUser = async (
  fname,
  lname,
  walletAddress,
  email,
  hashedPassword,
  phone,
  gender,
  bdata,
  userType // Add userType as a parameter

) => {
  const result = await pool.query(
    "INSERT INTO users (fname, lname, walletaddress, email, password, phone, gender, birthdate, usertype) VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9) RETURNING *",
    [fname, lname,walletAddress, email, hashedPassword, phone, gender, bdata, userType] // Include userType in the query
  );
  return result.rows[0];
};

// Updated findUserByEmail function to check if an email already exists
const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };
