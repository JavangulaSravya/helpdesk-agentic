const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
