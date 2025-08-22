import axios from "axios";

const API_URL = "https://helpdesk-agentic-backend.onrender.com/api";

export const fetchTickets = () => axios.get(`${API_URL}/tickets`);
export const createTicket = (ticketData) => axios.post(`${API_URL}/tickets`, ticketData);
export const fetchSuggestion = (ticketId) => axios.get(`${API_URL}/agent/suggestion/${ticketId}`);
export const createSuggestion = (ticketId) => axios.post(`${API_URL}/agent/triage`, { ticketId });
