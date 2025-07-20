const express = require("express");
const router = express.Router();
const { createUserFromClerk } = require("../controllers/userController");

// Clerk webhook endpoint
router.post("/clerk-user", createUserFromClerk);

module.exports = router;
