import React, { useEffect, useState } from "react";
import AgentSuggestion from "./AgentSuggestion";

const TicketForm = () => {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("tech");

  const fetchTickets = async () => {
    const res = await fetch("http://localhost:8080/api/tickets");
    const data = await res.json();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const submitTicket = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, category }),
    });
    if (res.ok) {
      setTitle(""); setDescription(""); setCategory("tech");
      fetchTickets();
    }
  };

  return (
    <div>
      <h2>Smart Helpdesk</h2>
      <form onSubmit={submitTicket}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="tech">Tech</option>
          <option value="billing">Billing</option>
          <option value="shipping">Shipping</option>
          <option value="other">Other</option>
        </select>
        <button type="submit">Submit Ticket</button>
      </form>

      <h3>All Tickets</h3>
      {tickets.map(ticket => (
        <div key={ticket._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h4>{ticket.title}</h4>
          <p>{ticket.description}</p>
          <p>Category: {ticket.category}</p>
          <p>Status: {ticket.status}</p>
          <AgentSuggestion ticketId={ticket._id} />
        </div>
      ))}
    </div>
  );
};

export default TicketForm;
