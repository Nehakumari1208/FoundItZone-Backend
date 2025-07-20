const Claim = require("../models/claim");
const Item = require("../models/item");
// ✅ Approve/Reject a claim
exports.updateClaimStatus = async (req, res) => {
  try {
    const { id } = req.params; // claim ID
    const { action } = req.body; // 'approve' or 'reject'

    if (!["approve", "reject"].includes(action)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid action" });
    }

    const claim = await Claim.findById(id);
    if (!claim)
      return res
        .status(404)
        .json({ success: false, message: "Claim not found" });

    // Update claim status
    claim.status = action === "approve" ? "Approved" : "Rejected";
    await claim.save();

    // 🗑️ If approved, delete the associated item
    if (action === "approve") {
      await Item.findByIdAndDelete(claim.item);
    }

    res.json({ success: true, data: claim });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Create a new claim WITHOUT auth (temporary, clean)
exports.createClaim = async (req, res) => {
  try {
    const { id } = req.params; // item ID
    const { answer, name, email, phone, userId } = req.body;

    const item = await Item.findById(id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });

    const newClaim = new Claim({
      item: id,
      answer,
      claimedBy: {
        name,
        email,
        phone,
        userId,
      },
    });

    await newClaim.save();

    res.json({ success: true, data: newClaim });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ Get claims for an item
exports.getItemClaims = async (req, res) => {
  try {
    const { id } = req.params; // item ID
    const claims = await Claim.find({ item: id }).sort({ createdAt: -1 });
    res.json({ success: true, data: claims });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
