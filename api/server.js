const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const ticketRoutes = require("./routes/tickets");
const agentRoutes  = require("./routes/agent");

const app = express();

// --- CORS: allow local dev + your Render frontend ---
const allowedOrigins = [
  "http://localhost:3000",
  "https://helpdesk-agentic-app.onrender.com", // your frontend on Render
];
app.use(cors({ origin: allowedOrigins }));

app.use(express.json());

// Health/root
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// API routes
app.use("/api/tickets", ticketRoutes);
app.use("/api/agent", agentRoutes);

// MongoDB connect
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI env var");
  process.exit(1);
}
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
