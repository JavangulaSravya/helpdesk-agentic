const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  status: { type: String, default: "open" },
  assignee: { type: String, default: null },
  agentSuggestionId: { type: mongoose.Schema.Types.ObjectId, ref: "AgentSuggestion" }
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);
