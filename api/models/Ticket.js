import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  ticketId: { type: Number, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  agentSuggestion: { type: String, default: "" },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
