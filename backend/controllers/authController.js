const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/User");
const { findUserById, createRequirements } = require("../models/submitreq");

// const { createRequirements, findUserById } = require("../models/submitreq");

// Register Function
exports.register = async (req, res) => {
  const { fname, lname, walletAddress, email, password, phone, gender, bdata, userType } =
    req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(
      fname,
      lname,
      walletAddress,
      email,
      hashedPassword,
      phone,
      gender,
      bdata,
      userType // Add userType here
    );

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login Function
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByEmail(username);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, usertype: user.usertype },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.submitRequirements = async (req, res) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userType = decoded.usertype; // Extract the userId from the token
  

  if (userType !== "customer") {
    return res
      .status(401)
      .json({ message: "Only customer can submit requirements." });
  }

  try {
    // Decode the token to get the userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId; // Extract the userId from the token

    // Now proceed with validating other fields from req.body
    const {
      pickupLocation,
      deliveryLocation,
      deliveryDate,
      deliveryTime,
      itemCount,
      size,
      weight,
      specialHandling,
    } = req.body;

    // Validate required fields
    if (
      !pickupLocation ||
      !deliveryLocation ||
      !deliveryDate ||
      !deliveryTime ||
      !itemCount ||
      !size ||
      !weight
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    // Check if the user exists (based on userId from token)
    const existingUser = await findUserById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new delivery requirements
    const newRequirements = await createRequirements(
      pickupLocation,
      deliveryLocation,
      deliveryDate,
      deliveryTime,
      itemCount,
      size,
      weight,
      specialHandling,
      userId
    );

    // Respond with success
    res.status(201).json({
      message: "Requirements submitted successfully",
      requirements: newRequirements,
    });
  } catch (error) {
    console.error("Error submitting requirements:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

