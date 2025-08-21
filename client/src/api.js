import axios from "axios";

const API = axios.create({
  baseURL: "https://helpdesk-agentic-application.onrender.com/api",
});

export default API;
