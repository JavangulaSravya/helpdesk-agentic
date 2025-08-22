const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

// GET all tickets
router.get("/", async (_req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (e) {
    console.error("Get tickets error:", e);
    res.status(500).json({ error: "Server error" });
  }
});

// POST create ticket
router.post("/", async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const ticket = await Ticket.create({ title, description, category });
    res.status(201).json(ticket);
  } catch (e) {
    console.error("Create ticket error:", e);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
