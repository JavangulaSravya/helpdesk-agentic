const express = require("express");
const router = express.Router();
const AgentSuggestion = require("../models/AgentSuggestion");
const Ticket = require("../models/Ticket");

// POST /api/agent/triage
router.post("/triage", async (req, res) => {
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
    modelInfo: { provider: "stub", model: "local", promptVersion: "v1", latencyMs: 10 }
  });

  res.json(suggestion);
});

// GET suggestion by ticketId
router.get("/suggestion/:ticketId", async (req, res) => {
  const suggestion = await AgentSuggestion.findOne({ ticketId: req.params.ticketId });
  res.json(suggestion);
});

module.exports = router;
