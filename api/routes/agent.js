const express = require("express");
const router = express.Router();
const AgentSuggestion = require("../models/AgentSuggestion");
const Ticket = require("../models/Ticket");

// POST /api/agent/triage -> create a stub suggestion
router.post("/triage", async (req, res) => {
  try {
    const { ticketId } = req.body;
    if (!ticketId) return res.status(400).json({ error: "ticketId is required" });

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    const suggestion = await AgentSuggestion.create({
      ticketId: ticket._id,
      predictedCategory: ticket.category || "tech",
      articleIds: [],
      draftReply: "This is a stub reply from the agent.",
      confidence: 0.9,
      autoClosed: false,
      modelInfo: { provider: "stub", model: "local", promptVersion: "v1", latencyMs: 10 },
    });

    res.json(suggestion);
  } catch (err) {
    console.error("triage error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/agent/suggestion/:ticketId -> latest suggestion
router.get("/suggestion/:ticketId", async (req, res) => {
  try {
    const s = await AgentSuggestion.findOne({ ticketId: req.params.ticketId }).sort({ createdAt: -1 });
    if (!s) return res.status(404).json({ error: "No suggestion" });
    res.json(s);
  } catch (err) {
    console.error("get suggestion error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
