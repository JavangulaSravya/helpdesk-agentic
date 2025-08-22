const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: String, default: "open" },
  agentSuggestionId: { type: Schema.Types.ObjectId, ref: "AgentSuggestion" },
}, { timestamps: true });

module.exports = mongoose.model("Ticket", TicketSchema);
