import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Import routes
import ticketRoutes from "./routes/ticketRoutes.js";
import agentRoutes from "./routes/agent.js"; // <-- your file name is agent.js

// ✅ Use routes
app.use("/api/tickets", ticketRoutes);
app.use("/api/agent", agentRoutes);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

// ✅ MongoDB connection
const PORT = process.env.PORT || 10000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`✅ Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
