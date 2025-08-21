import React, { useEffect, useState } from "react";
import API from "./api";

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await API.get("/tickets");
        setTickets(res.data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div>
      <h2>Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <strong>{ticket.title}</strong> - {ticket.description} (
            {ticket.priority})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
