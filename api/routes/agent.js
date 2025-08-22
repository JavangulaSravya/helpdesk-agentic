// routes/agent.js
const express = require("express");
const router = express.Router();

// Mock AI suggestion logic (replace with real AI API later if needed)
router.post("/triage", (req, res) => {
  const { title, description, category } = req.body;

  let suggestion = "Assign to human agent";

  if (category === "Shipping") {
    suggestion = "Check shipping provider API";
  } else if (category === "Billing") {
    suggestion = "Verify payment gateway logs";
  } else if (category === "Technical") {
    suggestion = "Restart service and clear cache";
  }

  res.json({
    ticket: { title, description, category },
    suggestion,
  });
});

module.exports = router;
