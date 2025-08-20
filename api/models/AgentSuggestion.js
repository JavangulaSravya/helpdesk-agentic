const mongoose = require("mongoose");

const agentSuggestionSchema = new mongoose.Schema({
  ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket", required: true },
  predictedCategory: { type: String, enum: ["billing", "tech", "shipping", "other"] },
  articleIds: [String],
  draftReply: String,
  confidence: Number,
  autoClosed: Boolean,
  modelInfo: {
    provider: String,
    model: String,
    promptVersion: String,
    latencyMs: Number
  }
}, { timestamps: true });

module.exports = mongoose.model("AgentSuggestion", agentSuggestionSchema);
