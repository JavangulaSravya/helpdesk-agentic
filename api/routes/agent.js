import express from "express";
import Ticket from "../models/Ticket.js";

const router = express.Router();

// Dummy AI Agent Suggestion (replace with real AI later)
const getAgentSuggestion = (ticket) => {
  if (ticket.category === "Shipping") return "Check shipping provider status.";
  if (ticket.category === "Billing") return "Verify payment records.";
  return "Assign to support agent.";
};

// ✅ AI triage endpoint
router.post("/triage", async (req, res) => {
  try {
    const { ticketId } = req.body;
    const ticket = await Ticket.findOne({ ticketId });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    const suggestion = getAgentSuggestion(ticket);
    ticket.agentSuggestion = suggestion;
    await ticket.save();

    res.json({ suggestion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
