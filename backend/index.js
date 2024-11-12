const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const bidsRoutes = require("./routes/bids");

const pool = require('./config/db'); // Your database configuration
const cors = require("cors");
require("dotenv").config();

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Function to create the database and tables if they don't exist
const initializeDatabase = async () => {
  try {
    // Create the "users" table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id            SERIAL PRIMARY KEY,
        fname         VARCHAR(255) NOT NULL,
        lname         VARCHAR(255) NOT NULL,
        email         VARCHAR(255) NOT NULL UNIQUE,
        password      VARCHAR(255) NOT NULL,
        phone         VARCHAR(15),
        gender        VARCHAR(10),
        birthdate     DATE,
        usertype      VARCHAR(50),
        walletAddress VARCHAR(255)

      );
    `);

    // Create the "requirements" table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS requirements (
        id                SERIAL PRIMARY KEY,
        pickup_location   VARCHAR(255) NOT NULL,
        delivery_location VARCHAR(255) NOT NULL,
        delivery_date     DATE NOT NULL,
        delivery_time     TIME WITHOUT TIME ZONE NOT NULL,
        item_count        INTEGER NOT NULL,
        size              VARCHAR(50) NOT NULL,
        weight            NUMERIC(10, 2) NOT NULL,
        special_handling  TEXT,
        user_id           INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    // Create the "bids" table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bids (
        bid_status     SERIAL PRIMARY KEY,
        requirement_id INTEGER NOT NULL,
        user_id        INTEGER NOT NULL,
        bid_amount     NUMERIC(10, 2) NOT NULL CHECK (bid_amount >= 0),
        bid_date       TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (requirement_id) REFERENCES requirements(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);

    console.log("Database and tables initialized successfully");
  } catch (err) {
    console.error("Error initializing database and tables", err);
  }
};

// Call the function to initialize the database
initializeDatabase();

app.get("/api/deliveries", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT r.id, r.pickup_location, r.delivery_location, r.delivery_date, r.delivery_time, 
              r.item_count, r.size, r.weight, r.special_handling, 
              COALESCE(max_bids.max_bid_amount, 0) AS max_bid_amount
       FROM requirements r
       LEFT JOIN (
         SELECT requirement_id, Min(bid_amount) AS max_bid_amount
         FROM bids
         GROUP BY requirement_id
       ) max_bids ON r.id = max_bids.requirement_id`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
  
app.use("/api/auth", authRoutes);
app.use("/api/bids", bidsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
