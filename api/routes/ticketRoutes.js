const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

// Example: GET all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example: POST a new ticket
router.post("/", async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const ticket = new Ticket({ title, description, category });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // ✅ Important!
