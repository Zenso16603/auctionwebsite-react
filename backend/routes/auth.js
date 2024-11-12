const express = require("express");

const {
  register,
  login,
  submitRequirements,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/submitreq", submitRequirements);

module.exports = router;

