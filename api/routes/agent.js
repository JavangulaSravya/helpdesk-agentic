const express = require("express");
const router = express.Router();
const AgentSuggestion = require("../models/AgentSuggestion");
const Ticket = require("../models/Ticket");

// POST /triage - create suggestion
router.post("/triage", async (req, res) => {
  try {
    const { ticketId } = req.body;
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    const suggestion = await AgentSuggestion.create({
      ticketId: ticket._id,
      predictedCategory: "tech",
      articleIds: [],
      draftReply: "This is a stub reply from the agent.",
      confidence: 0.9,
      autoClosed: false,
      modelInfo: { provider: "stub", model: "local", promptVersion: "v1", latencyMs: 10 },
      createdAt: new Date(),
    });

    res.json(suggestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /suggestion/:ticketId - fetch suggestion for a ticket
router.get("/suggestion/:ticketId", async (req, res) => {
  try {
    const suggestion = await AgentSuggestion.findOne({ ticketId: req.params.ticketId });
    if (!suggestion) return res.status(404).json({ error: "No suggestion found" });
    res.json(suggestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
