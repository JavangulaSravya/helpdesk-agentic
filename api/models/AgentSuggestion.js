const mongoose = require("mongoose");

const agentSuggestionSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" },
  predictedCategory: String,
  articleIds: [String],
  draftReply: String,
  confidence: Number,
  autoClosed: Boolean,
  modelInfo: Object,
  createdAt: Date
});

module.exports = mongoose.model("AgentSuggestion", agentSuggestionSchema);
