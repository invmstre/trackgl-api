const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = process.env.SHIPRESOLVE_API_KEY;

app.get("/", (req, res) => {
  res.send("TrackGL API is running");
});

app.get("/track", async (req, res) => {
  const tracking = req.query.number;

  if (!tracking) {
    return res.status(400).json({ error: "Tracking number is required" });
  }

  try {
    const response = await fetch("https://api.shipresolve.com/v1/tracking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "api-key": API_KEY
      },
      body: JSON.stringify({
        tracking_number: tracking,
        carrier: "auto-detect"
      })
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (error) {
    res.status(500).json({
      error: "Tracking failed",
      details: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TrackGL API running on port ${PORT}`);
});
