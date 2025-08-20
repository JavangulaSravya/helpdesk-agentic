const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

// GET all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find(); // fetch all tickets
    res.json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST create ticket
router.post("/", async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const ticket = new Ticket({ title, description, category });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
