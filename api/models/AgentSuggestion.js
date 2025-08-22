const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AgentSuggestionSchema = new Schema({
  ticketId: { type: Schema.Types.ObjectId, ref: "Ticket", required: true },
  predictedCategory: { type: String },
  articleIds: { type: [String], default: [] },
  draftReply: { type: String },
  confidence: { type: Number },
  autoClosed: { type: Boolean, default: false },
  modelInfo: {
    provider: String,
    model: String,
    promptVersion: String,
    latencyMs: Number,
  },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("AgentSuggestion", AgentSuggestionSchema);
