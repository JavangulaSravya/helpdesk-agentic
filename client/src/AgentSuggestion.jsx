import React, { useEffect, useState } from "react";

const AgentSuggestion = ({ ticketId }) => {
  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/agent/suggestion/${ticketId}`);
        if (!res.ok) throw new Error("Failed to fetch suggestion");
        const data = await res.json();
        setSuggestion(data);
      } catch (err) {
        console.error("Error fetching suggestion:", err);
      }
    };

    fetchSuggestion();
  }, [ticketId]);

  if (!suggestion) return <p>No agent suggestion yet.</p>;

  return (
    <div style={{ marginTop: "10px", padding: "5px", background: "#f4f4f4", borderRadius: "5px" }}>
      <p><strong>Predicted Category:</strong> {suggestion.predictedCategory}</p>
      <p><strong>Draft Reply:</strong> {suggestion.draftReply}</p>
      <p><strong>Confidence:</strong> {(suggestion.confidence * 100).toFixed(2)}%</p>
    </div>
  );
};

export default AgentSuggestion;
