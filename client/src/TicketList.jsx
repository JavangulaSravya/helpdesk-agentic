import { useEffect, useState } from "react";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/tickets")
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch tickets");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Tickets</h2>
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        tickets.map((ticket) => (
          <div key={ticket._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h3>{ticket.title}</h3>
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Category:</strong> {ticket.category}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
            {ticket.agentSuggestion ? (
              <div style={{ background: "#f0f0f0", padding: "5px", marginTop: "5px" }}>
                <h4>Agent Suggestion:</h4>
                <p>{ticket.agentSuggestion.draftReply}</p>
                <p><strong>Predicted Category:</strong> {ticket.agentSuggestion.predictedCategory}</p>
              </div>
            ) : (
              <p>No agent suggestion yet.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
