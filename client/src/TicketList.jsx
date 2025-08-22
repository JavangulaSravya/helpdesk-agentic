import React, { useEffect, useState } from "react";
import { getTickets, getSuggestion } from "./api";

function Suggestion({ ticketId }) {
  const [s, setS] = useState(null);

  useEffect(() => {
    let mounted = true;
    getSuggestion(ticketId)
      .then(({ data }) => mounted && setS(data))
      .catch(() => {}); // no suggestion yet
    return () => { mounted = false; };
  }, [ticketId]);

  if (!s) return <p>No agent suggestion yet.</p>;
  return (
    <div style={{ background: "#f7f7f7", padding: 8, borderRadius: 6, marginTop: 8 }}>
      <div><strong>Predicted Category:</strong> {s.predictedCategory}</div>
      <div><strong>Draft Reply:</strong> {s.draftReply}</div>
      <div><strong>Confidence:</strong> {(s.confidence * 100).toFixed(1)}%</div>
    </div>
  );
}

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    setError("");
    try {
      const { data } = await getTickets();
      setTickets(data);
    } catch (e) {
      console.error("Failed to fetch tickets", e);
      setError("Failed to fetch tickets");
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>All Tickets</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {tickets.length === 0 ? (
        <p>No tickets available.</p>
      ) : (
        tickets.map((t) => (
          <div key={t._id} style={{ border: "1px solid #eee", padding: 12, borderRadius: 8, marginBottom: 12 }}>
            <h3>{t.title}</h3>
            <p><strong>Description:</strong> {t.description}</p>
            <p><strong>Category:</strong> {t.category}</p>
            <p><strong>Status:</strong> {t.status}</p>
            <Suggestion ticketId={t._id} />
          </div>
        ))
      )}
    </div>
  );
}
