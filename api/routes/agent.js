const express = require("express");
const router = express.Router();
const AgentSuggestion = require("../models/AgentSuggestion");
const Ticket = require("../models/Ticket");

// POST /api/agent/triage
router.post("/triage", async (req, res) => {
  try {
    const { ticketId } = req.body;

    if (!ticketId) {
      return res.status(400).json({ error: "ticketId is required" });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    // Create agent suggestion
    const suggestion = await AgentSuggestion.create({
      ticketId: ticket._id,
      predictedCategory: ticket.category, // can customize
      articleIds: [],
      draftReply: "This is a stub reply from the agent.",
      confidence: 0.9,
      autoClosed: false,
      modelInfo: {
        provider: "stub",
        model: "local",
        promptVersion: "v1",
        latencyMs: 10,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.json(suggestion);
  } catch (err) {
    console.error("Error in triage route:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/agent/suggestion/:ticketId
router.get("/suggestion/:ticketId", async (req, res) => {
  try {
    const { ticketId } = req.params;
    const suggestion = await AgentSuggestion.findOne({ ticketId });

    if (!suggestion) {
      return res.status(404).json({ error: "No suggestion found for this ticket" });
    }

    res.json(suggestion);
  } catch (err) {
    console.error("Error fetching agent suggestion:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
