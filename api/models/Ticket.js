const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ["billing","tech","shipping","other"], default: "tech" },
  status: { type: String, enum: ["open","triaged","waiting_human","resolved","closed"], default: "open" },
  createdBy: { type: String }, // or mongoose.Schema.Types.ObjectId if you have User model
  assignee: { type: String, default: null },
  agentSuggestionId: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("Ticket", ticketSchema);
