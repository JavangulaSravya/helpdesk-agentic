const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

// GET /api/tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/tickets
router.post("/", async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const newTicket = await Ticket.create({ title, description, category, status: "open" });
    res.json(newTicket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
