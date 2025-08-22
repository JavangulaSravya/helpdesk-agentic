import React, { useEffect, useState } from "react";
import { fetchSuggestion } from "./api";

const AgentSuggestion = ({ ticketId }) => {
  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
    const getSuggestion = async () => {
      try {
        const res = await fetchSuggestion(ticketId);
        setSuggestion(res.data);
      } catch (err) {
        console.error("Error fetching suggestion:", err);
      }
    };
    getSuggestion();
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
