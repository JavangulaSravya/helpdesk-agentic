const agentRoutes = require("./routes/agent");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const ticketRoutes = require("./routes/tickets"); // single import

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use("/api/agent", agentRoutes);


// Routes
app.use("/api/tickets", ticketRoutes);

// ✅ Test routes
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working ✅" });
});

app.get("/", (req, res) => {
  res.send("Helpdesk Agentic Backend is running 🚀");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
