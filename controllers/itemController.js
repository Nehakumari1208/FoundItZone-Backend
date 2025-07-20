const Item = require("../models/item");
const User = require("../models/user");
const { uploadToCloudinary } = require("../utils/cloudinary");

const createItem = async (req, res) => {
  try {
    const {
      itemName,
      category,
      foundBy,
      name,
      email,
      phone,
      place,
      datetime,
      description,
      hintQuestion,
      hintAnswer,
      notes,
    } = req.body;

    const photo = req.file;
    if (!photo)
      return res
        .status(400)
        .json({ success: false, error: "No file uploaded" });

    const photoUrl = await uploadToCloudinary(photo);

    const newItem = new Item({
      itemName,
      category,
      foundBy,
      name,
      email,
      phone,
      place,
      datetime,
      description,
      photoUrl,
      hintQuestion,
      hintAnswer,
      notes,
    });

    await newItem.save();
    res.status(201).json({
      success: true,
      message: "Item submitted successfully",
      data: newItem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item)
      return res.status(404).json({ success: false, error: "Item not found" });

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item)
      return res.status(404).json({ success: false, error: "Item not found" });

    if (item.foundBy !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, error: "Unauthorized to delete this item" });
    }

    await item.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item)
      return res.status(404).json({ success: false, error: "Item not found" });
    if (item.foundBy !== req.user.id) {
      return res
        .status(403)
        .json({ success: false, error: "Unauthorized to update this item" });
    }

    const updateData = req.body;

    if (req.file) {
      const photoUrl = await uploadToCloudinary(req.file);
      updateData.photoUrl = photoUrl;
    }

    const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUserItems = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ success: false, error: "Unauthorized: No user info" });
    }
    console.log("req.user = ", req.user);
    // Find items by foundBy (ObjectId) not email
    const items = await Item.find({ foundBy: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    console.error("getUserItems error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  deleteItem,
  updateItem,
  getUserItems,
};
