const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "97ecf47eb33fe869732178b0be148eeb63df7f8867f2d40243af8bab741d5698";

app.get("/track", async (req, res) => {
  const tracking = req.query.number;

  if (!tracking) {
    return res.status(400).json({ error: "Tracking number is required" });
  }

  try {
    const response = await fetch("https://trackgl-api.onrender.com", {
      method: "GET",
      headers: {
        "api-key": API_KEY
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Tracking failed" });
  }
});

app.listen(3000, () => {
  console.log("TrackGL API running on port 3000");
});
