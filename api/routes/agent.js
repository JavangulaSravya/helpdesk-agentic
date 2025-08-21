const express = require("express");
const router = express.Router();
const AgentSuggestion = require("../models/AgentSuggestion");
const Ticket = require("../models/Ticket");

// POST /triage
router.post("/triage", async (req, res) => {
  try {
    const { ticketId } = req.body;
    if (!ticketId) return res.status(400).json({ error: "ticketId required" });

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    const suggestion = new AgentSuggestion({
      ticketId: ticket._id,
      predictedCategory: "tech",
      draftReply: "This is a stub reply from the agent.",
      confidence: 0.9,
      autoClosed: false,
      articleIds: [],
      modelInfo: { provider: "stub", model: "local", promptVersion: "v1", latencyMs: 10 },
      createdAt: new Date(),
    });

    await suggestion.save();
    res.json(suggestion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /suggestion/:ticketId
router.get("/suggestion/:ticketId", async (req, res) => {
  try {
    const suggestion = await AgentSuggestion.findOne({ ticketId: req.params.ticketId });
    res.json(suggestion || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
