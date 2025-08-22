import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://helpdesk-agentic-application.onrender.com" // <== your backend on Render
    : "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export const getTickets     = () => api.get("/api/tickets");
export const createTicket   = (payload) => api.post("/api/tickets", payload);
export const triage         = (ticketId) => api.post("/api/agent/triage", { ticketId });
export const getSuggestion  = (ticketId) => api.get(`/api/agent/suggestion/${ticketId}`);

export default api;
