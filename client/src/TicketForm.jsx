import React, { useState } from "react";
import API from "./api";

function TicketForm({ onTicketCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/tickets", formData);
      onTicketCreated(res.data); // notify parent
      setFormData({ title: "", description: "", priority: "low" });
    } catch (err) {
      console.error("Error creating ticket:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <select name="priority" value={formData.priority} onChange={handleChange}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Submit Ticket</button>
    </form>
  );
}

export default TicketForm;
