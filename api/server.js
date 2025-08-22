const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const ticketRoutes = require("./routes/ticket");
const agentRoutes = require("./routes/agent");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tickets", ticketRoutes);
app.use("/api/agent", agentRoutes);

const PORT = process.env.PORT || 10000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
