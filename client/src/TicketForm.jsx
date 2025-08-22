import React, { useState } from "react";
import { createTicket, createSuggestion } from "./api";

const TicketForm = ({ onTicketCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("tech");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ticket = await createTicket({ title, description, category });
      await createSuggestion(ticket.data._id); // trigger agent suggestion
      setTitle(""); setDescription(""); setCategory("tech");
      onTicketCreated(); // refresh ticket list
    } catch (err) {
      console.error("Error creating ticket:", err);
      alert("Failed to submit ticket");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Create Ticket</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="tech">Tech</option>
        <option value="shipping">Shipping</option>
        <option value="billing">Billing</option>
      </select>
      <button type="submit">Submit Ticket</button>
    </form>
  );
};

export default TicketForm;
