import React, { useEffect, useState } from "react";
import { fetchTickets } from "./api";
import AgentSuggestion from "./AgentSuggestion";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  const getTickets = async () => {
    try {
      const res = await fetchTickets();
      setTickets(res.data);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
      alert("Failed to fetch tickets");
    }
  };

  useEffect(() => {
    getTickets();
  }, []);

  if (tickets.length === 0) return <p>No tickets available.</p>;

  return (
    <div>
      <h2>All Tickets</h2>
      {tickets.map(ticket => (
        <div key={ticket._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Title:</strong> {ticket.title}</p>
          <p><strong>Description:</strong> {ticket.description}</p>
          <p><strong>Category:</strong> {ticket.category}</p>
          <p><strong>Status:</strong> {ticket.status}</p>
          <AgentSuggestion ticketId={ticket._id} />
        </div>
      ))}
    </div>
  );
};

export default TicketList;
