
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
process.env.DEBUG = '@clerk/*';
const cors = require("cors");
dotenv.config();

const itemRoutes = require("./routes/item.routes.js");
const userRoutes = require("./routes/user.routes.js");
const claimRoutes =require("./routes/claim.routes.js");

const app = express();
const PORT = 5000;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,   
  allowedHeaders: ["Content-Type", "Authorization"], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at ${PORT}`);
    });
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api/items", itemRoutes);
app.use("/api", userRoutes);
app.use("/api/items",claimRoutes);