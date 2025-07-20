const express = require("express");
const router = express.Router();
const authenticateClerk = require("../middleware/authenticateClerk");
const upload = require("../utils/multer");
const {
  createItem,
  getAllItems,
  getItemById,
  deleteItem,
  updateItem,
  getUserItems,
} = require("../controllers/itemController");

router.post("/",upload.single("photo"), createItem);
router.get("/", getAllItems);
router.get("/:id", getItemById);

router.get("/user/my", (req, res, next) => {
  console.log("🚀 Route hit: /user/my");
  next();
}, authenticateClerk, getUserItems);

router.delete("/:id", authenticateClerk, deleteItem);
router.put("/:id", authenticateClerk, upload.single("photo"), updateItem);

module.exports = router;
