const mongoose = require("mongoose");

const agentSuggestionSchema = new mongoose.Schema(
  {
    ticketId: { type: mongoose.Schema.Types.ObjectId, ref: "Ticket" },
    predictedCategory: String,
    draftReply: String,
    confidence: Number,
    autoClosed: Boolean,
    articleIds: [String],
    modelInfo: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AgentSuggestion", agentSuggestionSchema);
