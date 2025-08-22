import React, { useState } from "react";
import { createTicket, triage } from "./api";

export default function TicketForm({ onTicketCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("tech");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const { data: ticket } = await createTicket({ title, description, category });
      // auto-triage
      await triage(ticket._id);
      setTitle("");
      setDescription("");
      setCategory("tech");
      setMsg("✅ Ticket submitted and triaged");
      onTicketCreated?.();
    } catch (err) {
      console.error(err);
      setMsg("❌ Failed to submit ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 8, marginBottom: 24 }}>
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Title:&nbsp;</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Description:&nbsp;</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Category:&nbsp;</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="tech">Tech</option>
            <option value="billing">Billing</option>
            <option value="shipping">Shipping</option>
            <option value="other">Other</option>
          </select>
        </div>
        {msg && <p>{msg}</p>}
        <button type="submit" disabled={loading}>{loading ? "Submitting…" : "Submit Ticket"}</button>
      </form>
    </div>
  );
}
