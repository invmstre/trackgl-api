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

    const response = await fetch("https://api.shipresolve.com/v1/track", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trackingNumber: tracking,
        carrier: "auto-detect"
      })
    });

    const data = await response.json();

    res.json(data);

  } catch (error) {

    res.status(500).json({
      error: "Tracking failed",
      details: error.message
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("TrackGL API running on port " + PORT);
});
