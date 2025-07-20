const express = require("express");
const router = express.Router();
const {
  createClaim,
  getItemClaims,
  updateClaimStatus,
} = require("../controllers/claimController");

router.patch("/claims/:id", updateClaimStatus);
router.post("/:id/claims", createClaim);
router.get("/:id/claims", getItemClaims); 

module.exports = router;
